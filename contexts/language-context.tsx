"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Header
    services: "Services",
    contact: "Contact",

    // Hero
    leadingAI: "Leading Artificial Intelligence Innovation",
    heroTitle: "Transform Your Business with Artificial Intelligence",
    heroDescription:
      "We help companies leverage artificial intelligence to automate processes, gain insights, and create intelligent solutions that drive growth.",
    startJourney: "Start Your Artificial Intelligence Journey",
    viewWork: "View Our Work",

    // Services
    ourServices: "Our Artificial Intelligence Services",
    servicesDescription: "Comprehensive Artificial Intelligence solutions tailored to your business needs",
    customAI: "Custom Artificial Intelligence Development",
    customAIDesc:
      "End-to-end Artificial Intelligence solution development tailored to your specific business requirements",
    customAlgorithms: "Custom algorithms & models",
    apiIntegration: "API integration & deployment",
    scalableArch: "Scalable architecture",

    mlSolutions: "Machine Learning Solutions",
    mlDesc: "Advanced ML models for prediction, classification, and optimization",
    predictiveAnalytics: "Predictive analytics",
    computerVision: "Computer vision",
    nlpProcessing: "Natural language processing",

    chatbotDev: "Artificial Intelligence Chatbot Development",
    chatbotDesc: "Intelligent conversational Artificial Intelligence for customer support and engagement",
    multiPlatform: "Multi-platform support",
    nlUnderstanding: "Natural language understanding",
    availability247: "24/7 availability",

    dataAnalytics: "Data Analytics & Insights",
    dataDesc: "Transform your data into actionable business intelligence",
    realtimeDashboards: "Real-time dashboards",
    automatedReporting: "Automated reporting",
    trendAnalysis: "Trend analysis",

    aiStrategy: "Artificial Intelligence Strategy Consulting",
    strategyDesc: "Strategic guidance for Artificial Intelligence adoption and implementation",
    techRoadmap: "Technology roadmap",
    roiAnalysis: "ROI analysis",
    riskAssessment: "Risk assessment",

    aiTraining: "Artificial Intelligence Training & Support",
    trainingDesc: "Comprehensive training and ongoing support for your team",
    teamWorkshops: "Team workshops",
    documentation: "Documentation & guides",
    technicalSupport: "24/7 technical support",

    // Contact
    readyToStart: "Ready to Get Started?",
    contactDescription: "Let's discuss how Artificial Intelligence can transform your business",
    getInTouch: "Get in Touch",
    sendMessage: "Send us a Message",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    message: "Message",
    messagePlaceholder: "Tell us about your project...",
    sendBtn: "Send Message",

    // Footer
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    support: "Support",
    allRightsReserved: "All rights reserved",

    // Chatbot
    aiAssistant: "Artificial Intelligence Assistant",
    chatbotWelcome: "Ask me about our Artificial Intelligence services!",
    chatbotIntro: "Hello! I'm here to help you learn about our Artificial Intelligence services.",
    askAnything: "Ask me anything!",
    typeMessage: "Type your message...",
  },
  es: {
    // Header
    services: "Servicios",
    contact: "Contacto",

    // Hero
    leadingAI: "Liderando la Innovación en Inteligencia Artificial",
    heroTitle: "Transforma Tu Negocio con Inteligencia Artificial",
    heroDescription:
      "Ayudamos a las empresas a aprovechar la inteligencia artificial para automatizar procesos, obtener insights y crear soluciones inteligentes que impulsen el crecimiento.",
    startJourney: "Inicia Tu Viaje con Inteligencia Artificial",
    viewWork: "Ver Nuestro Trabajo",

    // Services
    ourServices: "Nuestros Servicios de Inteligencia Artificial",
    servicesDescription: "Soluciones integrales de Inteligencia Artificial adaptadas a las necesidades de tu negocio",
    customAI: "Desarrollo de Inteligencia Artificial Personalizada",
    customAIDesc:
      "Desarrollo integral de soluciones de Inteligencia Artificial adaptadas a los requisitos específicos de tu negocio",
    customAlgorithms: "Algoritmos y modelos personalizados",
    apiIntegration: "Integración de API y despliegue",
    scalableArch: "Arquitectura escalable",

    mlSolutions: "Soluciones de Machine Learning",
    mlDesc: "Modelos avanzados de ML para predicción, clasificación y optimización",
    predictiveAnalytics: "Análisis predictivo",
    computerVision: "Visión por computadora",
    nlpProcessing: "Procesamiento de lenguaje natural",

    chatbotDev: "Desarrollo de Chatbots con Inteligencia Artificial",
    chatbotDesc: "Inteligencia Artificial conversacional inteligente para soporte al cliente y engagement",
    multiPlatform: "Soporte multiplataforma",
    nlUnderstanding: "Comprensión de lenguaje natural",
    availability247: "Disponibilidad 24/7",

    dataAnalytics: "Análisis de Datos e Insights",
    dataDesc: "Transforma tus datos en inteligencia de negocio accionable",
    realtimeDashboards: "Dashboards en tiempo real",
    automatedReporting: "Reportes automatizados",
    trendAnalysis: "Análisis de tendencias",

    aiStrategy: "Consultoría en Estrategia de Inteligencia Artificial",
    strategyDesc: "Orientación estratégica para la adopción e implementación de Inteligencia Artificial",
    techRoadmap: "Hoja de ruta tecnológica",
    roiAnalysis: "Análisis de ROI",
    riskAssessment: "Evaluación de riesgos",

    aiTraining: "Entrenamiento y Soporte en Inteligencia Artificial",
    trainingDesc: "Entrenamiento integral y soporte continuo para tu equipo",
    teamWorkshops: "Talleres para equipos",
    documentation: "Documentación y guías",
    technicalSupport: "Soporte técnico 24/7",

    // Contact
    readyToStart: "¿Listo para Comenzar?",
    contactDescription: "Hablemos sobre cómo la Inteligencia Artificial puede transformar tu negocio",
    getInTouch: "Ponte en Contacto",
    sendMessage: "Envíanos un Mensaje",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Correo Electrónico",
    message: "Mensaje",
    messagePlaceholder: "Cuéntanos sobre tu proyecto...",
    sendBtn: "Enviar Mensaje",

    // Footer
    privacyPolicy: "Política de Privacidad",
    termsOfService: "Términos de Servicio",
    support: "Soporte",
    allRightsReserved: "Todos los derechos reservados",

    // Chatbot
    aiAssistant: "Asistente de Inteligencia Artificial",
    chatbotWelcome: "¡Pregúntame sobre nuestros servicios de Inteligencia Artificial!",
    chatbotIntro: "¡Hola! Estoy aquí para ayudarte a conocer nuestros servicios de Inteligencia Artificial.",
    askAnything: "¡Pregúntame lo que quieras!",
    typeMessage: "Escribe tu mensaje...",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
