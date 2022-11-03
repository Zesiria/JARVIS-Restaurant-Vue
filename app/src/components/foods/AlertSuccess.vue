<template>
  <!-- Main modal -->
  <transition name="fade drop-in">
    <div v-show="open" class="alert flex flex-col items-center overflow-y-auto overflow-x-hidden font-medium
                              fixed top-0 right-0 left-0 w-full md:inset-0 h-14
                              bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800">
      <!-- Modal content -->
      <slot name="content"></slot>
    </div>
  </transition>

</template>

<script>
export default {
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

.alert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  /*background-color: #01b701;*/
  background-clip: padding-box;
  border-radius: 0.3rem;
  padding: 1rem;
  z-index: 1;
}

.fade-enter-active,
.fade-leave-active{
  transition: 0.4s;
}

.fade-enter-from,
fade-leave-to{
  opacity: 0;
}

.drop-in-enter-active,
.drop-in-leave-active{
  transition: all 0.4s ease-out;
}

.drop-in-enter-from,
.drop-in-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

</style>