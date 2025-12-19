<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'light' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  href?: string
  target?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  type: 'button',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}

const buttonClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center tracking-wide rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'bg-fortu-dark text-fortu-off-white hover:bg-opacity-90 focus:ring-fortu-dark',
    secondary: 'bg-fortu-off-white text-fortu-dark hover:text-fortu-off-white hover:bg-transparent border-2 border-fortu-off-white focus:ring-fortu-medium',
    light: 'bg-fortu-light text-fortu-dark hover:bg-opacity-80 focus:ring-fortu-light',
    outline: 'bg-transparent text-fortu-off-white hover:text-fortu-dark hover:bg-fortu-off-white border-2 border-fortu-off-white focus:ring-fortu-medium',
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  
  return [
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size],
  ].join(' ')
})
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :class="buttonClasses"
    :type="href ? undefined : type"
    :href="href"
    :target="href ? target : undefined"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

