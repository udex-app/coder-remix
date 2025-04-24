import { Breadcrumbs, Anchor, Text } from "@mantine/core";
import { useLocation, useNavigate } from "react-router";
import { IconChevronRight } from "@tabler/icons-react";
import { mainNavItems, bottomNavItems } from "~/pages/layout";

const HIDDEN_SEGMENTS = ["app", ":materialNumber"];

export default function BreadcrumbsNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const rawSegments = location.pathname
    .split("/")
    .filter((x) => x && !HIDDEN_SEGMENTS.includes(x));

  const pathnames = rawSegments.filter((seg, i) => {
    const isLast = i === rawSegments.length - 1;
    const isNumeric = /^\d+$/.test(seg); // наприклад: 20003401
    return !(isLast && isNumeric);
  });

  const allNavItems = [...mainNavItems, ...bottomNavItems];

  const crumbs = pathnames.map((_, index) => {
    const to = "/" + pathnames.slice(0, index + 1).join("/");
    const matched = allNavItems.find((item) => to.startsWith(item.path));
    const label = matched
      ? matched.label
      : decodeURIComponent(pathnames[index]);
    const formatLabel = (label: string) =>
      label
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    const Tab = formatLabel(label);
    return index === pathnames.length - 1 ? (
      <Text key={to}>{Tab}</Text>
    ) : (
      <Anchor key={to} onClick={() => navigate("/app" + to)}>
        {Tab}
      </Anchor>
    );
  });

  return (
    <Breadcrumbs separator={<IconChevronRight size={16} />} px="md" py="xs">
      {crumbs}
    </Breadcrumbs>
  );
}
