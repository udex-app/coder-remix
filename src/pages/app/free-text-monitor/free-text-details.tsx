import { Box, Text, Grid, Badge, Table, Button } from "@mantine/core";
import { HEIGHT_OF_HEADER } from "~/utils/globalLists";
import { MyGrid, Panel } from "~/components";
import MyTable from "~/components/common/MyTable";
export default function FreeTextMonitorDetails() {
  return (
    <Box
      style={{
        minHeight: `calc(100vh - ${HEIGHT_OF_HEADER}px)`,
        display: "flex",
      }}
    >
      {/* Left side */}
      <Box
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          position: "relative",
          overflow: "hidden",
          borderRight: "1px solid var(--mantine-color-gray-2)",
          backgroundColor: "var(--mantine-color-gray-0)",
        }}
      ></Box>

      {/* Right side*/}
      <Box
        style={{
          flex: 2,
          display: "flex",
          padding: "1.5rem",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "var(--mantine-color-gray-1)",
        }}
      >
        <Box
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Panel title="Purchase Summary">
            <Grid>
              <Grid.Col span={6}>
                <Text fw={400} size="sm" c="dimmed">
                  Description
                </Text>
                <Text fw={500} size="md">
                  High pressure hydraulic hose 1/2” x 20ft
                </Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fw={400} size="sm" c="dimmed">
                  Status
                </Text>
                <Badge
                  fw={600}
                  size="md"
                  c="dark"
                  bg="gray.1"
                  style={{
                    border: "1px solid var(--mantine-color-gray-4)",
                    borderRadius: "6px",
                  }}
                >
                  DRAFT
                </Badge>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fw={400} size="sm" c="dimmed">
                  Storage Location
                </Text>
                <Text fw={500} size="md">
                  WH-01
                </Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fw={400} size="sm" c="dimmed">
                  Supplier
                </Text>
                <Text fw={500} size="md">
                  Steel Corp
                </Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fw={400} size="sm" c="dimmed">
                  Total Spend
                </Text>
                <Text fw={500} size="md">
                  $2,450.00
                </Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fw={400} size="sm" c="dimmed">
                  Last Ordered
                </Text>
                <Text fw={500} size="md">
                  Dec 15, 2023
                </Text>
              </Grid.Col>
            </Grid>
          </Panel>
          <Panel title="Suggested Catalog Match">
            <Grid>
              <Grid.Col span={6}>
                <Text fw={400} size="sm" c="dimmed">
                  Material Code
                </Text>
                <Badge
                  fw={600}
                  size="md"
                  c="dark"
                  bg="gray.1"
                  style={{
                    border: "1px solid var(--mantine-color-gray-4)",
                    borderRadius: "6px",
                  }}
                >
                  HYD-HOSE-12-20
                </Badge>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fw={400} size="sm" c="dimmed">
                  Status
                </Text>

                <Badge
                  fw={500}
                  size="md"
                  c="green"
                  bg="green.1"
                  style={{
                    border: "1px solid var(--mantine-color-green-4)",
                    borderRadius: "6px",
                  }}
                >
                  92% CONFIDENCE
                </Badge>
              </Grid.Col>
            </Grid>
          </Panel>
          <Panel title="Purchase Orders">
            <MyTable
              data={[
                { poNumber: "PO-001", date: "Dec 15, 2023", quantity: 100,
                  unitPrice: "$10.00",
                  total: "$1,000.00",
                  buyer: "John Doe",
                },
                {
                  poNumber: "PO-002",
                  date: "Dec 16, 2023",
                  quantity: 200,
                  unitPrice: "$15.00",
                  total: "$3,000.00",
                  buyer: "Jane Smith",
                },
                {
                  poNumber: "PO-003",
                  date: "Dec 17, 2023",
                  quantity: 300,
                  unitPrice: "$20.00",
                },
                {
                  poNumber: "PO-004",
                  date: "Dec 18, 2023",
                  quantity: 400,
                  unitPrice: "$25.00",
                  total: "$10,000.00",
                  buyer: "Mike Johnson",
                },
              ]}
              columns={[
                { key: "poNumber", header: "PO Number" },
                { key: "date", header: "Date" },
                { key: "quantity", header: "Quantity" },
                { key: "unitPrice", header: "Unit Price" },
                { key: "total", header: "Total" },
                { key: "buyer", header: "Buyer" },
              ]}
            />
          </Panel>
        </Box>
        <Box
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-end",
            borderTop: "1px solid var(--mantine-color-gray-2)",
            paddingTop: "1rem",
            backgroundColor: "var(--mantine-color-white)",
          }}
        >
          <Button variant="outline">Save Draft</Button>
          <Button variant="outline">Ignore</Button>
          <Button variant="filled">Start Material Creation</Button>
        </Box>
      </Box>
    </Box>
  );
}
