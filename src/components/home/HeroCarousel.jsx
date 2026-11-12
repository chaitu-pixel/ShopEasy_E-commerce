"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    eyebrow: "New arrivals",
    title: "Upgrade Your",
    accent: "Everyday Style.",
    description: "Discover fresh fashion, thoughtful essentials and standout pieces for every day.",
    image: "/images/shopeasy-hero.png",
    primary: "Shop Now",
    secondary: "Explore Collections",
  },
  {
    eyebrow: "Technology made simple",
    title: "Smart Picks",
    accent: "Better Living.",
    description: "Explore useful tech and everyday gadgets selected to make life easier.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=85",
    primary: "Explore Electronics",
    secondary: "View Products",
  },
  {
    eyebrow: "Seasonal favourites",
    title: "Find Your",
    accent: "Next Favourite.",
    description: "Beautiful finds across fashion, home, beauty and more — all in one place.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=85",
    primary: "Shop the Collection",
    secondary: "See All Products",
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setActive((current) => (current + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);
  const slide = slides[active];
  const move = (direction) => setActive((current) => (current + direction + slides.length) % slides.length);

  return (
    <section className="relative isolate min-h-[440px] overflow-hidden rounded-3xl bg-[#f3eaff] sm:min-h-[470px]" aria-roledescription="carousel" aria-label="ShopEasy featured collections">
      <Image src={slide.image} alt="ShopEasy featured collection" fill priority={active === 0} unoptimized sizes="100vw" className="object-cover object-center transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#fbf7ff] via-[#f4eaff]/95 to-[#f4eaff]/10" />
      <div className="relative z-10 flex min-h-[440px] max-w-2xl flex-col justify-center px-6 py-12 sm:min-h-[470px] sm:px-10 lg:px-14">
        <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.23em] text-violet-700">✧ {slide.eyebrow}</p>
        <h1 className="max-w-xl font-serif text-4xl font-bold leading-[1.04] tracking-tight text-[#28104f] sm:text-5xl lg:text-6xl">{slide.title}<span className="block italic text-violet-700">{slide.accent}</span></h1>
        <p className="mt-5 max-w-md text-sm leading-6 text-slate-700 sm:text-base">{slide.description}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/products" className="rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-violet-700">{slide.primary} →</Link>
          <Link href="/products" className="rounded-full border border-violet-200 bg-white/80 px-6 py-3 text-sm font-semibold text-violet-700 hover:bg-white">{slide.secondary}</Link>
        </div>
        <div className="mt-9 grid max-w-lg grid-cols-3 gap-3 border-t border-violet-200/80 pt-5">
          <div><p className="text-xs font-bold text-violet-700">♧ Free Shipping</p><p className="mt-1 text-[10px] text-slate-500">On eligible orders</p></div>
          <div><p className="text-xs font-bold text-violet-700">◇ Secure Payment</p><p className="mt-1 text-[10px] text-slate-500">Safe & secure</p></div>
          <div><p className="text-xs font-bold text-violet-700">◎ 24/7 Support</p><p className="mt-1 text-[10px] text-slate-500">Here to help</p></div>
        </div>
      </div>
      <button type="button" onClick={() => move(-1)} aria-label="Previous slide" className="absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/90 text-violet-800 shadow-lg hover:bg-white"><ChevronLeft /></button>
      <button type="button" onClick={() => move(1)} aria-label="Next slide" className="absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/90 text-violet-800 shadow-lg hover:bg-white"><ChevronRight /></button>
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2" role="group" aria-label="Choose slide">
        {slides.map((item, index) => <button key={item.eyebrow} type="button" onClick={() => setActive(index)} aria-label={`Go to slide ${index + 1}`} aria-pressed={active === index} className={`h-2.5 rounded-full transition-all ${active === index ? "w-8 bg-violet-700" : "w-2.5 bg-violet-300"}`} />)}
      </div>
      <span className="absolute bottom-5 right-6 z-10 hidden rounded-full bg-[#28104f]/90 px-4 py-2 text-[10px] tracking-widest text-white sm:block">0{active + 1} — 03</span>
    </section>
  );
}
