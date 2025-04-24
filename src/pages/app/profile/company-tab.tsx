import { TextInput, Select, Stack, Button, Divider, Group } from "@mantine/core";

export default function CompanyTab() {
  return (
    <Stack gap="lg">
      <TextInput
        label="Company"
        placeholder="Company name"
        defaultValue="Acme Corp"
      />
      <TextInput
        label="Department"
        placeholder="Your department"
        defaultValue="Product Management"
      />
      <TextInput
        label="Job Title"
        placeholder="Your job title"
        defaultValue="Product Manager"
      />
      <Select
        label="Office Location"
        placeholder="Select office"
        defaultValue="sf"
        data={[
          { value: "sf", label: "San Francisco" },
          { value: "ny", label: "New York" },
          { value: "ld", label: "London" },
          { value: "tk", label: "Tokyo" },
        ]}
      />

      <Divider />

      <Group justify="flex-end">
        <Button variant="light">Cancel</Button>
        <Button>Save Changes</Button>
      </Group>
    </Stack>
  );
} 