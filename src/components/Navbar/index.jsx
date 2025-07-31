import { useState, useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import { DEBOUNCE_DELAY, ROUTES } from "../../utils/constants";

const Navbar = forwardRef(({ onSearch }, ref) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (onSearch) {
        onSearch(search);
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [search, onSearch]);

  const handleInputChange = (evt) => {
    setSearch(evt.target.value);
  };

  const handleInputKeyDown = (evt) => {
    if (evt.key === "Enter") {
      evt.preventDefault();
      if (onSearch) {
        onSearch(search);
      }
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <nav
      ref={ref}
      className="mb-6 w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0"
    >
      {/* Logo/Brand */}
      <div className="flex-1">
        <Link 
          to={ROUTES.HOME}
          className="text-2xl font-bold text-white hover:text-gray-200 transition-colors no-underline"
        >
          🎫 Mi Boletera
        </Link>
      </div>

      {/* Search and Profile */}
      <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
        {/* Search Input with Clear Button */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Buscar eventos..."
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            value={search}
            className="input w-full pr-10 pl-10"
          />
          {/* Search Icon */}
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {/* Clear Button */}
          {search && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Profile Link */}
        <Link 
          to={ROUTES.MY_INFO}
          className="flex items-center gap-2 px-3 py-2 text-white no-underline hover:text-gray-200 hover:bg-white/10 rounded-lg transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="hidden sm:inline">Mi Perfil</span>
        </Link>
      </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;