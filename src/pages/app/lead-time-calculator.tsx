import { useState, useMemo, useCallback } from "react";
import { Box, Menu, Switch, Button, Group, Text } from "@mantine/core";
import {
  IconColumns,
  IconDownload,
  IconLayoutColumns,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import type { SelectionChangedEvent } from "ag-grid-community";
import { useNavigate } from "react-router";

import MyGrid from "~/components/common/MyGrid";
import { downloadToExcel } from "~/utils/downloadToExcel";
import { SEARCH_COLUMN_DEFS } from "~/utils/colDefs";
import type { Filter } from "~/components/common/SearchBar";
import CustomSelect from "~/components/common/CustomSelect";
import { HEIGHT_OF_HEADER } from "~/utils/globalLists";
import ThreeDotsMenu, {
  type MenuItem,
} from "~/components/common/ThreeDotsMenu";

type LeadTimeItem = {
  id: number;
  materialNumber: string;
  plant: string;
  description: string;
  supplier: string;
  currentLT: string;
  demonstratedLT: string;
  deliveries: number;
  ltChange: number;
  valueGuide: string;
  lastOrdered: string;
};

const columnMap: Record<string, keyof LeadTimeItem> = {
  "Material Number": "materialNumber",
  Plant: "plant",
  Description: "description",
  Supplier: "supplier",
  "Current LT": "currentLT",
  "Demonstrated LT": "demonstratedLT",
  Deliveries: "deliveries",
  "LT Change": "ltChange",
  "Value Guide": "valueGuide",
  "Last Ordered": "lastOrdered",
};

const allColumns = Object.keys(columnMap);

const mockData: LeadTimeItem[] = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  materialNumber: `200034${(i + 1).toString().padStart(2, "0")}`,
  plant: i < 20 ? "1300" : i < 30 ? "1400" : "1500",
  description:
    i % 2 === 0 ? "VALVE RELIEF OIL PUMP W..." : "CAGE VALVE BOTTOM GUIDE...",
  supplier: "Denbury",
  currentLT: "30 Days",
  demonstratedLT: "42 Days",
  deliveries: 8,
  ltChange: 12,
  valueGuide: "WO-12345",
  lastOrdered: "Jan 10, 2024",
}));

export default function LeadTimeCalculator() {
  const [filteredData, setFilteredData] = useState<LeadTimeItem[]>(mockData);
  const [selectedRows, setSelectedRows] = useState<LeadTimeItem[]>([]);
  const [visibleColumns] = useState(allColumns);
  const [plantView, setPlantView] = useState(false);
  const [selectedView, setSelectedView] = useState("");
  const navigate = useNavigate();

  const handleDownload = useCallback(() => {
    if (selectedRows.length === 0) {
      notifications.show({
        title: "No Selection",
        message: "Please select items to download",
        color: "yellow",
      });
      return;
    }

    downloadToExcel({
      data: selectedRows,
      filename: "lead_time_data",
      headers: visibleColumns,
      mapRow: (item) =>
        visibleColumns.map((col) => {
          const key = columnMap[col];
          return item[key];
        }),
    });
  }, [selectedRows, visibleColumns]);

  const handleSearch = (filters: Filter[]) => {
    const filtered = mockData.filter((item) => {
      return filters.every((filter) => {
        const fieldKey = filter.field
          .toLowerCase()
          .replace(/\s+/g, "") as keyof LeadTimeItem;
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

  return (
    <Box
      p="md"
      h={`calc(100vh - ${HEIGHT_OF_HEADER}px)`}
      style={{ display: "flex", flexDirection: "column" }}
    >
      {/* Grid */}
      <Box style={{ flex: 1, minHeight: 0 }}>
        <MyGrid
          title="Lead Time Calculator"
          rowData={filteredData}
          toolbarActions={true}
          colDefs={SEARCH_COLUMN_DEFS}
          onSearch={handleSearch}
          menuItems={<ThreeDotsMenu items={menuItems} />}
          toolbarActionsContent={toolBarActions}
          onRowClicked={(event: any) => {
            navigate(
              `/app/lead-time-calculator/LT-details/${event.data.materialNumber}`
            );
          }}
          gridOptions={{
            rowSelection: {
              mode: "multiRow",
            },
            onSelectionChanged: (event: SelectionChangedEvent) => {
              setSelectedRows(event.api.getSelectedRows());
            },
          }}
        />
      </Box>
    </Box>
  );
}
