import type { RouteConfig } from "@react-router/dev/routes";

export default [
  {
    path: "/",
    file: "pages/layout.tsx",
    children: [
      { path: "", file: "pages/redirect.tsx" },
      { path: "app/dashboard", file: "pages/app/dashboard.tsx" },
      { path: "app/user/settings", file: "pages/app/settings.tsx" },
      { path: "app/help", file: "pages/app/help.tsx" },
      { path: "app/materials", file: "pages/app/materials.tsx" },
      { path: "app/create-material",
        file: "pages/app/create-material/index.tsx",
        children: [
          { path: "basic-details", file: "pages/app/create-material/basic-details.tsx" },
          { path: "sourcing-information", file: "pages/app/create-material/sourcing-information.tsx" },
          { path: "noun-class-selection", file: "pages/app/create-material/noun-class-selection.tsx" },
          { path: "bom", file: "pages/app/create-material/bom.tsx" },
          { path: "criticality", file: "pages/app/create-material/criticality.tsx" },
          { path: "material-plant", file: "pages/app/create-material/material-plant.tsx" },
          { path: "upload", file: "pages/app/create-material/upload.tsx" },
          { path: "review", file: "pages/app/create-material/review.tsx" },
        ], },

      // ROP/ROQ ROUTES
      { path: "app/rop-roq", file: "pages/app/rop-roq/index.tsx", children: [
        { path: "", file: "pages/app/rop-roq/rop-roq.tsx" },
        { path: "rop-increase", file: "pages/app/rop-roq/ropIncrease.tsx" },
        { path: "rop-increase/material-details/:materialNumber", file: "pages/app/rop-roq/rop-roqMaterialDetails.tsx" },
      ] },
      
      { 
        path: "app/user/profile", 
        file: "pages/app/profile/index.tsx",
        children: [
          { path: "personal-info", file: "pages/app/profile/personal-info-tab.tsx" },
          { path: "company", file: "pages/app/profile/company-tab.tsx" },
          { path: "notifications", file: "pages/app/profile/notifications-tab.tsx" },
          { path: "security", file: "pages/app/profile/security-tab.tsx" },
        ]
      },
      { path: "app/duplicates", file: "pages/app/duplicates.tsx" },
      { path: "app/bulk-enrichment", file: "pages/app/bulk-enrichment.tsx" },
      { path: "app/bom-monitor", file: "pages/app/bom-monitor.tsx" },
      { path: "app/flag-for-deletion", file: "pages/app/flag-for-deletion.tsx" },
      { path: "app/free-text-monitor", file: "pages/app/free-text-monitor/free-text-monitor.tsx" },
      { path: "app/free-text-monitor/details", file: "pages/app/free-text-monitor/free-text-details.tsx" },
      { path: "app/request-queue", file: "pages/app/request-queue.tsx" },
      { path: "app/lead-time-calculator", file: "pages/app/lead-time-calculator.tsx"},
      {path: "app/lead-time-calculator/LT-details/:materialNumber", file: "pages/app/lead-time-detail.tsx"},
      // CONFIGURATION ROUTES
      {
        path: "app/configuration",
        file: "pages/app/configuration/index.tsx",
        children: [
          { path: "edit", file: "pages/app/configuration/general/edit.tsx" },
          { path: "taxonomy", file: "pages/app/configuration/general/taxonomy/index.tsx", children: [
            { path: "abbreviations", file: "pages/app/configuration/general/taxonomy/abbreviations.tsx" },
            { path: "company-nouns", file: "pages/app/configuration/general/taxonomy/company-nouns.tsx" },
            { path: "company-modifiers", file: "pages/app/configuration/general/taxonomy/company-modifiers.tsx" },
            { path: "company-classes", file: "pages/app/configuration/general/taxonomy/company-classes.tsx" },
          ] },
          { path: "reorder-service-factory", file: "pages/app/configuration/general/reorder-service-factor.tsx" },
          { path: "actions", file: "pages/app/configuration/general/actions.tsx" },
          { path: "questions-and-options", file: "pages/app/configuration/general/questions-and-options.tsx" },
          { path: "criticality-rop-mapping", file: "pages/app/configuration/general/criticality-rop-mapping.tsx" },
          { path: "reference-data", file: "pages/app/configuration/general/reference-data.tsx" },
        ],
      },

      // COMPANY SETTINGS ROUTES
      {
        path: "app/company",
        id: "company-settings",
        file: "pages/app/configuration/index.tsx",
        children: [
          { path: "profile-and-account", file: "pages/app/configuration/settings/profile-and-account.tsx" },
          { path: "user-management", file: "pages/app/configuration/settings/user-management.tsx" },
          { path: "global-user", file: "pages/app/configuration/settings/global-user.tsx" },
          { path: "request-type", file: "pages/app/configuration/settings/request-type.tsx" },
          { path: "instance-settings", file: "pages/app/configuration/settings/instance-settings.tsx" },
        ],
      },
    ],
  },

  {
    path: "/auth",
    file: "pages/auth/layout.tsx",
    children: [
      { path: "login", file: "pages/auth/signin.tsx" },
      { path: "signup", file: "pages/auth/signup.tsx" },
      { path: "forgot-password", file: "pages/auth/forgot-password.tsx" },
      { path: "logout", file: "pages/auth/signout.tsx" },
      { path: "reset-password", file: "pages/auth/reset-password.tsx" },
    ],
  },

  {
    path: "*",
    file: "pages/error/404.tsx",
  },
] satisfies RouteConfig;
