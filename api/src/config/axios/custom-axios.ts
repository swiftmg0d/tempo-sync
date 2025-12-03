import axios, { AxiosInstance } from 'axios';

import { SpotifyAPIProperties } from '@/interfaces/axios.interface';
import { decrypt } from '@/utils/crypt.utils';

export function createCustomAPI(url: string) {
	const customAPI = ({ baseURL = url, headers, token }: SpotifyAPIProperties) => {
		const api: AxiosInstance = axios.create({
			baseURL: baseURL,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				...headers,
			},
			timeout: 10 * 1000, // 10 seconds
		});

		api.interceptors.request.use((config) => {
			if (token) {
				config.headers.Authorization = `Bearer ${decrypt(token)}`;
			}
			return config;
		});

		api.interceptors.response.use(
			(response) => response,
			(error) => Promise.reject(error),
		);

		return api;
	};

	return customAPI;
}
