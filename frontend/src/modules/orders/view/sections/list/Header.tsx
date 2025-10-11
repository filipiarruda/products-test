import type { OrdersListProps } from "@/modules/orders/model/types"

const Header = ({ params }:OrdersListProps ) => (
    <div className="inline-flex gap-4 justify-between w-full items-center">
        Lista de Pedidos
    </div>
)

export default Header;
