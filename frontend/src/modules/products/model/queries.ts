import { useQuery } from "@tanstack/react-query";
import type { ProductListRequestProps } from "./types";

export const useProductsQuery = (props: ProductListRequestProps) =>
  useQuery({
    queryKey: ['products', props],
    enabled: props?.enabled,
    queryFn: () => getProductsActions(props),
  retry: false,
  staleTime: 0,
  refetchOnWindowFocus: false,

  });