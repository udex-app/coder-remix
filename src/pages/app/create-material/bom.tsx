import { Container, Grid, Box, Divider } from "@mantine/core";
import { IconPackage } from "@tabler/icons-react";
import Header from "./header";
import Footer from "./footer";
import Summary from "./summary";

export default function BOM() {
  return (
    <Container size="xl" mt="xl">
      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Box
            bg="var(--mantine-color-body)"
            style={{
              border:
                "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "var(--mantine-shadow-sm)",
            }}
          >
            <Header
              title="BOM"
              description="Enter supplier and sourcing details for the material"
              icon={<IconPackage size={18} />}
            />
            <Divider />

            <Divider />
            <Footer nextLabel="Criticality" />
          </Box>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Summary />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
