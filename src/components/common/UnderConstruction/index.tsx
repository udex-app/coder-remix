import { Stack, Text, ThemeIcon } from "@mantine/core";
import { IconTools } from "@tabler/icons-react";

interface UnderConstructionProps {
  title?: string;
  message?: string;
}

export default function UnderConstruction({ 
  title = "Under Construction", 
  message = "This page is currently being built. Check back soon!" 
}: UnderConstructionProps) {
  return (
    <Stack 
      align="center" 
      justify="center" 
      h="100%" 
      gap="md"
      p="md"
    >
      <ThemeIcon size={50} radius="md" variant="light">
        <IconTools size={30} style={{ transform: "rotate(-45deg)" }} />
      </ThemeIcon>
      <Stack gap={2} align="center">
        <Text size="xl" fw={600}>{title}</Text>
        <Text size="sm" c="dimmed">{message}</Text>
      </Stack>
    </Stack>
  );
} 