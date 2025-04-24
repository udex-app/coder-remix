import { Outlet } from "react-router";
import StepperLayout, { type Step } from "~/components/common/StepperLayout";

export const MANDATORY_DESC = (
  <>
    Fields marked with <span style={{ color: "red" }}>*</span> are mandatory
  </>
);
const steps: Step[] = [
  { slug: "basic-details", label: "Basic Details" },
  { slug: "sourcing-information", label: "Sourcing Information" },
  { slug: "noun-class-selection", label: "Noun, Class Selection & Attributes" },
  { slug: "bom", label: "BOM" },
  { slug: "criticality", label: "Criticality" },
  { slug: "material-plant", label: "Material Plant Master Data" },
  { slug: "upload", label: "Upload" },
  { slug: "review", label: "Review" },
];

export default function CreateMaterialLayout() {
  return (
    <StepperLayout
      steps={steps}
      basePath="/app/create-material"
      storageKey="create-material-step"
    >
      <Outlet />
    </StepperLayout>
  );
}
