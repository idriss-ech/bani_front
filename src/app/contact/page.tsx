"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  User,
  AtSign,
  FileText,
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuler l'envoi du formulaire
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    // Réinitialiser le message de succès après 5 secondes
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* En-tête de la page */}
      <header className="relative bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white py-20 md:py-28 shadow-lg">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=2232&auto=format&fit=crop"
            alt="BANI Contact"
            fill
            className="object-cover object-center opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-red-700/80 to-red-600/10" />
        </div>
        <div className="relative container mx-auto px-4 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-10 w-10 text-white drop-shadow-lg" />
              <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
                Contactez-nous
              </h1>
            </div>
            <p className="text-lg md:text-2xl max-w-2xl text-center font-medium drop-shadow">
              Notre équipe est à votre écoute pour répondre à toutes vos
              questions
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Informations de contact et formulaire */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne gauche - Informations de contact */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Nos coordonnées
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <MapPin className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Adresse</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        24 Avenue des Lumières
                        <br />
                        75001 Paris, France
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <Phone className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Téléphone</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        +33 (0)1 23 45 67 89
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <Mail className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Email</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        contact@librairie-bani.fr
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <Clock className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        Horaires d&apos;ouverture
                      </h3>
                      <div className="text-gray-600 text-sm mt-1 space-y-1">
                        <p>Lundi - Vendredi: 9h00 - 19h00</p>
                        <p>Samedi: 10h00 - 18h00</p>
                        <p>Dimanche: Fermé</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="font-medium text-gray-800 mb-3">
                    Suivez-nous
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="bg-gray-100 hover:bg-red-100 p-2 rounded-full transition-colors duration-200"
                    >
                      <svg
                        className="h-5 w-5 text-gray-700"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-gray-100 hover:bg-red-100 p-2 rounded-full transition-colors duration-200"
                    >
                      <svg
                        className="h-5 w-5 text-gray-700"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-gray-100 hover:bg-red-100 p-2 rounded-full transition-colors duration-200"
                    >
                      <svg
                        className="h-5 w-5 text-gray-700"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne droite - Formulaire de contact */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Envoyez-nous un message
                </h2>

                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-500 mr-4" />
                    <div>
                      <h3 className="text-green-800 font-medium text-lg">
                        Message envoyé avec succès!
                      </h3>
                      <p className="text-green-700 mt-1">
                        Merci de nous avoir contacté. Notre équipe vous répondra
                        dans les meilleurs délais.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Nom complet <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Votre nom"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <AtSign className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="votre@email.com"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Sujet <span className="text-red-600">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FileText className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        >
                          <option value="">Sélectionnez un sujet</option>
                          <option value="question">Question générale</option>
                          <option value="commande">Suivi de commande</option>
                          <option value="produit">Information produit</option>
                          <option value="reclamation">Réclamation</option>
                          <option value="autre">Autre</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Message <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Comment pouvons-nous vous aider?"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      ></textarea>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <span className="text-red-600">*</span> Champs
                        obligatoires
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex items-center justify-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors duration-200 ${
                          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            Envoyer
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Carte */}
          <div className="mt-12 bg-white rounded-lg shadow-sm overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-800 p-8 pb-0">
              Notre emplacement
            </h2>
            <div className="h-96 w-full mt-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047744348!2d2.3354330160472316!3d48.87456857928921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e3ee63a0451%3A0x1bb0c795c4004be!2s24%20Rue%20des%20Petits%20Hotels%2C%2075010%20Paris%2C%20France!5e0!3m2!1sen!2sus!4v1626901756004!5m2!1sen!2sus"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                title="Carte de la librairie BANI"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
