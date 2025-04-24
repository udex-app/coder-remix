import { notifications } from "@mantine/notifications";

// Utility function to escape CSV values
const escapeCSV = (value: any): string => {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

interface DownloadConfig<T> {
  data: T[];
  filename: string;
  headers: string[];
  // Function to map each data item to an array of values
  mapRow: (item: T) => (string | number | null | undefined)[];
  // Optional validation function
  validate?: (item: T) => string[];
}

export function downloadToExcel<T>({
  data,
  filename,
  headers,
  mapRow,
  validate,
}: DownloadConfig<T>): void {
  try {
    // Check if data is available
    if (data.length === 0) {
      notifications.show({
        title: "No Data",
        message: "No data available to download",
        color: "yellow",
      });
      return;
    }

    // Validate data if validation function is provided
    if (validate) {
      const validData = data.filter((item) => {
        const errors = validate(item);
        return errors.length === 0;
      });

      if (validData.length === 0) {
        notifications.show({
          title: "Error",
          message: "No valid data to download",
          color: "red",
        });
        return;
      }

      data = validData;
    }

    // Convert data to CSV rows
    const csvRows = data.map((item) => mapRow(item).map(escapeCSV));

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...csvRows.map((row) => row.join(",")),
    ].join("\n");

    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${filename}_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();

    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error("Error downloading data:", error);
    notifications.show({
      title: "Error",
      message: "Failed to download data",
      color: "red",
    });
  }
}
