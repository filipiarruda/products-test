import { Page } from "@/components/Page";
import type { ProductsListProps } from "../model/types";
import Header from "./sections/list/Header";
import Table from "./sections/list/Table";
import { ButtonLink } from "@/components/ButtonLink";
import { PlusIcon } from "lucide-react";

const ProductsList = async({params}:ProductsListProps) => (
    <Page title="Produtos" render={<ButtonLink href="/products/new" title="Cadastrar Produto" icon={PlusIcon} />}>
        <Header params={params} />
        <Table params={params} />
    </Page>
)

export default ProductsList;