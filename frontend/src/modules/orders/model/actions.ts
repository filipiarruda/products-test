'use server'

import { createOrder, getOrders } from "./services"
import type { OrderCreateRequestProps, OrderListRequestProps } from "./types"

export const getOrdersAction = async (props: OrderListRequestProps) => await getOrders(props)

export const createOrderAction = async (props: OrderCreateRequestProps) => await createOrder(props)
