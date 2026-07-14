export interface Region {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Era {
  _id: string;
  name: string;
  slug: string;
  startYear: number;
  endYear: number;
  description: string;
  regionIds: Region[] | string[];
  createdAt: string;
  updatedAt: string;
}

export interface Kingdom {
  _id: string;
  name: string;
  slug: string;
  description: string;
  regionId: string;
  eraId: string;
  startYear: number;
  endYear: number;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface War {
  _id: string;
  name: string;
  slug: string;
  description: string;
  regionId: string;
  eraId: string;
  startYear: number;
  endYear: number;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Battle {
  _id: string;
  name: string;
  slug: string;
  description: string;
  warId: string;
  regionId: string;
  eraId: string;
  date: string;
  location: string;
  outcome: string;
  casualties: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Commander {
  _id: string;
  name: string;
  slug: string;
  description: string;
  birthYear: number;
  deathYear: number;
  nationality: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Weapon {
  _id: string;
  name: string;
  slug: string;
  description: string;
  type: string;
  eraId: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Source {
  _id: string;
  title: string;
  author: string;
  year: number;
  type: string;
  url: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

export interface Admin {
  _id: string;
  username: string;
  email: string;
  role: 'super_admin' | 'editor';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  admin: Admin;
  token: string;
}
