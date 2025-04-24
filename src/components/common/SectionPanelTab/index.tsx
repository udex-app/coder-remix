// components/common/SectionPanelTab.tsx
import React, { useState } from "react";
import {
  Card,
  Group,
  Text,
  ActionIcon,
  useMantineTheme,
  Collapse,
  ScrollArea,
  Box,
  Stack,
  Flex,
} from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

export interface SectionPanelProps {
  title?: React.ReactNode;
  fullBorder?: boolean;
  onlyHeaderBorder?: boolean;
  borderRadius?: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  height?: string;
  headerBackground?:
    | "var(--mantine-color-body)"
    | "var(--mantine-color-lightGray-filled)";
  noShadow?: boolean;
  headerPadding?: string;
  contentPadding?: string;
  noPadding?: boolean;
  children: React.ReactNode;
  element?: React.ReactNode;
}

export default function SectionPanelTab({
  title,
  fullBorder = false,
  onlyHeaderBorder = false,
  borderRadius = "8px",
  description,
  icon,
  actions,
  collapsible = false,
  defaultCollapsed = false,
  height,
  headerBackground = "var(--mantine-color-body)",
  noShadow = false,
  headerPadding = "10px 16px",
  contentPadding = "24px",
  noPadding = false,
  children,
  element,
}: SectionPanelProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <Card
      withBorder={fullBorder && !onlyHeaderBorder}
      shadow={noShadow ? undefined : "sm"}
      p={0}
      h="100%"
      mah={height}
      style={{ borderRadius: borderRadius }}
    >
      {/* Header */}
      {(title || actions || collapsible) && (
        <Box
          style={{
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
            background: headerBackground,
            borderTop: onlyHeaderBorder
              ? "1px solid var(--mantine-color-gray-3)"
              : undefined,
            borderLeft: onlyHeaderBorder
              ? "1px solid var(--mantine-color-gray-3)"
              : undefined,
            borderRight: onlyHeaderBorder
              ? "1px solid var(--mantine-color-gray-3)"
              : undefined,
            borderBottom:
              !collapsed || onlyHeaderBorder
                ? "1px solid var(--mantine-color-gray-3)"
                : "none",
            padding: headerPadding,
          }}
        >
          <Stack gap={0}>
            <Group justify="space-between" align="center">
              <Group gap={16}>
                <Group gap={10}>
                  {icon && icon}
                  {title && <Text fw={600}>{title}</Text>}
                </Group>
                {element && element}
              </Group>
              <Group gap="xs">
                {actions}
                {collapsible && (
                  <ActionIcon
                    variant="transparent"
                    size="sm"
                    onClick={() => setCollapsed((c) => !c)}
                  >
                    {collapsed ? (
                      <IconChevronDown size={16} />
                    ) : (
                      <IconChevronUp size={16} />
                    )}
                  </ActionIcon>
                )}
              </Group>
            </Group>

            {description && (
              <Text size="14px" fw={400} c="dimmed" lineClamp={2}>
                {description}
              </Text>
            )}
          </Stack>
        </Box>
      )}

      {/* Content with smooth animation */}
      <ScrollArea
        scrollbars="y"
        style={{ overflow: collapsed ? "hidden" : "auto" }}
      >
        <Collapse in={!collapsed} animateOpacity>
          <div style={{ padding: noPadding ? 0 : contentPadding }}>
            {children}
          </div>
        </Collapse>
      </ScrollArea>
    </Card>
  );
}
