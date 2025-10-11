import type { PaginationRequestProps, PaginationResposeProps, QueryCommonProps } from "@/types/commons.type";

export type OrdersListProps = {
    params: PaginationRequestProps & {
        customerName?: string;
    }
}

export type OrderListRequestProps = QueryCommonProps & OrdersListProps['params']

export type OrderDataProps = {
    id: number;
    customerName: string;
    status: string;
    total: number;
    created_at: string;
    updated_at: string;
}

export type OrderListResponseProps = PaginationResposeProps<OrderDataProps>
