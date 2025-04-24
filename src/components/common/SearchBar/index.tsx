import { useState, useCallback } from "react";
import {
  TextInput,
  Button,
  Group,
  Stack,
  Pill,
  Text,
  Flex,
  Popover,
  ActionIcon,
  Box,
} from "@mantine/core";
import { IconSearch, IconBookmark, IconFilter } from "@tabler/icons-react";
import FilterPopover from "./FilterPopover";
import classes from "./SearchBar.module.css";

export interface Filter {
  field: string;
  operator: string;
  value: string;
}

interface SearchBarProps {
  onSearch: (filters: Filter[]) => void;
  onSaveSearch?: (filters: Filter[]) => void;
  onChange?: (value: string) => void;
  fields?: string[];
}

const OPERATORS = ["is equal to", "contains", "is not equal to"];
const FIELD_COLORS: Record<string, string> = {
  "Part Number": "blue",
  "Description": "green",
  "Supplier": "orange",
  "Value Guide": "violet",
};

const DEFAULT_FIELDS = [
  "Material Number",
  "MRP Type",
  "ABC Indicator",
  "Plant",
  "MRP Controller",
];

export default function SearchBar({
  onSearch,
  onSaveSearch,
  onChange,
  fields = DEFAULT_FIELDS,
}: SearchBarProps) {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [filterPopoverOpened, setFilterPopoverOpened] = useState(false);

  const handleAddFilter = useCallback((newFilter: Filter) => {
    setFilters((prevFilters) => [...prevFilters, newFilter]);
  }, []);

  const removeFilter = useCallback((index: number) => {
    setFilters((prevFilters) => prevFilters.filter((_, i) => i !== index));
  }, []);

  const handleSearch = () => {
    onSearch(filters);
    setFilterPopoverOpened(false);
  };

  const handleSaveSearch = () => {
    if (onSaveSearch) {
      onSaveSearch(filters);
    }
  };

  return (
    <Stack className={classes.searchBar}>
      <TextInput
        placeholder="Search..."
        onChange={(e) => onChange?.(e.target.value)}
        leftSection={
          <Popover
            opened={filterPopoverOpened}
            position="bottom-start"
            width={800}
            shadow="xl"
            offset={10}
          >
            <Popover.Target>
              <ActionIcon
                variant="subtle"
                onClick={() => setFilterPopoverOpened((o) => !o)}
              >
                <IconSearch size={16} />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown p="0">
              <Flex
                p="xs"
                w="100%"
                wrap="wrap"
                direction="row"
                gap="xs"
                align="center"
              >
                <IconSearch size={16} />
                {filters.map((filter, index) => (
                  <Pill
                    className={classes.filterPill}
                    key={index}
                    withRemoveButton
                    onRemove={() => removeFilter(index)}
                  >
                    <Flex direction="row">
                      <Group
                        style={{
                          borderRight:
                            "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
                        }}
                      >
                        <Text
                          size="sm"
                          mr="xs"
                          c={FIELD_COLORS[filter.field]}
                        >{`${filter.field} ${
                          filter.operator === "is equal to"
                            ? "is"
                            : filter.operator === "is not equal to"
                            ? "is not"
                            : "contains"
                        }`}</Text>
                      </Group>
                      <Text size="sm" ml="xs">
                        {filter.value}
                      </Text>
                    </Flex>
                  </Pill>
                ))}
              </Flex>

              <Group
                p="xs"
                w="100%"
                gap="xs"
                justify="end"
                wrap="nowrap"
                style={{
                  borderBottom:
                    "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
                }}
              >
                {/* <Button
                  variant="outline"
                  color="gray"
                  onClick={handleSaveSearch}
                >
                  Save Search
                </Button> */}
                <Button onClick={handleSearch} color="black">
                  Search
                </Button>
              </Group>

              <Flex p="sm" align="center" justify="end">
                <FilterPopover
                  onAddFilter={handleAddFilter}
                  fields={fields}
                  operators={OPERATORS}
                />
              </Flex>
              {/* 
              <Group p="md" w="100%" gap="xs" wrap="nowrap" style={{ borderTop: "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))" }}>
                <Text fw={500}>Recent Searches</Text>
              </Group>

              <Group p="md" w="100%" gap="xs" wrap="nowrap" style={{ borderTop: "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))" }}>
                <Text fw={500}>Saved Searches</Text>
              </Group> */}
            </Popover.Dropdown>
          </Popover>
        }
        rightSection={
          filters.length > 0 ? (
            <>
              {filters.length}
              <IconFilter size={16} />
            </>
          ) : null
        }
      />
    </Stack>
  );
}
