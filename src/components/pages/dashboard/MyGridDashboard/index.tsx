import {
  ActionIcon,
  Box,
  Group,
  Text,
  Switch,
  Tabs,
  Select,
  Menu,
  useComputedColorScheme,
  TextInput,
  Paper,
  Center,
  Loader,
} from "@mantine/core";
import {
  IconChevronRight,
  IconDots,
  IconFilter,
  IconSearch,
  IconChevronLeft,
  IconChevronDown,
  IconLayoutColumns,
} from "@tabler/icons-react";
import { AgGridReact } from "ag-grid-react";
import { customDarkTheme, customLightTheme } from "./gridTheme";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";
import SearchBar from "~/components/common/SearchBar";
import type { Filter } from "~/components/common/SearchBar";

import {
  RowSelectionModule,
  ClientSideRowModelModule,
  QuickFilterModule,
  ModuleRegistry,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  type RowClickedEvent,
  type CellClickedEvent,
} from "ag-grid-community";
import type { TabItem } from "~/components/common/CustomTabs";
import CustomTabs from "~/components/common/CustomTabs";
import CustomSelect from "~/components/common/CustomSelect";
import ThreeDotsMenu, {
  type MenuItem,
} from "~/components/common/ThreeDotsMenu";

ModuleRegistry.registerModules([
  RowSelectionModule,
  QuickFilterModule,
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
]);

interface IMyGrid {
  title: string;
  rowData: any[];
  colDefs: any[];
  noToolbar?: boolean;
  toolbarActions?: boolean;
  toolbarActionsContent?: React.ReactNode;
  theme?: any;
  gridOptions?: any;
  noBorders?: boolean;
  fullWidthSearch?: boolean;
  menuItems?: MenuItem[];
  multiSelect?: boolean;
  onSearch?: (filters: Filter[]) => void;
  onRowClicked?(event: RowClickedEvent<any, any>): void;
  onCellClicked?(event: CellClickedEvent<any, any>): void;
  simpleSearch?: boolean;
  noBorderRadius?: boolean;
  collapsible?: boolean;
  isCollapsed?: boolean;
  onCollapseChange?: (isCollapsed: boolean) => void;
}

