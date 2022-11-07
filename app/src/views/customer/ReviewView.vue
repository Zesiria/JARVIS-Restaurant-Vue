<script>
    import Popup from "@/components/foods/Popup.vue"
    import { useReviewStore } from "@/stores/review"
    import { useAuthStore } from "@/stores/auth"
    import HamburgerMenu from "@/components/HamburgerMenu.vue";
    
    export default{
        setup(){
            const review_store = useReviewStore()
            const auth_store = useAuthStore()
            return {review_store, auth_store}
        },
        data() {
            return {
                review : {
                    customer_id : null,
                    description : ""
                },
                message : "",
                isOpen : false,
                submitButton: false,
                error : null
            }
        },
        components:{
            Popup,
            HamburgerMenu
        },
        methods:{
            handleCompleteReview(){
              if(this.message == 0){
                this.error = "โปรดใส่ข้อความ"
              }
              else {
                this.isOpen = true
              }
            },
            close(){
                this.isOpen = false
            },
            async handleSubmitForm(){
                this.submitButton = true
                this.review.customer_id = this.auth_store.getCustomerId
                this.review.description = this.message

                const response = await this.review_store.add(this.review)
                if (response != false){
                    console.log(response)
                    this.$router.push('/foods')
                }
                else {
                    console.log("Fail to save review.")
                }
                this.isOpen = false
                this.submitButton = false
            }
        }
    }
</script>

<template>
  <div class="m-8">
    <div class="m-auto min-w-fit sm:w-2/3 lg:w-1/2">
      <div class="flex justify-between">
        <button onclick="history.back()">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 20-8-8 8-8 1.425 1.4-5.6 5.6H20v2H7.825l5.6 5.6Z"/></svg>
        </button>
        <HamburgerMenu></HamburgerMenu>
      </div>
      <div>
      <h1 class="title-page">แสดงความคิดเห็นร้านอาหาร</h1>

      <div class="pl-5 pt-3">
          <textarea v-model="this.message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="เขียนแสดงความคิดเห็นของคุณที่นี่"></textarea>
      </div>
      <div class="pl-5 pt-3 text-red-400">
        <p>{{ this.error }}</p>
      </div>

    <Popup :open="isOpen">
        <template v-slot:header>
            ยืนยันการแสดงความคิดเห็น
        </template>

        <template v-slot:content>
            คุณสามารถแสดงความคิดเห็นได้แค่ครั้งเดียวเท่านั่น ต้องกานยืนยันหรือไม่ ?
        </template>

        <template v-slot:footer>
            <button data-modal-toggle="defaultModal" v-bind:disabled="submitButton" type="button" @click="handleSubmitForm" class="text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              ยืนยัน
            </button>
            <button data-modal-toggle="defaultModal" v-bind:disabled="submitButton" type="button" @click="close" class="text-blue-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-50 dark:focus:ring-blue-800">
              ปิด
            </button>
          </template>
        </Popup>
      <button @click="handleCompleteReview" class="float-right mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">ยืนยัน</button>
    </div>
  </div>
  </div>
</template>