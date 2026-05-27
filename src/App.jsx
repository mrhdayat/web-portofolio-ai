import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Lenis from 'lenis';
import * as THREE from 'three';

// --------------------------------------------------------------------------
// BILINGUAL TRANSLATION DICTIONARIES (ZERO LAYOUT SHIFT CONFIG)
// --------------------------------------------------------------------------
const translations = {
  id: {
    heroSub: "CREATIVE PORTFOLIO 2026",
    heroRole: "S.KOM / BNSP SYSTEMS ANALYST",
    heroCert: "IBM GRANITE AI CERTIFIED",
    heroCoord: "[KOORD] IPK 3.65",
    heroSys: "[SYS] DETERMINISTIK",
    heroBio: "Saya tidak menghasilkan visual generator instan berpiksel murah. Sebagai lulusan Ilmu Komputer dan Systems Analyst bersertifikasi BNSP, saya merekayasa Humanized Ads Engine — sebuah arsitektur prompt deterministik yang mengunci konsistensi karakter, menyingkirkan tekstur plastik (AI slop), dan merancang photoshoot fashion serta skincare kelas dunia dengan presisi hitungan matematika.",
    deckBtn: "DECK PORTFOLIO",
    simBtn: "SIMULASI BUDGET",
    featuredWork: "KARYA PILIHAN",
    editorialDeck: "EDITORIAL DECK.",
    featuredDesc: "Studi kasus riil kampanye visual premium berbasis folder proyek. Klik kampanye untuk memuat seluruh isi folder gambarnya.",
    filterAll: "ALL DECK",
    filterFashion: "FASHION & APPAREL",
    filterSkincare: "SKINCARE & PRODUCT",
    filterAiPhotoshoot: "AI PHOTOSHOOT",
    imagesCount: "Gambar",
    viewConcept: "LIHAT KONSEP",
    viewGallery: "LIHAT GALERI",
    conceptLabel: "PROSES BERPIKIR",
    caseStudy1Title: "Luxury Fashion Campaign — Brand I",
    caseStudy1Desc: "Sesi photoshoot fashion premium dengan teknik Identity-Locking & Deterministic Pose Reference. 29+ frame konsisten.",
    caseStudy1Concept: "Konsep: <b>Premium Asymmetry</b>. Saya mengunci skeletal structure model di setiap frame menggunakan referensi pose deterministik, memastikan sudut kamera organik seperti fotografer nyata. Pencahayaan dihitung dari formula distribusi CMOS 35mm analog untuk menghindari plastik glow khas AI.",
    caseStudy2Title: "Skincare Hero Campaign",
    caseStudy2Desc: "Kampanye produk skincare dengan isolasi layer kemasan + model, mereproduksi tekstur kulit realistis tanpa AI slop.",
    caseStudy2Concept: "Konsep: <b>Product Integrity Isolation</b>. Setiap frame dirender dalam dua layer terpisah: model dan label kemasan. Hasilnya dikompositkan secara manual menggunakan masking untuk mencegah kontaminasi tekstur antara kulit manusia dan plastik kemasan.",
    caseStudy3Title: "Typographic Layout Series — Brand III",
    caseStudy3Desc: "Seri editorial berbasis tipografi dan komposisi minimal dengan kampanye brand ketiga.",
    caseStudy3Concept: "Konsep: <b>Swiss Grid Brutalism</b>. Setiap frame komposisi menggunakan sistem grid Swiss 12-kolom yang ketat. Tipografi di-render terpisah dari gambar model dan diintegrasikan pada tahap pasca-produksi dengan alignment matematis.",
    caseStudy4Title: "Skincare Realism — Human Skin Detail",
    caseStudy4Desc: "Studi kasus detail tekstur kulit manusia dengan pencahayaan analog untuk kampanye skincare premium.",
    caseStudy4Concept: "Konsep: <b>Analog Skin Rendering</b>. Butiran film grain dan cahaya lateral dari strip light studio direproduksi secara digital menggunakan formula sensor CMOS. Tidak ada filter kecantikan otomatis — tekstur pori kulit dipertahankan penuh untuk konten edukasi skincare.",
    caseStudy5Title: "Motion Photography — Brand Devetesion II",
    caseStudy5Desc: "Kampanye olahraga dengan teknik motion blur deterministik dan komposisi dinamis berbasis vektor kecepatan.",
    caseStudy5Concept: "Konsep: <b>Kinetic Determinism</b>. Blur gerak dikendalikan menggunakan vektor kecepatan yang dikunci pada 24°. Posisi model di-seed dari pose atletik standar agar setiap frame terasa seperti satu seri fotografis yang kohesif.",
    caseStudy6Title: "Macro Fabric Texture — Devetesion Brand II",
    caseStudy6Desc: "Detail tekstur serat kain makro untuk kampanye apparel brand, menampilkan kualitas material.",
    caseStudy6Concept: "Konsep: <b>Material Honesty</b>. Setiap serat kain di-render dalam resolusi tinggi tanpa enhancement artifisial. Pencahayaan ring-light macro direproduksi dari referensi studio tekstil nyata untuk memperlihatkan kualitas material secara jujur.",
    caseStudy7Title: "High-Fashion Editorial — Brand V (66 Frames)",
    caseStudy7Desc: "Seri editorial laki-laki high-fashion terbesar — 66 frame dengan konsistensi karakter 100% melalui Identity-Locking pipeline.",
    caseStudy7Concept: "Konsep: <b>Identity-Locked Serialization</b>. Pipeline multi-stage embedding mengunci 23 titik referensi wajah di setiap dari 66 frame. Ini adalah demonstrasi teknis terlengkap dari Humanized Ads Engine: satu karakter, enam puluh enam ekspresi, nol inkonsistensi.",
    caseStudy8Title: "Commercial Product Advertising — Skincare",
    caseStudy8Desc: "Kampanye iklan komersial produk skincare dengan pose iklan profesional dan komposisi premium.",
    caseStudy8Concept: "Konsep: <b>Commercial Realism Engine</b>. Pose model dikalibrasi dari database 4.200 frame iklan produk kecantikan nyata. Setiap sudut kamera dirancang untuk memaksimalkan product visibility sambil mempertahankan proporsi tubuh manusia yang anatomis.",
    propsTitle: "PROPRIETARY ARCHITECTURE",
    propsHeading: "HUMANIZED ADS ENGINE",
    propsSub: "Mengapa visual AI generik terlihat seperti sampah plastik murahan? Karena prompt Anda menggunakan kosakata slop generik. Engine saya merombak total metodologi rekayasa gambar AI:",
    prop1Title: "Deterministic Pose Reference",
    prop1Desc: "Mengunci struktur sendi tubuh (skeletal structure) agar model fashion tidak meliuk secara anomali, mempertahankan sudut pandang kamera murni fotografer nyata.",
    prop2Title: "Analog Light Mapping",
    prop2Desc: "Menerapkan rumus penyebaran cahaya berdasarkan sensor kamera CMOS dan film analog 35mm, mereproduksi butiran grain alami dan mengusir glow buatan khas AI slop.",
    prop3Title: "Identity-Locking Workflow",
    prop3Desc: "Sistem multi-stage embedding untuk mengunci karakter model di berbagai seting lokasi kampanye. Struktur wajah, rahang, dan sorot mata tetap 100% konsisten.",
    prop4Title: "Product Integrity Isolation",
    prop4Desc: "Memisahkan rendering model dengan detail kemasan skincare atau serat baju melalui layer masking Photoshop tingkat lanjut sebelum sintesis akhir.",
    pricingTitle: "SIMULATOR BUDGET KAMPANYE",
    pricingSub: "Berdasarkan skema pricing Fiverr/Upwork profesional saya. Batas slider meregang memantul secara elastis saat ditarik ekstrem.",
    pricingConcepts: "Jumlah Konsep Kreatif",
    pricingOutputs: "Jumlah Output Gambar",
    pricingIdLock: "Penguncian Karakter (Identity Locking)",
    pricingRights: "Commercial Right & High-Res Source",
    priceTag: "IDR",
    priceBtn: "AMBIL KAMPANYE INI",
    aboutSub: "PROFESSIONAL ROADMAP",
    aboutTitle: "S.KOM & SYSTEMS ANALYST",
    aboutBio: "Saya mengintegrasikan metodologi analisis sistem yang kaku dengan kreativitas generative art modern. Dari menganalisis database sekolah di Satui Kalsel, hingga mengoptimalkan pemrosesan workflow AI bersertifikat IBM.",
    skillsSys: "Systems & Automation",
    skillsCreative: "Creative Technology",
    contactHeading: "MULAI PROYEK KAMPANYE ANDA SEKARANG.",
    contactSub: "Jangan biarkan brand Anda tenggelam dalam lautan visual AI generik yang murahan. Hubungi saya untuk konsultasi workflow deterministik.",
    footerLocated: "LOCATED IN SATUI, SOUTH KALIMANTAN, INDONESIA"
  },
  en: {
    heroSub: "CREATIVE PORTFOLIO 2026",
    heroRole: "S.KOM / BNSP SYSTEMS ANALYST",
    heroCert: "IBM GRANITE AI CERTIFIED",
    heroCoord: "[COORD] 3.65 GPA",
    heroSys: "[SYS] DETERMINISTIC",
    heroBio: "I do not generate cheap, low-resolution pixel slop. As a Computer Science graduate and BNSP certified Systems Analyst, I engineer the Humanized Ads Engine — a deterministic prompt architecture that locks model consistency, expels plastic skin layers, and coordinates fashion and skincare photoshoot campaigns with strict mathematical precision.",
    deckBtn: "PORTFOLIO DECK",
    simBtn: "BUDGET SIMULATOR",
    featuredWork: "FEATURED WORK",
    editorialDeck: "EDITORIAL DECK.",
    featuredDesc: "Real case studies of premium visual campaigns structured by folder. Click on any campaign deck to dynamically load its contents.",
    filterAll: "ALL DECK",
    filterFashion: "FASHION & APPAREL",
    filterSkincare: "SKINCARE & PRODUCT",
    filterAiPhotoshoot: "AI PHOTOSHOOT",
    imagesCount: "Images",
    viewConcept: "VIEW CONCEPT",
    viewGallery: "VIEW GALLERY",
    conceptLabel: "THOUGHT PROCESS",
    caseStudy1Title: "Luxury Fashion Campaign — Brand I",
    caseStudy1Desc: "Premium fashion photoshoot session with Identity-Locking & Deterministic Pose Reference techniques. 29+ consistent frames.",
    caseStudy1Concept: "Concept: <b>Premium Asymmetry</b>. I lock the model's skeletal structure across every frame using deterministic pose references, ensuring organic camera angles as a real photographer would achieve. Lighting is calculated from 35mm analog CMOS distribution formulas to eliminate the plastic glow of AI slop.",
    caseStudy2Title: "Skincare Hero Campaign",
    caseStudy2Desc: "Skincare product campaign with layer isolation of packaging + model, reproducing realistic skin textures without AI slop.",
    caseStudy2Concept: "Concept: <b>Product Integrity Isolation</b>. Each frame renders two separate layers: model and packaging label. The result is composited manually using masking to prevent texture contamination between human skin and plastic packaging.",
    caseStudy3Title: "Typographic Layout Series — Brand III",
    caseStudy3Desc: "Typography-based editorial series with minimal composition campaign for the third brand identity.",
    caseStudy3Concept: "Concept: <b>Swiss Grid Brutalism</b>. Each composition frame uses a strict 12-column Swiss grid system. Typography is rendered separately from the model image and integrated in post-production with mathematical alignment.",
    caseStudy4Title: "Skincare Realism — Human Skin Detail",
    caseStudy4Desc: "Case study of human skin texture detail using analog lighting for premium skincare campaigns.",
    caseStudy4Concept: "Concept: <b>Analog Skin Rendering</b>. Film grain and lateral studio strip-light are digitally reproduced using CMOS sensor formulas. No automatic beauty filters — full pore texture is preserved for skincare education content.",
    caseStudy5Title: "Motion Photography — Brand Devetesion II",
    caseStudy5Desc: "Sports campaign using deterministic motion blur and dynamic velocity-vector-based composition.",
    caseStudy5Concept: "Concept: <b>Kinetic Determinism</b>. Motion blur is controlled using a velocity vector locked at 24°. Model position is seeded from a standard athletic pose database so every frame reads as one cohesive photographic series.",
    caseStudy6Title: "Macro Fabric Texture — Devetesion Brand II",
    caseStudy6Desc: "Macro fabric fiber detail for apparel brand campaign, showcasing material quality.",
    caseStudy6Concept: "Concept: <b>Material Honesty</b>. Every fabric fiber is rendered at high resolution without artificial enhancement. Macro ring-light is reproduced from real textile studio references to honestly portray material quality.",
    caseStudy7Title: "High-Fashion Editorial — Brand V (66 Frames)",
    caseStudy7Desc: "The largest male high-fashion editorial series — 66 frames with 100% character consistency via Identity-Locking pipeline.",
    caseStudy7Concept: "Concept: <b>Identity-Locked Serialization</b>. A multi-stage embedding pipeline locks 23 facial reference points across all 66 frames. This is the most complete technical demonstration of the Humanized Ads Engine: one character, sixty-six expressions, zero inconsistencies.",
    caseStudy8Title: "Commercial Product Advertising — Skincare",
    caseStudy8Desc: "Commercial advertising campaign for a skincare product with professional ad poses and premium composition.",
    caseStudy8Concept: "Concept: <b>Commercial Realism Engine</b>. Model pose is calibrated from a 4,200-frame database of real beauty product advertisements. Every camera angle is engineered to maximize product visibility while maintaining anatomically correct human proportions.",
    propsTitle: "PROPRIETARY ARCHITECTURE",
    propsHeading: "HUMANIZED ADS ENGINE",
    propsSub: "Why does generic AI visual art look like cheap plastic trash? Because default prompts rely on vocabulary slop. My engine completely overhauls image engineering workflows:",
    prop1Title: "Deterministic Pose Reference",
    prop1Desc: "Locks the anatomical skeletal joints to prevent anomalous model poses, preserving pure organic real-world camera angles and physical layouts.",
    prop2Title: "Analog Light Mapping",
    prop2Desc: "Calculates lighting distribution based on real CMOS sensors and 35mm analog film, reproducing natural grain while expelling plastic digital shine.",
    prop3Title: "Identity-Locking Workflow",
    prop3Desc: "A multi-stage embedding pipeline locking model features across multiple setups. Bone structures, jaws, and gaze vector remain 100% consistent.",
    prop4Title: "Product Integrity Isolation",
    prop4Desc: "Separates model rendering layers from skincare label parameters or apparel textures using advanced masking layers before final synthesis.",
    pricingTitle: "CAMPAIGN BUDGET SIMULATOR",
    pricingSub: "Based on transparent Upwork/Fiverr consulting rates. Slider tracks stretch and bounce elastically at boundaries.",
    pricingConcepts: "Number of Creative Concepts",
    pricingOutputs: "Number of Image Outputs",
    pricingIdLock: "Identity Locking Layer Integration",
    pricingRights: "Commercial Use & High-Res Source",
    priceTag: "IDR",
    priceBtn: "SECURE THIS DECK KAMPANYE",
    aboutSub: "PROFESSIONAL ROADMAP",
    aboutTitle: "S.KOM & SYSTEMS ANALYST",
    aboutBio: "I integrate rigorous software systems analysis methodologies with high-end creative generative art workflows, from localized school relational databases to IBM certified pipelines.",
    skillsSys: "Systems & Automation",
    skillsCreative: "Creative Technology",
    contactHeading: "LAUNCH YOUR BRAND CAMPAIGN NOW.",
    contactSub: "Prevent your commercial marketing from drowning in stock plastic AI slop. Hire me to deploy natural, deterministic workflows.",
    footerLocated: "LOCATED IN SATUI, SOUTH KALIMANTAN, INDONESIA"
  }
};

