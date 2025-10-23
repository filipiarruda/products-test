import { Page } from "@/components/Page";
import { getOrder } from "../model/services";
import { toCurrency } from "@/utils/toCurrency";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Props = {
    id: string;
}

const ViewPage = async ({ id }: Props) => {
    const order = await getOrder(id);

    return (
        <Page title={`Pedido ${order.order_id}`} backHref="/orders">
            <div className="flex items-center justify-between">
                <div>
                    <p><strong>Cliente:</strong> {order.customer_name}</p>
                    <p><strong>Data do Pedido:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
                </div>
                <div>
                    <Badge>{order.status}</Badge>
                </div>
            </div>

            <Table className="mt-4">
                <TableHeader>
                    <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead className="text-right">Qtd.</TableHead>
                        <TableHead className="text-right">Valor Unit.</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {order.items.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.product_name}</TableCell>
                            <TableCell className="text-right">{item.quantity}</TableCell>
                            <TableCell className="text-right">{toCurrency(item.product_price)}</TableCell>
                            <TableCell className="text-right">{toCurrency(item.total)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-end mt-4">
                <div className="w-full max-w-xs">
                    <div className="flex justify-between">
                        <p>Subtotal</p>
                        <p>{toCurrency(order.total)}</p>
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default ViewPage;