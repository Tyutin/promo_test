import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UserEntity } from 'src/user/user.entity';
import { OrderResponseInterface } from './types/OrderResponse.interface';
import { OrdersResponseInterface } from './types/OrdersResponse.interface';
import { UpdateMyOrderDto } from './dto/updateMyOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async createNewOrder(
    createOrderDto: CreateOrderDto,
    user: UserEntity,
    createdBy: UserEntity,
  ): Promise<OrderEntity> {
    const order = Object.assign({}, new OrderEntity(), createOrderDto);
    order.user = user;
    order.createdBy = createdBy;
    return await this.orderRepository.save(order);
  }

  async getOrderById(id: string): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        createdBy: true,
      },
    });
    if (!order) {
      throw new NotFoundException();
    }
    return order;
  }

  async getUsersOrders(userId: string): Promise<OrderEntity[]> {
    return await this.orderRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async updateMyOrder(
    orderId: string,
    updateMyOrderDto: UpdateMyOrderDto,
    user: UserEntity,
  ): Promise<OrderEntity> {
    const order = await this.getOrderById(orderId);
    if (order.user.id !== user.id) {
      throw new ForbiddenException();
    }
    const updatedOrder = Object.assign(order, updateMyOrderDto);
    return await this.orderRepository.save(updatedOrder);
  }

  async updateOrder(
    orderId: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderEntity> {
    const order = await this.getOrderById(orderId);
    const updatedOrder = Object.assign(order, updateOrderDto);
    return await this.orderRepository.save(updatedOrder);
  }

  buildOrderResponse(order: OrderEntity): OrderResponseInterface {
    return {
      order,
    };
  }

  buildOrdersResponse(orders: OrderEntity[]): OrdersResponseInterface {
    return {
      orders,
    };
  }
}
