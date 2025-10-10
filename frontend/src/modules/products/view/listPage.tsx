import type { ProductsListProps } from "../model/types";

const ProductsList = async({params}:ProductsListProps) => (
    <div>Produtos - Page: {params.page} - Limit: {params.limit} - Name: {params.name}</div>
)

export default ProductsList;