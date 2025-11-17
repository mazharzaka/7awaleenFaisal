import { Document, Types } from "mongoose";

// واجهة المنتج الأساسية
export interface IProduct {
  storeId?: Types.ObjectId | null;
  name: string;
  desc: string;
  price: number;
  imageURL?: string;
  category: string;
  sale?: number;
  Isadvertising?: boolean;
  stock?: number;
  Isdeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProductDocument extends IProduct, Document {
  finalPrice: number;
}
