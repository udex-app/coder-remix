import {
  Modal,
  Group,
  Text,
  Stack,
  Divider,
  Grid,
  MultiSelect,
  NumberInput,
  Select,
  Button,
} from "@mantine/core";
import { IconDatabase, IconEdit, IconPlus } from "@tabler/icons-react";
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  UNIT_OF_MEASURE,
  PLANTS,
  VALUATION_CLASSES,
  STATUS,
  MRP_CONTROLLERS,
} from "~/utils/globalLists";

export interface Plant {
  plant: string;
  pdt: number | null;
  map: number | null;
  rop: number | null;
  roq: number | null;
  roundingValue: number | null;
  unitOfMeasure: string;
  mrpController: string;
  valuationClass: string;
  status: string;
  isStocked: boolean;
  isSparePart: boolean;
  maxWorkingCapital: number;
  storageLocations: StorageLocation[];
  boms: Bom[];
}

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

export interface PlantFormData extends Omit<Plant, "plant"> {
  plants: string[];
}

interface IMaterialPlantModal {
  opened: boolean;
  onClose: () => void;
  onCreatePlant: (plant: PlantFormData) => void;
  onEditPlant?: (index: number, plant: PlantFormData) => void;
  editingPlant?: Plant;
  editingIndex?: number;
}

const INITIAL_PLANT: PlantFormData = {
  plants: [],
  pdt: null,
  map: null,
  rop: null,
  roq: null,
  roundingValue: null,
  unitOfMeasure: "EA",
  mrpController: "001",
  valuationClass: "VC01",
  status: "01",
  isStocked: false,
  isSparePart: false,
  maxWorkingCapital: 0,
  storageLocations: [],
  boms: [],
};

function calculateRoundingImpact(
  roq: number | null,
  roundingValue: number | null,
  map: number | null
): number {
  if (
    !roq ||
    !roundingValue ||
    !map ||
    roundingValue === 0 ||
    roundingValue === 1
  )
    return 0;
  if (roq === 0) roq = 1;

  if (roundingValue > roq) {
    return (roundingValue - roq) * map;
  }

  const roqByRounding = roq / roundingValue;
  const roundedRoqByRounding = Math.round(roqByRounding);

  if (roqByRounding == roundedRoqByRounding) {
    return 0;
  }

  return (roundedRoqByRounding * roundingValue - roq) * map;
}

function calculateMaxWorkingCapital(
  map: number | null,
  rop: number | null,
  roq: number | null,
  roundingImpact: number
): number {
  const safeMap = map || 0;
  const safeRop = rop || 0;
  const safeRoq = roq || 0;
  const safeRoundingImpact = roundingImpact || 0;

  const baseInventoryValue =
    safeMap * (safeRop + (safeRoq === 0 ? 1 : safeRoq) - 1);

  const maxWorkingCapital =
    Math.max(0, baseInventoryValue) + safeRoundingImpact;

  return maxWorkingCapital;
}

