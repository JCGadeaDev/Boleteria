import { useRouteError, Link } from 'react-router-dom';

const Error404 = () => {
    const error = useRouteError();
    
    // Mensajes por defecto si no hay error específico
    const status = error?.status || 404;
    const message = error?.data || error?.statusText || 'Página no encontrada';

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
            <div className="card max-w-md text-center">
                {/* Error Icon */}
                <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>

                {/* Error Title */}
                <h1 className="text-6xl font-bold text-gray-800 mb-2">
                    {status}
                </h1>
                
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                    ¡Oops!
                </h2>

                {/* Error Description */}
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    {message}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <Link 
                        to="/"
                        className="btn-primary flex-1 no-underline text-center"
                    >
                        Volver al Inicio
                    </Link>
                    
                    <button 
                        onClick={() => window.history.back()}
                        className="btn-secondary flex-1"
                    >
                        Volver Atrás
                    </button>
                </div>

                {/* Additional Help Text */}
                <p className="text-gray-500 text-sm mt-6">
                    Si el problema persiste, 
                    <Link 
                        to="/contact" 
                        className="text-primary hover:text-primary-dark underline ml-1"
                    >
                        contáctanos
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Error404;