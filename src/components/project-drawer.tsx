import { X } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

export type ProjectSection = {
  label: string;
  heading: string;
  note: string;
  image: string;
  width: number;
  height: number;
};

export type ProjectDetail = {
  title: string;
  meta: string;
  overview: string;
  sections: ProjectSection[];
};

const ScrollRootContext = createContext<HTMLElement | null>(null);

function Reveal({
  side,
  delay = 0,
  className = "",
  children,
}: {
  side: "left" | "right";
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const root = useContext(ScrollRootContext);
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShown(Boolean(entry?.isIntersecting)),
      { root: root ?? null, threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [root]);

  const hidden =
    side === "right"
      ? "opacity-0 translate-y-8 md:translate-y-0 md:translate-x-20"
      : "opacity-0 translate-y-8 md:translate-y-0 md:-translate-x-20";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] ${shown ? "translate-x-0 translate-y-0 opacity-100" : hidden} ${className}`}
    >
      {children}
    </div>
  );
}

export function ProjectDrawer({ project, onClose }: { project: ProjectDetail | null; onClose: () => void }) {
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const open = Boolean(project);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (root) root.scrollTop = 0;
  }, [project, root]);

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={`fixed inset-0 z-[80] bg-background/70 backdrop-blur-md transition-opacity duration-500 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={project?.title ?? "Project details"}
        ref={setRoot}
        className={`fixed inset-y-0 right-0 z-[90] w-full overflow-y-auto overscroll-contain bg-background transition-transform duration-[700ms] ease-[cubic-bezier(.22,1,.36,1)] md:w-[80vw] ${open ? "translate-x-0" : "pointer-events-none translate-x-full"}`}
      >
        {project && (
          <ScrollRootContext.Provider value={root}>
            <div className="sticky top-0 z-10 flex justify-end bg-gradient-to-b from-background via-background/80 to-transparent p-5 sm:p-8">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project"
                className="grid h-11 w-11 place-items-center border border-border bg-surface-strong text-foreground backdrop-blur-xl transition-colors hover:border-primary hover:text-primary"
              >
                <X className="h-4 w-4" strokeWidth={1.25} />
              </button>
            </div>

            <div className="mx-auto max-w-[1100px] px-5 pb-28 sm:px-10">
              <header className="-mt-10 max-w-3xl pb-16 sm:pb-24">
                <p className="mb-5 text-[10px] uppercase tracking-[0.25em] text-primary">{project.meta}</p>
                <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1] text-balance">{project.title}</h2>
                <p className="mt-8 max-w-xl text-pretty text-base font-light leading-relaxed text-ink-soft sm:text-lg">
                  {project.overview}
                </p>
              </header>

              <div className="space-y-24 sm:space-y-36">
                {project.sections.map((section, index) => {
                  const imageRight = index % 2 === 0;
                  return (
                    <section key={section.label} className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
                      <Reveal
                        side={imageRight ? "left" : "right"}
                        className={imageRight ? "md:order-1" : "md:order-2"}
                      >
                        <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-primary">{section.label}</p>
                        <h3 className="font-sans text-[clamp(1.5rem,2.6vw,2.25rem)] font-normal leading-[1.15]">
                          {section.heading}
                        </h3>
                        <p className="mt-5 text-sm font-light leading-[1.8] text-ink-soft">{section.note}</p>
                      </Reveal>
                      <Reveal
                        side={imageRight ? "right" : "left"}
                        delay={80}
                        className={imageRight ? "md:order-2" : "md:order-1"}
                      >
                        <img
                          src={section.image}
                          alt={`${project.title} — ${section.label}`}
                          width={section.width}
                          height={section.height}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </Reveal>
                    </section>
                  );
                })}
              </div>
            </div>
          </ScrollRootContext.Provider>
        )}
      </aside>
    </>
  );
}
