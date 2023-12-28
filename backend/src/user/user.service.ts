import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SessionEntity, UserEntity, AuthRequestEntity } from './user.entity';
import { User } from 'telegraf/types';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserResponseInterface } from './types/UserResponse.interface';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
    @InjectRepository(AuthRequestEntity)
    private readonly authRequestRepository: Repository<AuthRequestEntity>,
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

  async getAuthRequestById(id: string): Promise<AuthRequestEntity> {
    return await this.authRequestRepository.findOneBy({ id });
  }

  async createUserSession(
    user: UserEntity,
    authRequest: AuthRequestEntity,
  ): Promise<SessionEntity> {
    const alreadyExistingSession = await this.sessionRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
        authRequest,
      },
      relations: {
        user: true,
        authRequest: true,
      },
    });
    if (alreadyExistingSession) {
      return alreadyExistingSession;
    }
    const session = new SessionEntity();
    session.user = user;
    session.authRequest = authRequest;
    session.expires = new Date(new Date().setMonth(new Date().getMonth() + 6))
      .getTime()
      .toString();
    session.sessionToken = uuidv4();
    return await this.sessionRepository.save(session);
  }

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

  async getUserById(id: string): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new UnprocessableEntityException();
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user,
    };
  }
}
