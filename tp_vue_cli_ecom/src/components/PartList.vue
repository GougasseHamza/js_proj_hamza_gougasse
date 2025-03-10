<template>
  <div class="part-list">
    <div v-for="part in filteredParts" :key="part.id" class="part-item">
      <img :src="require(`@/assets/${part.image}`)" :alt="part.name" class="part-image"/>
      <h3>{{ part.name }}</h3>
      <p>Price: ${{ part.price }}</p>
      <p v-if="part.available">Available</p>
      <p v-else>Out of Stock</p>
      <button @click="addToCart(part)">Add to Cart</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    parts: Array,
    searchQuery: String,
    selectedCategory: String,
    sortOption: String
  },
  computed: {
    filteredParts() {
      let filtered = this.parts.filter(part => {
        const matchesSearch = part.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory = this.selectedCategory === '' || part.category === this.selectedCategory;
        return matchesSearch && matchesCategory;
      });

      // Sort the parts based on selected option
      if (this.sortOption === 'price-asc') {
        filtered = filtered.sort((a, b) => a.price - b.price);
      } else if (this.sortOption === 'price-desc') {
        filtered = filtered.sort((a, b) => b.price - a.price);
      }

      return filtered;
    }
  },
  methods: {
    addToCart(part) {
      this.$emit('add-to-cart', part);
    }
  }
}
</script>

<style scoped>
.part-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.part-item {
  margin: 20px;
  border: 1px solid #ddd;
  padding: 15px;
  text-align: center;
  width: 200px;
}

.part-image {
  width: 100%;
  height: auto;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
