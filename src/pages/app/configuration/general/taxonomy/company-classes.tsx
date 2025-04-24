import MyGrid from "~/components/common/MyGrid";

export default function CompanyClasses() {
  const columnDefs = [
    {
      headerName: "Company Noun",
      field: "companyNoun",
      flex: 1,
    },
    {
      headerName: "Company Modifier",
      field: "companyModifier",
      flex: 1,
    },
    {
      headerName: "Company Class",
      field: "companyClass",
      flex: 1,
    },
    {
      headerName: "Description",
      field: "description",
      flex: 1,
    },
    {
      headerName: "Class",
      field: "class",
      flex: 1,
    },
    {
      headerName: "Material Group",
      field: "materialGroup",
      flex: 1,
    },
    {
      headerName: "Is Active",
      field: "isActive",
      cellRenderer: "checkboxRenderer",
      width: 100,
    },
  ];

  const rowData = [
    {
      companyNoun: "ABRASIVE",
      companyModifier: "PAD",
      companyClass: "ABRASIVE - PAD",
      description: "ABRASIVE - PAD",
      class: "PAD",
      materialGroup: "PAD",
      isActive: true,
    },
    {
      companyNoun: "ABSORBENT",
      companyModifier: "PBT",
      companyClass: "ABSORBENT - PBT",
      description: "ABSORBENT - PBT",
      class: "PBT",
      materialGroup: "PBT",
      isActive: true,
    },
  ];

  return (
    <MyGrid
      title="Company Classes"
      rowData={rowData}
      colDefs={columnDefs}
      multiSelect={false}
      noToolbar
    />
  );
} 