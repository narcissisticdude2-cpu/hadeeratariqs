import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, MoveUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import galleryPlan from "@/assets/gallery-plan.webp";
import galleryCases from "@/assets/gallery-render-cases.webp";
import galleryCorner from "@/assets/gallery-render-corner.webp";
import galleryEntrance from "@/assets/gallery-render-entrance.webp";
import galleryWall from "@/assets/gallery-render-wall.webp";
import galleryWide from "@/assets/gallery-render-wide.webp";
import gallerySectionEnd from "@/assets/gallery-section-end.webp";
import gallerySectionLong from "@/assets/gallery-section-long.webp";
import heroInterior from "@/assets/hero-interior.jpg";
import landscapeBench from "@/assets/landscape-bench-detail.jpg";
import landscapeBubble from "@/assets/landscape-bubble.jpg";
import landscapePaving from "@/assets/landscape-paving.jpg";
import landscapePlan from "@/assets/landscape-plan.jpg";
import landscapeCourt from "@/assets/landscape-render-court.webp";
import landscapeFront from "@/assets/landscape-render-front.webp";
import landscapeSeating from "@/assets/landscape-seating.jpg";
import landscapeSite from "@/assets/landscape-site.jpg";
import residentialDiningBoard from "@/assets/residential-dining-board.webp";
import residentialDiningPlan from "@/assets/residential-dining-plan.webp";
import residentialDiningRender from "@/assets/residential-dining-render.webp";
import residentialDrawingBoard from "@/assets/residential-drawing-board.webp";
import residentialDrawingPlan from "@/assets/residential-drawing-plan.webp";
import residentialDrawingRender from "@/assets/residential-drawing-render.webp";
import residentialLivingBoard from "@/assets/residential-living-board.webp";
import residentialLivingGarden from "@/assets/residential-living-garden.webp";
import residentialLivingPlan from "@/assets/residential-living-plan.webp";
import residentialLivingWall from "@/assets/residential-living-wall.webp";
import schoolClassroom from "@/assets/school-classroom.webp";
import schoolExterior from "@/assets/school-exterior.webp";
import schoolPlan from "@/assets/school-plan.webp";
import schoolRestroom from "@/assets/school-restroom.webp";
import schoolTherapy from "@/assets/school-therapy.webp";
import schoolZoning from "@/assets/school-zoning.webp";
import visualOne from "@/assets/visual-01.jpg";
import visualTwo from "@/assets/visual-02.jpg";
import visualThree from "@/assets/visual-03.jpg";

import { ProjectDrawer, type ProjectDetail } from "@/components/project-drawer";
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

const glowDots = [
  { x: 8, y: 12, s: 2, d: 0 }, { x: 18, y: 28, s: 1.5, d: 1.2 }, { x: 34, y: 16, s: 2.5, d: 2.4 },
  { x: 52, y: 34, s: 1.5, d: 0.8 }, { x: 66, y: 10, s: 2, d: 3.2 }, { x: 78, y: 46, s: 1.5, d: 1.8 },
  { x: 88, y: 22, s: 2, d: 4.1 }, { x: 12, y: 56, s: 1.5, d: 2.9 }, { x: 42, y: 62, s: 2, d: 0.5 },
  { x: 62, y: 72, s: 1.5, d: 3.7 }, { x: 26, y: 80, s: 2.5, d: 5.0 }, { x: 74, y: 86, s: 1.5, d: 4.5 },
  { x: 92, y: 68, s: 2, d: 1.5 }, { x: 48, y: 88, s: 1.5, d: 6.2 }, { x: 4, y: 90, s: 2, d: 3.0 },
  { x: 56, y: 48, s: 1, d: 2.2 }, { x: 30, y: 42, s: 1, d: 5.5 }, { x: 82, y: 58, s: 1, d: 4.8 },
];

type Project = {
  title: string;
  type: "spatial" | "visual";
  meta: string;
  image: string;
  shape: "wide" | "square" | "portrait";
  width: number;
  height: number;
  detail?: ProjectDetail;
};

