import { serverApi } from "@/services/serverApi";
import { HomeData } from "../types";

export const getHomeData = async () => {
    return serverApi<{ data: HomeData }>("home_website");
};