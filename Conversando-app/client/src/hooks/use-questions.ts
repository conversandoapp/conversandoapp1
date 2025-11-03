import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

type BackendQuestion = { id: string; question: string };
type BackendQuestionsResponse = { questions: BackendQuestion[] };

// Por si apiRequest aún devolviera Response en tu proyecto,
// este helper fuerza a que tengamos {questions: [...]}
async function fetchQuestions(): Promise<BackendQuestion[]> {
  const res = await apiRequest<BackendQuestionsResponse>("GET", "/api/questions");
  // Validación defensiva para evitar crasheos silenciosos
  if (!res || !Array.isArray(res.questions)) {
    console.error("❌ Respuesta /api/questions inválida:", res);
    return []; // evita que truene la UI
  }
  console.log(`✅ /api/questions OK. Cantidad: ${res.questions.length}`);
  return res.questions;
}

export function useQuestions() {
  return useQuery({
    queryKey: ["/api/questions"],
    queryFn: fetchQuestions,
  });
}
