import { useState } from "react";

export function useForm(initialState, submit) {
    const [formData, setFormData] = useState(initialState);

    function handleChange(e) {

        const { name, value } = e.target;

        let newValue = value;

        if (name === "phone") {
            newValue = value.replace(/[^0-9]/g, "");
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        submit(formData);
    }

    return { formData, handleChange, handleSubmit }
}