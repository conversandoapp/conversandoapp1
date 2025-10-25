import { ReflectionCard } from '@/components/reflection-card';
import { useQuestions } from '@/hooks/use-questions';
const backgroundImage = '/background.png';

interface GameProps {
  onLogout?: () => void;
}

// Mapa simple para colorear (si no hay categoría en backend)
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

const getColorByIndex = (i: number) => fallbackColors[i % fallbackColors.length];

export default function Game({ onLogout }: GameProps) {
  const { data: questionsData, isLoading, error } = useQuestions();

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

  // Normalizamos lo que viene del backend (no trae categoría)
  const questionsWithColors =
    (questionsData ?? []).map((q, i) => ({
      question: q.question,
      // puedes sustituir "Reflexión" si luego agregas una columna de categoría en la Hoja2
      category: "Reflexión",
      color: getColorByIndex(i),
    }));

  // Fallback si la hoja aún está vacía
  if (questionsWithColors.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="text-white text-xl bg-black/50 p-4 rounded-lg">
          No hay preguntas disponibles aún.
        </div>
      </div>
    );
  }

  return <ReflectionCard questions={questionsWithColors} onLogout={onLogout} />;
}
