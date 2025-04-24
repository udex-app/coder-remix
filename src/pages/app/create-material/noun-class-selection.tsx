import {
  Box,
  Container,
  Divider,
  Stack,
  Select,
  Button,
  Table,
  TextInput,
  ActionIcon,
  Text,
  Grid,
} from "@mantine/core";
import Header from "./header";
import Footer from "./footer";
import {
  IconSettings,
  IconTools,
  IconPlus,
  IconCircleMinus,
} from "@tabler/icons-react";
import { MANDATORY_DESC } from "./index";
import type { Material, Attribute } from "~/utils/getMaterial";
import Summary from "./summary";
import { useCallback, useEffect, useState } from "react";
import {
  getMaterialFromStorage,
  setMaterialInStorage,
} from "~/utils/getMaterial";

export default function NounClassSelection() {
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

  const handleAddAttribute = useCallback(() => {
    setMaterial((prev: Material) => {
      // If we already have an empty attribute as the last item, don't add another
      const lastAttribute = prev.attributes[prev.attributes.length - 1];
      if (
        lastAttribute &&
        !lastAttribute.name &&
        !lastAttribute.prefix &&
        !lastAttribute.value &&
        !lastAttribute.postfix
      ) {
        return prev;
      }

      return {
        ...prev,
        attributes: [
          ...prev.attributes,
          { name: "", prefix: "", value: "", postfix: "" },
        ],
      };
    });
  }, [setMaterial]);

  const handleAttributeChange = useCallback(
    (index: number, field: keyof Attribute, value: string) => {
      setMaterial((prev: Material) => {
        const newAttributes = [...prev.attributes];
        newAttributes[index] = { ...newAttributes[index], [field]: value };
        return {
          ...prev,
          attributes: newAttributes,
        };
      });
    },
    []
  );

  const handleRemoveAttribute = useCallback((index: number) => {
    setMaterial((prev: Material) => ({
      ...prev,
      attributes: prev.attributes.filter((_, i: number) => i !== index),
    }));
  }, []);

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
              title="Noun & Class Selection"
              description={MANDATORY_DESC}
              icon={<IconSettings size={18} />}
            />
            <Divider />
            <Grid p="md">
              <Grid.Col span={6}>
                <Select
                  label="Noun"
                  placeholder="Select"
                  data={[
                    "Noun One",
                    "Noun Two",
                    "Noun Three",
                    "Noun Four",
                    "Noun Five",
                  ]}
                  required
                  value={material?.noun}
                  onChange={(value) => handleChange("noun", value || "")}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label="Class Selection"
                  placeholder="Select"
                  data={[
                    "Class One",
                    "Class Two",
                    "Class Three",
                    "Class Four",
                    "Class Five",
                  ]}
                  required
                  value={material?.classSelection}
                  onChange={(value) =>
                    handleChange("classSelection", value || "")
                  }
                />
              </Grid.Col>
            </Grid>
            <Divider />
            <Header
              title="Attributes"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
              icon={<IconTools size={18} />}
              rightSection={
                <Button
                  variant="subtle"
                  color="blue"
                  size="sm"
                  rightSection={<IconPlus size={16} />}
                  onClick={handleAddAttribute}
                >
                  Add Attribute
                </Button>
              }
            />
            <Divider />
            <Stack p="md">
              <Box style={{ overflowX: "auto" }}>
                <Box
                  style={{
                    borderRadius: "8px",
                    border:
                      "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
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
                        <Table.Th>Attribute</Table.Th>
                        <Table.Th>Prefix</Table.Th>
                        <Table.Th>Value</Table.Th>
                        <Table.Th>Postfix</Table.Th>
                        <Table.Th style={{ width: "40px" }}></Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {material.attributes.length === 0 ? (
                        <Table.Tr>
                          <Table.Td colSpan={4} align="center">
                            <Text size="sm" c="dimmed">
                              No rows to show.{" "}
                              <Button
                                variant="subtle"
                                color="blue"
                                size="xs"
                                onClick={handleAddAttribute}
                              >
                                Add new attribute →
                              </Button>
                            </Text>
                          </Table.Td>
                        </Table.Tr>
                      ) : (
                        material.attributes.map((attr, index) => (
                          <Table.Tr key={index}>
                            <Table.Td>
                              <TextInput
                                size="xs"
                                placeholder="Enter attribute name"
                                value={attr.name}
                                onChange={(e) =>
                                  handleAttributeChange(
                                    index,
                                    "name",
                                    e.target.value
                                  )
                                }
                              />
                            </Table.Td>
                            <Table.Td>
                              <TextInput
                                size="xs"
                                placeholder="Enter prefix"
                                value={attr.prefix}
                                onChange={(e) =>
                                  handleAttributeChange(
                                    index,
                                    "prefix",
                                    e.target.value
                                  )
                                }
                              />
                            </Table.Td>
                            <Table.Td>
                              <TextInput
                                size="xs"
                                placeholder="Enter value"
                                value={attr.value}
                                onChange={(e) =>
                                  handleAttributeChange(
                                    index,
                                    "value",
                                    e.target.value
                                  )
                                }
                              />
                            </Table.Td>
                            <Table.Td>
                              <TextInput
                                size="xs"
                                placeholder="Enter postfix"
                                value={attr.postfix}
                                onChange={(e) =>
                                  handleAttributeChange(
                                    index,
                                    "postfix",
                                    e.target.value
                                  )
                                }
                              />
                            </Table.Td>
                            <Table.Td>
                              <ActionIcon
                                variant="subtle"
                                color="red"
                                size="md"
                                display="flex"
                                style={{
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveAttribute(index);
                                }}
                              >
                                <IconCircleMinus />
                              </ActionIcon>
                            </Table.Td>
                          </Table.Tr>
                        ))
                      )}
                    </Table.Tbody>
                  </Table>
                </Box>
              </Box>
            </Stack>
            <Divider />
            <Footer nextLabel="BOM" />
          </Box>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Summary />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
