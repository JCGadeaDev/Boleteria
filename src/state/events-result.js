import { create } from "zustand";

// Store para guardar valores de manera global
const useEventsResults = create((set) => ({
  data: null,
  error: null,
  isLoading: false,
  fetchEvents: async (params = "") => {
    try {
      set(() => ({ isLoading: true, error: null }));

      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${
          import.meta.env.VITE_TICKETMASTER_API_KEY
        }${params}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Verifica si el resultado contiene eventos válidos
      const validData = data?._embedded?.events ? data : { _embedded: { events: [] }, page: { totalPages: 0 } };

      set(() => ({
        data: validData,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      set(() => ({
        error,
        isLoading: false,
        data: null,
      }));
    }
  },
}));

export default useEventsResults;