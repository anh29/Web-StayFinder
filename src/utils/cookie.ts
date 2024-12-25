export function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

export function getCookie(name: string): string | null {
  return document.cookie.split('; ').reduce((r, c) => {
    const [key, ...v] = c.split('=');
    return key === name ? decodeURIComponent(v.join('=')) : r;
  }, '' as string) || null;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; path=/;`;
}
