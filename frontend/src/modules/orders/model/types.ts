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

export type OrderCreateRequestProps = {
    customerName: string;
    orderDate: string;
    items: {
        productId: number;
        quantity: number;
    }[];
}

export type OrderViewResponseProps = {
    order_id: number;
    customer_name: string;
    order_date: string;
    status: string;
    items: {
        product_name: string;
        product_price: number;
        quantity: number;
        total: number;
    }[];
    total: number;
}

