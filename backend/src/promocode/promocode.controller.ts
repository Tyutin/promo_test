import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePromocodeDto } from './dto/createPromocode.dto';
import { PromocodeService } from './promocode.service';
import { User } from 'src/user/decorators/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateSelfPromocodeDto } from './dto/createSelfPromocode.dto';
import { AffiliateGuard } from 'src/user/guards/affilate.guard';
import { PromocodeResponseInterface } from './types/promocodeResponse.interface';
import { AdminOrSecretGuard } from 'src/user/guards/adminOrSecret.guard';

@Controller('/promocode')
export class PromocodeController {
  constructor(
    private readonly promocodeService: PromocodeService,
    private readonly userService: UserService,
  ) {
    this.promocodeService = promocodeService;
    this.userService = userService;
  }

  @Post('/create-self')
  @UsePipes(new ValidationPipe())
  @UseGuards(AffiliateGuard)
  async newSelfPromocode(
    @Body('promocode') createSelfPromocodeDto: CreateSelfPromocodeDto,
    @User() user: UserEntity,
  ): Promise<PromocodeResponseInterface> {
    const promocode = await this.promocodeService.createPromocode(
      createSelfPromocodeDto,
      user,
    );
    return this.promocodeService.buildPromocodeResponse(promocode);
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  @UseGuards(AdminOrSecretGuard)
  async newUserPromocode(
    @Body('promocode') createPromocodeDto: CreatePromocodeDto,
  ): Promise<PromocodeResponseInterface> {
    const user = await this.userService.getUserById(createPromocodeDto.userId);
    const promocode = await this.promocodeService.createPromocode(
      createPromocodeDto,
      user,
    );
    return this.promocodeService.buildPromocodeResponse(promocode);
  }
}
