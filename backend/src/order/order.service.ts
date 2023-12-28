import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UserEntity } from 'src/user/user.entity';
import { OrderResponseInterface } from './types/OrderResponse.interface';

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

  buildOrderResponse(order: OrderEntity): OrderResponseInterface {
    return {
      order,
    };
  }
}
