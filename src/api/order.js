import { API_URL } from '@/utils/constants'

export async function createOrderApi(data) {
	try {
		const url = `${ API_URL }/api/orders`;
		const params = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ data }),
		};

		const response = await fetch(url, params);
		const result = await response.json();

		return result.data;
	} catch (error) {
		console.warn(error);
		return null;
	}
}

export async function getOrdersApi(idUser) {
	try {
		const response = await fetch(`${ API_URL }/api/orders?_filters[user]=${ idUser }&_sort=created_at:desc`);
		const result = await response.json();

		return result.data;
	} catch (error) {
		console.warn(error);
		return null;
	}
}
