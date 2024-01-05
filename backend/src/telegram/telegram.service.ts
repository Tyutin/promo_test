import { Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { PromocodeService } from 'src/promocode/promocode.service';
import { UserService } from 'src/user/user.service';
import { Context, Telegraf } from 'telegraf';

@Update()
export class TelegramService {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly userService: UserService,
    private readonly promocoeService: PromocodeService,
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
      const promocode = await this.promocoeService.getPromocodeByCode(
        authRequest.ref_promocode,
      );
      if (promocode) {
        user = await this.promocoeService.setRefPromoToUser(user, promocode);
      }
    }
    await this.userService.createUserSession(user, authRequestId);
    await this.userService.deleteAuthRequest(authRequest);
  }
}
