import { useState } from "react";
export function useField(name){
    const [value, setValue] = useState('')

    function onChange(value){
        setValue(value.target.value)
    }

    function clear(){
        setValue('')
    }

    return {
        name,
        value,
        onChange,
        clear
    }
}