const landscapeDetail: ProjectDetail = {
  title: "Landscape Design",
  meta: "Landscape · Department Courtyard · 2026",
  overview:
    "A landscape intervention for a department courtyard in Lahore — turning a bare, sun-bleached forecourt into a shaded, planted setting with a curved seating spine, soft lawn, and a clear stone path to the entrance.",
  sections: [
    {
      label: "01 · Site Condition",
      heading: "The existing forecourt",
      note: "The starting point: patchy grass, exposed service lines, and no shade or seating. Photographs and measurements of the site set the constraints for everything that follows.",
      image: landscapeSite,
      width: 1600,
      height: 1204,
    },
    {
      label: "02 · Bubble Diagram",
      heading: "Zoning and circulation",
      note: "A hand-drawn bubble diagram resolves the zones first — planting beds, the seating pocket, and two curved paths that guide movement toward the department building.",
      image: landscapeBubble,
      width: 1755,
      height: 1240,
    },
    {
      label: "03 · Site Plan",
      heading: "Dimensioned CAD plan",
      note: "The AutoCAD plan fixes the geometry: the 24'-11\" planter edge, the curved bench line, paving widths, and the setbacks that keep circulation clear of the façade.",
      image: landscapePlan,
      width: 869,
      height: 783,
    },
    {
      label: "04 · Render",
      heading: "Entrance approach",
      note: "The front render tests the proposal against the real façade — a mature shade tree, layered planting along the boundary wall, and a paved walkway leading straight to the porch.",
      image: landscapeFront,
      width: 1920,
      height: 1452,
    },
    {
      label: "05 · Render",
      heading: "Shaded courtyard",
      note: "A late-afternoon study of the courtyard: dappled shade across the lawn, the curved bench tucked against the raised planter, and a hedge line softening the boundary.",
      image: landscapeCourt,
      width: 1920,
      height: 1562,
    },
    {
      label: "06 · Seating",
      heading: "The curved bench spine",
      note: "The serpentine bench follows the planter wall, giving students informal seating that faces the lawn while keeping the walking route uninterrupted.",
      image: landscapeSeating,
      width: 1600,
      height: 898,
    },
    {
      label: "07 · Detail",
      heading: "Materials up close",
      note: "Timber slats on a dark steel frame against exposed-aggregate concrete — warm against cool, with ferns and palms packed behind the seat back.",
      image: landscapeBench,
      width: 1482,
      height: 1062,
    },
    {
      label: "08 · Paving",
      heading: "Stone and pebble path",
      note: "Large stone slabs set in pebble joints keep drainage open and give the path a quiet rhythm where it meets the planting bed and the lawn edge.",
      image: landscapePaving,
      width: 1365,
      height: 1152,
    },
  ],
};

const residentialDetail: ProjectDetail = {
  title: "Residential Interior",
  meta: "Interior Architecture · Residence · 2026",
  overview:
    "A modern residence shaped by warm minimalism, organic texture, and easy spatial flow. Walnut, bouclé, and limestone run through the living, drawing, and dining rooms, pairing precise planning with a tactile, quietly luxurious finish.",
  sections: [
    { label: "01 · Living Room Plan", heading: "Open conversation zone", note: "The CAD layout centres an open-plan conversation zone on an oversized L-shaped sectional. Dimensioning keeps traffic moving freely between the entrances and the glazed façade.", image: residentialLivingPlan, width: 1728, height: 822 },
    { label: "02 · Mood Board", heading: "Living room palette", note: "Oak panelling, travertine, and bouclé accents set a refined palette. Sculptural walnut pieces bring rich contrast against soft, neutral walls.", image: residentialLivingBoard, width: 896, height: 1166 },
    { label: "03 · Render", heading: "Garden view", note: "Floor-to-ceiling glazing frames the garden and lets daylight wash across the warm wood panelling. Low seating keeps sightlines open through the full depth of the room.", image: residentialLivingGarden, width: 1920, height: 1080 },
    { label: "04 · Render", heading: "Feature wall and console", note: "Timber panelling hides flush doors to form one continuous feature wall. A carved console and abstract artwork add warmth and an editorial note.", image: residentialLivingWall, width: 1920, height: 1080 },
    { label: "05 · Drawing Room Plan", heading: "Formal seating flow", note: "The drawing room plan sets a formal lounge around a curved central sofa and a pair of accent chairs. Symmetrical proportions keep the room welcoming for guests.", image: residentialDrawingPlan, width: 1515, height: 825 },
    { label: "06 · Mood Board", heading: "Drawing room materials", note: "Bouclé upholstery on walnut frames gives the drawing room structural warmth, with stone detailing and a textured wool rug picked out by soft light.", image: residentialDrawingBoard, width: 950, height: 1166 },
    { label: "07 · Render", heading: "Lighting and ambience", note: "Concealed vertical LED strips wash the plaster walls in a warm glow, while an arched floor lamp creates a reading corner over organic timber coffee tables.", image: residentialDrawingRender, width: 1920, height: 1080 },
    { label: "08 · Dining Plan", heading: "Ten-seat dining layout", note: "A ten-seat table runs alongside full-height sliding glass doors. Generous clearances keep movement to the service areas unobstructed.", image: residentialDiningPlan, width: 1586, height: 917 },
    { label: "09 · Mood Board", heading: "Dining materials", note: "Walnut, ivory bouclé, and sheer linen make the dining room warm and welcoming, with matte black hardware grounding the neutral palette.", image: residentialDiningBoard, width: 950, height: 1166 },
    { label: "10 · Render", heading: "Dining perspective", note: "A hand-blown glass bubble chandelier hangs over the solid walnut table as the focal point. Sheer curtains filter garden light while keeping the room private.", image: residentialDiningRender, width: 1920, height: 1080 },
  ],
};

