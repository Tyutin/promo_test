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

  @Column({ nullable: true })
  ref_promocode!: string;

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions!: Relation<SessionEntity>[];
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
