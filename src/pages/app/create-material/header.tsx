import { Group, Flex, Text, Stack } from "@mantine/core";

interface HeaderProps {
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
  rightSection?: React.ReactNode;
}

export default function Header({
  title,
  description,
  icon,
  rightSection,
}: HeaderProps) {
  return (
    <Stack
      p="md"
      gap="xs"
      bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))"
    >
      <Group justify="space-between" align="center">
        <Flex direction="column">
          <Group gap="xs">
            {icon}
            <Text fw={600}>{title}</Text>
          </Group>
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        </Flex>
        {rightSection}
      </Group>
    </Stack>
  );
}
