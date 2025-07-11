"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Données des témoignages
const testimonials = [
  {
    id: 1,
    name: "Marie Dupont",
    role: "Enseignante",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    content:
      "J'achète toutes mes fournitures chez BANI depuis 5 ans. La qualité des produits et le service client sont exceptionnels. Je recommande vivement pour tous les enseignants !",
    rating: 5,
    accent: "#FF5A5F",
  },
  {
    id: 2,
    name: "Thomas Martin",
    role: "Étudiant",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    content:
      "Leurs sacs à dos sont vraiment durables. J'ai acheté le mien il y a 3 ans et il est toujours comme neuf malgré une utilisation quotidienne intensive.",
    rating: 4,
    accent: "#00A699",
  },
  {
    id: 3,
    name: "Sophia Benali",
    role: "Parent d'élève",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    content:
      "La liste scolaire de mes enfants est toujours complète et prête en quelques clics. Le service de livraison est rapide et les prix sont compétitifs. Merci BANI !",
    rating: 5,
    accent: "#6C5CE7",
  },
  {
    id: 4,
    name: "Lucas Moreau",
    role: "Directeur d'école",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    content:
      "Notre établissement collabore avec BANI pour équiper nos classes. Leur catalogue est complet et les commandes en gros sont traitées efficacement.",
    rating: 5,
    accent: "#F39C12",
  },
];

const Testimonials: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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
    const currentElement = sectionRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      // Use the stored value in the cleanup function
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  // Auto rotation des témoignages
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Navigation contrôlée
  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Fonction pour afficher les étoiles
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return (
      <div className="flex mt-3 justify-center md:justify-start">{stars}</div>
    );
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Arrière-plan abstrait et moderne */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 overflow-hidden">
        {/* Formes décoratives animées */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-50 rounded-full filter blur-3xl opacity-50 transform translate-x-1/3 -translate-y-1/3 animate-float-slow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full filter blur-3xl opacity-40 transform -translate-x-1/3 translate-y-1/3 animate-float-slow-reverse"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-amber-50 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>

        {/* Motif géométrique */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block">
            <span className="bg-red-100 text-red-800 text-xs font-medium py-1 px-3 rounded-full mb-4 inline-block">
              Plus de 500 avis clients
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
            Ce que nos clients disent
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Découvrez les avis de nos clients satisfaits qui nous font confiance
            pour leurs fournitures scolaires et de bureau
          </p>
        </div>

        <div className="relative mt-20">
          {/* Effet de carte 3D avec ombre - Gradient amélioré */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-red-50 via-white to-red-50 transform -skew-y-1 -rotate-1 shadow-lg"></div>

          {/* Contenu de la carte et témoignages */}
          <div className="relative bg-white rounded-2xl shadow-xl p-4 md:p-0 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Colonne image - Style innovant */}
              <div
                className="relative h-80 md:h-auto overflow-hidden"
                style={{
                  backgroundColor: activeTestimonial.accent + "10",
                }}
              >
                <div className="hidden md:block absolute -right-10 h-full w-20 bg-gradient-to-l from-white to-transparent z-10"></div>

                <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
                  <div className="relative w-full max-w-md">
                    {/* Cercle décoratif autour de l'image */}
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-30 animate-pulse-slow"
                      style={{
                        backgroundColor: activeTestimonial.accent + "30",
                      }}
                    ></div>

                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-20 animate-pulse-slow-reverse"
                      style={{
                        backgroundColor: activeTestimonial.accent + "40",
                      }}
                    ></div>

                    {/* Image avec animation de transition */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTestimonial.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                        className="relative flex items-center justify-center"
                      >
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                          <Image
                            src={activeTestimonial.image}
                            alt={activeTestimonial.name}
                            fill
                            className="object-cover"
                            sizes="128px"
                            priority
                          />
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Formes décoratives */}
                    <div
                      className="absolute top-5 left-0 w-16 h-16 rounded-full opacity-20"
                      style={{
                        backgroundColor: activeTestimonial.accent + "30",
                      }}
                    ></div>
                    <div
                      className="absolute bottom-10 right-0 w-12 h-12 rounded-full opacity-20"
                      style={{
                        backgroundColor: activeTestimonial.accent + "50",
                      }}
                    ></div>
                  </div>
                </div>

                {/* Motif moderne en arrière-plan */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='84' height='48' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>

              {/* Colonne contenu */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial.id}
                    initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col h-full"
                  >
                    {/* Icône guillemets stylisée */}
                    <div className="flex justify-center md:justify-start mb-6">
                      <div
                        className="rounded-full p-2 flex items-center justify-center w-10 h-10"
                        style={{
                          backgroundColor: activeTestimonial.accent + "20",
                        }}
                      >
                        <svg
                          className="w-5 h-5"
                          style={{ color: activeTestimonial.accent }}
                          fill="currentColor"
                          viewBox="0 0 32 32"
                          aria-hidden="true"
                        >
                          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                        </svg>
                      </div>
                    </div>

                    {/* Contenu du témoignage avec style moderne */}
                    <div className="flex-grow">
                      <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-6">
                        {activeTestimonial.content}
                      </p>
                    </div>

                    {/* Étoiles d'évaluation */}
                    {renderStars(activeTestimonial.rating)}

                    {/* Informations sur l'auteur avec style amélioré */}
                    <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col items-center md:items-start">
                      <h4 className="font-semibold text-lg text-gray-900">
                        {activeTestimonial.name}
                      </h4>
                      <p
                        className="text-sm font-medium mt-1 uppercase tracking-wider"
                        style={{ color: activeTestimonial.accent }}
                      >
                        {activeTestimonial.role}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Navigation intuitive - Z-index corrigé */}
          <div className="mt-8 flex justify-between items-center relative z-20">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 group border border-gray-100"
              aria-label="Témoignage précédent"
            >
              <svg
                className="w-5 h-5 text-gray-600 group-hover:text-red-600 transform transition-transform group-hover:-translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`relative h-2.5 transition-all duration-300 rounded-full ${
                    index === activeIndex
                      ? "w-8 bg-red-600"
                      : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Voir témoignage ${index + 1}`}
                >
                  {index === activeIndex && (
                    <motion.span
                      className="absolute top-0 left-0 bottom-0 right-0 bg-red-600 rounded-full"
                      layoutId="activeDot"
                    ></motion.span>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 group border border-gray-100"
              aria-label="Témoignage suivant"
            >
              <svg
                className="w-5 h-5 text-gray-600 group-hover:text-red-600 transform transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
