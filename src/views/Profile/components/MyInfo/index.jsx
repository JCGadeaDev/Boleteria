import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { 
  USER_PREFERENCES_STORAGE_KEY,
  MIN_NAME_LENGTH, 
  MIN_AGE, 
  MAX_AGE, 
  ERROR_MESSAGES,
  SUCCESS_MESSAGES 
} from '../../../../utils/constants';

const MyInfo = () => {
  const { handleSubmit, register, setValue, formState: { errors, isSubmitting }, reset } = useForm();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem(USER_PREFERENCES_STORAGE_KEY)) || {};

      setValue('name', userData?.name || '');
      setValue('age', userData?.age || '');
      setValue('email', userData?.email || '');
      setValue('phone', userData?.phone || '');
      setValue('city', userData?.city || '');
    } catch (error) {
      console.error('Error loading user data:', error);
      setNotification({
        type: 'error',
        message: 'Error al cargar los datos del usuario'
      });
    }
  }, [setValue]);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleFormSubmit = async (data) => {
    try {
      // Simular un pequeño delay para mostrar el loading
      await new Promise(resolve => setTimeout(resolve, 500));
      
      localStorage.setItem(USER_PREFERENCES_STORAGE_KEY, JSON.stringify(data));
      showNotification('success', SUCCESS_MESSAGES.PROFILE_UPDATED);
    } catch (error) {
      console.error('Error saving user data:', error);
      showNotification('error', 'Error al guardar los datos');
    }
  };

  const handleClearData = () => {
    if (window.confirm('¿Estás seguro de que quieres limpiar todos los datos?')) {
      localStorage.removeItem(USER_PREFERENCES_STORAGE_KEY);
      reset();
      showNotification('success', 'Datos eliminados correctamente');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Mi Información</h2>
          <p className="text-gray-600">Actualiza tu información personal</p>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`p-4 rounded-lg border-l-4 ${
          notification.type === 'success' 
            ? 'bg-green-50 border-green-400' 
            : 'bg-red-50 border-red-400'
        }`}>
          <div className="flex items-center">
            <svg 
              className={`w-5 h-5 mr-3 ${
                notification.type === 'success' ? 'text-green-600' : 'text-red-600'
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {notification.type === 'success' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01" />
              )}
            </svg>
            <p className={`font-medium ${
              notification.type === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>
              {notification.message}
            </p>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="card">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre Completo *
            </label>
            <input
              {...register("name", {
                required: ERROR_MESSAGES.FORM_VALIDATION.REQUIRED,
                minLength: {
                  value: MIN_NAME_LENGTH,
                  message: ERROR_MESSAGES.FORM_VALIDATION.MIN_LENGTH(MIN_NAME_LENGTH)
                },
                maxLength: {
                  value: 120,
                  message: ERROR_MESSAGES.FORM_VALIDATION.MAX_LENGTH(120)
                }
              })}
              className={`input ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Ingresa tu nombre completo"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico *
            </label>
            <input
              type="email"
              {...register("email", {
                required: ERROR_MESSAGES.FORM_VALIDATION.REQUIRED,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: ERROR_MESSAGES.FORM_VALIDATION.INVALID_EMAIL
                }
              })}
              className={`input ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="ejemplo@correo.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Age Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Edad *
            </label>
            <input
              type="number"
              {...register("age", {
                required: ERROR_MESSAGES.FORM_VALIDATION.REQUIRED,
                min: {
                  value: MIN_AGE,
                  message: ERROR_MESSAGES.FORM_VALIDATION.MIN_AGE
                },
                max: {
                  value: MAX_AGE,
                  message: ERROR_MESSAGES.FORM_VALIDATION.MAX_AGE
                },
                valueAsNumber: true
              })}
              className={`input ${errors.age ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Ej: 25"
              disabled={isSubmitting}
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-600">
                {errors.age.message}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              {...register("phone", {
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "El teléfono debe tener 10 dígitos"
                }
              })}
              className={`input ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="5551234567"
              maxLength={10}
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* City Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ciudad
            </label>
            <input
              {...register("city")}
              className="input"
              placeholder="Tu ciudad de residencia"
              disabled={isSubmitting}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button 
              type="button" 
              onClick={handleClearData}
              className="btn-secondary flex-1"
              disabled={isSubmitting}
            >
              Limpiar Datos
            </button>
            <button 
              type="submit"
              className="btn-primary flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m12 2a10 10 0 1 0 10 10h-4a6 6 0 1 1-6-6v-4z"></path>
                  </svg>
                  Guardando...
                </span>
              ) : (
                'Guardar Cambios'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Info Footer */}
      <div className="card">
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="font-semibold text-blue-800 mb-1">Privacidad:</p>
            <p className="text-blue-700 text-sm">
              Tu información se guarda localmente en tu navegador. 
              No compartimos tus datos con terceros.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;