// stores/users.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useUsersStore = defineStore('users', {
  state: () => ({
    data: [] as any[],
    isLoading: false,
    error: null as string | null,
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    perPage: 20,
    isAddingUser: false,
    isDeletingUser: false,
    isUpdatingUser: false,
    addUserError: null as string | null,
  }),
  
  actions: {
    async fetchUsers(page: number = this.currentPage) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const token = useCookie('token').value;
        
        const params: any = {
          page: page,
          limit: this.perPage
        };
        
        const response = await axios.get(`https://api.daartads.com/tracker/api/v1/users`, {
          params: params,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        const result = response.data;
        
        // Handle the API response
        if (result.data && Array.isArray(result.data)) {
          this.data = result.data;
        } else if (Array.isArray(result)) {
          this.data = result;
        } else {
          this.data = [];
        }
        
        this.currentPage = result.page || result.currentPage || page;
        this.perPage = result.limit || result.perPage || 20;
        this.totalCount = result.total || result.totalCount || this.data.length;
        this.totalPages = Math.ceil(this.totalCount / this.perPage);
        
        console.log('Users loaded:', this.data.length);
        
      } catch (err: any) {
        console.error('API Error:', err);
        this.error = err.response?.data?.message || err.message || 'Failed to load users';
      } finally {
        this.isLoading = false;
      }
    },
    
    async addUser(userData: any) {
      this.isAddingUser = true;
      this.addUserError = null;
      
      try {
        const token = useCookie('token').value;
        
        // Format the data according to your API structure
        const payload = {
          username: userData.username,
          password: userData.password,
          publisherId: userData.publisherId || null
        };
        
        const response = await axios.post(`https://api.daartads.com/tracker/api/v1/users`, payload, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        // Refresh the users list
        await this.fetchUsers(1);
        
        return { success: true, data: response.data };
        
      } catch (err: any) {
        console.error('Add User Error:', err.response.data);
        this.addUserError = err.response.data || err.message || 'Failed to add user';
        return { success: false, error: this.addUserError };
      } finally {
        this.isAddingUser = false;
      }
    },
    
    
    async deleteUser(userId: string) {
      this.isDeletingUser = true;
      this.addUserError = null;
      
      try {
        const token = useCookie('token').value;
        
        await axios.delete(`https://api.daartads.com/tracker/api/v1/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        // Refresh the users list
        await this.fetchUsers(this.currentPage);
        
        return { success: true };
        
      } catch (err: any) {
        console.error('Delete User Error:', err);
        this.addUserError = err.response?.data?.message || err.message || 'Failed to delete user';
        return { success: false, error: this.addUserError };
      } finally {
        this.isDeletingUser = false;
      }
    },
    
    resetData() {
      this.data = [];
      this.error = null;
      this.currentPage = 1;
      this.totalPages = 1;
      this.totalCount = 0;
      this.addUserError = null;
    },
    
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.fetchUsers(this.currentPage + 1);
      }
    },
    
    previousPage() {
      if (this.currentPage > 1) {
        this.fetchUsers(this.currentPage - 1);
      }
    },
    
    clearError() {
      this.addUserError = null;
      this.error = null;
    }
  }
});