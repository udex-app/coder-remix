import { Box, Stack, Table } from "@mantine/core";

interface Column {
  key: string;
  header: string;
}

interface MyTableProps<T> {
  data: T[];
  columns: Column[];
}

export default function MyTable<T>({ data, columns }: MyTableProps<T>) {
  return (
    <Stack p="md" gap="xs">
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
                {columns.map((column) => (
                  <Table.Th key={column.key}>{column.header}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map((item, index) => (
                <Table.Tr key={index}>
                  {columns.map((column) => (
                    <Table.Td key={column.key}>
                      {String(item[column.key as keyof T])}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Box>
      </Box>
    </Stack>
  );
}
