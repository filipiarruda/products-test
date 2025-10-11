import OrdersList from "@/modules/orders/view/ListPage";
import type { OrdersListProps } from "@/modules/orders/model/types";

const OrdersPage = ({ searchParams }: { searchParams: OrdersListProps['params'] }) => {
    const params = {
        page: searchParams?.page ? Number(searchParams.page) : 1,
        perPage: searchParams?.perPage ? Number(searchParams.perPage) : 10,
        customerName: searchParams?.customerName,
    };

    return <OrdersList params={params} />;
}

export default OrdersPage;