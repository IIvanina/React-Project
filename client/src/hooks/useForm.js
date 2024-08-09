import { useState } from 'react';

const useForm = (callback, initialState = {}, validate = () => ({}), closeModal) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState(null);

    const onChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setServerError(null);  
        setIsSubmitting(true);

        if (Object.keys(validationErrors).length === 0) {
            try {
                await callback(values, closeModal);
            } catch (error) {
                setServerError(error.message); 
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setIsSubmitting(false);
        }
    };

    return {
        values,
        errors,
        isSubmitting,
        serverError, 
        onChange,
        onSubmit,
    };
};

export default useForm;
