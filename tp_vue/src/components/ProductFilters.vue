<template>
  <div class="product-filters">
    <input type="text" v-model="productName" placeholder="Search for a product" @input="emitName" />
    <input type="checkbox" v-model="showAll" @change="emitDispo" >
    <select  @change="emitSort" v-model="sortOption">
      <option value="asc">ascending</option>
      <option value="desc">descending</option>
    </select>
    <select v-model="category" @change="emitCategory">
      <option v-for="(cat, index) in categories" :key="index" :value="cat">{{ cat }}</option>
    </select>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import products from '@/assets/products.json'

const categories = ref([])
const category = ref("")
const productName = ref("")
const showAll=ref(true) 
const sortOption=ref(true) ; 
const emit = defineEmits(['change-category', 'filter-name', 'show-all','sort-opt'])

function emitCategory() {
  emit('change-category', category.value)  // Emit the selected category
}
function emitName(){ 
  emit('filter-name' , productName.value) ; 
}
function emitDispo(){
  emit('show-all', showAll.value);
}

function emitSort(){
  emit('sort-opt',sortOption.value )
}
function fetchCategories() {
  const s = new Set()
  for (const item of products) {
    s.add(item.categorie)  
  }
  categories.value = Array.from(s)
}

fetchCategories()
</script>
