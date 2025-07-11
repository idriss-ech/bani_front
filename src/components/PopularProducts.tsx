"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { fetchPopularProducts } from '@/services/api';
import ProductCard from './ProductCard';
import { Product } from '@/types';

const PopularProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Récupérer les produits populaires depuis l'API
  useEffect(() => {
    const getPopularProducts = async () => {
      try {
        setLoading(true);
        const response = await fetchPopularProducts(4);
        
        if (response && response.data) {
          console.log("Produits populaires récupérés:", response.data);
          setProducts(response.data);
        } else {
          console.error("Format de réponse inattendu:", response);
          setError("Impossible de récupérer les produits populaires");
        }
      } catch (err) {
        console.error("Erreur lors du chargement des produits:", err);
        setError("Erreur lors du chargement des produits populaires");
      } finally {
        setLoading(false);
      }
    };

    getPopularProducts();
  }, []);

  // Observer d'intersection pour l'animation avec solution de secours
  useEffect(() => {
    // Solution de secours: forcer isVisible à true après un délai
    const fallbackTimer = setTimeout(() => {
      if (!isVisible) {
        console.log("Activation du fallback pour isVisible");
        setIsVisible(true);
      }
    }, 1000); // 1 seconde d'attente

    // Configuration de l'IntersectionObserver standard
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("Section détectée comme visible");
          setIsVisible(true);
          observer.unobserve(entry.target);
          clearTimeout(fallbackTimer); // Nettoyer le timer si l'observer fonctionne
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
      
      // Vérifier si l'élément est déjà visible
      const rect = sectionRef.current.getBoundingClientRect();
      const isInViewport = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
      
      if (isInViewport) {
        console.log("La section est déjà visible au chargement");
        setIsVisible(true);
        clearTimeout(fallbackTimer);
      }
    }

    return () => {
      clearTimeout(fallbackTimer);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  // Affichage du squelette de chargement
  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <div className="h-10 bg-gray-200 rounded-md w-64 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-md w-48 animate-pulse"></div>
            </div>
            <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse mt-4 md:mt-0"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-5">
                  <div className="h-3 bg-gray-200 rounded-md w-1/3 mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-1/4 mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded-md w-1/2 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded-md w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Affichage de l'erreur
  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Nos produits populaires</h2>
            <p className="text-red-600 mt-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors duration-300"
            >
              Réessayer
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Si aucun produit n'est disponible
  if (products.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Nos produits populaires</h2>
            <p className="text-gray-600 mt-4">
              Aucun produit populaire n&apos;est disponible actuellement. Consultez notre catalogue complet.
            </p>
            <Link 
              href="/products" 
              className="inline-block mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors duration-300"
            >
              Voir tous les produits
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Forcer l'opacité à 100% et la traduction à 0 si toujours invisible après 2 secondes */}
        <div style={{ opacity: loading ? 0 : 1 }} className={`flex flex-col md:flex-row justify-between items-center mb-10 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Nos produits populaires</h2>
            <p className="text-gray-600">Découvrez nos meilleures ventes et nouveautés</p>
          </div>
          <Link href="/products" className="mt-4 md:mt-0 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors duration-300 flex items-center gap-2">
            Voir tout
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              delay={150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;