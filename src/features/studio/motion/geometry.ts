export function headerOffset() {
  const configured = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--header-h'),
  );
  return Number.isFinite(configured)
    ? configured
    : (document.querySelector('header')?.getBoundingClientRect().height ?? 0);
}
