import { useState, useEffect, useCallback } from 'react';
import { LIKED_EVENTS_STORAGE_KEY } from '../utils/constants';

const useLikedEvents = () => {
    const [likedEvents, setLikedEvents] = useState([]);

    // Cargar eventos favoritos del localStorage al iniciar
    useEffect(() => {
        try {
            const stored = localStorage.getItem(LIKED_EVENTS_STORAGE_KEY);
            const events = stored ? JSON.parse(stored) : [];
            setLikedEvents(events);
        } catch (error) {
            console.error('Error loading liked events:', error);
            setLikedEvents([]);
        }
    }, []);

    // Verificar si un evento está en favoritos
    const isEventLiked = useCallback((eventId) => {
        return likedEvents.includes(eventId);
    }, [likedEvents]);

    // Agregar evento a favoritos
    const likeEvent = useCallback((eventId) => {
        if (!eventId) return;

        setLikedEvents(prev => {
            // Evitar duplicados
            if (prev.includes(eventId)) return prev;
            
            const updated = [...prev, eventId];
            
            try {
                localStorage.setItem(LIKED_EVENTS_STORAGE_KEY, JSON.stringify(updated));
            } catch (error) {
                console.error('Error saving liked event:', error);
            }
            
            return updated;
        });
    }, []);

    // Remover evento de favoritos
    const unlikeEvent = useCallback((eventId) => {
        if (!eventId) return;

        setLikedEvents(prev => {
            const updated = prev.filter(id => id !== eventId);
            
            try {
                localStorage.setItem(LIKED_EVENTS_STORAGE_KEY, JSON.stringify(updated));
            } catch (error) {
                console.error('Error removing liked event:', error);
            }
            
            return updated;
        });
    }, []);

    // Toggle estado de favorito
    const toggleLikeEvent = useCallback((eventId) => {
        if (isEventLiked(eventId)) {
            unlikeEvent(eventId);
        } else {
            likeEvent(eventId);
        }
    }, [isEventLiked, likeEvent, unlikeEvent]);

    // Limpiar todos los favoritos
    const clearAllLikedEvents = useCallback(() => {
        setLikedEvents([]);
        try {
            localStorage.removeItem(LIKED_EVENTS_STORAGE_KEY);
        } catch (error) {
            console.error('Error clearing liked events:', error);
        }
    }, []);

    return {
        likedEvents,
        isEventLiked,
        likeEvent,
        unlikeEvent,
        toggleLikeEvent,
        clearAllLikedEvents,
        likedEventsCount: likedEvents.length
    };
};

export default useLikedEvents;