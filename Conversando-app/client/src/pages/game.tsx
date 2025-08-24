import { ReflectionCard } from '@/components/reflection-card';
import { useQuestions } from '@/hooks/use-questions';
import { ReflectionQuestion } from '@shared/schema';
const backgroundImage = '/background.png';

interface GameProps {
  onLogout?: () => void;
}

const reflectionQuestions = [
  {
    question: "¿Qué momento de tu vida cambió completamente tu perspectiva?",
    category: "Crecimiento Personal",
    color: "from-purple-600 to-pink-600"
  },
  {
    question: "Si pudieras dar un consejo a tu yo de hace 10 años, ¿cuál sería?",
    category: "Sabiduría",
    color: "from-blue-600 to-cyan-600"
  },
  {
    question: "¿Qué actividad te hace perder completamente la noción del tiempo?",
    category: "Pasión",
    color: "from-orange-600 to-red-600"
  },
  {
    question: "¿Cuál es la creencia más limitante que has logrado superar?",
    category: "Superación",
    color: "from-green-600 to-teal-600"
  },
  {
    question: "¿Qué significa para ti vivir una vida auténtica?",
    category: "Autenticidad",
    color: "from-indigo-600 to-purple-600"
  },
  {
    question: "¿Cuál es el mayor riesgo que has tomado y valió la pena?",
    category: "Valentía",
    color: "from-yellow-600 to-orange-600"
  },
  {
    question: "¿Qué tradición familiar o cultural aprecias más y por qué?",
    category: "Herencia",
    color: "from-rose-600 to-pink-600"
  },
  {
    question: "¿En qué momento te has sentido más conectado contigo mismo?",
    category: "Autoconocimiento",
    color: "from-emerald-600 to-green-600"
  },
  {
    question: "¿Qué pequeño gesto de bondad nunca olvidarás?",
    category: "Compasión",
    color: "from-sky-600 to-blue-600"
  },
  {
    question: "¿Cuál es tu definición personal del éxito?",
    category: "Propósito",
    color: "from-violet-600 to-purple-600"
  },
  {
    question: "¿Qué te gustaría que recordaran de ti cuando ya no estés?",
    category: "Legado",
    color: "from-amber-600 to-yellow-600"
  },
  {
    question: "¿Cuál es la lección más valiosa que has aprendido del fracaso?",
    category: "Resiliencia",
    color: "from-red-600 to-rose-600"
  },
  {
    question: "¿Qué aspecto de la naturaleza humana te fascina más?",
    category: "Humanidad",
    color: "from-teal-600 to-cyan-600"
  },
  {
    question: "¿Cuándo fue la última vez que hiciste algo por primera vez?",
    category: "Aventura",
    color: "from-lime-600 to-green-600"
  },
  {
    question: "¿Qué silencio has roto que cambió tu vida para mejor?",
    category: "Coraje",
    color: "from-fuchsia-600 to-pink-600"
  },
  {
    question: "¿Cuál es el mayor sacrificio que has hecho por amor?",
    category: "Amor",
    color: "from-pink-600 to-rose-600"
  },
  {
    question: "¿Qué habilidad te hubiera gustado aprender de niño?",
    category: "Nostalgia",
    color: "from-cyan-600 to-blue-600"
  },
  {
    question: "¿En qué situación has tenido que elegir entre la razón y el corazón?",
    category: "Decisiones",
    color: "from-purple-600 to-indigo-600"
  },
  {
    question: "¿Qué te da más miedo: el éxito o el fracaso? ¿Por qué?",
    category: "Miedos",
    color: "from-gray-600 to-slate-600"
  },
  {
    question: "¿Cuál es la mentira más grande que te has dicho a ti mismo?",
    category: "Honestidad",
    color: "from-red-600 to-orange-600"
  },
  {
    question: "¿Qué persona que ya no está en tu vida te enseñó algo valioso?",
    category: "Memoria",
    color: "from-blue-600 to-purple-600"
  },
  {
    question: "¿En qué momento de tu vida te has sentido más vulnerable?",
    category: "Vulnerabilidad",
    color: "from-teal-600 to-green-600"
  },
  {
    question: "¿Qué privilegio que tienes a menudo das por sentado?",
    category: "Gratitud",
    color: "from-yellow-600 to-amber-600"
  },
  {
    question: "¿Cuál es la diferencia entre quien eres y quien aparentas ser?",
    category: "Autenticidad",
    color: "from-indigo-600 to-pink-600"
  },
  {
    question: "¿Qué experiencia difícil te ha hecho más empático?",
    category: "Empatía",
    color: "from-green-600 to-cyan-600"
  },
  {
    question: "¿Cuál es el complejo o inseguridad que más te ha limitado?",
    category: "Inseguridades",
    color: "from-slate-600 to-gray-600"
  },
  {
    question: "¿Qué decisión has postergado demasiado tiempo?",
    category: "Procrastinación",
    color: "from-orange-600 to-red-600"
  },
  {
    question: "¿En qué aspecto de tu vida necesitas ser más honesto?",
    category: "Honestidad",
    color: "from-blue-600 to-teal-600"
  },
  {
    question: "¿Qué patrón destructivo has logrado romper?",
    category: "Crecimiento",
    color: "from-purple-600 to-violet-600"
  },
  {
    question: "¿Cuál es la pregunta que más temes que te hagan?",
    category: "Miedos",
    color: "from-red-600 to-pink-600"
  },
  {
    question: "¿Qué aspecto de tu personalidad has heredado y cuál has construido?",
    category: "Identidad",
    color: "from-cyan-600 to-purple-600"
  },
  {
    question: "¿En qué momento has tenido que elegir entre tu felicidad y la de otros?",
    category: "Dilemas",
    color: "from-amber-600 to-orange-600"
  },
  {
    question: "¿Qué te hubiera dicho tu yo de 5 años sobre tu vida actual?",
    category: "Perspectiva",
    color: "from-lime-600 to-teal-600"
  },
  {
    question: "¿Cuál es la emoción que más te cuesta expresar?",
    category: "Emociones",
    color: "from-rose-600 to-red-600"
  },
  {
    question: "¿Qué te has perdonado recientemente?",
    category: "Perdón",
    color: "from-green-600 to-blue-600"
  },
  {
    question: "¿En qué situación has actuado en contra de tus valores?",
    category: "Valores",
    color: "from-indigo-600 to-slate-600"
  },
  {
    question: "¿Qué relación en tu vida necesita más atención?",
    category: "Relaciones",
    color: "from-pink-600 to-purple-600"
  },
  {
    question: "¿Cuál es la versión de ti que más extrañas?",
    category: "Nostalgia",
    color: "from-blue-600 to-cyan-600"
  },
  {
    question: "¿Qué conversación importante has estado evitando?",
    category: "Comunicación",
    color: "from-yellow-600 to-red-600"
  },
  {
    question: "¿En qué área de tu vida eres más crítico contigo mismo?",
    category: "Autocrítica",
    color: "from-gray-600 to-purple-600"
  },
  {
    question: "¿Qué creencia sobre ti mismo ha cambiado más en los últimos años?",
    category: "Evolución",
    color: "from-teal-600 to-pink-600"
  },
  {
    question: "¿Cuál es el mayor acto de rebeldía que has cometido contra las expectativas?",
    category: "Rebeldía",
    color: "from-orange-600 to-purple-600"
  },
  {
    question: "¿Qué aspecto de tu infancia aún influye en tus decisiones actuales?",
    category: "Infancia",
    color: "from-cyan-600 to-green-600"
  },
  {
    question: "¿En qué momento has sentido que realmente 'creciste'?",
    category: "Madurez",
    color: "from-violet-600 to-blue-600"
  },
  {
    question: "¿Qué te ha costado más trabajo aceptar sobre ti mismo?",
    category: "Aceptación",
    color: "from-red-600 to-teal-600"
  },
  {
    question: "¿Cuál es la diferencia entre lo que necesitas y lo que deseas?",
    category: "Necesidades",
    color: "from-amber-600 to-pink-600"
  },
  {
    question: "¿Qué ritual o rutina te conecta más contigo mismo?",
    category: "Rituales",
    color: "from-green-600 to-purple-600"
  },
  {
    question: "¿En qué aspecto de tu vida has sido más valiente sin darte cuenta?",
    category: "Valentía Oculta",
    color: "from-blue-600 to-orange-600"
  },
  {
    question: "¿Qué historia sobre tu pasado has reinterpretado con el tiempo?",
    category: "Reinterpretación",
    color: "from-purple-600 to-cyan-600"
  },
  {
    question: "¿Cuál es la lección que el universo parece querer enseñarte una y otra vez?",
    category: "Patrones",
    color: "from-pink-600 to-blue-600"
  },
  {
    question: "¿Qué parte de tu identidad está más influenciada por otros?",
    category: "Influencias",
    color: "from-teal-600 to-red-600"
  }
];

