import React from "react";
import {
  Container,
  Title,
  Text,
  Paper,
  LoadingOverlay,
  Stack,
} from "@mantine/core";

interface AuthLayoutProps {
  title: string;
  description: string;
  loading: boolean;
  children: React.ReactNode;
  size?: 420 | "lg";
}

export default function AuthLayout({
  title,
  description,
  loading,
  children,
  size = 420,
}: AuthLayoutProps) {
  return (
    <Container size={size} my={40}>
      <Title ta="center" fw={900}>
        {title}
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        {description}
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" pos="relative">
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ type: "dots", color: "blue", size: "md" }}
        />
        <Stack>{children}</Stack>
      </Paper>
    </Container>
  );
}
