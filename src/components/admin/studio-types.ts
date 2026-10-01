export type Editable<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer Item)[]
        ? Editable<Item>[]
        : T extends object
          ? { [Key in keyof T]: Editable<T[Key]> }
          : T;

export type StudioSection = {
  draftData: Record<string, unknown>;
  data?: Record<string, unknown>;
  status: string;
};

export type StudioProject = {
  _id?: string;
  id?: string;
  slug?: string;
  title: string;
  subtitle: string;
  category: string;
  imageKey?: string;
  imageUrl?: string;
  altText?: string;
  featuredOnHome: boolean;
  sortOrder: number;
};

export type StudioMessage = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status: string;
  createdAt: string;
};

export type StudioSite = {
  name: string;
  tagline: string;
  contact: {
    phone: string;
    email: string;
    instagramHandle: string;
    instagramUrl: string;
    location: string;
    [key: string]: string;
  };
  [key: string]: unknown;
};
