import { Outlet, useLocation, useNavigate } from "react-router";
import logo from "../assets/images/Logo.png";
import {
  AppShell,
  Text,
  Stack,
  Flex,
  ActionIcon,
  Group,
  Image,
  Menu,

  Avatar,
  Box,
  Tooltip,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import { useEffect } from "react";
import { MenuLink, SplitButton } from "~/components";
import {
  IconMenu2,
  IconSettings,
  IconHelp,
  IconX,
  IconChevronRight,
  IconLayoutGrid,
  IconSearch,
  IconBook2,
  IconPackage,
  IconUser,
  IconLogout,
  IconChevronDown,
  IconCopy,
  IconBasket,
  IconChartDots,
  IconBuildingStore,
  IconActivity,
  IconChartCircles,
  IconAlignBoxBottomCenter,
  IconBuilding,
  IconShare,
  IconPlus,
} from "@tabler/icons-react";
import BreadcrumbsNav from "~/components/common/BreadcrumbsNav";

export type NavItem = {
  label: string;
  icon: React.ComponentType<{ active?: boolean }>;
  path: string;
};

const IconWrapper =
  (Icon: React.ComponentType) =>
  ({ active }: { active?: boolean }) =>
    <Icon />;

export const mainNavItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: IconWrapper(IconLayoutGrid),
    path: "/app/dashboard",
  },
  {
    label: "Material Search",
    icon: IconWrapper(IconSearch),
    path: "/app/materials",
  },
  {
    label: "Create Material",
    icon: IconWrapper(IconBook2),
    path: "/app/create-material",
  },
  {
    label: "ROP/ROQ",
    icon: IconWrapper(IconPackage),
    path: "/app/rop-roq",
  },
  {
    label: "Duplicates",
    icon: IconWrapper(IconCopy),
    path: "/app/duplicates",
  },
  {
    label: "Lead Time Calculator",
    icon: IconWrapper(IconAlignBoxBottomCenter),
    path: "/app/lead-time-calculator",
  },
  {
    label: "BOM Monitor",
    icon: IconWrapper(IconChartDots),
    path: "/app/bom-monitor",
  },
  {
    label: "Flag for Deletion",
    icon: IconWrapper(IconBasket),
    path: "/app/flag-for-deletion",
  },

  {
    label: "Bulk Enrichment",
    icon: IconWrapper(IconBuildingStore),
    path: "/app/bulk-enrichment",
  },

  {
    label: "Free Text Monitor",
    icon: IconWrapper(IconActivity),
    path: "/app/free-text-monitor",
  },
  {
    label: "Request Queue",
    icon: IconWrapper(IconChartCircles),
    path: "/app/request-queue",
  },
];

export const bottomNavItems: NavItem[] = [
  {
    label: "Configuration",
    icon: IconWrapper(IconSettings),
    path: "/app/configuration",
  },
  { label: "Help", icon: IconWrapper(IconHelp), path: "/app/help" },
];

const isDashboardPage = (pathname: string): boolean => {
  return pathname === "/app/dashboard" || pathname.startsWith("/app/dashboard/");
};

const renderHeaderActions = (pathname: string, navigate: (path: string) => void) => {
  if (isDashboardPage(pathname)) {
    return (
      <SplitButton
        mainAction={{
          label: 'Create',
          onClick: () => navigate('/app/create-material'),
          icon: <IconPlus size={16} />
        }}
        additionalActions={[
          {
            label: 'Create Material',
            onClick: () => navigate('/app/create-material'),
            icon: <IconBook2 size={16} />
          },
          {
            label: 'Create ROP/ROQ',
            onClick: () => navigate('/app/rop-roq/create'),
            icon: <IconPackage size={16} />
          }
        ]}
        variant="filled"
        color="#007294"
        size="sm"
      />
    );
  }
  return null;
};

