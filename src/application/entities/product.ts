import { Replace } from '@/utils/replace';

export interface ProductProps {
  id?: number;
  name: string;
  description: string;
  price: number;
  discount?: number;
  imageURL: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Product {
  private props: ProductProps;

  constructor(props: Replace<ProductProps, { createdAt?: Date }>) {
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
  }

  public get id(): number {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get description(): string {
    return this.props.description;
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

  public get imageURL(): string {
    return this.props.imageURL;
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }
}
