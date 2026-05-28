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
    caseStudy1Title: "Baju Streetwear — Swiss Grid",
    caseStudy1Desc: "Kampanye fashion streetwear dengan sistem grid asimetris minimalis ala Zara Studio dan SSENSE.",
    caseStudy1Concept: "Konsep: <b>Minimalist Swiss Grid</b>. Layering layout asimetris dengan margin print yang luas, menampilkan siluet pakaian dan detail material kain premium secara seimbang.",
    caseStudy2Title: "Apparel Archive — Contact Sheet",
    caseStudy2Desc: "Kumpulan proofs foto di balik layar kampanye fashion, disusun dalam format cetak film strip tak teratur.",
    caseStudy2Concept: "Konsep: <b>Film Strip Collage</b>. Lembaran proofs foto bertumpuk asimetris dengan drop shadow lembut untuk kesan fisik-taktil otentik.",
    caseStudy3Title: "Acne Studios Concept Cover",
    caseStudy3Desc: "Lookbook minimalis dengan framing asimetris, ruang kosong editorial, dan komposisi blok warna netral.",
    caseStudy3Concept: "Konsep: <b>Asymmetric Monolith</b>. Desain minimalis terstruktur terinspirasi dari Acne Studios dan COS, menekankan detail potongan pakaian dan bayangan studio.",
    caseStudy4Title: "SS26 Backstage Editorial",
    caseStudy4Desc: "Komposisi visual kolase multi-frame menangkap nuansa panggung belakang peragaan busana modern.",
    caseStudy4Concept: "Konsep: <b>Tactile Print Spread</b>. Penataan 12 foto secara sekuensial dengan visual ritme editorial majalah mode Vogue.",
    caseStudy5Title: "Rhode Beauty Campaign Board",
    caseStudy5Desc: "Kampanye kosmetik kulit sehat berkilau dengan layout modular triptych asimetris.",
    caseStudy5Concept: "Konsep: <b>Dewy Glow Assembly</b>. Kolase berpori kulit alami, detail cairan skincare, dan isolasi model dalam nuansa pink-krem satin yang sangat premium.",
    caseStudy6Title: "Aesop Formulation Study",
    caseStudy6Desc: "Studi visual produk skincare dengan presentasi botol dan tetesan cairan di atas permukaan beton minimalis.",
    caseStudy6Concept: "Konsep: <b>Concrete Laboratory</b>. Lembaran studi visual bertumpuk miring dengan rotasi tipis (-3 hingga +2 derajat) dan catatan monospaced layaknya dokumen riset klinis.",
    caseStudy7Title: "Liquid Skin Direction Zine",
    caseStudy7Desc: "Halaman majalah visual indie yang mengeksplorasi hidrasi kulit dan botol kemasan mewah.",
    caseStudy7Concept: "Konsep: <b>Whitespaced Zine Layout</b>. Penempatan teks judul besar di bagian atas dengan ruang kosong elegan, diikuti barisan foto produk beresolusi tajam.",
    caseStudy8Title: "SK-II Essential Texture Spec",
    caseStudy8Desc: "Eksplorasi visual komersial berenergi tinggi untuk menampilkan tekstur produk perawatan kulit secara dramatis.",
    caseStudy8Concept: "Konsep: <b>High-Contrast Skin Spec</b>. Asimetris grid mengkombinasikan foto portrait dekat dengan detail tetesan serum beresolusi makro.",
    caseStudy9Title: "Avant-Garde Cyber Lookbook",
    caseStudy9Desc: "Foto studio masa depan bertema cyber-minimalist yang realistis dengan permainan cahaya neon dingin.",
    caseStudy9Concept: "Konsep: <b>Obsidian Lookbook</b>. Kolase asimetris berlatar hitam pekat menyatukan potret utama dengan 6 baris detail visual berkualitas tinggi tanpa slop AI.",
    caseStudy10Title: "Identity Consistency Matrix",
    caseStudy10Desc: "Lembar evaluasi konsistensi wajah model dalam 12 pose runway studio berskala komersial.",
    caseStudy10Concept: "Konsep: <b>Identity Matrix Sheet</b>. Panel grid 3x4 dengan overlay penanda kalibrasi visual berwarna hijau neon untuk pembuktian stabilitas model.",
    caseStudy11Title: "Kinetic Motion Trails",
    caseStudy11Desc: "Studi visual fashion futuristik menangkap blur pergerakan model dalam siluet melingkar yang estetik.",
    caseStudy11Concept: "Konsep: <b>Circular Kinetic Framing</b>. Penataan asimetris bertingkat dengan aksen visual sirkular halus, menciptakan ilusi kedalaman spasial.",
    caseStudy12Title: "Brutalist Fashion Catalog",
    caseStudy12Desc: "Katalog visual brutal bernuansa mahal yang mengkombinasikan potret utuh dengan 9 potret detail dekat.",
    caseStudy12Concept: "Konsep: <b>High-Breathing Brutalism</b>. Pembagian kolom 3 tingkat asimetris dengan ruang nafas luas, menghasilkan katalog produk berkarakter kuat.",
    propsTitle: "AI CREATIVE PIPELINE",
    propsHeading: "AI PRODUCTION SUITE",
    propsSub: "Kami merekayasa dan mengintegrasikan 5 teknologi AI terbaik di dunia untuk melahirkan visual brand premium kelas dunia, tanpa mengandalkan ComfyUI yang kompleks atau generator gambar default yang terlihat plastik.",
    prop1Title: "Google Flow",
    prop1Desc: "Teknologi sintesis visual flow-based buatan Google untuk mengendalikan arah kamera, pencahayaan, dan komposisi photoshoot secara presisi matematis.",
    prop2Title: "Higgsfield AI",
    prop2Desc: "Sistem konsistensi karakter dan pergerakan pose yang luar biasa untuk merancang model fashion & brand dengan gerakan tubuh yang alami tanpa cacat anatomi.",
    prop3Title: "Magnific AI",
    prop3Desc: "Alat peningkatan detail pori-pori kulit (dermis micro-pore) dan tekstur pakaian kelas atas untuk menghasilkan gambar beresolusi super tajam dan mewah.",
    prop4Title: "Luma Dream Machine",
    prop4Desc: "Pembangun adegan sinematik dan tracking kamera dinamis untuk melahirkan video teaser campaign fashion yang hidup dan dramatis.",
    prop5Title: "Photoroom Pro",
    prop5Desc: "Mesin isolasi produk kosmetik/skincare premium dan rekayasa bayangan studio fisik untuk memisahkan kemasan produk dengan latar belakang studio secara bersih.",
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
    footerLocated: "LOCATED IN SATUI, SOUTH KALIMANTAN, INDONESIA",
    soundClassic: "Klasik Cupertino",
    soundMech: "Klik Mekanikal",
    soundMute: "Senyap (Mute)",
    walkthroughSub: "DEMONSTRASI ALGORITMA",
    walkthroughTitle: "CARA KERJA AI PHOTOSHOOT",
    walkthroughStep1: "1. KALIBRASI SENDI SKELETAL",
    walkthroughStep2: "2. DISTRIBUSI LUMEN CAHAYA",
    walkthroughStep3: "3. PENGUNCIAN IDENTITAS SEED",
    walkthroughStep4: "4. KOMPOSIT LAYER TERISOLASI",
    walkthroughStep1Desc: "Sistem memetakan koordinat sendi tubuh (skeletal landmarks) 2D/3D untuk mengunci anatomi model. Menghilangkan bug jari aneh atau distorsi pose anomali khas generator AI generik.",
    walkthroughStep2Desc: "Menghitung derajat pancaran cahaya studio fisik dan jatuhnya bayangan di atas tekstur pori-pori kulit model berdasarkan sensor kamera Hasselblad H6D analog.",
    walkthroughStep3Desc: "Mengunci struktur wajah model melalui 23 titik embedding vektor wajah. Menjamin sorot mata, tulang pipi, dan dagu 100% konsisten di seluruh 66 frame kampanye.",
    walkthroughStep4Desc: "Memisahkan rendering kemasan produk skincare atau serat kain baju terpisah dari tubuh model menggunakan Photoshop layer masking, menjaga integritas logo brand.",
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
    featuredDesc: "Real case studies of premium visual campaigns structured by folder. Click on any campaign to load all images inside the project folder.",
    filterAll: "ALL DECK",
    filterFashion: "FASHION & APPAREL",
    filterSkincare: "SKINCARE & PRODUCT",
    filterAiPhotoshoot: "AI PHOTOSHOOT",
    imagesCount: "Images",
    viewConcept: "VIEW CONCEPT",
    viewGallery: "VIEW GALLERY",
    conceptLabel: "THINKING PROCESS",
    caseStudy1Title: "Baju Streetwear — Swiss Grid",
    caseStudy1Desc: "Streetwear fashion campaign with a minimalist asymmetric grid system inspired by Zara Studio and SSENSE.",
    caseStudy1Concept: "Concept: <b>Minimalist Swiss Grid</b>. Asymmetric grid layout with large editorial margins, balancing apparel silhouettes and premium textile details.",
    caseStudy2Title: "Apparel Archive — Contact Sheet",
    caseStudy2Desc: "Backstage proofs collection from a fashion campaign, arranged as raw overlapping film strips.",
    caseStudy2Concept: "Concept: <b>Film Strip Collage</b>. Raw contact sheet prints layered asymmetrically with soft shadows for a physical, tactile darkroom aesthetic.",
    caseStudy3Title: "Acne Studios Concept Cover",
    caseStudy3Desc: "Minimalist lookbook featuring asymmetrical crops, generous whitespace, and neutral block composition.",
    caseStudy3Concept: "Concept: <b>Asymmetric Monolith</b>. Architectural minimalist layouts inspired by Acne Studios and COS, highlighting garment construction and raw shadows.",
    caseStudy4Title: "SS26 Backstage Editorial",
    caseStudy4Desc: "A multi-frame editorial spread capturing the chaotic energy of high-fashion backstage scenes.",
    caseStudy4Concept: "Concept: <b>Tactile Print Spread</b>. 12 distinct fashion frames aligned sequentially, mirroring the visual pacing of Vogue editorial archives.",
    caseStudy5Title: "Rhode Beauty Campaign Board",
    caseStudy5Desc: "Healthy dewy skin cosmetic campaign utilizing a clean modular triptych layout.",
    caseStudy5Concept: "Concept: <b>Dewy Glow Assembly</b>. Curation of raw pores, liquid formulations, and model close-ups in premium soft pink and cream tones.",
    caseStudy6Title: "Aesop Formulation Study",
    caseStudy6Desc: "Skincare visual studies presenting bottles and droplets on minimal raw concrete plates.",
    caseStudy6Concept: "Concept: <b>Concrete Laboratory</b>. Physical research sheets scattered with subtle rotations (-3 to +2 degrees) and detailed clinical monospaced overlays.",
    caseStudy7Title: "Liquid Skin Direction Zine",
    caseStudy7Desc: "An independent zine spread exploring extreme skin hydration and luxurious packaging design.",
    caseStudy7Concept: "Concept: <b>Whitespaced Zine Layout</b>. Large bold header text and generous negative space leading into high-resolution, sharp product closeups.",
    caseStudy8Title: "SK-II Essential Texture Spec",
    caseStudy8Desc: "High-contrast commercial skincare campaign highlighting formulation textures dynamically.",
    caseStudy8Concept: "Concept: <b>High-Contrast Skin Spec</b>. Asymmetrical layout blending detailed macro droplets with high-fashion model portrait crops.",
    caseStudy9Title: "Avant-Garde Cyber Lookbook",
    caseStudy9Desc: "Futuristic studio photoshoot featuring cyber-minimalist lighting and hyper-realistic analog skin tones.",
    caseStudy9Concept: "Concept: <b>Obsidian Lookbook</b>. A deep black campaign layout pairing the dominant model portrait with 6 detail-rich crops without AI slop.",
    caseStudy10Title: "Identity Consistency Matrix",
    caseStudy10Desc: "A model consistency evaluation sheet showing 12 structured runway studio poses.",
    caseStudy10Concept: "Concept: <b>Identity Matrix Sheet</b>. A 3x4 grid panel with high-contrast green neon calibration lines proving stable identity lock.",
    caseStudy11Title: "Kinetic Motion Trails",
    caseStudy11Desc: "An avant-garde fashion movement study capturing dynamic kinetic blurs in circular frames.",
    caseStudy11Concept: "Concept: <b>Circular Kinetic Framing</b>. Staggered layout layered with thin circular guide lines, establishing a deep sense of visual movement.",
    caseStudy12Title: "Brutalist Fashion Catalog",
    caseStudy12Desc: "A premium brutalist catalog pairing a single full-length shot with 9 extreme details.",
    caseStudy12Concept: "Concept: <b>High-Breathing Brutalism</b>. 3 asymmetric columns with spacious layout rhythm, delivering a commanding product presentation.",
    propsTitle: "AI CREATIVE PIPELINE",
    propsHeading: "AI PRODUCTION SUITE",
    propsSub: "We engineer and integrate the world's top 5 AI technologies to produce premium, world-class brand visuals, without relying on complex ComfyUI nodes or generic, plastic-looking image generators.",
    prop1Title: "Google Flow",
    prop1Desc: "Google's flow-based visual synthesis technology to control camera angles, lighting, and photoshoot compositions with mathematical precision.",
    prop2Title: "Higgsfield AI",
    prop2Desc: "Advanced character consistency and pose movement system for design of fashion & brand models with organic body motion without anatomical flaws.",
    prop3Title: "Magnific AI",
    prop3Desc: "High-end skin pore (dermis micro-pore) detail enhancement and apparel texture upscaling tool to generate ultra-sharp, luxury visual resolutions.",
    prop4Title: "Luma Dream Machine",
    prop4Desc: "Cinematic scene builder and dynamic camera tracking to engineer live and dramatic video fashion campaign teasers.",
    prop5Title: "Photoroom Pro",
    prop5Desc: "Premium cosmetics/skincare product isolation engine and physical studio shadow generation to cleanly separate product packaging from studio backgrounds.",
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
    footerLocated: "LOCATED IN SATUI, SOUTH KALIMANTAN, INDONESIA",
    soundClassic: "Classic Cupertino",
    soundMech: "Mechanical Click",
    soundMute: "Mute",
    walkthroughSub: "ALGORITHMIC BLUEPRINT",
    walkthroughTitle: "HOW DETAILED AI PHOTOSHOOT WORKS",
    walkthroughStep1: "1. SKELETAL JOINT CALIBRATION",
    walkthroughStep2: "2. STUDIO LUMEN DISTRIBUTION",
    walkthroughStep3: "3. IDENTITY EMBEDDING WEIGHTS",
    walkthroughStep4: "4. LAYER ISOLATION COMPOSITING",
    walkthroughStep1Desc: "Pins specific 2D/3D coordinate matrices corresponding to human joint coordinates. Eliminates anomalous hand morphs or anatomical artifacts commonly seen in basic generative engines.",
    walkthroughStep2Desc: "Traces precise physical light rays and casting falloffs against the 3D human pore texture model based on professional overcast strip-light references.",
    walkthroughStep3Desc: "Injects face-embedding weights across 23 landmarks, preserving structural cheekbones, nose vectors, and gaze limits identically in all 66 frames.",
    walkthroughStep4Desc: "Separates cosmetic labels, fabric patterns, human body, and background props into discrete layers before merging them sterilizingly in post.",
  }
};

