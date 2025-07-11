"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const AboutSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("histoire");
  const sectionRef = useRef<HTMLDivElement>(null);

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
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Données pour les tabs
  const tabContent = {
    histoire: {
      title: "Notre histoire",
      content:
        "Depuis plus de 15 ans, BANI est votre partenaire de confiance pour toutes vos fournitures scolaires et de bureau. Notre histoire a commencé en 2008 dans un petit local à Paris, avec une vision simple : rendre accessible des fournitures de qualité à tous.",
    },
    mission: {
      title: "Notre mission",
      content:
        "Nous nous engageons à fournir des produits respectueux de l'environnement tout en maintenant des prix abordables. Notre mission est de devenir le partenaire incontournable des professionnels et des particuliers pour toutes leurs fournitures.",
    },
    equipe: {
      title: "Notre équipe",
      content:
        "Notre équipe passionnée est composée d'experts du secteur qui partagent tous la même vision: l'excellence du service client. Chaque membre apporte son expertise pour vous conseiller et vous guider vers les meilleurs produits.",
    },
  };

  const features = [
    {
      icon: (
        <svg
          className="w-8 h-8 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Livraison rapide",
      description: "Livraison en 24-48h dans toute la France métropolitaine",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Garantie qualité",
      description:
        "Tous nos produits sont sélectionnés avec soin pour leur durabilité",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
      title: "Paiement sécurisé",
      description: "Transactions 100% sécurisées avec cryptage SSL",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden"
    >
      {/* Éléments décoratifs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-red-50 opacity-70"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-indigo-50 opacity-70"></div>
      <div className="absolute top-1/4 left-1/3 w-8 h-8 rounded-full bg-yellow-300 opacity-20"></div>
      <div className="absolute bottom-1/3 right-1/4 w-12 h-12 rounded-full bg-green-300 opacity-20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* En-tête de section avec animation */}
        <div
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block">
            <span className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full mb-4 inline-block">
              Votre partenaire depuis 2008
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-700 via-red-600 to-red-500">
            Découvrez BANI
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Plus qu'un simple fournisseur, nous sommes votre partenaire de
            confiance pour toutes vos fournitures scolaires et de bureau
          </p>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Colonne gauche avec image en premier */}
          <div
            className={`lg:col-span-6 lg:order-1 order-2 transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
           
            {/* Image simple remplaçant le blob */}
            <div className="relative mt-16 mb-12 max-w-xl mx-auto">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                {/* Image principale avec bordure arrondie */}
                <Image
                  src="https://images.unsplash.com/photo-1512403754473-27835f7b9984"
                  alt="Notre expertise"
                  fill
                  className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 600px"
                />

                {/* Overlay gradient subtil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                {/* Légende en bas */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white font-medium text-lg drop-shadow-md">
                    Notre expertise à votre service
                  </p>
                </div>
              </div>

              {/* Éléments décoratifs conservés */}
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-indigo-100 opacity-60 shadow-sm"></div>
              <div className="absolute -bottom-4 left-10 w-8 h-8 rounded-full bg-red-100 opacity-60 shadow-sm"></div>
              <div className="absolute top-1/4 -left-6 w-14 h-14 rounded-full border-4 border-red-50 opacity-80"></div>
            </div>
          </div>

          {/* Colonne droite avec texte */}
          <div
            className={`lg:col-span-6 lg:order-2 order-1 transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Tabs de navigation */}
            <div className="flex border-b border-gray-200 mb-6">
              {Object.entries(tabContent).map(([key, { title }]) => (
                <button
                  key={key}
                  className={`py-3 px-5 text-sm font-medium border-b-2 transition-colors duration-300 ${
                    activeTab === key
                      ? "border-red-600 text-red-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab(key)}
                >
                  {title}
                </button>
              ))}
            </div>

            {/* Contenu du tab actif */}
            <div className="mb-8 min-h-[180px]">
              <h3 className="text-2xl font-bold mb-4">
                {tabContent[activeTab as keyof typeof tabContent].title}
              </h3>
              <p className="text-gray-600 mb-6">
                {tabContent[activeTab as keyof typeof tabContent].content}
              </p>
              <p className="text-gray-600 mb-6">
                Que vous soyez étudiant, parent, enseignant ou professionnel,
                nous avons tout ce dont vous avez besoin sous un même toit.
                Notre équipe passionnée est là pour vous conseiller et vous
                aider à trouver les produits parfaitement adaptés à vos besoins.
              </p>
            </div>

            {/* Certificats ou reconnaissances */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center bg-gray-100 py-1.5 px-3 rounded-full">
                <svg
                  className="w-5 h-5 text-green-600 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm font-medium">Éco-responsable</span>
              </div>
              <div className="flex items-center bg-gray-100 py-1.5 px-3 rounded-full">
                <svg
                  className="w-5 h-5 text-amber-600 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <span className="text-sm font-medium">Certifié qualité</span>
              </div>
              <div className="flex items-center bg-gray-100 py-1.5 px-3 rounded-full">
                <svg
                  className="w-5 h-5 text-blue-600 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-medium">Ouvert 6j/7</span>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                En savoir plus
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 border border-gray-300 hover:border-red-600 hover:text-red-600 rounded-full font-medium transition-all duration-300 flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Nous contacter
              </Link>
            </div>
          </div>
        </div>

        {/* Nos avantages */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold text-center mb-10">
            Pourquoi nous choisir
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`bg-white p-8 rounded-2xl transition-all duration-500 transform border border-gray-100 ${
                  isVisible
                    ? "opacity-100 translate-y-0 shadow-lg hover:shadow-xl hover:-translate-y-2"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${600 + index * 200}ms`,
                }}
              >
                <div className="bg-red-50 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
