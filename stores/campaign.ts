// stores/campaign.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useCampaignStore = defineStore('campaigns', {
  state: () => ({
    data: [] as Campaign[],
    isLoading: false,
    error: null as string | null,
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    perPage: 10,
    selectedActivate: 'all' as 'all' | 'true' | 'false',
    selectedType: 'all' as 'all' | string,
    selectedMobile: 'all' as 'all' | 'true' | 'false',
    selectedWeb: 'all' as 'all' | 'true' | 'false',
    selectedInstall: 'all' as 'all' | 'true' | 'false',
    selectedClicks: '' as string,
    campaignId: null as string | null,
    name: null as string | null
  }),
  
  actions: {
    /**
     * Fetch campaigns data from API
     */
    async fetchData(page: number = this.currentPage) {
      this.isLoading = true
      this.error = null

      try {
        const token = useCookie('token').value;
        

        
        
        const response = await axios.get(`https://api.daartads.com/tracker/api/v1/campaigns`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        console.log('API Response:', response.data);
        
        // Handle different response structures
        const result = response.data;
        
        // Check if data is in result.data or directly in result
        if (result.data && Array.isArray(result.data)) {
          this.data = result.data;
        } else if (Array.isArray(result)) {
          this.data = result;
        } else {
          this.data = [];
        }
        
        // Set pagination values
        this.totalPages = result.totalPages || result.last_page || 1;
        this.totalCount = result.totalCount || result.total || result.total_items || this.data.length;
        this.currentPage = result.currentPage || result.current_page || page;
        this.perPage = result.perPage || result.per_page || 10;
        
        console.log('Data loaded:', this.data.length, 'items');
        console.log('Total pages:', this.totalPages);
        console.log('Total count:', this.totalCount);
        
      } catch (err: any) {
        console.error('API Error:', err);
        this.error = err.message || 'Failed to load data';
      } finally {
        this.isLoading = false
      }
    },
    
    resetData() {
      this.data = [];
      this.error = null;
      this.currentPage = 1;
      this.totalPages = 1;
      this.totalCount = 0;
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
      this.selectedActivate = activate;
      this.selectedMobile = mobile;
      this.selectedWeb = web;
      this.selectedInstall = install;
      this.name = name;
      this.selectedType = type;
      this.currentPage = 1;
    },
  }
});
