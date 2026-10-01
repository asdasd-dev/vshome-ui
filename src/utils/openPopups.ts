let count = 0;

export function trackOpenPopup(): () => void {
  count += 1;
  return () => { setTimeout(() => { count -= 1; }, 0); };
}

export const hasOpenPopup = () => count > 0;
