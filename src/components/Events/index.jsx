import { memo } from "react";
import EventItem from "./components/EventItem";

const Events = ({ searchTerm = "", events = [] }) => {
    const renderEvents = () => {
        let eventsFiltered = events;

        if (searchTerm.length > 0) {
            eventsFiltered = events.filter((item) =>
                item.name?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (eventsFiltered.length === 0) {
            return (
                <div className="col-span-full flex items-center justify-center py-20">
                    <div className="text-center max-w-md">
                        <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.762-6.236-2.053L7 21l5-6 5 6 1.236-8.053A7.962 7.962 0 0112 15z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">
                            {searchTerm 
                                ? 'No encontramos eventos' 
                                : 'No hay eventos disponibles'
                            }
                        </h3>
                        <p className="text-gray-500 leading-relaxed">
                            {searchTerm 
                                ? `No se encontraron eventos para "${searchTerm}". Intenta con otros términos de búsqueda.`
                                : 'No hay eventos disponibles en este momento. Vuelve a intentar más tarde.'
                            }
                        </p>
                    </div>
                </div>
            );
        }

        return eventsFiltered.map((eventItem, index) => (
            <EventItem
                key={`event-item-${eventItem.id}-${index}`}
                name={eventItem.name}
                info={eventItem.info}
                images={eventItem.images?.[0]?.url}
                onEventClick={(eventId) => {
                    window.location.href = `/detail/${eventId}`;
                }}
                id={eventItem.id}
            />
        ));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {renderEvents()}
        </div>
    );
};

Events.displayName = 'Events';

export default memo(Events);