// Color mapping for categories
const categoryColors: Record<string, string> = {
  "Crecimiento Personal": "from-purple-600 to-pink-600",
  "Sabiduría": "from-blue-600 to-cyan-600",
  "Pasión": "from-orange-600 to-red-600",
  "Superación": "from-green-600 to-teal-600",
  "Autenticidad": "from-indigo-600 to-purple-600",
  "Valentía": "from-yellow-600 to-orange-600",
  "Herencia": "from-rose-600 to-pink-600",
  "Autoconocimiento": "from-emerald-600 to-green-600",
  "Compasión": "from-cyan-600 to-blue-600",
  "Gratitud": "from-amber-600 to-yellow-600",
  "Fortaleza": "from-slate-600 to-gray-600",
  "Propósito": "from-violet-600 to-indigo-600",
  "Conexión": "from-pink-600 to-rose-600",
  "Creatividad": "from-teal-600 to-cyan-600",
  "Libertad": "from-sky-600 to-blue-600",
  "Amor": "from-red-600 to-pink-600",
  "Esperanza": "from-lime-600 to-green-600",
  "Transformación": "from-purple-600 to-violet-600",
  "Equilibrio": "from-emerald-600 to-teal-600",
  "Intuición": "from-indigo-600 to-blue-600",
  "Abundancia": "from-yellow-600 to-amber-600",
  "Sanación": "from-green-600 to-emerald-600",
  "Reflexión": "from-slate-600 to-stone-600",
  "Comunidad": "from-orange-600 to-yellow-600",
  "Innovación": "from-cyan-600 to-teal-600",
  "Liderazgo": "from-red-600 to-orange-600",
  "Mindfulness": "from-purple-600 to-indigo-600",
  "Resiliencia": "from-blue-600 to-purple-600",
  "Espiritualidad": "from-violet-600 to-purple-600",
  "Diversidad": "from-pink-600 to-purple-600",
  "Sostenibilidad": "from-green-600 to-lime-600",
  "Tecnología": "from-blue-600 to-cyan-600",
  "Aventura": "from-orange-600 to-red-600",
  "Serenidad": "from-blue-600 to-indigo-600",
  "Empatía": "from-rose-600 to-pink-600",
  "Justicia": "from-blue-600 to-green-600",
  "Tradición": "from-amber-600 to-orange-600",
  "Desafío": "from-red-600 to-orange-600",
  "Armonía": "from-green-600 to-teal-600",
  "Curiosidad": "from-yellow-600 to-orange-600",
  "Integridad": "from-blue-600 to-indigo-600",
  "Bienestar": "from-green-600 to-emerald-600",
  "Celebración": "from-yellow-600 to-pink-600",
  "Perdón": "from-purple-600 to-pink-600",
  "Perseverancia": "from-orange-600 to-red-600",
  "Humildad": "from-blue-600 to-gray-600",
  "Paciencia": "from-teal-600 to-blue-600",
  "Generosidad": "from-green-600 to-teal-600",
  "Optimismo": "from-yellow-600 to-orange-600",
  "Simplicidad": "from-gray-600 to-slate-600",
  "Naturaleza": "from-green-600 to-lime-600",
  "Familia": "from-rose-600 to-pink-600",
  "Amistad": "from-blue-600 to-cyan-600",
  "Trabajo": "from-indigo-600 to-purple-600",
  "Salud": "from-green-600 to-emerald-600",
  "Educación": "from-blue-600 to-indigo-600",
  "Arte": "from-purple-600 to-pink-600",
  "Música": "from-violet-600 to-purple-600",
  "Viajes": "from-orange-600 to-yellow-600",
  "Cocina": "from-red-600 to-orange-600",
  "Deportes": "from-blue-600 to-teal-600",
  "Lectura": "from-indigo-600 to-blue-600",
  "Ciencia": "from-cyan-600 to-blue-600",
  "Historia": "from-amber-600 to-orange-600",
  "Filosofía": "from-purple-600 to-indigo-600",
  "Psicología": "from-pink-600 to-purple-600",
  "Comunicación": "from-orange-600 to-yellow-600",
  "Emprendimiento": "from-green-600 to-teal-600",
  "Finanzas": "from-blue-600 to-green-600",
  "Medio Ambiente": "from-green-600 to-lime-600",
  "Política": "from-blue-600 to-indigo-600",
  "Sociedad": "from-purple-600 to-pink-600",
  "Cultura": "from-rose-600 to-pink-600",
  "Religión": "from-violet-600 to-purple-600",
  "Ética": "from-blue-600 to-indigo-600",
  "Moral": "from-gray-600 to-slate-600",
  "Valores": "from-blue-600 to-purple-600",
  "Principios": "from-indigo-600 to-blue-600",
  "Creencias": "from-purple-600 to-violet-600",
  "Identidad": "from-pink-600 to-purple-600",
  "Personalidad": "from-rose-600 to-pink-600",
  "Carácter": "from-blue-600 to-indigo-600",
  "Temperamento": "from-orange-600 to-red-600",
  "Emociones": "from-pink-600 to-rose-600",
  "Sentimientos": "from-purple-600 to-pink-600",
  "Pensamientos": "from-blue-600 to-cyan-600",
  "Ideas": "from-yellow-600 to-orange-600",
  "Sueños": "from-purple-600 to-indigo-600",
  "Metas": "from-green-600 to-teal-600",
  "Objetivos": "from-blue-600 to-green-600",
  "Aspiraciones": "from-violet-600 to-purple-600",
  "Deseos": "from-pink-600 to-rose-600",
  "Esperanzas": "from-lime-600 to-green-600",
  "Temores": "from-gray-600 to-slate-600",
  "Miedos": "from-red-600 to-orange-600",
  "Ansiedades": "from-blue-600 to-gray-600",
  "Preocupaciones": "from-orange-600 to-red-600",
  "Estrés": "from-red-600 to-orange-600",
  "Relajación": "from-blue-600 to-teal-600",
  "Calma": "from-teal-600 to-blue-600",
  "Paz": "from-green-600 to-teal-600",
  "Tranquilidad": "from-blue-600 to-indigo-600",
  "Meditación": "from-purple-600 to-indigo-600",
  "Contemplación": "from-indigo-600 to-purple-600",
  "Introspección": "from-purple-600 to-indigo-600",
  "Autoexamen": "from-blue-600 to-purple-600",
  "Autodescubrimiento": "from-pink-600 to-purple-600",
  "Autoayuda": "from-green-600 to-teal-600",
  "Desarrollo": "from-blue-600 to-cyan-600",
  "Mejora": "from-green-600 to-lime-600",
  "Progreso": "from-blue-600 to-green-600",
  "Avance": "from-orange-600 to-yellow-600",
  "Evolución": "from-purple-600 to-violet-600",
  "Cambio": "from-orange-600 to-red-600",
  "Renovación": "from-green-600 to-lime-600",
  "Renacimiento": "from-rose-600 to-pink-600",
  "Resurrección": "from-violet-600 to-purple-600",
  "Vida": "from-green-600 to-lime-600",
  "Muerte": "from-gray-600 to-slate-600",
  "Nacimiento": "from-pink-600 to-rose-600",
  "Infancia": "from-yellow-600 to-orange-600",
  "Adolescencia": "from-orange-600 to-red-600",
  "Juventud": "from-lime-600 to-green-600",
  "Adultez": "from-blue-600 to-indigo-600",
  "Madurez": "from-indigo-600 to-purple-600",
  "Vejez": "from-gray-600 to-slate-600",
  "Experiencia": "from-amber-600 to-orange-600",
  "Conocimiento": "from-blue-600 to-indigo-600",
  "Inteligencia": "from-cyan-600 to-blue-600",
  "Talento": "from-yellow-600 to-orange-600",
  "Habilidad": "from-green-600 to-teal-600",
  "Destreza": "from-orange-600 to-red-600",
  "Competencia": "from-blue-600 to-green-600",
  "Experticia": "from-indigo-600 to-blue-600",
  "Maestría": "from-purple-600 to-indigo-600",
  "Excelencia": "from-yellow-600 to-orange-600",
  "Perfección": "from-white to-gray-600",
  "Calidad": "from-blue-600 to-indigo-600"
};

// Get color for category, with fallback
const getColorForCategory = (category: string): string => {
  return categoryColors[category] || "from-blue-600 to-purple-600";
};

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
        <div className="text-white text-xl bg-black/50 p-4 rounded-lg">Error al cargar las preguntas. Intenta nuevamente.</div>
      </div>
    );
  }

  // Transform questions to include colors
  const questionsWithColors = questionsData?.map(q => ({
    question: q.question,
    category: q.category,
    color: getColorForCategory(q.category)
  })) || [];

  return <ReflectionCard questions={questionsWithColors} onLogout={onLogout} />;
}
