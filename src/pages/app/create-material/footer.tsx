import { Group, Button } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { useLocalStorage } from "@mantine/hooks";
import { useNavigate } from "react-router";
import { resetMaterialInStorage } from "~/utils/getMaterial";

// Define the exact slugs in the same order as your StepperLayout
const STEP_SLUGS = [
  "basic-details",
  "sourcing-information",
  "noun-class-selection",
  "bom",
  "criticality",
  "material-plant",
  "upload",
  "review",
] as const;

const BASE_PATH = "/app/create-material";

interface FooterProps {
  nextLabel?: string;
  nextIcon?: React.ReactNode;
  disableNext?: boolean;
  onNextClick?: () => void | Promise<void>;
}

export default function Footer({
  nextLabel = "Next",
  nextIcon,
  disableNext,
  onNextClick,
}: FooterProps) {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useLocalStorage<number>({
    key: "create-material-step",
    defaultValue: 0,
  });

  const [selectedPlantIndex, setSelectedPlantIndex] = useLocalStorage<
    number | null
  >({
    key: "create-material-selected-plant",
    defaultValue: null,
  });

  const handleCancel = () => {
    resetMaterialInStorage();
    setActiveStep(0);
    setSelectedPlantIndex(null);
    navigate(`${BASE_PATH}/${STEP_SLUGS[0]}`);
  };

  const handleNext = async () => {
    if (onNextClick) {
      await onNextClick();
    }
    const nextIndex = Math.min(activeStep + 1, STEP_SLUGS.length - 1);
    setActiveStep(nextIndex);
    navigate(`${BASE_PATH}/${STEP_SLUGS[nextIndex]}`);
  };

  const handleBack = () => {
    const prevIndex = Math.max(activeStep - 1, 0);
    setActiveStep(prevIndex);
    navigate(`${BASE_PATH}/${STEP_SLUGS[prevIndex]}`);
  };

  return (
    <Group justify="space-between" p="md">
      <Button variant="default" onClick={handleCancel}>
        Cancel
      </Button>
      <Group gap="xs">
        {activeStep > 0 && (
          <Button
            variant="subtle"
            color="light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-0))"
            onClick={handleBack}
          >
            Back
          </Button>
        )}
        <Button
          rightSection={nextIcon ?? <IconArrowRight size={16} />}
          onClick={handleNext}
          disabled={disableNext}
        >
          {nextLabel}
        </Button>
      </Group>
    </Group>
  );
}
