import React from "react";
import { Select, type SelectProps } from "@mantine/core";
import classes from "./customSelect.module.css";
import { IconChevronDown } from "@tabler/icons-react";

export interface CustomSelectProps
  extends Omit<SelectProps, "data" | "onChange" | "value"> {
  data: Array<string | { value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  width?: number | string;
  height?: number | string;
  leftIcon?: React.ReactNode;
}

export default function CustomSelect({
  data,
  value,
  onChange,
  width,
  height,
  leftIcon,
  ...rest
}: CustomSelectProps) {
  return (
    <Select
      data={data}
      value={value}
      onChange={(value: string | null) => value !== null && onChange(value)}
      leftSection={leftIcon}
      rightSection={<IconChevronDown size={16} />}
      classNames={{ input: classes.input, section: classes.section }}
      styles={(theme) => ({
        section: {
          color: value
            ? "var(--mantine-color-gray-8)"
            : "var(--mantine-color-gray-5)",
        },
      })}
      {...rest}
    />
  );
}
