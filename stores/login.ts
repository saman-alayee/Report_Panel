import { defineStore } from 'pinia';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    token: null as string | null,
    user: null as any | null,
    fullName :null as any | null,
    isLoading: false,
    error: null as string | null,
  }),
  actions: {
    async login(email: string, password: string, router: ReturnType<typeof useRouter>) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.post('http://localhost:5000/api/admin', {
          email,
          password
        });

        // Assuming the server response includes the token and user info
        const { token, ...fullname } = response.data;

        Cookies.set('token', response.data.token, { expires: 12, secure: true });
        Cookies.set('role', response.data.role, { expires: 12, secure: true });
        Cookies.set('fullname', response.data.fullname, { expires: 12, secure: true });
        Cookies.set('id', response.data.id, { expires: 12, secure: true });
        Cookies.set('email', response.data.email, { expires: 12, secure: true });


        this.token = token;
        this.user = fullname;

        // Redirect to dashboard if login is successful
        router.push('/dashboard/clicks');

      } catch (err: any) {
        this.error = err.response?.data || 'Login failed';
      } finally {
        this.isLoading = false;
      }
    },

    logout(router: ReturnType<typeof useRouter>) {
      // Clear all cookies
      Cookies.remove('token');
      Cookies.remove('role');
      Cookies.remove('fullname');
      Cookies.remove('id');
      Cookies.remove('email');

      this.token = null;
      this.user = null;

      router.push('/');
    },
  }
});
