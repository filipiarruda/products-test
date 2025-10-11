import type { PaginationRequestProps, PaginationResposeProps, QueryCommonProps } from "@/types/commons.type";


export type ProductsListProps = {
    
    params: PaginationRequestProps &{
        name?: string;
    }
}

export type ProductListRequestProps = QueryCommonProps & ProductsListProps['params']

export type ProductDataProps = {
    id: number;
    name: string;
    price: number;
    category: string;
    created_at: string;
    updated_at: string;
}

export type ProductListResponseProps = PaginationResposeProps<ProductDataProps>

export type ProductCreateRequestProps = {
    name: string;
    price: number;
    category: string;
}