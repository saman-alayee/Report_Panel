import { defineStore } from 'pinia';
import axios from 'axios';

export const useClicksStore = defineStore('clicks', {
  state: () => ({
    data: [] as any[],
    isLoading: false,
    error: null as string | null,
    currentPage: 1,
    totalPages: 1,
    perPage: 10,
  }),
  actions: {
    async fetchData(page: number) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await axios.get(`http://localhost:5000/api/clicks`, {
          params: { page }
        });
        const result = response.data;
        this.data = Array.isArray(result.data) ? result.data : [];
        this.totalPages = result.totalPages;
        this.currentPage = result.currentPage;
        this.perPage = result.perPage;
      } catch (err) {
        this.error = err.message || 'Failed to load data';
      } finally {
        this.isLoading = false;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.fetchData(this.currentPage + 1);
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.fetchData(this.currentPage - 1);
      }
    }
  }
});
