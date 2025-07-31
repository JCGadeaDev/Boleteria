import { useParams, useNavigate } from "react-router-dom";
import { Suspense, useMemo } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import fetchEventData from "../../utils/fetchEvents";
import useLikedEvents from "../../hooks/useLikedEvents";

const EventDetailContent = ({ resource }) => {
    const eventData = resource.eventDetail.read();
    const navigate = useNavigate();
    const { isEventLiked, toggleLikeEvent } = useLikedEvents();

    const isLiked = isEventLiked(eventData.id);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleLikeEvent = () => {
        toggleLikeEvent(eventData.id);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
            <div className="container mx-auto px-4">
                {/* Header with Back Button */}
                <div className="flex items-center justify-between mb-6">
                    <button 
                        onClick={handleGoBack}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-700 border border-white/20 rounded-lg font-medium hover:bg-white hover:text-gray-900 transition-all duration-200 shadow-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Regresar
                    </button>

                    <button
                        onClick={handleLikeEvent}
                        className={`p-3 rounded-full transition-all duration-200 shadow-lg border-2 ${
                            isLiked 
                                ? 'bg-red-500 text-white hover:bg-red-600 border-red-500 hover:border-red-600 scale-105' 
                                : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500 border-white/50 hover:border-red-200 hover:scale-105'
                        }`}
                        aria-label={isLiked ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    >
                        <svg 
                            className="w-5 h-5" 
                            fill={isLiked ? "currentColor" : "none"}
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                            />
                        </svg>
                    </button>
                </div>

                {/* Main Event Info */}
                <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Event Image */}
                        <div className="relative">
                            <img 
                                src={eventData.images?.[0]?.url || 'https://via.placeholder.com/600x400/f3f4f6/9ca3af?text=Sin+Imagen'} 
                                className="w-full h-80 lg:h-96 object-cover rounded-xl shadow-lg"
                                alt={eventData.name}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/600x400/f3f4f6/9ca3af?text=Sin+Imagen';
                                }}
                            />
                        </div>

                        {/* Event Details */}
                        <div className="flex flex-col justify-center">
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                                {eventData.name}
                            </h1>
                            
                            {eventData.info && (
                                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                    {eventData.info}
                                </p>
                            )}

                            {/* Classification/Genre */}
                            {eventData.classifications?.[0] && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {eventData.classifications[0].genre?.name && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {eventData.classifications[0].genre.name}
                                        </span>
                                    )}
                                    {eventData.classifications[0].segment?.name && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                            {eventData.classifications[0].segment.name}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Date and Time */}
                            {eventData.dates?.start?.dateTime && (
                                <div className="flex items-center gap-3 mb-4 p-4 bg-indigo-50 rounded-lg">
                                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm">Fecha y Hora</p>
                                        <p className="text-indigo-700 font-bold">
                                            {format(new Date(eventData.dates.start.dateTime), "d 'de' LLLL 'de' yyyy 'a las' H:mm", { locale: es })}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Venue Info */}
                            {eventData._embedded?.venues?.[0] && (
                                <div className="flex items-start gap-3 mb-4 p-4 bg-gray-50 rounded-lg">
                                    <svg className="w-5 h-5 text-gray-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm">Lugar</p>
                                        <p className="font-bold text-gray-900">
                                            {eventData._embedded.venues[0].name}
                                        </p>
                                        {eventData._embedded.venues[0].address && (
                                            <p className="text-gray-600 text-sm">
                                                {eventData._embedded.venues[0].address.line1}
                                                {eventData._embedded.venues[0].city?.name && 
                                                    `, ${eventData._embedded.venues[0].city.name}`
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Price Range */}
                            {eventData.priceRanges?.[0] && (
                                <div className="flex items-start gap-3 mb-6 p-4 bg-green-50 rounded-lg">
                                    <svg className="w-5 h-5 text-green-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm">Rango de Precios</p>
                                        <p className="text-green-600 font-bold text-lg">
                                            ${eventData.priceRanges[0].min} - ${eventData.priceRanges[0].max} {eventData.priceRanges[0].currency}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Get Tickets Button */}
                            <a 
                                href={eventData.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-4 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg text-center text-lg no-underline inline-flex items-center justify-center gap-3"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                                Comprar Boletos en Ticketmaster
                            </a>
                        </div>
                    </div>
                </div>

                {/* Status del evento */}
                {eventData.dates?.status && (
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 mb-8">
                        <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                                eventData.dates.status.code === 'onsale' ? 'bg-green-500' : 
                                eventData.dates.status.code === 'offsale' ? 'bg-red-500' : 
                                'bg-yellow-500'
                            }`}></div>
                            <span className="font-semibold text-gray-800">
                                Estado: {eventData.dates.status.code === 'onsale' ? 'En venta' : 
                                        eventData.dates.status.code === 'offsale' ? 'Agotado' : 
                                        'No disponible'}
                            </span>
                        </div>
                    </div>
                )}

                {/* Seat Map Section */}
                {eventData.seatmap?.staticUrl && (
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            Mapa del Evento
                        </h2>
                        <div className="text-center">
                            <img 
                                src={eventData.seatmap.staticUrl} 
                                alt="Mapa de asientos del evento"
                                className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                )}

                {/* Additional Info */}
                {(eventData.pleaseNote || eventData.ticketLimit?.info) && (
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Información Adicional
                        </h2>
                        
                        {eventData.pleaseNote && (
                            <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                                <div className="flex items-start">
                                    <svg className="w-4 h-4 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold text-yellow-800 mb-1">Nota Importante:</p>
                                        <p className="text-yellow-700">{eventData.pleaseNote}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {eventData.ticketLimit?.info && (
                            <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                                <div className="flex items-start">
                                    <svg className="w-4 h-4 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold text-blue-800 mb-1">Límite de Boletos:</p>
                                        <p className="text-blue-700">{eventData.ticketLimit.info}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const Detail = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();

    const resource = useMemo(() => {
        return eventId ? fetchEventData(eventId) : null;
    }, [eventId]);

    if (!eventId) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 text-center">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">ID de evento no válido</h2>
                    <button 
                        onClick={() => navigate('/')} 
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all duration-200"
                    >
                        Regresar al inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 text-center">
                    <div className="flex items-center justify-center mb-4">
                        <svg className="animate-spin h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="m12 2a10 10 0 1 0 10 10h-4a6 6 0 1 1-6-6v-4z"></path>
                        </svg>
                    </div>
                    <p className="text-gray-700 font-medium">Cargando detalle del evento...</p>
                </div>
            </div>
        }>
            <EventDetailContent resource={resource} />
        </Suspense>
    );
};

export default Detail;