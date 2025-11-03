import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

type QuestionItem = { question: string; category: string };
type BackendQuestionsResponse = { questions: QuestionItem[] };

export function useQuestions() {
  return useQuery({
    queryKey: ["/api/questions"],
    queryFn: async () => {
      const res = await apiRequest<BackendQuestionsResponse>("GET", "/api/questions");
      return res.questions; // devolvemos el array puro
    },
  });
}