const schoolDetail: ProjectDetail = {
  title: "Inclusive School",
  meta: "Educational Architecture · Universal Design · 2026",
  overview:
    "A school designed around diverse learning styles and sensory needs. A radial plan puts accessible circulation and intuitive wayfinding first, and each administrative, academic, and therapy hub is tuned to the right level of stimulation.",
  sections: [
    { label: "01 · Floor Plan", heading: "The radial plan", note: "A curved radial corridor links the specialist facilities: food court, drama hub, administration, classrooms, and a dedicated medical rehabilitation wing. Dimensions are set with accessibility in mind.", image: schoolPlan, width: 2246, height: 1338 },
    { label: "02 · Zoning", heading: "Sensory and functional zones", note: "The building is zoned by sensory profile: high-stimulus activity areas, administrative working zones, low-stimulus learning spaces, transitional thresholds, soft-scape buffers, and an outdoor sensory garden.", image: schoolZoning, width: 1682, height: 858 },
    { label: "03 · Render", heading: "Inclusive classroom", note: "Natural light, calm pastel acoustic panels, tactile paving underfoot, and flexible seating that works for wheelchairs and different postures for learning.", image: schoolClassroom, width: 1672, height: 941 },
    { label: "04 · Render", heading: "Therapy and rehabilitation", note: "Treadmills, stationary bikes, treatment tables, and bean-bag seating in soft blues. The room is built for recovery and calm.", image: schoolTherapy, width: 1672, height: 941 },
    { label: "05 · Render", heading: "Universal restrooms", note: "Low granite vanities with automatic fittings, accessible stall doors with push-to-open buttons, grab bars, and encouraging wall signage.", image: schoolRestroom, width: 1672, height: 941 },
    { label: "06 · Exterior", heading: "Massing and roof plan", note: "The top-down view shows the curved roof forms, perimeter brick boundary, drop-off drive, and green courtyards framing the campus.", image: schoolExterior, width: 800, height: 450 },
  ],
};

const galleryDetail: ProjectDetail = {
  title: "Gallery Curation",
  meta: "Exhibition Design · Spatial Curation · 2026",
  overview:
    "A reimagined exhibition room for a historical portrait collection on Quaid-e-Azam Muhammad Ali Jinnah. Classic framed photography meets a central holographic display, set against deep midnight-blue walls and geometric patterned flooring under precise track lighting.",
  sections: [
    { label: "01 · Floor Plan", heading: "Master gallery plan", note: "The dimensioned plan fixes the room size, entry doors, the central holographic projector ring, and the curation layout across every perimeter wall.", image: galleryPlan, width: 2270, height: 1611 },
    { label: "02 · Elevation", heading: "The 32-foot main wall", note: "The long-wall elevation sets exact mounting heights, frame spacing, door clearance, and the positions of the overhead track lights.", image: gallerySectionLong, width: 2254, height: 1460 },
    { label: "03 · Render", heading: "Main exhibition wall", note: "A frontal view of the symmetrical monochrome portrait collection on deep navy walls, picked out by warm track spotlights.", image: galleryWall, width: 1672, height: 941 },
    { label: "04 · Elevation", heading: "The 18-foot end wall", note: "The end-wall elevation sets out the centred frame arrangement, wall dimensions, and directed track lighting.", image: gallerySectionEnd, width: 2206, height: 1834 },
    { label: "05 · Render", heading: "Holographic centrepiece", note: "A wide view of the central holographic figure against the traditional geometric floor tiles and the curated picture walls.", image: galleryWide, width: 1672, height: 941 },
    { label: "06 · Render", heading: "Entrance and narrative wall", note: "From the doorway, the lit narrative panel sits alongside the holographic display and a seating bench.", image: galleryEntrance, width: 1672, height: 941 },
    { label: "07 · Render", heading: "Display cases", note: "Lit freestanding display cases sit beneath framed prints and narrative panels.", image: galleryCases, width: 1672, height: 941 },
    { label: "08 · Render", heading: "Corner showcase", note: "The corner turn, with track-light highlights and a lit showcase table for historical artefacts.", image: galleryCorner, width: 1672, height: 941 },
  ],
};

