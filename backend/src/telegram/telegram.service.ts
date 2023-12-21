import { Command, Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
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
    let user = await this.userService.createUserFromBot(ctx.from);
    // @ts-expect-error payloada netu :(
    const authRequestId = ctx.payload || '';
    if (!authRequestId) return;
    const authRequest =
      await this.userService.getAuthRequestById(authRequestId);
    if (!authRequest) return;

    if (authRequest.ref_promocode && !user.ref_promocode) {
      user = await this.userService.setRefPromoToUser(
        user,
        authRequest.ref_promocode,
      );
    }
    await this.userService.createUserSession(user, authRequest);
  }

  @Command('start')
  async onCommand() {
    console.log('oncommand');
  }
}
