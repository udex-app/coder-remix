import {
  Container,
  Group,
  Stack,
  Text,
  TextInput,
  Switch,
  Button,
  Grid,
  Badge,
  ActionIcon,
  Box,
  Table,
  UnstyledButton,
  Collapse,
  Flex,
  Select,
  Card,
  ScrollArea,
} from "@mantine/core";
import {
  IconSearch,
  IconChevronDown,
  IconRefresh,
  IconCircleCheck,
  IconCircleX,
  IconChevronLeft,
  IconChevronRight,
  IconCopy,
  IconBuilding,
  IconClipboardText,
  IconX,
  IconKey,
  IconCheck,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

interface DuplicateGroup {
  id: string;
  score: string;
  partNumber: string;
  manufacturer: string;
  selected?: boolean;
}

interface DuplicateItem {
  materialNumber: string;
  shortDescription: string;
  goldenScore: number;
  manufacturerNumber: string;
  hasConflict?: boolean;
  isGolden?: boolean;
}

interface PlantItem {
  materialNumber: string;
  plant: string;
  storageLocation: string;
  binLocation: string;
  stockQuantity: string;
}

const DUPLICATE_GROUPS: DuplicateGroup[] = [
  {
    id: "005",
    score: "$7,685",
    partNumber: "243235432",
    manufacturer: "Manufacturer",
  },
  {
    id: "006",
    score: "$7,685",
    partNumber: "243235432",
    manufacturer: "Manufacturer",
  },
  {
    id: "007",
    score: "$7,685",
    partNumber: "243235432",
    manufacturer: "Manufacturer",
  },
  {
    id: "008",
    score: "$7,685",
    partNumber: "243235432",
    manufacturer: "Manufacturer",
  },
  {
    id: "009",
    score: "$7,685",
    partNumber: "243235432",
    manufacturer: "Manufacturer",
  },
];

const DUPLICATE_ITEMS: DuplicateItem[] = [
  {
    materialNumber: "00000004",
    shortDescription: "SHOP VAC MILL",
    goldenScore: 80,
    manufacturerNumber: "9A-6FSC8N316",
  },
  {
    materialNumber: "00000005",
    shortDescription: "SHOP VAC MILL",
    goldenScore: 80,
    manufacturerNumber: "9A-6FSC8N316",
  },
  {
    materialNumber: "00000001",
    shortDescription: "SHOP VAC MILL",
    goldenScore: 60,
    manufacturerNumber: "9A-6FSC8N316",
    hasConflict: true,
  },
  {
    materialNumber: "00000002",
    shortDescription: "SHOP VAC MILL",
    goldenScore: 80,
    manufacturerNumber: "9A-6FSC8N316",
    hasConflict: true,
  },
  {
    materialNumber: "00000003",
    shortDescription: "SHOP VAC MILL",
    goldenScore: 40,
    manufacturerNumber: "9A-6FSC8N316",
    isGolden: true,
  },
];

const PLANT_ITEMS: PlantItem[] = [
  {
    materialNumber: "00000001",
    plant: "1300",
    storageLocation: "01",
    binLocation: "5",
    stockQuantity: "1.00",
  },
  {
    materialNumber: "00000002",
    plant: "1300",
    storageLocation: "01",
    binLocation: "5",
    stockQuantity: "1.00",
  },
  {
    materialNumber: "00000003",
    plant: "1300",
    storageLocation: "01",
    binLocation: "5",
    stockQuantity: "1.00",
  },
  {
    materialNumber: "00000004",
    plant: "1300",
    storageLocation: "01",
    binLocation: "5",
    stockQuantity: "1.00",
  },
  {
    materialNumber: "00000005",
    plant: "1300",
    storageLocation: "01",
    binLocation: "5",
    stockQuantity: "1.00",
  },
];

const REFRESH_ICON = (
  <ActionIcon
    variant="light"
    radius="lg"
    color="blue.4"
    style={{
      border: "1px solid var(--mantine-color-blue-filled)",
    }}
  >
    <IconRefresh size={16} />
  </ActionIcon>
);

function CollapsibleCard({
  title,
  icon,
  expanded,
  onToggle,
  children,
  badgeText,
  subtitle,
  refresh,
}: {
  title: string;
  icon: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  badgeText?: string;
  subtitle?: string;
  refresh?: boolean;
}) {
  return (
    <Card withBorder>
      <Card.Section withBorder p="md" bg="lightGray">
        <Box
          role="button"
          tabIndex={0}
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onToggle();
            }
          }}
          style={{ width: "100%", cursor: "pointer" }}
        >
          <Group justify="space-between">
            <Group>
              {icon}
              <Text fw={500}>{title}</Text>
              {badgeText && (
                <Badge size="md" radius="sm" className="badge-green">
                  {badgeText}
                </Badge>
              )}
              {subtitle && (
                <Text size="sm" c="dimmed">
                  {subtitle}
                </Text>
              )}
            </Group>
            <Group>
              {refresh && REFRESH_ICON}
              <IconChevronDown
                size={16}
                color="#007294"
                style={{
                  transform: expanded ? "rotate(180deg)" : "none",
                  transition: "transform 200ms ease",
                }}
              />
            </Group>
          </Group>
        </Box>
      </Card.Section>
      <Card.Section>
        <Collapse in={expanded}>
          <Box p="md">{children}</Box>
        </Collapse>
      </Card.Section>
    </Card>
  );
}

