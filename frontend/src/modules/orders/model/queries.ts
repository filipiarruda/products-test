'use client'

import { useMutation, useQuery } from "@tanstack/react-query";
import type { OrderCreateRequestProps, OrderListRequestProps } from "./types";
import { createOrderAction, getOrdersAction } from "./actions";

export const useOrdersQuery = (props: OrderListRequestProps) =>
  useQuery({
    queryKey: ['orders', props],
    enabled: props?.enabled,
    queryFn: () => getOrdersAction(props),
    retry: false,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

export const useCreateOrderMutation = () =>
    useMutation({
        mutationFn: (props: OrderCreateRequestProps) => createOrderAction(props),
    });
