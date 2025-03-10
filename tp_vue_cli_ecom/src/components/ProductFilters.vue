<template>
  <div class="filters">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search parts"
      class="search-bar"
    />
    <select v-model="selectedCategory" class="category-select">
      <option value="">All Categories</option>
      <option value="engine">Engine</option>
      <option value="brake">Brake</option>
      <option value="suspension">Suspension</option>
    </select>
    <select v-model="sortOption" class="sort-select">
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
    </select>
  </div>
</template>

<script>
export default {
    name:"ProductFilers",
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      sortOption: 'price-asc'
    }
  },
  methods: {
    // Emit filters to parent component
    updateFilters() {
      this.$emit('update-filters', {
        searchQuery: this.searchQuery,
        selectedCategory: this.selectedCategory,
        sortOption: this.sortOption
      });
    }
  },
  watch: {
    // Update filters when search query, category, or sort option changes
    searchQuery() { this.updateFilters(); },
    selectedCategory() { this.updateFilters(); },
    sortOption() { this.updateFilters(); }
  }
}
</script>

<style scoped>
.filters {
  margin-bottom: 20px;
}

.search-bar, .category-select, .sort-select {
  margin-right: 10px;
  padding: 5px;
}
</style>

