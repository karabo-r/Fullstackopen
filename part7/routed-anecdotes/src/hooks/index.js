import { useState } from "react";
export function useField(name){
    const [value, setValue] = useState('')

    function onChange(value){
        setValue(value.target.value)
    }

    return {
        name,
        value,
        onChange
    }
}