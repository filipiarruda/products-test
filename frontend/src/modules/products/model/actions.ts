'use server'

import { getProducts, createProduct } from "./services"
import type { ProductListRequestProps, ProductCreateRequestProps } from "./types"

export const getProductsActions = async (props: ProductListRequestProps) => await getProducts(props)

export const createProductAction = async (props: ProductCreateRequestProps) => await createProduct(props)