import { Outlet } from "react-router";
import { Box, Container, Text, Title } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import bgImage from "~/assets/images/bg.jpg";

export default function AuthRoute() {
  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor:
          "light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))",
      }}
    >
      {/* Left side - Brand/Image section */}
      <Box
        visibleFrom="sm"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          background:
            `linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(13, 37, 63, 0.6)), url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
          }}
        >
          <IconSettings
            size={64}
            style={{
              color: "white",
              marginBottom: "1rem",
            }}
          />
          <Title order={1} size="h2" mb="md" c="white">
            Welcome to MiLi
          </Title>
          <Text size="lg" c="white" maw={400} mx="auto">
            Our industry-led software solution – MiLi – is changing the way our
            customers view, manage and maintain the entire supply chain.
          </Text>
        </Box>
      </Box>

      {/* Right side - Form section */}
      <Box
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <Container size="sm" w="100%">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
