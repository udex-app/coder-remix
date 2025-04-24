import {
  Container,
  TextInput,
  Group,
  Card,
  Text,
  Stack,
  RingProgress,
  SimpleGrid,
  Center,
  Divider,
  Button,
  UnstyledButton,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import {
  IconSearch,
  IconKey,
  IconChevronRight,
  IconBuilding,
  IconLayoutBoard,
  IconPencil,
} from "@tabler/icons-react";
import { useNavigate } from "react-router";
import CustomSelect from "~/components/common/CustomSelect";
import SectionPanelTab from "~/components/common/SectionPanelTab";
import ThreeDotsMenu from "~/components/common/ThreeDotsMenu";
import RopIncreasePage from "~/pages/app/rop-roq/ropIncrease";

const STAT_CARDS = [
  {
    title: "ROP Decrease",
    sections: [
      { value: 25, color: "var(--mantine-color-cyan-6)" },
      { value: 40, color: "var(--mantine-color-lime-6)" },
      { value: 31, color: "var(--mantine-color-blue-6)" },
    ],
    stats: {
      quantityToReview: 25,
      reviewedQuantity: 100,
      overrideQuantity: 100,
    },
    quantityChange: 9.2,
    reviewChange: -8.4,
    overrideChange: 9.2,
  },
  {
    title: "ROP Increase",
    sections: [
      { value: 20, color: "var(--mantine-color-cyan-6)" },
      { value: 25, color: "var(--mantine-color-lime-6)" },
      { value: 10, color: "var(--mantine-color-blue-6)" },
    ],
    stats: {
      quantityToReview: 20,
      reviewedQuantity: 150,
      overrideQuantity: 30,
    },
    quantityChange: 9.2,
    reviewChange: -8.4,
    overrideChange: 9.2,
  },
  {
    title: "ROQ Decrease",
    sections: [{ value: 9, color: "var(--mantine-color-blue-6)" }],
    stats: {
      quantityToReview: 0,
      reviewedQuantity: 0,
      overrideQuantity: 25,
    },
    quantityChange: 0,
    reviewChange: 0,
    overrideChange: 9.2,
  },
  {
    title: "ROQ Increase",
    sections: [],
    stats: {
      quantityToReview: 0,
      reviewedQuantity: 0,
      overrideQuantity: 0,
    },
    quantityChange: 0,
    reviewChange: 0,
    overrideChange: 0,
  },
  {
    title: "Potential Unstock",
    sections: [
      { value: 14, color: "var(--mantine-color-cyan-6)" },
      { value: 10, color: "var(--mantine-color-lime-6)" },
    ],
    stats: {
      quantityToReview: 45,
      reviewedQuantity: 20,
      overrideQuantity: 0,
    },
    quantityChange: 9.2,
    reviewChange: -8.4,
    overrideChange: 0,
  },
  {
    title: "Potential Stock",
    sections: [
      { value: 25, color: "var(--mantine-color-cyan-6)" },
      { value: 30, color: "var(--mantine-color-lime-6)" },
      { value: 30, color: "var(--mantine-color-blue-6)" },
    ],
    stats: {
      quantityToReview: 22,
      reviewedQuantity: 12,
      overrideQuantity: 300,
    },
    quantityChange: 9.2,
    reviewChange: -8.4,
    overrideChange: 9.2,
  },
  {
    title: "Rounding Value",
    sections: [
      { value: 35, color: "var(--mantine-color-cyan-6)" },
      { value: 30, color: "var(--mantine-color-lime-6)" },
    ],
    stats: {
      quantityToReview: 100,
      reviewedQuantity: 230,
      overrideQuantity: 0,
    },
    quantityChange: 0,
    reviewChange: 0,
    overrideChange: 0,
  },
  {
    title: "Overview",
    sections: [
      { value: 25, color: "var(--mantine-color-cyan-6)" },
      { value: 25, color: "var(--mantine-color-lime-6)" },
      { value: 20, color: "var(--mantine-color-blue-6)" },
    ],
    stats: {
      quantityToReview: 80,
      reviewedQuantity: 200,
      overrideQuantity: 200,
    },
    quantityChange: 9.2,
    reviewChange: -8.4,
    overrideChange: 9.2,
  },
];

const KEY_ITEMS = [
  { label: "Quantity to Review", color: "var(--mantine-color-cyan-6)" },
  { label: "Reviewed Quantity", color: "var(--mantine-color-lime-6)" },
  { label: "Override Quantity", color: "var(--mantine-color-blue-6)" },
  { label: "Optimized (Review)", color: "var(--mantine-color-orange-6)" },
  {
    label: "Optimized (Without Review)",
    color: "var(--mantine-color-violet-6)",
  },
];

interface StatCardProps {
  title: string;
  sections: Array<{ value: number; color: string }>;
  stats: {
    quantityToReview: number;
    reviewedQuantity: number;
    overrideQuantity: number;
  };
  reviewChange: number;
  overrideChange: number;
  quantityChange: number;
}

function StatCard({
  title,
  sections,
  stats,
  reviewChange,
  overrideChange,
  quantityChange,
}: StatCardProps) {
  const navigate = useNavigate();
  const [animatedSections, setAnimatedSections] = useState(
    sections.map((section) => ({ ...section, value: 0 }))
  );
  const [animatedTotal, setAnimatedTotal] = useState(0);

  useEffect(() => {
    const duration = 500;
    const frameRate = 500 / 60;
    const totalFrames = duration / frameRate;
    let frame = 0;

    const animation = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      const newSections = sections.map((section) => ({
        ...section,
        value: Math.min(section.value, progress * section.value),
      }));

      setAnimatedSections(newSections);
      setAnimatedTotal(
        Math.min(
          sections.reduce((sum, section) => sum + section.value, 0),
          progress * sections.reduce((sum, section) => sum + section.value, 0)
        )
      );

      if (frame >= totalFrames) clearInterval(animation);
    }, frameRate);

    return () => clearInterval(animation);
  }, [sections]);

  const renderQuantityRow = (label: string, value: number, change: number) => (
    <Group justify="space-between">
      <Text span c="dimmed" size="sm">
        {label}
      </Text>
      <Group gap="xs">
        <Text span size="sm">
          {value}
        </Text>
        <Text span size="sm" c={change >= 0 ? "teal" : "red"}>
          {change >= 0 ? "+" : ""}
          {change}%
        </Text>
      </Group>
    </Group>
  );

  return (
    <Card withBorder p="lg" radius={0} bg="var(--mantine-color-body)">
      <Stack>
        <Group justify="space-between">
          <Text fw={500}>{title}</Text>
          <UnstyledButton
            onClick={() => navigate("/app/rop-roq/rop-increase")}
            c="blue"
            style={{ fontSize: "var(--mantine-font-size-sm)" }}
          >
            <Group gap={4}>
              <Text span>View Materials</Text>
              <IconChevronRight size={14} style={{ marginTop: 2 }} />
            </Group>
          </UnstyledButton>
        </Group>

        <Center>
          <RingProgress
            size={140}
            thickness={10}
            roundCaps
            my="sm"
            sections={animatedSections}
            label={
              <Box ta="center">
                <Box fw={500}>{Math.round(animatedTotal)}%</Box>
                <Box fz="xs" c="dimmed">
                  Total
                </Box>
              </Box>
            }
          />
        </Center>

        <Divider />

        <Stack gap="xs">
          {renderQuantityRow(
            "Quantity to Review",
            stats.quantityToReview,
            quantityChange
          )}
          {renderQuantityRow(
            "Reviewed Quantity",
            stats.reviewedQuantity,
            reviewChange
          )}
          {renderQuantityRow(
            "Override Quantity",
            stats.overrideQuantity,
            overrideChange
          )}
        </Stack>
      </Stack>
    </Card>
  );
}

