const routes = [
    {
        path: '/password/:id?',
        name: 'password-create-edit',
        component: () => import('@/views/pages/Password.vue'),
        meta: {
            requiresAuth: true,
            redirectIfLoggedIn: false,
            layout: 'default'
        }
    },
];

export default routes;