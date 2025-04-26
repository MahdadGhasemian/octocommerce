import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Payment } from './payment.entity';
import { User } from './user.entity';
import { Delivery } from './delivery.entity';
import { AbstractEntity } from '../../../common/src/database/abstract.entity';
import { OrderStatus } from '../../../common/src/enum/enums';

export interface AddressData {
  title?: string;
  phone?: string;
  mobile_phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  national_code?: string;
  economic_code?: string;
  latitude?: number;
  longitude?: number;
}

@Entity()
export class Order extends AbstractEntity<Order> {
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  order_status: OrderStatus;

  @Column('numeric', { unique: true, nullable: true })
  order_invoice_number: number;

  @Column('numeric', { nullable: true })
  order_bank_identifier_code: number;

  @Column('numeric', { precision: 15, scale: 0, default: 0 })
  subtotal: number;

  @Column('numeric', { precision: 15, scale: 0, default: 0 })
  packaging_cost: number;

  @Column('numeric', { precision: 15, scale: 0, default: 0 })
  delivery_cost: number;

  @Column('numeric', { precision: 5, scale: 2, default: 0 })
  discount_percentage: number;

  @Column('numeric', { precision: 15, scale: 0, default: 0 })
  discount_amount: number;

  @Column('numeric', { default: 0 })
  tax_on_profit_percentage_default: number;

  @Column('numeric', { default: 0 })
  tax_rate_percentage: number;

  @Column('numeric', { precision: 15, scale: 0, default: 0 })
  tax_amount: number;

  @Column('numeric', { precision: 15, scale: 0, default: 0 })
  round_amount: number;

  @Column('numeric', { precision: 15, scale: 0, default: 0 })
  total: number;

  @Column({ nullable: true })
  note: string;

  @Column({ default: false })
  is_paid: boolean;

  @Column({ nullable: true })
  rejected_note: string;

  @Column({ nullable: true })
  share_code: string;

  @Column({ nullable: true })
  pdf_file_name: string;

  @Column({ nullable: true })
  pdf_file_url: string;

  @Column({ type: 'timestamptz', nullable: true })
  delivery_date: Date;

  @Column({ type: 'timestamptz', nullable: true })
  due_date: Date;

  @Column()
  @Index()
  user_id: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  order_items: OrderItem[];

  @Column({ type: 'jsonb', nullable: true })
  delivery_address: AddressData;

  @Column({ type: 'jsonb', nullable: true })
  billing_address: AddressData;

  @Column({ default: false })
  is_confirmed_rejected_by_system: boolean;

  @Column({ nullable: true })
  @Index()
  confirmed_rejected_by_user_id: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'confirmed_rejected_by_user_id' })
  confirmed_rejected_by: User;

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];

  @Column({ nullable: true })
  @Index()
  delivery_id: number;

  @OneToOne(() => Delivery, (delivery) => delivery.order, { cascade: true })
  @JoinColumn({ name: 'delivery_id' })
  delivery: Delivery;
}
