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
    async fetchIncomeDay () {
        this.reports = await reportAPI.getIncomeToday()
    },
    async fetchIncomeWeek () {
        this.reports = await reportAPI.getIncomeWeek()
    },
    async fetchBillFrom(id){
        this.bill = await reportAPI.getBillOf(id)
    }
  },
})