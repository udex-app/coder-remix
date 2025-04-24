import { ActionIcon, Stack, Menu } from "@mantine/core";
import { IconDotsVertical, IconEye } from "@tabler/icons-react";
import type { ReactNode } from "react";

interface IActionsProps {
  onViewDetails?: () => void;
  menuItems?: ReactNode;
}

export default function Actions({ onViewDetails, menuItems }: IActionsProps) {
  return (
    <Stack justify="center" align="center" h="100%">
      <Menu shadow="md" width={200} position="bottom-end">
        <Menu.Target>
          <ActionIcon variant="transparent" color="light-dark(var(--mantine-color-dark-0))">
            <IconDotsVertical size={16} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconEye style={{ width: 14, height: 14 }} />}
            onClick={onViewDetails}
          >
            View Details
          </Menu.Item>
          {menuItems}
        </Menu.Dropdown>
      </Menu>
    </Stack>
  );
} 