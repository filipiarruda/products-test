import { Page } from "@/components/Page";
import type { OrdersListProps } from "../model/types";
import Header from "./sections/list/Header";
import Table from "./sections/list/Table";
import { ButtonLink } from "@/components/ButtonLink";
import { PlusIcon } from "lucide-react";

const OrdersList = async({params}:OrdersListProps) => (
    <Page title="Pedidos" render={<ButtonLink href="/orders/new" title="Cadastrar Pedido" icon={PlusIcon} />}>
        <Header params={params} />
        <Table params={params} />
    </Page>
)

export default OrdersList;
