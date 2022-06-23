import { API_URL } from "@/utils/constants";


export async function getProducts( limit = 1000 ) {
	try {
		const response = await fetch(`${ API_URL }/api/products?_sort=created_at:desc&pagination[pageSize]=${ limit }&populate=image,category`);
		const result = await response.json();

		return result.data;
	} catch (error) {
		console.warn(error);
		return null;
	}
}

export async function getProductsCategory(category) {
	try {
		const response = await fetch(`${ API_URL }/api/products?filters[category][slug][$eq]=${ category }&populate=image,category&_sort=created_at:desc`)
		const result = await response.json();

		return result.data;
	} catch (error) {
		console.warn(error);
		return null;
	}
}

