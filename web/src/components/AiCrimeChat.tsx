import { motion } from "framer-motion";
import { MessageSquare, SendHorizonal, Sparkles } from "lucide-react";
import { startTransition, useEffect, useState } from "react";
import { Language } from "../context/UiContext";
import { AiForecastTerritory, AiReport } from "../data/aiReports";
import { buildAssistantReply } from "../lib/assistantReplies";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

type AiCrimeChatProps = {
  report: AiReport;
  territory: AiForecastTerritory;
  language: Language;
  accentClass: string;
  accentTextClass: string;
};

const copy = {
  es: {
    title: "Chat libre del asistente",
    helper:
      "Escribe preguntas abiertas sobre riesgo esperado, foco territorial, presion, modalidad dominante o accion recomendada.",
    placeholder: "Ejemplo: Que se espera en la siguiente ventana para este territorio?",
    send: "Enviar",
    quickPrompts: [
      "Que se espera en la siguiente ventana?",
      "Donde esta el foco mas fuerte?",
      "Que accion conviene priorizar?",
      "Que tan confiable es esta proyeccion?",
    ],
  },
  en: {
    title: "Open chat assistant",
    helper:
      "Ask open questions about expected risk, territorial focus, pressure, dominant factor or recommended action.",
    placeholder: "Example: What should I expect in the next window for this territory?",
    send: "Send",
    quickPrompts: [
      "What should I expect in the next window?",
      "Where is the strongest hotspot?",
      "What action should be prioritized?",
      "How reliable is this projection?",
    ],
  },
} as const;

function createWelcomeMessage(language: Language, territoryLabel: string): string {
  return language === "es"
    ? `Estoy leyendo ${territoryLabel} como siguiente ventana operativa, no como calendario actual. Preguntame por riesgo esperado, foco territorial, modalidad dominante o accion recomendada.`
    : `I am reading ${territoryLabel} as the next operating window, not as the current calendar. Ask about expected risk, territorial focus, dominant factor or recommended action.`;
}

export function AiCrimeChat({
  report,
  territory,
  language,
  accentClass,
  accentTextClass,
}: AiCrimeChatProps) {
  const labels = copy[language];
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      text: createWelcomeMessage(language, territory.label),
    },
  ]);

  useEffect(() => {
    setMessages([
      {
        id: 1,
        role: "assistant",
        text: createWelcomeMessage(language, territory.label),
      },
    ]);
    setInputValue("");
  }, [language, territory.id, territory.label]);

  const sendMessage = (question: string) => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) {
      return;
    }

    const answer = buildAssistantReply(language, trimmedQuestion, territory, report);

    startTransition(() => {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: currentMessages.length + 1,
          role: "user",
          text: trimmedQuestion,
        },
        {
          id: currentMessages.length + 2,
          role: "assistant",
          text: answer,
        },
      ]);
      setInputValue("");
    });
  };

  return (
    <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/85 p-5 shadow-[0_12px_30px_rgba(148,163,184,0.12)] dark:border-white/10 dark:bg-white/5 dark:shadow-none">
      <div className="flex items-center gap-2">
        <MessageSquare size={16} className={accentTextClass} />
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          {labels.title}
        </p>
      </div>
      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
        {labels.helper}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {labels.quickPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => sendMessage(prompt)}
            className="rounded-full border border-slate-200/80 bg-slate-50/90 px-4 py-2 text-xs font-semibold text-slate-600 shadow-[0_10px_24px_rgba(148,163,184,0.1)] transition-colors duration-300 hover:bg-white dark:border-white/10 dark:bg-slate-950/35 dark:text-slate-200 dark:shadow-none dark:hover:bg-white/10"
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3 rounded-[1.6rem] border border-slate-200/80 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-slate-950/30">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={
              message.role === "assistant"
                ? "mr-6 rounded-[1.35rem] border border-slate-200/80 bg-white/90 px-4 py-3 text-sm leading-7 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                : `ml-6 rounded-[1.35rem] bg-gradient-to-r px-4 py-3 text-sm leading-7 text-white shadow-[0_14px_28px_rgba(15,23,42,0.2)] ${accentClass}`
            }
          >
            {message.role === "assistant" && (
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                <Sparkles size={12} className={accentTextClass} />
                AI
              </div>
            )}
            <p>{message.text}</p>
          </motion.div>
        ))}
      </div>

      <form
        className="mt-4 flex flex-col gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          sendMessage(inputValue);
        }}
      >
        <textarea
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder={labels.placeholder}
          rows={3}
          className="w-full resize-none rounded-[1.35rem] border border-slate-200/80 bg-white px-4 py-3 text-sm leading-7 text-slate-700 shadow-[0_10px_24px_rgba(148,163,184,0.1)] outline-none transition-colors duration-300 focus:border-slate-400 dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-100 dark:shadow-none dark:focus:border-slate-400"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(15,23,42,0.2)] ${accentClass}`}
          >
            <SendHorizonal size={16} />
            {labels.send}
          </button>
        </div>
      </form>
    </div>
  );
}
