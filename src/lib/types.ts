export type LinkProps = {
  link: string;
  title: string;
};

export type dashboardCreateCapsuleTab = 'info' | 'tags' | 'status';

export type dashboardCreateCapsuleCategories = {
  title: string;
  items: string[];
};

export type dashboardCreateCapsuleColorOption = {
  id: string;
  colorCode: string;
};
