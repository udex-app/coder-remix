import {
  Container,
  Grid,
  Box,
  Divider,
  Stack,
  TextInput,
  Select,
  NumberInput,
  Checkbox,
} from "@mantine/core";
import { IconBuildingStore } from "@tabler/icons-react";
import Header from "./header";
import Footer from "./footer";
import { useState, useEffect } from "react";
import {
  getMaterialFromStorage,
  setMaterialInStorage,
} from "~/utils/getMaterial";
import Summary from "./summary";

export default function SourcingInformation() {
  const [material, setMaterial] = useState(getMaterialFromStorage());

  useEffect(() => {
    setMaterialInStorage(material);
  }, [material]);

  const handleChange = (
    field: string,
    value: string | number | boolean | null
  ) => {
    setMaterial((prev) => ({
      ...prev,
      [field]: value,
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
              title="Sourcing Information"
              description="Enter supplier and sourcing details for the material"
              icon={<IconBuildingStore size={18} />}
            />
            <Divider />
            <Stack p="md">
              <Select
                label="Supplier"
                placeholder="Select"
                required
                data={[
                  "Supplier 1",
                  "Supplier 2",
                  "Supplier 3",
                  "Supplier 4",
                  "Supplier 5",
                ]}
                value={material.supplier}
                onChange={(value) => handleChange("supplier", value || "")}
              />
              <Checkbox
                label="Fixed Supplier?"
                checked={material.fixedSupplier}
                onChange={(e) =>
                  handleChange("fixedSupplier", e.currentTarget.checked)
                }
              />
              <TextInput
                label="Supplier Part Number"
                placeholder="#12345678"
                required
                value={material.supplierPartNumber}
                onChange={(e) =>
                  handleChange("supplierPartNumber", e.target.value)
                }
              />
              <NumberInput
                label="Price"
                placeholder="$17,000"
                required
                value={material.price ?? ""}
                onChange={(value) => handleChange("price", value)}
                prefix="$"
                thousandSeparator=","
              />
              <TextInput
                label="Lead Time"
                placeholder="3-5 business days"
                required
                value={material.leadTime ?? ""}
                onChange={(e) => handleChange("leadTime", e.target.value)}
              />
              <Select
                label="Plant"
                placeholder="Select"
                required
                data={["Plant 1", "Plant 2", "Plant 3", "Plant 4", "Plant 5"]}
                value={material.plant}
                onChange={(value) => handleChange("plant", value || "")}
              />
              <Select
                label="Sales Person"
                placeholder="Select"
                data={[
                  "Sales Person 1",
                  "Sales Person 2",
                  "Sales Person 3",
                  "Sales Person 4",
                  "Sales Person 5",
                ]}
                value={material.salesPerson}
                onChange={(value) => handleChange("salesPerson", value || "")}
              />
              <TextInput
                label="Sales Contact Number"
                placeholder="(216) 555-0108"
                required
                value={material.salesContactNumber}
                onChange={(e) =>
                  handleChange("salesContactNumber", e.target.value)
                }
              />
            </Stack>
            <Divider />
            <Footer nextLabel="Noun, Class Selection & Attributes" />
          </Box>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Summary />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
