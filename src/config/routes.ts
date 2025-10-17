export const authRoutes = {
  signUp: "/sign-up",
  login: "/login",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyEmail: "/verify-email",
  emailSuccess: "/verification-success",
} as const;

export const onboardingRoutes = {
  welcome: "/welcome",
} as const;

export const baseDashboardRoute = "/dashboard";

export const dashboardRoutes = {
  home: baseDashboardRoute,
  leadsEnrichment: `${baseDashboardRoute}/leads-enrichment`,
  campaign: `${baseDashboardRoute}/campaign`,
  channels: "#",
  emails: `${baseDashboardRoute}/channels/email`,
  emailManagement: `${baseDashboardRoute}/channels/email/management`,
  emailDeliveryReport: (accountId: string) =>
    `${baseDashboardRoute}/channels/email/${accountId}/delivery-report`,
  linkedIn: `${baseDashboardRoute}/channels/linkedIn`,
  linkedInAccounts: `${baseDashboardRoute}/channels/linkedIn/accounts`,
  linkedInPerformance: `${baseDashboardRoute}/channels/linkedIn/performance`,
  phone: `${baseDashboardRoute}/channels/phone`,
  crm: `${baseDashboardRoute}/crm`,
  crmImport: `${baseDashboardRoute}/crm/import`,
  tasks: `${baseDashboardRoute}/tasks`,
  templates: `${baseDashboardRoute}/templates`,
  settings: `${baseDashboardRoute}/settings`,
  wizard: `${baseDashboardRoute}/setup-wizard`,
} as const;
