import { Replace } from '@/utils/replace';

export interface UserProps {
  id?: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class User {
  private props: UserProps;

  constructor(props: Replace<UserProps, { createdAt?: Date }>) {
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
  }

  public get id(): number {
    return this.props.id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }
}
