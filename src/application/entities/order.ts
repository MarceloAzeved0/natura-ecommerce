import { Replace } from '@/utils/replace';

export interface OrderProps {
  id?: number;
  userId: number;
  price: number;
  discount?: number;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Order {
  private props: OrderProps;

  constructor(
    props: Replace<
      OrderProps,
      { price?: number; discount?: number; createdAt?: Date }
    >,
  ) {
    this.props = {
      ...props,
      price: props.price || 0,
      createdAt: props.createdAt || new Date(),
    };
  }

  public get id(): number {
    return this.props.id;
  }

  public get userId(): number {
    return this.props.userId;
  }

  public set price(price: number) {
    this.props.price = price;
  }

  public get price(): number {
    return this.props.price;
  }

  public set discount(discount: number) {
    this.props.discount = discount;
  }

  public get discount(): number {
    return this.props.discount;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }
}
