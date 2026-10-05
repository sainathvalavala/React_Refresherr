const menu = [
  { category: "Breakfast", items: ["Idli", "Dosa", "Upma"] },
  { category: "Lunch", items: ["Biryani", "Meals"] },
  { category: "Snacks", items: ["Samosa", "Bajji", "Pakoda"] },
];

// Nested lists: map inside map. Keys only need to be unique among SIBLINGS,
// so each inner list can reuse values that appear in another inner list.
// Here the category name and the item name are unique enough to be keys.
function MenuList() {
  return (
    <div className="grid">
      {menu.map((section) => (
        <div key={section.category}>
          <strong>{section.category}</strong>
          <ul>
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default MenuList;
