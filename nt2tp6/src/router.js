import Vue from 'vue'
import VueRouter from 'vue-router'

import Formulario from './componentes/Formulario.vue'
import Componente from './componentes/Componente.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/formulario' },
        { path: '/formulario', component: Formulario },
        { path: '/componente', component: Componente },
    ]
})