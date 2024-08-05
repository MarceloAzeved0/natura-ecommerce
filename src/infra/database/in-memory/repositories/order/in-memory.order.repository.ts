import { Order } from '@/application/entities/order';
import { OrderRepository } from '@/application/repositories/order.repository';

export class InMemoryOrderRepository implements OrderRepository {
  private ordersMemory: Order[] = [];
  async create(order: Order): Promise<Order> {
    const response = new Order({
      userId: order.userId,
      price: order.price,
      discount: order.discount,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.ordersMemory.push(order);

    return response;
  }

  async getById(id: number): Promise<Order | undefined> {
    return this.ordersMemory.find((order) => order.id === id);
  }
}
