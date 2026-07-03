import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { testimonials } from "../../data/content";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="What clients say."
          description="Feedback from product leaders across healthcare, SaaS, and fintech."
          align="center"
        />

        <div className="relative mt-16">
          <button
            type="button"
            className="testimonials-prev absolute left-0 md:-left-5 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 shadow-lg hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={16} className="md:hidden" />
            <ChevronLeft size={18} className="hidden md:block" />
          </button>

          <button
            type="button"
            className="testimonials-next absolute right-0 md:-right-5 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 shadow-lg hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
            aria-label="Next testimonials"
          >
            <ChevronRight size={16} className="md:hidden" />
            <ChevronRight size={18} className="hidden md:block" />
          </button>

          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 5500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={{ prevEl: ".testimonials-prev", nextEl: ".testimonials-next" }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1100: { slidesPerView: 3 },
            }}
            className="!pb-14"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={`${t.name}-${t.review.slice(0, 12)}`} className="h-auto">
                <div className="h-full min-h-[22rem] md:min-h-[24rem] flex flex-col rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-7">
                  <Quote className="text-[#2563EB]/30 mb-4" size={30} />
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-[#14B8A6] text-[#14B8A6]" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
                    "{t.review}"
                  </p>
                  <div className="mt-6 flex items-center gap-3 pt-5 border-t border-slate-100 dark:border-slate-700">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white font-display font-bold text-sm">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</p>
                      <p className="text-xs text-slate-400">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
