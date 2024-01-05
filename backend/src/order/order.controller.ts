import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
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
import { OrdersResponseInterface } from './types/OrdersResponse.interface';
import { UpdateMyOrderDto } from './dto/updateMyOrder.dto';
import { AdminOrSecretGuard } from 'src/user/guards/adminOrSecret.guard';
import { UpdateOrderDto } from './dto/updateOrder.dto';

@Controller('/orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService,
  ) {
    this.orderService = orderService;
    this.userService = userService;
  }

  @Get('/my')
  @UseGuards(AuthGuard)
  async getAllMyOrders(
    @User('id') currentUserId: string,
  ): Promise<OrdersResponseInterface> {
    const orders = await this.orderService.getUsersOrders(currentUserId);
    return this.orderService.buildOrdersResponse(orders);
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

  @Get('/my/:orderId')
  @UseGuards(AuthGuard)
  async getMyOrderById(
    @Param('orderId') orderId: string,
    @User('id') userId: string,
  ): Promise<OrderResponseInterface> {
    const order = await this.orderService.getOrderById(orderId);
    if (order.user.id !== userId) {
      throw new ForbiddenException();
    }
    return this.orderService.buildOrderResponse(order);
  }

  @Put('/my/:orderId')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async updateMyOrder(
    @Param('orderId') orderId: string,
    @User() user: UserEntity,
    @Body('order') updateMyOrderDto: UpdateMyOrderDto,
  ): Promise<OrderResponseInterface> {
    const order = await this.orderService.updateMyOrder(
      orderId,
      updateMyOrderDto,
      user,
    );
    return this.orderService.buildOrderResponse(order);
  }

  @Put('/:orderId')
  @UsePipes(new ValidationPipe())
  @UseGuards(AdminOrSecretGuard)
  async updateOrder(
    @Param('orderId') orderId: string,
    @Body('order') updateOrderDto: UpdateOrderDto,
  ): Promise<OrderResponseInterface> {
    const order = await this.orderService.updateOrder(orderId, updateOrderDto);
    return this.orderService.buildOrderResponse(order);
  }
}
