import { useEffect, useRef, useState } from "react";

type View = { scale: number; x: number; y: number };
const MIN = 1;
const MAX = 6;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const [view, setView] = useState<View>({ scale: 1, x: 0, y: 0 });
  const [shown, setShown] = useState(false);
  const [dragging, setDragging] = useState(false);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef({ moved: false, startDist: 0, startScale: 1 });

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(true));
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.stopImmediatePropagation();
      onClose();
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey, true);
    };
  }, [onClose]);

  const zoomTo = (scale: number) =>
    setView((v) => {
      const next = clamp(scale, MIN, MAX);
      return next === MIN ? { scale: MIN, x: 0, y: 0 } : { ...v, scale: next };
    });

  const dist = () => {
    const [a, b] = [...pointers.current.values()];
    if (!a || !b) return 1;
    return Math.hypot(a.x - b.x, a.y - b.y);
  };

  const onPointerDown = (event: React.PointerEvent) => {
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    gesture.current.moved = false;
    if (pointers.current.size === 2) {
      gesture.current.startDist = dist();
      gesture.current.startScale = view.scale;
    }
    setDragging(true);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    const prev = pointers.current.get(event.pointerId);
    if (!prev) return;
    const dx = event.clientX - prev.x;
    const dy = event.clientY - prev.y;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (Math.abs(dx) + Math.abs(dy) > 1) gesture.current.moved = true;
    if (pointers.current.size === 2) {
      zoomTo((gesture.current.startScale * dist()) / gesture.current.startDist);
    } else if (view.scale > 1) {
      setView((v) => ({ ...v, x: v.x + dx, y: v.y + dy }));
    }
  };

  const onPointerUp = (event: React.PointerEvent) => {
    event.stopPropagation();
    pointers.current.delete(event.pointerId);
    if (pointers.current.size === 0) {
      setDragging(false);
      if (!gesture.current.moved) zoomTo(view.scale > 1 ? 1 : 2.5);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className={`fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-background/90 backdrop-blur-md transition-opacity duration-300 ${shown ? "opacity-100" : "opacity-0"}`}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        onClick={(event) => event.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={(event) => zoomTo(view.scale * (event.deltaY < 0 ? 1.15 : 1 / 1.15))}
        style={{
          transform: `translate(${view.x}px, ${view.y}px) scale(${shown ? view.scale : 0.92})`,
          touchAction: "none",
        }}
        className={`max-h-[92vh] max-w-[94vw] select-none object-contain ${view.scale > 1 ? (dragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"} ${dragging ? "" : "transition-transform duration-300 ease-out"}`}
      />
    </div>
  );
}
