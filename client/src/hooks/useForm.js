import { useState } from 'react';

const useForm = (callback, initialState = {}, closeModal) => {
    const [values, setValues] = useState(initialState);

    const onChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await callback(values, closeModal);
    };

    return {
        values,
        onChange,
        onSubmit,
    };
};

export default useForm;
