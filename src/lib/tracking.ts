const GCLID_KEY = 'tm_gclid';

export function captureGclid() {
  try {
    const params = new URLSearchParams(window.location.search);
    const gclid = params.get('gclid');
    if (gclid) {
      localStorage.setItem(GCLID_KEY, gclid);
    }
  } catch {
    // localStorage unavailable (private mode, etc.) — ignore.
  }
}

export function getGclid(): string {
  try {
    return localStorage.getItem(GCLID_KEY) ?? '';
  } catch {
    return '';
  }
}
