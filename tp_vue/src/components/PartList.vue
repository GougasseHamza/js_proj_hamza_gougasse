<template>
  <div>
    <ProductFilters @sort-opt="HandleSortOpt" @show-all="HandleShowAll" @filter-name="HandleFilterName" @change-category="HandleUpdateCategory" />
    <div class="part-list">
      <ul>
        <li v-for="item in filteredItems" :key="item.id" class="part-item">
          <div>
            <img :src="require(`@/assets/images/${item.Image}`)" />
            <p>{{ item.nom }}</p>
            <p> {{item.prix}}</p>
            <p v-if="item.disponible">En stock</p>
            <p v-else>Indisponible</p>
            <button @click="addToCart(item.id)">Ajouter Au Panier</button>
          </div>
        </li>
      </ul>
    </div>
    <CartFile :cartItems="cart" :total="calculateTotal" @remove-item="removeFromCart" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CartFile from './CartFile.vue'
import ProductFilters from './ProductFilters.vue'
import productsData from '@/assets/products.json'

const items = ref(productsData)
const cart = ref([])
const category = ref("")
const curr_product = ref("")
const showAll=ref(true) 
const sortopt=ref(true)

const filteredItems = computed(() => {
  const filtered = items.value.filter(item => { 
    if (category.value && item.category != category.value) return false; 
    if (curr_product.value && !item.nom.toLowerCase().includes(curr_product.value)) return false; 
    if (showAll.value && !item.disponible) return false; 
    return true; 
  });
  return sortopt.value=="asc" ? filtered.sort((a, b) => a.prix - b.prix) : filtered.sort((a, b) => b.prix - a.prix);
});


function HandleUpdateCategory(cat) {
  category.value = cat
}
function HandleFilterName(name){ 
  curr_product.value= name ; 
}
function HandleShowAll(val){
  showAll.value=val
}




function HandleSortOpt(opt){ 
  sortopt.value=opt
}


const calculateTotal = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.prix, 0)
})

function addToCart(id) {
  const item = items.value.find(item => item.id === id)
  if (item) {
    cart.value.push(item)
  }
}

function removeFromCart(id) {
  const index = cart.value.findIndex(item => item.id === id)
  if (index !== -1) {
    cart.value.splice(index, 1)
  }
}
</script>
