import { serverApi } from "@/services/serverApi";
import type { ProductData } from "../types";

export const getProductData = async (id: string) => {
  return serverApi<{ data: ProductData }>(`web_product/${id}`);
};
