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

@Entity('users')
export class UserEntity {
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

  @Column({ default: 'user' })
  role: 'user' | 'admin' | 'affiliate';

  @Column({ default: false })
  banned: boolean;

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions!: Relation<SessionEntity>[];

  @OneToMany(() => PromocodeEntity, (promocode) => promocode.owner, {
    eager: true,
  })
  promocodes: Relation<SessionEntity>[];

  @OneToOne(() => PromocodeEntity, { nullable: true, eager: true })
  @JoinColumn()
  ref_promocode: Relation<PromocodeEntity>;
}

@Entity('sessions')
export class SessionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  sessionToken!: string;

  @Column()
  expires!: string;

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  user!: Relation<UserEntity>;

  @OneToOne(() => AuthRequestEntity)
  @JoinColumn()
  authRequest!: Relation<AuthRequestEntity>;
}

@Entity('authRequests')
export class AuthRequestEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  expires!: string;

  @Column({ nullable: true })
  ref_promocode!: string;
}
