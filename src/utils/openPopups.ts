const GUARD_MS = 1000;

let count = 0;
let pressed = false;
let timer: ReturnType<typeof setTimeout> | undefined;

function disarm() {
  pressed = false;
  clearTimeout(timer);
  window.removeEventListener("click", disarm);
}

function arm() {
  disarm();
  pressed = true;
  timer = setTimeout(disarm, GUARD_MS);
  window.addEventListener("click", disarm);
}

export function trackOpenPopup(): () => void {
  count += 1;
  document.addEventListener("pointerdown", arm, true);
  return () => {
    count -= 1;
    document.removeEventListener("pointerdown", arm, true);
  };
}

export const hasOpenPopup = () => count > 0 || pressed;
