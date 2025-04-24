import React, { useState } from "react";
import {
  Box,
  Group,
  Text,
  Chip,
  Badge,
  Paper,
  Container,
  ActionIcon,
  Menu,
} from "@mantine/core";
import {
  IconChevronDown,
  IconDots,
  IconLayoutColumns,
  IconTag,
} from "@tabler/icons-react";
import type {
  ColDef,
  GridReadyEvent,
  SelectionChangedEvent,
} from "ag-grid-community";
import MyGrid from "~/components/common/MyGrid";
import ThreeDotsMenu from "~/components/common/ThreeDotsMenu";
import type { MenuItem } from "~/components/common/ThreeDotsMenu";
import type { Filter } from "~/components/common/SearchBar";
import SectionPanelTab from "~/components/common/SectionPanelTab";
import CustomSelect from "~/components/common/CustomSelect";
import { useNavigate } from "react-router";

export interface RopIncreaseItem {
  plant: string;
  materialNumber: string;
  description: string;
  materialType: string;
  mrpType: string;
  abcIndicator: string;
  criticality: "YES" | "NO";
}

const mockData: RopIncreaseItem[] = Array.from({ length: 40 }, (_, index) => ({
  plant: "1000",
  materialNumber: String(index + 1).padStart(8, "0"),
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm...",
  materialType: "PILL",
  mrpType: "TYPE ONE",
  abcIndicator: "ABC",
  criticality: index % 2 === 0 ? "YES" : "NO",
}));

