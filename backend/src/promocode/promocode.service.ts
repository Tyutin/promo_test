import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PromocodeEntity } from './promocode.entity';
import { Repository } from 'typeorm';
import { CreatePromocodeDto } from './dto/createPromocode.dto';
import { UserEntity } from 'src/user/user.entity';
import { PromocodeResponseInterface } from './types/promocodeResponse.interface';

@Injectable()
export class PromocodeService {
  constructor(
    @InjectRepository(PromocodeEntity)
    private readonly promocodeRepository: Repository<PromocodeEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getPromocodeByCode(code: string): Promise<PromocodeEntity | null> {
    return await this.promocodeRepository.findOneBy({ code });
  }

  async createPromocode(
    createPromocodeDto: CreatePromocodeDto,
    user: UserEntity,
  ): Promise<PromocodeEntity> {
    const promocode: PromocodeEntity = Object.assign(
      {},
      new PromocodeEntity(),
      createPromocodeDto,
    );
    promocode.owner = user;
    return await this.promocodeRepository.save(promocode);
  }
  async setRefPromoToUser(
    user: UserEntity,
    promocode: PromocodeEntity,
  ): Promise<UserEntity> {
    if (
      user.promocodes.length &&
      user.promocodes.some((el) => el.id === promocode.id)
    ) {
      throw new UnprocessableEntityException(
        'Нельзя назначить реферальный промокод пользователю который его создал',
      );
    }
    user.ref_promocode = promocode;
    return await this.userRepository.save(user);
  }

  buildPromocodeResponse(
    promocode: PromocodeEntity,
  ): PromocodeResponseInterface {
    return {
      promocode,
    };
  }
}
