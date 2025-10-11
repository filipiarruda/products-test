import { api } from "@/utils/api";
import type { OrderListRequestProps, OrderListResponseProps } from "./types";

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
