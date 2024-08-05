import { OrderProduct } from '@/application/entities/order-product';
import { OrderProductRepository } from '@/application/repositories/order-product.repository';

export class InMemoryOrderProductRepository implements OrderProductRepository {
  private orderProductsMemory: OrderProduct[] = [];
  async create(orderProduct: OrderProduct): Promise<OrderProduct> {
    const response = new OrderProduct({
      id: this.orderProductsMemory.length + 1,
      orderId: orderProduct.orderId,
      productId: orderProduct.productId,
      quantity: orderProduct.quantity,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.orderProductsMemory.push(response);

    return response;
  }

  async getById(id: number): Promise<OrderProduct | undefined> {
    return this.orderProductsMemory.find((user) => user.id === id);
  }

  async update(
    id: number,
    orderProduct: OrderProduct,
  ): Promise<OrderProduct | undefined> {
    const index = this.orderProductsMemory.findIndex(
      (orderP) => orderP.id === orderProduct.id,
    );

    if (index === -1) {
      return;
    }

    this.orderProductsMemory[index] = orderProduct;

    return orderProduct;
  }
}
