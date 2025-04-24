import { themeQuartz } from "ag-grid-community";

export const customLightTheme = themeQuartz.withParams({
  rowBorder: { style: "solid", color: "#E0E3E6" },
  columnBorder: { style: "solid", color: "#E0E3E6" },
  headerRowBorder: { style: "solid", color: "#E0E3E6" },
  headerBackgroundColor: "#F8FAFC",
  backgroundColor: "var(--mantine-color-body)",
  rowHeight: 50,
  headerHeight: 40,
  fontSize: 14,
  cellHorizontalPadding: 16,
  checkboxCheckedShapeColor: "#1a75ff",
  checkboxIndeterminateShapeColor: "#1a75ff",
  selectedRowBackgroundColor: "rgba(26, 117, 255, 0.1)",
});

export const customDarkTheme = themeQuartz.withParams({
  rowBorder: { style: "solid", color: "rgba(255, 255, 255, 0.05)" },
  columnBorder: { style: "solid", color: "rgba(255, 255, 255, 0.05)" },
  headerRowBorder: { style: "solid", color: "rgba(255, 255, 255, 0.05)" },
  headerBackgroundColor: "rgba(255, 255, 255, 0.05)",
  backgroundColor: "var(--mantine-color-body)",
  foregroundColor: "var(--mantine-color-dark-0)",
  rowHeight: 50,
  headerHeight: 40,
  fontSize: 14,
  cellHorizontalPadding: 16,
  checkboxCheckedShapeColor: "#1a75ff",
  checkboxIndeterminateShapeColor: "#1a75ff",
  selectedRowBackgroundColor: "rgba(26, 117, 255, 0.15)",
  browserColorScheme: "dark",
});
