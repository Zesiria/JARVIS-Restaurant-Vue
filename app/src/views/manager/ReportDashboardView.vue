<template>
    <div class="">
        <div class="w-full text-xl text-white bg-blue-800 rounded px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800  ">
          Chart
        </div>
        
        <label for="saleSortOption" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">จัดเรียงตาม</label>
        <select v-model="sortOption" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="day">วัน</option>
            <option value="week">สัปดาห์</option>
            <option value="allTime">ทั้งหมด</option>
        </select>

        <BarChart :chartData="todaySale" />
    </div>
</template>

<script>
import BarChart from '@/components/chart/BarChart.vue'
import { useReportStore } from '@/stores/report.js'

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
        }
    },
    async mounted(){
        await this.report_store.fetchSale()
        let reports = this.report_store.getReports
        this.fetchSaleChart(reports)
    },
    components:{
        BarChart
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
            console.log(reports)
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
                backgroundColor: '#f87979',
                data: reports.map( report => report.sale_in_a_week)
            }
            this.todaySale.datasets.push(weekDataset)

            let allTimeDataset = {
                label: 'ยอดขายทั้งหมด',
                backgroundColor: '#f87979',
                data: reports.map( report => report.sale_all_time)
            }
            this.todaySale.datasets.push(allTimeDataset)
        }
    }
}

</script>