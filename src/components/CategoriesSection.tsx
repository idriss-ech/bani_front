"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { fetchCategories } from "@/services/api";
import { Category } from "@/types";
import CategoryCard from "./CategoryCard";
import { ChevronRight } from "lucide-react";

const CategoriesSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les catégories depuis Strapi
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchCategories();

        if (Array.isArray(response)) {
          setCategories(response);
        } else {
          console.error("Format de réponse inattendu:", response);
          setError("Erreur lors du chargement des catégories");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  // Animation au défilement
  useEffect(() => {
    if (!loading && categories.length > 0) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);

      return () => clearTimeout(timer);
    }

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

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [loading, categories.length]);

  // Affichage du chargement
  if (loading) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded max-w-md mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-sm"
                >
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-5">
                    <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Affichage des erreurs
  if (error) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600">
            {error}. Veuillez rafraîchir la page ou réessayer plus tard.
          </p>
        </div>
      </section>
    );
  }

  // Si aucune catégorie n'est trouvée
  if (categories.length === 0) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Nos catégories
          </h2>
          <p className="text-gray-600 mb-8">
            Aucune catégorie n&rsquo;est disponible pour le moment. Veuillez
            revenir plus tard.
          </p>
        </div>
      </section>
    );
  }

  // Limiter à 8 catégories maximum
  const displayedCategories = categories.slice(0, 8);
  const hasMoreCategories = categories.length > 8;

  return (
    <section ref={sectionRef} className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Titre et description avec animation */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in">
            Nos catégories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tout pour l&rsquo;école, les études et la lecture dans notre
            sélection complète de produits
          </p>
        </div>

        {/* Grille de catégories avec animation */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } transition-all duration-700 ease-out`}
        >
          {displayedCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Bouton "Voir toutes les catégories" */}
        {hasMoreCategories && (
          <div className="mt-12 text-center">
            <Link
              href="/categories"
              className="inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Voir toutes les catégories
              <ChevronRight className="ml-1.5 w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
