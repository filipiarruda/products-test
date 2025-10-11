export type PageProps<
  ParamsProps = Record<string, string>,
  SearchProps = Record<string, string | string[] | undefined>,
> = {
  params: Promise<ParamsProps>;
  searchParams: Promise<SearchProps>;
};

export type PaginationRequestProps = {
    page?: number;
    perPage?: number;
}

export type PaginationResposeProps<T> = {
    data: T[];
    total: number;
    page: number;
    perPage: number;
    lastPage: number;
}

export type QueryCommonProps = {
    enabled?: boolean;
}

export type PageCommonProps = {
    children: React.ReactNode; 
}