"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Images du carrousel avec textes
const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    alt: "Fournitures scolaires",
    title: "Prêt pour la rentrée",
    subtitle: "Tous les essentiels pour une année scolaire réussie",
    buttonText: "Découvrir",
    buttonLink: "/products",
  },
  {
    image:
      "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    alt: "Élève avec sac à dos",
    title: "Promotions spéciales",
    subtitle: "Jusqu'à -30% sur une sélection de cartables et sacs",
    buttonText: "En profiter",
    buttonLink: "/products?on_sale=true",
  },
  {
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    alt: "Pile de livres",
    title: "Livres et manuels",
    subtitle: "Trouvez tous vos ouvrages de référence",
    buttonText: "Voir plus",
    buttonLink: "/products?category=livres",
  },
];

const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const slidesCount = slides.length;

  // Passer à la diapositive suivante
  const nextSlide = () => {
    setCurrent((current + 1) % slidesCount);
  };

  // Passer à la diapositive précédente
  const prevSlide = () => {
    setCurrent((current - 1 + slidesCount) % slidesCount);
  };

  // Aller à une diapositive spécifique
  const goToSlide = (slideIndex: number) => {
    setCurrent(slideIndex);
  };

  // Défilement automatique
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Define the slide advancement function inside the effect
    const advanceSlide = () => {
      setCurrent((prevCurrent) => (prevCurrent + 1) % slidesCount);
    };

    timeoutRef.current = setTimeout(advanceSlide, 5000); // Changer de slide toutes les 5 secondes

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [current, slidesCount]); // Add slidesCount to dependencies

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative h-[350px] sm:h-[400px] md:h-[500px] lg:h-[550px] w-full overflow-hidden rounded-2xl shadow-lg">
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out ${
                index === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Image avec overlay */}
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 rounded-2xl" />
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                  className="object-cover rounded-2xl"
                  priority={index === 0}
                />
              </div>

              {/* Texte et bouton */}
              <div className="absolute inset-0 flex flex-col justify-center px-12 sm:px-16 md:px-20 lg:px-24 z-20">
                <div className="max-w-xl mx-2 md:mx-0">
                  <h2
                    className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4"
                    style={{
                      opacity: index === current ? 1 : 0,
                      transform:
                        index === current
                          ? "translateY(0)"
                          : "translateY(20px)",
                      transition:
                        "opacity 700ms ease-in-out 300ms, transform 700ms ease-in-out 300ms",
                      textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    {slide.title}
                  </h2>
                  <p
                    className="text-white/90 text-base sm:text-lg md:text-xl mb-4 md:mb-6 max-w-md"
                    style={{
                      opacity: index === current ? 1 : 0,
                      transform:
                        index === current
                          ? "translateY(0)"
                          : "translateY(20px)",
                      transition:
                        "opacity 700ms ease-in-out 500ms, transform 700ms ease-in-out 500ms",
                      textShadow: "0 1px 1px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    {slide.subtitle}
                  </p>
                  <div
                    style={{
                      opacity: index === current ? 1 : 0,
                      transform:
                        index === current
                          ? "translateY(0)"
                          : "translateY(20px)",
                      transition:
                        "opacity 700ms ease-in-out 700ms, transform 700ms ease-in-out 700ms",
                    }}
                  >
                    <Link href={slide.buttonLink}>
                      <span className="inline-block bg-red-600 hover:bg-red-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-md font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg">
                        {slide.buttonText}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Flèches de navigation */}
          <button
            className="absolute top-1/2 left-3 sm:left-5 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-2 sm:p-3 backdrop-blur-sm z-30 transition-all duration-300 shadow-lg"
            onClick={prevSlide}
            aria-label="Slide précédente"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
          <button
            className="absolute top-1/2 right-3 sm:right-5 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-2 sm:p-3 backdrop-blur-sm z-30 transition-all duration-300 shadow-lg"
            onClick={nextSlide}
            aria-label="Slide suivante"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>

          {/* Indicateurs */}
          <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center space-x-2 z-30">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 sm:h-3 rounded-full transition-all duration-300 shadow-md ${
                  index === current
                    ? "bg-red-600 w-6 sm:w-8"
                    : "bg-white/60 hover:bg-white w-2 sm:w-3"
                }`}
                aria-label={`Aller à la slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Ajoutez ce style global à votre fichier CSS global ou ici en tant que classe utilitaire

export default HeroSlider;
