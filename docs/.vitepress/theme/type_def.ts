export interface Post {
  title: string;
  url: string;
  date: {
    time: number;
    string: string;
    formatShowDate: string;
  };
  cover: string;
  categories: string[];
  excerpt: string | undefined;
  hit: number;
}

export interface CategoryInfo {
  text: string;
  name: string;
  count?: number;
  isHome: boolean;
}
