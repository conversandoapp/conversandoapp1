import { useState, useEffect } from 'react';
import { Heart, Shuffle, RotateCcw, LogOut, Moon, Triangle, ChevronLeft } from 'lucide-react';
import { sessionStorage } from '@/lib/session-storage';
const backgroundImage = '/background.png';

interface ReflectionQuestion {
  question: string;
  category: string;
  color: string;
}

interface ReflectionCardProps {
  questions: ReflectionQuestion[];
  onReset?: () => void;
  onShuffle?: () => void;
  onLogout?: () => void;
}

// Category design configurations based on reference images
const categoryDesigns: Record<string, {
  backgroundColor: string;
  textColor: string;
  icon: React.ComponentType<{ className?: string }>;
}> = {
  "Reflexivo": {
    backgroundColor: "bg-blue-500", // Blue background like in image
    textColor: "text-blue-500",
    icon: Moon // Half-moon icon like in image
  },
  "Relaciones amorosas": {
    backgroundColor: "bg-orange-500", // Orange background like in image
    textColor: "text-orange-500", 
    icon: Heart // Heart icon like in image
  },
  "Cotidiano": {
    backgroundColor: "bg-green-500", // Green background like in image
    textColor: "text-green-500",
    icon: Triangle // Triangle icon like in image
  }
};

// Generate design for other categories
const generateCategoryDesign = (category: string) => {
  const colors = [
    { bg: "bg-purple-500", text: "text-purple-500" },
    { bg: "bg-pink-500", text: "text-pink-500" },
    { bg: "bg-indigo-500", text: "text-indigo-500" },
    { bg: "bg-cyan-500", text: "text-cyan-500" },
    { bg: "bg-teal-500", text: "text-teal-500" },
    { bg: "bg-yellow-500", text: "text-yellow-500" },
    { bg: "bg-red-500", text: "text-red-500" },
    { bg: "bg-emerald-500", text: "text-emerald-500" },
    { bg: "bg-violet-500", text: "text-violet-500" },
    { bg: "bg-rose-500", text: "text-rose-500" }
  ];
  
  const icons = [Moon, Heart, Triangle];
  
  // Use category name to generate consistent design
  const colorIndex = category.length % colors.length;
  const iconIndex = Math.abs(category.charCodeAt(0) || 0) % icons.length;
  
  return {
    backgroundColor: colors[colorIndex].bg,
    textColor: colors[colorIndex].text,
    icon: icons[iconIndex]
  };
};

