import { ApiResponse, Region, Era } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

/**
 * Generic fetch wrapper for the Historical Atlas API.
 * Used by server components (no axios needed for SSR).
 */
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
    // Revalidate every 60 seconds for ISR
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'API request failed' }));
    throw new Error(error.message || `API error: ${res.status}`);
  }

  return res.json();
}

// ─── Region API ───

export async function getRegions(): Promise<Region[]> {
  const res = await apiFetch<ApiResponse<Region[]>>('/regions');
  return res.data;
}

export async function getRegionBySlug(slug: string): Promise<Region> {
  const res = await apiFetch<ApiResponse<Region>>(`/regions/${slug}`);
  return res.data;
}

// ─── Era API ───

export async function getEras(): Promise<Era[]> {
  const res = await apiFetch<ApiResponse<Era[]>>('/eras');
  return res.data;
}

export async function getEraBySlug(slug: string): Promise<Era> {
  const res = await apiFetch<ApiResponse<Era>>(`/eras/${slug}`);
  return res.data;
}

export async function getErasByRegion(regionId: string): Promise<Era[]> {
  const res = await apiFetch<ApiResponse<Era[]>>(`/eras/region/${regionId}`);
  return res.data;
}
