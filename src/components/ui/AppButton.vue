<!-- components/ui/AppButton.vue -->
<template>
  <button :class="['app-button', variant]">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary'
  }
})
</script>

<style></style>