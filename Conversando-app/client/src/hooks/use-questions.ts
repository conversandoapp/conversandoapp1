import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// Lo que responde tu backend: { questions: [{ id, question }] }
type BackendQuestionsResponse = {
  questions: { id: string; question: string }[];
};

export function useQuestions() {
  return useQuery({
    queryKey: ["/api/questions"],
    queryFn: async () => {
      // GET al backend y devolvemos SOLO el array
      const res = await apiRequest<BackendQuestionsResponse>("GET", "/api/questions");
      return res.questions; // <-- muy importante: retornamos el array
    },
  });
}
