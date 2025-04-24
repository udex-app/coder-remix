export interface Attribute {
  name: string;
  prefix: string;
  value: string;
  postfix: string;
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

interface Plant {
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

export interface Material {
  manufacturer: string;
  partNumber: string;
  materialType: string;
  copyFrom: string;
  notes?: string;
  noun: string;
  classSelection: string;
  attributes: Attribute[];
  plants: Plant[];
  impactOfFailure: string;
  safetyRisk: string;
  frequencyOfFailure: string;
  isRepairable: string;
  leadTime: number | null;
  potentialDowntime: number | null;
  costPerNewItem: number | null;
  isCriticalityCalculated: boolean;
  materialCritical: boolean;
  stockedStatus: string;
  materialRepairable: boolean;
  stockClass: string;
  supplier: string;
  fixedSupplier: boolean;
  supplierPartNumber: string;
  price: number | null;
  plant: string;
  salesPerson: string;
  salesContactNumber: string;
}

export const initialMaterial: Material = {
  manufacturer: "",
  partNumber: "",
  materialType: "",
  copyFrom: "",
  noun: "",
  classSelection: "",
  notes: "",
  attributes: [],
  plants: [],
  impactOfFailure: "",
  safetyRisk: "",
  frequencyOfFailure: "",
  isRepairable: "",
  leadTime: null,
  potentialDowntime: null,
  costPerNewItem: null,
  isCriticalityCalculated: false,
  materialCritical: false,
  stockedStatus: "",
  materialRepairable: false,
  stockClass: "",
  supplier: "",
  fixedSupplier: false,
  supplierPartNumber: "",
  price: null,
  plant: "",
  salesPerson: "",
  salesContactNumber: "",
};

export function getActiveStepFromStorage(): number {
  const activeStep = localStorage.getItem("create-material-step");
  return activeStep ? parseInt(activeStep) : 0;
}

export function getMaterialFromStorage(): Material {
  try {
    const storedMaterial = localStorage.getItem("create-material-data");
    if (!storedMaterial) return initialMaterial;

    return JSON.parse(storedMaterial);
  } catch (error) {
    console.error("Error getting material from storage:", error);
    return initialMaterial;
  }
}

export function setMaterialInStorage(material: Material): void {
  try {
    localStorage.setItem("create-material-data", JSON.stringify(material));
  } catch (error) {
    console.error("Error setting material in storage:", error);
  }
}

export function clearMaterialFromStorage(): void {
  try {
    localStorage.removeItem("create-material-data");
  } catch (error) {
    console.error("Error clearing material from storage:", error);
  }
}

export function resetMaterialInStorage(): void {
  try {
    setMaterialInStorage(initialMaterial);
  } catch (error) {
    console.error("Error resetting material in storage:", error);
  }
}
