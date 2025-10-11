import { LucideProps } from "lucide-react";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type Props = {
    title: string
    icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    href: string;
}
export const ButtonLink = ({ title, icon: Icon, href}:Props) => (
    <Link href={href} className="px-4 py-2 bg-zinc-700 inline-flex gap-2 justify-center items-center rounded-sm cursor-pointer hover:bg-zinc-500 transition-colors text-zinc-200">
        {title} {Icon && <Icon size={24}/>}
    </Link>
)