const projects: Project[] = [
  { title: "Landscape Design", type: "spatial", meta: "Landscape · 2026", image: landscapeFront, shape: "wide", width: 1920, height: 1452, detail: landscapeDetail },
  { title: "Residential Interior", type: "spatial", meta: "Residential · 2026", image: residentialLivingGarden, shape: "wide", width: 1920, height: 1080, detail: residentialDetail },
  { title: "Northline Editions", type: "visual", meta: "Identity System · 2026", image: visualOne, shape: "portrait", width: 1104, height: 1408 },
  { title: "Inclusive School", type: "spatial", meta: "Educational · 2026", image: schoolClassroom, shape: "wide", width: 1672, height: 941, detail: schoolDetail },
  { title: "Axis Archive", type: "visual", meta: "Editorial · 2025", image: visualTwo, shape: "square", width: 1200, height: 1200 },
  { title: "Gallery Curation", type: "spatial", meta: "Exhibition · 2026", image: galleryWide, shape: "wide", width: 1672, height: 941, detail: galleryDetail },
  { title: "Atmospheres 03", type: "visual", meta: "Cultural Campaign · 2024", image: visualThree, shape: "portrait", width: 1104, height: 1408 },
];


const visualImages = [
  { image: visualOne, width: 1104, height: 1408 },
  { image: visualTwo, width: 1200, height: 1200 },
  { image: visualThree, width: 1104, height: 1408 },
];

function buildDetail(project: (typeof projects)[number]): ProjectDetail {
  if (project.detail) return project.detail;
  // Every spatial project carries its own detail; only the visual placeholders fall through to here.
  const pick = (i: number) => visualImages[i % visualImages.length]!;

  const sections = [
    { label: "01 · Concept", heading: "Grid and structure", note: "The system begins as a typographic grid — column rhythm, margins, and scale steps that hold across every format.", ...pick(0) },
    { label: "02 · Mood Board", heading: "Visual references", note: "Reference images, textures, and print stock set the tone before the identity is drawn.", ...pick(1) },
    { label: "03 · Layouts", heading: "Editorial application", note: "Spreads and posters stress-test the system with dense and sparse content alike.", ...pick(2) },
    { label: "04 · Collateral", heading: "Applied identity", note: "Signage, print collateral, and digital surfaces carry the same proportions as the spatial work.", ...pick(0) },
  ];

  return {
    title: project.title,
    meta: project.meta,
    overview: "A visual system built from a strict grid — typography, imagery, and print collateral tuned into one consistent voice.",
    sections,
  };
}

function GlowDots() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {glowDots.map((dot, i) => (
        <span
          key={i}
          className="glow-dot absolute rounded-full bg-primary"
          style={{ left: `${dot.x}%`, top: `${dot.y}%`, width: `${dot.s * 0.25}rem`, height: `${dot.s * 0.25}rem`, animationDelay: `${dot.d}s` }}
        />
      ))}
    </div>
  );
}

const skills = [
  "3ds Max",
  "V-Ray",
  "AutoCAD",
  "SketchUp",
  "Photoshop",
  "Creative Suite",
  "Illustrator",
];

