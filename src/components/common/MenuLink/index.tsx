import { Link, useLocation } from "react-router";
import { Group, Text } from "@mantine/core";
import type { NavItem } from "~/pages/layout";
import classes from "./MenuLink.module.css";

interface MenuLinkProps extends NavItem {
  onClick?: () => void;
  className?: string;
  expanded?: boolean;
}

export default function MenuLink(props: MenuLinkProps) {
  const {
    label,
    icon: Icon,
    path,
    onClick,
    className,
    expanded,
    ...rest
  } = props;
  const location = useLocation();
  const isNavItemActive = (item: NavItem, pathname: string) => {
    if (item.path === "/app/configuration") {
      return pathname.startsWith("/app/configuration") || pathname.startsWith("/app/company");
    }
    else
      return pathname === item.path || pathname.startsWith(item.path + "/");


  };
  const isActive = isNavItemActive({ path, label, icon: Icon }, location.pathname);

  return (
    <Link
      to={path}
      onClick={onClick}
      className={`${isActive ? classes.menuLinkActive : classes.menuLink} ${
        expanded ? classes.expanded : ""
      } ${className || ""}`}
      {...rest}
    >
      <Group gap="sm" wrap="nowrap">
        <div className={classes.iconWrapper}>
          <Icon active={isActive} />
        </div>
        <Text
          className={`${classes.linkLabel} ${
            expanded ? classes.labelExpanded : ""
          }`}
          size="sm"
        >
          {label}
        </Text>
      </Group>
    </Link>
  );
}
