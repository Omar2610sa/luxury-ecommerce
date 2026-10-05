import { serverApi } from "@/services/serverApi";
import { Category } from "../types";

export const getCategoriesData = async () => {
    return serverApi<{ data: Category[]  }>("get_categories");
};
