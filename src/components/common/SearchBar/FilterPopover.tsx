import { useState } from "react";
import {
  Button,
  Group,
  Stack,
  Popover,
  Text,
  Select,
  TextInput,
  CloseButton,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

interface FilterPopoverProps {
  onAddFilter: (filter: { field: string; operator: string; value: string }) => void;
  fields: string[];
  operators: string[];
}

export default function FilterPopover({ onAddFilter, fields, operators }: FilterPopoverProps) {
  const [opened, setOpened] = useState(false);
  const [newFilter, setNewFilter] = useState<Partial<{ field: string; operator: string; value: string }>>({});

  const handleAddFilter = () => {
    if (newFilter.field && newFilter.operator && newFilter.value) {
      onAddFilter(newFilter as { field: string; operator: string; value: string });
      setNewFilter({});
      setOpened(false);
    }
  };

  return (
    <Popover
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
      trapFocus
    >
      <Popover.Target>
        <Button
          variant="outline"
          color="var(--mantine-color-blue-9)"
          leftSection={<IconPlus size={14} />}
          onClick={() => setOpened(true)}
        >
          New
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack gap="xs">
          <Group justify="space-between" mb="xs">
            <Text size="sm" fw={500}>Add Filter</Text>
            <CloseButton size="sm" onClick={() => setOpened(false)} />
          </Group>
          <Select
            label="Field"
            placeholder="Select field"
            data={fields}
            value={newFilter.field}
            onChange={(value) =>
              setNewFilter({ ...newFilter, field: value || "" })
            }
          />
          <Select
            label="Operator"
            placeholder="Select operator"
            data={operators}
            value={newFilter.operator}
            onChange={(value) =>
              setNewFilter({ ...newFilter, operator: value || "" })
            }
          />
          <TextInput
            label="Value"
            placeholder="Enter value"
            value={newFilter.value || ""}
            onChange={(event) =>
              setNewFilter({
                ...newFilter,
                value: event.currentTarget.value,
              })
            }
          />
          <Button onClick={handleAddFilter} color="var(--mantine-color-blue-9)">Add Filter</Button>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
} 