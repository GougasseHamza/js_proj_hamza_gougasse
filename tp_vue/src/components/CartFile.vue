<template>
    <div class="cart-file">
      <ul>
        <li v-for="item in cartItems" :key="item.id">
          <div>
            <p>{{item.nom}}</p>
            <button @click="$emit('remove-item', item.id)">Remove</button>
          </div>
        </li>
      </ul>
      <p>Total: {{total}}</p>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  defineProps({
    cartItems: {
      type: Array,
      required: true,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    }
  })
  
  defineEmits(['remove-item'])
  </script>