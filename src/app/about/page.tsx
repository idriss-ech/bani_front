"use client";

import React from "react";
import { Book, PenTool, Users, Leaf, Award, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* En-tête de la page */}
    <header className="relative bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white py-20 md:py-28 shadow-lg">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1747792607295-ada93d1b320c?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Librairie BANI"
          className="w-full h-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-red-700/80 to-red-600/10" />
      </div>
      <div className="relative container mx-auto px-4 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <Book className="h-10 w-10 text-white drop-shadow-lg" />
            <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">À Propos de BANI</h1>
          </div>
          <p className="text-lg md:text-2xl max-w-2xl text-center font-medium drop-shadow">
            Votre partenaire privilégié dans le monde de l&apos;éducation et du savoir depuis 2010
          </p>
          <div className="mt-6 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Professeur Brahim"
                className="w-12 h-12 rounded-full border-2 border-white shadow"
              />
              <span className="font-semibold text-white text-lg">Prof. Brahim</span>
              <span className="text-white/80 text-sm">Fondateur &amp; Enseignant</span>
            </div>
            <span className="text-white/70 text-xs">“L&apos;éducation est la clé de tous les possibles.”</span>
          </div>
        </div>
      </div>
    </header>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Notre Passion */}
          <section className="p-8 md:p-10 border-b border-gray-100">
            <div className="flex items-center mb-6">
              <Book className="h-8 w-8 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Notre Passion pour l&apos;Apprentissage</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Bienvenue chez BANI, votre partenaire privilégié dans le monde de l&apos;éducation et du savoir. Depuis notre création en 2010, nous nous sommes donné une mission claire : fournir les meilleurs outils pour favoriser l&apos;apprentissage, la créativité et la réussite scolaire et professionnelle.
            </p>
            <p className="text-gray-600">
              Notre librairie n&apos;est pas simplement un commerce, mais un lieu où se rencontrent idées, connaissances et potentiel. Chaque stylo, chaque livre, chaque cahier que nous proposons est sélectionné avec soin pour vous accompagner dans votre parcours éducatif.
            </p>
          </section>

          {/* Notre Histoire */}
          <section className="p-8 md:p-10 border-b border-gray-100">
            <div className="flex items-center mb-6">
              <PenTool className="h-8 w-8 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Notre Histoire</h2>
            </div>
            <p className="text-gray-600 mb-4">
              L&apos;aventure BANI a commencé avec deux passionnés d&apos;éducation, Brahim et Amina, dont les initiales ont donné naissance à notre nom. Enseignants de formation, ils ont constaté un besoin croissant d&apos;accès à des fournitures scolaires de qualité qui inspirent et facilitent l&apos;apprentissage.
            </p>
            <p className="text-gray-600">
              Ce qui a débuté comme une petite boutique dans le centre-ville s&apos;est transformé au fil des années en un espace de référence pour les étudiants, enseignants, parents et professionnels. Aujourd&apos;hui, notre présence en ligne nous permet de partager notre passion avec un public toujours plus large.
            </p>
          </section>

          {/* Notre Engagement */}
          <section className="p-8 md:p-10 border-b border-gray-100">
            <div className="flex items-center mb-6">
              <Award className="h-8 w-8 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Notre Engagement</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Chez BANI, nous croyons fermement que les bons outils font la différence dans le parcours éducatif. C&apos;est pourquoi nous nous engageons à :
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-4 mt-1">
                  <Award className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Sélectionner des produits de qualité</h3>
                  <p className="text-gray-600 text-sm">Chaque article dans notre catalogue est évalué selon des critères stricts de durabilité, fonctionnalité et rapport qualité-prix.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-4 mt-1">
                  <Book className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Rester à la pointe des tendances éducatives</h3>
                  <p className="text-gray-600 text-sm">Nos rayons évoluent constamment pour refléter les nouvelles approches pédagogiques et les besoins changeants des apprenants.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-4 mt-1">
                  <Users className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Offrir un service personnalisé</h3>
                  <p className="text-gray-600 text-sm">Que vous soyez un parent cherchant le parfait cartable, un étudiant en quête du stylo idéal ou un enseignant préparant sa classe, notre équipe est là pour vous conseiller.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-4 mt-1">
                  <Leaf className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Soutenir le développement durable</h3>
                  <p className="text-gray-600 text-sm">Nous privilégions les produits respectueux de l&apos;environnement et les fournisseurs engagés dans des pratiques responsables.</p>
                </div>
              </li>
            </ul>
          </section>

          {/* Notre Sélection */}
          <section className="p-8 md:p-10 border-b border-gray-100">
            <div className="flex items-center mb-6">
              <PenTool className="h-8 w-8 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Notre Sélection</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Notre catalogue comprend une vaste gamme de produits soigneusement choisis :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-1">Livres et manuels</h3>
                <p className="text-gray-600 text-sm">Des ressources éducatives pour tous les niveaux et disciplines</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-1">Papeterie de qualité</h3>
                <p className="text-gray-600 text-sm">Cahiers, agendas, blocs-notes pour organiser vos idées</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-1">Fournitures scolaires</h3>
                <p className="text-gray-600 text-sm">Du matériel robuste pour accompagner les apprentissages au quotidien</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-1">Matériel artistique</h3>
                <p className="text-gray-600 text-sm">Des outils pour développer la créativité et l&apos;expression</p>
              </div>
            </div>
          </section>

          {/* Notre Équipe */}
          <section className="p-8 md:p-10 border-b border-gray-100">
            <div className="flex items-center mb-6">
              <Users className="h-8 w-8 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Notre Équipe</h2>
            </div>
            <p className="text-gray-600">
              Derrière BANI, c&apos;est une équipe passionnée de conseillers, eux-mêmes anciens étudiants, parents ou enseignants, qui comprennent vos besoins et défis. Leur expertise vous garantit des recommandations pertinentes et un service attentif à chaque visite.
            </p>
          </section>

          {/* Conclusion */}
          <section className="p-8 md:p-10 bg-gray-50">
            <div className="flex items-center mb-6">
              <Heart className="h-8 w-8 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Rejoignez la Communauté BANI</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Plus qu&apos;une simple librairie, BANI est une communauté de personnes qui valorisent l&apos;éducation, la connaissance et le développement personnel. Chaque jour, nous avons le privilège d&apos;accompagner des milliers d&apos;apprenants dans leur quête de savoir.
            </p>
            <p className="text-gray-600 mb-6">
              Nous vous invitons à franchir nos portes virtuelles ou physiques pour découvrir comment nous pouvons vous aider à concrétiser vos ambitions éducatives. Chez BANI, nous ne vendons pas simplement des produits – nous nourrissons des rêves, encourageons des vocations et soutenons votre parcours vers la réussite.
            </p>
            <p className="text-lg font-medium text-red-600 text-center">
              Parce que votre réussite est notre plus belle récompense.
            </p>
            <div className="text-center mt-8 text-gray-500 italic">
              BANI - Partenaire de votre réussite depuis 2010
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}