export default function ROPROQ() {
  const [showKey, { toggle: toggleKey }] = useDisclosure(false);
  const [plant, setPlant] = useState("");
  const [widget, setWidget] = useState("");

  return (
    <Container fluid p="md">
      <SectionPanelTab
        title="ROP/ROQ Summary"
        noPadding
        headerPadding="13px 16px"
        noShadow
        fullBorder={false}
        onlyHeaderBorder={true}
        actions={
          <ThreeDotsMenu
            items={[
              {
                label: "Edit",
                onClick: () => {},
                icon: (
                  <IconPencil size={16} color="var(--mantine-color-blue-6)" />
                ),
              },
            ]}
          />
        }
      >
        <Group
          p="md"
          justify="space-between"
          style={{
            borderLeft: "1px solid var(--mantine-color-gray-3)",
            borderRight: "1px solid var(--mantine-color-gray-3)",
          }}
        >
          <Group>
            <TextInput
              placeholder="Search"
              leftSection={<IconSearch size={16} />}
              style={{ width: 300 }}
            />
            <Button
              variant={showKey ? "filled" : "light"}
              color="blue"
              leftSection={<IconKey size={16} />}
              onClick={toggleKey}
            >
              Key
            </Button>
          </Group>
          <Group>
            <CustomSelect
              leftIcon={<IconBuilding size={18} />}
              placeholder="All Plants"
              data={["Plant 1", "Plant 2", "Plant 3"]}
              w={175}
              value={plant}
              onChange={(value) => setPlant(value)}
            />

            <CustomSelect
              leftIcon={<IconLayoutBoard size={18} />}
              placeholder="Widgets"
              data={["Widget 1", "Widget 2", "Widget 3"]}
              w={175}
              value={widget}
              onChange={(value) => setWidget(value)}
            />
          </Group>
        </Group>

        {showKey && (
          <Group
            p="md"
            gap="xl"
            align="center"
            justify="center"
            bg="lightGray"
            style={{
              borderTop:
                "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
              borderLeft:
                "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
              borderRight:
                "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
            }}
          >
            <Text size="sm">Key:</Text>
            <Group gap="xl">
              {KEY_ITEMS.map(({ label, color }) => (
                <Group key={label} gap="xs">
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: color,
                    }}
                  />
                  <Text size="sm">{label}</Text>
                </Group>
              ))}
            </Group>
          </Group>
        )}

        <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }} spacing={0}>
          {STAT_CARDS.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </SimpleGrid>
      </SectionPanelTab>
    </Container>
  );
}
