import { cartData } from '@/lib/api/cartData';
import CartOrdersPage, { type CartItem } from './CartOrdersPage';
import { getSession } from '@/lib/core/session';
import type { User } from '@/types/user';

const OrdersPage = async () => {
  const user = (await getSession()) as User | undefined;
  const cartP = user?.id ? ((await cartData(user.id)) as CartItem[]) : [];

  return <CartOrdersPage user={user} cartP={cartP} />;
};

export default OrdersPage;