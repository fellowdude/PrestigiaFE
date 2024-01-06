export interface BreadcrumbConfig {
  showHome?: boolean;
  homeName?: string;
  breadcrumbs: Breadcrumb[];
}

export interface Breadcrumb {
  routerUrl?: string;
  name: string;
}
