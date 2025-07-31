import { useForm } from "react-hook-form";
import { 
  MIN_NAME_LENGTH, 
  MIN_ADDRESS_LENGTH, 
  MIN_AGE, 
  MAX_AGE, 
  PHONE_PATTERN, 
  ZIPCODE_PATTERN,
  ERROR_MESSAGES 
} from "../../utils/constants";

const SignupForm = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

    const handleClearClick = () => {
        reset();
    };

    const handleSubmitForm = (data) => {
        console.log('Form data:', data);
        // Aquí iría la lógica de envío al servidor
        // Por ejemplo: await submitToAPI(data);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="card">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Registro de Usuario
                </h2>

                <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre *
                        </label>
                        <input 
                            type="text"
                            {...register('name', {
                                required: ERROR_MESSAGES.FORM_VALIDATION.REQUIRED,
                                minLength: {
                                    value: MIN_NAME_LENGTH,
                                    message: ERROR_MESSAGES.FORM_VALIDATION.MIN_LENGTH(MIN_NAME_LENGTH)
                                }
                            })}
                            className={`input ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="Ingresa tu nombre completo"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.name.message}
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
                            {...register('age', {
                                required: ERROR_MESSAGES.FORM_VALIDATION.REQUIRED,
                                min: {
                                    value: MIN_AGE,
                                    message: ERROR_MESSAGES.FORM_VALIDATION.MIN_AGE
                                },
                                max: {
                                    value: MAX_AGE,
                                    message: ERROR_MESSAGES.FORM_VALIDATION.MAX_AGE
                                }
                            })}
                            className={`input ${errors.age ? 'border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="Ej: 25"
                        />
                        {errors.age && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.age.message}
                            </p>
                        )}
                    </div>

                    {/* Address Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Dirección *
                        </label>
                        <input 
                            type="text"
                            {...register('address', {
                                required: ERROR_MESSAGES.FORM_VALIDATION.REQUIRED,
                                minLength: {
                                    value: MIN_ADDRESS_LENGTH,
                                    message: ERROR_MESSAGES.FORM_VALIDATION.MIN_LENGTH(MIN_ADDRESS_LENGTH)
                                }
                            })}
                            className={`input ${errors.address ? 'border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="Calle, número, colonia, ciudad"
                        />
                        {errors.address && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.address.message}
                            </p>
                        )}
                    </div>

                    {/* Zipcode Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Código Postal *
                        </label>
                        <input 
                            type="text"
                            {...register('zipcode', {
                                required: ERROR_MESSAGES.FORM_VALIDATION.REQUIRED,
                                pattern: {
                                    value: ZIPCODE_PATTERN,
                                    message: ERROR_MESSAGES.FORM_VALIDATION.INVALID_ZIPCODE
                                }
                            })}
                            className={`input ${errors.zipcode ? 'border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="12345"
                            maxLength={5}
                        />
                        {errors.zipcode && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.zipcode.message}
                            </p>
                        )}
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Teléfono *
                        </label>
                        <input 
                            type="tel"
                            {...register('phone', {
                                required: ERROR_MESSAGES.FORM_VALIDATION.REQUIRED,
                                pattern: {
                                    value: PHONE_PATTERN,
                                    message: ERROR_MESSAGES.FORM_VALIDATION.INVALID_PHONE
                                }
                            })}
                            className={`input ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="5551234567"
                            maxLength={10}
                        />
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button 
                            type="button" 
                            onClick={handleClearClick}
                            className="btn-secondary flex-1"
                            disabled={isSubmitting}
                        >
                            Limpiar Formulario
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
                                    Registrando...
                                </span>
                            ) : (
                                'Registrar Usuario'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;