export default function RopIncreasePage() {
  const [filteredData, setFilteredData] = useState(mockData);
  const [selectedRows, setSelectedRows] = useState<RopIncreaseItem[]>([]);
  const [selectedTags, setSelectedTags] = useState<string>("");
  const [selectedView, setSelectedView] = useState<string>("");
  const navigate = useNavigate();

  // Cell renderer for criticality column
  const criticalityRenderer = (params: any) => {
    const value = params.value;
    const color = value === "YES" ? "red" : "green";
    return (
      <Group gap={5} h="100%">
        <Badge
          size="sm"
          color={color}
          variant="filled"
          p={0}
          w={8}
          h={8}
          style={{ borderRadius: "100%" }}
        />
        <Text size="sm">{value}</Text>
      </Group>
    );
  };

  // Cell renderer for material type
  const materialTypeRenderer = (params: any) => {
    return (
      <Badge
        variant="light"
        color="blue"
        size="md"
        radius={4}
        style={{
          border: "1px solid var(--mantine-color-blue-3)",
          color: "var(--mantine-color-blue-7)",
        }}
      >
        {params.value}
      </Badge>
    );
  };

  // Cell renderer for MRP type
  const mrpTypeRenderer = (params: any) => {
    return (
      <Badge
        variant="light"
        color="orange"
        size="md"
        radius={4}
        style={{
          border: "1px solid var(--mantine-color-orange-3)",
          color: "var(--mantine-color-orange-7)",
        }}
      >
        {params.value}
      </Badge>
    );
  };

  // Cell renderer for action menu
  const actionCellRenderer = () => {
    const menuItems: MenuItem[] = [
      {
        label: "View",
        onClick: () => console.log("View"),
      },
      {
        label: "Edit",
        onClick: () => console.log("Edit"),
      },
      {
        label: "Delete",
        onClick: () => console.log("Delete"),
        color: "red",
      },
    ];

    return (
      <Menu position="bottom-end">
        <Menu.Target>
          <ActionIcon
            variant="subtle"
            style={{ rotate: "90deg" }}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.stopPropagation();
            }}
          >
            <IconDots size={16} color="var(--mantine-color-gray-6)" />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          {menuItems.map((item) => (
            <Menu.Item
              key={item.label}
              leftSection={item.icon}
              onClick={item.onClick}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    );
  };

  const columnDefs: ColDef[] = [
    {
      headerName: "Plant",
      field: "plant",
      sortable: true,
      filter: "agTextColumnFilter",
      width: 100,
    },
    {
      headerName: "Material Number",
      field: "materialNumber",
      sortable: true,
      filter: "agTextColumnFilter",
      width: 150,
    },
    {
      headerName: "Description",
      field: "description",
      sortable: true,
      filter: "agTextColumnFilter",
      flex: 1,
      minWidth: 250,
    },
    {
      headerName: "Material Type",
      field: "materialType",
      sortable: true,
      filter: "agTextColumnFilter",
      cellRenderer: materialTypeRenderer,
      width: 130,
    },
    {
      headerName: "MRP Type",
      field: "mrpType",
      sortable: true,
      filter: "agTextColumnFilter",
      cellRenderer: mrpTypeRenderer,
      width: 130,
    },
    {
      headerName: "ABC Indicator",
      field: "abcIndicator",
      sortable: true,
      filter: "agTextColumnFilter",
      width: 130,
    },
    {
      headerName: "Criticality",
      field: "criticality",
      sortable: true,
      filter: "agTextColumnFilter",
      cellRenderer: criticalityRenderer,
      width: 130,
    },
    {
      headerName: "Action",
      field: "action",
      cellRenderer: actionCellRenderer,
      sortable: false,
      filter: false,
      width: 100,
      pinned: "right",
    },
  ];

  const handleSearch = (filters: Filter[]) => {
    const filtered = mockData.filter((item) => {
      return filters.every((filter) => {
        const fieldKey = filter.field
          .toLowerCase()
          .replace(/\s+/g, "") as keyof RopIncreaseItem;
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

  const ropRoqlist: MenuItem[] = [
    {
      label: "ROP decrease",
      onClick: () => console.log("ROP decrease"),
    },
    {
      label: "ROQ increase",
      onClick: () => console.log("ROQ increase"),
    },
    {
      label: "ROQ decrease",
      onClick: () => console.log("ROQ decrease"),
    },
    {
      label: "Potential Unstock",
      onClick: () => console.log("Potential Unstock"),
    },
  ];

  const menuItems: MenuItem[] = [
    {
      label: "Edit",
      onClick: () => console.log("Edit"),
    },
    {
      label: "Create",
      onClick: () => console.log("Create"),
    },
    {
      label: "-",
      divider: true,
    },
    {
      label: "Delete",
      onClick: () => console.log("Delete"),
      color: "red",
    },
  ];

  return (
    <Container size="100%" p="md" style={{ height: "100vh" }}>
      <Paper
        radius="md"
        withBorder
        style={{
          height: "calc(100vh - 175px)",
          boxShadow: "none",
          border: "none",
        }}
      >
        <MyGrid
          title="ROP Increase List"
          showFooter={true}
          rowData={filteredData}
          colDefs={columnDefs}
          onSearch={handleSearch}
          onRowClicked={(event: any) => {
            if (!event.colDef || event.colDef.field === "action") {
              return;
            }

            navigate(
              `/app/rop-roq/rop-increase/material-details/${event.data.materialNumber}`
            );
          }}
          onCellClicked={({ colDef, data }: any) => {
            if (!colDef || colDef.field === "action") {
              return;
            }

            navigate(
              `/app/rop-roq/rop-increase/material-details/${data.materialNumber}`
            );
          }}
          toolbarActions={true}
          actionsNearTitle={
            <ThreeDotsMenu
              icon={<IconChevronDown width={16} />}
              items={ropRoqlist}
            />
          }
          menuItems={<ThreeDotsMenu items={menuItems} />}
          toolbarActionsContent={
            <Group gap={9}>
              <CustomSelect
                data={["Tag 1", "Tag 2", "Tag 3"]}
                placeholder="Select Tags"
                value={selectedTags}
                onChange={setSelectedTags}
                w={175}
                h={32}
                leftSection={<IconTag size={20} />}
              />
              <CustomSelect
                w={175}
                h={32}
                value={selectedView}
                onChange={setSelectedView}
                data={["Columns", "Row"]}
                leftSection={<IconLayoutColumns size={20} />}
                placeholder="Columns"
              />
            </Group>
          }
          gridOptions={{
            rowSelection: {
              mode: "multiRow",
            },
            onSelectionChanged: (event: SelectionChangedEvent) => {
              setSelectedRows(event.api.getSelectedRows());
            },
          }}
        />
      </Paper>
    </Container>
  );
}
