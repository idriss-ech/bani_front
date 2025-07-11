"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchCategories, getStrapiMedia } from "@/services/api";
import { Category } from "@/types"; 

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        // Ajout de logs pour déboguer
        console.log("Démarrage de la requête categories...");

        const response = await fetchCategories();
        console.log("Réponse brute de l'API:", response);

        // Vérifier si response a la structure attendue
        if (!response || typeof response !== "object") {
          console.error("La réponse n'est pas un objet valide:", response);
          setError("Format de réponse invalide");
          return;
        }

        // CORRECTION ICI: La réponse est déjà un tableau, pas besoin de vérifier response.data
        // La structure est directement le tableau d'objets catégories

        // Vérifier si response est un tableau
        if (!Array.isArray(response)) {
          console.error("La réponse n'est pas un tableau:", response);
          setError("Format des données incorrect");
          return;
        }

        console.log(`Nombre de catégories trouvées: ${response.length}`);
        // Utiliser directement response comme tableau de catégories
        setCategories(response);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Chargement des catégories...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        Erreur: {error}. Veuillez réessayer plus tard.
      </div>
    );
  }

  // Log supplémentaire avant de vérifier si le tableau est vide
  console.log("État des catégories avant rendu:", categories);

  if (categories.length === 0) {
    return <div className="text-center py-8">Aucune catégorie trouvée.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link
          href={`/products?category=${category.slug}`}
          key={category.id}
          className="group block"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48 w-full">
              {category.Image ? (
                <Image
                  src={getStrapiMedia(category.Image.url) || ""}
                  alt={category.Image.alternativeText || category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-500 mt-2">
                      Image non disponible
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-gray-600 mt-1 line-clamp-2">
                {category.description || "Découvrez notre sélection"}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
