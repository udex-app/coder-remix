import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Text,
  Divider,
  ScrollArea,
  Table,
  Badge,
  ActionIcon,
  TextInput,
  Group,
} from "@mantine/core";
import {
  IconDatabase,
  IconClipboard,
  IconPackage,
  IconPlus,
  IconCircleMinus,
  IconEdit,
} from "@tabler/icons-react";
import { useState, useCallback, useEffect } from "react";
import type { Material } from "~/utils/getMaterial";
import Header from "./header";
import Footer from "./footer";
import Summary from "./summary";
import scrollbarStyles from "~/styles/scrollbar.module.css";
import MaterialPlantModal, {
  type Plant,
  type PlantFormData,
} from "./material-plant-modal";
import { useLocalStorage } from "@mantine/hooks";
import {
  getMaterialFromStorage,
  setMaterialInStorage,
} from "~/utils/getMaterial";

interface StorageLocation {
  storageLocation: string;
  binLocation: string;
  stockQuantity: number;
}

interface Bom {
  functionalLocation: string;
  equipment: string;
  equipmentName: string;
}

export default function MaterialPlant() {
  const [materialPlantModalOpened, setMaterialPlantModalOpened] =
    useState(false);
  const [editingPlantIndex, setEditingPlantIndex] = useState<number | null>(
    null
  );

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

  const [selectedPlantIndex, setSelectedPlantIndex] = useState<number | null>(
    material.plants.length > 0 ? 0 : null
  );

  const handleAddPlant = useCallback((plantFormData: PlantFormData) => {
    const { plants: selectedPlants, ...plantBase } = plantFormData;

    setMaterial((prev: Material) => {
      const newPlants = selectedPlants.map((plantId: string) => ({
        ...plantBase,
        plant: plantId,
        storageLocations: [],
        boms: [],
      }));

      const plantsToAdd = newPlants.filter(
        (newPlant: Plant) =>
          !prev.plants.some(
            (existingPlant) => existingPlant.plant === newPlant.plant
          )
      );

      if (plantsToAdd.length === 0) {
        return prev;
      }

      const updatedMaterial = {
        ...prev,
        plants: [...prev.plants, ...plantsToAdd],
      };

      const newIndex = updatedMaterial.plants.length - 1;
      setSelectedPlantIndex(newIndex);

      return updatedMaterial;
    });
  }, []);

  const handleRemovePlant = useCallback(
    (index: number) => {
      const updatedPlants = material.plants.filter((_, i) => i !== index);

      if (updatedPlants.length === 0) {
        setSelectedPlantIndex(null);
      } else {
        if (index === material.plants.length - 1) {
          setSelectedPlantIndex(updatedPlants.length - 1);
        } else if (index < selectedPlantIndex!) {
          setSelectedPlantIndex(selectedPlantIndex! - 1);
        } else if (index === selectedPlantIndex) {
          setSelectedPlantIndex(0);
        }
      }

      setMaterial({
        ...material,
        plants: updatedPlants,
      });
    },
    [material.plants, selectedPlantIndex]
  );

  const handleEditPlant = useCallback(
    (index: number, plantData: PlantFormData) => {
      const { plants: selectedPlants, ...plantBase } = plantData;

      setMaterial((prev: Material) => {
        const newPlants = [...prev.plants];
        newPlants[index] = {
          ...plantBase,
          plant: selectedPlants[0],
          storageLocations: prev.plants[index].storageLocations,
          boms: prev.plants[index].boms,
        };
        return {
          ...prev,
          plants: newPlants,
        };
      });
    },
    []
  );

  const handleAddStorageLocation = useCallback(() => {
    if (selectedPlantIndex === null) return;

    setMaterial((prev: Material) => {
      const currentLocations = prev.plants[selectedPlantIndex].storageLocations;
      const lastLocation = currentLocations[currentLocations.length - 1];

      // If we already have an empty location as the last item, don't add another
      if (
        lastLocation &&
        !lastLocation.storageLocation &&
        !lastLocation.binLocation &&
        lastLocation.stockQuantity === 0
      ) {
        return prev;
      }

      const newPlants = [...prev.plants];
      newPlants[selectedPlantIndex] = {
        ...newPlants[selectedPlantIndex],
        storageLocations: [
          ...newPlants[selectedPlantIndex].storageLocations,
          { storageLocation: "", binLocation: "", stockQuantity: 0 },
        ],
      };
      return { ...prev, plants: newPlants };
    });
  }, [selectedPlantIndex]);

  const handleRemoveStorageLocation = useCallback(
    (index: number) => {
      if (selectedPlantIndex === null) return;

      setMaterial((prev: Material) => {
        const newPlants = [...prev.plants];
        newPlants[selectedPlantIndex] = {
          ...newPlants[selectedPlantIndex],
          storageLocations: newPlants[
            selectedPlantIndex
          ].storageLocations.filter((_, i) => i !== index),
        };
        return { ...prev, plants: newPlants };
      });
    },
    [selectedPlantIndex]
  );

  const handleStorageLocationChange = useCallback(
    (index: number, field: keyof StorageLocation, value: string | number) => {
      if (selectedPlantIndex === null) return;

      setMaterial((prev: Material) => {
        const newPlants = [...prev.plants];
        const newLocations = [
          ...newPlants[selectedPlantIndex].storageLocations,
        ];
        newLocations[index] = { ...newLocations[index], [field]: value };
        newPlants[selectedPlantIndex] = {
          ...newPlants[selectedPlantIndex],
          storageLocations: newLocations,
        };
        return { ...prev, plants: newPlants };
      });
    },
    [selectedPlantIndex]
  );

  const handleAddBOM = useCallback(() => {
    if (selectedPlantIndex === null) return;

    setMaterial((prev: Material) => {
      const currentBOMs = prev.plants[selectedPlantIndex].boms;
      const lastBOM = currentBOMs[currentBOMs.length - 1];

      // If we already have an empty BOM as the last item, don't add another
      if (
        lastBOM &&
        !lastBOM.functionalLocation &&
        !lastBOM.equipment &&
        !lastBOM.equipmentName
      ) {
        return prev;
      }

      const newPlants = [...prev.plants];
      newPlants[selectedPlantIndex] = {
        ...newPlants[selectedPlantIndex],
        boms: [
          ...newPlants[selectedPlantIndex].boms,
          { functionalLocation: "", equipment: "", equipmentName: "" },
        ],
      };
      return { ...prev, plants: newPlants };
    });
  }, [selectedPlantIndex]);

  const handleRemoveBOM = useCallback(
    (index: number) => {
      if (selectedPlantIndex === null) return;

      setMaterial((prev: Material) => {
        const newPlants = [...prev.plants];
        newPlants[selectedPlantIndex] = {
          ...newPlants[selectedPlantIndex],
          boms: newPlants[selectedPlantIndex].boms.filter(
            (_, i) => i !== index
          ),
        };
        return { ...prev, plants: newPlants };
      });
    },
    [selectedPlantIndex]
  );

  const handleBOMChange = useCallback(
    (index: number, field: keyof Bom, value: string) => {
      if (selectedPlantIndex === null) return;

      setMaterial((prev: Material) => {
        const newPlants = [...prev.plants];
        const newBOMs = [...newPlants[selectedPlantIndex].boms];
        newBOMs[index] = { ...newBOMs[index], [field]: value };
        newPlants[selectedPlantIndex] = {
          ...newPlants[selectedPlantIndex],
          boms: newBOMs,
        };
        return { ...prev, plants: newPlants };
      });
    },
    [selectedPlantIndex]
  );

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
              title="Material Plant Master Data"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
              icon={<IconDatabase size={18} />}
              rightSection={
                <Button
                  variant="subtle"
                  color="blue"
                  size="sm"
                  rightSection={<IconPlus size={16} />}
                  onClick={() => setMaterialPlantModalOpened(true)}
                >
                  Create New
                </Button>
              }
            />
            <Divider />
            <Stack p="md">
              <Box
                style={{
                  border:
                    "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <ScrollArea
                  type="always"
                  scrollbars="x"
                  classNames={{
                    scrollbar: scrollbarStyles.scrollbar,
                    thumb: scrollbarStyles.thumb,
                  }}
                  viewportProps={{
                    style: {
                      paddingBottom: "var(--mantine-spacing-xs)",
                    },
                  }}
                >
                  <Table>
                    <Table.Thead
                      style={{
                        backgroundColor:
                          "light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))",
                      }}
                    >
                      <Table.Tr style={{ whiteSpace: "nowrap" }}>
                        <Table.Th>Plant</Table.Th>
                        <Table.Th>PDT</Table.Th>
                        <Table.Th>MAP</Table.Th>
                        <Table.Th>Unit of Measure</Table.Th>
                        <Table.Th>MRP Controller</Table.Th>
                        <Table.Th>Valuation Class</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Is Stocked?</Table.Th>
                        <Table.Th>ROP</Table.Th>
                        <Table.Th>ROQ</Table.Th>
                        <Table.Th>Rounding Value</Table.Th>
                        <Table.Th>Max Working Capital</Table.Th>
                        <Table.Th>Is Spare Part?</Table.Th>
                        <Table.Th></Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {material.plants.length === 0 ? (
                        <Table.Tr>
                          <Table.Td colSpan={13} align="left">
                            <Text size="sm" c="dimmed">
                              No rows to show.{" "}
                              <Button
                                variant="subtle"
                                color="blue"
                                size="xs"
                                onClick={() =>
                                  setMaterialPlantModalOpened(true)
                                }
                              >
                                Add new plant →
                              </Button>
                            </Text>
                          </Table.Td>
                        </Table.Tr>
                      ) : (
                        material.plants.map((plant, index) => (
                          <Table.Tr
                            key={index}
                            style={{
                              cursor: "pointer",
                              backgroundColor:
                                selectedPlantIndex === index
                                  ? "light-dark(var(--mantine-color-blue-0), var(--mantine-color-dark-5))"
                                  : "transparent",
                            }}
                            onClick={() => setSelectedPlantIndex(index)}
                          >
                            <Table.Td>{plant.plant}</Table.Td>
                            <Table.Td>{plant.pdt}</Table.Td>
                            <Table.Td>{plant.map}</Table.Td>
                            <Table.Td>{plant.unitOfMeasure}</Table.Td>
                            <Table.Td>{plant.mrpController}</Table.Td>
                            <Table.Td>{plant.valuationClass}</Table.Td>
                            <Table.Td>
                              <Badge
                                className={
                                  plant.status === "01"
                                    ? "badge-blue"
                                    : "badge-green"
                                }
                                variant="outline"
                                radius="sm"
                              >
                                {plant.status}
                              </Badge>
                            </Table.Td>
                            <Table.Td>
                              {plant.isStocked ? "Yes" : "No"}
                            </Table.Td>
                            <Table.Td>{plant.rop}</Table.Td>
                            <Table.Td>{plant.roq}</Table.Td>
                            <Table.Td>{plant.roundingValue}</Table.Td>
                            <Table.Td>
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(plant.maxWorkingCapital)}
                            </Table.Td>
                            <Table.Td>
                              {plant.isSparePart ? "Yes" : "No"}
                            </Table.Td>
                            <Table.Td>
                              <Group gap="xs" wrap="nowrap">
                                <ActionIcon
                                  variant="subtle"
                                  color="blue"
                                  size="md"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingPlantIndex(index);
                                    setMaterialPlantModalOpened(true);
                                  }}
                                >
                                  <IconEdit />
                                </ActionIcon>
                                <ActionIcon
                                  variant="subtle"
                                  color="red"
                                  size="md"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemovePlant(index);
                                  }}
                                >
                                  <IconCircleMinus />
                                </ActionIcon>
                              </Group>
                            </Table.Td>
                          </Table.Tr>
                        ))
                      )}
                    </Table.Tbody>
                  </Table>
                </ScrollArea>
              </Box>
            </Stack>

            {selectedPlantIndex !== null && (
              <>
                <Divider />

                <Header
                  title="Material Plant Storage Location"
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
                  icon={<IconClipboard size={18} />}
                  rightSection={
                    <Button
                      variant="subtle"
                      color="blue"
                      size="sm"
                      rightSection={<IconPlus size={16} />}
                      onClick={handleAddStorageLocation}
                    >
                      Create New
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
                            <Table.Th>Storage Location</Table.Th>
                            <Table.Th>Bin Location</Table.Th>
                            <Table.Th>Stock Quantity</Table.Th>
                            <Table.Th style={{ width: "40px" }}></Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {material.plants[selectedPlantIndex].storageLocations
                            .length === 0 ? (
                            <Table.Tr>
                              <Table.Td colSpan={4} align="center">
                                <Text size="sm" c="dimmed">
                                  No rows to show.{" "}
                                  <Button
                                    variant="subtle"
                                    color="blue"
                                    size="xs"
                                    onClick={handleAddStorageLocation}
                                  >
                                    Add new location →
                                  </Button>
                                </Text>
                              </Table.Td>
                            </Table.Tr>
                          ) : (
                            material.plants[
                              selectedPlantIndex
                            ].storageLocations.map((loc, index) => (
                              <Table.Tr key={index}>
                                <Table.Td>
                                  <TextInput
                                    size="xs"
                                    placeholder="Enter location"
                                    value={loc.storageLocation}
                                    onChange={(e) =>
                                      handleStorageLocationChange(
                                        index,
                                        "storageLocation",
                                        e.target.value
                                      )
                                    }
                                  />
                                </Table.Td>
                                <Table.Td>
                                  <TextInput
                                    size="xs"
                                    placeholder="Enter bin"
                                    value={loc.binLocation}
                                    onChange={(e) =>
                                      handleStorageLocationChange(
                                        index,
                                        "binLocation",
                                        e.target.value
                                      )
                                    }
                                  />
                                </Table.Td>
                                <Table.Td>
                                  <TextInput
                                    size="xs"
                                    type="number"
                                    placeholder="Enter quantity"
                                    value={loc.stockQuantity.toString()}
                                    onChange={(e) =>
                                      handleStorageLocationChange(
                                        index,
                                        "stockQuantity",
                                        parseInt(e.target.value) || 0
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
                                      handleRemoveStorageLocation(index);
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

                <Header
                  title="BOM"
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
                  icon={<IconPackage size={18} />}
                  rightSection={
                    <Button
                      variant="subtle"
                      color="blue"
                      size="sm"
                      rightSection={<IconPlus size={16} />}
                      onClick={handleAddBOM}
                    >
                      Create New
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
                            <Table.Th>Functional Location</Table.Th>
                            <Table.Th>Equipment</Table.Th>
                            <Table.Th>Equipment Name</Table.Th>
                            <Table.Th style={{ width: "40px" }}></Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {material.plants[selectedPlantIndex].boms.length ===
                          0 ? (
                            <Table.Tr>
                              <Table.Td colSpan={4} align="center">
                                <Text size="sm" c="dimmed">
                                  No rows to show.{" "}
                                  <Button
                                    variant="subtle"
                                    color="blue"
                                    size="xs"
                                    onClick={handleAddBOM}
                                  >
                                    Add new BOM →
                                  </Button>
                                </Text>
                              </Table.Td>
                            </Table.Tr>
                          ) : (
                            material.plants[selectedPlantIndex].boms.map(
                              (bom, index) => (
                                <Table.Tr key={index}>
                                  <Table.Td>
                                    <TextInput
                                      size="xs"
                                      placeholder="Enter location"
                                      value={bom.functionalLocation}
                                      onChange={(e) =>
                                        handleBOMChange(
                                          index,
                                          "functionalLocation",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </Table.Td>
                                  <Table.Td>
                                    <TextInput
                                      size="xs"
                                      placeholder="Enter equipment"
                                      value={bom.equipment}
                                      onChange={(e) =>
                                        handleBOMChange(
                                          index,
                                          "equipment",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </Table.Td>
                                  <Table.Td>
                                    <TextInput
                                      size="xs"
                                      placeholder="Enter name"
                                      value={bom.equipmentName}
                                      onChange={(e) =>
                                        handleBOMChange(
                                          index,
                                          "equipmentName",
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
                                        handleRemoveBOM(index);
                                      }}
                                    >
                                      <IconCircleMinus />
                                    </ActionIcon>
                                  </Table.Td>
                                </Table.Tr>
                              )
                            )
                          )}
                        </Table.Tbody>
                      </Table>
                    </Box>
                  </Box>
                </Stack>
              </>
            )}

            <Divider />

            <Footer nextLabel="Upload" />
          </Box>
        </Grid.Col>

        {/* Summary Section */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Summary />
        </Grid.Col>
      </Grid>

      <MaterialPlantModal
        opened={materialPlantModalOpened}
        onClose={() => {
          setMaterialPlantModalOpened(false);
          setEditingPlantIndex(null);
        }}
        onCreatePlant={handleAddPlant}
        onEditPlant={handleEditPlant}
        editingPlant={
          editingPlantIndex !== null
            ? material.plants[editingPlantIndex]
            : undefined
        }
        editingIndex={
          editingPlantIndex !== null ? editingPlantIndex : undefined
        }
      />
    </Container>
  );
}
