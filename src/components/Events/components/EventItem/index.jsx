import { memo } from 'react';
import useLikedEvents from "../../../../hooks/useLikedEvents";

const EventItem = ({ info, id, name, images, onEventClick }) => {
  const { isEventLiked, toggleLikeEvent } = useLikedEvents();

  const handleSeeMoreClick = (evt) => {
    evt.stopPropagation();
    onEventClick(id);
  };

  const handleHearthClick = (evt) => {
    evt.stopPropagation();
    toggleLikeEvent(id);
  };

  const isLiked = isEventLiked(id);

  return (
    <div className="group">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:bg-white border border-white/20">
        <div className="relative">
          {/* ✅ Heart/Like Button CORREGIDO */}
          <button
            onClick={handleHearthClick}
            className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg border-2 ${
              isLiked 
                ? 'bg-red-500 text-white hover:bg-red-600 border-red-500 hover:border-red-600 scale-105' 
                : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500 border-white/50 hover:border-red-200 hover:scale-105'
            }`}
            aria-label={isLiked ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            {/* ✅ SVG con tamaño optimizado */}
            <svg 
              className="w-4 h-4" 
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

          {/* Event Image */}
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={images || 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Sin+Imagen'}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Sin+Imagen';
              }}
            />
          </div>
        </div>

        {/* Event Info */}
        <div className="p-5">
          <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-tight">
            {name}
          </h4>
          
          {info && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
              {info}
            </p>
          )}
          
          {/* See More Button */}
          <button 
            onClick={handleSeeMoreClick} 
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 px-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] text-sm"
          >
            Ver detalles
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(EventItem);