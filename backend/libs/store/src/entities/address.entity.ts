import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/src/database/abstract.entity';
import { User } from './user.entity';

@Entity()
export class Address extends AbstractEntity<Address> {
  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  mobile_phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  postal_code: string;

  @Column({ nullable: true })
  national_code: string;

  @Column({ nullable: true })
  economic_code: string;

  @Column({ type: 'double precision', nullable: true })
  latitude: number;

  @Column({ type: 'double precision', nullable: true })
  longitude: number;

  @Column()
  @Index()
  user_id: number;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