export function ReflectionCard({ questions, onReset, onShuffle, onLogout }: ReflectionCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0); // Start with first question
  const [showingQuestion, setShowingQuestion] = useState(false); // Track if showing question or category back
  const [favorites, setFavorites] = useState<number[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<ReflectionQuestion[]>([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isDiscarding, setIsDiscarding] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  // Initialize shuffled questions
  useEffect(() => {
    if (questions.length > 0) {
      setShuffledQuestions([...questions].sort(() => Math.random() - 0.5));
      setCurrentIndex(0); // Start with first question
      setShowingQuestion(false); // Start showing category back
    }
  }, [questions]);

  const currentQuestion = shuffledQuestions[currentIndex] || null;

  // Get design for current category
  const getCategoryDesign = (category: string) => {
    return categoryDesigns[category] || generateCategoryDesign(category);
  };

  const handleCardClick = () => {
    if (isFlipping || isDiscarding || isEntering) return; // Prevent clicking during animations
    
    console.log('Card clicked. Current state:', { showingQuestion, currentIndex, isFlipping });
    
    if (!showingQuestion) {
      // From category back to question - flip to show question
      console.log('Flipping to show question');
      setIsFlipping(true);
      setShowingQuestion(true);
      
      // Reset flipping state after animation
      setTimeout(() => {
        setIsFlipping(false);
      }, 600);
    } else {
      // From question to category back first, then discard
      console.log('Flipping back to category, then discarding');
      setIsFlipping(true);
      setShowingQuestion(false);
      
      // After flip back to category, start discard animation
      setTimeout(() => {
        setIsFlipping(false);
        setIsDiscarding(true);
        
        // After discard animation, change to new card
        setTimeout(() => {
          if (currentIndex < shuffledQuestions.length - 1) {
            setCurrentIndex(currentIndex + 1);
          } else {
            // After last question, go back to first category
            setCurrentIndex(0);
          }
          setIsDiscarding(false);
          setIsEntering(true);
          
          // Reset entering state after animation
          setTimeout(() => {
            setIsEntering(false);
          }, 800);
        }, 800);
      }, 600);
    }
  };

  const toggleFavorite = () => {
    setFavorites(prev => 
      prev.includes(currentIndex) 
        ? prev.filter(i => i !== currentIndex)
        : [...prev, currentIndex]
    );
  };

  const goToPreviousCard = () => {
    if (isFlipping || isDiscarding || isEntering) return; // Prevent clicking during animations
    
    if (showingQuestion) {
      // From question back to category back - simple flip
      setIsFlipping(true);
      setShowingQuestion(false);
      
      setTimeout(() => {
        setIsFlipping(false);
      }, 600);
    } else {
      // From category back to previous question - discard and show previous
      setIsDiscarding(true);
      
      setTimeout(() => {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        } else {
          // If at first card, go to last question
          setCurrentIndex(shuffledQuestions.length - 1);
        }
        setShowingQuestion(true);
        setIsDiscarding(false);
        setIsEntering(true);
        
        setTimeout(() => {
          setIsEntering(false);
        }, 800);
      }, 800);
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setShowingQuestion(false);
    setFavorites([]);
    if (onReset) onReset();
  };

  const shuffleQuestions = () => {
    const newShuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(newShuffled);
    setCurrentIndex(0);
    setShowingQuestion(false);
    if (onShuffle) onShuffle();
  };

  const handleLogout = () => {
    sessionStorage.clearAccess();
    if (onLogout) onLogout();
  };

  if (shuffledQuestions.length === 0) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="text-white text-xl bg-black/50 p-4 rounded-lg">No hay preguntas disponibles</div>
      </div>
    );
  }

  // Get design based on current question
  const categoryDesign = currentQuestion 
    ? getCategoryDesign(currentQuestion.category)
    : { backgroundColor: "bg-purple-600", textColor: "text-purple-600", icon: Heart };
  const CategoryIcon = categoryDesign.icon;

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Header with logout button */}
      <div className="w-full max-w-4xl flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 hover:bg-red-600/30 px-4 py-2 rounded-lg transition-colors bg-[#dc2626d4] text-[#fadada]"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>
      {/* Main card container */}
      <div className="w-full max-w-md mx-auto">
        {/* Card */}
        <div className="w-full h-96 cursor-pointer" onClick={handleCardClick}>
          <div className={`flip-container relative w-full h-full hover:scale-[1.02] active:scale-[0.98]`}>
            <div className={`flip-card ${showingQuestion ? 'flipped' : ''} ${isDiscarding ? 'animate-discard' : ''} ${isEntering ? 'animate-enter' : ''}`}>
              {/* Category Back Card (Front face) */}
              <div className="flip-card-front">
                <div className={`w-full h-full rounded-2xl shadow-2xl ${categoryDesign.backgroundColor} flex flex-col items-center justify-center p-8 relative`}>
                  {/* Decorative icons in corners */}
                  <div className="absolute top-6 left-6">
                    <CategoryIcon className="w-10 h-10 text-white stroke-2" />
                  </div>
                  <div className="absolute bottom-6 right-6">
                    <CategoryIcon className="w-10 h-10 text-white stroke-2" />
                  </div>
                  
                  {/* Central circle with category name only */}
                  <div className="rounded-full w-64 h-64 flex items-center justify-center shadow-xl" style={{ backgroundColor: '#FEE0C5' }}>
                    <div className={`text-center ${categoryDesign.textColor} px-4`}>
                      <div className="text-2xl font-bold leading-tight">
                        {currentQuestion?.category}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Question Card (Back face) */}
              <div className="flip-card-back">
                <div className={`w-full h-full rounded-2xl shadow-2xl ${categoryDesign.backgroundColor} flex flex-col items-center justify-center p-8 relative`}>
                  {/* Decorative icons in corners */}
                  <div className="absolute top-6 left-6">
                    <CategoryIcon className="w-10 h-10 text-white stroke-2" />
                  </div>
                  <div className="absolute bottom-6 right-6">
                    <CategoryIcon className="w-10 h-10 text-white stroke-2" />
                  </div>
                  
                  {/* Central circle with question */}
                  <div className="rounded-full w-64 h-64 flex items-center justify-center shadow-xl" style={{ backgroundColor: '#FEE0C5' }}>
                    <div className={`text-center ${categoryDesign.textColor} px-6`}>
                      <div className="text-base font-medium leading-tight">
                        {currentQuestion?.question}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPreviousCard();
            }}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50 text-[#000000] ml-[1px] mr-[1px]"
            disabled={isFlipping || isDiscarding || isEntering}
            title="Ver carta anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
            className="p-3 rounded-full transition-colors bg-white/20 hover:bg-white/30 text-[#000000]"
          >
            <Heart className={`w-5 h-5 ${favorites.includes(currentIndex) ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Question counter */}
        <div className="text-center mt-4 text-[#000000]">
          {showingQuestion 
            ? `Pregunta ${currentIndex + 1} de ${shuffledQuestions.length}`
            : `Carta ${currentIndex + 1} de ${shuffledQuestions.length}`
          }
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={shuffleQuestions}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-[#000000]"
          >
            <Shuffle className="w-4 h-4" />
            Mezclar
          </button>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-[#000000]"
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
}