import { Container, Grid, Box, Divider } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import Header from "./header";
import Footer from "./footer";
import Summary from "./summary";

export default function Upload() {
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
              title="Upload"
              description="Upload the material"
              icon={<IconUpload size={18} />}
            />
            <Divider />

            <Divider />
            <Footer nextLabel="Review" />
          </Box>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Summary />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
