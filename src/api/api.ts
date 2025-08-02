import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export const getProductsAndCategories = () => {
  return useQuery({
    queryKey: ["product", "category"],
    queryFn: async () => {
      const [product, category] = await Promise.all([
        supabase.from("product").select("*"),
        supabase.from("category").select("*"),
      ]);

      if (product.error || category.error) {
        console.error(
          "Error fetching products or categories:",
          product.error || category.error
        );
        throw new Error("An error occurred while fetching data");
      }

      return { products: product.data, categories: category.data };
    },
  });
};
