import {
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { OrderEntityInterface } from './types/OrderEntity.interface';
import { OrderStatus } from '../../../shared/types/Order/orderStatus';

@Entity('orders')
export class OrderEntity implements OrderEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.processing,
  })
  status: OrderStatus;

  @Column()
  deliveryAddress: string;

  @Column()
  productPrice: number;

  @Column()
  shippingPrice: number;

  @Column()
  serviceCommission: number;

  @Column({ nullable: true })
  clientNotes?: string;

  @Column({ nullable: true })
  serviceNotes?: string;

  @Column({ default: false })
  isPaidByClient: boolean;

  @Column({ nullable: true })
  estimatedDeliveryTime: Date;

  @Column({ nullable: true })
  cancelReason?: string;

  @Column({ nullable: true })
  currentLocation?: string;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: Relation<UserEntity>;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  createdBy: Relation<UserEntity>;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
