import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { CodeValidationRequest, CodeValidationResponse } from "@shared/schema";

export function useCodeValidation() {
  return useMutation({
    mutationFn: async (data: CodeValidationRequest): Promise<CodeValidationResponse> => {
      const response = await apiRequest("POST", "/api/validate-code", data);
      return response.json();
    },
  });
}
