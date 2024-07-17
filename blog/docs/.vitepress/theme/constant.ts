import cn_lan from "../../lan.json";
import en_lan from "../../en/lan.json";

const landic: Record<string, Record<string, string>> = {
  en: en_lan,
  zh: cn_lan,
};
// 定义一个分类英文名和中文名的映射,text 表示category 的英文名,name 表示category 的中文名,isHome 标示是否是首页显示的分类

if (!String.format) {
  String.format = function (format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != "undefined" ? args[number] : match;
    });
  };
}

export const get_true_lan = (lan: string): string => {
  if (lan == "zh-Hans") lan = "zh";
  return lan;
};

export const get_lang_text = (key: string, lan: string): string => {
  lan = get_true_lan(lan);
  return landic[lan][key];
};

export const get_lang_text_format = (
  key: string,
  lan: string,
  ...args: any[]
): string => {
  lan = get_true_lan(lan);
  return String.format(landic[lan][key], ...args);
};
