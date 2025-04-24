const HEIGHT_OF_HEADER = 120;

const MATERIAL_TYPES = ["ERSA", "HIBE", "UNBW", "ZDBY"];
const UNIT_OF_MEASURE = [
  "KG",
  "EA",
  "PC",
  "L",
  "M",
  "M3",
  "XX1",
  "XX2",
  "XX3",
  "XX6",
];

// Plant master data lists
const PLANTS = ["1000", "2000", "3000", "4000", "5000"];
const MRP_CONTROLLERS = [
  "001",
  "C01",
  "G01",
  "HSE",
  "N01",
  "P01",
  "P02",
  "R01",
  "R02",
  "S01",
  "S02",
  "S03",
];
const VALUATION_CLASSES = ["VC01", "VC02", "VC03", "VC04", "VC05"];
const STATUS = ["01", "02", "03", "04", "05", "99"];

const CRITICALITY_OPTIONS = [
  {
    key: "impactOfFailure",
    label: "Impact of Failure",
    options: [
      {
        value: "production_stopper",
        label: "Production Stopper - No work arounds",
      },
      {
        value: "maintenance_delays",
        label: "Maintenance delays - Increased downtime",
      },
      { value: "no_impact", label: "No Impact" },
    ],
  },
  {
    key: "safetyRisk",
    label: "Safety Risk",
    options: [
      { value: "yes", label: "Yes - Risk to people or environment" },
      { value: "no", label: "No" },
    ],
  },
  {
    key: "frequencyOfFailure",
    label: "Frequency of Failure",
    options: [
      { value: "slow", label: "Slow - Once per year" },
      { value: "moderate", label: "Moderate - 2 to 3 times per year" },
      { value: "frequent", label: "Frequent - 4 to 12 times per year" },
      { value: "fast", label: "Fast - 12+ times per year" },
      {
        value: "tortoiselike",
        label: "Tortoiselike - Once every 1 to 5 years",
      },
    ],
  },
  {
    key: "isRepairable",
    label: "Item Repairable",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
];

export {
  MATERIAL_TYPES,
  UNIT_OF_MEASURE,
  PLANTS,
  MRP_CONTROLLERS,
  VALUATION_CLASSES,
  STATUS,
  HEIGHT_OF_HEADER,
  CRITICALITY_OPTIONS,
};
