<template>
    <div class="">
      <div class="m-8">
        <div class="m-auto min-w-fit sm:w-2/3 lg:w-1/2">
          <div class="flex justify-between">
            <button onclick="history.back()">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 20-8-8 8-8 1.425 1.4-5.6 5.6H20v2H7.825l5.6 5.6Z"/></svg>
            </button>
            <HamburgerMenu></HamburgerMenu>
          </div>
          <h1 class="title-page">รายงานการขายทั้งหมด</h1>
        <div class="mt-4 w-full text-xl text-white bg-blue-800 rounded px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800  ">
          Chart
        </div>
        <div class="content-center ml-4">
        <label for="saleSortOption" class="block mb-2 text-gray-900 dark:text-gray-400">จัดเรียงตาม</label>
        <select v-model="sortOption" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-1/4 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="day">วัน</option>
            <option value="week">สัปดาห์</option>
            <option value="allTime">ทั้งหมด</option>
        </select>
        <div class="w-3/4 max-h-30 mt-4">
            <BarChart :chartData="todaySale" />
        </div>
        <div class="w-3/4 max-h-30 mt-4">
            <LineChart :chartData="dailyIncome" />
        </div>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
import BarChart from '@/components/chart/BarChart.vue'
import LineChart from '@/components/chart/LineChart.vue'
import { useReportStore } from '@/stores/report.js'
import HamburgerMenu from "@/components/HamburgerMenu.vue";

export default {
    setup(){
        const report_store = useReportStore()
        return { report_store }
    },
    data(){
        return {
            foods_name : [],
            sortOption : "day",
            todaySale : {
                labels: [],
                datasets: []
            },
            dailyIncome : {
                labels: [],
                datasets: []
            }
        }
    },
    async mounted(){
        await this.report_store.fetchSale()
        let reports = this.report_store.getReports
        this.fetchSaleChart(reports)
        await this.report_store.fetchIncomeDay()
        let incomeDailyReports = this.report_store.getReports
        this.fetchIncomeDayChart(incomeDailyReports)
    },
    components:{
        BarChart,
        LineChart,
        HamburgerMenu
    },
    watch:{
        async sortOption(newOption, oldOption) {
            await this.report_store.fetchSale()
            let reports = this.report_store.getReports
            switch (newOption) {
                case 'day':
                    reports.sort(function (a, b) {
                        var keyA = a.sale_in_a_day
                        var keyB = b.sale_in_a_day
                        return keyB-keyA
                    })
                    break
                case 'week':
                    reports.sort(function (a, b) {
                        var keyA = a.sale_in_a_week
                        var keyB = b.sale_in_a_week
                        return keyB-keyA
                    })
                    break
                case 'allTime':
                    reports.sort(function (a, b) {
                        var keyA = a.sale_all_time
                        var keyB = b.sale_all_time
                        return keyB-keyA
                    })
                    break
                }
            this.fetchSaleChart(reports)
        },
    },
    methods:{
        fetchSaleChart(reports){
            this.todaySale = {
                labels: [],
                datasets: []
            }
            this.foods_name = reports.map( report => report.food_name)
            this.todaySale.labels = this.foods_name
            let dayDataset = {
                label: '1 วันที่ผ่านมา',
                backgroundColor: '#f87979',
                data: reports.map( report => report.sale_in_a_day)
            }
            this.todaySale.datasets.push(dayDataset)

            let weekDataset = {
                label: '1 สัปดาห์ที่ผ่านมา',
                backgroundColor: '#FF00FF',
                data: reports.map( report => report.sale_in_a_week)
            }
            this.todaySale.datasets.push(weekDataset)

            let allTimeDataset = {
                label: 'ยอดขายทั้งหมด',
                backgroundColor: '#A1FF00',
                data: reports.map( report => report.sale_all_time)
            }
            this.todaySale.datasets.push(allTimeDataset)
        },
        fetchIncomeDayChart(reports){
            this.dailyIncome.labels = reports.map(report => report.date)
            this.dailyIncome.datasets.push({
                label: 'รายได้ต่อวัน',
                backgroundColor: '#FF00FF',
                data: reports.map(report => report.data)
            })
        }
    }
}

</script>