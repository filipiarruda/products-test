
'use client'

import { useProductsQuery } from "@/modules/products/model/queries";

import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/pagination";



import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { toCurrency } from "@/utils/toCurrency";
import type { ProductsListProps } from "@/modules/products/model/types";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";


const TableList = ({ params }: ProductsListProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const perPage = params?.perPage ||10;

    const page = params?.page || 1;

    const setPage = useCallback((newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(newPage));
        router.push(`${pathname}?${params.toString()}`);
    }, [router, pathname, searchParams]);

    const { data, isLoading, isError } = useProductsQuery({ ...params, page, perPage });
    const total = data?.total ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / perPage));

    if (isLoading) {
        return (
            <div className="p-6">
                <Skeleton className="h-10 w-full mb-2" />
                <Skeleton className="h-10 w-full mb-2" />
                <Skeleton className="h-10 w-full mb-2" />
            </div>
        );
    }

    if (isError) {
        return <div className="text-red-500 p-6">Erro ao carregar produtos.</div>;
    }

    return (
        <div className="p-6">
            <Table className="w-full border rounded-xl shadow-lg bg-white dark:bg-zinc-900">
                <TableHeader>
                    <TableRow className="bg-zinc-100 dark:bg-zinc-800">
                        <TableHead className="px-4 py-2">ID</TableHead>
                        <TableHead className="px-4 py-2">Nome</TableHead>
                        <TableHead className="px-4 py-2">Preço</TableHead>
                        <TableHead className="px-4 py-2">Categoria</TableHead>
                        <TableHead className="px-4 py-2"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data?.map((product: any) => (
                        <TableRow key={product.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                            <TableCell className="px-4 py-2 font-mono text-xs">{product.id}</TableCell>
                            <TableCell className="px-4 py-2 font-semibold">{product.name}</TableCell>
                            <TableCell className="px-4 py-2">{toCurrency(product.price)}</TableCell>
                            <TableCell className="px-4 py-2">{product.category}</TableCell>
                            <TableCell className="px-4 py-2">
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link href={`/products/${product.id}`} ><EyeIcon size={20} /></Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Visualizar produto</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-end mt-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={e => { e.preventDefault(); setPage(Math.max(1, page - 1)); }}
                                disabled={page === 1}
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }).map((_, idx) => (
                            <PaginationItem key={idx}>
                                <PaginationLink
                                    href="#"
                                    isActive={page === idx + 1}
                                    onClick={e => { e.preventDefault(); setPage(idx + 1); }}
                                >
                                    {idx + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        {totalPages > 5 && page < totalPages - 2 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={e => { e.preventDefault(); setPage(Math.min(totalPages, page + 1)); }}
                                disabled={page === totalPages}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default TableList;