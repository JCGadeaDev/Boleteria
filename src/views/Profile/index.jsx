import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

const Profile = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleTabClick = (path) => {
    navigate(`/profile/${path}`);
  };

  const isActiveTab = (tabPath) => {
    return pathname.includes(tabPath);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Home Link */}
        <div className="mb-8">
          <Link 
            to={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-white hover:text-gray-200 transition-colors duration-200 no-underline group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Volver al Inicio</span>
          </Link>
        </div>

        {/* Profile Container */}
        <div className="card">
          {/* Profile Header */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex items-center gap-3 pb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Mi Perfil</h1>
                <p className="text-gray-600">Gestiona tu información y preferencias</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => handleTabClick("my-info")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  isActiveTab("my-info")
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                aria-current={isActiveTab("my-info") ? "page" : undefined}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Mi Información
                </div>
              </button>

              <button
                onClick={() => handleTabClick("liked-events")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  isActiveTab("liked-events")
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                aria-current={isActiveTab("liked-events") ? "page" : undefined}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Eventos Favoritos
                </div>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            <Outlet />
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-white/70 text-sm">
            🎫 Mi Boletera - Tu portal de eventos favorito
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;