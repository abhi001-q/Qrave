import React, { useState, useEffect } from "react";
import DishCard from "../../components/DishCard";
import CategoryFilter from "../../components/CategoryFilter";
import { menuService } from "../../services/menuService";

export default function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  // Fallback data if API is down
  const defaultDishes = [
    {
      id: 1,
      title: "Truffle Ribeye Steak",
      price: "$49.00",
      image:
        "https://images.unsplash.com/photo-1546241072-48010adcb585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Main Course",
      description: "Prime cut ribeye infused with black truffle butter.",
    },
    {
      id: 2,
      title: "Lobster Ravioli",
      price: "$32.50",
      image:
        "https://images.unsplash.com/photo-1621510456681-2330135e5871?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Main Course",
      description: "Handmade ravioli stuffed with fresh Maine lobster.",
    },
    {
      id: 3,
      title: "Aged Wagyu Burger",
      price: "$28.00",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Main Course",
      description: "Dry-aged wagyu beef, caramelized onions, gruyere.",
    },
    {
      id: 4,
      title: "Smoked Old Fashioned",
      price: "$18.00",
      image:
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Drinks",
      description: "Kentucky bourbon, hickory smoke, orange peel.",
    },
    {
      id: 5,
      title: "Burrata & Heirloom Salad",
      price: "$16.00",
      image:
        "https://images.unsplash.com/photo-1608897013039-887f21d8c804?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Salad",
      description: "Fresh burrata, organic tomatoes, basil oil crust.",
    },
    {
      id: 6,
      title: "Matcha Lava Cake",
      price: "$14.50",
      image:
        "https://images.unsplash.com/photo-1515037893149-de7f840978e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Dessert",
      description: "Warm matcha infused core with toasted sesame ice cream.",
    },
  ];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await menuService.getAll();
        setDishes(response.data?.length ? response.data : defaultDishes);
      } catch (error) {
        console.error("Failed to fetch menu", error);
        setDishes(defaultDishes);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredDishes =
    activeCategory === "All"
      ? dishes
      : dishes.filter((d) => d.category === activeCategory);

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white pt-10 pb-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
            Curated{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Selections
            </span>
          </h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto font-light">
            Each dish is crafted with precision, using the finest ingredients
            for an unforgettable experience.
          </p>
        </div>

        <div className="mb-12 flex justify-center">
          <CategoryFilter
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredDishes.map((dish) => (
              <DishCard key={dish.id} {...dish} price={dish.price} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
