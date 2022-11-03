import { defineStore } from 'pinia'
import { reportAPI } from '@/services/api.js'

export const useReportStore = defineStore("reports", {
  state: () => {
    return {
        reports:[]
    }
  },
  
  getters: {
    getReports (state) {
        return state.reports
    },
  },

  actions: {
    async fetchSale () {
        this.reports = await reportAPI.getFoodSale()
    },
    async fetchIncomeDay () {
        this.reports = await reportAPI.getIncomeDay()
    },
    async fetchIncomeWeek () {
        this.reports = await reportAPI.getIncomeWeek()
    }
  },
})