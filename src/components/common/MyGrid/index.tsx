import {
  ActionIcon,
  Box,
  Group,
  Text,
  Center,
  Loader,
  Menu,
  useComputedColorScheme,
  TextInput,
} from "@mantine/core";
import {
  IconChevronRight,
  IconDots,
  IconFilter,
  IconSearch,
  IconChevronLeft,
} from "@tabler/icons-react";
import { AgGridReact } from "ag-grid-react";
import { customDarkTheme, customLightTheme } from "./gridTheme";
import React, { useState, useEffect } from "react";
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
  titleSection?: React.ReactNode;
  toolbarActionsContent?: React.ReactNode;
  actionsNearTitle?: React.ReactNode;
  theme?: any;
  gridOptions?: any;
  noBorders?: boolean;
  fullWidthSearch?: boolean;
  menuItems?: React.ReactNode;
  multiSelect?: boolean;
  onSearch?: (filters: Filter[]) => void;
  onRowClicked?(event: RowClickedEvent<any, any>): void;
  onCellClicked?(event: CellClickedEvent<any, any>): void;
  simpleSearch?: boolean;
  noBorderRadius?: boolean;
  collapsible?: boolean;
  isCollapsed?: boolean;
  onCollapseChange?: (isCollapsed: boolean) => void;
  showFooter?: boolean;
}

export default function MyGrid({
  rowData,
  colDefs,
  noToolbar = false,
  title,
  toolbarActions = false,
  toolbarActionsContent,
  actionsNearTitle,
  theme,
  gridOptions,
  noBorders = false,
  fullWidthSearch = false,
  menuItems,
  multiSelect = true,
  simpleSearch = false,
  noBorderRadius = false,
  collapsible = false,
  isCollapsed = false,
  onCollapseChange,
  onRowClicked,
  onCellClicked,
  showFooter = false,
}: IMyGrid) {
  /* ─────────────── state ─────────────── */
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState(rowData);
  const [search, setSearch] = useState("");
  const isTablet = useMediaQuery("(max-width: 64em)");
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  /* ─────────────── effects ─────────────── */
  useEffect(() => {
    setFilteredData(rowData); // скидаємо результати, коли приходять нові дані
  }, [rowData]);

  /* ─────────────── handlers ─────────────── */
  const handleSearch = (filters: Filter[]) => {
    const filtered = rowData.filter((item) =>
      filters.every((filter) => {
        const fieldKey = filter.field.replace(/\s+/g, "").toLowerCase();
        const value = (item[fieldKey] ?? "").toString();
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
      })
    );
    setFilteredData(filtered);
  };

  const toggleCollapse = () => onCollapseChange?.(!isCollapsed);

  /* ─────────────── render ─────────────── */
  return (
    <Box
      pos="relative"
      h="100%"
      style={{
        position: isCollapsed ? "fixed" : "relative",
        top: isCollapsed ? 0 : "auto",
        left: isCollapsed ? 0 : "auto",
        right: isCollapsed ? 0 : "auto",
        bottom: isCollapsed ? 0 : "auto",
      }}
    >
      {/* ───── header ───── */}
      <Group
        p="16px"
        justify="space-between"
        bg="var(--mantine-color-body)"
        style={{
          borderRadius: noBorders || noBorderRadius ? undefined : "8px 8px 0 0",
          border: noBorders
            ? "none"
            : "1px solid light-dark(#E0E3E6, var(--mantine-color-dark-4))",
          position: isCollapsed ? "sticky" : "relative",
          top: 0,
        }}
      >
        <Group gap={10}>
          <Text fw={600} fz={16}>
            {title}
          </Text>
          {actionsNearTitle && actionsNearTitle}
        </Group>
        <Group gap="xs">
          {menuItems && menuItems}
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

      {/* ───── toolbar ───── */}
      {!noToolbar && (
        <Group
          justify="space-between"
          p="12px"
          bg="var(--mantine-color-body)"
          style={{
            border: noBorders
              ? "none"
              : "1px solid light-dark(#E0E3E6, var(--mantine-color-dark-4))",
            borderTop: "none",
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
              <SearchBar onSearch={handleSearch} onChange={setSearch} />
            )}
          </Box>

          {toolbarActions && (
            <Group wrap="nowrap" gap={20}>
              {toolbarActionsContent}
            </Group>
          )}
        </Group>
      )}

      {/* ───── grid ───── */}
      <Box
        h={`calc(100% - ${noToolbar ? "42px" : "103px"} - 30px)`}
        style={{
          minHeight: "300px",
          height: isCollapsed ? "calc(100vh - 103px - 30px)" : "auto",
        }}
      >
        <div
          className={showFooter ? "wrapper-table" : ""}
          style={{ height: "100%" }}
        >
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
            rowData={filteredData}
            columnDefs={colDefs}
            onGridReady={() => setIsLoading(false)}
            quickFilterText={search}
            onRowClicked={onRowClicked}
            onCellClicked={onCellClicked}
          />
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

      {/* ───── footer ───── */}
      {showFooter && (
        <Box
          p="20px 18px"
          bg="var(--mantine-color-body)"
          style={{
            borderBottom: noBorders
              ? "none"
              : "1px solid light-dark(#E0E3E6, var(--mantine-color-dark-4))",
            borderLeft: noBorders
              ? "none"
              : "1px solid light-dark(#E0E3E6, var(--mantine-color-dark-4))",
            borderRight: noBorders
              ? "none"
              : "1px solid light-dark(#E0E3E6, var(--mantine-color-dark-4))",
            borderBottomLeftRadius:
              noBorders || noBorderRadius ? undefined : "8px",
            borderBottomRightRadius:
              noBorders || noBorderRadius ? undefined : "8px",
          }}
        >
          <Text size="sm" c="dimmed">
            Showing {filteredData.length} items
          </Text>
        </Box>
      )}
    </Box>
  );
}
