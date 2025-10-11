'use client'

import { useMutation, useQuery } from "@tanstack/react-query";
import type { ProductCreateRequestProps, ProductListRequestProps } from "./types";
import { createProductAction, getProductsActions } from "./actions";

export const useProductsQuery = (props: ProductListRequestProps) =>
  useQuery({
    queryKey: ['products', props],
    enabled: props?.enabled,
    queryFn: () => getProductsActions(props),
  retry: false,
  staleTime: 0,
  refetchOnWindowFocus: false,

  });

export const useCreateProductMutation = () =>
    useMutation({
        mutationFn: (props: ProductCreateRequestProps) => createProductAction(props),
    });