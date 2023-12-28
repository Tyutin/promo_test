import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnprocessableEntityException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminGuard } from 'src/user/guards/admin.guard';
import { OrderResponseInterface } from './types/OrderResponse.interface';
import { CreateOrderDto } from './dto/createOrder.dto';
import { User } from 'src/user/decorators/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/user/guards/auth.guard';

@Controller('/orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService,
  ) {
    this.orderService = orderService;
    this.userService = userService;
  }

  @Post('/new')
  @UsePipes(new ValidationPipe())
  @UseGuards(AdminGuard)
  async createNewOrder(
    @Body('order') createOrderDto: CreateOrderDto,
    @User() createdBy: UserEntity,
  ): Promise<OrderResponseInterface> {
    const user = await this.userService.getUserById(createOrderDto.userId);
    if (!user) {
      throw new UnprocessableEntityException();
    }
    const order = await this.orderService.createNewOrder(
      createOrderDto,
      user,
      createdBy,
    );
    return this.orderService.buildOrderResponse(order);
  }

  @Get('/:orderId')
  @UseGuards(AuthGuard)
  async getOrderById(
    @Param('orderId') orderId: string,
  ): Promise<OrderResponseInterface> {
    const order = await this.orderService.getOrderById(orderId);
    return this.orderService.buildOrderResponse(order);
  }
}
