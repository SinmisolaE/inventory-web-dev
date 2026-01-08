export interface MenuItem {
  label: string;
  icon: string;
  route: string;
  requiredRoles?: string[]; // Empty array means accessible to all authenticated users
  children?: MenuItem[];
}
