"use client";
import { useState, useRef, useEffect, useCallback } from "react";

// Données des statistiques
const stats = [
  {
    id: 1,
    value: 15,
    label: "Années d'expérience",
    description: "Au service de nos clients",
    suffix: "+",
  },
  {
    id: 2,
    value: 25,
    label: "Clients satisfaits",
    description: "Milliers de clients fidèles",
    suffix: "k+",
  },
  {
    id: 3,
    value: 8000,
    label: "Produits disponibles",
    description: "Large gamme de fournitures",
    suffix: "+",
  },
  {
    id: 4,
    value: 98,
    label: "Taux de satisfaction",
    description: "Qualité et service client",
    suffix: "%",
  },
];

const StatsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);
  const countersActivated = useRef(false);

  // 1. Memoize startCounters with useCallback
  const startCounters = useCallback(() => {
    stats.forEach((stat, index) => {
      const target = stat.value;
      const duration = 2000; // 2 secondes pour l'animation
      const frameRate = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameRate);
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(easingFn(progress) * target);

        setCounts((prevCounts) => {
          const newCounts = [...prevCounts];
          newCounts[index] = currentCount;
          return newCounts;
        });

        if (frame === totalFrames) {
          clearInterval(counter);
        }
      }, frameRate);
    });
  }, []); // Empty dependency array as stats and easingFn are constants

  // 2. Fix the ref usage in useEffect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!countersActivated.current) {
            startCounters();
            countersActivated.current = true;
          }
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        threshold: 0.2,
      }
    );

    // Store the current ref value in a local variable
    const currentSectionRef = sectionRef.current;

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      // Use the stored ref value in cleanup
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, [startCounters]); // Add startCounters as dependency

  // Fonction d'easing pour une animation plus naturelle
  const easingFn = (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

  // Formatage des grands nombres
  const formatNumber = (num: number) => {
    return num.toString();
  };

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-br from-red-600 via-red-500 to-red-500 py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-10 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white font-poppins tracking-wide">
            BANI en chiffres
          </h2>
          <p className="text-white/90 max-w-3xl mx-auto font-light">
            Des années d&rsquo;expérience et de service pour vous offrir le
            meilleur
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`text-center transition-all duration-300 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <div className="mb-2 text-5xl font-bold text-white font-poppins drop-shadow">
                {formatNumber(counts[index])}
                {stat.suffix}
              </div>
              <div className="mb-1 text-lg font-medium text-white/90 font-poppins">
                {stat.label}
              </div>
              <div className="text-sm text-white/80 font-light">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
