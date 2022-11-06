<script>
import Index from "@/components/Index.vue"
export default {
  components:{
    Index
  },
}
</script>

<template>
  <div class="m-auto sm:w-2/3  lg:w-1/2">
    <div class="menu">
      <div class="flex gap-10 w-full justify-center lg:justify-center bg-white border-b-4 border-gray-300 overflow-auto whitespace-no-wrap py-3 px-4">
        <RouterLink to="/foods">
          <div class="flex gap-2">
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
              <path d="M4.167 16.667V7.938L10 3.521l5.833 4.417v8.729h-4.708V11.5H8.854v5.167Z"/>
            </svg>
            </div>
            <button class="w-max-full shrink-0">
              หน้าหลัก
            </button>
          </div>
        </RouterLink>

        <RouterLink to="/customer/login">
          <div class="flex gap-2">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M10 10q-1.25 0-2.125-.875T7 7q0-1.25.875-2.125T10 4q1.25 0 2.125.875T13 7q0 1.25-.875 2.125T10 10Zm-6 6v-2q0-.479.26-.906.261-.427.719-.719 1.146-.667 2.427-1.021Q8.688 11 10 11q1.312 0 2.594.354 1.281.354 2.427 1.021.458.271.719.708.26.438.26.917v2Z"/></svg>
            </div>
            <button class="w-max-full shrink-0">
              สำหรับลูกค้า
            </button>
          </div>
        </RouterLink>

        <RouterLink to="/login">
          <div class="flex gap-2">
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
              <path d="M9.646 17v-.667h5.333q.229 0 .375-.145.146-.146.146-.376v-5.75q0-1.145-.427-2.145t-1.177-1.75q-.75-.75-1.75-1.188-1-.437-2.146-.437t-2.146.437q-1 .438-1.75 1.188t-1.177 1.75q-.427 1-.427 2.145v4.667h-.583q-.459 0-.771-.323-.313-.323-.313-.802v-1.542q0-.354.271-.666.271-.313.729-.417l.021-1.062q.021-1.146.5-2.229.479-1.084 1.302-1.938.823-.854 1.938-1.354 1.114-.5 2.406-.5 1.271 0 2.396.489 1.125.49 1.948 1.334.823.843 1.291 1.927.469 1.083.511 2.271l.021 1.062q.437.104.718.375.282.271.282.625v1.75q0 .333-.282.615-.281.281-.718.385v1.083q0 .5-.344.844t-.844.344Zm-1.563-5.375q-.229 0-.395-.167-.167-.166-.167-.375 0-.229.167-.395.166-.167.374-.167.23 0 .396.167.167.166.167.374 0 .23-.167.396-.166.167-.375.167Zm3.855 0q-.23 0-.396-.167-.167-.166-.167-.375 0-.229.167-.395.166-.167.375-.167.229 0 .395.167.167.166.167.374 0 .23-.167.396-.166.167-.374.167Zm-5.855-1.146q-.062-.854.198-1.646.261-.791.792-1.395.531-.605 1.302-.959t1.667-.354q1.5 0 2.593 1.01 1.094 1.011 1.24 2.511-1.542 0-2.802-.854-1.261-.854-1.969-2.209-.25 1.271-1.042 2.302-.791 1.032-1.979 1.594Z"/>
            </svg>
            </div>
            <button  class="w-max-full shrink-0">
              สำหรับพนักงาน
            </button>
          </div>
        </RouterLink>
      </div>
    </div>
    <div class="m-8">
      <div class="justify-center">
        <index></index>
      </div>
    </div>
  </div>
</template>
