import axios, { type AxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_APP_URL;

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 1000,
	headers: {
		'Content-Type': 'application/json'
	}
});

const api = {
	get: <T>(url: string, config?: AxiosRequestConfig) => axiosInstance.get<T, T>(url, config),
	post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
		axiosInstance.post<T, T>(url, data, config),
	put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
		axiosInstance.put<T, T>(url, data, config),
	delete: <T>(url: string, config?: AxiosRequestConfig) => axiosInstance.delete<T, T>(url, config)
};

export default api;
