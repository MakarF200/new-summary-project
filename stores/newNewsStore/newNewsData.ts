import { create } from "zustand";
import { NewsCardItem } from "@/types/apiTypes";
import { createSelectors } from "@/utils/zustand";

interface NewsListData {
  news: NewsCardItem[];
}

export const useNewNewsStore = create<NewNewsStore>((set) => ({
  news: [],
  setNews: (news: NewsCardItem[]) => set({ news }),
}));

export const useNewNewsStoreSelectors = createSelectors(useNewNewsStore);