import { ProductsList } from "@/modules/products";
import type { ProductsListProps } from "@/modules/products/model/types";
import type { PageProps } from "@/types/commons.type";

const ProductsListPage = async({searchParams}:PageProps<unknown,ProductsListProps['params']>) => <ProductsList params={await searchParams} />

export default ProductsListPage;