import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, MoveUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import foodcourtAccessible from "@/assets/foodcourt-accessible-seating.webp";
import foodcourtAxial from "@/assets/foodcourt-axial.webp";
import foodcourtColumns from "@/assets/foodcourt-columns.webp";
import foodcourtCounter from "@/assets/foodcourt-counter.webp";
import foodcourtHero from "@/assets/foodcourt-hero.webp";
import foodcourtLiftLounge from "@/assets/foodcourt-lift-lounge.webp";
import foodcourtMoodboard from "@/assets/foodcourt-moodboard.webp";
import foodcourtPlan from "@/assets/foodcourt-plan.webp";
import foodcourtQuietAerial from "@/assets/foodcourt-quiet-aerial.webp";
import foodcourtQuietGround from "@/assets/foodcourt-quiet-ground.webp";
import foodcourtSocial from "@/assets/foodcourt-social.webp";
import foodcourtWayfinding from "@/assets/foodcourt-wayfinding.webp";
import foodcourtZoning from "@/assets/foodcourt-zoning.webp";
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
import residentialDiningBoard from "@/assets/residential-dining-board.png";
import residentialDiningPlan from "@/assets/residential-dining-plan.png";
import residentialDiningRender from "@/assets/residential-dining-render.png";
import residentialDrawingBoard from "@/assets/residential-drawing-board.png";
import residentialDrawingPlan from "@/assets/residential-drawing-plan.png";
import residentialDrawingRender from "@/assets/residential-drawing-render.png";
import residentialLivingBoard from "@/assets/residential-living-board.png";
import residentialLivingGarden from "@/assets/residential-living-garden.png";
import residentialLivingPlan from "@/assets/residential-living-plan.png";
import residentialLivingWall from "@/assets/residential-living-wall.png";
import schoolClassroom from "@/assets/school-classroom.webp";
import schoolExterior from "@/assets/school-exterior.webp";
import schoolPlan from "@/assets/school-plan.webp";
import schoolRestroom from "@/assets/school-restroom.webp";
import schoolTherapy from "@/assets/school-therapy.webp";
import schoolZoning from "@/assets/school-zoning.webp";
import productOne from "@/assets/product-1.webp";
import productTwo from "@/assets/product-2.webp";
import productThree from "@/assets/product-3.webp";
import productFour from "@/assets/product-4.webp";
import productFive from "@/assets/product-5.webp";
import socialOne from "@/assets/social-1.webp";
import socialTwo from "@/assets/social-2.webp";
import socialThree from "@/assets/social-3.webp";
import socialPoster1 from "@/assets/social-poster-1.webp";
import socialPoster2 from "@/assets/social-poster-2.webp";
import storySi1 from "@/assets/story-si-1.webp";
import storySi2 from "@/assets/story-si2.webp";
import storySi3 from "@/assets/story-si3.webp";
import storyC1 from "@/assets/story-c1.webp";
import storyC2 from "@/assets/story-c2.webp";

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
  detail: ProjectDetail;
};

