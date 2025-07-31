import { create } from "zustand";
import { 
  TICKETMASTER_BASE_URL, 
  TICKETMASTER_EVENTS_ENDPOINT, 
  ERROR_MESSAGES,
  API_DEFAULT_SIZE 
} from "../utils/constants";

const useEventsResults = create((set) => ({
  // Estado inicial
  data: null,
  isLoading: false,
  error: null,

  // Acción para fetch de eventos
  fetchEvents: async (params = "") => {
    // Verificar API key
    if (!import.meta.env.VITE_TICKETMASTER_API_KEY) {
      set(() => ({
        error: new Error(ERROR_MESSAGES.API_KEY_MISSING),
        isLoading: false,
        data: null
      }));
      return;
    }

    try {
      // Establecer loading state
      set(() => ({ isLoading: true, error: null }));

      const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;
      const url = `${TICKETMASTER_BASE_URL}${TICKETMASTER_EVENTS_ENDPOINT}?apikey=${apiKey}&size=${API_DEFAULT_SIZE}${params?.length ? `&${params}` : ''}`;

      console.log('Fetching events from:', url);

      // Hacer la petición
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
        }
        if (response.status === 404) {
          throw new Error(ERROR_MESSAGES.NO_EVENTS_FOUND);
        }
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const result = await response.json();

      // Actualizar estado con los datos
      set(() => ({
        data: result,
        isLoading: false,
        error: null
      }));

    } catch (error) {
      console.error('Error fetching events:', error);
      
      // Manejar diferentes tipos de errores
      let errorMessage = ERROR_MESSAGES.GENERIC_ERROR;
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
      } else if (error.message.includes('API Key')) {
        errorMessage = ERROR_MESSAGES.API_KEY_MISSING;
      } else if (error.message.includes('401')) {
        errorMessage = ERROR_MESSAGES.UNAUTHORIZED;
      } else if (error.message.includes('404')) {
        errorMessage = ERROR_MESSAGES.NO_EVENTS_FOUND;
      }

      set(() => ({
        error: new Error(errorMessage),
        isLoading: false,
        data: null,
      }));
    }
  },

  // Acción para limpiar errores
  clearError: () => set(() => ({ error: null })),

  // Acción para resetear el estado
  reset: () => set(() => ({
    data: null,
    isLoading: false,
    error: null
  }))
}));

export default useEventsResults;