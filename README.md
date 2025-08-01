# 🎫 Boletería - Sistema de Gestión de Eventos

## 📝 Descripción
Sistema moderno de gestión de eventos desarrollado con React y Vite, que permite a los usuarios explorar eventos, marcar favoritos y gestionar su perfil personal.


<img width="1291" height="636" alt="Screenshot_7" src="https://github.com/user-attachments/assets/5a2401e0-47ed-49da-84c5-06f0434b2e43" />
<img width="1289" height="611" alt="Screenshot_1" src="https://github.com/user-attachments/assets/a536c755-c5bc-4bcd-8fcb-cda64a1bf962" />
<img width="1227" height="624" alt="Screenshot_2" src="https://github.com/user-attachments/assets/092dfdc0-7875-4bfb-8df7-f89303298020" />
<img width="1250" height="623" alt="Screenshot_3" src="https://github.com/user-attachments/assets/c722339d-34e0-4360-8097-ae3075cedb0f" />
<img width="1235" height="620" alt="Screenshot_6" src="https://github.com/user-attachments/assets/f9e52096-a1ae-4198-9103-6c2e4a7c7c89" />
<img width="1241" height="488" alt="Screenshot_4" src="https://github.com/user-attachments/assets/8f7f39d2-3e08-457e-974d-cf9ef9fd4363" />
<img width="1356" height="601" alt="Screenshot_8" src="https://github.com/user-attachments/assets/470bf5e8-2222-4977-8fff-fa999e8d6191" />


## 🚀 Características Principales
- 📋 Listado dinámico de eventos
- ❤️ Sistema de eventos favoritos
- 👤 Perfiles de usuario personalizados
- 📱 Diseño responsive
- 🔍 Vistas detalladas de eventos
- 🛡️ Manejo de errores con Error Boundaries

## 🛠️ Tecnologías Utilizadas
- **Frontend:** React
- **Build Tool:** Vite
- **Estilos:** Tailwind CSS
- **Optimización:** React Suspense & Lazy Loading
- **Optimización:** React Router DOM para navegación
- **Optimización:** Zustand para manejo de estado
- **Optimización:** React Hook Form para formularios
- **Optimización:** React Paginate para paginación
- **Optimización:** date-fns para manejo de fechas
- **Deployment:** Vercel
- **Linting:** ESLint
- **Otros:** PostCSS 

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/JCGadeaDev/Boleteria.git

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cp .env.example .env

# Iniciar en modo desarrollo
npm run dev

```
## 🔧 Configuración
Variables de Entorno
Crear un archivo .env con las siguientes variables:
VITE_API_URL=tu_url_api
VITE_API_KEY=tu_api_key

## 📁 Estructura del Proyecto
src/
├── components/         # Componentes reutilizables
├── views/             # Vistas principales
├── hooks/             # Custom hooks
├── utils/             # Utilidades y helpers
├── state/            # Manejo de estado
└── assets/           # Recursos estáticos

## 🌟 Características Detalladas
Sistema de Eventos
Visualización de eventos disponibles
Filtrado y búsqueda
Vista detallada de cada evento
Gestión de Favoritos
Marcado/desmarcado de eventos
Persistencia de selecciones
Sección de favoritos en perfil
Perfil de Usuario
Información personal
Lista de eventos favoritos
Preferencias de usuario

## 🔍 Hooks Personalizados
useEventsData: Gestión de datos de eventos
useLikedEvents: Manejo de eventos favoritos

## 🚀 Despliegue
La aplicación está desplegada en Vercel y puede ser accedida en: https://boleteria-three.vercel.app/

## 📈 Optimizaciones
Implementación de React Suspense
Lazy loading de componentes
Optimización de imágenes
Caching de datos

## 👨‍💻 Autor
JCGadeaDev

