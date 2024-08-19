import { defineStore } from 'pinia';
import axios from 'axios';

export const useCampaignStore = defineStore('campaigns', {
  state: () => ({
    data: [] as any[],
    isLoading: false,
    error: null as string | null,
    currentPage: 1,
    totalPages: 1,
    perPage: 10,
    selectedActivate: 'all' as 'all' | 'true' | 'false',
    selectedType: 'all' as 'all' | string,
    selectedMobile: 'all' as 'all' | 'true' | 'false',
    selectedWeb: 'all' as 'all' | 'true' | 'false',
    selectedInstall: 'all' as 'all' | 'true' | 'false',
    selectedClicks: '' as string,
    campaignId: null as string | null,  // New filter
    name: null as string | null         // New filter
  }),
  actions: {
    async fetchData(
      page: number = this.currentPage,
      activate: 'all' | 'true' | 'false' = this.selectedActivate,
      type: string | 'all' = this.selectedType,
      mobile: 'all' | 'true' | 'false' = this.selectedMobile,
      web: 'all' | 'true' | 'false' = this.selectedWeb,
      install: 'all' | 'true' | 'false' = this.selectedInstall,
      clicks: string = this.selectedClicks,
      campaignId: string | null = this.campaignId,
      name: string | null = this.name
    ) {
      this.isLoading = true;
      this.error = null;

      try {
        const token = useCookie('token').value; // Adjust based on your cookie handling
        const response = await axios.get(`http://localhost:5000/api/campaigns`, {
          params: {
            page,
            activate,
            type,
            mobile,
            web,
            install,
            clicks,
            campaignId,
            name
          },
          headers: {
            'Authorization': `${token}`, // Add Authorization header if needed
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
    setFilters({ campaignId, activate, type, mobile, web, install, name }: any) {
      this.campaignId = campaignId;
      this.selectedActivate = activate,
      this.selectedMobile = mobile,
      this.selectedWeb = web,
      this.selectedInstall = install,
      this.name = name,
      this.selectedType = type,
      this.currentPage = 1;


    },

  }
});
