import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, MoveUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import spatialOne from "@/assets/spatial-01.jpg";
import spatialTwo from "@/assets/spatial-02.jpg";
import spatialThree from "@/assets/spatial-03.jpg";
import portrait from "@/assets/studio-portrait.jpg";
import visualOne from "@/assets/visual-01.jpg";
import visualTwo from "@/assets/visual-02.jpg";
import visualThree from "@/assets/visual-03.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hadeera Tariq — Interior & Graphic Designer" },
      { name: "description", content: "Selected interior architecture and visual identity work by multidisciplinary designer Hadeera Tariq." },
      { property: "og:title", content: "Hadeera Tariq — Interior & Graphic Designer" },
      { property: "og:description", content: "A multidisciplinary practice merging interior architecture with compelling graphic identities." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

type Filter = "all" | "spatial" | "visual";

const projects = [
  { title: "Lake House 01", type: "spatial" as const, meta: "Residential · 2026", image: spatialOne, shape: "wide", width: 1600, height: 1008 },
  { title: "Northline Editions", type: "visual" as const, meta: "Identity System · 2026", image: visualOne, shape: "portrait", width: 1104, height: 1408 },
  { title: "House of Stillness", type: "spatial" as const, meta: "Residential · 2025", image: spatialTwo, shape: "wide", width: 1600, height: 1008 },
  { title: "Axis Archive", type: "visual" as const, meta: "Editorial · 2025", image: visualTwo, shape: "square", width: 1200, height: 1200 },
  { title: "Nocturne Hotel", type: "spatial" as const, meta: "Hospitality · 2025", image: spatialThree, shape: "wide", width: 1600, height: 1008 },
  { title: "Atmospheres 03", type: "visual" as const, meta: "Cultural Campaign · 2024", image: visualThree, shape: "portrait", width: 1104, height: 1408 },
];

function Portfolio() {
  const [filter, setFilter] = useState<Filter>("all");
  const [scrolled, setScrolled] = useState(false);
  const [cursor, setCursor] = useState({ x: -40, y: -40, active: false, visible: false });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    const onMove = (event: MouseEvent) => setCursor((current) => ({ ...current, x: event.clientX, y: event.clientY, visible: true }));
    const onOver = (event: MouseEvent) => {
      const target = event.target;
      if (target instanceof Element) setCursor((current) => ({ ...current, active: Boolean(target.closest("a, button, [data-cursor]")) }));
    };
    document.body.classList.add("custom-cursor");
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    onScroll();
    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  const visibleProjects = projects.filter((project) => filter === "all" || project.type === filter);

  return (
    <main>
      <div aria-hidden="true" className={`pointer-events-none fixed z-[100] hidden rounded-full bg-primary mix-blend-difference transition-[width,height,opacity] duration-300 lg:block ${cursor.active ? "h-12 w-12" : "h-2.5 w-2.5"} ${cursor.visible ? "opacity-100" : "opacity-0"}`} style={{ left: cursor.x, top: cursor.y, transform: "translate(-50%, -50%)" }} />

      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-border bg-surface-strong backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="mx-auto grid h-20 max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center px-5 sm:h-24 sm:px-8 lg:px-12">
          <a href="#top" className="flex min-w-0 items-baseline gap-3" aria-label="Hadeera Tariq, back to top">
            <span className="font-display text-2xl">HT</span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground sm:block">Multidisciplinary Designer</span>
          </a>
          <nav aria-label="Primary navigation" className="flex shrink-0 items-center gap-5 text-[11px] font-medium uppercase tracking-[0.18em] sm:gap-9">
            <a href="#work" className="transition-colors hover:text-primary">Work</a>
            <a href="#profile" className="transition-colors hover:text-primary">Profile</a>
            <a href="#contact" className="transition-colors hover:text-primary">Contact</a>
          </nav>
        </div>
      </header>

      <section id="top" className="relative isolate flex min-h-[92svh] items-center overflow-hidden px-5 pt-24 sm:px-8 lg:px-12">
        <div aria-hidden="true" className="ambient-glow pointer-events-none absolute inset-0 -z-10" />
        <div className="mx-auto w-full max-w-[1600px]">
          <p className="mb-8 animate-quiet-rise text-[10px] font-medium uppercase tracking-[0.3em] text-primary sm:mb-12">Interior Architecture · Visual Identity</p>
          <h1 className="max-w-[1300px] animate-quiet-rise text-balance font-sans text-[clamp(3.25rem,8vw,8rem)] font-normal leading-[0.92] tracking-normal" style={{ animationDelay: "100ms" }}>
            Form, Space, and <span className="text-primary">Visual Precision.</span>
          </h1>
          <div className="mt-12 grid gap-8 sm:mt-16 sm:grid-cols-[1fr_1fr] lg:grid-cols-[2fr_1fr]">
            <span />
            <p className="max-w-md animate-quiet-rise text-pretty text-base font-light leading-relaxed text-ink-soft sm:text-lg" style={{ animationDelay: "220ms" }}>
              A multidisciplinary practice merging interior architecture with compelling graphic identities.
            </p>
          </div>
        </div>
        <a href="#disciplines" aria-label="Explore disciplines" className="absolute bottom-8 left-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-primary sm:left-8 lg:left-12">
          Explore <ArrowDown className="h-4 w-4" strokeWidth={1.25} />
        </a>
      </section>

      <section id="disciplines" className="grid min-h-[76svh] md:grid-cols-2">
        <Gateway href="#work" image={spatialOne} number="01" title="Spatial Design" detail="Interiors · CAD · 3D" onSelect={() => setFilter("spatial")} />
        <Gateway href="#work" image={visualOne} number="02" title="Visual Systems" detail="Identity · Editorial · Campaigns" onSelect={() => setFilter("visual")} />
      </section>

      <section id="work" className="px-5 py-28 sm:px-8 sm:py-40 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-14 grid gap-10 lg:mb-24 lg:grid-cols-[1fr_2fr] lg:items-end">
            <div>
              <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-primary">Selected work · 2024—26</p>
              <h2 className="text-balance font-sans text-[clamp(3.25rem,8vw,8rem)] font-normal leading-[0.92] tracking-normal">A considered archive.</h2>
            </div>
            <div className="flex flex-wrap gap-x-7 gap-y-4 lg:justify-end">
              {([['all', 'All Projects'], ['spatial', 'Spatial & Interiors'], ['visual', 'Visual & Graphic']] as const).map(([value, label]) => (
                <Button key={value} type="button" variant="ghost" onClick={() => setFilter(value)} className={`h-auto rounded-none border-b px-0 pb-2 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors hover:bg-transparent ${filter === value ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`} aria-pressed={filter === value}>
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
            {visibleProjects.map((project, index) => (
              <article key={project.title} data-cursor className={`group relative overflow-hidden bg-surface ${project.type === "spatial" ? "lg:col-span-8" : "lg:col-span-4"} ${project.shape === "wide" ? "aspect-[16/10]" : project.shape === "square" ? "aspect-square" : "aspect-[4/5]"} ${filter === "all" && index === 2 ? "lg:col-start-5" : ""}`}>
                <img src={project.image} alt={`${project.title} — ${project.meta}`} width={project.width} height={project.height} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]" />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/95 via-background/10 to-transparent p-5 opacity-100 transition-opacity duration-500 md:p-7 lg:opacity-0 lg:group-hover:opacity-100">
                  <div className="w-full translate-y-0 transition-transform duration-500 lg:translate-y-4 lg:group-hover:translate-y-0">
                    <p className="mb-2 text-[9px] uppercase tracking-[0.24em] text-primary">{project.meta}</p>
                    <div className="flex items-end justify-between gap-4">
                      <h3 className="font-display text-3xl sm:text-4xl">{project.title}</h3>
                      <MoveUpRight className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.25} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="profile" className="grid min-h-screen lg:grid-cols-2">
        <div className="min-h-[70svh] overflow-hidden lg:min-h-screen">
          <img src={portrait} alt="Hadeera Tariq in her design studio" width={1104} height={1408} loading="lazy" className="h-full w-full object-cover grayscale-[18%]" />
        </div>
        <div className="flex items-center bg-secondary px-5 py-24 sm:px-12 lg:px-[10%]">
          <div className="max-w-xl">
            <p className="mb-10 text-[10px] uppercase tracking-[0.25em] text-primary">Profile / Method</p>
            <h2 className="text-balance font-sans text-[clamp(1.75rem,3.5vw,3.5rem)] font-normal leading-[1.1] tracking-normal">Ideas gain clarity when every dimension is considered.</h2>
            <div className="mt-12 grid gap-7 text-sm font-light leading-[1.8] text-ink-soft sm:grid-cols-2">
              <p>My practice moves between the room and the page. Spatial awareness gives graphic systems rhythm, depth, and proportion.</p>
              <p>In return, visual storytelling brings interiors a stronger sense of sequence, identity, and emotional resonance.</p>
            </div>
            <div className="mt-14 border-y border-border py-8">
              <p className="text-[10px] uppercase tracking-[0.22em] text-primary">Education</p>
              <p className="mt-4 text-2xl font-normal text-foreground sm:text-3xl">Interior · Graphic Design</p>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-8 text-[10px] uppercase tracking-[0.18em]">
              <div><dt className="text-muted-foreground">Based</dt><dd className="mt-2 text-foreground">London · Worldwide</dd></div>
              <div><dt className="text-muted-foreground">Focus</dt><dd className="mt-2 text-foreground">Space · Identity</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <footer id="contact" className="flex min-h-screen flex-col justify-between px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center">
          <p className="mb-8 text-[10px] uppercase tracking-[0.25em] text-primary">New projects · Collaborations · Commissions</p>
          <h2 className="font-sans text-[clamp(3.25rem,8vw,8rem)] font-normal leading-[0.92] tracking-normal">Let’s<br /><span>Collaborate.</span></h2>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hadeeratariq@gmail.com" target="_blank" rel="noreferrer" className="mt-16 inline-flex w-fit items-center gap-4 border-b border-border pb-3 text-xl font-light transition-colors hover:border-primary hover:text-primary sm:text-3xl">
            hadeeratariq@gmail.com <MoveUpRight className="h-6 w-6" strokeWidth={1.25} />
          </a>
        </div>
        <div className="mx-auto mt-20 flex w-full max-w-[1600px] flex-col gap-7 border-t border-border pt-7 text-[10px] uppercase tracking-[0.2em] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">© 2026 Hadeera Tariq</p>
          <div className="flex gap-7"><a href="https://behance.net" target="_blank" rel="noreferrer" className="hover:text-primary">Behance</a><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-primary">LinkedIn</a><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary">Instagram</a></div>
        </div>
      </footer>

      <a href="#top" aria-label="Back to top" className={`fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center border border-border bg-surface-strong text-foreground backdrop-blur-xl transition-all duration-500 hover:border-primary hover:text-primary sm:bottom-8 sm:right-8 ${scrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
        <ArrowUp className="h-4 w-4" strokeWidth={1.25} />
      </a>
    </main>
  );
}

function Gateway({ href, image, number, title, detail, onSelect }: { href: string; image: string; number: string; title: string; detail: string; onSelect: () => void }) {
  return (
    <a href={href} onClick={onSelect} data-cursor className="group relative min-h-[58svh] overflow-hidden md:min-h-[76svh]">
      <img src={image} alt="" width={1600} height={1008} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.06]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-background/10 transition-colors duration-700" />
      <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10 lg:p-12">
        <div className="mb-5 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-primary opacity-100 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100"><span>{number}</span><span>{detail}</span></div>
        <div className="flex items-end justify-between gap-4"><h2 className="font-display text-5xl sm:text-6xl lg:text-7xl">{title}</h2><MoveUpRight className="h-7 w-7 shrink-0 text-primary transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={1.1} /></div>
      </div>
    </a>
  );
}