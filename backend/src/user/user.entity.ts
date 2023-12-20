import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  ValueTransformer,
} from 'typeorm';

const transformer: Record<'date' | 'bigint', ValueTransformer> = {
  date: {
    from: (date: string | null) => date && new Date(parseInt(date, 10)),
    to: (date?: Date) => date?.valueOf().toString(),
  },
  bigint: {
    from: (bigInt: string | null) => bigInt && parseInt(bigInt, 10),
    to: (bigInt?: number) => bigInt?.toString(),
  },
};

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

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions!: Relation<SessionEntity>[];
}

@Entity('sessions')
export class SessionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  sessionToken!: string;

  @Column({ transformer: transformer.date })
  expires!: string;

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  user!: Relation<UserEntity>;
}

@Entity('authRequests')
export class AuthRequestEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  expires!: string;

  @Column({ nullable: true })
  promocode!: string;
}
