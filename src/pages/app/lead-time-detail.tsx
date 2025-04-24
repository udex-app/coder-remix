import { useParams } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import {
    Box,
    Title,
    Card,
    Text,
    Table,
    Button,
    Group,
    Grid,
    Badge,
    ActionIcon,
    Menu,
    Tabs,
    rem,
} from "@mantine/core";
import {
    IconClipboardText,
    IconDots,
    IconEdit,
    IconTrash,
    IconEye,
    IconCurrencyDollar,
} from "@tabler/icons-react";
import MaterialPlanData from "~/components/common/MaterialPlanData";
import {HEIGHT_OF_HEADER} from "~/utils/globalLists";

export default function MaterialDetailsPage() {
    const { materialNumber } = useParams();
    const containerRef = useRef<HTMLDivElement>(null);
    const [footerWidth, setFooterWidth] = useState<number | undefined>(undefined);
    const [footerLeft, setFooterLeft] = useState<number>(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const updatePosition = () => {
            const rect = containerRef.current!.getBoundingClientRect();
            setFooterWidth(rect.width);
            setFooterLeft(rect.left);
        };

        const observer = new ResizeObserver(updatePosition);
        observer.observe(containerRef.current);

        window.addEventListener("resize", updatePosition);
        updatePosition();

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", updatePosition);
        };
    }, []);

    const data = {
        materialNumber,
        description: "High pressure hydraulic hose 1/2'' x 20ft",
        supplier: "Steel Corp",
        storageLocation: "WH-01",
        currentLT: 14,
        calculatedLT: 38,
        finalLT: 14,
        orders: Array(5).fill({
            po: "1234",
            quantity: 5,
            date: "Dec 15, 2025",
            buyer: "John Smith",
            unitPrice: 10,
            total: 5,
        }),
    };

    const ThreeDotsMenu = () => (
        <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                    <IconDots style={{ width: rem(16), height: rem(16) }} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item leftSection={<IconEye size={14} />}>View</Menu.Item>
                <Menu.Item leftSection={<IconEdit size={14} />}>Edit</Menu.Item>
                <Menu.Item leftSection={<IconTrash size={14} />} color="red">
                    Delete
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );

    return (
        <Box  ref={containerRef} style={{ display: 'flex', flexDirection: 'column', height: `calc(100vh - ${HEIGHT_OF_HEADER}px)` }}>
            <Grid gutter="md" style={{ flex: 1, overflow: 'hidden' }}>
                <Grid.Col span={4}>
                    <MaterialPlanData title={"Material Plan Data"} />
                </Grid.Col>
                <Grid.Col p="md" span="auto" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'auto' }}>
                    <Card withBorder radius="md" shadow="xs" style={{minHeight: '200px' }}>
                        <Group justify="space-between" mb="sm">
                            <Group gap="xs">
                                <IconClipboardText size={18} />
                                <Title order={5}>Material Details</Title>
                            </Group>
                            <ThreeDotsMenu />
                        </Group>

                        <Grid>
                            <Grid.Col span="auto">
                                <Text size="xs" c="dimmed">Description</Text>
                                <Text fw={500}>{data.description}</Text>

                                <Box mt="sm">
                                    <Text size="xs" c="dimmed">Storage Location</Text>
                                    <Text fw={500}>{data.storageLocation}</Text>
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Text size="xs" c="dimmed">Material Detail Number</Text>
                                <Badge variant="light" color="gray" radius="sm" mt={2}>DRAFT</Badge>

                                <Box mt="sm">
                                    <Text size="xs" c="dimmed">Supplier</Text>
                                    <Text fw={500}>{data.supplier}</Text>
                                </Box>
                            </Grid.Col>
                        </Grid>
                    </Card>


                    {/* Lead Time Calculation */}
                    <Card withBorder radius="md" shadow="xs" style={{minHeight: '200px' }}>
                        <Group justify="space-between" mb="sm">
                            <Group gap="xs">
                                <IconClipboardText size={18} />
                                <Title order={5}>Lead Time Calculation</Title>
                            </Group>
                            <ThreeDotsMenu />
                        </Group>

                        <Grid>
                            <Grid.Col span={2}>
                                <Text size="xs" c="dimmed">Current Lead Time (Days)</Text>
                                <Text fw={500}>{data.currentLT}</Text>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Text size="xs" c="dimmed">Calculated Lead Time (Days)</Text>
                                <Text fw={500}>{data.calculatedLT}</Text>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Text size="xs" c="dimmed">Final Lead Time</Text>
                                <Text fw={500}>{data.finalLT} Days</Text>
                            </Grid.Col>
                        </Grid>
                    </Card>

                    {/* Purchase Orders */}
                    <Card withBorder radius="md" shadow="xs" style={{minHeight: '300px' }}>
                        <Group justify="space-between" mb="sm">
                            <Group gap="xs">
                                <IconCurrencyDollar size={18} />
                                <Title order={5}>Purchase Orders</Title>
                            </Group>
                            <ThreeDotsMenu />
                        </Group>

                        <Tabs defaultValue="all">
                            <Tabs.List>
                                <Tabs.Tab value="all">All Vendors (24/24)</Tabs.Tab>
                                <Tabs.Tab value="v1">V-100001 (10/10)</Tabs.Tab>
                                <Tabs.Tab value="v2">V-100002 (10/10)</Tabs.Tab>
                                <Tabs.Tab value="v3">V-100003 (4/4)</Tabs.Tab>
                            </Tabs.List>

                            <Tabs.Panel value="all" pt="sm">
                                <Table striped highlightOnHover withTableBorder>
                                    <thead>
                                    <tr>
                                        <th>PO Number</th>
                                        <th>Date</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                        <th>Total</th>
                                        <th>Buyer</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data.orders.map((order, i) => (
                                        <tr key={i}>
                                            <td>{order.po}</td>
                                            <td>{order.date}</td>
                                            <td>{order.quantity}</td>
                                            <td>${order.unitPrice}</td>
                                            <td>${order.total}</td>
                                            <td>{order.buyer}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                                <Box
                                    style={{
                                        position: "fixed",
                                        bottom: 0,
                                        left: footerLeft,
                                        width: footerWidth,
                                        backgroundColor: "white",
                                        borderTop: "1px solid #dee2e6",
                                        padding: "1rem",
                                        zIndex: 100,
                                    }}
                                >
                                    <Group justify="space-between">
                                        <Button variant="default">Ignore</Button>
                                        <Group>
                                            <Button variant="outline" color="gray">Save Draft</Button>
                                            <Button variant="filled" color="teal">Submit Update</Button>
                                        </Group>
                                    </Group>
                                </Box>
                            </Tabs.Panel>
                        </Tabs>
                    </Card>
                </Grid.Col>
            </Grid>
        </Box>
    );
}
