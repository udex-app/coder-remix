import { Group, Text, Stack, Avatar, Card } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";

interface ITask {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  bgColor?: string;
}

export default function Task({
  icon,
  title,
  description,
  time,
  bgColor,
}: ITask) {
  return (
    <Card.Section withBorder p="sm">
      <Group wrap="nowrap" align="flex-start" p="xs">
        <Avatar color={bgColor}>{icon}</Avatar>
        <Stack gap={2} style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {title}
          </Text>
          <Text size="sm" c="dimmed">
            {description}
          </Text>
          <Group gap="xs" py="xs">
            <IconClock
              size={14}
              style={{ color: "var(--mantine-color-dimmed)" }}
            />
            <Text size="xs" c="dimmed">
              {time}
            </Text>
          </Group>
        </Stack>
      </Group>
    </Card.Section>
  );
}
