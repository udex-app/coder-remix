import {
  Box,
  Container,
  Divider,
  Stack,
  TextInput,
  Select,
  Textarea,
} from "@mantine/core";
import Header from "./header";
import Footer from "./footer";
import { MANDATORY_DESC } from "./index";
import { IconSettings } from "@tabler/icons-react";
import { MATERIAL_TYPES } from "~/utils/globalLists";
import {
  getMaterialFromStorage,
  setMaterialInStorage,
} from "~/utils/getMaterial";
import { useState, useEffect } from "react";

export default function BasicDetails() {
  const [material, setMaterial] = useState(getMaterialFromStorage());

  // Sync state changes with localStorage
  useEffect(() => {
    setMaterialInStorage(material);
  }, [material]);

  const handleChange = (field: string, value: string) => {
    setMaterial((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Container size="md" mt="xl">
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
          title="Basic Details"
          description={MANDATORY_DESC}
          icon={<IconSettings size={18} />}
        />
        <Divider />
        <Stack p="md">
          <TextInput
            label="Manufacturer/Supplier"
            placeholder="Enter manufacturer/supplier"
            required
            value={material.manufacturer}
            onChange={(e) => handleChange("manufacturer", e.target.value)}
          />
          <TextInput
            label="Part Number"
            placeholder="Enter part number"
            required
            value={material.partNumber}
            onChange={(e) => handleChange("partNumber", e.target.value)}
          />
          <Select
            label="Material Type"
            placeholder="Select"
            data={MATERIAL_TYPES}
            required
            value={material.materialType}
            onChange={(value) => handleChange("materialType", value || "")}
          />
          <Select
            label="Copy From"
            placeholder="Select"
            data={[
              "Material One",
              "Material Two",
              "Material Three",
              "Material Four",
              "Material Five",
            ]}
            required
            value={material.copyFrom}
            onChange={(value) => handleChange("copyFrom", value || "")}
          />
          <Textarea
            label="Notes"
            placeholder="Enter notes"
            value={material.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            minRows={3}
          />
        </Stack>
        <Divider />
        <Footer nextLabel="Sourcing Information" />
      </Box>
    </Container>
  );
}
