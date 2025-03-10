<template>
  <header>
    <img src="images/logo-les-bonnes-pieces.png" alt="LOGO">
    <h1>Les Bonnes Pièces</h1>
  </header>
  <div id="app" class="container my-4">

    <!-- Filters -->
    <div class="filters d-flex flex-wrap gap-3 mb-4">
      <input
        type="text"
        v-model="searchText"
        class="form-control"
        placeholder="Recherchez une pièce..."
      />

      <select v-model="selectedCategory" class="form-select">
        <option value="">Toutes les catégories</option>
        <option
          v-for="categorie in categories"
          :key="categorie"
          :value="categorie"
        >
          {{ categorie }}
        </option>
      </select>

      <label class="form-check-label d-flex align-items-center">
        <input type="checkbox" v-model="filterDisponible" class="form-check-input me-2" />
        Disponible uniquement
      </label>

      <select v-model="sortOrder" class="form-select">
        <option value="asc">Prix croissant</option>
        <option value="desc">Prix décroissant</option>
      </select>
    </div>

    <!-- Products -->
    <div class="row g-3">
      <div v-for="piece in sortedPieces" :key="piece.id" class="col-md-4">
        <div class="card h-100">
          <div class="card-body text-center">
            <img :src="require(`./assets/images/${piece.Image}`)" :alt="piece.nom" width="150" />
            <h5 class="card-title">{{ piece.nom }}</h5>
            <p class="card-text">Prix : {{ piece.prix }}€</p>
            <p class="card-text">Catégorie : {{ piece.categorie }}</p>
            <p v-if="piece.disponible" class="text-success">En stock</p>
            <p v-else class="text-danger">Indisponible</p>
            <button
              @click="ajouterAuPanier(piece)"
              :disabled="!piece.disponible"
              :class="{
                'btn btn-primary': piece.disponible,
                'btn btn-danger': !piece.disponible
              }"
              class="mt-2"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart -->
    <div class="mt-5">
      <h2>Panier</h2>
      <div v-if="panier.length">
        <ul class="list-group mb-3">
          <li v-for="(item, index) in panier" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
            {{ item.nom }} - {{ item.prix }}€ x {{ item.quantite }} = {{ item.prix * item.quantite }}€
            <div>
              <button @click="retirerDuPanier(item)" class="btn btn-sm btn-outline-danger">-</button>
              <button @click="ajouterAuPanier(item)" class="btn btn-sm btn-outline-success">+</button>
            </div>
          </li>
        </ul>
        <p class="fw-bold">Total : {{ totalPanier }}€</p>
      </div>
      <p v-else class="text-muted">Votre panier est vide.</p>
    </div>
  </div>
</template>


<script>
export default {
  name: "App",
  data() {
    return {
      pieces: [],
      searchText: "",
      selectedCategory: "",
      filterDisponible: false,
      sortOrder: "asc",
      panier: []
    }
  },
  mounted() {
    fetch('/pieces-auto.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.pieces = data;
        console.log("Données chargées:", data);
      })
      .catch(error => console.error("Erreur de chargement des pièces:", error));
  },
  computed: {
    categories() {
      const set = new Set(this.pieces.map(piece => piece.categorie));
      return Array.from(set);
    },
    filteredPieces() {
      return this.pieces.filter(piece => {
        if (this.filterDisponible && !piece.disponible) return false;
        if (this.searchText && !piece.nom.toLowerCase().includes(this.searchText.toLowerCase())) return false;
        if (this.selectedCategory && piece.categorie !== this.selectedCategory) return false;
        return true;
      });
    },
    sortedPieces() {
      return this.filteredPieces.slice().sort((a, b) => {
        return this.sortOrder === "asc" ? a.prix - b.prix : b.prix - a.prix;
      });
    },
    totalPanier() {
      return this.panier.reduce((total, piece) => total + (piece.prix * piece.quantite), 0);
    }
  },
  methods: {
    ajouterAuPanier(piece) {
      const item = this.panier.find(p => p.id === piece.id);
      if (item) {
        item.quantite += 1;
      } else {
        this.panier.push({ ...piece, quantite: 1 });
      }
    },
    retirerDuPanier(piece) {
      const item = this.panier.find(p => p.id === piece.id);
      if (item) {
        item.quantite -= 1;
        if (item.quantite <= 0) {
          this.panier = this.panier.filter(p => p.id !== piece.id);
        }
      }
    }
  }
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: auto;
}

h1 {
  color: #007bff;
  font-weight: bold;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  margin-bottom: 1em;
  align-items: center;
}

.filters input,
.filters select {
  width: 250px;
  min-width: 200px;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ced4da;
}

.filters input:focus,
.filters select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.4);
}

.card {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  background-color: #ffffff;
}

.card:hover {
  transform: scale(1.02);
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #007bff;
}

.card-text {
  margin-bottom: 0.5rem;
  color: #555;
}

.text-success {
  color: #28a745;
}

.text-danger {
  color: #dc3545;
}

.card-body {
  padding: 1.5rem;
}

.btn-primary {
  width: 100%;

}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-group-item:hover {
  background-color: #f1f1f1;
}

.fw-bold {
  font-weight: bold;
}

.text-muted {
  color: #6c757d;
}
  .btn-primary {
    width: 80%; 
    padding: 0.6rem 1rem; 
    background-color: #28a745; 
    border-color: #28a745;
    color: #fff;
    font-weight: bold;
    border-radius: 5px;
    transition: background-color 0.2s ease-in-out;
  }
  
  .btn-primary:hover {
    background-color: #218838; /* Darker green on hover */
    border-color: #1e7e34;
  
}
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

body {
	max-width: 1200px;
	margin: auto;
	padding: 16px;
	font-family: 'Montserrat', sans-serif;
}

header {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 16px;
	padding: 8px;
	background-color: #7451eb;
	text-align: center;
	color: white;
}
header img {
	height: 60px;
	margin-left: 1rem;
}
header h1 {
	flex-grow: 1;
}

main {
	display: flex;
	flex-direction: row;
}

.filtres {
	border-radius: 4px;
	box-shadow: 0px 0px 4px gray;
	margin: 8px;
	padding: 8px;
	min-width: 300px;
	min-height: 400px;
}
.filtres h3 {
	text-align: center;
}

.fiches {
	flex: 1;
	margin: 8px;
}
.fiches img {
	max-width: 200px;
}
.fiches p {
	margin-top: 4px;
	margin-bottom: 4px;
}
</style>