export default function DashboardLayout() {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 48em)");


  const extraNavItems: NavItem[] = [
    {
      label: "Company Settings",
      icon: IconWrapper(IconBuilding),
      path: "/app/company",
    },
    {
      label: "ROP/ROQ",
      icon: IconWrapper(IconPackage),
      path: "/app/rop-roq",
    },
  ];
  // Function to get the current navigation item based on location
  const getCurrentNavItem = (pathname: string): NavItem => {
    // Combine all nav items and sort by path length (descending) to prioritize more specific paths
    const allNavItems = [...mainNavItems, ...bottomNavItems, ...extraNavItems].sort(
      (a, b) => b.path.length - a.path.length
    );

    return (
        allNavItems.find((item) =>
            pathname === item.path || pathname.startsWith(item.path + "/")
        ) || mainNavItems[0]
    );
  };

  const currentNavItem = getCurrentNavItem(location.pathname);

  return (
    <AppShell
      layout="default"
      header={{ height: 100 }}
      navbar={{
        width: { base: opened ? 240 : 80 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="0"
    >
      <AppShell.Header bg="light-dark(var(--mantine-color-white), var(--mantine-color-dark-7))">
        <Flex
          w="100%"
          h={40}
          px="md"
          justify="space-between"
          align="center"
          bg="#001E27"
          style={{
            borderBottom: "1px solid #163943",
            zIndex: 1000,
          }}
        >
          <Text c="white" fw={500}>
            MiLi
          </Text>
          <Group gap="xs">
            <Stack
              h="100%"
              style={{
                borderLeft: "1px solid #163943",
                borderRight: "1px solid #163943",
              }}
              px="sm"
            >
              <ActionIcon
                variant="subtle"
                color="white"
                size="lg"
                onClick={() => navigate("/app/user/settings")}
              >
                <IconSettings size={22} stroke={1.5} />
              </ActionIcon>
            </Stack>

            <Menu shadow="md" width={200} position="bottom-end" withArrow>
              <Menu.Target>
                <Group gap="xs" pl="xs" style={{ cursor: "pointer" }}>
                  <Avatar
                    size={24}
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                    radius="xl"
                  />
                  <ActionIcon variant="light" radius="sm" c="dimmed" size="xs">
                    <IconChevronDown />
                  </ActionIcon>
                </Group>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Account</Menu.Label>
                <Menu.Item
                  leftSection={<IconUser size={14} />}
                  onClick={() => navigate("/app/user/profile")}
                >
                  Profile
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconSettings size={14} />}
                  onClick={() => navigate("/app/user/settings")}
                >
                  Settings
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  leftSection={<IconLogout size={14} />}
                  color="red"
                  onClick={() => navigate("/auth/logout")}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Flex>
        <Flex mt={5} h={50} w="100%" justify="space-between">
          <Flex>
            <Box
              visibleFrom="sm"
              w={opened ? 240 : 80}
              h={50}
              style={{
                borderRight:
                  "1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image src={logo} alt="logo" width={32} height={32} />
            </Box>
            <Flex
              pl="20px"
              fw={600}
              fz={14}
              lh={24}
              justify="center"
              align="center"
              gap="6px"
            >
              {(() => {
                const Icon = currentNavItem.icon;
                return (
                  <Group>
                    <Icon />
                    <IconChevronRight size={16} />
                  </Group>
                );
              })()}
            </Flex>
            <BreadcrumbsNav />
          </Flex>
          
          <Flex>
          {renderHeaderActions(location.pathname, navigate)}


          <Flex
            w="60"
            h="100%"
            justify="center"
            align="center"
            onClick={toggle}
          >
            <ActionIcon variant="transparent" size="lg" c="dimmed">
              {opened ? <IconX size={30} /> : <IconMenu2 size={30} />}
            </ActionIcon>
          </Flex>
            </Flex>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar bg="light-dark(var(--mantine-color-white), var(--mantine-color-dark-7))">
        <Stack justify="space-between" h="100%">
          <Stack gap={0}>
            <Stack gap="sm" mt="sm">
              {mainNavItems.map((item) => (
                <Box key={item.path}>
                  <Tooltip
                    label={item.label}
                    disabled={opened}
                    position="right"
                    withArrow
                  >
                    <MenuLink
                        {...item}
                        expanded={opened}

                        onClick={isMobile ? toggle : undefined}
                    />
                  </Tooltip>
                </Box>
              ))}
            </Stack>
          </Stack>

          <Stack gap="sm" mb="sm">
            {bottomNavItems.map((item) => (
              <Box key={item.path}>
                <Tooltip
                  label={item.label}
                  disabled={opened}
                  position="right"
                  withArrow
                >
                  <MenuLink
                    {...item}
                    expanded={opened}

                    onClick={isMobile ? toggle : undefined}
                  />
                </Tooltip>
              </Box>
            ))}
          </Stack>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
