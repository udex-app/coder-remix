import { Box, Group, Menu, Switch, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconDownload, IconLayoutColumns } from "@tabler/icons-react";
import { useCallback, useMemo } from "react";
import { useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router";
import { MyGrid } from "~/components";
import CustomSelect from "~/components/common/CustomSelect";
import { downloadToExcel } from "~/utils/downloadToExcel";
import type { SelectionChangedEvent } from "ag-grid-community";
import type { Filter } from "~/components/common/SearchBar";
import { HEIGHT_OF_HEADER } from "~/utils/globalLists";
import type { MenuItem } from "~/components/common/ThreeDotsMenu";
import ThreeDotsMenu from "~/components/common/ThreeDotsMenu";

interface FreeTextMonitorlItem {
  id: number;
  partNumber: number;
  description: string;
  supplier: string;
  poCount: string;
  totalSpent: number;
  valueGuide: string;
  lastOrdered: Date;
}

export const FREE_TEXT_MONITOR_COLUMN_DEFS = [
  {
    field: "partNumber",
    headerName: "Part Number",
    flex: 1,
    minWidth: 150,
    sortable: true,
    filter: true,
    resizable: true,
    valueFormatter: (params: any) =>
      params.value ? params.value.toString() : "",
  },
  {
    field: "description",
    headerName: "Description",
    flex: 2,
    minWidth: 200,
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    field: "supplier",
    headerName: "Supplier",
    flex: 1,
    minWidth: 150,
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    field: "poCount",
    headerName: "PO Count",
    flex: 1,
    minWidth: 120,
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    field: "totalSpent",
    headerName: "Total Spent",
    flex: 1,
    minWidth: 120,
    sortable: true,
    filter: true,
    resizable: true,
    valueFormatter: (params: any) =>
      params.value ? `$${params.value.toFixed(2)}` : "",
  },
  {
    field: "valueGuide",
    headerName: "Value Guide",
    flex: 1,
    minWidth: 120,
    sortable: true,
    filter: true,
    resizable: true,
  },
  {
    field: "lastOrdered",
    headerName: "Last Ordered",
    flex: 1,
    minWidth: 150,
    sortable: true,
    filter: true,
    resizable: true,
    valueFormatter: (params: any) => {
      if (!params.value) return "";
      return params.value instanceof Date
        ? params.value.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : params.value;
    },
  },
];

// Mock data for the grid
const mockData: FreeTextMonitorlItem[] = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  partNumber: 1156000 + i,
  description:
    i % 2 === 0
      ? "VALVE RELIEF OIL PUMP W82718"
      : "CAGE VALVE BOTTOM GUIDE DISC J150",
  supplier: "Denbury",
  poCount: "12x",
  totalSpent: 2450.0,
  valueGuide: "WO-12345",
  lastOrdered: new Date("2024-01-10"),
}));

// Define searchable fields and their mappings
const SEARCH_FIELDS = ["Part Number", "Description", "Supplier", "Value Guide"];

const FIELD_MAPPINGS: Record<string, keyof FreeTextMonitorlItem> = {
  "Part Number": "partNumber",
  Description: "description",
  Supplier: "supplier",
  "Value Guide": "valueGuide",
};

export default function FreeTextMonitor(props: {}) {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState(mockData);
  const [selectedRows, setSelectedRows] = useState<FreeTextMonitorlItem[]>([]);
  const [plantView, setPlantView] = useState(false);
  const [selectedView, setSelectedView] = useState("");

  const handleRowClick = useCallback(
    (event: any) => {
      navigate(`/app/free-text-monitor/details`);
    },
    [navigate]
  );

  const handleDownload = useCallback(() => {
    if (selectedRows.length === 0) {
      notifications.show({
        title: "No Selection",
        message: "Please select materials to download",
        color: "yellow",
      });
      return;
    }

    downloadToExcel({
      data: selectedRows,
      filename: "materials",
      headers: [
        "Part Number",
        "Description",
        "Supplier",
        "PO Count",
        "Total Spent",
        "Value Guide",
        "Last Ordered",
      ],
      mapRow: (item) => [
        item.partNumber,
        item.description,
        item.supplier,
        item.poCount,
        item.totalSpent,
        item.valueGuide,
        item.lastOrdered.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      ],
    });
  }, [selectedRows]);

  const menuItems: MenuItem[] = [
    {
      label: "Download",
      icon: <IconDownload style={{ width: 14, height: 14 }} />,
      onClick: handleDownload,
    },
  ];

  const toolBarActions = useMemo(() => {
    return (
      <>
        <Group gap={8}>
          <Switch
            checked={plantView}
            onChange={(event) => setPlantView(event.currentTarget.checked)}
            color="teal"
          />
          <Text size="sm">Plant View</Text>
        </Group>
        <CustomSelect
          w={175}
          h={32}
          value={selectedView}
          onChange={setSelectedView}
          data={["Columns", "Row"]}
          leftSection={
            <IconLayoutColumns color="var(--mantine-color-gray-5)" size={22} />
          }
          placeholder="Columns"
        />
      </>
    );
  }, [selectedView, plantView]);

  const handleSearch = (filters: Filter[]) => {
    const filtered = mockData.filter((item) => {
      return filters.every((filter) => {
        const fieldKey = FIELD_MAPPINGS[filter.field];
        if (!fieldKey) return true;

        const value = item[fieldKey]?.toString() || "";
        const searchValue = filter.value.toLowerCase();

        switch (filter.operator) {
          case "contains":
            return value.toLowerCase().includes(searchValue);
          case "equals":
            return value.toLowerCase() === searchValue;
          case "starts with":
            return value.toLowerCase().startsWith(searchValue);
          case "ends with":
            return value.toLowerCase().endsWith(searchValue);
          default:
            return true;
        }
      });
    });

    setFilteredData(filtered);
  };

  return (
    <Box
      p="md"
      h={`calc(100vh - ${HEIGHT_OF_HEADER}px)`}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Box style={{ flex: 1, minHeight: 0 }}>
        <MyGrid
          title="Free Text Monitor"
          rowData={filteredData}
          toolbarActions={true}
          colDefs={FREE_TEXT_MONITOR_COLUMN_DEFS}
          onSearch={handleSearch}
          menuItems={<ThreeDotsMenu items={menuItems} />}
          toolbarActionsContent={toolBarActions}
          // searchFields={SEARCH_FIELDS}
          gridOptions={{
            rowSelection: {
              mode: "multiRow",
            },
            onSelectionChanged: (event: SelectionChangedEvent) => {
              setSelectedRows(event.api.getSelectedRows());
            },
            onRowClicked: handleRowClick,
          }}
        />
      </Box>
    </Box>
  );
}
