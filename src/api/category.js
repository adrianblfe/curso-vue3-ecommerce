import { API_URL } from "@/utils/constants";


export async function getCategoriesApi() {
	try {
		const response = await fetch(`${ API_URL }/api/categories`);
		const result = await response.json();

		return result.data;
	} catch (error) {
		console.warn(error);
		return null;
	}
}

