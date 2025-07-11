"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart, Menu, X, Search } from "lucide-react";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Produits", href: "/products" },
  { label: "À propos", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Header: React.FC = () => {
  const [openNav, setOpenNav] = useState(false);
  const pathname = usePathname();
  const { cart } = useCart();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl text-red-600">
            BANI
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-red-600 ${
                  pathname === item.href
                    ? "text-red-600 font-medium"
                    : "text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Bouton recherche - visible uniquement sur desktop */}
            <button
              className="hidden md:block text-gray-700 hover:text-red-600"
              aria-label="Rechercher"
            >
              <Search className="h-6 w-6" />
            </button>

            {/* Panier - toujours visible */}
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-red-600"
            >
              <ShoppingCart className="h-6 w-6" />
              {cart.count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                  {cart.count}
                </span>
              )}
            </Link>

            {/* Bouton Menu Mobile */}
            <button
              onClick={() => setOpenNav(!openNav)}
              className="md:hidden text-gray-700 hover:text-red-600"
              aria-label="Menu"
            >
              {openNav ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {openNav && (
          <nav className="md:hidden mt-4 pb-2">
            <ul className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block py-2 ${
                      pathname === item.href
                        ? "text-red-600 font-medium"
                        : "text-gray-700"
                    }`}
                    onClick={() => setOpenNav(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {/* Ajout de la recherche dans le menu mobile */}
              <li>
                <button
                  className="flex items-center py-2 text-gray-700"
                  onClick={() => {
                    /* Logique de recherche */
                  }}
                >
                  <Search className="h-5 w-5 mr-2" />
                  <span>Rechercher</span>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;