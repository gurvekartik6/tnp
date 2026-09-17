const configuredBase = String(import.meta.env.VITE_API_BASE_URL || '/api')
  .trim()
  .replace(/\/+$/, '');

const BASE = configuredBase === '/api' || configuredBase.endsWith('/api')
  ? configuredBase
  : `${configuredBase}/api`;

let csrfToken = '';

async function request(path: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers);

  if (
    !headers.has('Content-Type') &&
    !(options.body instanceof FormData)
  ) {
    headers.set('Content-Type', 'application/json');
  }

  if (csrfToken && !headers.has('X-CSRF-Token')) {
    headers.set('X-CSRF-Token', csrfToken);
  }

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      body?.message || `Request failed (${res.status})`
    );
  }

  return body;
}

const crud = (path: string) => ({
  list: () => request(path),

  create: (data: any) =>
    request(path, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: any) =>
    request(`${path}/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  remove: (id: string) =>
    request(`${path}/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }),
});

export const api: any = {
  auth: {
    login: async (data: any) => {
      const result = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      csrfToken = result?.csrfToken || '';
      return result;
    },

    me: async () => {
      const result = await request('/auth/me');
      csrfToken = result?.csrfToken || csrfToken;
      return result;
    },

    logout: async () => {
      try {
        return await request('/auth/logout', {
          method: 'POST',
        });
      } finally {
        csrfToken = '';
      }
    },
  },

  media: {
    signature: (data: any) =>
      request('/media/signature', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },

  drives: crud('/drives'),
  companies: crud('/companies'),
  recruiters: crud('/recruiters'),
  announcements: crud('/announcements'),
  documents: crud('/documents'),
  newsletter: crud('/newsletter'),
  calendar: crud('/calendar'),

  statistics: {
    overview: () => request('/statistics/overview'),
    trend: () => request('/statistics/trend'),
  },

  audit: {
    list: () => request('/admin/audit'),
  },

  publicContent: {
    get: () => request('/public/content'),

    update: (data: any) =>
      request('/admin/content', {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
  },

  adminContent: {
    get: () => request('/admin/content'),
  },

  copilot: {
    ask: (question: string) =>
      request('/copilot', {
        method: 'POST',
        body: JSON.stringify({ question }),
      }),
  },
};
