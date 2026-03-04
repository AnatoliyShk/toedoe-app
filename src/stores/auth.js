import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { csrfCookie, login, register, logout, getUser } from '../http/auth-api';

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
            await csrfCookie();
            await login(credentials);
            await fetchUser();
            errors.value = {};
        } catch (error) {
            if(error.response && error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    }

    const handleRegister = async (user) => {
        try {
            await csrfCookie(); 
            await register(user);
            await fetchUser();
        } catch (error) {
            if(error.response && error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    }

    const handleLogout = async () => {
        await logout();
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