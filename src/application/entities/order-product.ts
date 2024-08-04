import { Replace } from '@/utils/replace';

export interface OrderProductProps {
  id?: number;
  orderId: number;
  productId: number;
  quantity: number;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class OrderProduct {
  private props: OrderProductProps;

  constructor(props: Replace<OrderProductProps, { createdAt?: Date }>) {
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
  }

  public get id(): number {
    return this.props.id;
  }

  public get orderId(): number {
    return this.props.orderId;
  }

  public get productId(): number {
    return this.props.productId;
  }

  public set quantity(quantity: number) {
    this.props.quantity = quantity;
  }

  public get quantity(): number {
    return this.props.quantity;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }
}
