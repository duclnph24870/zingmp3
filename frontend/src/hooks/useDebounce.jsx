import { useState, useEffect } from "react";

function useDebounce(delay, value) {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        }
    }, [value])

    return debounceValue;
}

export default useDebounce;