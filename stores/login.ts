// stores/login.js
import { defineStore } from 'pinia';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    token: null as string | null,
    user: null as any | null,
    name: null as any | null,
    isLoading: false,
    error: null as string | null,
  }),
  
  actions: {
    async login(username: string, password: string, router: ReturnType<typeof useRouter>) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await axios.post('https://api.daartads.com/tracker/api/v1/auth/login', {
          username,
          password
        });

        // Assuming the server response includes the token and user info
        const { token, ...userData } = response.data;

        // Set cookies with proper options
        Cookies.set('token', response.data.token, { expires: 7, secure: true, sameSite: 'strict' });
        Cookies.set('name', response.data.name, { expires: 7, secure: true, sameSite: 'strict' });

        this.token = token;
        this.user = userData;
        this.name = response.data.name;

        // Redirect to dashboard if login is successful
        router.push('/dashboard/clicks');

        return true
      } catch (err: any) {
        this.error = err.response?.data?.message || err.response?.data || 'Login failed. Please check your credentials.';
      } finally {
        this.isLoading = false
      }
    },

    /**
     * Logout user
     */
    async logout(router: ReturnType<typeof useRouter>) {
      // Clear cookies
      const tokenCookie = useCookie('token')
      const nameCookie = useCookie('name')


      this.token = null;
      this.user = null;
      this.name = null;
      this.error = null;

      // Clear store state
      this.token = null
      this.user = null
      this.error = null

      // Redirect to login
      await router.push('/')
    },
    
    clearError() {
      this.error = null;
    }
  }
});
