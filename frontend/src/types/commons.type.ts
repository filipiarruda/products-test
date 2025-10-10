export type PageProps<
  ParamsProps = Record<string, string>,
  SearchProps = Record<string, string | string[] | undefined>,
> = {
  params: Promise<ParamsProps>;
  searchParams: Promise<SearchProps>;
};

export type PaginationRequestProps = {
    page?: number;
    limit?: number;
}

export type QueryCommonProps = {
    enabled?: boolean;
}