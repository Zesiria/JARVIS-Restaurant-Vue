import { defineStore } from 'pinia'
import { tableAPI } from '@/services/api.js'

export const useTableStore = defineStore("tables", {
  state: () => {
    return {
        tables: []
    }
  },
  
  getters: {
    getTables (state) {
        return state.tables
    }
  },

  actions: {
    async fetch () {
        this.tables = await tableAPI.getAll()
    },
    async add (table) {
        const response = await tableAPI.saveNew(table)
        if (response.success) {
          this.tables.push({
            ...table
          })
          return response.table_id
        }
	      return false
    },async update (table) {
      const response = await tableAPI.updateTable(table)
      if (response.success) {
        return true
      }
      return false
  },
    delete (id) {
      this.tables = this.tables.filter(table => table.id != id)
    }
  },
})