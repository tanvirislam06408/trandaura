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
          width: 10px; height: 10px;
          background: rgba(255,255,255,0.4);
          opacity: 1;
          transition: all 0.3s ease;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          width: 32px;
          border-radius: 5px;
          background: linear-gradient(135deg, #22c55e, #16A34A);
        }
        .hero-swiper .swiper-pagination { bottom: 28px; }
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

        /* ── Text stagger-in per slide ── */
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(25px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .slide-text-badge { animation: slideUp 0.5s ease forwards; }
        .slide-text-title { animation: slideUp 0.6s 0.1s ease forwards; opacity: 0; }
        .slide-text-sub   { animation: slideUp 0.6s 0.2s ease forwards; opacity: 0; }
        .slide-text-cta   { animation: slideUp 0.6s 0.3s ease forwards; opacity: 0; }
        .slide-illustration { animation: fadeIn 0.8s 0.4s ease forwards; opacity: 0; }
      `}</style>

      <section className="w-full overflow-hidden">
        <Swiper
          className="hero-swiper"
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          slidesPerView={1}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
        >
          <SwiperSlide><SlideShoppingLayout /></SwiperSlide>
          <SwiperSlide><SlideDealsLayout /></SwiperSlide>
          <SwiperSlide><SlideDeliveryLayout /></SwiperSlide>
        </Swiper>
      </section>
    </>
  );
}