import { CategoryInfo } from "./type_def.ts";

import cn_lan from "../../lan.json";
import en_lan from "../../lan.json";

const landic: Record<string, Record<string, string>> = {
  en: en_lan,
  "zh-Hans": cn_lan,
};
// 定义一个分类英文名和中文名的映射,text 表示category 的英文名,name 表示category 的中文名,isHome 标示是否是首页显示的分类
export const categoryMap: CategoryInfo[] = [
  {
    name: "hot",
    isHome: true,
  },
  {
    name: "lifestyle",
    isHome: true,
  },
  {
    name: "work",
    isHome: true,
  },
];

export const get_lang_text = (key: string, lan: string): string => {
  return landic[lan][key];
};
