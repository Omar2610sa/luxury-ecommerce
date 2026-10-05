import { serverApi } from "@/services/serverApi";
import { Favorite } from "@/interfaces/interfaces";

export const getFavoriteData = async () => {
    return serverApi<{ data: Favorite[] }>("get_fave_products");
};
