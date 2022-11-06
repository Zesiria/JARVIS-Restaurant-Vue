import { defineStore } from 'pinia'
import { reportAPI } from '@/services/api.js'

export const useReportStore = defineStore("reports", {
  state: () => {
    return {
        reports:[],
        bill:null
    }
  },
  
  getters: {
    getReports (state) {
        return state.reports
    },
    getBill(state){
      return state.bill
    }
  },

  actions: {
    async fetchSale () {
        this.reports = await reportAPI.getFoodSale()
    },
    async fetchIncome () {
        this.reports = await reportAPI.getIncome()
    },
    async fetchBillFrom(id){
        this.bill = await reportAPI.getBillOf(id)
    }
  },
})