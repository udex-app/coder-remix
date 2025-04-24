import {
  Accordion,
  Box,
  Flex,
  Text,
  Divider,
  Grid,
  Stack,
} from "@mantine/core";
import { IconFileDescription } from "@tabler/icons-react";
import {
  getMaterialFromStorage,
  getActiveStepFromStorage,
} from "~/utils/getMaterial";

export default function Summary() {
  const material = getMaterialFromStorage();
  const currentStep = getActiveStepFromStorage();

  return (
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
      <Flex
        p="md"
        bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))"
        align="center"
        gap="xs"
      >
        <IconFileDescription size={20} />
        <Text fw={600}>Summary</Text>
      </Flex>
      <Divider />
      <Accordion variant="default" defaultValue="basic-details">
        {currentStep > 0 && (
          <Accordion.Item value="basic-details">
            <Accordion.Control>
              <Text fw={500}>Basic Details</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Grid>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed">
                    Manufacturer/Supplier
                  </Text>
                  <Text size="sm">{material?.manufacturer}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed">
                    Part Number
                  </Text>
                  <Text size="sm">{material?.partNumber}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed">
                    Material Type
                  </Text>
                  <Text size="sm">{material?.materialType}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed">
                    Copy From
                  </Text>
                  <Text size="sm">{material?.copyFrom}</Text>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Text size="sm" c="dimmed">
                    Notes
                  </Text>
                  <Text size="sm">{material?.notes || "N/A"}</Text>
                </Grid.Col>
              </Grid>
            </Accordion.Panel>
          </Accordion.Item>
        )}
        {currentStep > 1 && (
          <Accordion.Item value="sourcing-information">
            <Accordion.Control>Sourcing Information</Accordion.Control>
            <Accordion.Panel>
              <Stack gap="sm">
                <Stack gap={4}>
                  <Text size="sm" fw={500}>
                    Supplier
                  </Text>
                  <Text size="sm" c="dimmed">
                    {material.supplier || "-"}
                  </Text>
                </Stack>

                <Stack gap={4}>
                  <Text size="sm" fw={500}>
                    Fixed Supplier
                  </Text>
                  <Text size="sm" c="dimmed">
                    {material.fixedSupplier ? "Yes" : "No"}
                  </Text>
                </Stack>

                <Stack gap={4}>
                  <Text size="sm" fw={500}>
                    Supplier Part Number
                  </Text>
                  <Text size="sm" c="dimmed">
                    {material.supplierPartNumber || "-"}
                  </Text>
                </Stack>

                <Stack gap={4}>
                  <Text size="sm" fw={500}>
                    Price
                  </Text>
                  <Text size="sm" c="dimmed">
                    {material.price
                      ? `$${material.price.toLocaleString()}`
                      : "-"}
                  </Text>
                </Stack>

                <Stack gap={4}>
                  <Text size="sm" fw={500}>
                    Lead Time
                  </Text>
                  <Text size="sm" c="dimmed">
                    {material.leadTime || "-"}
                  </Text>
                </Stack>

                <Stack gap={4}>
                  <Text size="sm" fw={500}>
                    Plant
                  </Text>
                  <Text size="sm" c="dimmed">
                    {material.plant || "-"}
                  </Text>
                </Stack>

                <Stack gap={4}>
                  <Text size="sm" fw={500}>
                    Sales Person
                  </Text>
                  <Text size="sm" c="dimmed">
                    {material.salesPerson || "-"}
                  </Text>
                </Stack>

                <Stack gap={4}>
                  <Text size="sm" fw={500}>
                    Sales Contact Number
                  </Text>
                  <Text size="sm" c="dimmed">
                    {material.salesContactNumber || "-"}
                  </Text>
                </Stack>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        )}
        {currentStep > 2 && (
          <Accordion.Item value="noun-class">
            <Accordion.Control>
              <Text fw={500}>Noun, Class Selection & Attributes</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Grid>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed">
                    Noun
                  </Text>
                  <Text size="sm">{material?.noun}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed">
                    Class
                  </Text>
                  <Text size="sm">{material?.classSelection}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed">
                    Short Text
                  </Text>
                  <Text size="sm">-Short Text Here-</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed">
                    PO Text
                  </Text>
                  <Text size="sm">-PO Text Here-</Text>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Text size="sm" c="dimmed">
                    Long Text
                  </Text>
                  <Text size="sm">-Long Text Here-</Text>
                </Grid.Col>
              </Grid>
            </Accordion.Panel>
          </Accordion.Item>
        )}
        {currentStep > 3 && (
          <Accordion.Item value="bom">
            <Accordion.Control>
              <Text fw={500}>BOM</Text>
            </Accordion.Control>
          </Accordion.Item>
        )}
        {currentStep > 4 && (
          <Accordion.Item value="criticality">
            <Accordion.Control>
              <Text fw={500}>Criticality</Text>
            </Accordion.Control>
          </Accordion.Item>
        )}
        {currentStep > 5 && (
          <Accordion.Item value="material-plant">
            <Accordion.Control>
              <Text fw={500}>Material Plant Master Data</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Grid>
                <Grid.Col span={12}>
                  <Text size="sm" c="dimmed">
                    Plant
                  </Text>
                  <Text size="sm">1000</Text>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Text size="sm" c="dimmed">
                    Storage Location
                  </Text>
                  <Text size="sm">01</Text>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Text size="sm" c="dimmed">
                    BOM
                  </Text>
                  <Text size="sm">-</Text>
                </Grid.Col>
              </Grid>
            </Accordion.Panel>
          </Accordion.Item>
        )}
      </Accordion>
    </Box>
  );
}
