import { useState, useEffect, useCallback } from 'react';
import { IS_DEVELOPER, STR_TOKEN } from '../common';

interface UseApiProps<IN> {
    url?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: IN | null;
    headers?: Record<string, string>;
    triggerOnLoad?: boolean;
}

function useApi<OUT, IN = null>(rsrc_link: string, {
    url = process.env.REACT_APP_API_URL ?? "",
    method = 'GET',
    body = null,
    headers = {},
    triggerOnLoad = true
}: UseApiProps<IN> = {}) {
    const [data, setData] = useState<OUT | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (bdy: IN | null): Promise<OUT | null> => {
        setIsLoading(true);
        setError(null);

        try {
            const token = sessionStorage.getItem(STR_TOKEN);
            const _headers: HeadersInit = new Headers({
                ...headers,
                'Content-Type': 'application/json',
            });

            if (token) {
                _headers.set('Authorization', `Bearer ${token}`);
            }

            const requestOptions: RequestInit = {
                method,
                headers: _headers,
                body: method !== 'GET' && bdy ? JSON.stringify(bdy) : null,
            };

            const response = await fetch(url + rsrc_link, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result: OUT = await response.json();
            setData(result);
            IS_DEVELOPER && console.log(result)
            return result
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [url, method, headers, rsrc_link]);

    useEffect(() => {
        if (triggerOnLoad) {
            fetchData(body);
        }
    }, []);

    return { data, isLoading, error, fetchData };
}

export default useApi;

export const API_RSRC_LINKS = {
    login: "user/login",
    verify_tkn: "user/verify_tkn",
    register: "user/register",
    getpeople: "people/",
}

export interface CommonOutputModel {
    errors: any[]
}