import { Box, Group, Text } from "@mantine/core";
import { IconGitMerge } from "@tabler/icons-react";
import { useNavigate, useLocation } from "react-router";
import CompanyClasses from './company-classes';
import CompanyNouns from './company-nouns';
import CompanyModifiers from './company-modifiers';
import Abbreviations from './abbreviations';
import { useMemo } from "react";

const NAV_ITEMS = [
  { label: "Abbreviations", value: "abbreviations" },
  { label: "Company Nouns", value: "company-nouns" },
  { label: "Company Modifiers", value: "company-modifiers" },
  { label: "Company Classes & Attributes", value: "company-classes" },
];

export default function Taxonomy() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentTab = useMemo(() => {
    const pathParts = location.pathname.split("/").filter(Boolean);
    return pathParts[3] || "abbreviations";
  }, [location.pathname]);
  
  const handleTabChange = (value: string | null) => {
    if (value) {
      navigate(`/app/configuration/taxonomy/${value}`);
    }
  };

  const renderCurrentComponent = () => {
    switch (currentTab) {
      case "company-nouns":
        return <CompanyNouns />;
      case "company-modifiers":
        return <CompanyModifiers />;
      case "company-classes":
        return <CompanyClasses />;
      case "abbreviations":
      default:
        return <Abbreviations />;
    }
  };

  return (
    <Box>
      <Box
        style={{
          borderBottom:
            "1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))",
        }}
        p="sm"
      >
        <Group>
          <Group gap={4}>
            <IconGitMerge size={16} />
            <Text size="sm">TAXONOMY</Text>
          </Group>
          {NAV_ITEMS.map((item) => (
            <Box
              key={item.value}
              component="div"
              role="button"
              tabIndex={0}
              onClick={() => handleTabChange(item.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleTabChange(item.value);
                }
              }}
              p="6.5px 14px"
              style={(theme) => ({
                color:
                  currentTab === item.value
                    ? "#007294"
                    : "var(--text-color)",
                backgroundColor:
                  currentTab === item.value
                    ? "var(--mantine-color-body)"
                    : "transparent",
                borderRadius: "4px",
                cursor: "pointer",
              })}
            >
              <Text size="sm" fw={500}>
                {item.label}
              </Text>
            </Box>
          ))}
        </Group>
      </Box>
      <Box p="md" h="calc(100vh - 200px)" >
        {renderCurrentComponent()}
      </Box>
    </Box>
  );
}
