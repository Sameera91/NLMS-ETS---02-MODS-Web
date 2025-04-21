export interface Mod {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  downloadCount: number;
  rating: number;
  categories: string[];
  isFeatured?: boolean;
}