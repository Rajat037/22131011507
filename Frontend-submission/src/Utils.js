export function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validateShortcode(code) {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(code) && code.length <= 10;
}
