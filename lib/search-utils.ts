import { SERVICES_DATA } from "@/app/data/services";
import { PRODUCTS } from "@/app/data/products";
import { STYLISTS } from "@/app/data/stylists";

export const getUnifiedSearch = (query: string) => {
  const lowQuery = query.toLowerCase().trim();
  
  // If query is empty, return empty results
  if (!lowQuery) return { services: [], products: [], stylists: [] };

  return {
    // 1. Search Services (Sub-services)
    services: SERVICES_DATA.flatMap(category => 
      category.subServices
        .filter(sub => 
          sub.name.toLowerCase().includes(lowQuery) || 
          sub.description.toLowerCase().includes(lowQuery)
        )
        .map(sub => ({
          ...sub,
          categorySlug: category.slug, // Crucial for correct URL building
          categoryTitle: category.title
        }))
    ),

    // 2. Search Boutique Products
    products: PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(lowQuery) || 
      p.category.toLowerCase().includes(lowQuery) ||
      p.description.toLowerCase().includes(lowQuery)
    ),

    // 3. Search Stylists
    stylists: STYLISTS.filter(s => 
      s.name.toLowerCase().includes(lowQuery) || 
      s.specialty.toLowerCase().includes(lowQuery) ||
      s.role.toLowerCase().includes(lowQuery)
    )
  };
};