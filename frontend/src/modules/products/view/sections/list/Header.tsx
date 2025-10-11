import Filter from "@/components/Filter";
import type { ProductsListProps } from "@/modules/products/model/types"
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const Header = ({ params }:ProductsListProps ) => (
    <div className="inline-flex gap-4 justify-between w-full items-center">
        <Filter />
        
        </div>
)

export default Header;