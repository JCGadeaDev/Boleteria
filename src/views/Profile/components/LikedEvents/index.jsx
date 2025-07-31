import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { 
    LIKED_EVENTS_STORAGE_KEY, 
    TICKETMASTER_BASE_URL,
    ERROR_MESSAGES 
} from '../../../../utils/constants';
import EventItem from '../../../../components/Events/components/EventItem';

const LikedEvents = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventsDetails = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                const likedEvents = JSON.parse(localStorage.getItem(LIKED_EVENTS_STORAGE_KEY)) || [];
                
                if (likedEvents.length === 0) {
                    setEvents([]);
                    return;
                }

                // Validar API key
                if (!import.meta.env.VITE_TICKETMASTER_API_KEY) {
                    throw new Error(ERROR_MESSAGES.API_KEY_MISSING);
                }

                const results = [];
                const failedEvents = [];

                // Usar Promise.allSettled para manejar errores individuales
                const promises = likedEvents.map(async (eventId) => {
                    try {
                        const response = await fetch(
                            `${TICKETMASTER_BASE_URL}/events/${eventId}.json?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}`
                        );

                        if (!response.ok) {
                            if (response.status === 404) {
                                failedEvents.push(eventId);
                                return null;
                            }
                            throw new Error(`HTTP Error: ${response.status}`);
                        }

                        const data = await response.json();
                        return data;
                    } catch (error) {
                        console.error(`Error fetching event ${eventId}:`, error);
                        failedEvents.push(eventId);
                        return null;
                    }
                });

                const eventResults = await Promise.allSettled(promises);
                
                eventResults.forEach((result) => {
                    if (result.status === 'fulfilled' && result.value) {
                        results.push(result.value);
                    }
                });

                // Limpiar eventos que ya no existen del localStorage
                if (failedEvents.length > 0) {
                    const updatedLikedEvents = likedEvents.filter(id => !failedEvents.includes(id));
                    localStorage.setItem(LIKED_EVENTS_STORAGE_KEY, JSON.stringify(updatedLikedEvents));
                }
                
                setEvents(results);
            } catch (error) {
                console.error('Error fetching liked events:', error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEventsDetails();
    }, []);

    const handleEventItemClick = (eventId) => {
        navigate(`/detail/${eventId}`);
    };

    const handleClearAllLiked = () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar todos los eventos favoritos?')) {
            localStorage.removeItem(LIKED_EVENTS_STORAGE_KEY);
            setEvents([]);
        }
    };

    // Loading State
    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">Eventos Favoritos</h2>
                </div>
                
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-4">
                            <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="m12 2a10 10 0 1 0 10 10h-4a6 6 0 1 1-6-6v-4z"></path>
                            </svg>
                        </div>
                        <p className="text-gray-600 font-medium">Cargando eventos favoritos...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">Eventos Favoritos</h2>
                </div>
                
                <div className="card text-center">
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Error al cargar favoritos
                    </h3>
                    <p className="text-gray-600 mb-4">
                        {error.message || 'Ha ocurrido un error inesperado'}
                    </p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="btn-primary"
                    >
                        Intentar de nuevo
                    </button>
                </div>
            </div>
        );
    }

    // Empty State
    if (events.length === 0) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">Eventos Favoritos</h2>
                </div>
                
                <div className="card text-center py-12">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        No tienes eventos favoritos
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Explora eventos y marca los que te interesen como favoritos
                    </p>
                    <button 
                        onClick={() => navigate('/')}
                        className="btn-primary"
                    >
                        Explorar Eventos
                    </button>
                </div>
            </div>
        );
    }

    // Success State - Events Found
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Eventos Favoritos</h2>
                    <p className="text-gray-600">
                        {events.length} evento{events.length !== 1 ? 's' : ''} guardado{events.length !== 1 ? 's' : ''}
                    </p>
                </div>
                
                {events.length > 0 && (
                    <button 
                        onClick={handleClearAllLiked}
                        className="btn-secondary text-sm"
                    >
                        Limpiar Favoritos
                    </button>
                )}
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, index) => (
                    <EventItem 
                        key={`liked-event-item-${event.id}-${index}`}
                        name={event.name}
                        info={event.info}
                        images={event.images?.[0]?.url}
                        onEventClick={handleEventItemClick}
                        id={event.id}
                    />
                ))}
            </div>

            {/* Footer Info */}
            <div className="card">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <p className="font-semibold text-blue-800 mb-1">Información:</p>
                        <p className="text-blue-700 text-sm">
                            Tus eventos favoritos se guardan localmente en tu navegador. 
                            Si algunos eventos ya no están disponibles, se eliminarán automáticamente de tu lista.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LikedEvents;