// Static list of all 14 campaigns representing the requested project folders (skincare, photoshoot brand 1-8, ai photoshoot 1-4)
const campaignsList = [
  {
    id: 1,
    folder: "photoshoot brand",
    titleKey: "caseStudy1Title",
    descKey: "caseStudy1Desc",
    conceptKey: "caseStudy1Concept",
    defaultImg: "/photoshoot brand/Luxury_fashion_campaign_photography_202605121711.jpeg",
    category: "fashion",
    gridSpan: "md:col-span-2 md:row-span-2",
    imagesCount: "29+"
  },
  {
    id: 2,
    folder: "skincare",
    titleKey: "caseStudy2Title",
    descKey: "caseStudy2Desc",
    conceptKey: "caseStudy2Concept",
    defaultImg: "/skincare/skincare_hero_banner.jpg",
    category: "skincare",
    gridSpan: "md:col-span-2 md:row-span-1",
    imagesCount: "18+"
  },
  {
    id: 3,
    folder: "photoshoot brand3",
    titleKey: "caseStudy3Title",
    descKey: "caseStudy3Desc",
    conceptKey: "caseStudy3Concept",
    defaultImg: "/photoshoot brand3/Devetesion_campaign_scene_lock_202605121721_3.jpeg",
    category: "fashion",
    gridSpan: "md:col-span-1 md:row-span-1",
    imagesCount: "29+"
  },
  {
    id: 4,
    folder: "skincare",
    titleKey: "caseStudy4Title",
    descKey: "caseStudy4Desc",
    conceptKey: "caseStudy4Concept",
    defaultImg: "/skincare/Woman_interacting_with_product_202605121657_2.jpeg",
    category: "skincare",
    gridSpan: "md:col-span-1 md:row-span-2",
    imagesCount: "18+"
  },
  {
    id: 5,
    folder: "photoshoot brand2",
    titleKey: "caseStudy5Title",
    descKey: "caseStudy5Desc",
    conceptKey: "caseStudy5Concept",
    defaultImg: "/photoshoot brand2/Devetesion_campaign_running_model_202605121721.jpeg",
    category: "fashion",
    gridSpan: "md:col-span-2 md:row-span-1",
    imagesCount: "19+"
  },
  {
    id: 6,
    folder: "photoshoot brand4",
    title: "Kinetic Fashion — Brand IV",
    desc: "Deterministic pose and angle variations using structural joint locking workflows.",
    concept: "Concept: <b>Skeletal Joint Calibration</b>. Using structural poses, I achieved full character replication across 18 frame changes, demonstrating maximum accuracy in apparel visual rendering.",
    defaultImg: "/photoshoot brand4/Devetesion_campaign_scene_lock_202605121722_6.jpeg",
    category: "fashion",
    gridSpan: "md:col-span-1 md:row-span-1",
    imagesCount: "18+"
  },
  {
    id: 7,
    folder: "photoshoot brand5",
    titleKey: "caseStudy7Title",
    descKey: "caseStudy7Desc",
    conceptKey: "caseStudy7Concept",
    defaultImg: "/photoshoot brand5/High-fashion_editorial_photograph_202605121729.jpeg",
    category: "fashion",
    gridSpan: "md:col-span-2 md:row-span-2",
    imagesCount: "66+"
  },
  {
    id: 8,
    folder: "photoshoot brand6",
    title: "Twisted Silhouette Series — Brand VI",
    desc: "High contrast black and white lighting setup with skeletal structural model consistency.",
    concept: "Concept: <b>High Contrast Chiaroscuro</b>. I calculated the shadow falloff from studio softboxes to preserve model identity and drape detail in pure black and white styling.",
    defaultImg: "/photoshoot brand6/Model_in_twisted_pose_202605121730.jpeg",
    category: "fashion",
    gridSpan: "md:col-span-1 md:row-span-1",
    imagesCount: "12+"
  },
  {
    id: 9,
    folder: "photoshoot brand7",
    title: "Museum Steps Editorial — Brand VII",
    desc: "Outdoor daylight ambient mapping reproducing realistic sunlight shadow angles.",
    concept: "Concept: <b>Ambient Sun Ray Synthesis</b>. Shadow angles were calculated based on the latitude and longitude of the shoot to ensure standard photorealistic shadows on stairs.",
    defaultImg: "/photoshoot brand7/Model_seated_on_museum_steps_202605121732.jpeg",
    category: "fashion",
    gridSpan: "md:col-span-2 md:row-span-1",
    imagesCount: "15+"
  },
  {
    id: 10,
    folder: "photoshoot brand8",
    title: "Brutalist Concrete Backdrop — Brand VIII",
    desc: "Apparel campaign in a cold architectural setting with heavy concrete textures.",
    concept: "Concept: <b>Material Contrast</b>. Highlighting soft knit fabric fibers against a cold concrete surface, rendering dual-material properties seamlessly.",
    defaultImg: "/photoshoot brand8/Model_leaning_against_concrete_202605121732_2.jpeg",
    category: "fashion",
    gridSpan: "md:col-span-1 md:row-span-1",
    imagesCount: "14+"
  },
  {
    id: 11,
    folder: "ai photoshoot1",
    title: "Deterministic AI Synthesis — Campaign I",
    desc: "Zero AI slop facial and identity locking showcase using advanced multi-stage synthesis.",
    concept: "Concept: <b>Multi-Stage Embedding Lock</b>. I engineered an identity-locking network that maintains facial features across dramatic outfit changes, achieving 100% slop-free rendering.",
    defaultImg: "/ai photoshoot1/Image_system_identity_and_scene_202605261435.jpeg",
    category: "ai-photoshoot",
    gridSpan: "md:col-span-2 md:row-span-1",
    imagesCount: "16+"
  },
  {
    id: 12,
    folder: "ai photoshoot2",
    title: "Studio Lighting Replication — Campaign II",
    desc: "AI-generated campaign replicating professional studio lighting setups mathematically.",
    concept: "Concept: <b>Lumen Distribution Map</b>. Recreating complex ring lights and softboxes digitally to guarantee realistic highlights without the oily AI glow.",
    defaultImg: "/ai photoshoot2/Image_system_identity_and_scene_202605261435.jpeg",
    category: "ai-photoshoot",
    gridSpan: "md:col-span-1 md:row-span-2",
    imagesCount: "12+"
  },
  {
    id: 13,
    folder: "ai photoshoot3",
    title: "Complex Pose Serialization — Campaign III",
    desc: "Action poses and multi-character consistency demonstration using structural joint seeds.",
    concept: "Concept: <b>Kinetic Skeleton Mapping</b>. Hand and body skeletal points are manually mapped and locked to ensure flawless anatomy during active poses.",
    defaultImg: "/ai photoshoot3/Subject_identity_and_scene_lock_202605261436.jpeg",
    category: "ai-photoshoot",
    gridSpan: "md:col-span-2 md:row-span-1",
    imagesCount: "14+"
  },
  {
    id: 14,
    folder: "ai photoshoot4",
    title: "Commercial Ads Synthesizer — Campaign IV",
    desc: "High-density product visual catalog showcasing complex multi-image synthesis outputs.",
    concept: "Concept: <b>Product Layer Mask Assembly</b>. Synthesizing commercial skincare and apparel templates into finished high-converting banner designs.",
    defaultImg: "/ai photoshoot4/You_have_received_multiple_images._202605261437.jpeg",
    category: "ai-photoshoot",
    gridSpan: "md:col-span-1 md:row-span-1",
    imagesCount: "20+"
  }
];

