import { Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { UserService } from 'src/user/user.service';
import { Context, Telegraf } from 'telegraf';

@Update()
export class TelegramService {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly userService: UserService,
  ) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    const user = await this.userService.createUserFromBot(ctx.from);
    console.log(user);
    console.log('='.repeat(40));
    console.log(ctx);
    console.log('='.repeat(40));
  }
}
