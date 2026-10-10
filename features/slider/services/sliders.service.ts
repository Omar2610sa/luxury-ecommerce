import { serverApi } from "@/services/serverApi";
import { Slider } from "@/features/home/types";

export const getSliderData = async (id: string) => {
  return  serverApi<{ data: Slider }>(`slider/${id}`);
};