export default function App() {
  const [locale, setLocale] = useState('id');
  const t = translations[locale];

  // Hash-based Page Routing State
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash;
    if (hash === '#campaigns') return 'campaigns';
    if (hash === '#engine') return 'engine';
    if (hash === '#calculator') return 'calculator';
    if (hash === '#bio') return 'bio';
    return 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#campaigns') setCurrentRoute('campaigns');
      else if (hash === '#engine') setCurrentRoute('engine');
      else if (hash === '#calculator') setCurrentRoute('calculator');
      else if (hash === '#bio') setCurrentRoute('bio');
      else setCurrentRoute('home');
      
      // Instantly scroll to top to prevent transition visual artifacts
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // UI Interactive States
  const [bentoFilter, setBentoFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [xcodeTab, setXcodeTab] = useState('2024-2025');
  const [controlDeckActive, setControlDeckActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Awwwards: scroll progress
  const [scrollProgress, setScrollProgress] = useState(0);

  // Konami easter egg
  const [easterActive, setEasterActive] = useState(false);
  const [easterCoins, setEasterCoins] = useState([]);
  const konamiRef = useRef([]);
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

  // Dynamic Stylings variables
  const [radiusValue, setRadiusValue] = useState(28);
  const [depthValue, setDepthValue] = useState(6);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  // Budget Calculator variables
  const [conceptsCount, setConceptsCount] = useState(1);
  const [outputsCount, setOutputsCount] = useState(3);
  const [identityLocked, setIdentityLocked] = useState(false);
  const [commercialRights, setCommercialRights] = useState(true);
  const [calculatedPrice, setCalculatedPrice] = useState(490000);

  // Touch Swipe & Particle Ripple states
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [ripples, setRipples] = useState([]);

  // Refs for tracking DOM elements
  const webglContainer = useRef(null);
  const cursorRef = useRef(null);
  const cursorTextRef = useRef(null);
  const xcodeContentRef = useRef(null);
  const heroTitleRef = useRef(null);

  // Spatial Audio Node state
  const audioCtxRef = useRef(null);

  // --------------------------------------------------------------------------
  // 1. SPATIAL AUDIO GENERATOR (WEB AUDIO API SYNTHESIS)
  // --------------------------------------------------------------------------
  const playSpatialClick = (e) => {
    try {
      // Lazily initialize audio context on user click (browser block restriction)
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

      osc.type = 'triangle';
      // High legibility mechanical click frequency envelope
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      // Panning balance calculations mapping pixel client X to stereo channels (-1.0 to 1.0)
      if (panner) {
        const panValue = (e.clientX / window.innerWidth) * 2 - 1;
        panner.pan.setValueAtTime(Math.max(-1, Math.min(1, panValue)), ctx.currentTime);
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(ctx.destination);
      } else {
        osc.connect(gain);
        gain.connect(ctx.destination);
      }

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (err) {
      // Fail silently to prevent interrupting UI
    }
  };

  // --------------------------------------------------------------------------
  // 2. MAGNETIC CURSOR & TACTILE HOVER ENGINE
  // --------------------------------------------------------------------------
  useEffect(() => {
    const cursor = cursorRef.current;
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    const lerpFactor = 0.12;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    const updateCursor = () => {
      // Linear Interpolation: Current += (Target - Current) * Ease
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * lerpFactor;
      cursorY += dy * lerpFactor;

      if (cursor) {
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
      }
      requestAnimationFrame(updateCursor);
    };
    const animId = requestAnimationFrame(updateCursor);

    // Clicking pulse effects
    const onMouseDown = () => cursor?.classList.add('click-pulse');
    const onMouseUp = () => cursor?.classList.remove('click-pulse');

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  // --------------------------------------------------------------------------
  // 2. SCROLL PROGRESS + KONAMI (Awwwards + design-spells)
  // --------------------------------------------------------------------------
  useEffect(() => {
    // Scroll progress bar
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Konami easter egg (design-spells)
    const onKey = (e) => {
      konamiRef.current = [...konamiRef.current, e.key].slice(-10);
      if (konamiRef.current.join(',') === KONAMI.join(',')) {
        setEasterActive(true);
        const coins = Array.from({length: 30}, (_, i) => ({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 1.5,
          emoji: ['🪙','💛','⭐','🏆','✨'][Math.floor(Math.random()*5)]
        }));
        setEasterCoins(coins);
        setTimeout(() => { setEasterActive(false); setEasterCoins([]); }, 4000);
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  // Section entrance observer - reactive to page route changes
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    
    // Tiny delay to ensure React has fully committed the DOM change
    const timer = setTimeout(() => {
      document.querySelectorAll('.section-animate').forEach(el => io.observe(el));
    }, 50);

    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, [currentRoute]);

  // Hero title text-reveal on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('.text-reveal-line').forEach((el, i) => {
        setTimeout(() => el.classList.add('revealed'), i * 80);
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // --------------------------------------------------------------------------
  // SCROLL DETECTION (FLOATING NAVBAR CAPSULE INJECTOR)
  // --------------------------------------------------------------------------
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --------------------------------------------------------------------------
  // PREMIUM MOTION DESIGN SYSTEM EFFECTS (animation-principles + design-spells)
  // --------------------------------------------------------------------------

  // 1. Click Ripple particle ripple effect
  useEffect(() => {
    const onWindowClick = (e) => {
      const id = Date.now() + Math.random();
      const newRipple = {
        id,
        x: e.clientX,
        y: e.clientY
      };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    };

    window.addEventListener('click', onWindowClick);
    return () => window.removeEventListener('click', onWindowClick);
  }, []);

  // 2. Reusable Magnetic button pull effect
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const magneticButtons = document.querySelectorAll('.contact-btn, .primary-btn, .secondary-btn, .filter-btn');
    const cleanups = [];

    magneticButtons.forEach((btn) => {
      const onBtnMouseMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const btnX = rect.left + rect.width / 2;
        const btnY = rect.top + rect.height / 2;
        
        const dx = e.clientX - btnX;
        const dy = e.clientY - btnY;
        
        const pullX = dx * 0.35;
        const pullY = dy * 0.35;
        
        gsap.to(btn, {
          x: Math.max(-20, Math.min(20, pullX)),
          y: Math.max(-12, Math.min(12, pullY)),
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      };
      
      const onBtnMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'elastic.out(1.2, 0.4)',
          overwrite: 'auto'
        });
      };
      
      btn.addEventListener('mousemove', onBtnMouseMove);
      btn.addEventListener('mouseleave', onBtnMouseLeave);

      cleanups.push(() => {
        btn.removeEventListener('mousemove', onBtnMouseMove);
        btn.removeEventListener('mouseleave', onBtnMouseLeave);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [currentRoute, bentoFilter]);

  // 3. Staggered Bento Filter sequence entrance
  useEffect(() => {
    gsap.fromTo('.bento-item-stagger',
      { opacity: 0, y: 24, scale: 0.97 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        stagger: 0.04, 
        duration: 0.6, 
        ease: 'power3.out',
        overwrite: 'auto'
      }
    );
  }, [bentoFilter, currentRoute]);

  // 4. Staggered Mobile Menu links slide-in
  useEffect(() => {
    if (mobileMenuOpen) {
      gsap.fromTo('.mobile-menu-item',
        { x: -30, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          stagger: 0.08, 
          duration: 0.5, 
          ease: 'power3.out',
          delay: 0.2
        }
      );
    }
  }, [mobileMenuOpen]);

  // --------------------------------------------------------------------------
  // DECALS PROXIMITY MOUSE REPULSION ENGINE (ELASTIC SPRING PHYSICAL AVOIDANCE)
  // --------------------------------------------------------------------------
  useEffect(() => {
    const decals = document.querySelectorAll('.sticker-decal');
    if (!decals || decals.length === 0) return;

    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    const threshold = 180; // proximity reach
    const maxPush = 90;   // pixels to repel

    const updateDecalsProximity = () => {
      decals.forEach((decal) => {
        const rect = decal.getBoundingClientRect();
        const decalX = rect.left + rect.width / 2;
        const decalY = rect.top + rect.height / 2;

        const dx = decalX - mouseX;
        const dy = decalY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < threshold && dist > 0) {
          const force = (threshold - dist) / threshold;
          const targetX = (dx / dist) * force * maxPush;
          const targetY = (dy / dist) * force * maxPush;

          gsap.to(decal, {
            x: targetX,
            y: targetY,
            duration: 0.5,
            overwrite: 'auto',
            ease: 'power3.out'
          });
        } else {
          gsap.to(decal, {
            x: 0,
            y: 0,
            duration: 0.8,
            overwrite: 'auto',
            ease: 'elastic.out(1.2, 0.5)'
          });
        }
      });
      requestAnimationFrame(updateDecalsProximity);
    };

    const animId = requestAnimationFrame(updateDecalsProximity);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Cursor Text hovering binders
  const handleCursorHover = (enter, labelText = 'SELECT') => {
    const cursor = cursorRef.current;
    const cursorText = cursorTextRef.current;
    if (!cursor) return;

    if (enter) {
      cursor.classList.add('hovering');
      if (cursorText) cursorText.textContent = labelText;
    } else {
      cursor.classList.remove('hovering');
    }
  };

  // --------------------------------------------------------------------------
  // 3. THREE.JS WEBGL RENDER LOOP (AMBIENT 3D DIFFUSE TEXTURE BACKGROUND)
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (!webglContainer.current) return;

    const container = webglContainer.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene definitions
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Matte Clay-like soft material capturing highlights beautifully
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 12,
      flatShading: false
    });

    // Create 3D meshes representing Apple low-poly clay geometries
    const torusGeometry = new THREE.TorusGeometry(3, 1, 16, 100);
    const torusMesh = new THREE.Mesh(torusGeometry, material);
    torusMesh.position.set(-6, 4, -5);
    scene.add(torusMesh);

    const sphereGeometry = new THREE.SphereGeometry(2.2, 32, 32);
    const sphereMesh = new THREE.Mesh(sphereGeometry, material);
    sphereMesh.position.set(7, -3, -4);
    scene.add(sphereMesh);

    const capsuleGeometry = new THREE.CapsuleGeometry(1.2, 3.5, 8, 32);
    const capsuleMesh = new THREE.Mesh(capsuleGeometry, material);
    capsuleMesh.position.set(0, 0, -8);
    capsuleMesh.rotation.set(0.5, 0.8, 0);
    scene.add(capsuleMesh);

    // Illuminating diffuse tracking spotlights
    const ambientLight = new THREE.AmbientLight(0xfcfbf9, 1.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x0066ff, 3.5, 50);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    const orangeSpotLight = new THREE.PointLight(0xff5500, 2.5, 40);
    orangeSpotLight.position.set(10, 10, 5);
    scene.add(orangeSpotLight);

    // Interactive mouse positioning trackers
    let targetX = 0, targetY = 0;
    const onSceneMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth) * 20 - 10;
      targetY = -(e.clientY / window.innerHeight) * 20 + 10;
    };
    window.addEventListener('mousemove', onSceneMouseMove);

    // Intersection observer freezing performance clock optimizations
    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(container);

    // requestAnimationFrame render cycle loop
    let clock = new THREE.Clock();
    let frameId;

    const renderLoop = () => {
      frameId = requestAnimationFrame(renderLoop);

      // CPU clock sleep optimization when invisible or page hidden
      if (!isVisible || document.visibilityState === 'hidden') return;

      const elapsedTime = clock.getElapsedTime();

      // Slow orbital rotations multiplied by Control Panel speed bindings
      const currentSpeed = speedMultiplier;
      torusMesh.rotation.x = elapsedTime * 0.15 * currentSpeed;
      torusMesh.rotation.y = elapsedTime * 0.2 * currentSpeed;

      sphereMesh.position.y = -3 + Math.sin(elapsedTime * 0.8) * 0.5 * currentSpeed;

      capsuleMesh.rotation.z = elapsedTime * 0.1 * currentSpeed;
      capsuleMesh.position.x = Math.cos(elapsedTime * 0.5) * 1.5;

      // Spotlight coordinates catching cursor transitions smoothly
      pointLight.position.x += (targetX - pointLight.position.x) * 0.05;
      pointLight.position.y += (targetY - pointLight.position.y) * 0.05;

      renderer.render(scene, camera);
    };
    renderLoop();

    // Responsive window resizing hooks
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onSceneMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      // Garbage collection freeing graphic textures
      torusGeometry.dispose();
      sphereGeometry.dispose();
      capsuleGeometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [speedMultiplier]);

  // --------------------------------------------------------------------------
  // 4. LENIS SMOOTH SCROLL INTEGRATION & MOTION REVEALS
  // --------------------------------------------------------------------------
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth lerp inertia
      smoothWheel: true,
      infinite: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Staggered GSAP splits entrance animations on loading
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 0.8 } });
    
    tl.fromTo('.hero-bg-text', 
      { opacity: 0, scale: 0.9, y: 50 },
      { opacity: 0.04, scale: 1, y: 0, duration: 1.2, delay: 0.1 }
    )
    .fromTo('.glass-hero-bento',
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.9 },
      '-=0.8'
    )
    .fromTo('.bento-item-stagger',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.06 },
      '-=0.5'
    );

    return () => {
      lenis.destroy();
    };
  }, []);

  // --------------------------------------------------------------------------
  // 5. iOS SMART STACK COMPONENT LOGIC
  // --------------------------------------------------------------------------
  const [activeStackIndex, setActiveStackIndex] = useState(0);
  const stackItems = [
    { num: "01", title: t.prop1Title, desc: t.prop1Desc },
    { num: "02", title: t.prop2Title, desc: t.prop2Desc },
    { num: "03", title: t.prop3Title, desc: t.prop3Desc },
    { num: "04", title: t.prop4Title, desc: t.prop4Desc }
  ];

  const handleStackSwipe = () => {
    playSpatialClick({ clientX: window.innerWidth / 2 });
    
    const tl = gsap.timeline();
    
    tl.to('.stack-content-panel', {
      x: 140,
      rotateY: 25,
      rotateZ: 6,
      opacity: 0,
      scale: 0.95,
      transformPerspective: 1000,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setActiveStackIndex((prev) => (prev + 1) % stackItems.length);
      }
    })
    .fromTo('.stack-content-panel',
      { x: -140, rotateY: -25, rotateZ: -6, opacity: 0, scale: 0.9, transformPerspective: 1000 },
      { x: 0, rotateY: 0, rotateZ: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'elastic.out(1.1, 0.45)' }
    );
  };

  // --------------------------------------------------------------------------
  // 6. XCODE TABBED KARIR TIMELINE LOGIC
  // --------------------------------------------------------------------------
  const xcodeTimelines = {
    '2024-2025': {
      year: "2024 - 2025",
      title: "IT & Database Administrator",
      org: "SMKS Muhammadiyah Satui",
      desc: "Mengkonsolidasikan database siswa nasional (Dapodik), merancang sistem pelacakan kehadiran QR-code berbasis PHP/MySQL, dan memotong beban kerja pelaporan mingguan hingga 40% menggunakan Google Apps Script."
    },
    '2024 BPS': {
      year: "2024",
      title: "Surveyor Data Demografi",
      org: "Badan Pusat Statistik (BPS)",
      desc: "Mengumpulkan dan memverifikasi log koordinat spasial pemukiman penduduk, menjamin integritas validitas data sebelum ditransfer ke dalam database relasional pusat."
    },
    '2023 Univ': {
      year: "2023",
      title: "Sarjana Ilmu Komputer (S.Kom)",
      org: "Universitas Islam Kalimantan MAB",
      desc: "Lulus Sarjana Komputer (S.Kom) dengan IPK 3.65 / 4.00. Fokus riset pada rekayasa sistem pemesanan makanan berbasis web terintegrasi basis data relasional."
    }
  };

  const handleTabSwitch = (key) => {
    if (key === xcodeTab) return;
    playSpatialClick({ clientX: window.innerWidth / 2 });

    const timelineContainer = xcodeContentRef.current;
    
    // Smooth cinematic slide transitions
    gsap.to(timelineContainer, {
      opacity: 0,
      x: -40,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setXcodeTab(key);
        gsap.fromTo(timelineContainer,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' }
        );
      }
    });
  };

  // --------------------------------------------------------------------------
  // 7. APPLE CONTROL CENTER BUDGET PRICING CALCULATOR
  // --------------------------------------------------------------------------
  const runCalculatorSync = (concepts = conceptsCount, outputs = outputsCount, locked = identityLocked, rights = commercialRights) => {
    let price = 250000;
    price += (concepts * 180000);
    price += (outputs * 110000);
    if (locked) price += 600000;
    if (rights) price += 250000;

    // Smooth integer roll animation
    const calcOutPanel = document.getElementById('calc-price-output');
    if (calcOutPanel) {
      gsap.fromTo(calcOutPanel,
        { scale: 0.98 },
        { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' }
      );
    }
    setCalculatedPrice(price);
  };

  // --------------------------------------------------------------------------
  // 8. iOS RUBBER-BANDING INTERACTIVE DRAG SLIDER
  // --------------------------------------------------------------------------
  const ConceptSlider = () => {
    const trackRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragX, setDragX] = useState(0);

    // Convert concepts range (1 to 5) to slider width percentage
    const percent = ((conceptsCount - 1) / 4) * 100;

    const handleStart = (e) => {
      setIsDragging(true);
      handleDrag(e);
    };

    const handleDrag = (e) => {
      if (!isDragging && e.type !== 'pointerdown') return;
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const rawX = clientX - rect.left;
      
      // Rubber-banding boundaries overrun mathematics: f(x) = (x * d) / (x + d)
      if (rawX < 0) {
        const excess = Math.abs(rawX);
        const stretch = -(excess * 40) / (excess + 40); // bounds limit
        setDragX(stretch);
      } else if (rawX > rect.width) {
        const excess = rawX - rect.width;
        const stretch = rect.width + (excess * 40) / (excess + 40);
        setDragX(stretch);
      } else {
        setDragX(rawX);
        const calculatedFraction = rawX / rect.width;
        const mappedValue = Math.round(1 + calculatedFraction * 4);
        const clampedVal = Math.max(1, Math.min(5, mappedValue));
        if (clampedVal !== conceptsCount) {
          setConceptsCount(clampedVal);
          runCalculatorSync(clampedVal, outputsCount, identityLocked, commercialRights);
        }
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
      // Spring bounce lock back to grid coordinates
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const currentPercentFraction = (conceptsCount - 1) / 4;
      const targetBound = currentPercentFraction * rect.width;

      gsap.to(trackRef.current, {
        duration: 0.4,
        ease: 'elastic.out(1.2, 0.4)',
        onUpdate: function() {
          setDragX(targetBound);
        }
      });
    };

    const currentX = isDragging ? dragX : (percent / 100) * (trackRef.current?.clientWidth || 300);

    return (
      <div className="mb-6 select-none">
        <span className="block mb-2 text-sm font-semibold text-gray-700 font-body">
          {t.pricingConcepts}: <strong className="text-blue-600 font-mono text-base">{conceptsCount}</strong>
        </span>
        <div 
          ref={trackRef}
          className="cc-slider-track relative h-12 bg-gray-200 rounded-full overflow-hidden"
          onPointerDown={handleStart}
          onPointerMove={handleDrag}
          onPointerUp={handleEnd}
          onPointerLeave={handleEnd}
        >
          <div 
            className="h-full bg-blue-600 rounded-r-none transition-all duration-75"
            style={{ width: `${Math.max(0, Math.min(100, (currentX / (trackRef.current?.clientWidth || 1)) * 100))}%` }}
          />
          <div className="cc-slider-label">
            <span>⚙️ {t.pricingConcepts}</span>
          </div>
          <div className="cc-slider-value">
            <span>MAX 5</span>
          </div>
        </div>
      </div>
    );
  };

  const OutputSlider = () => {
    const trackRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragX, setDragX] = useState(0);

    const percent = ((outputsCount - 1) / 29) * 100;

    const handleStart = (e) => {
      setIsDragging(true);
      handleDrag(e);
    };

    const handleDrag = (e) => {
      if (!isDragging && e.type !== 'pointerdown') return;
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const rawX = clientX - rect.left;

      if (rawX < 0) {
        const excess = Math.abs(rawX);
        const stretch = -(excess * 40) / (excess + 40);
        setDragX(stretch);
      } else if (rawX > rect.width) {
        const excess = rawX - rect.width;
        const stretch = rect.width + (excess * 40) / (excess + 40);
        setDragX(stretch);
      } else {
        setDragX(rawX);
        const calculatedFraction = rawX / rect.width;
        const mappedValue = Math.round(1 + calculatedFraction * 29);
        const clampedVal = Math.max(1, Math.min(30, mappedValue));
        if (clampedVal !== outputsCount) {
          setOutputsCount(clampedVal);
          runCalculatorSync(conceptsCount, clampedVal, identityLocked, commercialRights);
        }
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const currentPercentFraction = (outputsCount - 1) / 29;
      const targetBound = currentPercentFraction * rect.width;

      gsap.to(trackRef.current, {
        duration: 0.4,
        ease: 'elastic.out(1.2, 0.4)',
        onUpdate: function() {
          setDragX(targetBound);
        }
      });
    };

    const currentX = isDragging ? dragX : (percent / 100) * (trackRef.current?.clientWidth || 300);

    return (
      <div className="mb-6 select-none">
        <span className="block mb-2 text-sm font-semibold text-gray-700 font-body">
          {t.pricingOutputs}: <strong className="text-orange-600 font-mono text-base">{outputsCount}</strong>
        </span>
        <div 
          ref={trackRef}
          className="cc-slider-track relative h-12 bg-gray-200 rounded-full overflow-hidden"
          onPointerDown={handleStart}
          onPointerMove={handleDrag}
          onPointerUp={handleEnd}
          onPointerLeave={handleEnd}
        >
          <div 
            className="h-full bg-orange-600 rounded-r-none transition-all duration-75"
            style={{ width: `${Math.max(0, Math.min(100, (currentX / (trackRef.current?.clientWidth || 1)) * 100))}%` }}
          />
          <div className="cc-slider-label">
            <span>📷 {t.pricingOutputs}</span>
          </div>
          <div className="cc-slider-value">
            <span>MAX 30</span>
          </div>
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // 9. DYNAMIC MULTI-IMAGE FOLDER LIGHTBOX ENGINE
  // --------------------------------------------------------------------------
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxTitle, setLightboxTitle] = useState('');
  const [lightboxDesc, setLightboxDesc] = useState('');
  const [lightboxConcept, setLightboxConcept] = useState('');
  const [lightboxTab, setLightboxTab] = useState('gallery'); // 'gallery' | 'concept'

  const openBentoGallery = async (folder, title, desc, defaultSrc, concept) => {
    playSpatialClick({ clientX: window.innerWidth / 2 });
    setLightboxTitle(title);
    setLightboxDesc(desc);
    setLightboxConcept(concept || '');
    setLightboxTab('gallery');

    try {
      const response = await fetch(`/api/gallery/${encodeURIComponent(folder)}`);
      const data = await response.json();
      if (data.images && data.images.length > 0) {
        setLightboxImages(data.images);
      } else {
        setLightboxImages([defaultSrc]);
      }
    } catch (err) {
      setLightboxImages([defaultSrc]);
    }
    setActiveImageIndex(0);
    setLightboxOpen(true);

    // Expand staggered animations on click
    setTimeout(() => {
      gsap.fromTo('.lightbox-frame-panel',
        { scale: 0.92, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.2)' }
      );
    }, 20);
  };

  const handleLightboxNav = (direction) => {
    playSpatialClick({ clientX: direction > 0 ? window.innerWidth - 100 : 100 });
    const count = lightboxImages.length;
    if (count <= 1) return;
    setActiveImageIndex((prev) => (prev + direction + count) % count);
  };

  // Touch Swipe handlers for mobile lightbox
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      handleLightboxNav(1);
    } else if (diff < -50) {
      handleLightboxNav(-1);
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden w-full max-w-full bg-bgCream">
      
      {/* SCROLL PROGRESS BAR (Awwwards signature) */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* KONAMI EASTER EGG — GOLDEN RAIN (design-spells) */}
      {easterActive && (
        <div className="easter-overlay" aria-hidden="true">
          {easterCoins.map(c => (
            <span
              key={c.id}
              className="easter-coin"
              style={{
                left: `${c.left}%`,
                animationDelay: `${c.delay}s`,
                top: '-30px'
              }}
            >
              {c.emoji}
            </span>
          ))}
        </div>
      )}

      {/* 2. PREMIUM TACTILE CLICK RIPPLES (design-spells) */}
      <div className="pointer-events-none fixed inset-0 z-[99998] overflow-hidden">
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="particle-ripple-ring"
            style={{
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
            }}
          />
        ))}
      </div>



      {/* 2. THREE.JS WEBGL CLAY MATERIAL CANVAS */}
      <div 
        ref={webglContainer} 
        className="micro-grid-bg"
      />




      {/* ==========================================================================
         4. HEADER NAVIGATION
         ========================================================================== */}
      <header 
        id="header-nav" 
        className={`nav-bar flex flex-row justify-between items-center w-full transition-all duration-300 z-[2000] ${isScrolled ? 'scrolled' : ''}`}
      >
        <div className="nav-brand">
          <a 
            href="#home" 
            className="logo-link flex items-baseline gap-2 cursor-none select-none" 
            onClick={playSpatialClick}
          >
            <span className="logo-text font-header tracking-tight text-2xl text-[#1D1D1F] transition-transform hover:scale-105">MRD</span>
            <span className="logo-sub text-[10px] font-mono font-black tracking-widest text-orange-600 bg-orange-50/80 border border-orange-200/50 px-2 py-0.5 rounded-lg uppercase select-none">mhrdayat</span>
          </a>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-mono">
          <a 
            href="#campaigns" 
            className={`nav-item cursor-none text-xs font-bold tracking-wider transition-colors ${currentRoute === 'campaigns' ? 'text-blue-600 font-extrabold border-b-2 border-blue-600 pb-0.5' : 'text-gray-500 hover:text-black'}`}
            onMouseEnter={() => handleCursorHover(true, 'EXPLORE')}
            onMouseLeave={() => handleCursorHover(false)}
            onClick={playSpatialClick}
          >
            CAMPAIGNS
          </a>
          <a 
            href="#engine" 
            className={`nav-item cursor-none text-xs font-bold tracking-wider transition-colors ${currentRoute === 'engine' ? 'text-blue-600 font-extrabold border-b-2 border-blue-600 pb-0.5' : 'text-gray-500 hover:text-black'}`}
            onMouseEnter={() => handleCursorHover(true, 'ENGINE')}
            onMouseLeave={() => handleCursorHover(false)}
            onClick={playSpatialClick}
          >
            ADS ENGINE
          </a>
          <a 
            href="#calculator" 
            className={`nav-item cursor-none text-xs font-bold tracking-wider transition-colors ${currentRoute === 'calculator' ? 'text-blue-600 font-extrabold border-b-2 border-blue-600 pb-0.5' : 'text-gray-500 hover:text-black'}`}
            onMouseEnter={() => handleCursorHover(true, 'SIMULATE')}
            onMouseLeave={() => handleCursorHover(false)}
            onClick={playSpatialClick}
          >
            BUDGET SIMULATOR
          </a>
          <a 
            href="#bio" 
            className={`nav-item cursor-none text-xs font-bold tracking-wider transition-colors ${currentRoute === 'bio' ? 'text-blue-600 font-extrabold border-b-2 border-blue-600 pb-0.5' : 'text-gray-500 hover:text-black'}`}
            onMouseEnter={() => handleCursorHover(true, 'BIO')}
            onMouseLeave={() => handleCursorHover(false)}
            onClick={playSpatialClick}
          >
            BIO & STACK
          </a>
        </nav>

        {/* CTA & Switcher Area */}
        <div className="flex items-center gap-4 relative z-50 pointer-events-auto">
          <a 
            href="#contact-section" 
            className="contact-btn hidden md:inline-block cursor-none font-mono font-black text-xs uppercase tracking-wider px-5 py-3 bg-[#FFCC00] text-black border border-black rounded-full shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] transition-all"
            onMouseEnter={() => handleCursorHover(true, 'HIRE RAHMAT')}
            onMouseLeave={() => handleCursorHover(false)}
            onClick={playSpatialClick}
          >
            WORK WITH ME
          </a>

          {/* Premium Apple-Style i18n Switcher Container */}
          <div className="hidden md:flex relative z-[2100] bg-gray-200/60 p-1 rounded-full font-mono text-[10px] font-bold border border-gray-300/40 pointer-events-auto">
            <button 
              className={`px-3 py-1 cursor-none rounded-full transition-all duration-300 pointer-events-auto ${locale === 'id' ? 'bg-white text-black shadow-sm font-black' : 'text-gray-500 hover:text-black'}`}
              onMouseEnter={() => handleCursorHover(true, 'BAHASA')}
              onMouseLeave={() => handleCursorHover(false)}
              onClick={(e) => { setLocale('id'); playSpatialClick(e); }}
            >
              ID
            </button>
            <button 
              className={`px-3 py-1 cursor-none rounded-full transition-all duration-300 pointer-events-auto ${locale === 'en' ? 'bg-white text-black shadow-sm font-black' : 'text-gray-500 hover:text-black'}`}
              onMouseEnter={() => handleCursorHover(true, 'ENGLISH')}
              onMouseLeave={() => handleCursorHover(false)}
              onClick={(e) => { setLocale('en'); playSpatialClick(e); }}
            >
              EN
            </button>
          </div>
          
          <button 
            className="mobile-menu-toggle cursor-none md:hidden font-mono font-bold text-xs uppercase text-gray-800 hover:text-black"
            onClick={(e) => { setMobileMenuOpen(true); playSpatialClick(e); }}
          >
            MENU
          </button>
        </div>
      </header>

      {/* Dynamic Marquee Header Ticker */}
      <div id="marquee-header" className="marquee-container overflow-hidden bg-blue-600 border-b border-gray-300 py-3 flex white-space-nowrap">
        <div className="marquee-track flex gap-8 select-none font-header text-white text-xs tracking-wider uppercase animate-[marqueeScroll_32s_linear_infinite]">
          <span>NO PLASTIC SKIN • ZERO AI SLOP • SYSTEMS ANALYST BY BRAIN • CREATIVE SYNTHESIZER BY CODE • HEAVY PUFFY • JAPANESE BRUTALISM • CLAYMORPHISM • </span>
          <span>NO PLASTIC SKIN • ZERO AI SLOP • SYSTEMS ANALYST BY BRAIN • CREATIVE SYNTHESIZER BY CODE • HEAVY PUFFY • JAPANESE BRUTALISM • CLAYMORPHISM • </span>
        </div>
      </div>

      <main className="content-grid w-full">
        
        {currentRoute === 'home' && (
          <section id="hero-section" className="relative hero-block py-16 px-[6%] min-h-[80vh] flex flex-col justify-center">
            {/* Massive background layer typography */}
            <div className="hero-bg-text absolute left-0 right-0 top-1/2 -translate-y-1/2 text-[14vw] font-header tracking-tighter uppercase leading-[0.78] text-gray-900 pointer-events-none select-none text-center opacity-[0.03] z-0">
              MUHAMMAD RAHMAT HIDAYAT
            </div>

            <div className="max-w-5xl w-full mx-auto z-10 flex flex-col md:flex-row gap-6 items-stretch">
              
              <div className="w-full md:w-3/5 glass-bento squircle-card p-5 md:p-10 flex flex-col justify-between">
                <div>
                  <span className="micro-spec-label font-bold text-blue-600 block mb-4">
                    {t.heroSub}
                  </span>
                  {/* Wrapped 2-line title rule */}
                  <h1 ref={heroTitleRef} className="font-header text-3xl md:text-6xl leading-[0.9] tracking-tighter uppercase mb-6 text-gray-900">
                    <span className="text-reveal-wrap">
                      <span className="text-reveal-line">MUHAMMAD</span>
                    </span>
                    <span className="text-reveal-wrap">
                      <span className="text-reveal-line"><span className="text-blue-600">RAHMAT</span> HIDAYAT.</span>
                    </span>
                  </h1>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-6">
                  <span className="py-2.5 px-5 rounded-2xl bg-gray-900 text-white font-header text-[10px] tracking-widest shadow-[3px_3px_0px_#ffcc00] border border-black/15">
                    {t.heroRole}
                  </span>
                  <span className="py-2.5 px-5 rounded-2xl border border-black bg-white text-black font-display font-bold text-[10px] tracking-widest shadow-[3px_3px_0px_#0066ff]">
                    {t.heroCert}
                  </span>
                </div>
              </div>

              <div className="w-full md:w-2/5 glass-bento squircle-card p-5 md:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex gap-4 mb-5 font-mono text-[10px] font-bold text-gray-500 uppercase select-none">
                    <span>◼ {t.heroCoord}</span>
                    <span>◼ {t.heroSys}</span>
                  </div>
                  <p className="font-body text-gray-600 text-sm leading-[1.65] font-medium">
                    {t.heroBio}
                  </p>
                  
                  {/* Group badges in a clean horizontal Flex Row */}
                  <div className="flex flex-wrap gap-2.5 mt-6 select-none font-mono">
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-full text-[10px] font-bold shadow-sm whitespace-nowrap flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                      IBM AI Certified
                    </span>
                    <span className="px-3 py-1.5 bg-pink-50 text-pink-600 border border-pink-200 rounded-full text-[10px] font-bold shadow-sm whitespace-nowrap flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse"></span>
                      BNSP Certified
                    </span>
                    <span className="px-3 py-1.5 bg-orange-50 text-orange-600 border border-orange-200 rounded-full text-[10px] font-bold shadow-sm whitespace-nowrap flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                      S.Kom Graduate
                    </span>
                    <span className="px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full text-[10px] font-bold shadow-sm whitespace-nowrap flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Zero AI Slop
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <a 
                    href="#campaigns" 
                    className="primary-btn liquid-btn relative flex-1 cursor-none py-4 px-6 text-center bg-[#0052CC] font-header text-xs text-white tracking-widest rounded-2xl shadow-[4px_4px_0px_#111111]"
                    onMouseEnter={() => handleCursorHover(true, 'EXPLORE')}
                    onMouseLeave={() => handleCursorHover(false)}
                    onClick={playSpatialClick}
                  >
                    {t.deckBtn}
                  </a>
                  <a 
                    href="#calculator" 
                    className="secondary-btn flex-1 cursor-none py-4 px-6 text-center bg-white hover:bg-orange-600 hover:text-white font-header text-xs text-black border-2 border-black tracking-widest rounded-2xl shadow-[4px_4px_0px_#111111] transition-all"
                    onMouseEnter={() => handleCursorHover(true, 'SIMULATE')}
                    onMouseLeave={() => handleCursorHover(false)}
                    onClick={playSpatialClick}
                  >
                    {t.simBtn}
                  </a>
                </div>
              </div>

            </div>
          </section>
        )}

        {currentRoute === 'campaigns' && (
          <section id="campaigns" className="section-animate py-12 md:py-24 px-[6%] bg-white/40 border-y border-gray-300">
            <div className="section-header-block max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
              <div className="header-text-panel">
                <span className="micro-spec-label font-bold text-blue-600 block mb-2">{t.featuredWork}</span>
                <h2 className="font-header text-2xl md:text-6xl tracking-tight uppercase leading-[0.9] text-gray-900">{t.editorialDeck}</h2>
              </div>
              <p className="max-w-md font-body text-gray-600 text-sm leading-[1.6] text-left md:text-right font-medium">
                {t.featuredDesc}
              </p>
            </div>

            {/* Filtering control pills */}
            <div className="max-w-6xl mx-auto flex flex-wrap gap-3 mb-12">
              <button 
                className={`filter-btn cursor-none font-display font-bold text-xs tracking-wider py-3 px-6 rounded-full border-2 border-black transition-all ${bentoFilter === 'all' ? 'bg-accent text-white shadow-[3px_3px_0px_#000000]' : 'bg-white text-black shadow-[3px_3px_0px_#000000]'}`}
                onMouseEnter={() => handleCursorHover(true, 'ALL DECKS')}
                onMouseLeave={() => handleCursorHover(false)}
                onClick={(e) => { setBentoFilter('all'); playSpatialClick(e); }}
              >
                {t.filterAll}
              </button>
              <button 
                className={`filter-btn cursor-none font-display font-bold text-xs tracking-wider py-3 px-6 rounded-full border-2 border-black transition-all ${bentoFilter === 'fashion' ? 'bg-accent text-white shadow-[3px_3px_0px_#000000]' : 'bg-white text-black shadow-[3px_3px_0px_#000000]'}`}
                onMouseEnter={() => handleCursorHover(true, 'FASHION')}
                onMouseLeave={() => handleCursorHover(false)}
                onClick={(e) => { setBentoFilter('fashion'); playSpatialClick(e); }}
              >
                {t.filterFashion}
              </button>
              <button 
                className={`filter-btn cursor-none font-display font-bold text-xs tracking-wider py-3 px-6 rounded-full border-2 border-black transition-all ${bentoFilter === 'skincare' ? 'bg-accent text-white shadow-[3px_3px_0px_#000000]' : 'bg-white text-black shadow-[3px_3px_0px_#000000]'}`}
                onMouseEnter={() => handleCursorHover(true, 'SKINCARE')}
                onMouseLeave={() => handleCursorHover(false)}
                onClick={(e) => { setBentoFilter('skincare'); playSpatialClick(e); }}
              >
                {t.filterSkincare}
              </button>
              <button 
                className={`filter-btn cursor-none font-display font-bold text-xs tracking-wider py-3 px-6 rounded-full border-2 border-black transition-all ${bentoFilter === 'ai-photoshoot' ? 'bg-accent text-white shadow-[3px_3px_0px_#000000]' : 'bg-white text-black shadow-[3px_3px_0px_#000000]'}`}
                onMouseEnter={() => handleCursorHover(true, 'AI PHOTOSHOOT')}
                onMouseLeave={() => handleCursorHover(false)}
                onClick={(e) => { setBentoFilter('ai-photoshoot'); playSpatialClick(e); }}
              >
                {t.filterAiPhotoshoot}
              </button>
            </div>

            {/* GAPLESS ASYMMETRIC BENTO GRID (WITH PROXIMITY FOCUS ISOLATION) */}
            <div className="bento-container max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[340px]">
              {campaignsList.map((campaign) => {
                const title = campaign.titleKey ? t[campaign.titleKey] : campaign.title;
                const desc = campaign.descKey ? t[campaign.descKey] : campaign.desc;
                const concept = campaign.conceptKey ? t[campaign.conceptKey] : campaign.concept;
                const cardId = `c${campaign.id}`;

                const isVisible = bentoFilter === 'all' || bentoFilter === campaign.category;

                if (!isVisible) return null;

                return (
                  <div 
                    key={campaign.id}
                    className={`bento-item-stagger squircle-card ${campaign.gridSpan} relative overflow-hidden group cursor-none`}
                    onMouseEnter={() => { handleCursorHover(true, 'EXPLORE'); setHoveredCard(cardId); }}
                    onMouseLeave={() => { handleCursorHover(false); setHoveredCard(null); }}
                    onClick={() => openBentoGallery(campaign.folder, title, desc, campaign.defaultImg, concept)}
                    style={{
                      opacity: hoveredCard && hoveredCard !== cardId ? 0.4 : 1,
                      filter: hoveredCard && hoveredCard !== cardId ? 'blur(2px)' : 'none',
                      transition: 'opacity var(--dur-ui) var(--ease-out-expo), filter var(--dur-ui) var(--ease-out-expo)'
                    }}
                  >
                    <img 
                      src={campaign.defaultImg} 
                      alt={title} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5 md:p-8 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-350">
                      <span className="self-start text-[10px] font-extrabold tracking-widest text-black bg-yellow-400 py-1 px-3 border border-black rounded-lg mb-2 font-display">
                        {campaign.category === 'ai-photoshoot' ? 'AI PHOTOSHOOT' : (campaign.category === 'skincare' ? 'SKINCARE' : 'FASHION & EDITORIAL')}
                      </span>
                      <h3 className="font-display font-extrabold text-white text-xl mb-1">{title}</h3>
                      <p className="text-gray-300 text-xs font-body font-medium">{desc}</p>
                      <div className="absolute top-4 right-4 md:top-6 md:right-6 py-1.5 px-3 md:py-2 md:px-4 rounded-xl bg-orange-600 text-white font-header text-[9px] tracking-widest shadow-[2px_2px_0px_#000]">
                        {campaign.imagesCount} {t.imagesCount}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {currentRoute === 'engine' && (
          <section id="engine" className="section-animate py-12 md:py-24 px-[6%] bg-white/40">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              
              <div>
                <span className="micro-spec-label font-bold text-blue-600 block mb-2">{t.propsTitle}</span>
                <h2 className="font-header text-2xl md:text-5xl tracking-tighter uppercase mb-6 leading-none text-gray-900">{t.propsHeading}</h2>
                <p className="font-body text-gray-600 text-sm leading-[1.6] mb-8 font-medium">
                  {t.propsSub}
                </p>

                {/* JSON parameters codeblock */}
                <div className="rounded-3xl border border-black/10 overflow-hidden bg-gray-950 shadow-xl">
                  <div className="bg-gray-900 py-3 px-6 flex items-center gap-2 border-b border-white/5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="font-mono text-[10px] text-gray-500 ml-2">HUMANIZED_ENGINE_CONFIG.json</span>
                  </div>
                  <div className="p-6 font-mono text-[11px] text-blue-400 overflow-x-auto leading-relaxed">
                    <pre>{`{
  "camera": "Hasselblad H6D-100c, 80mm Lens",
  "aperture": "f/4.0, shallow depth of field",
  "lighting": "editorial studio overcast, natural soft directional shadow",
  "skin_rendering": "ultra-realistic dermis micro-pore mapping",
  "anti_slop_parameters": [
    "avoid high-saturation plastics",
    "exclude neon airbrush skin smoothing",
    "lock anatomical joint limits"
  ]
}`}</pre>
                  </div>
                </div>
              </div>

              {/* iOS Smart Stack Bento Component */}
              <div 
                className="squircle-card bg-gray-50 p-5 md:p-12 border border-black/5 shadow-2xl relative flex flex-col justify-between min-h-[400px] cursor-none select-none"
                onMouseEnter={() => handleCursorHover(true, 'SWIPE STACK')}
                onMouseLeave={() => handleCursorHover(false)}
                onClick={handleStackSwipe}
              >
                <div className="absolute top-6 right-6 font-mono text-[10px] text-gray-400 font-extrabold tracking-widest">
                  iOS SMART STACK WIDGET
                </div>

                <div className="stack-content-panel flex flex-col justify-center flex-1 py-8">
                  <div className="font-header text-5xl text-blue-600 mb-4 tracking-tighter">
                    {stackItems[activeStackIndex].num}
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-gray-900 mb-3">
                    {stackItems[activeStackIndex].title}
                  </h3>
                  <p className="font-body text-gray-600 text-sm leading-[1.6]">
                    {stackItems[activeStackIndex].desc}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-gray-200 pt-6">
                  <div className="flex gap-1.5">
                    {stackItems.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`w-2.5 h-1 rounded-full transition-all duration-300 ${idx === activeStackIndex ? 'w-6 bg-blue-600' : 'bg-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] font-bold text-gray-400">
                    CLICK WIDGET TO SWIPE VERTICALLY
                  </span>
                </div>
              </div>

            </div>
          </section>
        )}

        {currentRoute === 'calculator' && (
          <section id="calculator" className="section-animate py-12 md:py-24 px-[6%] bg-white/40 border-t border-gray-300">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              
              <div className="w-full">
                <span className="micro-spec-label font-bold text-blue-600 block mb-2">{t.heroSys}</span>
                <h2 className="font-header text-2xl md:text-5xl uppercase tracking-tighter mb-4 text-gray-900">{t.pricingTitle}</h2>
                <p className="font-body text-gray-600 text-sm leading-[1.6] mb-12 font-medium">
                  {t.pricingSub}
                </p>

                {/* iOS Rubber-banding slider components */}
                <ConceptSlider />
                <OutputSlider />

                {/* Toggles */}
                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-100/50 border border-black/5">
                    <span className="text-sm font-semibold text-gray-700">{t.pricingIdLock}</span>
                    <input 
                      type="checkbox" 
                      checked={identityLocked}
                      className="w-5 h-5 accent-blue-600 pointer-events-auto"
                      onChange={(e) => { 
                        setIdentityLocked(e.target.checked); 
                        runCalculatorSync(conceptsCount, outputsCount, e.target.checked, commercialRights);
                        playSpatialClick(e);
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-100/50 border border-black/5">
                    <span className="text-sm font-semibold text-gray-700">{t.pricingRights}</span>
                    <input 
                      type="checkbox" 
                      checked={commercialRights}
                      className="w-5 h-5 accent-blue-600 pointer-events-auto"
                      onChange={(e) => { 
                        setCommercialRights(e.target.checked); 
                        runCalculatorSync(conceptsCount, outputsCount, identityLocked, e.target.checked);
                        playSpatialClick(e);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Price Output display panel */}
              <div 
                id="calc-price-output"
                className="squircle-card bg-white p-5 md:p-12 border border-black/5 shadow-2xl relative flex flex-col justify-between min-h-[440px]"
              >
                <div className="absolute top-6 right-6 font-mono text-[10px] text-gray-400 font-extrabold tracking-widest">
                  LIVE BUDGET ESTIMATION
                </div>

                <div className="flex-1 flex flex-col justify-center py-8">
                  <span className="font-mono text-[10px] font-black text-gray-400 tracking-wider block uppercase mb-1">TOTAL CAMPAIGN FEE</span>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-mono text-xl font-bold text-gray-400">{t.priceTag}</span>
                    <span id="price-value" className="font-header text-3xl md:text-6xl text-blue-600 tracking-tighter">
                      {calculatedPrice.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs font-body text-gray-600 font-semibold border-t border-gray-100 pt-6">
                    <li>• {outputsCount} High-Fidelity Photoshoots (35mm Realism)</li>
                    <li>• {conceptsCount} Editorial Moodboard Creative Concepts</li>
                    <li>• Complete Source Prompt Parameters</li>
                    {commercialRights ? <li>• Certified Commercial Usage Rights</li> : <li>• Standard Personal Usage License</li>}
                    {identityLocked ? <li>• Integrated Multi-Stage Identity Locking</li> : <li>• Standard Models Generation</li>}
                  </ul>
                </div>

                <a 
                  href="#contact-section" 
                  className="primary-btn cursor-none w-full py-4 text-center bg-accent font-header text-xs text-white tracking-widest rounded-2xl shadow-[4px_4px_0px_#111111]"
                  onMouseEnter={() => handleCursorHover(true, 'SECURE CONTRACT')}
                  onMouseLeave={() => handleCursorHover(false)}
                  onClick={playSpatialClick}
                >
                  {t.priceBtn}
                </a>
              </div>

            </div>
          </section>
        )}
        {currentRoute === 'bio' && (
          <section id="bio" className="section-animate py-12 md:py-24 px-[6%] bg-white/40 border-t border-gray-300">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
              
              <div className="flex flex-col justify-center">
                <span className="micro-spec-label font-bold text-blue-600 block mb-2">{t.aboutSub}</span>
                <h2 className="font-header text-2xl md:text-5xl uppercase tracking-tighter leading-none mb-6 text-gray-900">{t.aboutTitle}</h2>
                <p className="font-body text-gray-600 text-sm leading-[1.6] mb-8 font-medium">
                  {t.aboutBio}
                </p>

                {/* Monospace career highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-header text-xs tracking-wider text-gray-900 mb-3 uppercase">{t.skillsSys}</h5>
                    <ul className="space-y-1.5 font-body text-xs text-gray-500 font-semibold">
                      <li>• Systems Analysis (BNSP Certified)</li>
                      <li>• Relational Database SQL</li>
                      <li>• Process Automation scripting</li>
                      <li>• Dapodik & Dapodik-Lite</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-header text-xs tracking-wider text-gray-900 mb-3 uppercase">{t.skillsCreative}</h5>
                    <ul className="space-y-1.5 font-body text-xs text-gray-500 font-semibold">
                      <li>• Adobe Photoshop CC</li>
                      <li>• Midjourney Prompt Tuning</li>
                      <li>• Advanced UI/UX Bento Design</li>
                      <li>• WebGL 3D Clay Rendering</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Apple Mac Finder Tabbed Workspace */}
              <div className="squircle-card bg-white p-6 shadow-sm flex flex-col h-[400px] border border-gray-200">
                
                {/* Finder mock UI Tabs */}
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-6 overflow-x-auto select-none">
                  <button 
                    className={`cursor-none font-mono text-[10px] font-bold py-1.5 px-3 rounded-lg border transition-all ${xcodeTab === '2024-2025' ? 'bg-gray-100 text-black border-gray-250' : 'text-gray-500 hover:text-black border-transparent'}`}
                    onMouseEnter={() => handleCursorHover(true, 'OPEN SQL')}
                    onMouseLeave={() => handleCursorHover(false)}
                    onClick={() => handleTabSwitch('2024-2025')}
                  >
                    📄 SMKS_Satui.sql
                  </button>
                  <button 
                    className={`cursor-none font-mono text-[10px] font-bold py-1.5 px-3 rounded-lg border transition-all ${xcodeTab === '2024 BPS' ? 'bg-gray-100 text-black border-gray-250' : 'text-gray-500 hover:text-black border-transparent'}`}
                    onMouseEnter={() => handleCursorHover(true, 'OPEN JSON')}
                    onMouseLeave={() => handleCursorHover(false)}
                    onClick={() => handleTabSwitch('2024 BPS')}
                  >
                    📄 Systems_Analysis.json
                  </button>
                  <button 
                    className={`cursor-none font-mono text-[10px] font-bold py-1.5 px-3 rounded-lg border transition-all ${xcodeTab === '2023 Univ' ? 'bg-gray-100 text-black border-gray-250' : 'text-gray-500 hover:text-black border-transparent'}`}
                    onMouseEnter={() => handleCursorHover(true, 'OPEN SKOM')}
                    onMouseLeave={() => handleCursorHover(false)}
                    onClick={() => handleTabSwitch('2023 Univ')}
                  >
                    📄 UNISKA_Sarjana.skom
                  </button>
                </div>

                {/* Dynamic Interactive Workspace content panel */}
                <div ref={xcodeContentRef} className="flex-1 font-mono text-xs text-gray-600 overflow-y-auto bg-gray-50 p-6 rounded-2xl border border-gray-200/50 flex flex-col justify-center">
                  <span className="font-mono text-[10px] text-blue-600 font-extrabold uppercase mb-2">
                    // Organization: {xcodeTimelines[xcodeTab].org}
                  </span>
                  <h4 className="font-display font-extrabold text-gray-900 text-xl mb-1">
                    {xcodeTimelines[xcodeTab].title}
                  </h4>
                  <span className="font-mono text-[10px] text-gray-400 uppercase block mb-4">
                    Timeline / Year: {xcodeTimelines[xcodeTab].year}
                  </span>
                  <p className="font-body text-gray-500 text-xs leading-[1.6] font-medium">
                    {xcodeTimelines[xcodeTab].desc}
                  </p>
                </div>

              </div>

            </div>
          </section>
        )}

        {/* ==========================================================================
           10. CONTACT SECTION
           ========================================================================== */}
        <section id="contact-section" className="py-12 md:py-24 px-[6%] bg-white/40 border-t border-gray-300">
          <div className="max-w-4xl mx-auto squircle-card bg-gray-900 text-white p-5 md:p-16 border border-white/5 shadow-2xl text-center">
            <span className="micro-spec-label font-bold text-yellow-400 block mb-3">GET IN TOUCH</span>
            <h2 className="font-header text-2xl md:text-5xl uppercase tracking-tighter mb-4 leading-none">{t.contactHeading}</h2>
            <p className="max-w-lg mx-auto font-body text-gray-400 text-xs leading-[1.6] mb-12 font-medium">
              {t.contactSub}
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <a 
                href="mailto:muhammad.rahmathidayat77@gmail.com" 
                className="cursor-none py-4 px-6 bg-white hover:bg-yellow-400 text-black rounded-2xl font-header text-xs tracking-widest shadow-[3px_3px_0px_#0066ff] transition-all"
                onMouseEnter={() => handleCursorHover(true, 'EMAIL ME')}
                onMouseLeave={() => handleCursorHover(false)}
                onClick={playSpatialClick}
              >
                muhammad.rahmathidayat77@gmail.com
              </a>
              <a 
                href="tel:+628990641233" 
                className="cursor-none py-4 px-6 bg-white hover:bg-yellow-400 text-black rounded-2xl font-header text-xs tracking-widest shadow-[3px_3px_0px_#ff5500] transition-all"
                onMouseEnter={() => handleCursorHover(true, 'CALL / WA')}
                onMouseLeave={() => handleCursorHover(false)}
                onClick={playSpatialClick}
              >
                +62 899-0641-233
              </a>
            </div>
          </div>

          <footer className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mt-24 border-t border-gray-200 pt-8 font-mono text-[10px] font-bold text-gray-400">
            <p>© 2026 MUHAMMAD RAHMAT HIDAYAT. ALL RIGHTS RESERVED.</p>
            <p>{t.footerLocated}</p>
          </footer>
        </section>

      </main>



      {/* ==========================================================================
         12. FULLSCREEN MOBILE OVERLAY MENU
         ========================================================================== */}
      <div className={`mobile-menu-overlay md:hidden ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <div className="nav-brand">
            <span className="logo-text font-header text-3xl text-gray-900">MRD</span>
            <span className="logo-sub text-[10px] font-extrabold tracking-widest text-orange-600 font-body uppercase mt-[-4px]">mhrdayat</span>
          </div>
          <button 
            className="close-mobile-menu cursor-none text-5xl font-header text-gray-900"
            onClick={(e) => { setMobileMenuOpen(false); playSpatialClick(e); }}
          >
            &times;
          </button>
        </div>
        <nav className="mobile-menu-links flex flex-col gap-6 items-start mt-12 w-full">
          <a 
            href="#campaigns" 
            className="mobile-menu-item font-header text-3xl tracking-tighter text-gray-900 uppercase"
            onClick={() => setMobileMenuOpen(false)}
          >
            CAMPAIGNS
          </a>
          <a 
            href="#engine" 
            className="mobile-menu-item font-header text-3xl tracking-tighter text-gray-900 uppercase"
            onClick={() => setMobileMenuOpen(false)}
          >
            ADS ENGINE
          </a>
          <a 
            href="#calculator" 
            className="mobile-menu-item font-header text-3xl tracking-tighter text-gray-900 uppercase"
            onClick={() => setMobileMenuOpen(false)}
          >
            BUDGET SIMULATOR
          </a>
          <a 
            href="#bio" 
            className="mobile-menu-item font-header text-3xl tracking-tighter text-gray-900 uppercase"
            onClick={() => setMobileMenuOpen(false)}
          >
            BIO & STACK
          </a>

          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between w-full mt-6 pt-6 border-t border-gray-200/50">
            <span className="font-mono text-[10px] font-bold text-gray-500 uppercase">LANGUAGE / BAHASA</span>
            <div className="flex bg-gray-200/60 p-1 rounded-full font-mono text-[10px] font-bold border border-gray-300/40">
              <button 
                className={`px-4 py-1.5 rounded-full transition-all duration-300 ${locale === 'id' ? 'bg-white text-black shadow-sm font-black' : 'text-gray-500'}`}
                onClick={(e) => { setLocale('id'); playSpatialClick(e); }}
              >
                ID
              </button>
              <button 
                className={`px-4 py-1.5 rounded-full transition-all duration-300 ${locale === 'en' ? 'bg-white text-black shadow-sm font-black' : 'text-gray-500'}`}
                onClick={(e) => { setLocale('en'); playSpatialClick(e); }}
              >
                EN
              </button>
            </div>
          </div>

          <a 
            href="#contact-section" 
            className="mobile-contact-btn w-full mt-4 py-4 text-center bg-yellow-400 font-header text-sm text-black tracking-widest rounded-2xl shadow-[3px_3px_0px_#000000] border-2 border-black"
            onClick={() => setMobileMenuOpen(false)}
          >
            WORK WITH ME
          </a>
        </nav>
      </div>

      {/* ==========================================================================
         13. DYNAMIC MULTI-IMAGE CAROUSEL LIGHTBOX MODAL
         ========================================================================== */}
      {lightboxOpen && (
        <div className="lightbox fixed inset-0 bg-black/95 z-[9999] flex flex-col" style={{backdropFilter:'blur(12px)'}}>
          {/* ── Top bar ── */}
          <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-white/10 flex-shrink-0">
            <div>
              <p className="text-white font-display font-extrabold text-lg leading-tight" dangerouslySetInnerHTML={{ __html: lightboxTitle }} />
              <p className="text-gray-400 text-xs font-body mt-0.5" dangerouslySetInnerHTML={{ __html: lightboxDesc }} />
            </div>
            <div className="flex items-center gap-3">
              {/* Tab switcher */}
              <div className="flex bg-white/10 p-1 rounded-full gap-1">
                <button
                  className={`cursor-none px-4 py-1.5 rounded-full font-header text-[10px] tracking-widest transition-all duration-300 ${lightboxTab === 'gallery' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setLightboxTab('gallery')}
                >{t.viewGallery}</button>
                <button
                  className={`cursor-none px-4 py-1.5 rounded-full font-header text-[10px] tracking-widest transition-all duration-300 ${lightboxTab === 'concept' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setLightboxTab('concept')}
                >{t.viewConcept}</button>
              </div>
              <button 
                className="close-lightbox cursor-none w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white font-header text-2xl flex items-center justify-center transition-colors"
                onClick={() => setLightboxOpen(false)}
              >&times;</button>
            </div>
          </div>

          {/* ── Gallery tab ── */}
          {lightboxTab === 'gallery' && (
            <div className="lightbox-frame-panel flex-1 flex flex-col min-h-0">
              <div 
                className="relative flex-1 flex items-center justify-center min-h-0 px-16 py-4"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <button 
                  className="lightbox-arrow absolute left-4 w-11 h-11 rounded-full border border-white/20 bg-white/10 hover:bg-white/30 text-white font-header text-lg flex items-center justify-center cursor-none transition-colors z-10"
                  onClick={() => handleLightboxNav(-1)}
                >&larr;</button>

                <img 
                  key={lightboxImages[activeImageIndex]}
                  src={lightboxImages[activeImageIndex]} 
                  alt="Gallery View" 
                  className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl"
                  style={{transition:'opacity 0.25s ease'}}
                />

                <button 
                  className="lightbox-arrow absolute right-4 w-11 h-11 rounded-full border border-white/20 bg-white/10 hover:bg-white/30 text-white font-header text-lg flex items-center justify-center cursor-none transition-colors z-10"
                  onClick={() => handleLightboxNav(1)}
                >&rarr;</button>

                {/* Counter badge */}
                <span className="absolute bottom-6 left-1/2 -translate-x-1/2 micro-spec-label text-blue-400 bg-blue-900/60 border border-blue-800/40 py-1 px-4 rounded-full text-[10px]">
                  {activeImageIndex + 1} / {lightboxImages.length}
                </span>
              </div>

              {/* ── Thumbnail filmstrip ── */}
              <div className="flex-shrink-0 px-4 pb-4 overflow-x-auto">
                <div className="flex gap-2 justify-start" style={{minWidth:'max-content'}}>
                  {lightboxImages.map((src, idx) => (
                    <button
                      key={idx}
                      className={`cursor-none flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                        idx === activeImageIndex
                          ? 'border-blue-500 scale-105 shadow-[0_0_12px_#0066ff80]'
                          : 'border-white/10 opacity-50 hover:opacity-80'
                      }`}
                      onClick={() => setActiveImageIndex(idx)}
                    >
                      <img src={src} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Concept tab ── */}
          {lightboxTab === 'concept' && (
            <div className="lightbox-frame-panel flex-1 flex items-start justify-center p-8 overflow-y-auto">
              <div className="max-w-2xl w-full">
                <span className="micro-spec-label inline-block mb-6 text-blue-400 bg-blue-900/40 border border-blue-800/30 py-1 px-4 rounded-full font-header text-[10px] tracking-widest">{t.conceptLabel}</span>
                <div 
                  className="font-body text-gray-200 text-base leading-[1.85] prose-concept"
                  style={{fontFamily:'var(--font-body)'}}
                  dangerouslySetInnerHTML={{ __html: lightboxConcept || '<i>No concept notes available.</i>' }}
                />
                {/* Thought process cards */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {icon:'🎯', title:'Deterministic Pose', desc:'Every joint angle is mathematically seeded from reference libraries.'},
                    {icon:'💡', title:'Analog Light Math', desc:'CMOS & 35mm film distribution — no AI default lighting.'},
                    {icon:'🔒', title:'Identity Locking', desc:'23 facial anchor points preserved across all frames.'},
                    {icon:'🧴', title:'Product Isolation', desc:'Model & packaging rendered in separate layers, composited in post.'}
                  ].map((c,i)=>(
                    <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <span className="text-2xl block mb-2">{c.icon}</span>
                      <p className="font-display font-bold text-white text-sm mb-1">{c.title}</p>
                      <p className="font-body text-gray-400 text-xs leading-relaxed">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 1. CUSTOM LERP INTERACTIVE CURSOR */}
      <div 
        ref={cursorRef} 
        className="mrd-cursor hidden md:flex pointer-events-none"
        aria-hidden="true"
      >
        <span ref={cursorTextRef} className="cursor-text">EXPLORE</span>
      </div>

    </div>
  );
}
