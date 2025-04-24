import {
  Container,
  Title,
  Text,
  Stack,
  Paper,
  Switch,
  Slider,
  NumberInput,
  Select,
  Button,
  Divider,
  Group,
  useMantineColorScheme,
} from '@mantine/core';
import { IconBell, IconShieldLock, IconCreditCard, IconDeviceMobile, IconMoonStars, IconSun } from '@tabler/icons-react';

export default function Settings() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  
  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={2} mb="xs">Settings</Title>
          <Text c="dimmed" size="sm">Manage your account preferences and security settings</Text>
        </div>

        <Paper shadow="sm" radius="md" p="xl" withBorder>
          <Stack gap="lg">
            <Title order={3}>Appearance</Title>
            <Stack gap="md">
              <Group justify="space-between">
                <div>
                  <Text>Dark Mode</Text>
                  <Text size="sm" c="dimmed">Switch between light and dark theme</Text>
                </div>
                <Switch
                  size="lg"
                  onLabel={<IconSun size="1rem" stroke={2.5} />}
                  offLabel={<IconMoonStars size="1rem" stroke={2.5} />}
                  checked={colorScheme === 'dark'}
                  onChange={(event) => setColorScheme(event.currentTarget.checked ? 'dark' : 'light')}
                />
              </Group>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
