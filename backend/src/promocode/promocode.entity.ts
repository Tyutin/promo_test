import { UserEntity } from '../user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { PromocodeEntityInterface } from './types/PromocodeEntity.interface';

@Entity('promocodes')
export class PromocodeEntity implements PromocodeEntityInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column({ default: 15 })
  commission: number;

  @ManyToOne(() => UserEntity, (user) => user.promocodes)
  owner: Relation<UserEntity>;
}
