import { Container, Grid, Box, Text, Divider, Stack } from "@mantine/core";
import { IconSettings, IconCircleCheck, IconTools } from "@tabler/icons-react";
import Header from "./header";
import Footer from "./footer";
import MyTable from "~/components/common/MyTable";
import { getMaterialFromStorage } from "~/utils/getMaterial";

export default function Review() {
  const material = getMaterialFromStorage();

  return (
    <Container size="md" mt="xl">
      <Grid>
        <Grid.Col span={12}>
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
              title="Basic Details"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
              icon={<IconSettings size={18} />}
            />
            <Divider />
            <Stack p="md">
              <Grid mt="sm">
                <Grid.Col span={3}>
                  <Text size="sm" c="dimmed">
                    Manufacturer/Supplier
                  </Text>
                  <Text size="sm">{material?.manufacturer}</Text>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Text size="sm" c="dimmed">
                    Part Number
                  </Text>
                  <Text size="sm">{material?.partNumber}</Text>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Text size="sm" c="dimmed">
                    Material Type
                  </Text>
                  <Text size="sm">{material?.materialType}</Text>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Text size="sm" c="dimmed">
                    Copy From
                  </Text>
                  <Text size="sm">{material?.copyFrom}</Text>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Text size="sm" c="dimmed">
                    Notes
                  </Text>
                  <Text size="sm">{material?.notes}</Text>
                </Grid.Col>
              </Grid>
            </Stack>
            <Divider />
            <Header
              title="Noun & Class Selection"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
              icon={<IconSettings size={18} />}
            />
            <Divider />
            <Stack p="md">
              <Grid>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed">
                    Noun
                  </Text>
                  <Text size="sm">{material?.noun}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Text size="sm" c="dimmed">
                    Classification
                  </Text>
                  <Text size="sm">{material?.classSelection}</Text>
                </Grid.Col>
              </Grid>
            </Stack>
            <Divider />

            <Header
              title="Attributes"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
              icon={<IconTools size={18} />}
            />
            <Divider />

            <MyTable
              data={material.attributes}
              columns={[
                { key: "name", header: "Attribute" },
                { key: "prefix", header: "Prefix" },
                { key: "value", header: "Value" },
                { key: "postfix", header: "Postfix" },
              ]}
            />

            <Divider />

            <Footer
              nextLabel="Create"
              nextIcon={<IconCircleCheck size={16} />}
            />
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
