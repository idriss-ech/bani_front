"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const services = [
  {
    id: 1,
    title: "Commandes personnalisées",
    description:
      "Service de commande sur mesure pour les écoles, entreprises et particuliers avec des besoins spécifiques.",
    icon: (
      <svg
        className="w-10 h-10 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1707301280425-475534ec3cc1",
    badge: "Service en magasin",
  },
  {
    id: 2,
    title: "Préparation de listes scolaires",
    description:
      "Envoyez-nous votre liste scolaire et récupérez un pack complet prêt à l'emploi pour la rentrée.",
    icon: (
      <svg
        className="w-10 h-10 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1631173716529-fd1696a807b0",
    badge: "Idéal pour la rentrée",
  },
  {
    id: 3,
    title: "Livraison express",
    description:
      "Service de livraison le jour même disponible dans Paris et sa petite couronne.",
    icon: (
      <svg
        className="w-10 h-10 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1740842028123-56fd319de33a",
    badge: "Livraison sous 24h",
  },
  {
    id: 4,
    title: "Personnalisation de matériel",
    description:
      "Service de personnalisation avec nom/prénom pour cartables, trousses et accessoires.",
    icon: (
      <svg
        className="w-10 h-10 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1650402268468-7526b2502a04",
    badge: "Personnalisation unique",
  },
];

const ServicesSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(services[0]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Éléments décoratifs en arrière-plan */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-red-50 opacity-70"></div>
        <div className="absolute bottom-12 -left-32 w-64 h-64 rounded-full bg-indigo-50 opacity-70"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-red-600 uppercase tracking-wider font-medium text-sm mb-2 block">
            Services professionnels
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
            Nos services sur mesure
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            BANI offre une gamme complète de services pour répondre à tous vos
            besoins en matière de fournitures scolaires et de bureau
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div
            className={`lg:col-span-6 transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="flex flex-col space-y-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 border ${
                    activeService.id === service.id
                      ? "bg-white shadow-lg border-l-4 border-red-600 transform scale-105"
                      : hoveredId === service.id
                      ? "bg-white/80 shadow-md border-transparent"
                      : "hover:bg-white/60 border-transparent"
                  }`}
                  onClick={() => setActiveService(service)}
                  onMouseEnter={() => setHoveredId(service.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="flex items-start">
                    <div
                      className={`flex-shrink-0 mr-4 p-3 rounded-lg ${
                        activeService.id === service.id
                          ? "bg-red-50"
                          : "bg-gray-50"
                      } transition-colors duration-300`}
                    >
                      {service.icon}
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                          activeService.id === service.id
                            ? "text-red-600"
                            : "text-gray-800"
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`lg:col-span-6 transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative h-96 md:h-[480px] rounded-2xl shadow-xl overflow-hidden">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    activeService.id === service.id
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out transform scale-105 hover:scale-110"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8">
                    <h4 className="text-white font-bold text-2xl mb-3 drop-shadow-md">
                      {service.title}
                    </h4>
                    <p className="text-white/90 max-w-md drop-shadow-md">
                      {service.description}
                    </p>

                    {/* Badge informatif non cliquable à la place du bouton */}
                    <div className="mt-6 inline-flex items-center gap-2">
                      <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full font-medium border border-white/30 shadow-lg">
                        {service.badge}
                      </span>
                      <span className="bg-red-600 text-white px-4 py-2 rounded-full font-medium shadow-md flex items-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Renseignez-vous en magasin
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
