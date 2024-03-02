import Main from '@/pages/Main.vue'
import UserePage from '@/pages/UserePage.vue'
import About from '@/pages/About.vue'
import PostPageWithStore from '@/pages/PostPageWithStore.vue'
import PostTemplatePage from '@/pages/PostTemplatePage.vue'
import { createRouter,  createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path:'/userePage',
        component:UserePage
    },
    {
        path:'/about',
        component:About
    },
    {
        path:'/posts/:id',
        component:PostTemplatePage
    },
    {
        path:'/store',
        component:PostPageWithStore
    },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

export default router;