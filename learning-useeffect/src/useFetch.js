import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';

/*
 This hook is used to not use the function
 in the array dependencies, because that creates an infinite loop
*/
const useCallbackRef = (callback) => {
    const callbackRef = useRef(callback);
    // This hook is like useEffect but with the exception this one is synchronous
    useLayoutEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    return callbackRef;
}

export const useFetch = (options) => {
    const [data, setData] = useState(null);

    const savedOnSuccess = useCallbackRef(options.onSuccess)

    useEffect(() => {
        console.log("Usando useEffect in useFetch");
        if (options.url) {
            let isCancelled = false;
            fetch(options.url)
                .then(response => response.json())
                .then(json => {
                    // isCancelled objective is to check if the component should send the info back or if it isn't mounted
                    if (!isCancelled) {
                        savedOnSuccess.current?.(json);
                        setData(json);
                    }
                });

            // The cleanup function is called before a new useEffect function is called
            return () => {
                isCancelled = true;
            }
        }
    }, [options.url]);
    // Array dependencies check "by reference" when functions, objects, arrays
    // array dependencies check by value when primitive values likea boolean, integer, string, etc

    return {
        data,
    }
}
