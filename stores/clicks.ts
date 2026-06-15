// stores/clicks.js - Updated for date filters only
import { defineStore } from 'pinia';
import axios from 'axios';

export const useClicksStore = defineStore('clicks', {
  state: () => ({
    data: [] as any[],
    isLoading: false,
    error: null as string | null,
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    perPage: 20,
    selectedCampaignId: null as string | null,
    selectedPublisherId: null as string | null,
    selectedCounted: 'all' as 'all' | 'true' | 'false',
    start: null as string | null,
    end: null as string | null,
  }),
  
  actions: {
    async fetchData(
      page: number = this.currentPage,
      start: string | null = this.start,
      end: string | null = this.end
    ) {
      this.isLoading = true;
      this.error = null;

      try {
        const token = useCookie('token').value;
        
        // Build params object - only include valid parameters
        const params: any = {
          page: page,
          limit: this.perPage
        };
        
        // Only add date parameters if they have valid values
        if (start && start.trim() !== '') {
          params.start = start;
        }
        
        if (end && end.trim() !== '') {
          params.end = end;
        }
        
        
        const response = await axios.get(`https://api.daartads.com/tracker/api/v1/clicks`, {
          params: params,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const result = response.data;
        
        // Handle the actual API response structure
        if (result.data && Array.isArray(result.data)) {
          this.data = result.data;
        } else if (Array.isArray(result)) {
          this.data = result;
        } else {
          this.data = [];
        }
        
        // Set pagination values
        this.currentPage = result.page || result.currentPage || page;
        this.perPage = result.limit || result.perPage || 20;
        this.totalCount = result.total || result.totalCount || this.data.length;
        this.totalPages = Math.ceil(this.totalCount / this.perPage);

        
      } catch (err: any) {
        console.error('API Error:', err);
        this.error = err.message || 'Failed to load data';
      } finally {
        this.isLoading = false;
      }
    },
    
    setFilters({ start, end }: any) {
      if (start !== undefined) this.start = start;
      if (end !== undefined) this.end = end;
      this.currentPage = 1;
    },
    
    resetData() {
      this.data = [];
      this.error = null;
      this.currentPage = 1;
      this.totalPages = 1;
      this.totalCount = 0;
      this.perPage = 20;
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
    
    clearDateFilter() {
      this.start = null;
      this.end = null;
      this.currentPage = 1;
      this.fetchData(1);
    }
  }
});