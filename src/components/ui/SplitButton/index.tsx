import { Button, Group, Menu } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { useState } from "react";
import classes from "./SplitButton.module.css";
import cx from "clsx";

export interface SplitButtonAction {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
}

export interface SplitButtonProps {
  mainAction: SplitButtonAction;
  additionalActions: SplitButtonAction[];
  variant?: "filled" | "light" | "outline" | "subtle" | "default";
  color?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
}

export default function SplitButton({
  mainAction,
  additionalActions,
  variant = "filled",
  color = "blue",
  size = "sm",
  disabled = false,
}: SplitButtonProps) {
  return (
    <Group gap={0} className={classes.container}>
      <Button
        variant={variant}
        color={color}
        size={size}
        disabled={disabled}
        onClick={mainAction.onClick}
        leftSection={mainAction.icon}
        className={classes.mainButton}
      >
        {mainAction.label}
      </Button>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button
            variant={variant}
            color={color}
            size={size}
            disabled={disabled}
            className={classes.dropdownButton}
            style={{
              backgroundColor:
                variant === "filled"
                  ? `var(--mantine-color-${color}-filled)`
                  : undefined,
              filter: variant === "filled" ? "brightness(0.7)" : undefined,
              borderColor:
                variant !== "filled"
                  ? `var(--mantine-color-${color}-filled)`
                  : undefined,
            }}
          >
            <IconChevronDown size={16} color="white" />
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          {additionalActions.map((action, index) => (
            <Menu.Item
              key={index}
              leftSection={action.icon}
              onClick={action.onClick}
            >
              {action.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
