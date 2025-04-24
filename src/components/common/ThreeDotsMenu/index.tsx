import {
  ActionIcon,
  Menu,
  type ButtonProps,
  type MenuProps,
  type MenuDropdownProps,
  type MenuItemProps,
} from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import React from "react";
import type { ReactNode } from "react";

export interface MenuItem {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  color?: string;
  closeMenuOnClick?: boolean;
  divider?: boolean;
  props?: Omit<
    MenuItemProps,
    "leftSection" | "children" | "onClick" | "disabled" | "color"
  >;
}

export interface ThreeDotsMenuProps {
  items: MenuItem[];
  icon?: ReactNode;
  menuWidth?: number | string;
  menuPosition?: MenuProps["position"];
  zIndex?: number;
  shadow?: MenuProps["shadow"];
  iconColor?: string;
  iconSize?: number;
  iconVariant?: ButtonProps["variant"];
  dropdownProps?: MenuDropdownProps;
  className?: string;
  style?: React.CSSProperties;
  withinPortal?: boolean;
}

export default function ThreeDotsMenu({
  items,
  icon = <IconDots />,
  menuWidth = 200,
  menuPosition = "bottom-end",
  zIndex = 1001,
  shadow = "md",
  iconColor = "light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-1))",
  iconSize,
  iconVariant = "transparent",
  dropdownProps,
  className,
  style,
  withinPortal = false,
}: ThreeDotsMenuProps) {
  return (
    <Menu
      shadow={shadow}
      width={menuWidth}
      position={menuPosition}
      styles={{
        dropdown: {
          zIndex,
        },
      }}
      withinPortal={withinPortal}
      closeOnItemClick
    >
      <Menu.Target>
        <ActionIcon
          variant={iconVariant}
          color={iconColor}
          p={0}
          className={className}
          style={style}
          size={iconSize}
        >
          {icon}
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown {...dropdownProps}>
        {items.map((item, index) =>
          item.divider ? (
            <Menu.Divider key={`divider-${index}`} />
          ) : (
            <Menu.Item
              key={`item-${index}`}
              leftSection={item.icon}
              onClick={item.onClick}
              disabled={item.disabled}
              color={item.color}
              closeMenuOnClick={item.closeMenuOnClick}
              {...item.props}
            >
              {item.label}
            </Menu.Item>
          )
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
