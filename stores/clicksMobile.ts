// stores/clicksMobile.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useClicksMobileStore = defineStore('clicksMobile', {
  state: () => ({
    data: [] as any[],
    isLoading: false,
    error: null as string | null,
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    perPage: 20,
    startDate: null as string | null,
    endDate: null as string | null,
  }),
  
  actions: {
    async fetchData(
      page: number = this.currentPage,
      startDate: string | null = this.startDate,
      endDate: string | null = this.endDate
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
        if (startDate && startDate.trim() !== '') {
          params.startDate = startDate;
        }
        
        if (endDate && endDate.trim() !== '') {
          params.endDate = endDate;
        }
        
        console.log('Fetching mobile clicks with params:', params);
        
        const response = await axios.get(`https://api.daartads.com/tracker/api/v1/clicks-mobile`, {
          params: params,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        console.log('API Response:', response.data);
        
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
        
        console.log('Mobile clicks loaded:', this.data.length, 'items');
        console.log('Total count:', this.totalCount);
        console.log('Total pages:', this.totalPages);
        
      } catch (err: any) {
        console.error('API Error:', err);
        this.error = err.message || 'Failed to load data';
      } finally {
        this.isLoading = false;
      }
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
    
    setDateRange(startDate: string | null, endDate: string | null) {
      this.startDate = startDate;
      this.endDate = endDate;
      this.currentPage = 1;
      this.fetchData(1);
    },
    
    clearDateFilter() {
      this.startDate = null;
      this.endDate = null;
      this.currentPage = 1;
      this.fetchData(1);
    }
  }
});