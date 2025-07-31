import { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null, errorInfo: null };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { 
        hasError: true,
        error: error
      };
    }

    componentDidCatch(error, errorInfo) {
      // Log error details for debugging
      this.setState({
        error: error,
        errorInfo: errorInfo
      });
      
      // Optional: Log to external service
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // Custom fallback UI with Tailwind CSS
        if (this.props.fallback) {
          return this.props.fallback;
        }
        
        // Default fallback UI with Tailwind
        return (
          <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
            <div className="card max-w-lg w-full text-center">
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  ¡Oops! Algo salió mal
                </h2>
                <p className="text-gray-600 mb-6">
                  Ha ocurrido un error inesperado. Por favor, recarga la página o intenta más tarde.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={() => window.location.reload()}
                  className="btn-primary"
                >
                  Recargar Página
                </button>
                <button 
                  onClick={() => window.history.back()}
                  className="btn-secondary"
                >
                  Volver Atrás
                </button>
              </div>

              {/* Error details for development */}
              {import.meta.env.DEV && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm font-medium text-gray-500 hover:text-gray-700">
                    Ver detalles del error (desarrollo)
                  </summary>
                  <div className="mt-2 p-4 bg-gray-100 rounded-lg">
                    <pre className="text-xs text-red-600 overflow-auto">
                      {this.state.error && this.state.error.toString()}
                      <br />
                      {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                </details>
              )}
            </div>
          </div>
        );
      }
  
      return this.props.children;
    }
}

export default ErrorBoundary;