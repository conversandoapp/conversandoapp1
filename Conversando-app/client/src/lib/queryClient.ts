import { QueryClient, QueryFunction } from "@tanstack/react-query";

const API_BASE_URL = "https://conversandoapp-back.onrender.com";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    console.error("❌ Respuesta NO OK:", res.status, text);
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  console.log(`📡 apiRequest → ${method} ${API_BASE_URL}${url}`, data || "");

  const res = await fetch(`${API_BASE_URL}${url}`, {   
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  console.log(`📥 Respuesta de ${url}:`, res.status);
  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    console.log("🔎 Ejecutando queryFn con key:", queryKey);

    const res = await fetch(`${API_BASE_URL}${queryKey[0] as string}`, { 
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      console.warn("⚠️ 401 detectado, devolviendo null");
      return null;
    }

    console.log(`📥 Respuesta de queryFn ${queryKey[0]}:`, res.status);
    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
      onError: (error) => {
        console.error("❌ Error global en Query:", error);
      },
    },
    mutations: {
      retry: false,
      onError: (error) => {
        console.error("❌ Error en Mutation:", error);
      },
    },
  },
});
