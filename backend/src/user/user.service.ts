import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { User } from 'telegraf/types';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUserFromBot(userFromTelegram: User): Promise<UserEntity> {
    const alreadyExistingUser = await this.userRepository.findOne({
      where: {
        telegramId: userFromTelegram.id,
      },
    });

    if (alreadyExistingUser) {
      return alreadyExistingUser;
    }
    const userToSave = Object.assign({}, new UserEntity(), userFromTelegram);
    userToSave.telegramId = userFromTelegram.id;
    delete userToSave.id;

    return await this.userRepository.save(userToSave);
  }
}
