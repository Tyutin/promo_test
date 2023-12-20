import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity, SessionEntity, UserEntity } from './nextAuth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NextAuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
  ) {}

  async getUserBySessionToken(token: string): Promise<UserEntity | null> {
    const session = await this.sessionRepository.findOne({
      where: {
        sessionToken: token,
      },
      relations: {
        user: true,
      },
    });
    if (!session || !session.user) {
      return null;
    }
    return session.user;
  }

  async getUserByVkId(vkId: string): Promise<UserEntity> {
    const account = await this.accountRepository.findOne({
      where: {
        provider: 'vk',
        providerAccountId: vkId,
      },
      relations: {
        user: true,
      },
    });

    if (!account || !account.user) {
      throw new UnprocessableEntityException();
    }
    return account.user;
  }
}
