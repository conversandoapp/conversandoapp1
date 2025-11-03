import { useEffect } from 'react';
import { ReflectionCard } from '@/components/reflection-card';
import { useQuestions } from '@/hooks/use-questions';

const backgroundImage = '/background.png';

interface GameProps {
  onLogout?: () => void;
}

/** Opcional: mapea categorías conocidas a gradientes Tailwind.
 *  Si una categoría no está aquí, usaremos un color de respaldo por índice. */
const categoryColors: Record<string, string> = {
  "Crecimiento Personal": "from-purple-600 to-pink-600",
  "Sabiduría": "from-blue-600 to-cyan-600",
  "Pasión": "from-orange-600 to-red-600",
  "Superación": "from-green-600 to-teal-600",
  "Autenticidad": "from-indigo-600 to-purple-600",
  "Valentía": "from-yellow-600 to-orange-600",
  "Gratitud": "from-amber-600 to-yellow-600",
  "Resiliencia": "from-blue-600 to-purple-600",
  "Amor": "from-red-600 to-pink-600",
  "Aventura": "from-orange-600 to-red-600",
  // agrega aquí más si quieres colores específicos por categoría
};

const fallbackColors = [
  "from-purple-600 to-pink-600",
  "from-blue-600 to-cyan-600",
  "from-orange-600 to-red-600",
  "from-green-600 to-teal-600",
  "from-indigo-600 to-purple-600",
  "from-amber-600 to-yellow-600",
  "from-rose-600 to-pink-600",
  "from-emerald-600 to-green-600",
  "from-violet-600 to-indigo-600",
];

const colorByIndex = (i: number) => fallbackColors[i % fallbackColors.length];
const colorForCategory = (category?: string, i?: number) =>
  (category && categoryColors[category]) || colorByIndex(i ?? 0);

export default function Game({ onLogout }: GameProps) {
  const { data: questionsData, isLoading, error } = useQuestions();

  useEffect(() => {
    console.log("👀 questionsData:", questionsData);
  }, [questionsData]);

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="text-white text-xl bg-black/50 p-4 rounded-lg">Cargando preguntas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="text-white text-xl bg-black/50 p-4 rounded-lg">
          Error al cargar las preguntas. Intenta nuevamente.
        </div>
      </div>
    );
  }

  // Ahora el backend trae [{ question, category }]
  const list = Array.isArray(questionsData) ? questionsData : [];

  // Mapea al shape que espera ReflectionCard: { question, category, color }
  const questionsForCard = list.map((q, i) => ({
    question: q.question,
    category: q.category || "Reflexión",
    color: colorForCategory(q.category, i),
  }));

  // DEBUG UI si no hay preguntas
  if (questionsForCard.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-6"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="text-white bg-black/50 p-4 rounded-lg max-w-xl w-full">
          <div className="font-bold mb-2">No hay preguntas para mostrar</div>
          <pre className="text-xs whitespace-pre-wrap break-words">
            {JSON.stringify(questionsData, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  return <ReflectionCard questions={questionsForCard} onLogout={onLogout} />;
}
