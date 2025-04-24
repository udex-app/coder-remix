import { Box, Container, Grid, NavLink } from "@mantine/core";
import { IconBuilding, IconSettings } from "@tabler/icons-react";
import { useNavigate, useLocation } from "react-router";

import {
  Edit,
  Taxonomy,
  ReorderServiceFactor,
  Actions,
  QuestionsAndOptions,
  ReferenceData,
  CriticalityRopMapping,
} from "./general";
import {
  GlobalUser,
  ProfileAndAccount,
  UserManagement,
  RequestType,
  InstanceSettings,
} from "./settings";

const CONFIGURATION_LINKS = [
  { label: "Edit", value: "edit", component: <Edit /> },
  { label: "Taxonomy", value: "taxonomy", component: <Taxonomy /> },
  {
    label: "Reorder Service Factor",
    value: "reorder-service-factory",
    component: <ReorderServiceFactor />,
  },
  { label: "Actions", value: "actions", component: <Actions /> },
  {
    label: "Questions and Options",
    value: "questions-and-options",
    component: <QuestionsAndOptions />,
  },
  { label: "Reference Data", value: "reference-data", component: <ReferenceData /> },
  {
    label: "Criticality ROP Mapping",
    value: "criticality-rop-mapping",
    component: <CriticalityRopMapping />,
  },
];

const COMPANY_LINKS = [
  {
    label: "Profile & Account",
    value: "profile-and-account",
    component: <ProfileAndAccount />,
  },
  {
    label: "Company User Management",
    value: "user-management",
    component: <UserManagement />,
  },
  {
    label: "Global User Management",
    value: "global-user",
    component: <GlobalUser />,
  },
  { label: "Request Type", value: "request-type", component: <RequestType /> },
  {
    label: "Instance Level Settings",
    value: "instance-settings",
    component: <InstanceSettings />,
  },
];

export default function Configuration() {
  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = location.pathname.split("/").filter(Boolean); // ['app', 'configuration', 'edit']
  const baseSection = pathParts[1]; // 'configuration' or 'company'
  const currentPath = pathParts[2] || "edit"; // default fallback

  const isCompany = baseSection === "company";
  const navLinks = isCompany ? COMPANY_LINKS : CONFIGURATION_LINKS;

  const selectedComponent = navLinks.find((link) => link.value === currentPath)?.component;

  return (
      <Container fluid p={0} style={{ width: "100%" }} h="calc(100vh - 100px)">
        <Grid gutter={0}>
          <Grid.Col
              span={{ base: 3, lg: 2 }}
              style={{
                borderRight:
                    "1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))",
              }}
              bg="var(--mantine-color-body)"
          >
            <NavLink
                leftSection={<IconSettings size={20} />}
                label="CONFIGURATION"
                childrenOffset={28}
                defaultOpened
                p="md"
                style={{
                  borderBottom:
                      "1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))",
                }}
            >
              {CONFIGURATION_LINKS.map((link) => (
                  <NavLink
                      key={link.value}
                      label={link.label}
                      active={!isCompany && currentPath === link.value}
                      onClick={() => navigate(`/app/configuration/${link.value}`)}
                      style={{
                        borderRight:
                            !isCompany && currentPath === link.value
                                ? "4px solid var(--mantine-color-blue-6)"
                                : "none",
                      }}
                  />
              ))}
            </NavLink>

            <NavLink
                leftSection={<IconBuilding size={20} />}
                label="COMPANY SETTINGS"
                childrenOffset={28}
                defaultOpened
                p="md"
                style={{
                  borderTop:
                      "1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))",
                }}
            >
              {COMPANY_LINKS.map((link) => (
                  <NavLink
                      key={link.value}
                      label={link.label}
                      active={isCompany && currentPath === link.value}
                      onClick={() => navigate(`/app/company/${link.value}`)}
                      style={{
                        borderRight:
                            isCompany && currentPath === link.value
                                ? "4px solid var(--mantine-color-blue-6)"
                                : "none",
                      }}
                  />
              ))}
            </NavLink>
          </Grid.Col>

          <Grid.Col span={{ base: 9, lg: 10 }}>
            <Box style={{ height: "calc(100vh - 100px)" }}>{selectedComponent}</Box>
          </Grid.Col>
        </Grid>
      </Container>
  );
}
