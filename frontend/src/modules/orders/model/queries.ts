'use client'

import { useQuery } from "@tanstack/react-query";
import type { OrderListRequestProps } from "./types";
import { getOrdersAction } from "./actions";

export const useOrdersQuery = (props: OrderListRequestProps) =>
  useQuery({
    queryKey: ['orders', props],
    enabled: props?.enabled,
    queryFn: () => getOrdersAction(props),
    retry: false,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
