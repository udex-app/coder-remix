import React from "react";
import { Tabs } from "@mantine/core";
import classes from "./customTabs.module.css";

export interface TabItem {
  value: string;
  label: React.ReactNode;
  itemsLeft?: React.ReactNode;
  itemsRight?: React.ReactNode;
}

interface CustomTabsProps {
  value: string | null;
  onChange: (value: string | null) => void;
  items: TabItem[];
  height?: number;
}

export default function CustomTabs({
  value,
  onChange,
  items,
  height = 52,
}: CustomTabsProps) {
  return (
    <Tabs value={value} onChange={onChange} h={height}>
      <Tabs.List h={height} className={classes.tabsList}>
        {items.map(({ value: v, label, itemsLeft, itemsRight }) => (
          <Tabs.Tab
            key={v}
            value={v}
            className={classes.tab}
            pl={24}
            pr={24}
            h={height}
          >
            <span className={classes.tabContent}>
              {itemsLeft && (
                <span className={classes.itemsLeft}>{itemsLeft}</span>
              )}
              <span>{label}</span>
              {itemsRight && (
                <span className={classes.itemsRight}>{itemsRight}</span>
              )}
            </span>
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
}
