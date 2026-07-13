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

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

export interface AuthResponse {
  admin: {
    _id: string;
    email: string;
    name: string;
    role: string;
  };
  token: string;
}
