import { useEffect, useRef } from "react";

type Watcher = { onclose: (() => void) | null; destroy: () => void };
type WatcherCtor = new () => Watcher;

// Base UI ловит «Назад» только в Drawer и после отказа закрыть не создаёт CloseWatcher заново — второе «Назад» уводило со страницы
export function useAndroidBack(open: boolean, onBack: () => boolean | void): void {
  const handler = useRef(onBack);
  handler.current = onBack;
  useEffect(() => {
    const Ctor = (window as unknown as { CloseWatcher?: WatcherCtor }).CloseWatcher;
    if (!open || !Ctor || !/Android/i.test(navigator.userAgent)) return;
    let w: Watcher;
    const arm = () => {
      w = new Ctor();
      w.onclose = () => { if (handler.current() === false) arm(); };
    };
    arm();
    return () => w.destroy();
  }, [open]);
}
