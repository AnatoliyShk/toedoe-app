import { createRouter, createWebHistory } from 'vue-router';

import routes from './routes';

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from) => {
    return { name: "login"};
});

export default router;