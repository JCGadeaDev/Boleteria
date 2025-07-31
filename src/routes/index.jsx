import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import { Suspense } from "react";

import Home from "../views/Home";
import Detail from "../views/Detail";
import Error404 from "../views/Error404";
import ErrorBoundary from "../components/ErrorBoundary";
import Profile from "../views/Profile";
import LikedEvents from "../views/Profile/components/LikedEvents";
import MyInfo from "../views/Profile/components/MyInfo";

// Componente de loading con Tailwind
const LoadingFallback = ({ message = "Cargando..." }) => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="card text-center">
            <div className="flex items-center justify-center mb-4">
                <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m12 2a10 10 0 1 0 10 10h-4a6 6 0 1 1-6-6v-4z"></path>
                </svg>
            </div>
            <p className="text-gray-700 font-medium">{message}</p>
        </div>
    </div>
);

// Componente de error específico con Tailwind
const DetailErrorFallback = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="card max-w-md text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01" />
                </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
                Error al cargar evento
            </h2>
            <p className="text-gray-600 mb-4">
                No se pudo obtener el detalle del evento solicitado.
            </p>
            <button 
                onClick={() => window.history.back()}
                className="btn-primary"
            >
                Volver Atrás
            </button>
        </div>
    </div>
);

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ErrorBoundary>
                <Suspense fallback={<LoadingFallback message="Cargando eventos..." />}>
                    <Home />
                </Suspense>
            </ErrorBoundary>
        ),
        errorElement: <Error404 />
    },
    {
        path: '/detail/:eventId',
        element: (
            <ErrorBoundary fallback={<DetailErrorFallback />}>
                <Suspense fallback={<LoadingFallback message="Cargando detalle del evento..." />}>
                    <Detail />
                </Suspense>
            </ErrorBoundary>
        ),
        errorElement: <Error404 />
    },
    {
        path: '/profile',
        element: (
            <ErrorBoundary>
                <Suspense fallback={<LoadingFallback message="Cargando perfil..." />}>
                    <Profile />
                </Suspense>
            </ErrorBoundary>
        ),
        errorElement: <Error404 />,
        children: [
            {
                path: 'my-info',
                element: (
                    <Suspense fallback={<LoadingFallback message="Cargando información..." />}>
                        <MyInfo />
                    </Suspense>
                )
            },
            {
                path: 'liked-events',
                element: (
                    <Suspense fallback={<LoadingFallback message="Cargando eventos favoritos..." />}>
                        <LikedEvents />
                    </Suspense>
                )
            }
        ]
    }
]);

const MyRoutes = () => <RouterProvider router={router} />;

export default MyRoutes;