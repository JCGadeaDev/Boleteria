import { useState, useCallback } from 'react';
import { 
  TICKETMASTER_BASE_URL, 
  TICKETMASTER_EVENTS_ENDPOINT, 
  ERROR_MESSAGES 
} from '../utils/constants';

const useEventsData = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchEvents = useCallback(async (params = '') => {
        if (!import.meta.env.VITE_TICKETMASTER_API_KEY) {
            setError(new Error(ERROR_MESSAGES.API_KEY_MISSING)); // Usa la constante
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;
            const url = `${TICKETMASTER_BASE_URL}${TICKETMASTER_EVENTS_ENDPOINT}?apikey=${apiKey}${params?.length ? `&${params}` : ''}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`${ERROR_MESSAGES.NETWORK_ERROR} (${response.status})`);
            }

            // ... resto del código
        } catch (error) {
            console.error('Error fetching events:', error);
            setError(error);
            setData(null);
        } finally {
            setIsLoading(false);
        }
    }, []);


    // Función para limpiar el estado
    const clearData = useCallback(() => {
        setData(null);
        setError(null);
        setIsLoading(false);
    }, []);

    return {
        events: data?._embedded?.events || [],
        page: data?.page || {},
        totalElements: data?.page?.totalElements || 0,
        totalPages: data?.page?.totalPages || 0,
        isLoading,
        error,
        fetchEvents,
        clearData,
        hasData: Boolean(data?._embedded?.events?.length)
    };
};

export default useEventsData;