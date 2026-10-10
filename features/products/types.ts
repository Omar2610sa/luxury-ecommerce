import type { Product } from "@/interfaces/interfaces";

export interface ProductPageProps {
  params: Promise<{
    lang: string;
    id: string;
  }>;
}

export interface ProductData {
  title: string;
  product: Product[];
  recommended: [];
  also_may_like: [];
}
