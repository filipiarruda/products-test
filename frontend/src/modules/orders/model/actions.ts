'use server'

import { getOrders } from "./services"
import type { OrderListRequestProps } from "./types"

export const getOrdersAction = async (props: OrderListRequestProps) => await getOrders(props)
