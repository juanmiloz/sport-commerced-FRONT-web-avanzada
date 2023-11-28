import {BrandInterface} from "../Brand/brand.interface.ts";

export interface ProductInterfaces {
    product_id: number
    name: string,
    subtitle: string,
    description: string,
    price: number,
    calification: number,
    brand_id: number,
    image_url: string,
    brand: BrandInterface
}

export interface ProductState  {
    value:{
        product_id: number
        name: string,
        subtitle: string,
        description: string,
        price: number,
        calification: number,
        brand_id: number,
        image_url: string,
        brand: BrandInterface
    } | null;
}