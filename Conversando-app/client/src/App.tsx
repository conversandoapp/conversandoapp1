import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { sessionStorage } from "@/lib/session-storage";
import Welcome from "@/pages/welcome";
import Game from "@/pages/game";
import NotFound from "@/pages/not-found";

function Router() {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    const validAccess = sessionStorage.hasValidAccess();
    setHasAccess(validAccess);

    console.log("🚀 Lanzando wake up call al backend...");
    fetch("https://conversandoapp-back.onrender.com/wakeup")
      .then((res) => {
        console.log("✅ Backend respondió al wakeup:", res.status);
      })
      .catch((err) => {
        console.error("❌ No se pudo despertar el backend", err);
      });
  }, []);

  const handleAccessGranted = () => {
    setHasAccess(true);
  };

  const handleLogout = () => {
    setHasAccess(false);
  };

  // Show loading while checking session
  if (hasAccess === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  // Show welcome screen if no access
  if (!hasAccess) {
    return <Welcome onAccessGranted={handleAccessGranted} />;
  }

  // Show game if has access
  return (
    <Switch>
      <Route path="/">
        <Game onLogout={handleLogout} />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
