import { api } from "@/utils/api";
import type { OrderCreateRequestProps, OrderListRequestProps, OrderListResponseProps, OrderViewResponseProps } from "./types";

export const getOrders = async (props: OrderListRequestProps): Promise<OrderListResponseProps> => {
    const response = await api.GET('/orders', {
        params: {
            page: props?.page || 1,
            per_page: props?.perPage || 10,
            ...(props?.customerName && { customer_name: props.customerName }),
        }
    });

    // @ts-ignore
    const ordersData = response?.data || [];

    const mappedData = ordersData.map((order: any) => ({
        id: order.id,
        customerName: order.customer_name,
        status: order.status,
        total: order.total,
        created_at: order.created_at,
        updated_at: order.updated_at,
    }));

    return {
        // @ts-ignore
        data: mappedData,
        // @ts-ignore
        total: response?.total || 0,
        // @ts-ignore
        page: response?.current_page || 1,
        // @ts-ignore
        perPage: response?.per_page || 10,
        // @ts-ignore
        lastPage: response?.last_page || 1,
    }
}

export const createOrder = async (props: OrderCreateRequestProps) => {
    const body = {
        customer_name: props.customerName,
        order_date: props.orderDate,
        items: props.items.map(item => ({
            product_id: item.productId,
            quantity: item.quantity,
        })),
    };

    return await api.POST('/orders', {
        body,
    });
}

export const getOrder = async (id: string): Promise<OrderViewResponseProps> => {
    const response = await api.GET<OrderViewResponseProps>(`/orders/${id}`);
    return response;
}
