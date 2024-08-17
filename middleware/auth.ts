// middleware/auth.ts

import { defineNuxtRouteMiddleware, useRouter, useCookie } from '#app';

export default defineNuxtRouteMiddleware((to, from) => {
  const router = useRouter();

  const token = useCookie('token').value;

  if (!token && to.name !== 'login') {
    return router.push('/');
  }
});