const landscapeDetail: ProjectDetail = {
  title: "Departmental Landscape Redesign",
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
    { label: "01 · Living Room Plan", heading: "Open conversation zone", note: "The CAD layout centres an open-plan conversation zone on an oversized L-shaped sectional. Dimensioning keeps traffic moving freely between the entrances and the glazed façade.", bigLabel: true, image: residentialLivingPlan, width: 687, height: 618 },
    { label: "02 · Mood Board", heading: "Living room palette", note: "Oak panelling, travertine, and bouclé accents set a refined palette. Sculptural walnut pieces bring rich contrast against soft, neutral walls.", image: residentialLivingBoard, width: 809, height: 1080 },
    { label: "03 · Render", heading: "Garden view", note: "Floor-to-ceiling glazing frames the garden and lets daylight wash across the warm wood panelling. Low seating keeps sightlines open through the full depth of the room.", image: residentialLivingGarden, width: 1738, height: 1080 },
    { label: "04 · Render", heading: "Feature wall and console", note: "Timber panelling hides flush doors to form one continuous feature wall. A carved console and abstract artwork add warmth and an editorial note.", image: residentialLivingWall, width: 1623, height: 1080 },
    { label: "05 · Drawing Room Plan", heading: "Formal seating flow", note: "The drawing room plan sets a formal lounge around a curved central sofa and a pair of accent chairs. Symmetrical proportions keep the room welcoming for guests.",bigLabel: true, image: residentialDrawingPlan, width: 689, height: 713 },
    { label: "06 · Mood Board", heading: "Drawing room materials", note: "Bouclé upholstery on walnut frames gives the drawing room structural warmth, with stone detailing and a textured wool rug picked out by soft light.", image: residentialDrawingBoard, width: 863, height: 1080 },
    { label: "07 · Render", heading: "Lighting and ambience", note: "Concealed vertical LED strips wash the plaster walls in a warm glow, while an arched floor lamp creates a reading corner over organic timber coffee tables.", image: residentialDrawingRender, width: 1920, height: 1080 },
    { label: "08 · Dining Plan", heading: "Ten-seat dining layout", note: "A ten-seat table runs alongside full-height sliding glass doors. Generous clearances keep movement to the service areas unobstructed.",bigLabel: true, image: residentialDiningPlan, width: 644, height: 789 },
    { label: "09 · Mood Board", heading: "Dining materials", note: "Walnut, ivory bouclé, and sheer linen make the dining room warm and welcoming, with matte black hardware grounding the neutral palette.", image: residentialDiningBoard, width: 864, height: 1080 },
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

const foodCourtDetail: ProjectDetail = {
  title: "Inclusive Food Court",
  meta: "Public Interior · Universal Design · 2026",
  overview:
    "A reimagined third-floor food court at Amanah Mall, Lahore, redesigned as a fully barrier-free public space. Continuous tactile paving, low-height ordering counters, varied ergonomic seating, and dedicated acoustic quiet booths give every visitor comfort, dignity, and independence.",
  sections: [
    { label: "01 · Floor Plan", heading: "Master inclusive plan", note: "The dimensioned plan sets out the full 167-foot hall: food stalls, the central lift and escalator core, continuous tactile pathways in yellow, clear turning radii, and zoned dining areas.", bigLabel: true, image: foodcourtPlan, width: 1774, height: 887 },
    { label: "02 · Zoning", heading: "Social and quiet zones", note: "A functional diagram separates high-energy social dining from sensory-friendly quiet zones, with clear circulation linking the vendors and vertical transport.", image: foodcourtZoning, width: 2000, height: 961 },
    { label: "03 · Mood Board", heading: "Materials and furniture", note: "Light oak HPL tabletops, wipe-clean vinyl upholstery, and polypropylene shell chairs suit heavy public use. Supportive armchairs help elderly or injured visitors, and wave-form acoustic baffles calm the ceiling plane.", image: foodcourtMoodboard, width: 2000, height: 2829 },
    { label: "04 · Render", heading: "Main concourse", note: "A wide view of the food hall shows wood-slat acoustic baffles, stone-clad piers, barrier-free concourses, and integrated wheelchair-accessible seating.", image: foodcourtHero, width: 2000, height: 1178 },
    { label: "05 · Render", heading: "Barrier-free ordering counter", note: "A multi-height service counter with lowered POS points and recessed kick-plates lets seated guests approach head-on and order unaided.", image: foodcourtCounter, width: 2000, height: 1718 },
    { label: "06 · Render", heading: "Tactile wayfinding corridor", note: "Directional tactile paving guides visually impaired visitors past seating nooks toward the restrooms and lifts.", image: foodcourtWayfinding, width: 1122, height: 1402 },
    { label: "07 · Render", heading: "Escalator landing lounge", note: "A resting zone beside the escalators, with high-back sofas and tactile paths, lets elderly or mobility-impaired visitors pause and get their bearings before entering the hall.", image: foodcourtLiftLounge, width: 1880, height: 1414 },
    { label: "08 · Render", heading: "Accessible dining and supportive seating", note: "Centre-pedestal tables, armrest chairs for easier standing, and open bays for wheelchairs make up the ergonomic dining setup.", image: foodcourtAccessible, width: 2000, height: 1168 },
    { label: "09 · Render", heading: "Axial dining perspective", note: "Generous aisles, slip-resistant porcelain flooring, and balanced ambient light run down the length of the main dining floor.", image: foodcourtAxial, width: 2000, height: 1479 },
    { label: "10 · Render", heading: "Social dining concourse", note: "Varied seating types, clear sightlines across the vendors, and timber acoustic ceiling treatments define the open social area.", image: foodcourtSocial, width: 1448, height: 1086 },
    { label: "11 · Render", heading: "Columns and table layout", note: "Limestone-plastered columns rise through linear acoustic slats above wide circulation corridors.", image: foodcourtColumns, width: 1445, height: 1088 },
    { label: "12 · Render", heading: "Quiet booths from above", note: "High-backed, fabric-panelled booths absorb ambient noise and give neurodivergent visitors and families a calm, low-stimulus refuge.", image: foodcourtQuietAerial, width: 1448, height: 1086 },
    { label: "13 · Render", heading: "Quiet zone at eye level", note: "At ground level, enclosed acoustic booth alcoves flow into open pedestal dining tables.", image: foodcourtQuietGround, width: 2000, height: 1105 },
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

const productDetail: ProjectDetail = {
  title: "Product Showcase",
  meta: "Commercial Visual Design · Product Compositing · 2026",
  overview:
    "A curated series of commercial product visuals for premium fragrance, skincare, and personal care brands. Each concept frames the product as the hero through tailored colour, thematic props, and atmospheric lighting.",
  sections: [
    { label: "01 · Concept", heading: "Sauvage by Dior — architectural luminosity", note: "A moody, high-contrast visual built on architectural glass planes and focused spotlighting. Deep indigo and charcoal tones set off the amber gradient of the bottle.", image: productOne, width: 1080, height: 1080 },
    { label: "02 · Concept", heading: "Victoria’s Secret Cucumber & Green Tea — organic freshness", note: "A dual-tone sage background with geometric colour blocks, floating cucumber slices, and tea-leaf accents that point to the hydrating botanical ingredients.", image: productTwo, width: 1080, height: 1080 },
    { label: "03 · Concept", heading: "Avon Care Watermelon — dynamic splash", note: "A surreal composite of the lotion tube split into floating segments inside a swirl of hydration splash, with motion-blurred watermelon wedges suspended mid-air.", image: productThree, width: 1080, height: 1080 },
    { label: "04 · Concept", heading: "Joy by Dior — monochromatic elegance", note: "A soft studio mock-up with the bottle on cylindrical pedestals. A dusty-rose palette and tropical leaf shadows give a warm, luxurious finish.", image: productFour, width: 1080, height: 1080 },
    { label: "05 · Concept", heading: "Farmacy Niacinamide Night Mask — geometric shadowplay", note: "A diagonal colour-block composition in deep periwinkle and soft lavender, with botanical shadows that reinforce the calm, restorative focus of the product.", image: productFive, width: 1080, height: 1080 },
  ],
};

const socialDetail: ProjectDetail = {
  title: "Social Media Graphics",
  meta: "Promotional Design · Brand Marketing · 2026",
  overview:
    "A collection of social media graphics and posters spanning recruitment, tech, skincare, interior design services, and editorial advocacy, built on strong visual hierarchy, brand alignment, and clear calls to action.",
  sections: [
    { label: "01 · Poster", heading: "We Are Hiring — interior designer", note: "A recruitment poster on a deep burgundy gradient. A studio-lit leather accent chair anchors the layout beneath bold typography.", image: socialOne, width: 1080, height: 1350 },
    { label: "02 · Banner", heading: "Wireless headphones — feature banner", note: "Off-white over-ear headphones on a crinkled-paper texture, with outlined “WIRELESS” type and pill badges for playtime and noise cancellation.", image: socialTwo, width: 1080, height: 1350 },
    { label: "03 · Ad", heading: "AURA Mixsoon Toner Essence — skincare ad", note: "A luminous promo with floating water droplets, a warm gold radial glow, thin-serif typography, and a clear call-to-action button.", image: socialThree, width: 1080, height: 1350 },
    { label: "04 · Poster", heading: "Solidarity & Freedom — editorial poster", note: "Bold headline type over a newsprint-style textured background, centred on vector artwork of a raised fist wrapped in barbed wire.", image: socialPoster1, width: 1080, height: 1349 },
    { label: "05 · Flyer", heading: "H.A.D.E.E.R.A Design Studio — services flyer", note: "A warm-neutral flyer for an interior architecture studio, using frosted glass cards, restrained grey typography, and an asymmetrical architectural frame.", image: socialPoster2, width: 2000, height: 2909 },
  ],
};

const storyDetail: ProjectDetail = {
  title: "Storybook Covers & Characters",
  meta: "Children’s Illustration · Character Design · 2026",
  overview:
    "A collection of children’s storybook covers and standalone character illustrations, with expressive characters, whimsical settings, kid-friendly typography, and soft, harmonious palettes.",
  sections: [
    { label: "01 · Cover", heading: "Grandma’s Knitting Day", note: "A cosy interior with a grandmother knitting beside her curious cat. Soft pastel blues and warm yellows sit under playful hand-lettered type.", image: storySi1, width: 1254, height: 1254 },
    { label: "02 · Cover", heading: "Little Skater Big Dreams", note: "A boy in a backwards cap holding his skateboard in a bright meadow, with vibrant primary accents against a cheerful sky-blue backdrop.", image: storySi2, width: 1024, height: 1024 },
    { label: "03 · Cover", heading: "My Little Woodland Friend", note: "A boy and a friendly bunny in a forest clearing among red spotted mushrooms and butterflies, in deep navy and meadow-green tones.", image: storySi3, width: 1254, height: 1254 },
    { label: "04 · Character", heading: "Stacked Bird Trio", note: "Three pastel birds hanging from a branch. Big-eyed characters and clean outline art on a dusty-blue background carry the comic timing.", image: storyC1, width: 1080, height: 1235 },
    { label: "05 · Character", heading: "Baby Night Fury", note: "A big-eyed baby dragon on an olive-green ground, with smooth vector shapes, subtle gradient shadows, and high-contrast green eyes.", image: storyC2, width: 1080, height: 1350 },
  ],
};

const projects: Project[] = [
  { title: "Departmental Landscape Redesign", type: "spatial", meta: "Landscape · 2026", image: landscapeFront, shape: "wide", width: 1920, height: 1452, detail: landscapeDetail },
  { title: "Residential Interior", type: "spatial", meta: "Residential · 2026", image: residentialLivingGarden, shape: "wide", width: 1920, height: 1080, detail: residentialDetail },
  { title: "Product Showcase", type: "visual", meta: "Commercial Design · 2026", image: productFour, shape: "square", width: 1080, height: 1080, detail: productDetail },
  { title: "Inclusive School", type: "spatial", meta: "Educational · 2026", image: schoolClassroom, shape: "wide", width: 1672, height: 941, detail: schoolDetail },
  { title: "Social Media Graphics", type: "visual", meta: "Promotional Design · 2026", image: socialThree, shape: "portrait", width: 1080, height: 1350, detail: socialDetail },
  { title: "Gallery Curation", type: "spatial", meta: "Exhibition · 2026", image: galleryWide, shape: "wide", width: 1672, height: 941, detail: galleryDetail },
  { title: "Inclusive Food Court", type: "spatial", meta: "Public Interior · 2026", image: foodcourtHero, shape: "wide", width: 2000, height: 1178, detail: foodCourtDetail },
  { title: "Storybook Covers & Characters", type: "visual", meta: "Illustration · 2026", image: storySi1, shape: "square", width: 1254, height: 1254, detail: storyDetail },
];


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
        <Gateway href="#work" image={productFour} number="02" title="Visual Design" detail="Product · Social · Illustration" onSelect={() => setFilter("visual")} />
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
              <article key={project.title} data-cursor role="button" tabIndex={0} onClick={() => setActive(project.detail)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActive(project.detail); } }} className={`group relative cursor-pointer overflow-hidden bg-surface ${project.type === "spatial" ? "lg:col-span-8" : "lg:col-span-4"} ${project.shape === "wide" ? "aspect-[16/10]" : project.shape === "square" ? "aspect-square" : "aspect-[4/5]"} ${filter === "all" && index === 2 ? "lg:col-start-5" : ""}`}>
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
