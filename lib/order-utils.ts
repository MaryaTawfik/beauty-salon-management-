export type OrderStatus = 'Pending Payment' | 'Verifying' | 'Processing' | 'Shipped' | 'Delivered' | 'Rejected';

export const updateOrderStatus = (orderId: string, status: OrderStatus, rejectionReason?: string) => {
  const orders = JSON.parse(localStorage.getItem('salon_orders') || '[]');
  const updated = orders.map((o: any) => 
    o.id === orderId ? { ...o, status, rejectionReason: rejectionReason || o.rejectionReason } : o
  );
  localStorage.setItem('salon_orders', JSON.stringify(updated));
  // Broadcast update
  window.dispatchEvent(new Event('order-updated'));
};