<template>
  <transition name="fade">
    <div class="popup flex items-center" v-show="open">
      <transition name="drop-in">
        <div class="popup-inner" v-show="open">
          <div class="popup-content flex flex-col space-y-2">
            <!--content in popup-->
            <slot name="content"></slot>
            <!--<button type="button" @click="close"> Close </button>-->
          </div>
        </div>
      </transition>
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