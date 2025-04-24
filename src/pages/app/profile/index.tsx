import {
    Container,
    Avatar,
    Text,
    Grid,
    Stack,
    Button,
    Badge,
    Box,
    Tabs,
  } from "@mantine/core";
  import {
    IconEdit,
    IconBell,
    IconLock,
    IconUser,
    IconBuilding,
  } from "@tabler/icons-react";
  import { useNavigate, useLocation } from "react-router";

  
  import Panel from "~/components/common/Panel";
  import PersonalInfoTab from "./personal-info-tab";
  import CompanyTab from "./company-tab";
  import NotificationsTab from "./notifications-tab";
  import SecurityTab from "./security-tab";
  
  const PROFILE_TABS = [
    {
      value: "personal-info",
      label: "Personal Info",
      icon: IconUser,
      component: <PersonalInfoTab />,
    },
    {
      value: "company",
      label: "Company",
      icon: IconBuilding,
      component: <CompanyTab />,
    },
    {
      value: "notifications",
      label: "Notifications",
      icon: IconBell,
      component: <NotificationsTab />,
    },
    {
      value: "security",
      label: "Security",
      icon: IconLock,
      component: <SecurityTab />,
    },
  ];
  
  export default function Profile() {
    const location = useLocation();
    const navigate = useNavigate();
  
    const pathParts = location.pathname.split("/").filter(Boolean);
    const currentTab = pathParts[3] || "personal-info"; // Default to personal-info if no tab specified
  
    const handleTabChange = (value: string | null) => {
      if (value) {
        navigate(`/app/user/profile/${value}`);
      }
    };
  
    return (
      <Container fluid p="md">
        <Panel title="Profile" noPadding>
          <Grid gutter={0}>
            {/* Left sidebar with user info */}
            <Grid.Col
              span={3}
              style={{
                borderRight:
                  "1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))",
              }}
            >
              <Stack p="md" align="center" gap="sm">
                <Avatar
                  size={120}
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                  radius={120}
                />
                <Stack align="center" gap={5}>
                  <Text size="lg" fw={500}>
                    John Smith
                  </Text>
                  <Text size="sm" c="dimmed">
                    Product Manager
                  </Text>
                  <Badge size="sm" variant="light">
                    Admin
                  </Badge>
                </Stack>
                <Button
                  variant="light"
                  leftSection={<IconEdit size={14} />}
                  size="xs"
                  mt="sm"
                >
                  Edit Profile
                </Button>
              </Stack>
  
              <Stack p="md" gap="xs">
                <Text size="sm" fw={500}>
                  Contact Information
                </Text>
                <Text size="sm" c="dimmed">
                  Email
                </Text>
                <Text size="sm">john.smith@company.com</Text>
                <Text size="sm" c="dimmed" mt="xs">
                  Phone
                </Text>
                <Text size="sm">+1 (555) 123-4567</Text>
                <Text size="sm" c="dimmed" mt="xs">
                  Location
                </Text>
                <Text size="sm">San Francisco, CA</Text>
              </Stack>
            </Grid.Col>
  
            {/* Main content area */}
            <Grid.Col span={9}>
              <Tabs value={currentTab} onChange={handleTabChange} px="md" pt="md">
                <Tabs.List>
                  {PROFILE_TABS.map((tab) => (
                    <Tabs.Tab
                      key={tab.value}
                      value={tab.value}
                      leftSection={<tab.icon size={16} />}
                    >
                      {tab.label}
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
  
                <Box pt="xl">
                  {PROFILE_TABS.map((tab) => (
                    <Tabs.Panel key={tab.value} value={tab.value}>
                      {tab.component}
                    </Tabs.Panel>
                  ))}
                </Box>
              </Tabs>
            </Grid.Col>
          </Grid>
        </Panel>
      </Container>
    );
  }
  