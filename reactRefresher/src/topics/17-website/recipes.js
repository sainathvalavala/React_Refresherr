// Data lives in its own file so pages can share it. A real site would fetch
// this from an API instead (see UserFetcher in topic 5).
export const recipes = [
  {
    id: "masala-dosa",
    name: "Masala Dosa",
    minutes: 40,
    steps: ["Spread the batter thin", "Add potato masala", "Fold and serve hot"],
  },
  {
    id: "pasta",
    name: "Tomato Pasta",
    minutes: 20,
    steps: ["Boil the pasta", "Cook garlic and tomatoes", "Toss together"],
  },
  {
    id: "lemon-rice",
    name: "Lemon Rice",
    minutes: 15,
    steps: ["Temper mustard seeds", "Add cooked rice", "Squeeze in lemon"],
  },
];
