# Ma Pharmacie - Application de gestion de médicaments

## Présentation

[Cette application web](http://desoutter.alwaysdata.net/) est une gestion simple de médicaments avec fonctionnalités de CRUD (Créer, Lire, Mettre à jour, Supprimer). Elle permet aussi la recherche, l'affichage d'un graphique de répartition des médicaments, et l'export PDF de la liste. L'application est développée avec Vue, utilise Bootstrap pour le style et Chart.js pour les graphiques.

---

## Utilisation

### Fonctionnalités principales

- **Liste des médicaments** : affichage des médicaments avec dénomination, forme, quantité, photo
- **Recherche** : barre de recherche par dénomination
- **Ajout / modification** : formulaire pour ajouter ou éditer un médicament
- **Suppression** : supprimer un médicament
- **Livraison / Dispensation** : boutons pour incrémenter ou décrémenter la quantité
- **Export PDF** : exporter la liste filtrée des médicaments en fichier PDF
- **Graphique** : afficher un diagramme de répartition des médicaments par quantité

### Interface

- Le titre "💊 Ma Pharmacie" est un lien vers la page principale
- Barre de recherche en haut pour filtrer les médicaments
- Boutons pour ajouter un médicament (redirection vers un formulaire), exporter en PDF, et afficher/masquer le graphique
- Liste des médicaments affichée sous forme de cartes avec actions disponibles

---

### Modifier ou ajouter des médicaments

- Utiliser le formulaire dédié pour ajouter ou éditer un médicament
- Les images peuvent être uploadées via le formulaire

### Recherche

- La recherche filtre par dénomination

### Graphique

- Le graphique affiche la répartition de médicaments par quantité

---

## Dépendances principales

- [Vue 3](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Chart.js](https://www.chartjs.org/)
- [jsPDF](https://github.com/parallax/jsPDF)

---

## Structure des fichiers

- `src/components` : composants Vue, comme la liste des médicaments, le formulaire, le graphique
- `src/utils/api.js` : fonctions d'appel API pour gestion des médicaments
- `src/models/medicament.js` : modèle de données utilisé par les médicaments
- `src/assets` : images et ressources statiques
- `src/App.vue` et `src/main.js` : point d'entrée de l’application

---

## Remarques

- La gestion des images dans les médicaments permet une image locale par défaut si aucune photo API n’est disponible
- Le mode recherche met à jour la liste en temps réel
- Le graphique est dynamique et basé sur les données affichées
- L’export PDF inclut la liste filtrée avec plusieurs lignes de texte 
