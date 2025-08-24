const SESSION_KEY = 'reflection_game_access';

export interface SessionData {
  hasAccess: boolean;
  accessGrantedAt: number;
  code: string;
}

export const sessionStorage = {
  setAccess: (code: string) => {
    const sessionData: SessionData = {
      hasAccess: true,
      accessGrantedAt: Date.now(),
      code
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  },

  getAccess: (): SessionData | null => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (!stored) return null;
      
      const sessionData: SessionData = JSON.parse(stored);
      
      // Check if session is still valid (24 hours)
      const twentyFourHours = 24 * 60 * 60 * 1000;
      if (Date.now() - sessionData.accessGrantedAt > twentyFourHours) {
        sessionStorage.clearAccess();
        return null;
      }
      
      return sessionData;
    } catch {
      return null;
    }
  },

  clearAccess: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  hasValidAccess: (): boolean => {
    const session = sessionStorage.getAccess();
    return session?.hasAccess === true;
  }
};
