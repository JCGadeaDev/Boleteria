import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import ReactPaginate from 'react-paginate';

import Navbar from '../../components/Navbar';
import Events from '../../components/Events';
import useEventsResults from '../../state/events-result';

const Home = () => {
    const { data, isLoading, error, fetchEvents } = useEventsResults();
    const events = useMemo(() => data?._embedded?.events || [], [data?._embedded?.events]);
    const page = useMemo(() => data?.page || {}, [data?.page]);
    const pageCount = useMemo(() => {
        const total = page?.totalPages;
        return Number.isInteger(total) ? total : 0;
    }, [page?.totalPages]);

    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef();
    const fetchMyEventsRef = useRef();

    fetchMyEventsRef.current = fetchEvents;

    useEffect(() => {
        fetchMyEventsRef.current();
    }, []);

    const handleNavbarSearch = useCallback((term) => {
        setSearchTerm(term);
        const params = term ? `keyword=${encodeURIComponent(term)}` : '';
        fetchEvents(params);
    }, [fetchEvents]);

    const handlePageClick = useCallback(({ selected }) => {
        const keywordParam = searchTerm ? `keyword=${encodeURIComponent(searchTerm)}` : '';
        const pageParam = `page=${selected}`;
        const params = [keywordParam, pageParam].filter(Boolean).join('&');
        fetchEvents(params);
    }, [searchTerm, fetchEvents]);

    // Loading State
    if (isLoading) {
        return (
            <div className="page-container">
                <div className="container mx-auto px-4 py-8">
                    <Navbar onSearch={handleNavbarSearch} ref={containerRef} />
                    
                    <div className="flex items-center justify-center py-20">
                        <div className="card text-center">
                            <div className="flex items-center justify-center mb-4">
                                <svg className="animate-spin h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="m12 2a10 10 0 1 0 10 10h-4a6 6 0 1 1-6-6v-4z"></path>
                                </svg>
                            </div>
                            <p className="text-gray-700 font-medium">
                                {searchTerm ? `Buscando "${searchTerm}"...` : 'Cargando eventos...'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="page-container">
                <div className="container mx-auto px-4 py-8">
                    <Navbar onSearch={handleNavbarSearch} ref={containerRef} />
                    
                    <div className="flex items-center justify-center py-20">
                        <div className="card max-w-md text-center">
                            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">
                                Error al cargar eventos
                            </h2>
                            <p className="text-gray-600 mb-4">
                                {error.message || 'Ha ocurrido un error inesperado'}
                            </p>
                            <button 
                                onClick={() => fetchEvents()}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm hover:shadow-md transition-all duration-200 inline-flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Intentar de nuevo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // No Events State
    if (events.length === 0) {
        return (
            <div className="page-container">
                <div className="container mx-auto px-4 py-8">
                    <Navbar onSearch={handleNavbarSearch} ref={containerRef} />
                    
                    <div className="flex items-center justify-center py-20">
                        <div className="card max-w-md text-center">
                            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.762-6.236-2.053L7 21l5-6 5 6 1.236-8.053A7.962 7.962 0 0112 15z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">
                                No se encontraron eventos
                            </h2>
                            <p className="text-gray-600 mb-4">
                                {searchTerm 
                                    ? `No hay eventos para "${searchTerm}". Intenta con otros términos.`
                                    : 'No hay eventos disponibles en este momento.'
                                }
                            </p>
                            {searchTerm && (
                                <button 
                                    onClick={() => handleNavbarSearch('')}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-sm hover:shadow-md transition-all duration-200 inline-flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Ver todos los eventos
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Success State - Events Found
    return (
        <div className="page-container">
            <div className="container mx-auto px-4 py-8">
                <Navbar onSearch={handleNavbarSearch} ref={containerRef} />
                
                {/* Header con título principal */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                            Descubre Eventos Increíbles
                        </span>
                    </h1>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto">
                        Encuentra los mejores conciertos, espectáculos y eventos en tu ciudad
                    </p>
                </div>
                
                {/* Results Summary */}
                <div className="mb-8">
                    <div className="card">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={searchTerm ? "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" : "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"} />
                                    </svg>
                                    {searchTerm ? `Resultados para "${searchTerm}"` : 'Eventos Disponibles'}
                                </h2>
                                <p className="text-gray-600 mt-1">
                                    {page.totalElements ? 
                                        `${page.totalElements} evento${page.totalElements !== 1 ? 's' : ''} encontrado${page.totalElements !== 1 ? 's' : ''}` 
                                        : `${events.length} eventos disponibles`
                                    }
                                </p>
                            </div>
                            
                            {searchTerm && (
                                <button 
                                    onClick={() => handleNavbarSearch('')}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-sm hover:shadow-md transition-all duration-200 inline-flex items-center justify-center gap-2 text-sm"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Limpiar búsqueda
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="mb-8">
                    <Events searchTerm={searchTerm} events={events} />
                </div>

                {/* Pagination */}
                {pageCount > 1 && (
                    <div className="flex justify-center">
                        <div className="card p-4">
                            <ReactPaginate
                                className="flex items-center gap-2"
                                nextClassName="pagination-btn"
                                previousClassName="pagination-btn"
                                pageClassName="pagination-page"
                                activeClassName="pagination-active"
                                disabledClassName="pagination-disabled"
                                breakClassName="pagination-break"
                                breakLabel="..."
                                nextLabel={
                                    <div className="flex items-center justify-center">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                }
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={1}
                                pageCount={pageCount}
                                forcePage={page.number || 0}
                                previousLabel={
                                    <div className="flex items-center justify-center">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </div>
                                }
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    </div>
                )}

                {/* Footer info */}
                <div className="mt-12 text-center">
                    <div className="card max-w-2xl mx-auto">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-lg font-semibold text-gray-800">
                                Powered by Ticketmaster
                            </h3>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Todos los eventos son proporcionados por la API oficial de Ticketmaster. 
                            Los precios y disponibilidad pueden cambiar sin previo aviso.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;