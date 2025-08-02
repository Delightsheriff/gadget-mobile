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

export const getProduct = (slug: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
        throw new Error("An error occurred while fetching the product");
      }

      return data;
    },
  });
};

export const getCategoryAndProducts = (categorySlug: string) => {
  return useQuery({
    queryKey: ["categoryAndProducts", categorySlug],
    queryFn: async () => {
      const { data: category, error: categoryError } = await supabase
        .from("category")
        .select("*")
        .eq("slug", categorySlug)
        .single();

      if (categoryError || !category) {
        console.error("Error fetching category:", categoryError);
        throw new Error("An error occurred while fetching the category");
      }

      const { data: products, error: productsError } = await supabase
        .from("product")
        .select("*")
        .eq("category", category.id);

      if (productsError) {
        console.error("Error fetching products:", productsError);
        throw new Error("An error occurred while fetching the products");
      }

      return { category, products };
    },
  });
};
