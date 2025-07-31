import wrapPromise from "./wrapPromise";
import { 
  TICKETMASTER_BASE_URL, 
  TICKETMASTER_EVENTS_ENDPOINT,
  ERROR_MESSAGES,
  API_DEFAULT_SIZE 
} from "./constants";

// Función para obtener lista de eventos (para Home)
const fetchEventsList = async (params = "") => {
    if (!import.meta.env.VITE_TICKETMASTER_API_KEY) {
        throw new Error(ERROR_MESSAGES.API_KEY_MISSING);
    }

    try {
        const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;
        const url = `${TICKETMASTER_BASE_URL}${TICKETMASTER_EVENTS_ENDPOINT}?apikey=${apiKey}&size=${API_DEFAULT_SIZE}${params?.length ? `&${params}` : ''}`;

        console.log('Fetching events list:', url);

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
            }
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        console.error('Error fetching events list:', error);
        
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
        }
        
        throw error;
    }
};

// Función para obtener detalle de un evento específico (para Detail)
const fetchEventDetail = async (eventId) => {
    if (!eventId) {
        throw new Error('ID del evento es requerido');
    }

    if (!import.meta.env.VITE_TICKETMASTER_API_KEY) {
        throw new Error(ERROR_MESSAGES.API_KEY_MISSING);
    }

    try {
        const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;
        const url = `${TICKETMASTER_BASE_URL}/events/${eventId}.json?apikey=${apiKey}`;
        
        console.log('Fetching event detail:', url);

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Evento no encontrado');
            }
            if (response.status === 401) {
                throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
            }
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data.errors) {
            throw new Error(data.errors[0]?.detail || 'Error en la API de Ticketmaster');
        }

        return data;

    } catch (error) {
        console.error('Error fetching event detail:', error);
        
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
        }
        
        throw error;
    }
};

// Función para obtener eventos relacionados
const fetchRelatedEvents = async (eventId, limit = 5) => {
    if (!eventId || !import.meta.env.VITE_TICKETMASTER_API_KEY) {
        return { _embedded: { events: [] } };
    }

    try {
        const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;
        const url = `${TICKETMASTER_BASE_URL}/events.json?apikey=${apiKey}&size=${limit}&sort=relevance,desc`;

        const response = await fetch(url);
        
        if (!response.ok) {
            console.warn('Failed to fetch related events');
            return { _embedded: { events: [] } };
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.warn('Error fetching related events:', error);
        return { _embedded: { events: [] } };
    }
};

// Función para Suspense - Detail page
const fetchEventData = (eventId) => {
    if (!eventId) {
        throw new Error('ID del evento es requerido para obtener los datos');
    }

    return {
        eventDetail: wrapPromise(fetchEventDetail(eventId)),
        relatedEvents: wrapPromise(fetchRelatedEvents(eventId))
    };
};

// Función helper para verificar si un evento existe
const checkEventExists = async (eventId) => {
    try {
        await fetchEventDetail(eventId);
        return true;
    } catch (error) {
        return false;
    }
};

// Exports
export default fetchEventData; // Para Detail page
export { 
    fetchEventsList,     // Para Home page (Zustand)
    fetchEventDetail, 
    fetchRelatedEvents, 
    checkEventExists 
};