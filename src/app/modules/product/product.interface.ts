import { Types } from 'mongoose';

export type IProductImage = {
  url: string;
  imagePublicId?: string;
};

export type IProduct = {
  name: string;
  description?: string;
  price: number;
  category: Types.ObjectId;
  stock?: number;
  image?: string;
  imagePublicId?: string;
  images?: IProductImage[];
  status?: 'active' | 'inactive';
  createdBy?: Types.ObjectId;
};

export type IProductFilters = {
  searchTerm?: string;
  category?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
};
