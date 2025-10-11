import type { PageCommonProps } from "@/types/commons.type";

type Props = PageCommonProps & { 
    title?: string;
    render?: React.ReactNode;
}

export const Page = ({ children, title, render }:Props) => (
    <div className="w-full h-full flex flex-col gap-6 p-6">
        <div className="inline-flex gap-2 items-center justify-between w-full">
            <span className="text-2xl font-bold">{title}</span>
            <div className="inline-flex gap-4 items-center justify-end">
                {render}
            </div>
        </div>

        <div className="w-full h-full flex flex-col gap-6">
            {children}
        </div>
    </div>
)