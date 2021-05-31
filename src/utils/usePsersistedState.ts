import { useEffect, useState, Dispatch, SetStateAction } from "react";

type Response<T> = [
    T,
    Dispatch<SetStateAction<T>>
]

export function usePersistedState<T> (key: string, initialState: T): Response<T> {
    const [state, setState] = useState(() => {
        const persistedValue = localStorage.getItem(key);

        if (persistedValue) return JSON.parse(persistedValue);

        return initialState;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
      }, [key, state]);

    return [state, setState];
}
