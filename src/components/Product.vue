<template>
	<div class="ui card product">
		<div class="image">
			<img :src="API_URL + product.image.url" :alt="product.name" />
		</div>

		<div class="content">
			<div class="header">{{ product.name }}</div>
			<div class="description">{{ product.price }} €</div>
		</div>

		<div class="ui button primary" @click="addProductCardApi(product.id)">
			Comprar
		</div>
	</div>
</template>

<script>
import { API_URL } from '@/utils/constants';
import { addProductCardApi } from '@/api/cart';

export default {
	name: 'Product',

	props: {
		product: {
			type: Object,
			required: true
		}
	},

	setup(props) {
		return {
			API_URL,
			addProductCardApi
		};
	}
};
</script>

<style lang="scss" scoped>
.product {
	&:hover {
		.ui.button {
			min-height: 36px;
			max-width: inherit;
		}
	}

	.ui.button {
		max-height: 0;
		max-width: 0;
		overflow: hidden;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: min-height 0.6s ease;
	}

	.image {
		max-height: 250px;
		height: 250px;
		display: flex;
		align-items: center;

		img {
			max-height: 250px;
		}
	}
}
</style>
