import {
  Body,
  Controller,
  Param,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AdminOrSecretGuard } from './guards/adminOrSecret.guard';
import { UserResponseInterface } from './types/UserResponse.interface';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  @Put('/:userId')
  @UsePipes(new ValidationPipe())
  @UseGuards(AdminOrSecretGuard)
  async updateUser(
    @Param('userId') userId: string,
    @Body('user') updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(userId, updateUserDto);
    return this.userService.buildUserResponse(user);
  }
}
