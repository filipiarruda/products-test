import ViewPage from "@/modules/orders/view/ViewPage";

type Props = {
    params: {
        id: string;
    }
}

const Page = ({ params }: Props) => {
    return <ViewPage id={params.id} />
}

export default Page;