export default function MaterialPlantModal({
  opened,
  onClose,
  onCreatePlant,
  onEditPlant,
  editingPlant,
  editingIndex,
}: IMaterialPlantModal) {
  const [plantData, setPlantData] = useState<PlantFormData>(() => {
    if (editingPlant) {
      const { plant, ...rest } = editingPlant;
      return {
        ...rest,
        plants: [plant],
      };
    }
    return {
      ...INITIAL_PLANT,
      plants: [],
    };
  });

  const roundingImpact = useMemo(
    () =>
      calculateRoundingImpact(
        plantData.roq,
        plantData.roundingValue,
        plantData.map
      ),
    [plantData.roq, plantData.roundingValue, plantData.map]
  );

  const calculatedMaxWorkingCapital = useMemo(
    () =>
      calculateMaxWorkingCapital(
        plantData.map,
        plantData.rop,
        plantData.roq,
        roundingImpact
      ),
    [plantData.map, plantData.rop, plantData.roq, roundingImpact]
  );

  useEffect(() => {
    if (editingPlant) {
      const { plant, ...rest } = editingPlant;
      setPlantData({
        ...rest,
        plants: [plant],
      });
    } else {
      setPlantData({ ...INITIAL_PLANT, plants: [] });
    }
  }, [editingPlant, opened]);

  useEffect(() => {
    setPlantData((prev) => ({
      ...prev,
      maxWorkingCapital: calculatedMaxWorkingCapital,
    }));
  }, [calculatedMaxWorkingCapital]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (editingPlant && editingIndex !== undefined && onEditPlant) {
        onEditPlant(editingIndex, plantData);
      } else {
        onCreatePlant(plantData);
      }
      setPlantData({ ...INITIAL_PLANT, plants: [] });
      onClose();
    },
    [plantData, onCreatePlant, onEditPlant, editingIndex, editingPlant, onClose]
  );

  const isFormValid = useMemo(() => {
    return (
      plantData.plants.length > 0 &&
      plantData.pdt !== null &&
      plantData.map !== null &&
      plantData.unitOfMeasure &&
      plantData.mrpController &&
      plantData.valuationClass &&
      plantData.status &&
      (!plantData.isStocked ||
        (plantData.rop !== null &&
          plantData.roq !== null &&
          plantData.roundingValue !== null))
    );
  }, [plantData]);

  return (
    <Modal
      styles={{ body: { padding: 0 } }}
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="xs">
          <IconDatabase size={20} />
          <Text fw={700}>
            {editingPlant ? "Edit Plant" : "Material Plant Master Data"}
          </Text>
        </Group>
      }
      size="xl"
    >
      <form onSubmit={handleSubmit}>
        <Stack gap={0}>
          <Divider />
          <Grid
            p="md"
            bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))"
          >
            <Grid.Col span={6}>
              <MultiSelect
                label="Plants"
                placeholder="Select plants"
                data={PLANTS}
                value={plantData.plants}
                onChange={(values) =>
                  setPlantData({ ...plantData, plants: values })
                }
                required
                searchable
                clearable
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="PDT"
                placeholder="Enter PDT"
                value={plantData.pdt ?? ""}
                onChange={(value) =>
                  setPlantData({
                    ...plantData,
                    pdt: value ? Number(value) : null,
                  })
                }
                min={0}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                label="MAP"
                placeholder="Enter MAP"
                prefix="$"
                value={plantData.map ?? ""}
                onChange={(value) =>
                  setPlantData({
                    ...plantData,
                    map: value ? Number(value) : null,
                  })
                }
                min={0}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="Unit of Measure"
                placeholder="Select"
                data={UNIT_OF_MEASURE}
                value={plantData.unitOfMeasure}
                onChange={(value) =>
                  setPlantData({ ...plantData, unitOfMeasure: value || "" })
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="MRP Controller"
                placeholder="Select"
                data={MRP_CONTROLLERS}
                value={plantData.mrpController}
                onChange={(value) =>
                  setPlantData({ ...plantData, mrpController: value || "" })
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="Valuation Class"
                placeholder="Select"
                data={VALUATION_CLASSES}
                value={plantData.valuationClass}
                onChange={(value) =>
                  setPlantData({ ...plantData, valuationClass: value || "" })
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="Status"
                placeholder="Select"
                data={STATUS}
                value={plantData.status}
                onChange={(value) =>
                  setPlantData({ ...plantData, status: value || "" })
                }
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="Is Stocked"
                placeholder="Select"
                data={[
                  { value: "true", label: "Yes" },
                  { value: "false", label: "No" },
                ]}
                value={plantData.isStocked.toString()}
                onChange={(value) =>
                  setPlantData({
                    ...plantData,
                    isStocked: value === "true",
                  })
                }
                required
              />
            </Grid.Col>
            {plantData.isStocked && (
              <>
                <Grid.Col span={6}>
                  <NumberInput
                    label="ROP"
                    placeholder="Enter ROP"
                    value={plantData.rop ?? ""}
                    onChange={(value) =>
                      setPlantData({
                        ...plantData,
                        rop: value ? Number(value) : null,
                      })
                    }
                    min={0}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <NumberInput
                    label="ROQ"
                    placeholder="Enter ROQ"
                    value={plantData.roq ?? ""}
                    onChange={(value) =>
                      setPlantData({
                        ...plantData,
                        roq: value ? Number(value) : null,
                      })
                    }
                    min={0}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <NumberInput
                    label="Rounding Value"
                    placeholder="Enter rounding value"
                    value={plantData.roundingValue ?? ""}
                    onChange={(value) =>
                      setPlantData({
                        ...plantData,
                        roundingValue: value ? Number(value) : null,
                      })
                    }
                    min={0}
                    required
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <NumberInput
                    label="Max Working Capital"
                    placeholder="Enter max working capital"
                    readOnly
                    value={calculatedMaxWorkingCapital}
                    min={0}
                    required
                    prefix="$"
                    decimalScale={2}
                    disabled
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Select
                    label="Is Spare Part"
                    placeholder="Select"
                    data={[
                      { value: "true", label: "Yes" },
                      { value: "false", label: "No" },
                    ]}
                    value={plantData.isSparePart.toString()}
                    onChange={(value) =>
                      setPlantData({
                        ...plantData,
                        isSparePart: value === "true",
                      })
                    }
                    required
                  />
                </Grid.Col>
              </>
            )}
          </Grid>
          <Stack gap={0}>
            <Divider />
            <Group justify="flex-end" p="md">
              <Button variant="default" onClick={onClose}>
                Cancel
              </Button>
              <Button
                color="#007294"
                leftSection={
                  editingPlant ? <IconEdit size={16} /> : <IconPlus size={16} />
                }
                type="submit"
                disabled={!isFormValid}
              >
                {editingPlant ? "Save Changes" : "Create"}
              </Button>
            </Group>
          </Stack>
        </Stack>
      </form>
    </Modal>
  );
}
