import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import GreetingPage from '../views/GreetingPage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/greeting',
        name: 'Greeting',
        component: GreetingPage,
        beforeEnter: (to, from, next) => {
            if (!sessionStorage.getItem('username')) {
                next('/');
            } else {
                next();
            }
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
