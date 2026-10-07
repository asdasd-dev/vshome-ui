import { useEffect, useRef, useState, type MouseEvent, type ReactElement, type TouchEvent } from "react";
import { CSPProvider } from "@base-ui/react/csp-provider";
import { ContextMenu as Base } from "@base-ui/react/context-menu";
import type { BaseUIEvent } from "@base-ui/react";
import { cx } from "../utils/cx";
import { trackOpenPopup } from "../utils/openPopups";

const TOUCH_CONTEXTMENU_MS = 1500;

export type ContextMenuAction = { label: string; onSelect: () => void; disabled?: boolean };
export type ContextMenuCheckbox = { label: string; checked: boolean; onCheckedChange: (checked: boolean) => void; disabled?: boolean };
export type ContextMenuRadio<T extends string = string> = {
  label: string;
  value: T;
  options: { value: T; label: string; disabled?: boolean }[];
  onValueChange: (value: T) => void;
};
export type ContextMenuEntry = ContextMenuAction | ContextMenuCheckbox | ContextMenuRadio | "separator";

export type ContextMenuProps = {
  items: ContextMenuEntry[];
  children: ReactElement;
  longPress?: boolean;
  disabled?: boolean;
  className?: string;
};

function Entry({ item }: { item: Exclude<ContextMenuEntry, "separator"> }) {
  if ("options" in item) {
    return (
      <Base.Group className="vs-menu__group">
        <Base.GroupLabel className="vs-menu__label">{item.label}</Base.GroupLabel>
        <Base.RadioGroup value={item.value} onValueChange={(v) => { if (v !== item.value) item.onValueChange(v as string); }}>
          {item.options.map((o) => (
            <Base.RadioItem key={o.value} value={o.value} disabled={o.disabled} closeOnClick className="vs-menu__item">
              <Base.RadioItemIndicator className="vs-menu__check">✓</Base.RadioItemIndicator>
              <span className="vs-menu__text">{o.label}</span>
            </Base.RadioItem>
          ))}
        </Base.RadioGroup>
      </Base.Group>
    );
  }
  if ("checked" in item) {
    return (
      <Base.CheckboxItem checked={item.checked} onCheckedChange={item.onCheckedChange} disabled={item.disabled} closeOnClick className="vs-menu__item">
        <Base.CheckboxItemIndicator className="vs-menu__check">✓</Base.CheckboxItemIndicator>
        <span className="vs-menu__text">{item.label}</span>
      </Base.CheckboxItem>
    );
  }
  return (
    <Base.Item onClick={item.onSelect} disabled={item.disabled} className="vs-menu__item">
      <span className="vs-menu__text">{item.label}</span>
    </Base.Item>
  );
}

export function ContextMenu({ items, children, longPress = true, disabled, className }: ContextMenuProps) {
  const [open, setOpen] = useState(false);
  useEffect(() => (open ? trackOpenPopup() : undefined), [open]);
  const lastTouch = useRef(0);
  // Без долгого нажатия касание отдаём странице как есть: Base UI на touchstart зовёт stopPropagation, а это глушит TouchSensor у предков
  const touchProps = longPress ? {} : {
    onTouchStart: (e: BaseUIEvent<TouchEvent>) => { lastTouch.current = Date.now(); e.preventBaseUIHandler(); },
    // Android шлёт contextmenu и на долгое нажатие пальцем
    onContextMenu: (e: BaseUIEvent<MouseEvent>) => {
      const touch = (e.nativeEvent as PointerEvent).pointerType === "touch" || Date.now() - lastTouch.current < TOUCH_CONTEXTMENU_MS;
      if (touch) e.preventBaseUIHandler();
    },
  };
  return (
    <CSPProvider disableStyleElements>
      <Base.Root open={open} onOpenChange={setOpen} disabled={disabled}>
        <Base.Trigger render={children} {...touchProps} />
        <Base.Portal>
          <Base.Positioner className="vs-menu__positioner">
            <Base.Popup className={cx("vs-menu", className)}>
              {items.map((item, i) => item === "separator"
                ? <Base.Separator key={i} className="vs-menu__separator" />
                : <Entry key={i} item={item} />)}
            </Base.Popup>
          </Base.Positioner>
        </Base.Portal>
      </Base.Root>
    </CSPProvider>
  );
}