// Auto-prefer WebP for bento card thumbnails (falls back gracefully if not converted yet)
const webp = (src) => src.replace(/\.(jpe?g|png)$/i, '.webp');

const campaignsList = [
  {
    id: 1,
    folder: "baju",
    title: { id: "Baju Streetwear — Swiss Grid", en: "Baju Streetwear — Swiss Grid" },
    desc: { id: "Kampanye fashion streetwear dengan sistem grid asimetris minimalis ala Zara Studio dan SSENSE.", en: "Streetwear fashion campaign with a minimalist asymmetric grid system inspired by Zara Studio and SSENSE." },
    concept: { id: "Konsep: <b>Minimalist Swiss Grid</b>. Layering layout asimetris dengan margin print yang luas, menampilkan siluet pakaian dan detail material kain premium secara seimbang.", en: "Concept: <b>Minimalist Swiss Grid</b>. Asymmetric grid layout with large editorial margins, balancing apparel silhouettes and premium textile details." },
    defaultImg: "/baju/Advertising_photo_new_pose_202605280829_8.jpeg",
    category: "fashion",
    gridSpan: "md:col-span-2 md:row-span-2",
    imagesCount: "15"
  },
  {
    id: 2,
    folder: "skincare",
    title: { id: "Rhode Beauty skincare", en: "Rhode Beauty skincare" },
    desc: { id: "Kampanye kosmetik kulit sehat berkilau dengan layout modular triptych asimetris.", en: "Healthy dewy skin cosmetic campaign utilizing a clean modular triptych layout." },
    concept: { id: "Konsep: <b>Dewy Glow Assembly</b>. Kolase berpori kulit alami, detail cairan skincare, dan isolasi model dalam nuansa pink-krem satin yang sangat premium.", en: "Concept: <b>Dewy Glow Assembly</b>. Curation of raw pores, liquid formulations, and model close-ups in premium soft pink and cream tones." },
    defaultImg: "/skincare/Woman_interacting_with_product_202605121657_2.jpeg",
    category: "skincare",
    gridSpan: "md:col-span-2 md:row-span-1",
    imagesCount: "18"
  },
  {
    id: 3,
    folder: "photoshoot brand",
    title: { id: "Luxury Editorial — Brand Vol. 1", en: "Luxury Editorial — Brand Vol. 1" },
    desc: { id: "Lookbook minimalis dengan framing asimetris dan ruang kosong editorial.", en: "Minimalist lookbook featuring asymmetrical crops and generous whitespace." },
    concept: { id: "Konsep: <b>Asymmetric Monolith</b>. Desain minimalis terstruktur menekankan detail potongan pakaian dan bayangan studio.", en: "Concept: <b>Asymmetric Monolith</b>. Architectural minimalist layouts highlighting garment construction and raw shadows." },
    defaultImg: "/photoshoot brand/Luxury_fashion_campaign_photography_202605121711.jpeg",
    category: "fashion",
    gridSpan: "md:col-span-1 md:row-span-1",
    imagesCount: "29"
  },
  {
    id: 4,
    folder: "photoshoot brand2",
    title: { id: "Apparel Archive — Brand Vol. 2", en: "Apparel Archive — Brand Vol. 2" },
    desc: { id: "Kumpulan proofs foto di balik layar kampanye fashion, disusun dalam format cetak film strip.", en: "Backstage proofs collection from a fashion campaign, arranged as raw film strips." },
    concept: { id: "Konsep: <b>Film Strip Collage</b>. Lembaran proofs foto bertumpuk asimetris dengan drop shadow lembut.", en: "Concept: <b>Film Strip Collage</b>. Raw contact sheet prints layered asymmetrically with soft shadows." },
    defaultImg: "/photoshoot brand2/Devetesion_campaign_scene_lock_202605121721_3.jpeg",
    category: "fashion",
    gridSpan: "md:col-span-1 md:row-span-1",
    imagesCount: "19"
  },
  {
    id: 5,
    folder: "photoshoot brand3",
    title: { id: "SS26 Backstage — Brand Vol. 3", en: "SS26 Backstage — Brand Vol. 3" },
    desc: { id: "Komposisi visual kolase multi-frame menangkap nuansa panggung belakang peragaan busana modern.", en: "A multi-frame editorial spread capturing the chaotic energy of high-fashion backstage scenes." },
    concept: { id: "Konsep: <b>Tactile Print Spread</b>. Penataan foto secara sekuensial dengan visual ritme editorial majalah mode Vogue.", en: "Concept: <b>Tactile Print Spread</b>. Distinct fashion frames aligned sequentially, mirroring the visual pacing of Vogue editorial archives." },
    defaultImg: "/photoshoot brand3/Devetesion_campaign_scene_lock_202605121721_3.jpeg",
    category: "fashion",
    gridSpan: "md:col-span-2 md:row-span-1",
    imagesCount: "23"
  },
  {
    id: 6,
    folder: "photoshoot brand4",
    title: { id: "Avant-Garde Studio — Brand Vol. 4", en: "Avant-Garde Studio — Brand Vol. 4" },
    desc: { id: "Foto studio masa depan bertema cyber-minimalist yang realistis dengan cahaya neon.", en: "Futuristic studio photoshoot featuring cyber-minimalist lighting and hyper-realistic analog skin tones." },
    concept: { id: "Konsep: <b>Obsidian Lookbook</b>. Kolase asimetris berlatar hitam pekat menyatukan potret utama dengan crops detail visual berkualitas tinggi.", en: "Concept: <b>Obsidian Lookbook</b>. A deep black campaign layout pairing the dominant model portrait with detail-rich crops." },
    defaultImg: "/photoshoot brand4/Devetesion_campaign_scene_lock_202605121722_6.jpeg",
    category: "fashion",
    gridSpan: "md:col-span-1 md:row-span-2",
    imagesCount: "18"
  },
  {
    id: 7,
    folder: "photoshoot brand5",
    title: { id: "Male Editorial — Brand Vol. 5", en: "Male Editorial — Brand Vol. 5" },
    desc: { id: "Studi visual fashion maskulin menangkap pose runway studio berskala komersial.", en: "A model consistency evaluation sheet showing structured runway studio poses." },
    concept: { id: "Konsep: <b>Identity Matrix Sheet</b>. Panel grid dengan overlay penanda kalibrasi visual berwarna hijau neon.", en: "Concept: <b>Identity Matrix Sheet</b>. A grid panel with high-contrast green neon calibration lines proving stable identity lock." },
    defaultImg: "/photoshoot brand5/Male_editorial_partial_subject_202605121729_2.jpeg",
    category: "fashion",
    gridSpan: "md:col-span-2 md:row-span-2",
    imagesCount: "66"
  },
  {
    id: 8,
    folder: "photoshoot brand6",
    title: { id: "Identity Consistency — Brand Vol. 6", en: "Identity Consistency — Brand Vol. 6" },
    desc: { id: "Eksplorasi kestabilan wajah model dalam pose studio berskala komersial.", en: "Runway model photoshoot focusing on facial structure and pose consistency." },
    concept: { id: "Konsep: <b>Identity Consistency</b>. Penguncian wajah dengan 23 titik embedding di bawah pencampuran cahaya studio.", en: "Concept: <b>Identity Consistency</b>. Locks facial features using a 23-point embedding vector system under dynamic studio lighting." },
    defaultImg: "/photoshoot brand6/Face,_outfit,_scene_lock_202605121730_5.jpeg",
    category: "fashion",
    gridSpan: "md:col-span-1 md:row-span-1",
    imagesCount: "22"
  },
  {
    id: 9,
    folder: "photoshoot brand7",
    title: { id: "Brutalist Fashion — Brand Vol. 7", en: "Brutalist Fashion — Brand Vol. 7" },
    desc: { id: "Katalog visual brutal bernuansa mahal yang mengkombinasikan potret utuh dengan potret dekat.", en: "A premium brutalist catalog pairing a single full-length shot with extreme details." },
    concept: { id: "Konsep: <b>High-Breathing Brutalism</b>. Pembagian kolom asimetris dengan ruang nafas luas, menghasilkan katalog produk berkarakter kuat.", en: "Concept: <b>High-Breathing Brutalism</b>. Asymmetric columns with spacious layout rhythm, delivering a commanding product presentation." },
    defaultImg: "/photoshoot brand7/Devetesion_campaign_shot_plan_202605121732_2.jpeg",
    category: "fashion",
    gridSpan: "md:col-span-2 md:row-span-1",
    imagesCount: "20"
  },
  {
    id: 10,
    folder: "photoshoot brand8",
    title: { id: "Concrete Monolith — Brand Vol. 8", en: "Concrete Monolith — Brand Vol. 8" },
    desc: { id: "Lookbook bertema industrial di atas tangga museum beton minimalis.", en: "Industrial-themed fashion lookbook shot against minimal museum concrete structures." },
    concept: { id: "Konsep: <b>Concrete Museum</b>. Perpaduan kontras tinggi antara lipatan pakaian mewah dan beton monolitik dingin.", en: "Concept: <b>Concrete Museum</b>. High-contrast juxtaposition of flowy luxury fabrics and cold monolithic concrete shapes." },
    defaultImg: "/photoshoot brand8/Devetesion_campaign_shot_plan_202605121732_2.jpeg",
    category: "fashion",
    gridSpan: "md:col-span-1 md:row-span-1",
    imagesCount: "21"
  },
  {
    id: 11,
    folder: "ai photoshoot1",
    title: { id: "AI Editorial Vol. 1", en: "AI Editorial Vol. 1" },
    desc: { id: "Studi visual fashion futuristik menangkap detail pakaian dan bayangan studio.", en: "Futuristic fashion visual studies capturing garment details and raw studio shadows." },
    concept: { id: "Konsep: <b>Future Editorial</b>. Layering pakaian secara asimetris menggunakan flow-based camera direction.", en: "Concept: <b>Future Editorial</b>. Layering garments asymmetrically using flow-based camera direction." },
    defaultImg: "/ai photoshoot1/Image_system_identity_and_scene_202605261435.jpeg",
    category: "ai-photoshoot",
    gridSpan: "md:col-span-1 md:row-span-1",
    imagesCount: "28"
  },
  {
    id: 12,
    folder: "ai photoshoot2",
    title: { id: "AI Editorial Vol. 2", en: "AI Editorial Vol. 2" },
    desc: { id: "Kumpulan proofs foto di balik layar kampanye fashion AI dengan detail serat pakaian premium.", en: "AI fashion backstage collection featuring premium fabric texture highlights." },
    concept: { id: "Konsep: <b>Analog Grain Synthesis</b>. Menambahkan grain 35mm alami untuk mengusir kilau plastik generik AI.", en: "Concept: <b>Analog Grain Synthesis</b>. Generates natural 35mm analog grain to expel generic plastic AI glow." },
    defaultImg: "/ai photoshoot2/Image_system_identity_and_scene_202605261435.jpeg",
    category: "ai-photoshoot",
    gridSpan: "md:col-span-2 md:row-span-1",
    imagesCount: "31"
  },
  {
    id: 13,
    folder: "ai photoshoot3",
    title: { id: "AI Editorial Vol. 3", en: "AI Editorial Vol. 3" },
    desc: { id: "Lookbook minimalis AI dengan framing asimetris, ruang kosong editorial, dan pose stabil.", en: "AI minimalist lookbook with asymmetric framing, editorial whitespace, and stable pose locking." },
    concept: { id: "Konsep: <b>Identity Anchor</b>. Penguncian wajah 23 titik vektor menjamin karakter model 100% konsisten.", en: "Concept: <b>Identity Anchor</b>. 23-point vector face locking secures model features with 100% consistency." },
    defaultImg: "/ai photoshoot3/Image_system_face_identity_lock_202605261436_9.jpeg",
    category: "ai-photoshoot",
    gridSpan: "md:col-span-1 md:row-span-2",
    imagesCount: "25"
  },
  {
    id: 14,
    folder: "ai photoshoot4",
    title: { id: "AI Editorial Vol. 4", en: "AI Editorial Vol. 4" },
    desc: { id: "Kampanye mode multi-frame menangkap nuansa panggung peragaan busana modern.", en: "Multi-frame campaign captures the high-fashion runway atmosphere through AI." },
    concept: { id: "Konsep: <b>Runway Sequence</b>. Penataan foto secara sekuensial mereproduksi ritme pergerakan model nyata.", en: "Concept: <b>Runway Sequence</b>. Staggered sequence layout reproducing organic runway movements dynamically." },
    defaultImg: "/ai photoshoot4/Analyze_images_and_generate_next…_202605261437_2.jpeg",
    category: "ai-photoshoot",
    gridSpan: "md:col-span-2 md:row-span-1",
    imagesCount: "23"
  },
  {
    id: 15,
    folder: "ai photoshoot5",
    title: { id: "AI Editorial Vol. 5", en: "AI Editorial Vol. 5" },
    desc: { id: "Foto studio avant-garde cyber-minimalist yang realistis dengan cahaya neon dingin.", en: "Futuristic avant-garde studio photoshoot with cyber-minimalist cold neon lighting." },
    concept: { id: "Konsep: <b>Obsidian Glow</b>. Kolase asimetris berlatar hitam pekat menyatukan potret model dengan crops detail visual tinggi.", en: "Concept: <b>Obsidian Glow</b>. Deep dark backdrop pairing model portraits with high-contrast crop highlights." },
    defaultImg: "/ai photoshoot5/Multi-reference_image_synthesis_…_202605280827.jpeg",
    category: "ai-photoshoot",
    gridSpan: "md:col-span-1 md:row-span-1",
    imagesCount: "17"
  },
  {
    id: 16,
    folder: "ai photoshoot6",
    title: { id: "AI Editorial Vol. 6", en: "AI Editorial Vol. 6" },
    desc: { id: "Studi pergerakan kinetik mode futuristik menangkap keindahan gerak model.", en: "Futuristic fashion movement study capturing dynamic kinetic model blurs." },
    concept: { id: "Konsep: <b>Kinetic Framing</b>. Penataan bertingkat asimetris dengan aksen sirkular untuk ilusi kedalaman spasial.", en: "Concept: <b>Kinetic Framing</b>. Staggered asymmetric layout with circular trails establishing space and depth." },
    defaultImg: "/ai photoshoot6/Campaign_image_sequence_generation_202605280827.jpeg",
    category: "ai-photoshoot",
    gridSpan: "md:col-span-2 md:row-span-2",
    imagesCount: "29"
  },
  {
    id: 17,
    folder: "ai photoshoot7",
    title: { id: "AI Editorial Vol. 7", en: "AI Editorial Vol. 7" },
    desc: { id: "Studi visual kemasan skincare dan botol produk di atas permukaan beton minimalis.", en: "Skincare formulation study focusing on physical bottle placement on concrete plates." },
    concept: { id: "Konsep: <b>Industrial Lab</b>. Lembaran studi visual bertumpuk miring dengan rotasi tipis layaknya riset klinis.", en: "Concept: <b>Industrial Lab</b>. Scattered clinical sheets with organic rotations (-3 to +2 degrees) and monospaced notes." },
    defaultImg: "/ai photoshoot7/Female_model_in_extreme_crop_202605280827_2.jpeg",
    category: "ai-photoshoot",
    gridSpan: "md:col-span-1 md:row-span-1",
    imagesCount: "12"
  },
  {
    id: 18,
    folder: "ai photoshoot8",
    title: { id: "AI Editorial Vol. 8", en: "AI Editorial Vol. 8" },
    desc: { id: "Eksplorasi hidrasi kulit ekstrem dan rekayasa botol produk mewah berkilau.", en: "Independent editorial zine spread exploring skin hydration and luxury skincare packaging." },
    concept: { id: "Konsep: <b>Extreme Hydration</b>. Menggabungkan portrait resolusi tinggi dengan detail tetesan makro berair.", en: "Concept: <b>Extreme Hydration</b>. Blends high-resolution model portraits with macro product formulation details." },
    defaultImg: "/ai photoshoot8/Model_leaning_back_structure_202605280828.jpeg",
    category: "ai-photoshoot",
    gridSpan: "md:col-span-2 md:row-span-1",
    imagesCount: "10"
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

  // --- NEW APPLE ECOSYSTEM & INTERACTIVE STATES ---
  const [soundScheme, setSoundScheme] = useState('classic'); // 'classic', 'mechanical', 'mute'
  const [islandActive, setIslandActive] = useState(false);
  const [islandText, setIslandText] = useState('');
  const [activeWatchVital, setActiveWatchVital] = useState('systems'); // 'systems', 'photoshoot', 'slop'
  const [steppedWalkthroughIndex, setSteppedWalkthroughIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // --- NEW INTERACTIVE & SYSTEM CUSTOMIZATION STATES ---
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [volume, setVolume] = useState(70);
  const [hapticIntensity, setHapticIntensity] = useState(80);
  const [screenBrightness, setScreenBrightness] = useState(100);
  const [rippleOrigin, setRippleOrigin] = useState({ x: 0, y: 0 });
  const [isRippleActive, setIsRippleActive] = useState(false);
  const [rippleRadius, setRippleRadius] = useState(0);

  const toggleDarkModeWithRipple = (e) => {
    const x = e ? e.clientX : window.innerWidth / 2;
    const y = e ? e.clientY : window.innerHeight / 2;
    
    setRippleOrigin({ x, y });
    setIsRippleActive(true);
    
    const targetRadius = Math.hypot(window.innerWidth, window.innerHeight);
    const obj = { radius: 0 };
    
    gsap.to(obj, {
      radius: targetRadius,
      duration: 0.85,
      ease: 'power3.out',
      onUpdate: () => {
        setRippleRadius(obj.radius);
      },
      onComplete: () => {
        setIsDarkMode(prev => !prev);
        setIsRippleActive(false);
        setRippleRadius(0);
        triggerDynamicIsland(!isDarkMode ? (locale === 'id' ? "🌙 Mode Gelap Aktif" : "🌙 Dark Mode Active") : (locale === 'id' ? "☀️ Mode Terang Aktif" : "☀️ Light Mode Active"));
      }
    });
  };
  
  // Bento card drag-and-drop offsets (using spring physics targets)
  const [bento1Offset, setBento1Offset] = useState({ x: 0, y: 0 });
  const [bento2Offset, setBento2Offset] = useState({ x: 0, y: 0 });
  const [draggingBento, setDraggingBento] = useState(null); // null, 1, or 2
  const dragStartRef = useRef({ x: 0, y: 0 });
  const bentoOffsetRef = useRef({ x: 0, y: 0 });

  // Function to trigger the Dynamic Island notification capsule
  const triggerDynamicIsland = (text) => {
    setIslandText(text);
    setIslandActive(true);
  };
  useEffect(() => {
    if (islandActive) {
      const timer = setTimeout(() => setIslandActive(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [islandActive]);

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
      if (soundScheme === 'mute') return;

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

      let dur = 0.08;
      if (soundScheme === 'mechanical') {
        osc.type = 'triangle';
        // High legibility mechanical click frequency envelope
        osc.frequency.setValueAtTime(1400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        dur = 0.08;
      } else {
        // Cupertino Soft Chime (Sine wave, warm tone, longer decay)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        dur = 0.15;
      }

      // Panning balance calculations mapping pixel client X to stereo channels (-1.0 to 1.0)
      if (panner && e && typeof e.clientX === 'number') {
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
      osc.stop(ctx.currentTime + dur);
    } catch (err) {
      // Fail silently to prevent interrupting UI
    }
  };

  // --- BENTO DRAG & TOUCH SPRING PHYSICS WIDGET ENGINE (iOS SIMULATOR) ---
  const handleDragStart = (e, bentoId) => {
    const isTouch = e.type.startsWith('touch');
    
    // On mobile, only start dragging if it's a long press or if touch has started.
    // We prevent default behavior only if we are actively dragging to avoid breaking vertical scroll.
    const pageX = isTouch ? e.touches[0].clientX : e.clientX;
    const pageY = isTouch ? e.touches[0].clientY : e.clientY;
    
    setDraggingBento(bentoId);
    dragStartRef.current = { x: pageX, y: pageY };
    bentoOffsetRef.current = bentoId === 1 ? bento1Offset : bento2Offset;
    
    if (isTouch) {
      // Small audio feedback on mobile touch start
      playSpatialClick(e.touches[0]);
    } else {
      playSpatialClick(e);
    }
  };

  const handleDragMove = (e) => {
    if (draggingBento === null) return;
    
    const isTouch = e.type.startsWith('touch');
    const pageX = isTouch ? e.touches[0].clientX : e.clientX;
    const pageY = isTouch ? e.touches[0].clientY : e.clientY;
    
    const dx = pageX - dragStartRef.current.x;
    const dy = pageY - dragStartRef.current.y;
    
    const newOffset = {
      x: bentoOffsetRef.current.x + dx,
      y: bentoOffsetRef.current.y + dy
    };
    
    if (draggingBento === 1) {
      setBento1Offset(newOffset);
    } else {
      setBento2Offset(newOffset);
    }
  };

  const handleDragEnd = () => {
    if (draggingBento === null) return;
    
    const bentoId = draggingBento;
    setDraggingBento(null);
    
    triggerDynamicIsland(locale === 'id' ? "📱 Widget iOS Dirapikan" : "📱 iOS Widget Sorted");
    
    // High-performance GSAP spring physics return animation
    if (bentoId === 1) {
      const curX = bento1Offset.x;
      const curY = bento1Offset.y;
      gsap.to({ x: curX, y: curY }, {
        x: 0,
        y: 0,
        duration: 0.75,
        ease: "elastic.out(1, 0.5)",
        onUpdate: function() {
          setBento1Offset({ x: this.targets()[0].x, y: this.targets()[0].y });
        }
      });
    } else {
      const curX = bento2Offset.x;
      const curY = bento2Offset.y;
      gsap.to({ x: curX, y: curY }, {
        x: 0,
        y: 0,
        duration: 0.75,
        ease: "elastic.out(1, 0.5)",
        onUpdate: function() {
          setBento2Offset({ x: this.targets()[0].x, y: this.targets()[0].y });
        }
      });
    }
  };

  // Add touch/mouse listeners dynamically to window during active drag to guarantee drag releases outside elements
  useEffect(() => {
    if (draggingBento !== null) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('touchmove', handleDragMove, { passive: false });
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [draggingBento, bento1Offset, bento2Offset]);

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

    // 8. INTERACTIVE GLASSMORPHIC PARTICLE WEB (Lightweight Points Mesh)
    const particlesCount = 120;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 45;
      positions[i + 1] = (Math.random() - 0.5) * 35;
      positions[i + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      color: 0x0066ff,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true
    });
    const particlesPoints = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesPoints);

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
      
      // Rotate points slowly
      particlesPoints.rotation.y = elapsedTime * 0.04 * currentSpeed;
      particlesPoints.rotation.x = elapsedTime * 0.02 * currentSpeed;
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
    { num: "04", title: t.prop4Title, desc: t.prop4Desc },
    { num: "05", title: t.prop5Title, desc: t.prop5Desc }
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

  // Preload adjacent images for instant navigation feel
  useEffect(() => {
    if (!lightboxOpen || lightboxImages.length <= 1) return;
    const count = lightboxImages.length;
    const preloadIdxs = [
      (activeImageIndex + 1) % count,
      (activeImageIndex - 1 + count) % count,
    ];
    preloadIdxs.forEach(idx => {
      const img = new Image();
      img.src = lightboxImages[idx];
    });
  }, [activeImageIndex, lightboxImages, lightboxOpen]);

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

  // Lightbox keyboard navigation — declared AFTER all lightbox state (no TDZ)
  useEffect(() => {
    const onLightboxKey = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); handleLightboxNav(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); handleLightboxNav(-1); }
      else if (e.key === 'Escape') { e.preventDefault(); setLightboxOpen(false); }
    };
    window.addEventListener('keydown', onLightboxKey);
    return () => window.removeEventListener('keydown', onLightboxKey);
  }, [lightboxOpen, lightboxImages, activeImageIndex]);


  return (
    <div className={`relative min-h-screen overflow-x-hidden w-full max-w-full bg-bgCream ${isDarkMode ? 'dark-mode' : ''}`}>
      
      {/* ==========================================================================
         DYNAMIC ISLAND NOTIFICATION TOAST (floating bottom-safe, tidak menutupi navbar)
         ========================================================================== */}
      {islandActive && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[5000] pointer-events-none animate-[fadeIn_0.25s_ease-out]">
          <div className="bg-black/90 text-white rounded-2xl px-5 py-2.5 flex items-center gap-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 backdrop-blur-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span className="font-mono text-[10px] font-black tracking-widest uppercase whitespace-nowrap">{islandText}</span>
          </div>
        </div>
      )}

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
            onMouseEnter={() => handleCursorHover(true, 'AI PRODUCTION')}
            onMouseLeave={() => handleCursorHover(false)}
            onClick={playSpatialClick}
          >
            AI PRODUCTION
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

            <div className="max-w-5xl w-full mx-auto z-10 flex flex-col md:flex-row gap-6 items-stretch select-none">
              
              {/* ── PREMIUM ID CARD / HERO BENTO (Left 3/5) ── */}
              <div 
                className="w-full md:w-3/5 glass-bento squircle-card p-0 flex flex-col justify-between cursor-grab active:cursor-grabbing transition-shadow duration-300 overflow-hidden"
                style={{
                  transform: `translate(${bento1Offset.x}px, ${bento1Offset.y}px)`,
                  zIndex: draggingBento === 1 ? 50 : 10,
                  touchAction: 'none',
                  boxShadow: draggingBento === 1 ? '0 30px 60px rgba(0,0,0,0.15)' : '0 2px 24px rgba(0,0,0,0.06)'
                }}
                onMouseDown={(e) => handleDragStart(e, 1)}
                onTouchStart={(e) => handleDragStart(e, 1)}
              >
                {/* ── ID CARD TOP HEADER ── */}
                <div className="relative flex-none bg-gradient-to-r from-[#0052CC] via-[#0066FF] to-[#2979FF] px-5 pt-5 pb-14 overflow-hidden">
                  {/* Blueprint grid lines */}
                  <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(255,255,255,0.4) 18px, rgba(255,255,255,0.4) 19px), repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(255,255,255,0.4) 18px, rgba(255,255,255,0.4) 19px)'}} />
                  {/* Holographic shimmer strip */}
                  <div className="absolute top-0 right-0 w-32 h-full opacity-20" style={{background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)', animation: 'shimmer 3s ease-in-out infinite'}} />
                  <div className="relative flex justify-between items-start">
                    <div>
                      <span className="font-mono text-[7px] font-black tracking-[0.25em] text-blue-200 uppercase block">CREATIVE ID CARD</span>
                      <span className="font-mono text-[8px] font-bold text-white/70 tracking-widest">MRD-PORTFOLIO-2026</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[7px] font-black text-blue-200 tracking-widest uppercase">{t.heroSub}</span>
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"/>
                    </div>
                  </div>
                </div>

                {/* ── ID CARD PHOTO + DETAILS ── */}
                <div className="relative px-5 pb-5">
                  {/* Photo — overlaps header */}
                  <div className="absolute -top-10 left-5 w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-[3px] border-white shadow-[0_8px_24px_rgba(0,82,204,0.35)] bg-gray-100">
                    <img 
                      src="/mrd-photo.jpg" 
                      alt="Muhammad Rahmat Hidayat"
                      className="w-full h-full object-cover object-top"
                      draggable={false}
                    />
                    {/* Biometric scan line animation */}
                    <div className="absolute inset-0 pointer-events-none" style={{background: 'linear-gradient(to bottom, transparent 0%, rgba(0,102,255,0.15) 50%, transparent 100%)', animation: 'scanLine 2.5s ease-in-out infinite'}} />
                  </div>

                  {/* Chip + NFC watermark */}
                  <div className="absolute -top-8 right-5 flex flex-col items-end gap-1">
                    <div className="w-8 h-6 rounded-sm bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 shadow-sm border border-yellow-200/50" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px), repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(0,0,0,0.08) 5px, rgba(0,0,0,0.08) 6px)'}} />
                    <span className="font-mono text-[7px] text-blue-300 tracking-wider">NFC ◈</span>
                  </div>

                  {/* Name + Title block — offset by photo height */}
                  <div className="mt-14 md:mt-16">
                    <h1 ref={heroTitleRef} className="font-header text-2xl md:text-4xl leading-[0.9] tracking-tighter uppercase text-gray-900">
                      <span className="text-reveal-wrap"><span className="text-reveal-line">MUHAMMAD</span></span>
                      <span className="text-reveal-wrap"><span className="text-reveal-line"><span className="text-blue-600">RAHMAT</span> HIDAYAT.</span></span>
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-mono text-[9px] text-gray-500 tracking-widest uppercase">S.KOM · BNSP SYSTEMS ANALYST</span>
                    </div>
                  </div>

                  {/* ── DATA FIELDS row ── */}
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-2.5">
                      <span className="font-mono text-[7px] text-gray-400 uppercase tracking-widest block mb-0.5">IPK</span>
                      <span className="font-mono text-sm font-black text-gray-900">3.65</span>
                    </div>
                    <div className="bg-blue-50 border border-blue-200/80 rounded-xl p-2.5">
                      <span className="font-mono text-[7px] text-blue-400 uppercase tracking-widest block mb-0.5">CERTS</span>
                      <span className="font-mono text-sm font-black text-blue-700">×3</span>
                    </div>
                    <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-2.5">
                      <span className="font-mono text-[7px] text-gray-400 uppercase tracking-widest block mb-0.5">SINCE</span>
                      <span className="font-mono text-sm font-black text-gray-900">2021</span>
                    </div>
                  </div>

                  {/* ── Barcode + status badges row ── */}
                  <div className="flex items-end justify-between mt-4 gap-3">
                    {/* Fake barcode */}
                    <div className="flex items-end gap-[2px] h-8 opacity-60">
                      {[3,6,2,8,4,7,2,5,9,3,6,4,8,2,7,5,3,9,6,4,2,8,5,7].map((h, i) => (
                        <div key={i} className="bg-gray-800 rounded-[1px]" style={{width:'2px', height:`${h * 3}px`}} />
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      <span className="py-1 px-2.5 rounded-full bg-gray-900 text-white font-header text-[8px] tracking-widest shadow-[2px_2px_0px_#ffcc00]">{t.heroRole}</span>
                      <span className="py-1 px-2.5 rounded-full border border-black bg-white text-black font-display font-bold text-[8px] tracking-widest shadow-[2px_2px_0px_#0066ff]">{t.heroCert}</span>
                    </div>
                  </div>
                </div>

                {/* Keyframe styles injected inline — only for this card */}
                <style>{`
                  @keyframes scanLine {
                    0%, 100% { transform: translateY(-100%); }
                    50% { transform: translateY(100%); }
                  }
                  @keyframes shimmer {
                    0%, 100% { opacity: 0.1; }
                    50% { opacity: 0.25; }
                  }
                `}</style>
              </div>

              <div 
                className="w-full md:w-2/5 glass-bento squircle-card p-5 md:p-10 flex flex-col justify-between cursor-grab active:cursor-grabbing transition-shadow duration-300"
                style={{
                  transform: `translate(${bento2Offset.x}px, ${bento2Offset.y}px)`,
                  zIndex: draggingBento === 2 ? 50 : 10,
                  touchAction: 'none',
                  boxShadow: draggingBento === 2 ? '0 30px 60px rgba(0,0,0,0.15)' : 'none'
                }}
                onMouseDown={(e) => handleDragStart(e, 2)}
                onTouchStart={(e) => handleDragStart(e, 2)}
              >
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
                const title = typeof campaign.title === 'object' ? campaign.title[locale] : (campaign.titleKey ? t[campaign.titleKey] : campaign.title);
                const desc = typeof campaign.desc === 'object' ? campaign.desc[locale] : (campaign.descKey ? t[campaign.descKey] : campaign.desc);
                const concept = typeof campaign.concept === 'object' ? campaign.concept[locale] : (campaign.conceptKey ? t[campaign.conceptKey] : campaign.concept);
                const cardId = `c${campaign.id}`;

                const isVisible = bentoFilter === 'all' || bentoFilter === campaign.category;

                if (!isVisible) return null;

                return (
                  <div 
                    key={campaign.id}
                    className={`bento-item-stagger squircle-card ${campaign.gridSpan} relative overflow-hidden group cursor-none`}
                    onMouseEnter={() => { handleCursorHover(true, 'EXPLORE'); setHoveredCard(cardId); }}
                    onMouseLeave={() => { handleCursorHover(false); setHoveredCard(null); }}
                    onClick={() => openBentoGallery(campaign.folder, title, desc, webp(campaign.defaultImg), concept)}
                    style={{
                      opacity: hoveredCard && hoveredCard !== cardId ? 0.4 : 1,
                      filter: hoveredCard && hoveredCard !== cardId ? 'blur(2px)' : 'none',
                      transition: 'opacity var(--dur-ui) var(--ease-out-expo), filter var(--dur-ui) var(--ease-out-expo)'
                    }}
                  >
                    <img 
                      src={webp(campaign.defaultImg)} 
                      alt={title} 
                      loading="lazy"
                      decoding="async"
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
                    <span className="font-mono text-[10px] text-gray-500 ml-2">AI_PRODUCTION_SUITE_CONFIG.json</span>
                  </div>
                  <div className="p-6 font-mono text-[11px] text-blue-400 overflow-x-auto leading-relaxed">
                    <pre>{`{
  "primary_tools": [
    "Google Flow",
    "Higgsfield AI",
    "Magnific AI",
    "Luma Dream Machine",
    "Photoroom Pro"
  ],
  "excluded_generators": [
    "Midjourney (unpredictable consistency)",
    "ComfyUI (complex node dependencies for now)"
  ],
  "pipeline_mode": "Deterministic Brand Synthesis",
  "dermis_lock": "Enabled (23 anchor points)",
  "lighting_math": "CMOS Hasselblad H6D overcast"
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

            {/* ==========================================================================
               7. STEP-BY-STEP MATHEMATICAL AI PHOTOSHOOT SYNTHESIS WALKTHROUGH
               ========================================================================== */}
            <div className="max-w-6xl mx-auto border-t border-gray-300 dark:border-white/10 pt-12 mt-12 select-none">
              <span className="micro-spec-label font-bold text-blue-600 block mb-2">{t.walkthroughSub}</span>
              <h3 className="font-header text-xl md:text-3xl uppercase tracking-tighter text-gray-900 dark:text-white mb-6">
                {t.walkthroughTitle}
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                {/* Left: Step navigation list */}
                <div className="flex flex-col gap-2.5 justify-center">
                  {[0, 1, 2, 3].map((idx) => {
                    const stepNum = idx + 1;
                    const titleKey = `walkthroughStep${stepNum}`;
                    const descKey = `walkthroughStep${stepNum}Desc`;
                    const isActive = steppedWalkthroughIndex === idx;
                    
                    return (
                      <button 
                        key={idx}
                        onClick={() => {
                          setSteppedWalkthroughIndex(idx);
                          playSpatialClick({ clientX: window.innerWidth / 2 });
                          triggerDynamicIsland(locale === 'id' ? `🔬 Langkah Walkthrough: ${idx + 1}` : `🔬 Walkthrough Step: ${idx + 1}`);
                        }}
                        onMouseEnter={() => handleCursorHover(true, `STEP ${idx + 1}`)}
                        onMouseLeave={() => handleCursorHover(false)}
                        className={`cursor-none text-left p-4.5 rounded-2.5xl border transition-all duration-300 flex flex-col justify-between ${
                          isActive 
                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/10' 
                            : 'bg-white dark:bg-[#1c1b18] border-black/10 dark:border-white/5 hover:border-blue-500/50 text-gray-800 dark:text-gray-250'
                        }`}
                      >
                        <h4 className="font-header text-xs tracking-wider uppercase mb-1 font-black">
                          {t[titleKey]}
                        </h4>
                        <p className={`font-body text-[10px] leading-relaxed font-semibold ${isActive ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                          {t[descKey]}
                        </p>
                      </button>
                    );
                  })}
                </div>
                
                {/* Right: Dynamic visual blueprint screen (2 columns wide) */}
                <div className="lg:col-span-2 squircle-card bg-gray-950 p-6 flex flex-col justify-between h-[380px] relative border border-white/10 shadow-2xl overflow-hidden">
                  <div className="absolute top-5 right-5 font-mono text-[8px] text-gray-500 font-extrabold tracking-widest flex items-center gap-1.5 z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    LIVE ALGORITHMIC BLUEPRINT
                  </div>
                  
                  {/* Glowing frame corners */}
                  <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-gray-700 pointer-events-none" />
                  <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-gray-700 pointer-events-none" />
                  <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-gray-700 pointer-events-none" />
                  <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-gray-700 pointer-events-none" />
                  
                  {/* Dynamic Visual Content */}
                  <div className="flex-1 flex items-center justify-center relative select-none">
                    {/* Grid overlay */}
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-[0.04] pointer-events-none">
                      <div className="border-r border-b border-white" />
                      <div className="border-r border-b border-white" />
                      <div className="border-b border-white" />
                      <div className="border-r border-b border-white" />
                      <div className="border-r border-b border-white" />
                      <div className="border-b border-white" />
                      <div className="border-r border-white" />
                      <div className="border-r border-white" />
                      <div className="border-transparent" />
                    </div>
                    
                    {/* SVG Blueprint */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 250">
                      {steppedWalkthroughIndex === 0 && (
                        <g className="animate-[fadeIn_0.35s_ease-out]">
                          {/* Joint coordinates & nodes */}
                          <line x1="200" y1="50" x2="200" y2="100" stroke="#00E8FC" strokeWidth="1" strokeDasharray="3 3" />
                          <line x1="200" y1="65" x2="160" y2="85" stroke="#00E8FC" strokeWidth="1" />
                          <line x1="200" y1="65" x2="240" y2="85" stroke="#00E8FC" strokeWidth="1" />
                          <line x1="160" y1="85" x2="150" y2="120" stroke="#00E8FC" strokeWidth="1" />
                          <line x1="240" y1="85" x2="250" y2="120" stroke="#00E8FC" strokeWidth="1" />
                          <line x1="200" y1="100" x2="180" y2="160" stroke="#00E8FC" strokeWidth="1" />
                          <line x1="200" y1="100" x2="220" y2="160" stroke="#00E8FC" strokeWidth="1" />
                          
                          <circle cx="200" cy="50" r="4.5" fill="#00E8FC" className="animate-pulse" />
                          <circle cx="200" cy="50" r="2.5" fill="#00E8FC" />
                          <text x="210" y="53" fill="#00E8FC" className="font-mono text-[7px] font-bold">NODE_0 (HEAD) [LOCKED_OK]</text>
                          
                          <circle cx="160" cy="85" r="2.5" fill="#00E8FC" />
                          <text x="105" y="82" fill="#00E8FC" className="font-mono text-[7px]">L_SH: 160,85</text>
                          
                          <circle cx="240" cy="85" r="2.5" fill="#00E8FC" />
                          <text x="246" y="82" fill="#00E8FC" className="font-mono text-[7px]">R_SH: 240,85</text>
                          
                          <circle cx="150" cy="120" r="3.5" fill="#FF1E56" />
                          <text x="90" y="123" fill="#FF1E56" className="font-mono text-[7px] font-bold">NODE_3 (L_ELBOW)</text>
                          
                          <circle cx="250" cy="120" r="3.5" fill="#FF1E56" />
                          <text x="256" y="123" fill="#FF1E56" className="font-mono text-[7px] font-bold">NODE_4 (R_ELBOW)</text>
                          
                          <text x="15" y="235" fill="#00E8FC" className="font-mono text-[8px] font-bold uppercase tracking-wider">
                            SYSTEM: 2D/3D LANDMARKS CALIBRATED [DETERMINISTIC_POSE_OK]
                          </text>
                        </g>
                      )}
                      {steppedWalkthroughIndex === 1 && (
                        <g className="animate-[fadeIn_0.35s_ease-out]">
                          {/* Studio lighting */}
                          <path d="M 50,30 L 150,90 L 90,140 Z" fill="rgba(255, 170, 0, 0.08)" stroke="rgba(255, 170, 0, 0.2)" strokeWidth="1" />
                          <line x1="50" y1="30" x2="200" y2="100" stroke="#FFAA00" strokeWidth="1" strokeDasharray="4 4" />
                          <line x1="90" y1="140" x2="200" y2="100" stroke="#FFAA00" strokeWidth="0.8" strokeDasharray="3 3" />
                          
                          <circle cx="50" cy="30" r="5" fill="#FFAA00" />
                          <circle cx="50" cy="30" r="10" stroke="#FFAA00" strokeWidth="1" fill="transparent" className="animate-ping" />
                          <text x="65" y="33" fill="#FFAA00" className="font-mono text-[7px] font-bold">LIGHT_EMITTER: OVERCAST STRIP (1.4 lm)</text>
                          
                          <circle cx="200" cy="100" r="4" fill="#FFAA00" />
                          <line x1="200" y1="100" x2="310" y2="60" stroke="#FFAA00" strokeWidth="0.8" />
                          <text x="210" y="103" fill="#FFAA00" className="font-mono text-[7px]">REFL: dermis micro-pore mapping</text>
                          
                          <text x="15" y="235" fill="#FFAA00" className="font-mono text-[8px] font-bold uppercase tracking-wider">
                            LUMEN ALGORITHM: PHYSICAL STUDIO LIGHTING TRACED [CMOS_NO_SLOP]
                          </text>
                        </g>
                      )}
                      {steppedWalkthroughIndex === 2 && (
                        <g className="animate-[fadeIn_0.35s_ease-out]">
                          {/* Face landmarks target */}
                          <circle cx="200" cy="90" r="26" stroke="#00FF87" strokeWidth="0.8" fill="transparent" strokeDasharray="4 4" />
                          <circle cx="200" cy="90" r="12" stroke="#00FF87" strokeWidth="1.2" fill="transparent" />
                          
                          <line x1="200" y1="90" x2="165" y2="90" stroke="#00FF87" strokeWidth="0.8" />
                          <line x1="200" y1="90" x2="200" y2="65" stroke="#00FF87" strokeWidth="0.8" />
                          
                          <circle cx="190" cy="85" r="2" fill="#00FF87" />
                          <circle cx="210" cy="85" r="2" fill="#00FF87" />
                          
                          {[
                            {x:200, y:65}, {x:188, y:68}, {x:212, y:68},
                            {x:178, y:80}, {x:222, y:80}, {x:190, y:85},
                            {x:210, y:85}, {x:200, y:83}, {x:200, y:92},
                            {x:192, y:98}, {x:208, y:98}, {x:200, y:102},
                            {x:175, y:90}, {x:225, y:90}, {x:185, y:106},
                            {x:215, y:106}, {x:200, y:114}
                          ].map((pt, pIdx) => (
                            <circle key={pIdx} cx={pt.x} cy={pt.y} r="1.5" fill="#00FF87" />
                          ))}
                          
                          <text x="235" y="70" fill="#00FF87" className="font-mono text-[7px] font-bold">FACE_LANDMARK: 23 WEIGHTS [LOCKED]</text>
                          <text x="235" y="80" fill="#00FF87" className="font-mono text-[7px]">GAZE_LIMIT: 24° LIMITS</text>
                          
                          <text x="15" y="235" fill="#00FF87" className="font-mono text-[8px] font-bold uppercase tracking-wider">
                            IDENTITY EMBEDDING: CHEEKBONE & NOSE VELEMENTS SECURED [100% CONSISTENT]
                          </text>
                        </g>
                      )}
                      {steppedWalkthroughIndex === 3 && (
                        <g className="animate-[fadeIn_0.35s_ease-out]">
                          {/* Compositing layers */}
                          <polygon points="120,70 280,70 310,110 150,110" fill="rgba(255, 30, 86, 0.08)" stroke="#FF1E56" strokeWidth="0.8" />
                          <text x="135" y="86" fill="#FF1E56" className="font-mono text-[7px] font-bold">LAYER_01: STUDIO BACKGROUND & SET PROPS</text>
                          
                          <polygon points="120,110 280,110 310,150 150,150" fill="rgba(0, 232, 252, 0.08)" stroke="#00E8FC" strokeWidth="0.8" />
                          <text x="135" y="126" fill="#00E8FC" className="font-mono text-[7px] font-bold">LAYER_02: HUMAN DERMIS INTEGRITY MESH</text>
                          
                          <polygon points="120,150 280,150 310,190 150,190" fill="rgba(0, 255, 135, 0.08)" stroke="#00FF87" strokeWidth="0.8" />
                          <text x="135" y="166" fill="#00FF87" className="font-mono text-[7px] font-bold">LAYER_03: SKINCARE LABELS & FABRIC TEXTURES</text>
                          
                          <text x="15" y="235" fill="#FF1E56" className="font-mono text-[8px] font-bold uppercase tracking-wider">
                            COMPOSITING PIPELINE: MASK LAYERS SPLIT AND RENDERED [NO_SLOP_TEXTURES]
                          </text>
                        </g>
                      )}
                    </svg>
                    
                    {/* Simulated Viewfinder camera borders */}
                    <div className="absolute inset-3 border border-white/10 rounded-lg pointer-events-none flex flex-col justify-between p-3">
                      <div className="flex justify-between font-mono text-[7px] text-gray-500 font-bold leading-none">
                        <span>SYS ●</span>
                        <span>[RAW] 120 FPS</span>
                      </div>
                      <div className="flex justify-between font-mono text-[7px] text-gray-500 font-bold items-end leading-none">
                        <span>F/4.0 1/125s</span>
                        <span>ISO 100</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/10 pt-3 flex justify-between items-center text-gray-500 font-mono text-[9px] select-none">
                    <span>SECTOR_0{steppedWalkthroughIndex + 1}_ACTIVE_BLUEPRINT</span>
                    <span className="text-blue-500 font-black">HUMANIZED SYSTEMS</span>
                  </div>
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

                {/* 5. Concentric SVG Rings (Apple Watch Health Style Vitals) */}
                <div className="flex flex-col sm:flex-row items-center gap-6 my-8 bg-gray-100/50 dark:bg-[#1a1917]/50 p-5 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
                  <div className="relative w-32 h-32 flex-shrink-0 select-none">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                      {/* Ring 1: Systems (Outer) */}
                      <circle cx="100" cy="100" r="80" stroke="rgba(255, 30, 86, 0.12)" strokeWidth="18" fill="transparent" />
                      <circle 
                        cx="100" cy="100" r="80" 
                        stroke="#FF1E56" strokeWidth="18" fill="transparent" 
                        strokeDasharray={2 * Math.PI * 80}
                        strokeDashoffset={2 * Math.PI * 80 * (1 - 0.92)}
                        strokeLinecap="round"
                        className="cursor-none transition-all duration-300 hover:opacity-85"
                        onClick={() => {
                          setActiveWatchVital('systems');
                          playSpatialClick({ clientX: window.innerWidth / 2 });
                          triggerDynamicIsland(locale === 'id' ? "❤️ Vital: Sertifikasi BNSP 92%" : "❤️ Vital: BNSP Systems Analyst 92%");
                        }}
                      />
                      
                      {/* Ring 2: AI Tech (Middle) */}
                      <circle cx="100" cy="100" r="60" stroke="rgba(0, 255, 135, 0.12)" strokeWidth="18" fill="transparent" />
                      <circle 
                        cx="100" cy="100" r="60" 
                        stroke="#00FF87" strokeWidth="18" fill="transparent" 
                        strokeDasharray={2 * Math.PI * 60}
                        strokeDashoffset={2 * Math.PI * 60 * (1 - 0.85)}
                        strokeLinecap="round"
                        className="cursor-none transition-all duration-300 hover:opacity-85"
                        onClick={() => {
                          setActiveWatchVital('photoshoot');
                          playSpatialClick({ clientX: window.innerWidth / 2 });
                          triggerDynamicIsland(locale === 'id' ? "💚 Vital: IBM AI Granite 85%" : "💚 Vital: IBM Granite AI 85%");
                        }}
                      />
                      
                      {/* Ring 3: Slop Limit (Inner) */}
                      <circle cx="100" cy="100" r="40" stroke="rgba(0, 232, 252, 0.12)" strokeWidth="18" fill="transparent" />
                      <circle 
                        cx="100" cy="100" r="40" 
                        stroke="#00E8FC" strokeWidth="18" fill="transparent" 
                        strokeDasharray={2 * Math.PI * 40}
                        strokeDashoffset={2 * Math.PI * 40 * (1 - 0.95)}
                        strokeLinecap="round"
                        className="cursor-none transition-all duration-300 hover:opacity-85"
                        onClick={() => {
                          setActiveWatchVital('slop');
                          playSpatialClick({ clientX: window.innerWidth / 2 });
                          triggerDynamicIsland(locale === 'id' ? "💙 Vital: Bebas Slop AI 95%" : "💙 Vital: Zero AI Slop 95%");
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none font-mono text-[9px] font-black text-gray-500 dark:text-gray-400">
                      {activeWatchVital === 'systems' ? '❤️ SYS' : activeWatchVital === 'photoshoot' ? '💚 AI' : '💙 SLOP'}
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-center text-left">
                    <span className="font-mono text-[8px] font-black text-gray-400 dark:text-gray-500 tracking-wider block uppercase mb-1">APPLE WATCH BIO VITALS</span>
                    {activeWatchVital === 'systems' && (
                      <div className="animate-[fadeIn_0.3s_ease-out]">
                        <h4 className="font-display font-extrabold text-sm text-gray-900 dark:text-white flex items-center gap-1.5 leading-none">
                          <span className="w-2 h-2 rounded-full bg-[#FF1E56]" />
                          BNSP Systems Analyst <span className="text-[#FF1E56] font-mono font-bold text-xs">92%</span>
                        </h4>
                        <p className="font-body text-[10px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed font-semibold">
                          {locale === 'id' 
                            ? "Akurasi pemodelan database Dapodik Satui dan relasional komparatif." 
                            : "Relational database schema modeling and normalization certification."}
                        </p>
                      </div>
                    )}
                    {activeWatchVital === 'photoshoot' && (
                      <div className="animate-[fadeIn_0.3s_ease-out]">
                        <h4 className="font-display font-extrabold text-sm text-gray-900 dark:text-white flex items-center gap-1.5 leading-none">
                          <span className="w-2 h-2 rounded-full bg-[#00FF87]" />
                          IBM Granite AI Suite <span className="text-[#00FF87] font-mono font-bold text-xs">85%</span>
                        </h4>
                        <p className="font-body text-[10px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed font-semibold">
                          {locale === 'id' 
                            ? "Konsistensi pembagian token prompt dan penguncian latent seeds." 
                            : "Deterministic latent seed distribution and prompt token lock parameters."}
                        </p>
                      </div>
                    )}
                    {activeWatchVital === 'slop' && (
                      <div className="animate-[fadeIn_0.3s_ease-out]">
                        <h4 className="font-display font-extrabold text-sm text-gray-900 dark:text-white flex items-center gap-1.5 leading-none">
                          <span className="w-2 h-2 rounded-full bg-[#00E8FC]" />
                          Zero AI Slop Metric <span className="text-[#00E8FC] font-mono font-bold text-xs">95%</span>
                        </h4>
                        <p className="font-body text-[10px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed font-semibold">
                          {locale === 'id' 
                            ? "Keberhasilan eliminasi smoothing airbrush wajah plastik anomali." 
                            : "Elimination of digital plastic smoothing skin and anatomically anomalous limbs."}
                        </p>
                      </div>
                    )}
                    <span className="font-mono text-[8px] text-gray-400 dark:text-gray-500 uppercase mt-2.5 block leading-none font-medium select-none">
                      {locale === 'id' ? "*KLIK LINGKARAN UNTUK DETAIL VITAL BARU" : "*TAP CIRCLES TO CHOOSE VITAL DETAIL"}
                    </span>
                  </div>
                </div>

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

            <div className="flex flex-col md:flex-row gap-6 justify-center w-full max-w-lg mx-auto">
              <a 
                href="mailto:muhammad.rahmathidayat77@gmail.com" 
                className="cursor-none py-4 px-3 sm:px-6 bg-white hover:bg-yellow-400 text-black rounded-2xl font-mono text-[9px] sm:text-xs tracking-normal sm:tracking-widest shadow-[3px_3px_0px_#0066ff] transition-all w-full overflow-hidden text-ellipsis whitespace-nowrap block border border-black/10"
                onMouseEnter={() => handleCursorHover(true, 'EMAIL ME')}
                onMouseLeave={() => handleCursorHover(false)}
                onClick={playSpatialClick}
              >
                muhammad.rahmathidayat77@gmail.com
              </a>
              <a 
                href="tel:+628990641233" 
                className="cursor-none py-4 px-3 sm:px-6 bg-white hover:bg-yellow-400 text-black rounded-2xl font-mono text-[10px] sm:text-xs tracking-normal sm:tracking-widest shadow-[3px_3px_0px_#ff5500] transition-all w-full overflow-hidden text-ellipsis whitespace-nowrap block border border-black/10"
                onMouseEnter={() => handleCursorHover(true, 'CALL / WA')}
                onMouseLeave={() => handleCursorHover(false)}
                onClick={playSpatialClick}
              >
                +62 899-0641-233
              </a>
            </div>
          </div>

          <footer className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center mt-24 border-t border-gray-200 pt-8 font-mono text-[10px] font-bold text-gray-400 text-center md:text-left">
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
            AI PRODUCTION
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
        <div className="lightbox active fixed inset-0 bg-black/95 z-[9999] flex flex-col" style={{backdropFilter:'blur(12px)'}}>
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
            <div className="lightbox-frame-panel flex-1 flex flex-col min-h-0 overflow-hidden">

              {/* ── Main image area: 3-column grid so arrows are NEVER covered ── */}
              <div
                className="flex-1 grid min-h-0"
                style={{ gridTemplateColumns: '56px 1fr 56px' }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* LEFT ARROW — own column, always visible */}
                <button
                  className="cursor-none self-center justify-self-center w-11 h-11 rounded-full border border-white/30 bg-white/10 hover:bg-white/25 hover:border-white/70 text-white text-xl flex items-center justify-center transition-all duration-150 active:scale-90 select-none shadow-md"
                  style={{ zIndex: 10 }}
                  onClick={() => handleLightboxNav(-1)}
                  aria-label="Previous image"
                >
                  ←
                </button>

                {/* IMAGE — center column, constrained */}
                <div className="relative flex items-center justify-center min-h-0 py-3 overflow-hidden">
                  <img
                    key={lightboxImages[activeImageIndex]}
                    src={lightboxImages[activeImageIndex]}
                    alt="Gallery View"
                    loading="eager"
                    decoding="async"
                    className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl"
                    style={{ transition: 'opacity 0.2s ease', display: 'block' }}
                  />
                  {/* Counter badge */}
                  <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-blue-300 bg-blue-950/70 border border-blue-800/40 py-1 px-3 rounded-full text-[10px] font-mono">
                    {activeImageIndex + 1} / {lightboxImages.length}
                  </span>
                </div>

                {/* RIGHT ARROW — own column, always visible */}
                <button
                  className="cursor-none self-center justify-self-center w-11 h-11 rounded-full border border-white/30 bg-white/10 hover:bg-white/25 hover:border-white/70 text-white text-xl flex items-center justify-center transition-all duration-150 active:scale-90 select-none shadow-md"
                  style={{ zIndex: 10 }}
                  onClick={() => handleLightboxNav(1)}
                  aria-label="Next image"
                >
                  →
                </button>
              </div>

              {/* ── Thumbnail filmstrip — lazy loaded ── */}
              <div className="flex-shrink-0 px-3 pb-3 overflow-x-auto" style={{scrollbarWidth:'thin', scrollbarColor:'#334155 transparent'}}>
                <div className="flex gap-1.5" style={{ minWidth: 'max-content' }}>
                  {lightboxImages.map((src, idx) => (
                    <button
                      key={idx}
                      className={`cursor-none flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-150 ${
                        idx === activeImageIndex
                          ? 'border-blue-500 scale-105 shadow-[0_0_10px_#0066ff70]'
                          : 'border-white/10 opacity-40 hover:opacity-70 hover:border-white/30'
                      }`}
                      onClick={() => setActiveImageIndex(idx)}
                    >
                      <img
                        src={src}
                        alt={`thumb-${idx}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
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

// ==========================================================================
// macOS INTERACTIVE DOCK NAVIGATION (Rules-of-Hooks Compliant Component)
// ==========================================================================
const Dock = ({ 
  currentRoute,
  setCurrentRoute, 
  setIsControlCenterOpen, 
  playSpatialClick, 
  triggerDynamicIsland, 
  locale, 
  handleCursorHover 
}) => {
  const dockRef = useRef(null);
  const [scales, setScales] = useState([1, 1, 1, 1, 1, 1]);
  const [bouncingIndex, setBouncingIndex] = useState(null);
  
  const handleMouseMove = (e) => {
    // Only calculate magnification on desktop/hoverable screens
    if (window.innerWidth < 768) return;
    if (!dockRef.current) return;
    const icons = dockRef.current.querySelectorAll('.dock-icon-wrapper');
    const mouseX = e.clientX;
    
    const newScales = [];
    for (let i = 0; i < icons.length; i++) {
      const rect = icons[i].getBoundingClientRect();
      const iconCenterX = rect.left + rect.width / 2;
      const distance = Math.abs(mouseX - iconCenterX);
      
      const maxDistance = 140;
      let scale = 1;
      if (distance < maxDistance) {
        scale = 1 + 0.55 * (1 - distance / maxDistance);
      }
      newScales.push(scale);
    }
    setScales(newScales);
  };
  
  const handleMouseLeave = () => {
    setScales([1, 1, 1, 1, 1, 1]);
  };
  
  const handleIconClick = (idx, item, e) => {
    e.preventDefault();
    playSpatialClick(e);
    
    setBouncingIndex(idx);
    setTimeout(() => {
      setBouncingIndex(null);
    }, 850);

    setTimeout(() => {
      if (item.action) {
        item.action();
      } else if (item.route) {
        setCurrentRoute(item.route);
        triggerDynamicIsland(locale === 'id' ? `📍 Navigasi ke ${item.label}` : `📍 Navigated to ${item.label}`);
      }
    }, 200);
  };

  // Premium Custom macOS App Icons (built from pure SVGs and glowing gradients)
  const dockItems = [
    { 
      label: 'Home', 
      route: 'home',
      icon: (scale) => (
        <div className="w-full h-full rounded-xl md:rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center shadow-md shadow-orange-500/10 border border-orange-400/20 group-hover:shadow-orange-500/30 transition-all duration-300">
          <svg className="w-[50%] h-[50%] text-white filter drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.35)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
      )
    },
    { 
      label: 'Campaigns', 
      route: 'campaigns',
      icon: (scale) => (
        <div className="w-full h-full rounded-xl md:rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 flex items-center justify-center shadow-md shadow-sky-500/10 border border-sky-400/20 group-hover:shadow-sky-500/30 transition-all duration-300">
          <svg className="w-[50%] h-[50%] text-white filter drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.35)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )
    },
    { 
      label: 'Engine', 
      route: 'engine',
      icon: (scale) => (
        <div className="w-full h-full rounded-xl md:rounded-2xl bg-gradient-to-br from-[#1d1d1f] via-[#2c2c2e] to-[#0c0c0e] flex items-center justify-center shadow-md border border-neutral-700/30 group-hover:shadow-neutral-500/20 transition-all duration-300">
          <svg className="w-[52%] h-[52%] text-purple-400 animate-[spin_10s_linear_infinite] filter drop-shadow-[0_0_6px_rgba(168,85,247,0.7)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      )
    },
    { 
      label: 'Budget', 
      route: 'calculator',
      icon: (scale) => (
        <div className="w-full h-full rounded-xl md:rounded-2xl bg-gradient-to-br from-pink-500 via-fuchsia-600 to-indigo-600 flex items-center justify-center shadow-md shadow-pink-500/10 border border-pink-400/20 group-hover:shadow-pink-500/30 transition-all duration-300">
          <svg className="w-[50%] h-[50%] text-white filter drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.35)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-4m-3 2h.01M9 17h.01M9 14h.01M12 11h.01M12 14h.01M12 17h.01M15 11h.01M15 14h.01M15 17h.01M9 11h.01M9 14h.01M9 17h.01M5 19V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2z" />
          </svg>
        </div>
      )
    },
    { 
      label: 'Bio', 
      route: 'bio',
      icon: (scale) => (
        <div className="w-full h-full rounded-xl md:rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 flex items-center justify-center shadow-md shadow-emerald-500/10 border border-emerald-400/20 group-hover:shadow-emerald-500/30 transition-all duration-300">
          <svg className="w-[50%] h-[50%] text-white filter drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.35)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      )
    },
    { 
      label: 'Controls', 
      action: () => setIsControlCenterOpen(prev => !prev),
      icon: (scale) => (
        <div className="w-full h-full rounded-xl md:rounded-2xl bg-gradient-to-br from-slate-400 via-slate-500 to-zinc-600 flex items-center justify-center shadow-md border border-slate-400/20 group-hover:shadow-slate-400/30 transition-all duration-300">
          <svg className="w-[50%] h-[50%] text-white filter drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.35)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
      )
    }
  ];
  
  return (
    <div 
      ref={dockRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[4000] flex items-end gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-white/15 dark:bg-black/20 backdrop-blur-3xl border border-white/25 dark:border-white/10 rounded-2xl md:rounded-3xl select-none pointer-events-auto w-auto"
      style={{
        boxShadow: '0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.2)'
      }}
    >
      {dockItems.map((item, idx) => {
        const isActive = item.route && currentRoute === item.route;
        
        return (
          <div key={idx} className="dock-icon-wrapper relative group flex-none flex flex-col items-center">
            {/* Tooltip — desktop only */}
            <div className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-gray-900/95 dark:bg-white/95 text-white dark:text-black font-mono text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 shadow-lg border border-white/10 dark:border-black/5 whitespace-nowrap z-[4001] hidden md:block">
              {item.label}
            </div>
            
            <a 
              href="#"
              onClick={(e) => handleIconClick(idx, item, e)}
              onMouseEnter={() => handleCursorHover(true, item.label.toUpperCase())}
              onMouseLeave={() => handleCursorHover(false)}
              className={`cursor-none flex items-center justify-center transition-all duration-150 ease-out origin-bottom rounded-[10px] md:rounded-[14px] w-9 h-9 md:w-10 md:h-10 ${
                bouncingIndex === idx ? 'animate-dockBounce' : ''
              } ${isActive ? 'ring-1 ring-white/30 dark:ring-white/20' : ''}`}
              style={{
                width: window.innerWidth >= 768 ? `${40 * scales[idx]}px` : '36px',
                height: window.innerWidth >= 768 ? `${40 * scales[idx]}px` : '36px',
                transformOrigin: 'center bottom'
              }}
            >
              {item.icon(scales[idx])}
            </a>

            {/* Active indicator dot */}
            <div 
              className={`w-[5px] h-[5px] rounded-full mt-1 transition-all duration-300 ${
                isActive ? 'opacity-80 scale-100 bg-neutral-700 dark:bg-white' : 'opacity-0 scale-0'
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};
