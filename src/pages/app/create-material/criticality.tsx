import {
  Container,
  Grid,
  Box,
  Text,
  Divider,
  Stack,
  Button,
  Badge,
  NumberInput,
  Radio,
  CheckIcon,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import type { Material } from "~/utils/getMaterial";
import Header from "./header";
import Footer from "./footer";
import Summary from "./summary";
import { CRITICALITY_OPTIONS } from "~/utils/globalLists";
import { useEffect } from "react";
import {
  getMaterialFromStorage,
  setMaterialInStorage,
} from "~/utils/getMaterial";
import { useState } from "react";

export default function Criticality() {
  const [material, setMaterial] = useState(getMaterialFromStorage());

  // Sync state changes with localStorage
  useEffect(() => {
    setMaterialInStorage(material);
  }, [material]);

  const handleChange = (field: string, value: string | number | null) => {
    setMaterial((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCalculate = () => {
    setMaterial((prev) => ({
      ...prev,
      isCriticalityCalculated: true,
      materialCritical: true,
      stockedStatus: "Not Stocked",
      materialRepairable: false,
      stockClass: "LOW RISK",
    }));
  };

  return (
    <Container size="xl" mt="xl">
      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Box
            bg="var(--mantine-color-body)"
            style={{
              border:
                "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "var(--mantine-shadow-sm)",
            }}
          >
            <Header
              title="Criticality"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
              icon={<IconAlertCircle size={18} />}
            />
            <Divider />
            <Stack p="md" gap="lg">
              {material.isCriticalityCalculated && (
                <Grid
                  mb="md"
                  p="md"
                  bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))"
                >
                  <Grid.Col span={3}>
                    <Text size="sm" fw={500}>
                      Material Critical?
                    </Text>
                    <Text>{material.materialCritical ? "Yes" : "No"}</Text>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Text size="sm" fw={500}>
                      Stocked/Non-Stocked?
                    </Text>
                    <Text>{material.stockedStatus || "Not Stocked"}</Text>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Text size="sm" fw={500}>
                      Material Repairable?
                    </Text>
                    <Text>{material.materialRepairable ? "Yes" : "No"}</Text>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Text size="sm" fw={500}>
                      Recommend Stock Class
                    </Text>
                    <Badge
                      className={
                        material.stockClass === "LOW RISK"
                          ? "badge-green"
                          : "badge-red"
                      }
                      radius="sm"
                      variant="light"
                    >
                      {material.stockClass || "LOW RISK"}
                    </Badge>
                  </Grid.Col>
                </Grid>
              )}
              <Grid mb="md">
                {CRITICALITY_OPTIONS.map(({ key, label, options }) => (
                  <Grid.Col key={key} span={6} mb="md">
                    <Radio.Group
                      label={
                        <Text fw={500}>
                          {label} <span style={{ color: "red" }}>*</span>
                        </Text>
                      }
                      value={
                        material[
                          key as keyof Pick<
                            Material,
                            | "impactOfFailure"
                            | "safetyRisk"
                            | "frequencyOfFailure"
                            | "isRepairable"
                          >
                        ]
                      }
                      onChange={(value) => handleChange(key, value)}
                    >
                      <Stack mt="xs">
                        {options.map((option) => (
                          <Radio
                            key={option.value}
                            value={option.value}
                            label={option.label}
                            icon={CheckIcon}
                            color="rgba(0, 114, 148, 1)"
                            styles={{
                              root: {
                                "--radio-radius": "var(--mantine-radius-sm)",
                              },
                            }}
                          />
                        ))}
                      </Stack>
                    </Radio.Group>
                  </Grid.Col>
                ))}
              </Grid>
              <Grid>
                <Grid.Col span={4}>
                  <NumberInput
                    label={
                      <Text fw={500}>
                        Lead Time <span style={{ color: "red" }}>*</span>
                      </Text>
                    }
                    placeholder="Enter lead time"
                    value={material.leadTime ?? ""}
                    onChange={(value) => handleChange("leadTime", value)}
                    min={0}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <NumberInput
                    label={
                      <Text fw={500}>
                        Potential Downtime{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Text>
                    }
                    placeholder="Hour(s)"
                    value={material.potentialDowntime ?? ""}
                    onChange={(value) =>
                      handleChange("potentialDowntime", value)
                    }
                    min={0}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <NumberInput
                    label={
                      <Text fw={500}>
                        Cost Per New Item{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Text>
                    }
                    placeholder="Enter Cost"
                    value={material.costPerNewItem ?? ""}
                    onChange={(value) => handleChange("costPerNewItem", value)}
                    min={0}
                    prefix="$"
                  />
                </Grid.Col>
              </Grid>
              <Button
                variant="default"
                size="sm"
                style={{ alignSelf: "flex-start" }}
                onClick={handleCalculate}
              >
                Calculate
              </Button>
            </Stack>
            <Divider />
            <Footer nextLabel="Material Plant Master Data" />
          </Box>
        </Grid.Col>

        {/* Summary Section */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Summary />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