function SkillsList() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-3 pl-4 sm:space-y-4 sm:pl-10 lg:pl-16">
      {skills.map((skill, i) => (
        <div
          key={skill}
          className={`font-sans text-2xl font-light transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] sm:text-3xl lg:text-4xl ${visible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"}`}
          style={{ transitionDelay: `${(visible ? i : skills.length - 1 - i) * 50}ms` }}
        >
          {skill}
        </div>
      ))}
    </div>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<ProjectDetail | null>(null);
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
        <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroInterior})`, zIndex: -30 }} />
        <div aria-hidden="true" className="absolute inset-0 bg-background/85" style={{ zIndex: -20 }} />
        <div aria-hidden="true" className="ambient-glow pointer-events-none absolute inset-0 -z-10" />
        <GlowDots />
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
        <Gateway href="#work" image={residentialLivingGarden} number="01" title="Spatial Design" detail="Interiors · CAD · 3D" onSelect={() => setFilter("spatial")} />
        <Gateway href="#work" image={visualOne} number="02" title="Visual Systems" detail="Identity · Editorial · Campaigns" onSelect={() => setFilter("visual")} />
      </section>

      <section id="work" className="relative isolate overflow-hidden px-5 py-28 sm:px-8 sm:py-40 lg:px-12">
        <GlowDots />
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-14 grid gap-10 lg:mb-24 lg:grid-cols-[1fr_2fr] lg:items-end">
            <div>
              <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-primary">Selected work · 2024—26</p>
              <h2 className="text-balance font-sans text-[clamp(1.75rem,3.5vw,3.5rem)] font-normal leading-[1.1] tracking-normal">A considered archive.</h2>
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
              <article key={project.title} data-cursor role="button" tabIndex={0} onClick={() => setActive(buildDetail(project))} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActive(buildDetail(project)); } }} className={`group relative cursor-pointer overflow-hidden bg-surface ${project.type === "spatial" ? "lg:col-span-8" : "lg:col-span-4"} ${project.shape === "wide" ? "aspect-[16/10]" : project.shape === "square" ? "aspect-square" : "aspect-[4/5]"} ${filter === "all" && index === 2 ? "lg:col-start-5" : ""}`}>
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
        <div className="flex items-center bg-secondary px-5 py-24 sm:px-12 lg:px-[10%]">
          <div className="max-w-xl">
            <p className="mb-10 text-[10px] uppercase tracking-[0.25em] text-primary">Profile / Method</p>
            <h2 className="text-balance font-sans text-[clamp(1.25rem,2.5vw,2.25rem)] font-normal leading-[1.15] tracking-normal">Ideas gain clarity when every dimension is considered.</h2>
            <div className="mt-12 grid gap-7 text-sm font-light leading-[1.8] text-ink-soft sm:grid-cols-2">
              <p>My practice moves between the room and the page. Spatial awareness gives graphic systems rhythm, depth, and proportion.</p>
              <p>In return, visual storytelling brings interiors a stronger sense of sequence, identity, and emotional resonance.</p>
            </div>
            <div className="mt-14 space-y-10 border-y border-border py-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary">Education</p>
                <p className="mt-4 text-2xl font-normal text-foreground sm:text-3xl">BS Interior Design</p>
                <p className="mt-2 text-[10px] font-light uppercase tracking-[0.2em] text-muted-foreground">Expected graduation · 2027</p>
                <p className="mt-3 text-sm font-light text-foreground/80">University of Home Economics, Lahore</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-primary">Experience</p>
                <p className="mt-4 text-2xl font-normal text-foreground sm:text-3xl">Interior Designer Intern</p>
                <p className="mt-2 text-sm font-light text-foreground/80">Cielo Casa, Lahore</p>
                <p className="mt-1 text-[10px] font-light uppercase tracking-[0.2em] text-muted-foreground">Jul – Aug 2025</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center bg-surface px-5 py-24 sm:px-12 lg:px-[10%]">
          <div className="w-full max-w-xl">
            <p className="mb-10 text-[10px] uppercase tracking-[0.25em] text-primary">Capabilities</p>
            <SkillsList />
          </div>
        </div>
      </section>

      <footer id="contact" className="relative isolate flex min-h-screen flex-col justify-between overflow-hidden px-5 py-24 sm:px-8 lg:px-12">
        <GlowDots />
        <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center">
          <p className="mb-8 text-[10px] uppercase tracking-[0.25em] text-primary">New projects · Collaborations · Commissions</p>
          <h2 className="font-sans text-[clamp(3.25rem,8vw,8rem)] font-normal leading-[0.92] tracking-normal">Let’s Collaborate.</h2>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hadeeratariq@gmail.com" target="_blank" rel="noreferrer" className="mt-16 inline-flex w-fit items-center gap-4 border-b border-border pb-3 text-xl font-light transition-colors hover:border-primary hover:text-primary sm:text-3xl">
            hadeeratariq@gmail.com <MoveUpRight className="h-6 w-6" strokeWidth={1.25} />
          </a>
        </div>
        <div className="mx-auto mt-20 flex w-full max-w-[1600px] flex-col gap-7 border-t border-border pt-7 text-[10px] uppercase tracking-[0.2em] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">© 2026 Hadeera Tariq</p>
          <div className="flex gap-7"><a href="https://www.linkedin.com/in/hadeera-tariq-5aa139359" target="_blank" rel="noreferrer" className="hover:text-primary">LinkedIn</a></div>
        </div>
      </footer>

      <a href="#top" aria-label="Back to top" className={`fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center border border-border bg-surface-strong text-foreground backdrop-blur-xl transition-all duration-500 hover:border-primary hover:text-primary sm:bottom-8 sm:right-8 ${scrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
        <ArrowUp className="h-4 w-4" strokeWidth={1.25} />
      </a>

      <ProjectDrawer project={active} onClose={() => setActive(null)} />
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
