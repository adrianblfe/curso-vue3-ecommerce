<template>
	<BasicLayout>
		<div class="register">
			<h2>Registro de usuario</h2>

			<form class="ui form" @submit.prevent="register">
				<div class="field">
					<input
						v-model="formData.username"
						type="text"
						placeholder="Nombre de usuario"
						:class="{ error: formError.username }"
					/>
				</div>

				<div class="field">
					<input
						v-model="formData.email"
						type="email"
						placeholder="Correo electrónico"
						:class="{ error: formError.email }"
					/>
				</div>

				<div class="field">
					<input
						v-model="formData.password"
						type="password"
						placeholder="Contraseña"
						:class="{ error: formError.password }"
					/>
				</div>

				<button
					type="submit"
					class="ui button fluid primary"
					:class="{ loading }"
				>
					Crear usuario
				</button>
			</form>

			<router-link to="/login"> Iniciar sesión </router-link>
		</div>
	</BasicLayout>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import * as Yup from 'yup';
import { registerApi } from '@/api/user';
import BasicLayout from '@/layouts/BasicLayout';

export default {
	name: 'Register',
	components: {
		BasicLayout
	},
	setup() {
		let formData = ref({});
		let formError = ref({});
		let loading = ref(false);
		const router = useRouter();

		const schemaForm = Yup.object().shape({
			username: Yup.string().required(true),
			email: Yup.string().email(true).required(true),
			password: Yup.string().required(true)
		});

		const register = async () => {
			formError.value = {};
			loading.value = true;

			try {
				await schemaForm.validate(formData.value, {
					abortEarly: false
				});

				try {
					const response = await registerApi(formData.value);
					router.push('/');
				} catch (error) {
					console.warn(error);
				}
			} catch (error) {
				console.warn(error);
				error.inner.forEach((err) => {
					formError.value[err.path] = err.message;
				});
			} finally {
				loading.value = false;
			}
		};

		return {
			formData,
			formError,
			loading,
			register
		};
	}
};
</script>

<style lang="scss" scoped>
.register {
	text-align: center;

	> h2 {
		margin: 50px 0 30px 0;
	}

	.ui.form {
		max-width: 300px !important;
		margin: 0 auto;
		margin-bottom: 10px;

		input.error {
			border-color: #faa;
			background-color: #ffeded;
		}
	}
}
</style>
