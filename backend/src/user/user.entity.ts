import { PromocodeEntity } from '../promocode/promocode.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import type { Relation } from 'typeorm';
import { UserEntityInterface } from './types/UserEntity.interface';
import { SessionEntityInterface } from './types/SessionEntity.interface';
import { AuthRequestEntityInterface } from './types/AuthRequestEntity.interface';
import { OrderEntity } from '../order/order.entity';
import { UserRole } from '../../../shared/types/User/userRole';

@Entity('users')
export class UserEntity implements UserEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  telegramId: number;

  @Column({ nullable: true })
  is_bot: boolean;

  @Column({ nullable: true })
  first_name?: string;

  @Column({ nullable: true })
  last_name?: string;

  @Column({ nullable: true })
  username?: string;

  @Column({ nullable: true })
  language_code?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.user,
  })
  role: UserRole;

  @Column({ default: false })
  banned: boolean;

  @Column({ nullable: true })
  phone: string;

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions!: Relation<SessionEntity>[];

  @OneToMany(() => PromocodeEntity, (promocode) => promocode.owner, {
    eager: true,
  })
  promocodes: Relation<PromocodeEntity>[];

  @OneToOne(() => PromocodeEntity, { nullable: true, eager: true })
  @JoinColumn()
  ref_promocode: Relation<PromocodeEntity>;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: Relation<OrderEntity>[];

  @OneToMany(() => OrderEntity, (order) => order.createdBy)
  createdOrders: Relation<OrderEntity>[];
}

@Entity('sessions')
export class SessionEntity implements SessionEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  sessionToken!: string;

  @Column()
  expires!: string;

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  user!: Relation<UserEntity>;

  @Column()
  authRequestId: string;
}

@Entity('authRequests')
export class AuthRequestEntity implements AuthRequestEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  expires!: string;

  @Column({ nullable: true })
  ref_promocode!: string;
}
