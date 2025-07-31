// === STORAGE KEYS ===
export const LIKED_EVENTS_STORAGE_KEY = 'likedEvents';
export const USER_PREFERENCES_STORAGE_KEY = 'userPreferences';
export const SEARCH_HISTORY_STORAGE_KEY = 'searchHistory';

// === API CONSTANTS ===
export const TICKETMASTER_BASE_URL = 'https://app.ticketmaster.com/discovery/v2';
export const TICKETMASTER_EVENTS_ENDPOINT = '/events.json';
export const API_DEFAULT_SIZE = 20;
export const API_MAX_SIZE = 200;

// === PAGINATION ===
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_SEARCH_HISTORY = 10;

// === UI CONSTANTS ===
export const DEBOUNCE_DELAY = 300; // ms para búsqueda
export const ANIMATION_DURATION = 300; // ms para transiciones
export const TOAST_DURATION = 3000; // ms para notificaciones

// === VALIDATION CONSTANTS ===
export const MIN_NAME_LENGTH = 2;
export const MIN_ADDRESS_LENGTH = 10;
export const MIN_AGE = 18;
export const MAX_AGE = 120;
export const PHONE_PATTERN = /^[0-9]{10}$/;
export const ZIPCODE_PATTERN = /^\d{5}$/;
export const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// === ERROR MESSAGES ===
export const ERROR_MESSAGES = {
  API_KEY_MISSING: 'API Key de Ticketmaster no configurada',
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet.',
  NO_EVENTS_FOUND: 'No se encontraron eventos',
  GENERIC_ERROR: 'Ocurrió un error inesperado',
  TIMEOUT_ERROR: 'La solicitud tardó demasiado tiempo',
  UNAUTHORIZED: 'API Key inválida o sin permisos', // ✅ Agregado
  FORM_VALIDATION: {
    REQUIRED: 'Este campo es requerido',
    MIN_LENGTH: (min) => `Debe tener al menos ${min} caracteres`,
    MAX_LENGTH: (max) => `No puede exceder ${max} caracteres`,
    INVALID_EMAIL: 'Email no válido',
    INVALID_PHONE: 'Teléfono debe tener 10 dígitos',
    INVALID_ZIPCODE: 'Código postal debe tener 5 dígitos',
    MIN_AGE: `Debes ser mayor de ${MIN_AGE} años`,
    MAX_AGE: `Edad no válida`
  }
};

// === SUCCESS MESSAGES ===
export const SUCCESS_MESSAGES = {
  EVENT_LIKED: 'Evento agregado a favoritos',
  EVENT_UNLIKED: 'Evento removido de favoritos',
  FORM_SUBMITTED: 'Formulario enviado exitosamente',
  PROFILE_UPDATED: 'Perfil actualizado correctamente',
  DATA_CLEARED: 'Datos eliminados correctamente',
  PREFERENCES_SAVED: 'Preferencias guardadas exitosamente'
};

// === ROUTES ===
export const ROUTES = {
  HOME: '/',
  DETAIL: '/detail',
  PROFILE: '/profile',
  MY_INFO: '/profile/my-info',
  LIKED_EVENTS: '/profile/liked-events',
  ERROR_404: '/404'
};

// === BREAKPOINTS (para uso con JS) ===
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
};

// === EVENT CATEGORIES ===
export const EVENT_CATEGORIES = {
  MUSIC: 'music',
  SPORTS: 'sports',
  ARTS: 'arts',
  FAMILY: 'family',
  MISC: 'miscellaneous'
};

// === SORT OPTIONS ===
export const SORT_OPTIONS = {
  DATE_ASC: 'date,asc',
  DATE_DESC: 'date,desc',
  NAME_ASC: 'name,asc',
  NAME_DESC: 'name,desc',
  RELEVANCE: 'relevance,desc'
};

// === THEME COLORS (para uso en JS) ===
export const THEME_COLORS = {
  PRIMARY: '#6366f1',
  SECONDARY: '#8b5cf6',
  SUCCESS: '#10b981',
  DANGER: '#ef4444',
  WARNING: '#f59e0b',
  INFO: '#3b82f6'
};

// === APP CONFIG (usando variables de entorno) ===
export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'Mi Boletera',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  DEV_MODE: import.meta.env.VITE_DEV_MODE === 'true',
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000
};

// === HTTP STATUS CODES ===
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

// === LOADING STATES ===
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

// === LOCAL STORAGE LIMITS ===
export const STORAGE_LIMITS = {
  MAX_LIKED_EVENTS: 100,
  MAX_SEARCH_HISTORY: 20,
  MAX_USER_DATA_SIZE: 1024 * 50 // 50KB
};

// === NOTIFICATION TYPES ===
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// === MODAL SIZES ===
export const MODAL_SIZES = {
  SMALL: 'max-w-md',
  MEDIUM: 'max-w-lg',
  LARGE: 'max-w-2xl',
  EXTRA_LARGE: 'max-w-4xl'
};

// === DATE FORMATS ===
export const DATE_FORMATS = {
  SHORT: 'dd/MM/yyyy',
  LONG: "d 'de' LLLL 'de' yyyy",
  WITH_TIME: "d 'de' LLLL 'de' yyyy 'a las' H:mm",
  TIME_ONLY: 'H:mm',
  ISO: 'yyyy-MM-dd'
};

// === ANIMATION CLASSES ===
export const ANIMATIONS = {
  FADE_IN: 'animate-in fade-in duration-300',
  SLIDE_UP: 'animate-in slide-in-from-bottom-4 duration-300',
  SLIDE_DOWN: 'animate-in slide-in-from-top-4 duration-300',
  SCALE_IN: 'animate-in zoom-in-95 duration-200'
};

// === CURRENCY SYMBOLS ===
export const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  MXN: '$'
};

// === SOCIAL MEDIA ===
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/miboletera',
  TWITTER: 'https://twitter.com/miboletera',
  INSTAGRAM: 'https://instagram.com/miboletera'
};