<template>
  <!-- Main modal -->
  <transition name="fade drop-in">
    <div v-show="open" class="popup flex items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
      <div class="mx-auto sm:w-3/5 lg:w-1/3 w-3/4">
        <!-- Modal content -->
        <div v-show="open" class=" relative bg-white rounded-lg shadow dark:bg-gray-900">
          <!-- Modal header -->
          <div class="flex flex-col items-center justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              <slot name="header"></slot>
            </h3>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <p class="text-base leading-relaxed text-gray-800 dark:text-gray-400">
              <slot name="content"></slot>
            </p>
          </div>
          <!-- Modal footer -->
          <div class="flex flex-row-reverse items-center py-2 px-4 space-x-2 space-x-reverse rounded-b border-t border-gray-200 dark:border-gray-600">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
export default {
  // setup () {
  //   const close = () => {
  //     emit('close')
  //   }
  //   return {close};
  // },
  props: {
    open: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style>
*,
::before,
::after {
  margin: 0;
  padding: 0;

  box-sizing: border-box;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgb(0, 0, 0, 0.1);
  z-index: 1;
}

.popup-inner{
  @apply m-auto sm:w-3/5 lg:w-1/3 w-3/4
  /*min-width: 400px;*/
  /*max-width: 40%;*/
  /*margin: 2rem auto;*/
}

.popup-content {
  position: relative;
  background-color: white;
  /*border: 1px solid rgba(0, 0, 0, 0.3);*/
  background-clip: padding-box;
  border-radius: 0.3rem;
  padding: 1rem;
}

.fade-enter-active,
.fade-leave-active{
  transition: 0.1s;
}

.fade-enter-from,
fade-leave-to{
  opacity: 0;
}

.drop-in-enter-active,
.drop-in-leave-active{
  transition: all 0.1s ease-out;
}

.drop-in-enter-from,
.drop-in-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

</style>