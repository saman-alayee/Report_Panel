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
    selectedCampaignId: null as string | null,
    selectedPublisherId: null as string | null,
    selectedCounted: 'all' as 'all' | 'true' | 'false',
    startDate: null as string | null,
    endDate: null as string | null,
  }),
  actions: {
    async fetchData(
      page: number,
      counted: 'all' | 'true' | 'false' = this.selectedCounted,
      campaignId: string | null  = this.selectedCampaignId,
      publisherId: string | null = this.selectedPublisherId,
      startDate: string | null = this.startDate,
      endDate: string | null = this.endDate
    ) {
      this.isLoading = true;
      this.error = null;

      try {
        const token = useCookie('token').value;
        const response = await axios.get(`http://localhost:5000/api/clicks`, {
          params: { 
            page,
            counted,
            campaignId,
            publisherId,
            startDate,
            endDate
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
      } catch (err: any) {
        this.error = err.message || 'Failed to load data';
      } finally {
        this.isLoading = false;
      }
    },
    setFilters({ campaignId, publisherId, counted, startDate, endDate }: any) {
      this.selectedCampaignId = campaignId;
      this.selectedPublisherId = publisherId;
      this.selectedCounted = counted;
      this.startDate = startDate;
      this.endDate = endDate;
      this.currentPage = 1;
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
