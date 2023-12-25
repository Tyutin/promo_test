import {
  Body,
  Controller,
  Post,
  UnprocessableEntityException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminOrSecretOrAffiliateGuard } from 'src/user/guards/adminOrSecretOrAffiliate.guard';
import { CreatePromocodeDto } from './dto/createPromocode.dto';
import { PromocodeService } from './promocode.service';
import { User } from 'src/user/decorators/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { IsAuthBySecret } from 'src/user/decorators/isAuthBySecret.decorator';
import { IsAdmin } from 'src/user/decorators/isAdmin.decorator';
import { UserService } from 'src/user/user.service';
import { IsAffiliate } from 'src/user/decorators/isAffiliate.decorator';

@Controller('/promocode')
export class PromocodeController {
  constructor(
    private readonly promocodeService: PromocodeService,
    private readonly userService: UserService,
  ) {
    this.promocodeService = promocodeService;
    this.userService = userService;
  }
  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AdminOrSecretOrAffiliateGuard)
  async createPromocode(
    @Body('promocode') createPromocodeDto: CreatePromocodeDto,
    @User() userByRequest: UserEntity,
    @IsAuthBySecret() isAuthBySecret: boolean,
    @IsAdmin() isAdmin: boolean,
    @IsAffiliate() isAffiliate: boolean,
  ) {
    let user: UserEntity;
    user = userByRequest;
    if ((isAdmin || isAuthBySecret) && createPromocodeDto.userId) {
      user = await this.userService.getUserById(createPromocodeDto.userId);
    }
    if (!user) {
      throw new UnprocessableEntityException('Пользователь не найден');
    }
    if (!user || user.role === 'user') {
      throw new UnprocessableEntityException(
        'Обычному пользователю нельзя создать промокод',
      );
    }
    if (isAffiliate) {
      delete createPromocodeDto.commission;
    }
    const promocode = await this.promocodeService.createPromocode(
      createPromocodeDto,
      user,
    );
    return this.promocodeService.buildPromocodeResponse(promocode);
  }
}
