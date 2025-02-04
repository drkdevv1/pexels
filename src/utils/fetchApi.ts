import { API_BASE_URL_ENDPOINTS } from "../config/api";
import { DataLocalStorage } from "../config/data-local-storage";

const fetchApi = async <T>(
    endpoint: string,
    method: MethodHTTP = MethodHTTP.GET,
    body: FormData | Record<string, any> | null = null,
    headers: Record<string, string> = {},
    responseType: string = "json",
    useAuth: boolean = true
): Promise<T> => {
    try {
        const isAbsoluteUrl = endpoint.startsWith('http://') || endpoint.startsWith('https://');
        const url = isAbsoluteUrl ? endpoint : `${API_BASE_URL_ENDPOINTS}${endpoint}`;

        console.log('Fetching URL:', url);

        const session = useAuth ? DataLocalStorage.getSessionInLocalStorage() : null;
        const options: RequestInit = { method };
        const plainHeaders = { ...headers };

        if (useAuth && session) {
            plainHeaders["Authorization"] = `Bearer ${session.token}`;
        }

        if (method !== "GET" && body !== null) {
            const isFormData = body instanceof FormData;
            if (!isFormData) plainHeaders["Content-Type"] = "application/json";
            options.body = isFormData ? body : JSON.stringify(body);
        }

        plainHeaders["Accept"] = responseType === "blob" ? "*/*" : "application/json";
        options.headers = plainHeaders;

        console.log('Request options:', options);

        const response = await fetch(url, options);
        const data = await response.json();

        console.log('Response:', data);

        if (!response.ok) {
            throw new Error(data.error || 'Request failed');
        }

        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

enum MethodHTTP {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export class ApiMethods {
    static get<ResponseType>(
        endpoint: string,
        headers: Record<string, string> = {},
        useAuth: boolean = true,
        responseType: string = "json"
    ): Promise<ResponseType> {
        return fetchApi<ResponseType>(endpoint, MethodHTTP.GET, null, headers, responseType, useAuth);
    }

    static post<ResponseType>(
        endpoint: string,
        body: FormData | Record<string, any> | null = null,
        headers: Record<string, string> = {},
        useAuth: boolean = true
    ): Promise<ResponseType> {
        return fetchApi<ResponseType>(endpoint, MethodHTTP.POST, body, headers, "json", useAuth);
    }

    static put<ResponseType>(
        endpoint: string,
        body: FormData | Record<string, any> | null = null,
        headers: Record<string, string> = {},
        useAuth: boolean = true
    ): Promise<ResponseType> {
        return fetchApi<ResponseType>(endpoint, MethodHTTP.PUT, body, headers, "json", useAuth);
    }

    static delete<ResponseType>(
        endpoint: string,
        body: FormData | Record<string, any> | null = null,
        headers: Record<string, string> = {}
    ): Promise<ResponseType> {
        return fetchApi<ResponseType>(endpoint, MethodHTTP.DELETE, body, headers);
    }
}