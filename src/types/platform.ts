export interface PlatformItem {
  name: string;
  description: string;
  icon: string;
  role: string;
  bestFor: string;
}

export interface PlatformGroup {
  title: string;
  description: string;
  role: string;
  items: PlatformItem[];
}
