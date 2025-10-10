import type { PaginationRequestProps, QueryCommonProps } from "@/types/commons.type";


export type ProductsListProps = {
    
    params: PaginationRequestProps &{
        name?: string;
    }
}

export type ProductListRequestProps = QueryCommonProps & ProductsListProps['params']