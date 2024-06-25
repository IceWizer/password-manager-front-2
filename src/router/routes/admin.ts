const routes = [
    {
        path: '/admin/passwords',
        name: 'admin-passwords',
        component: () => import('@/views/admin/PasswordList.vue'),
        meta: {
            requiresAuth: true,
            redirectIfLoggedIn: false,
            layout: 'default',
            onlyAdmin: true,
        }
    },
]

export default routes;