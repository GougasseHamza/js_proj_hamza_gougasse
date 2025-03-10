<template>
    <div>
      <h1>Catalogue de Pièces Auto</h1>
  
      <!-- Search bar -->
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Rechercher une pièce..."
        class="search-bar"
      />
  
      <!-- Filters -->
      <div>
        <label for="category-filter">Filtrer par catégorie: </label>
        <select v-model="selectedCategory" id="category-filter">
          <option value="">Tous</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
  
        <label for="available-filter">Disponibilité: </label>
        <select v-model="selectedAvailability" id="available-filter">
          <option value="">Tous</option>
          <option value="true">Disponible</option>
          <option value="false">Indisponible</option>
        </select>
      </div>
  
      <!-- Sort by price -->
      <div>
        <label for="sort-price">Trier par prix: </label>
        <select v-model="sortOrder" id="sort-price">
          <option value="asc">Croissant</option>
          <option value="desc">Décroissant</option>
        </select>
      </div>
  
      <!-- Product List -->
      <div class="product-list">
        <div v-for="product in filteredProducts" :key="product.id" class="product-item">
          <img :src="`/images/${product.image}`" alt="product image" class="product-image" />
          <div class="product-details">
            <h2>{{ product.nom }}</h2>
            <p>{{ product.categorie }}</p>
            <p>Prix: {{ product.prix }}€</p>
            <p v-if="product.disponible">En stock</p>
            <p v-else>Indisponible</p>
            <button @click="addToCart(product)" :disabled="!product.disponible">Ajouter au panier</button>
          </div>
        </div>
      </div>
  
      <!-- Cart -->
      <h2>Mon Panier</h2>
      <div v-if="cart.length > 0">
        <ul>
          <li v-for="item in cart" :key="item.id">
            {{ item.nom }} - {{ item.prix }}€
            <button @click="removeFromCart(item.id)">Retirer</button>
          </li>
        </ul>
        <p>Total: {{ totalPrice }}€</p>
      </div>
      <div v-else>
        <p>Votre panier est vide.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [],
        cart: [],
        searchQuery: "",
        selectedCategory: "",
        selectedAvailability: "",
        sortOrder: "asc",
      };
    },
    computed: {
      categories() {
        return [...new Set(this.products.map(product => product.categorie))];
      },
      filteredProducts() {
        return this.products
          .filter(product => {
            const matchesCategory =
              !this.selectedCategory || product.categorie === this.selectedCategory;
            const matchesAvailability =
              this.selectedAvailability === "" || product.disponible.toString() === this.selectedAvailability;
            const matchesSearch =
              product.nom.toLowerCase().includes(this.searchQuery.toLowerCase());
  
            return matchesCategory && matchesAvailability && matchesSearch;
          })
          .sort((a, b) => {
            return this.sortOrder === "asc"
              ? a.prix - b.prix
              : b.prix - a.prix;
          });
      },
      totalPrice() {
        return this.cart.reduce((acc, item) => acc + item.prix, 0);
      },
    },
    methods: {
      async fetchProducts() {
        const response = await fetch("/path/to/pieces-auto.json");
        this.products = await response.json();
      },
      addToCart(product) {
        this.cart.push(product);
      },
      removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
      },
    },
    mounted() {
      this.fetchProducts();
    },
  };
  </script>
  
  <style scoped>
  /* Add styling for the components here */
  </style>
  