import { api } from "@/utils/api";
import type { ProductCreateRequestProps, ProductListRequestProps, ProductListResponseProps } from "./types";

export const getProducts = async (props:ProductListRequestProps): Promise<ProductListResponseProps> => {
    const products = await api.GET('/products', {
        params: { 
            page: props?.page || 1,
            per_page: props?.perPage || 10,
            ...(props?.name && { name: props.name }),
         }
    })
    return { 
        // @ts-ignore
        data: products?.data || [],
        // @ts-ignore
        total: products?.total || 0,
        // @ts-ignore
        page: products?.current_page || 1,
        // @ts-ignore
        perPage: products?.per_page || 10,
        // @ts-ignore
        lastPage: products?.last_page || 1,
     }
}

export const createProduct = async (props: ProductCreateRequestProps) => {
    return await api.POST('/products', {
        body: props
    })
}