import {
    ActionIcon,
    Box,
    Group,
    Text,
    Center,
    Loader,
    Menu,
    TextInput,
    useComputedColorScheme,
    Collapse,
} from "@mantine/core";
import {
    IconChevronRight,
    IconChevronLeft,
    IconDots,
    IconSearch,
    IconFilter,
} from "@tabler/icons-react";
import { AgGridReact } from "ag-grid-react";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState, useEffect, useCallback } from "react";

import type { ColDef } from "ag-grid-community";
import {HEIGHT_OF_HEADER} from "~/utils/globalLists";
type RowData = {
    materialNumber: string;
    plant: string;
    supplier: string;
};

function MaterialPlanData({
                             title,
                             toolbarActionsContent,
                             menuItems,
                             onRowClicked,
                         }: {
    title: string;
    toolbarActionsContent?: React.ReactNode;
    menuItems?: React.ReactNode;
    onRowClicked?: (event: any) => void;
}) {
    const [search, setSearch] = useState("");
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const isTablet = useMediaQuery("(max-width: 64em)");
    const rowData: RowData[] = [
        { materialNumber: "1001", plant: "Plant A", supplier: "Supplier X" },
        { materialNumber: "1002", plant: "Plant B", supplier: "Supplier Y" },
        { materialNumber: "1003", plant: "Plant C", supplier: "Supplier Z" },
    ];

    const colDefs: ColDef<RowData>[] = [
        { field: "materialNumber", headerName: "Material Number" },
        { field: "plant", headerName: "Plant" },
        { field: "supplier", headerName: "Supplier" },
    ];

    const [filteredData, setFilteredData] = useState(rowData);

    const handleSearch = useCallback(() => {
        const filtered = rowData.filter((item) =>
            Object.values(item).some((field) =>
                field?.toString().toLowerCase().includes(search.toLowerCase())
            )
        );
        setFilteredData(filtered);
    }, [search]);

    useEffect(() => {
        handleSearch();
        setIsLoading(false);
    }, [search, handleSearch]);

    return (
        <Box pos="relative" style={{ height: `calc(100vh - ${HEIGHT_OF_HEADER}px)` , display: 'flex', flexDirection: 'column' }}>
            <Collapse
                in={!isCollapsed}
                style={{
                    height: "100%",
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: "hidden",

                }}
            >
                <Box style={{  border: "1px solid var(--mantine-color-gray-4)",
                    borderRadius: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    height: '100%' }}>
                    <Group
                        p="16px"
                        justify="space-between"
                        bg="var(--mantine-color-body)"
                        style={{
                            borderRadius: "8px 8px 0 0",
                            position: "sticky",
                            top: 0,
                            zIndex: 10,
                        }}
                    >

                        <Text fw={600} fz={16}>
                            {title}
                        </Text>
                        <Group gap="xs">
                            {menuItems && (
                                <Menu shadow="md" width={200} position="bottom-end">
                                    <Menu.Target>
                                        <ActionIcon variant="transparent">
                                            <IconDots />
                                        </ActionIcon>
                                    </Menu.Target>
                                    <Menu.Dropdown>{menuItems}</Menu.Dropdown>
                                </Menu>
                            )}
                            <ActionIcon variant="transparent" onClick={() => setIsCollapsed(true)}>
                                <IconChevronLeft size={20} />
                            </ActionIcon>
                        </Group>
                    </Group>

                    <Group
                        p="12px"
                        bg="var(--mantine-color-body)"
                        justify="space-between"
                        style={{
                            borderTop: "1px solid var(--mantine-color-gray-3)",
                            borderBottom: "1px solid var(--mantine-color-gray-3)",
                        }}
                    >
                        <TextInput
                            placeholder="Search"
                            value={search}
                            leftSection={<IconSearch size={16} />}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ width: "100%" }}
                        />
                        {toolbarActionsContent && (
                            <Group wrap="nowrap" gap={20}>
                                {toolbarActionsContent}
                            </Group>
                        )}
                    </Group>

                    <Box
                        className="ag-theme-alpine"
                        style={{
                            flexGrow: 1,
                            minHeight: 0,
                            position: "relative",
                        }}
                    >
                        <AgGridReact
                            rowData={filteredData}
                            columnDefs={colDefs}
                            onRowClicked={onRowClicked}
                        />
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
                </Box>
            </Collapse>

            {isCollapsed && (
                <ActionIcon
                    variant="light"
                    onClick={() => setIsCollapsed(false)}
                    style={{
                        left: 0,
                        top: 0,
                        borderRadius:0,
                        border:0,
                        zIndex: 100,
                        height:"100vh",
                        width:"40px",
                        padding: "10px",
                    }}
                >
                    <IconChevronRight size={20} />
                </ActionIcon>
            )}
        </Box>
    );
}

export default MaterialPlanData;
