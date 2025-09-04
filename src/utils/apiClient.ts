import type { MemoryCache } from './MemoryCache';

export class ApiError extends Error {
  constructor(public status: number, message?: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const apiClient = {
  fetch: async <T>(url: URL): Promise<T> => {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new ApiError(response.status, `HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  fetchWithMemoryCache: async <T>(
    url: URL,
    cacheName: string,
    memoryCache: MemoryCache
  ): Promise<T> => {
    const cachedData = memoryCache.get<T>(cacheName);
    if (cachedData) {
      return Promise.resolve(cachedData);
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new ApiError(response.status, `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    memoryCache.set(cacheName, data);
    return data;
  },

  appendSearchParams: (url: URL, params: Record<string, string>): URL => {
    const newUrl = new URL(url.toString());
    Object.entries(params).forEach(([key, value]) => {
      newUrl.searchParams.append(key, value);
    });
    return newUrl;
  }
};
