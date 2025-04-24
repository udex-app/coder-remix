import { useMemo, useState, useCallback } from "react";
import { Box, Group, Menu, Switch, Text } from "@mantine/core";
import MyGrid from "~/components/common/MyGrid";
import { type Filter } from "~/components/common/SearchBar";
import { SEARCH_COLUMN_DEFS } from "~/utils/colDefs";
import { IconDownload, IconLayoutColumns } from "@tabler/icons-react";
import { downloadToExcel } from "~/utils/downloadToExcel";
import type { SelectionChangedEvent } from "ag-grid-community";
import { notifications } from "@mantine/notifications";
import { HEIGHT_OF_HEADER } from "~/utils/globalLists";
import CustomSelect from "~/components/common/CustomSelect";
import type { MenuItem } from "~/components/common/ThreeDotsMenu";
import ThreeDotsMenu from "~/components/common/ThreeDotsMenu";

interface MaterialItem {
  id: number;
  materialnumber: string;
  longtext: string;
  description: string;
  mrptype: string;
  abcindicator: string;
  plant: string;
  mrpcontroller: string;
  tags: string[];
}

// Mock data for the grid
const mockData: MaterialItem[] = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  materialnumber: `1156${i.toString().padStart(3, "0")}`,
  longtext: i % 2 === 0 ? "ABSORBER ASSEMBLY" : "FILTER ASSEMBLY",
  description:
    i % 2 === 0
      ? "Absorber unit for gas processing"
      : "Filter unit for liquid processing",
  mrptype: i % 3 === 0 ? "PD" : "ND",
  abcindicator: i % 4 === 0 ? "Z" : "A",
  plant: `Plant ${(i % 3) + 1}`,
  mrpcontroller: `MC${(i % 4) + 1}`,
  tags: [
    i % 2 === 0 ? "Critical" : "Standard",
    i % 3 === 0 ? "High Priority" : "Normal",
    i % 4 === 0 ? "Special Handling" : "Regular",
  ],
}));

export default function Materials() {
  const [filteredData, setFilteredData] = useState(mockData);
  const [selectedRows, setSelectedRows] = useState<MaterialItem[]>([]);
  const [plantView, setPlantView] = useState(false);
  const [selectedView, setSelectedView] = useState("");

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
        "Material Number",
        "Long Text",
        "Description",
        "MRP Type",
        "ABC Indicator",
        "Plant",
        "MRP Controller",
        "Tags",
      ],
      mapRow: (item) => [
        item.materialnumber,
        item.longtext,
        item.description,
        item.mrptype,
        item.abcindicator,
        item.plant,
        item.mrpcontroller,
        item.tags.join(", "),
      ],
    });
  }, [selectedRows]);

  const menuItems: MenuItem[] = [
    {
      label: "Download",
      onClick: useMemo(() => handleDownload, [handleDownload]),
      icon: <IconDownload style={{ width: 14, height: 14 }} />,
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
          leftSection={<IconLayoutColumns size={22} />}
          placeholder="Columns"
        />
      </>
    );
  }, [selectedView, plantView]);

  const handleSearch = (filters: Filter[]) => {
    const filtered = mockData.filter((item) => {
      return filters.every((filter) => {
        const fieldKey = filter.field
          .toLowerCase()
          .replace(/\s+/g, "") as keyof MaterialItem;
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
          title="Materials"
          rowData={filteredData}
          toolbarActions={true}
          colDefs={SEARCH_COLUMN_DEFS}
          onSearch={handleSearch}
          menuItems={<ThreeDotsMenu items={menuItems} />}
          toolbarActionsContent={toolBarActions}
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
