import { BarChart } from "@mantine/charts";
import {
  Grid,
  Stack,
  ScrollArea,
  Container,
  Card,
  Box,
  Menu,
  ActionIcon,
  Button,
  Group,
} from "@mantine/core";
import {
  IconArrowsMaximize,
  IconBriefcase,
  IconDownload,
  IconFile,
  IconPlus,
  IconSearch,
  IconUser,
  IconDots,
  IconPackage,
  IconHammer,
} from "@tabler/icons-react";
import { Actions, Panel, QuickAction, Task } from "~/components";
import { useNavigate } from "react-router";
import type { SelectionChangedEvent } from "ag-grid-community";

import { HEIGHT_OF_HEADER } from "~/utils/globalLists";
import { notifications } from "@mantine/notifications";
import { useState, useCallback, useMemo } from "react";
import type { Filter } from "~/components/common/SearchBar";
import { downloadToExcel } from "~/utils/downloadToExcel";
import MyGridDashboard from "~/components/pages/dashboard/MyGridDashboard";
import SectionPanelTab from "~/components/common/SectionPanelTab";
import type { MenuItem } from "~/components/common/ThreeDotsMenu";

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

export default function Dashboard() {
  const navigate = useNavigate();

  const [filteredData, setFilteredData] = useState(mockData);
  const [selectedRows, setSelectedRows] = useState<MaterialItem[]>([]);

  // Define the column definitions for the table
  const columnDefsDashboard = [
    {
      field: "materialnumber",
      headerName: "Material Number",
      filter: true,
      sortable: true,
    },
    {
      field: "longtext",
      headerName: "Long Text",
      filter: true,
      sortable: true,
    },
    {
      field: "description",
      headerName: "Description",
      filter: true,
      sortable: true,
    },
    {
      field: "tags",
      headerName: "Tags",
      filter: true,
      sortable: true,
      cellRenderer: (params: any) => {
        const tags: string[] = params.value || [];
        if (tags.length === 0) return null;

        const firstTag = tags[0].toUpperCase();
        const moreCount = tags.length - 1;

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexWrap: "nowrap",
            }}
          >
            <div
              style={{
                height: 24,
                display: "flex",
                alignItems: "center",
                backgroundColor: "transparent",
                color: "#0077cc",
                border:
                  "1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))",
                borderRadius: "4px",
                padding: "2px 8px",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "var(--mantine-color-blue-5)",
                  marginRight: 6,
                }}
              />
              <span
                style={{
                  color:
                    "light-dark(var(--mantine-color-gray-8), var(--mantine-color-gray-0))",
                  fontSize: "var(--mantine-font-size-xs)",
                  fontWeight: 400,
                }}
              >
                {firstTag}
              </span>
            </div>

            {moreCount > 0 && (
              <span
                style={{
                  fontSize: "var(--mantine-font-size-xs)",
                  color: "var(--mantine-color-dimmed)",
                  fontWeight: 500,
                }}
              >
                + {moreCount} MORE
              </span>
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      filter: false,
      flex: 0,
      width: 60,
      cellRenderer: () => (
        <Menu>
          <Menu.Target>
            <ActionIcon variant="subtle" style={{ rotate: "90deg" }}>
              <IconDots size={16} color="var(--mantine-color-gray-6)" />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<IconDownload size={14} />}>
              Download
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ),
    },
  ];

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
      headers: ["Material Number", "Long Text", "Description", "Tags"],
      mapRow: (item) => [
        item.materialnumber,
        item.longtext,
        item.description,
        item.tags.join(", "),
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

  const quickActions = [
    {
      icon: <IconSearch />,
      title: "Search Materials",
      description: "Lorem ipsum dolor sit amet con",
      onClick: () => navigate("/app/materials"),
    },
    {
      icon: <IconPlus />,
      title: "Create Material",
      description: "Lorem ipsum dolor sit amet con",
      onClick: () => navigate("/app/create-material"),
    },
    {
      icon: <IconArrowsMaximize />,
      title: "Create Extension Request",
      description: "Lorem ipsum dolor sit amet con",
    },
  ];

  return (
    <Container fluid p="md">
      <Grid>
        <Grid.Col span={{ base: 12, md: 9 }}>
          <Stack>
            <Panel title="Quick Actions">
              <Grid>
                {quickActions.map((action) => (
                  <Grid.Col
                    key={action.title}
                    span={{ base: 12, lg: 6, xl: 4 }}
                  >
                    <QuickAction
                      icon={action.icon}
                      title={action.title}
                      description={action.description}
                      onClick={() => action.onClick?.()}
                    />
                  </Grid.Col>
                ))}
              </Grid>
            </Panel>
            <Panel noPadding title="Bar Chart">
              <BarChart
                h={300}
                data={monthlySpending}
                dataKey="date"
                withLegend
                series={series}
                tickLine="y"
                barProps={{ isAnimationActive: true }}
                styles={{
                  root: {
                    paddingLeft: "0px",
                    paddingRight: "0px",
                    paddingTop: "0px",
                    paddingBottom: "0px",
                  },
                  legend: {
                    justifyContent: "flex-start",
                    marginBottom: "15px",
                    marginTop: "10px",
                    marginLeft: "16px",
                  },
                }}
              />
            </Panel>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Panel title="Action Items" noPadding>
            <ScrollArea scrollbars="y" h={485} type="auto">
              <Card>
                {tasks.map((task) => (
                  <Task
                    key={task.id}
                    icon={task.icon}
                    title={task.title}
                    description={task.description}
                    time={task.time}
                    bgColor={task.bgColor}
                  />
                ))}
              </Card>
            </ScrollArea>
          </Panel>
        </Grid.Col>
        <Grid.Col>
          <Box
            h={`calc(100vh - ${HEIGHT_OF_HEADER}px)`}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Box style={{ flex: 1, minHeight: 0 }}>
              <MyGridDashboard
                title="Materials"
                rowData={filteredData}
                colDefs={columnDefsDashboard}
                onSearch={handleSearch}
                menuItems={menuItems}
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
                gridOptions={{
                  rowSelection: {
                    mode: "multiRow",
                  },
                  onSelectionChanged: (event: SelectionChangedEvent) => {
                    setSelectedRows(event.api.getSelectedRows());
                  },
                }}
                toolbarActions={true}
              />
            </Box>
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

const monthlySpending = [
  { date: "Jan", Microsoft: 1837.52, Apple: 1138.35, Amazon: 594.27 },
  { date: "Feb", Microsoft: 2052.01, Apple: 842.14, Amazon: 383.67 },
  { date: "Mar", Microsoft: 3646.41, Apple: 3940.18, Amazon: 872.86 },
  { date: "Apr", Microsoft: 1696.02, Apple: 2638.06, Amazon: 787.11 },
  { date: "May", Microsoft: 2576.3, Apple: 1476.82, Amazon: 508.48 },
  { date: "Jun", Microsoft: 1803.35, Apple: 2406.28, Amazon: 474.13 },
  { date: "Jul", Microsoft: 1510.89, Apple: 2220.96, Amazon: 812.83 },
  { date: "Aug", Microsoft: 2538.34, Apple: 1106.96, Amazon: 397.38 },
  { date: "Sep", Microsoft: 1577.03, Apple: 3079.96, Amazon: 818.48 },
];

const series = [
  { name: "Microsoft", color: "#9cce53" },
  { name: "Apple", color: "#066078" },
  { name: "Amazon", color: "#17bdec" },
];

const tasks = [
  {
    id: "task1",
    title: "Action Title",
    description: "Lorem ipsum dolor sit amet consectetur.",
    icon: <IconFile />,
    time: "20 minutes ago",
    bgColor: "green",
  },
  {
    id: "task2",
    title: "Action Title",
    description: "Lorem ipsum dolor sit amet consectetur.",
    icon: <IconUser />,
    time: "45 minutes ago",
    bgColor: "red",
  },
  {
    id: "task3",
    title: "Action Title",
    description: "Lorem ipsum dolor sit amet consectetur.",
    icon: <IconBriefcase />,
    time: "1 hour ago",
    bgColor: "blue",
  },
  {
    id: "task4",
    title: "Action Title",
    description: "Lorem ipsum dolor sit amet consectetur.",
    icon: <IconBriefcase />,
    time: "1 hour ago",
    bgColor: "purple",
  },
  {
    id: "task5",
    title: "Action Title",
    description: "Lorem ipsum dolor sit amet consectetur.",
    icon: <IconBriefcase />,
    time: "1 hour ago",
    bgColor: "orange",
  },
];
