import { defineStore } from 'pinia';
import axios from 'axios';

export const useClicksMobileStore = defineStore('clicksMobile', {
  state: () => ({
    data: [] as any[],
    isLoading: false,
    error: null as string | null,
    currentPage: 1,
    totalPages: 1,
    perPage: 10,
    len: null as number | null,
    publisherId: null as string | null,
    campaignId: null as string | null,
    counted: 'all' as 'all' | 'true' | 'false',
    date: null as string | null
  }),
  actions: {
    async fetchData(
      page: number = this.currentPage,
      publisherId: string | null = this.publisherId,
      campaignId: string | null = this.campaignId,
      counted: 'all' | 'true' | 'false' = this.counted,
      date: string | null = this.date
    ) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const token = useCookie('token').value; // Adjust based on your cookie handling
        const response = await axios.get(`http://localhost:5000/api/clicksMobile`, {
          params: {
            page,
            publisherId,
            campaignId,
            counted,
            date
          },
          headers: {
            'Authorization': `${token}`, // Add Authorization header if needed
            'Content-Type': 'application/json',
          },
        });
        const result = response.data;
        this.data = Array.isArray(result.data) ? result.data : [];
        this.len = result.data.length;
        this.totalPages = result.totalPages;
        this.currentPage = result.currentPage;
        this.perPage = result.perPage;
      } catch (err: any) {
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
    },
    applyFilters(
      publisherId: string | null,
      campaignId: string | null,
      counted: 'all' | 'true' | 'false',
      date: string | null
    ) {
      this.publisherId = publisherId;
      this.campaignId = campaignId;
      this.counted = counted;
      this.date = date;
      this.currentPage = 1; // Reset to the first page with new filters
      this.fetchData(); // Fetch data with the current filters
    }
  }
});
