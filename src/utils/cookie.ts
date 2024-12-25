interface CookieOptions {
  secure?: boolean;
  sameSite?: 'Lax' | 'Strict' | 'None';
}

export function setCookie(
  name: string,
  value: string,
  days: number,
  options: CookieOptions = {}
) {
  const { secure, sameSite } = options;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/;${sameSite ? ` SameSite=${sameSite}` : ''}${secure ? '; Secure' : ''}`;
}

export function getCookie(name: string): string | null {
  try {
    return document.cookie.split('; ').reduce((r, c) => {
      const [key, ...v] = c.split('=');
      return key === name ? decodeURIComponent(v.join('=')) : r;
    }, '' as string) || null;
  } catch (error) {
    console.error('Error decoding cookie:', error);
    return null;
  }
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; path=/;`;
}
