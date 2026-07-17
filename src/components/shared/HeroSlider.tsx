"use client";

import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import SlideShoppingLayout from "@/components/slides/SlideShoppingLayout";
import SlideDealsLayout from "@/components/slides/SlideDealsLayout";
import SlideDeliveryLayout from "@/components/slides/SlideDeliveryLayout";

export default function HeroSlider() {
  return (
    <>
      <style>{`
        /* ── Pagination dots ── */
        .hero-swiper .swiper-pagination-bullet {
          width: 8px; height: 8px;
          background: rgba(255,255,255,0.35);
          opacity: 1;
          transition: all 0.3s ease;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          width: 28px;
          border-radius: 4px;
          background: #22c55e;
        }
        .hero-swiper .swiper-pagination { bottom: 24px; }
        .hero-swiper { width: 100%; }

        /* ── Hide inactive slides so they don't bleed through ── */
        .hero-swiper .swiper-slide {
          pointer-events: none;
          visibility: hidden;
        }
        .hero-swiper .swiper-slide-active {
          pointer-events: auto;
          visibility: visible;
        }

        /* ── Float animations (used per slide) ── */
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-18px) rotate(2deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50%       { transform: translateY(-22px) rotate(1.5deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-15px) scale(1.03); }
        }
        .animate-float-1 { animation: float1 5s   ease-in-out infinite; }
        .animate-float-2 { animation: float2 6s   ease-in-out infinite; }
        .animate-float-3 { animation: float3 4.5s ease-in-out infinite; }

        /* ── Text stagger-in per slide ── */
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .slide-text-badge { animation: slideUp 0.55s          ease forwards; }
        .slide-text-title { animation: slideUp 0.65s 0.10s    ease forwards; opacity: 0; }
        .slide-text-sub   { animation: slideUp 0.65s 0.20s    ease forwards; opacity: 0; }
        .slide-text-cta   { animation: slideUp 0.65s 0.30s    ease forwards; opacity: 0; }
      `}</style>

      <section className="w-full overflow-hidden ">
        <Swiper
          className="hero-swiper"
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
        >
          <SwiperSlide><SlideShoppingLayout /></SwiperSlide>
          <SwiperSlide><SlideDealsLayout /></SwiperSlide>
          {/* <SwiperSlide><SlideDeliveryLayout /></SwiperSlide> */}
        </Swiper>
      </section>
    </>
  );
}