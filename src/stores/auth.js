import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { login, register, logout, getUser } from '../http/auth-api';

export const useAuthStore = defineStore('authStore', () => {
    const user = ref(null);
    const errors = ref({});

    const isLoggedIn = computed(() => !!user.value);

    const fetchUser = async () => {
        try {
            const { data } = await getUser();
            user.value = data;
        } catch (error) {
            user.value = null;
        }
    }

    const handleLogin = async (credentials) => {
        try {
            const { data } = await login(credentials);
            localStorage.setItem('token', data.token);
            user.value = data.user;
            errors.value = {};
        } catch (error) {
            if (error.response && error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    }

    const handleRegister = async (formData) => {
        try {
            const { data } = await register(formData);
            localStorage.setItem('token', data.token);
            user.value = data.user;
            errors.value = {};
        } catch (error) {
            if (error.response && error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    }

    const handleLogout = async () => {
        await logout();
        localStorage.removeItem('token');
        user.value = null;
    }

    return {
        user,
        errors,
        isLoggedIn,
        fetchUser,
        handleLogin,
        handleRegister,
        handleLogout,
    }
});