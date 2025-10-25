import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { CodeValidationRequest, CodeValidationResponse } from "@shared/schema";

export function useCodeValidation() {
  return useMutation({
    mutationFn: async (data: CodeValidationRequest): Promise<CodeValidationResponse> => {
      // ✅ POST con body JSON; apiRequest ya devuelve el objeto parseado
      return await apiRequest<CodeValidationResponse>("POST", "/api/validate-code", data);
    },
  });
}
