<template>
	<BasicLayout>
		<div class="ui grid">
			<div
				class="sixten wide mobile eight wide table four wide computer column"
				v-for="product in products"
				:key="product.id"
			>
				<Product :product="product" />
			</div>
		</div>
	</BasicLayout>
</template>

<script>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getProductsCategory } from '@/api/product';
import BasicLayout from '@/layouts/BasicLayout';
import Product from '@/components/Product';

export default {
	name: 'Home',

	components: {
		BasicLayout,
		Product
	},

	watch: {
		$route(to, from) {
			this.getProducts(to.params.category);
		}
	},

	setup() {
		let products = ref(null);
		const { params } = useRoute();

		onMounted(() => {
			getProducts(params.category);
		});

		const getProducts = async (category) => {
			const response = await getProductsCategory(category);

			products.value = response;
		};

		return {
			products,
			getProducts
		};
	}
};
</script>
