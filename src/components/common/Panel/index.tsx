import { ActionIcon, Card, Group, Menu, Text } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";

interface PanelProps {
  children: React.ReactNode;
  title?: string;
  menuItems?: React.ReactNode;
  height?: string;
  noPadding?: boolean;
}

export default function Panel({
  children,
  title,
  menuItems,
  height,
  noPadding = false,
}: PanelProps) {
  return (
    <Card withBorder h={height}>
      {title && (
        <Card.Section withBorder bg="lightGray">
          <Group justify="space-between" p="sm">
            <Text fw={500} size="md">
              {title}
            </Text>
            {menuItems && (
              <Menu shadow="md" width={200} position="bottom-end">
                <Menu.Target>
                  <ActionIcon
                    variant="transparent"
                    color="light-dark(black, var(--mantine-color-dark-0))"
                  >
                    <IconDots />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>{menuItems}</Menu.Dropdown>
              </Menu>
            )}
          </Group>
        </Card.Section>
      )}
      <Card.Section p={noPadding ? 0 : "sm"}>{children}</Card.Section>
    </Card>
  );
}
