import { openai } from "@ai-sdk/openai"
import { streamText, tool } from "ai"
import { z } from "zod"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Detect language from the first user message
  const userMessages = messages.filter((m: any) => m.role === "user")
  const lastUserMessage = userMessages[userMessages.length - 1]?.content || ""
  const isSpanish = /[ñáéíóúü]|hola|gracias|por favor|buenos días|buenas tardes/i.test(lastUserMessage)

  const systemPrompt = isSpanish
    ? `Eres un asistente de Inteligencia Artificial para Flow Pulse, una agencia líder en Inteligencia Artificial. 
Ayudas a los visitantes a conocer nuestros servicios de Inteligencia Artificial incluyendo:
- Desarrollo de Inteligencia Artificial Personalizada
- Soluciones de Machine Learning
- Desarrollo de Chatbots con Inteligencia Artificial
- Análisis de Datos e Insights
- Consultoría en Estrategia de Inteligencia Artificial

Sé útil, profesional y conocedor de las tecnologías de Inteligencia Artificial. 
Si te preguntan sobre precios o proyectos específicos, anímalos a contactar a nuestro equipo para una consulta.
Responde siempre en español.`
    : `You are an Artificial Intelligence assistant for Flow Pulse, a leading Artificial Intelligence agency. 
You help visitors learn about our Artificial Intelligence services including:
- Custom Artificial Intelligence Development
- Machine Learning Solutions
- Artificial Intelligence Chatbot Development
- Data Analytics & Insights
- Artificial Intelligence Strategy Consulting

Be helpful, professional, and knowledgeable about Artificial Intelligence technologies. 
If asked about pricing or specific projects, encourage them to contact our team for a consultation.
Always respond in English.`

  const result = streamText({
    model: openai("gpt-4o"),
    system: systemPrompt,
    messages,
    tools: {
      getServiceInfo: tool({
        description: isSpanish
          ? "Obtener información detallada sobre nuestros servicios de IA"
          : "Get detailed information about our AI services",
        parameters: z.object({
          service: z
            .enum(["development", "ml", "chatbot", "analytics", "consulting"])
            .describe(
              isSpanish ? "El tipo de servicio para obtener información" : "The service type to get info about",
            ),
        }),
        execute: async ({ service }) => {
          const servicesEn = {
            development: {
              name: "Custom Artificial Intelligence Development",
              description: "End-to-end Artificial Intelligence solution development tailored to your business needs",
              features: ["Custom algorithms", "API integration", "Scalable architecture"],
              timeline: "8-12 weeks",
            },
            ml: {
              name: "Machine Learning Solutions",
              description: "Advanced ML models for prediction, classification, and optimization",
              features: ["Predictive analytics", "Computer vision", "NLP processing"],
              timeline: "6-10 weeks",
            },
            chatbot: {
              name: "Artificial Intelligence Chatbot Development",
              description: "Intelligent conversational Artificial Intelligence for customer support and engagement",
              features: ["Multi-platform support", "Natural language understanding", "24/7 availability"],
              timeline: "4-6 weeks",
            },
            analytics: {
              name: "Data Analytics & Insights",
              description: "Transform your data into actionable business intelligence",
              features: ["Real-time dashboards", "Automated reporting", "Trend analysis"],
              timeline: "3-5 weeks",
            },
            consulting: {
              name: "Artificial Intelligence Strategy Consulting",
              description: "Strategic guidance for Artificial Intelligence adoption and implementation",
              features: ["Technology roadmap", "ROI analysis", "Risk assessment"],
              timeline: "2-4 weeks",
            },
          }

          const servicesEs = {
            development: {
              name: "Desarrollo de Inteligencia Artificial Personalizada",
              description:
                "Desarrollo integral de soluciones de Inteligencia Artificial adaptadas a las necesidades de tu negocio",
              features: ["Algoritmos personalizados", "Integración de API", "Arquitectura escalable"],
              timeline: "8-12 semanas",
            },
            ml: {
              name: "Soluciones de Machine Learning",
              description: "Modelos avanzados de ML para predicción, clasificación y optimización",
              features: ["Análisis predictivo", "Visión por computadora", "Procesamiento de lenguaje natural"],
              timeline: "6-10 semanas",
            },
            chatbot: {
              name: "Desarrollo de Chatbots con Inteligencia Artificial",
              description: "Inteligencia Artificial conversacional inteligente para soporte al cliente y engagement",
              features: ["Soporte multiplataforma", "Comprensión de lenguaje natural", "Disponibilidad 24/7"],
              timeline: "4-6 semanas",
            },
            analytics: {
              name: "Análisis de Datos e Insights",
              description: "Transforma tus datos en inteligencia de negocio accionable",
              features: ["Dashboards en tiempo real", "Reportes automatizados", "Análisis de tendencias"],
              timeline: "3-5 semanas",
            },
            consulting: {
              name: "Consultoría en Estrategia de Inteligencia Artificial",
              description: "Orientación estratégica para la adopción e implementación de Inteligencia Artificial",
              features: ["Hoja de ruta tecnológica", "Análisis de ROI", "Evaluación de riesgos"],
              timeline: "2-4 semanas",
            },
          }

          return isSpanish ? servicesEs[service] : servicesEn[service]
        },
      }),
    },
    maxSteps: 3,
  })

  return result.toDataStreamResponse()
}
