import { useState } from "react";
const useField = (type) => {
	const [value, setValue] = useState("");

	const onChange = (event) => {
		setValue(event.target.value);
		// console.log(value);
	};

	const clear = () =>{
		setValue("")
	}

	return {
		type,
		value,
		clear,
		onChange,
	};
};

export default useField;
