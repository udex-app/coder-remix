import { Grid, Tabs, Box, Accordion, Badge } from "@mantine/core";
import { MyGrid } from "~/components";
import { UnderConstruction } from "~/components";
import { useState } from "react";

const TYPES = ["ERSA", "FERT", "HALB", "ROH", "HAWA", "NLAG"] as const;
const BADGE_CLASSES = {
  ERSA: "badge-green",
  FERT: "badge-blue",
  HALB: "badge-green",
  ROH: "badge-orange",
  HAWA: "badge-blue",
  NLAG: "badge-blue",
} as const;
const ACCORDION_VALUES = [
  {
    title: "Material Summary",
    content: "Material summary content goes here",
  },
  {
    title: "Calculator Summary",
    content: "Calculator summary content goes here",
  },
  {
    title: "Calculator Results",
    content: "Calculator results content goes here",
  },
];

const columnDefs = [
  { field: "Plant", headerName: "Plant", flex: 1 },
  { field: "Material", headerName: "Material", flex: 1 },
  {
    field: "Type",
    headerName: "Type",
    flex: 1,
    cellRenderer: (params: any) => (
      <Badge
        className={BADGE_CLASSES[params.value as keyof typeof BADGE_CLASSES]}
        size="lg"
        radius="sm"
        variant="light"
      >
        {params.value}
      </Badge>
    ),
  },
];

// Helper function to generate random material number
const generateMaterialNumber = () => {
  return String(Math.floor(10000000 + Math.random() * 90000000)).padStart(
    8,
    "0"
  );
};

// Helper function to generate random plant number
const generatePlantNumber = () => {
  const plantNumbers = ["1000", "1100", "1200", "1300", "1400", "1500"];
  return plantNumbers[Math.floor(Math.random() * plantNumbers.length)];
};

const mockData = Array(20)
  .fill(null)
  .map(() => ({
    Plant: generatePlantNumber(),
    Material: generateMaterialNumber(),
    Type: TYPES[Math.floor(Math.random() * TYPES.length)],
  }));

export default function RopRoq() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Grid h="calc(100vh - 59px)" style={{ overflow: "hidden" }}>
      <Grid.Col
        span={{ base: 12, md: isCollapsed ? 12 : 3 }}
        pr="0"
        style={{
          height: "calc(100vh - var(--mantine-spacing-md) * 2)",
          overflowY: "hidden",
          position: "relative",
          zIndex: isCollapsed ? 1000 : "auto",
        }}
      >
        <MyGrid
          title="MATERIAL PLANT DATA"
          rowData={mockData}
          colDefs={columnDefs}
          fullWidthSearch
          multiSelect={false}
          simpleSearch
          noBorderRadius
          collapsible
          isCollapsed={isCollapsed}
          onCollapseChange={setIsCollapsed}
        />
      </Grid.Col>

      <Grid.Col
        span={{ base: 12, md: 9 }}
        p="0"
        style={{
          height: "calc(100vh - var(--mantine-spacing-md) * 2)",
          overflowY: "auto",
        }}
      >
        <Tabs defaultValue="rop-roq" mt="8px">
          <Tabs.List bg="light-dark(var(--mantine-color-white), var(--mantine-color-dark-6))">
            <Tabs.Tab p="lg" value="material-details">
              Material Details
            </Tabs.Tab>
            <Tabs.Tab p="lg" value="rop-roq">
              ROP/ROQ
            </Tabs.Tab>
            <Tabs.Tab p="lg" value="criticality">
              Criticality
            </Tabs.Tab>
            <Tabs.Tab p="lg" value="lead-time">
              Lead Time
            </Tabs.Tab>
            <Tabs.Tab p="lg" value="material-health">
              Material Health
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="rop-roq" p="xl">
            <Accordion variant="separated">
              {ACCORDION_VALUES.map((item, index) => (
                <Accordion.Item
                  key={index}
                  value={item.title}
                  style={{
                    border:
                      "1px solid light-dark(#E0E3E6, var(--mantine-color-dark-4))",
                    boxShadow: "var(--mantine-shadow-sm)",
                    backgroundColor: "var(--mantine-color-body)",
                  }}
                >
                  <Accordion.Control>{item.title}</Accordion.Control>
                  <Accordion.Panel>{item.content}</Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Tabs.Panel>

          <Tabs.Panel value="material-details" pt="xl">
            <UnderConstruction
              title="Material Details Coming Soon"
              message="The material details interface is under development. Check back soon!"
            />
          </Tabs.Panel>

          <Tabs.Panel value="criticality" pt="xl">
            <UnderConstruction
              title="Criticality Analysis Coming Soon"
              message="The criticality analysis interface is under development. Check back soon!"
            />
          </Tabs.Panel>

          <Tabs.Panel value="lead-time" pt="xl">
            <UnderConstruction
              title="Lead Time Analysis Coming Soon"
              message="The lead time analysis interface is under development. Check back soon!"
            />
          </Tabs.Panel>

          <Tabs.Panel value="material-health" pt="xl">
            <UnderConstruction
              title="Material Health Coming Soon"
              message="The material health interface is under development. Check back soon!"
            />
          </Tabs.Panel>
        </Tabs>
      </Grid.Col>
    </Grid>
  );
}