export default function MyGridDashboard({
  rowData,
  colDefs,
  noToolbar = false,
  title,
  toolbarActions = false,
  toolbarActionsContent,
  theme,
  gridOptions,
  noBorders = false,
  fullWidthSearch = false,
  menuItems,
  onSearch,
  multiSelect = true,
  simpleSearch = false,
  noBorderRadius = false,
  collapsible = false,
  isCollapsed = false,
  onCollapseChange,
  onRowClicked,
  onCellClicked,
}: IMyGrid) {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState(rowData);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<string>("materials");
  // Handle tab change
  const handleTabChange = (value: string | null) => {
    if (value) {
      setActiveTab(value);
      // Additional logic for each tab could be added here
    }
  };
  const tabItems: TabItem[] = [
    {
      value: "materials",
      label: "Materials",
    },
    {
      value: "rop-roq",
      label: "ROP/ROQ",
    },
    {
      value: "flag-for-deletion",
      label: "Flag for Deletion",
    },
  ];

  const [plantView, setPlantView] = useState(false);
  const [selectedView, setSelectedView] = useState("");

  const isTablet = useMediaQuery("(max-width: 64em)");
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  useEffect(() => {
    setFilteredData(rowData);
  }, [rowData]);

  // Filter columns to only show Material Number, Long Text, Description, Tags, and Action
  const filteredColDefs = colDefs.filter((col) =>
    ["materialnumber", "longtext", "description", "tags", "action"].includes(
      col.field.toLowerCase()
    )
  );

  const handleSearch = (filters: Filter[]) => {
    const filtered = rowData.filter((item) => {
      return filters.every((filter) => {
        const fieldKey = filter.field.replace(/\s+/g, "").toLowerCase();
        const value = item[fieldKey]?.toString() || "";
        const searchValue = filter.value;

        switch (filter.operator) {
          case "contains":
            return value.includes(searchValue);
          case "is equal to":
            return value === searchValue;
          case "is not equal to":
            return value !== searchValue;
          default:
            return true;
        }
      });
    });
    setFilteredData(filtered);
  };

  const toggleCollapse = () => {
    onCollapseChange && onCollapseChange(!isCollapsed);
  };

  return (
    <Paper
      radius="md"
      w="100%"
      h="100%"
      style={{
        position: isCollapsed ? "fixed" : "relative",
        top: isCollapsed ? 0 : "auto",
        left: isCollapsed ? 0 : "auto",
        right: isCollapsed ? 0 : "auto",
        bottom: isCollapsed ? 0 : "auto",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Group
        px="16px"
        justify="space-between"
        bg="lightGray"
        h={52}
        style={{
          borderTop:
            "1px solid light-dark(#E0E3E6, var(--mantine-color-dark-4))",
          borderRight:
            "1px solid light-dark(#E0E3E6, var(--mantine-color-dark-4))",
          borderLeft:
            "1px solid light-dark(#E0E3E6, var(--mantine-color-dark-4))",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        <Group>
          <Text fw={500} size="md">
            Table Data
          </Text>
          <CustomTabs
            value={activeTab}
            onChange={handleTabChange}
            items={tabItems}
            height={52}
          />
        </Group>

        <Group gap="xs">
          {menuItems && <ThreeDotsMenu items={menuItems} />}
          {collapsible && (
            <ActionIcon
              variant="transparent"
              color="light-dark(black, var(--mantine-color-dark-0))"
              p={0}
              onClick={toggleCollapse}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isCollapsed ? (
                <IconChevronLeft size={20} />
              ) : (
                <IconChevronRight size={20} />
              )}
            </ActionIcon>
          )}
        </Group>
      </Group>

      {!noToolbar && (
        <Group
          justify="space-between"
          p="12px"
          bg="var(--mantine-color-body)"
          style={{
            border: noBorders
              ? "none"
              : "1px solid light-dark(#E0E3E6, var(--mantine-color-dark-4))",
            borderTop:
              "1px solid light-dark(#E0E3E6, var(--mantine-color-dark-4))",
            position: isCollapsed ? "sticky" : "relative",
            top: 0,
          }}
        >
          <Box w={fullWidthSearch ? "100%" : isTablet ? "100%" : "30%"}>
            {simpleSearch ? (
              <TextInput
                placeholder="Search"
                value={search}
                leftSection={<IconSearch size={16} />}
                rightSection={<IconFilter size={16} />}
                onChange={(e) => setSearch(e.target.value)}
              />
            ) : (
              <SearchBar
                onSearch={handleSearch}
                onChange={(value) => setSearch(value)}
              />
            )}
          </Box>
          {toolbarActions && (
            <Group wrap="nowrap" gap={20}>
              <Group gap={8}>
                <Switch
                  checked={plantView}
                  onChange={(event) =>
                    setPlantView(event.currentTarget.checked)
                  }
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
            </Group>
          )}
        </Group>
      )}

      <Box
        h={`calc(100% - ${noToolbar ? "42px" : "103px"})`}
        style={{
          minHeight: "300px",
          height: isCollapsed ? "calc(100vh - 103px)" : "auto",
        }}
      >
        <div style={{ height: "100%", width: "100%" }}>
          {/* Conditional rendering based on active tab */}
          {activeTab === "materials" && (
            <AgGridReact
              gridOptions={{
                ...gridOptions,
                rowSelection: multiSelect ? { mode: "multiRow" } : undefined,
              }}
              theme={
                theme ||
                (computedColorScheme === "light"
                  ? customLightTheme
                  : customDarkTheme)
              }
              columnDefs={filteredColDefs}
              rowData={filteredData}
              pagination={true}
              paginationPageSize={10}
              onRowClicked={onRowClicked}
              onCellClicked={onCellClicked}
              defaultColDef={{
                sortable: true,
                resizable: true,
                filter: true,
                minWidth: 120,
                flex: 1,
              }}
              onGridReady={() => {
                setIsLoading(false);
              }}
              suppressHorizontalScroll={false}
              enableCellTextSelection={true}
              domLayout="normal"
              quickFilterText={search}
            />
          )}
          {activeTab === "rop-roq" && (
            <div style={{ padding: 20 }}>
              <Text>ROP/ROQ content will be displayed here</Text>
            </div>
          )}
          {activeTab === "flag-for-deletion" && (
            <div style={{ padding: 20 }}>
              <Text>Flag for Deletion content will be displayed here</Text>
            </div>
          )}
        </div>
        {isLoading && (
          <Center
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor:
                "light-dark(rgba(255, 255, 255, 0.8), rgba(26, 27, 30, 0.8))",
              backdropFilter: "blur(2px)",
              borderRadius: "var(--mantine-radius-sm)",
            }}
          >
            <Loader size="lg" type="dots" />
          </Center>
        )}
      </Box>
    </Paper>
  );
}
