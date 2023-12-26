import { useState, useEffect, useCallback } from 'react';
import { STR_TOKEN } from './common';

interface UseApiProps {
    url?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    headers?: Record<string, string>;
}

function useApi<T = any>(rsrc_link: string, {
    url = process.env.REACT_APP_API_URL ?? "",
    method = 'GET',
    body = null,
    headers = {}
}: UseApiProps = {}) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
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
                body: method !== 'GET' && body ? JSON.stringify(body) : null,
            };

            const response = await fetch(url + rsrc_link, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result: T = await response.json();
            setData(result);
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
        } finally {
            setIsLoading(false);
        }
    }, [url, method, body, headers, rsrc_link]);

    useEffect(() => {
        fetchData();
    }, [fetchData, data, isLoading]);

    return { data, isLoading, error };
}

export default useApi;

export const API_RSRC_LINKS = {
    login: "user/login"
}