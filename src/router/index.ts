import useUserData from '@/auth/utils/useUserData';
import admin from '@/router/routes/admin';
import pages from '@/router/routes/pages';
import password from '@/router/routes/password';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        ...pages,
        ...password,
        ...admin,
        {
            path: "/:pathMatch(.*)*",
            redirect: "error-404"
        }]
})

router.beforeEach((to, from, next) => {
    // check if the route has requires auth
    if (to.meta?.requiresAuth) {
        if (!useUserData.isUserLoggedIn()) {
            next({ name: 'login' });
        }
    } else if (to.meta?.redirectIfLoggedIn && useUserData.isUserLoggedIn()) {
        next({ name: 'dashboard' });
    } else if (to.meta?.onlyAdmin && !useUserData.isUserAdmin()) {
        next({ name: 'dashboard' });
    }
    next();
});
export default router;
