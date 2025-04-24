import { ActionIcon, Group, Paper, Text, Box } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./QuickAction.module.css";

interface IQuickAction {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}

export default function QuickAction({ icon, title, description, onClick }: IQuickAction) {
  return (
    <Paper 
      withBorder 
      radius="md" 
      p="xs" 
      onClick={onClick}
      className={classes.card}
      shadow="none"
    >
      <Group wrap="nowrap"justify="space-between" gap="sm">
        <Group wrap="nowrap" gap="sm">
          <Paper withBorder radius="sm" p="xs" className={classes.icon}>
            {icon}
          </Paper>
          <Box style={{ minWidth: 0 }}>
            <Text fw={700} lineClamp={1}>{title}</Text>
            <Text c="dimmed" lineClamp={1}>{description}</Text>
          </Box>
        </Group>
        <ActionIcon size="xs" variant="transparent" color="dimmed" style={{ flexShrink: 0 }}>
          <IconChevronRight />
        </ActionIcon>
      </Group>
    </Paper>
  );
}