export default function Duplicates() {
  const [selectedGroup, setSelectedGroup] = useState<string>("005");
  const [showValidatedGroups, setShowValidatedGroups] = useState(false);
  const [plantsExpanded, { toggle: togglePlants }] = useDisclosure(true);
  const [duplicatesExpanded, { toggle: toggleDuplicates }] =
    useDisclosure(true);
  const [summaryExpanded, { toggle: toggleSummary }] = useDisclosure(true);

  // Add navigation functions
  const currentIndex = DUPLICATE_GROUPS.findIndex(
    (group) => group.id === selectedGroup
  );

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedGroup(DUPLICATE_GROUPS[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < DUPLICATE_GROUPS.length - 1) {
      setSelectedGroup(DUPLICATE_GROUPS[currentIndex + 1].id);
    }
  };

  return (
    <Container fluid p={0}>
      <Grid gutter={0}>
        <Grid.Col
          span={4}
          style={{
            borderRight:
              "1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))",
          }}
        >
          <Group
            p="md"
            justify="space-between"
            bg="var(--mantine-color-body)"
            style={{
              borderBottom:
                "1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))",
            }}
          >
            <Flex gap="xs">
              <Select
                data={["Part No. & Manufacturer", "Material Number"]}
                size="sm"
                defaultValue="Part No. & Manufacturer"
              />
              <Flex gap="xs" align="center">
                <Switch
                  checked={showValidatedGroups}
                  onChange={(event) =>
                    setShowValidatedGroups(event.currentTarget.checked)
                  }
                  size="md"
                />
                <Text size="sm" style={{ whiteSpace: "nowrap" }}>
                  Validated Groups
                </Text>
              </Flex>
            </Flex>
            <IconChevronRight
              size={16}
              style={{ color: "var(--mantine-color-gray-5)" }}
            />
          </Group>

          <Group
            w="100%"
            px="md"
            py="xs"
            bg="var(--mantine-color-body)"
            style={{
              borderBottom:
                "1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))",
            }}
          >
            <TextInput
              placeholder="Search"
              leftSection={<IconSearch size={16} />}
              w="100%"
            />
          </Group>

          <ScrollArea h="calc(100vh - 260px)">
            <Stack gap="lg" p="md">
              {DUPLICATE_GROUPS.map((group) => (
                <Box
                  key={group.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedGroup(group.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedGroup(group.id);
                    }
                  }}
                  p="md"
                  style={{
                    border: `2px solid ${
                      selectedGroup === group.id
                        ? "var(--mantine-color-blue-6)"
                        : "light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))"
                    }`,
                    borderRadius: "var(--mantine-radius-md)",
                    backgroundColor:
                      selectedGroup === group.id
                        ? "light-dark(var(--mantine-color-blue-0), var(--mantine-color-dark-6))"
                        : "var(--mantine-color-body)",
                    cursor: "pointer",
                  }}
                >
                  <Group justify="space-between" wrap="nowrap">
                    <Stack gap={2}>
                      <Group gap="xs">
                        <Text fw={500}>
                          Potential Duplicate Group #{group.id}
                        </Text>
                        <Badge size="md" radius="sm" className="badge-green">
                          {group.score}
                        </Badge>
                      </Group>
                      <Text size="sm" c="dimmed">
                        Part# {group.partNumber} - {group.manufacturer}
                      </Text>
                    </Stack>
                    {selectedGroup === group.id ? (
                      REFRESH_ICON
                    ) : (
                      <Group gap="xs">
                        <ActionIcon variant="default" radius="lg">
                          <IconCheck size={16} />
                        </ActionIcon>
                        <ActionIcon variant="default" radius="lg">
                          <IconX size={16} />
                        </ActionIcon>
                      </Group>
                    )}
                  </Group>
                </Box>
              ))}
            </Stack>
          </ScrollArea>
        </Grid.Col>

        <Grid.Col span={8}>
          <Flex direction="column" h="calc(100vh - 100px)">
            <Group
              justify="space-between"
              bg="var(--mantine-color-body)"
              p="md"
              style={{
                borderBottom:
                  "1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))",
              }}
            >
              <Text fw={500} size="lg">
                Potential Duplicate Group #{selectedGroup}
              </Text>
              <Group>
                <Button
                  variant="default"
                  rightSection={<IconCircleX size={16} />}
                >
                  Mark All as not Duplicate
                </Button>
                <Button
                  variant="default"
                  rightSection={<IconCircleCheck size={16} />}
                >
                  Mark All as Duplicate
                </Button>
              </Group>
            </Group>

            <ScrollArea h="100%" offsetScrollbars>
              <Box p="md">
                <Stack gap="md">
                  <CollapsibleCard
                    title="Duplicates"
                    icon={<IconCopy size={16} color="#007294" />}
                    expanded={duplicatesExpanded}
                    onToggle={toggleDuplicates}
                    subtitle="Part# 243235432 - Manufacturer"
                    refresh
                    badgeText="$7,685"
                  >
                    <Box
                      style={{
                        border:
                          "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                    >
                      <Table>
                        <Table.Thead
                          style={{
                            backgroundColor:
                              "light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))",
                          }}
                        >
                          <Table.Tr>
                            <Table.Th></Table.Th>
                            <Table.Th></Table.Th>
                            <Table.Th>Material Number</Table.Th>
                            <Table.Th>Short Description</Table.Th>
                            <Table.Th>Golden Score</Table.Th>
                            <Table.Th>Manufacturer Number</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {DUPLICATE_ITEMS.map((item) => (
                            <Table.Tr
                              key={item.materialNumber}
                              bg={
                                item.isGolden
                                  ? "light-dark(var(--mantine-color-yellow-0), #c6a5003b"
                                  : item.hasConflict
                                  ? "light-dark(var(white, var(--mantine-color-dark-red-0))"
                                  : "light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))"
                              }
                            >
                              <Table.Td>
                                {(item.hasConflict || item.isGolden) && (
                                  <IconKey
                                    size={16}
                                    style={{
                                      color: item.isGolden
                                        ? "var(--mantine-color-yellow-5)"
                                        : "var(--mantine-color-gray-5)",
                                    }}
                                  />
                                )}
                              </Table.Td>
                              <Table.Td>{REFRESH_ICON}</Table.Td>
                              <Table.Td>{item.materialNumber}</Table.Td>
                              <Table.Td>{item.shortDescription}</Table.Td>
                              <Table.Td>{item.goldenScore}</Table.Td>
                              <Table.Td>{item.manufacturerNumber}</Table.Td>
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </Table>
                    </Box>
                  </CollapsibleCard>

                  <CollapsibleCard
                    title="Plants"
                    icon={<IconBuilding size={16} color="#007294" />}
                    expanded={plantsExpanded}
                    onToggle={togglePlants}
                  >
                    <Box
                      style={{
                        border:
                          "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                    >
                      <Table>
                        <Table.Thead
                          style={{
                            backgroundColor:
                              "light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))",
                          }}
                        >
                          <Table.Tr>
                            <Table.Th>Material Number</Table.Th>
                            <Table.Th>Plant</Table.Th>
                            <Table.Th>Storage Location</Table.Th>
                            <Table.Th>Bin Location</Table.Th>
                            <Table.Th>Stock Quantity</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {PLANT_ITEMS.map((item) => (
                            <Table.Tr
                              key={item.materialNumber}
                              style={{
                                backgroundColor:
                                  "light-dark(var(--mantine-color-white), var(--mantine-color-dark-7))",
                              }}
                            >
                              <Table.Td>{item.materialNumber}</Table.Td>
                              <Table.Td>{item.plant}</Table.Td>
                              <Table.Td>{item.storageLocation}</Table.Td>
                              <Table.Td>{item.binLocation}</Table.Td>
                              <Table.Td>{item.stockQuantity}</Table.Td>
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </Table>
                    </Box>
                  </CollapsibleCard>

                  <CollapsibleCard
                    title="Duplicate Summary"
                    icon={<IconClipboardText size={16} color="#007294" />}
                    expanded={summaryExpanded}
                    onToggle={toggleSummary}
                  >
                    <Box p="md">{/* Summary content will go here */}</Box>
                  </CollapsibleCard>
                </Stack>
              </Box>
            </ScrollArea>

            <Group
              justify="space-between"
              bg="var(--mantine-color-body)"
              p="md"
              style={{
                borderTop:
                  "1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))",
                marginTop: "auto",
              }}
            >
              <Group>
                <Button
                  variant="default"
                  leftSection={<IconChevronLeft size={16} />}
                  onClick={handlePrevious}
                  disabled={currentIndex <= 0}
                >
                  Previous
                </Button>
                <Button
                  variant="default"
                  rightSection={<IconChevronRight size={16} />}
                  onClick={handleNext}
                  disabled={currentIndex >= DUPLICATE_GROUPS.length - 1}
                >
                  Next
                </Button>
              </Group>
              <Group>
                <Button variant="default" rightSection={<IconX size={16} />}>
                  Cancel
                </Button>
                <Button rightSection={<IconCircleCheck size={16} />}>
                  Submit Deletion Request
                </Button>
              </Group>
            </Group>
          </Flex>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
