import { Link } from "react-router";
import { IconFaceIdError } from "@tabler/icons-react";
import { Container, Title, Text, Button, Stack, Center } from "@mantine/core";

export default function NotFound() {
  return (
    <Container size="md" h="100vh">
      <Center h="100%">
        <Stack align="center" gap="xl">
          <IconFaceIdError size={120} stroke={1.5} color="gray" />
          <Title order={1}>Page Not Found</Title>
          <Text size="xl" c="dimmed">
            Oops! The page you're looking for doesn't exist.
          </Text>
          <Button component={Link} to="/app/dashboard" size="lg" variant="filled">
            Go back home
          </Button>
        </Stack>
      </Center>
    </Container>
  );
}
