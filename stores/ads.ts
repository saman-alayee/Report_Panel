import { defineStore } from 'pinia';
import axios from 'axios';

export const useClicksStore = defineStore('adsRequests', {
  state: () => ({
    data: [] as any[],
    isLoading: false,
    error: null as string | null,
    currentPage: 1,
    totalPages: 1,
    perPage: 10,
    selectedPublisherId: null as string | null,
    selectedCampaignId: null as string | null,
    selectedWeb: 'all' as 'all' | 'true' | 'false',
  }),
  actions: {
    async fetchData(page: number) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const token = useCookie('token').value;
        const response = await axios.get(`http://localhost:5000/api/adsRequests`, {
          params: { 
            page,
            publisherId: this.selectedPublisherId,
            campaignId: this.selectedCampaignId,
            web: this.selectedWeb
          },
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
          },
        });
        const result = response.data;
        this.data = Array.isArray(result.data) ? result.data : [];
        this.totalPages = result.totalPages;
        this.currentPage = result.currentPage;
        this.perPage = result.perPage;
      } catch (err:any) {
        this.error = err.message || 'Failed to load data';
      } finally {
        this.isLoading = false;
      }
    },
    resetData() {
      this.data = [];
      this.error = null;
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
