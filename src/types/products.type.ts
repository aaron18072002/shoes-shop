export interface ProductType {
    id: string;
    color: string;
    description: string;
    gender_type: string;
    images: string[];
    name: string;
    price: number;
    quantity: number;
    status: string;
    brand: Brand;
    category?: Category;
    is_discount?: boolean;
    promotionId?: number | null;
    promotion?: Promotion;
    created_at: Date;
    updated_at: Date;
}

interface Promotion {
    id: number;
    percent: string;
    name: string;
}

interface Brand {
    id: number;
    description: string;
    name: string;
}

interface Category {
    id: number;
    description: string;
    name: string;
}

export type Product = Pick<
    ProductType,
    | 'id'
    | 'color'
    | 'description'
    | 'gender_type'
    | 'images'
    | 'name'
    | 'price'
    | 'status'
    | 'quantity'
>[];
