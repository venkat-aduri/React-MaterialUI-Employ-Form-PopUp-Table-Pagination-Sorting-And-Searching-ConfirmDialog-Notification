import React,{ useState } from "react";

export default function useForm(initialFValues,validateOnChange=false,validate){
    const [values,setValues] = useState(initialFValues);
    const [errors,setErrors] = useState({});

    const handleInputChange = (event)=>{
        const {name,value} = event.target;
        setValues({
            ...values,
            [name] : value
        });
        if(validateOnChange){
            validate({[name]:value});
        };
    };

    const resetForm = (event)=>{
        setValues(initialFValues);
        setErrors({});
    };

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }
};