/* eslint-disable @next/next/no-img-element */
import LoginLink from '@shopComponents/LoginLink/LoginLink';
import './HowItWorksPage.scss';
import { getSession } from '@/typeorm/getSession';

export default async function HowItWorksPage() {
  const session = await getSession();
  return (
    <div className="how-page">
      <ul className="how-page__step-list">
        <li className="how-page__step">
          <div className="how-page__step-info">
            <h2 className="how-page__step-title">
              <img
                src="/images/svg/how-it-works/step1-number.svg"
                alt="Порядковый номер шага (1)"
                className="how-page__step-number hide-tablet-and-more"
              />
              Регистрируемся
            </h2>
            <div className="how-page__step-text">
              <p>
                {!session.isLoggedIn ? (
                  <LoginLink title="Кнопка регистрации на сайте">
                    Зарегистрируйтесь на нашем сайте&nbsp;
                  </LoginLink>
                ) : (
                  'Зарегистрируйтесь на нашем сайте '
                )}
                через Telegram, чтобы получить персональный адрес в США, Европе
                и Турции и создать аккаунт для управления своими посылками.
              </p>
              <p>
                На этот адрес вы сможете делать заказы в зарубежных
                интернет-магазинах. А в вашем личном кабинете будет храниться
                вся информация о ваших посылках.
              </p>
            </div>
          </div>
          <img
            src="/images/svg/how-it-works/step1-full.svg"
            alt="Стрелка к следующему шагу"
            className="hide-less-tablet how-page__step-image"
          />
        </li>
        <li className="how-page__step how-page__step_reverse">
          <div className="how-page__step-info">
            <h2 className="how-page__step-title">
              <img
                src="/images/svg/how-it-works/step2-number.svg"
                alt="Порядковый номер шага (2)"
                className="how-page__step-number hide-tablet-and-more"
              />
              Оформляем заказ
            </h2>
            <div className="how-page__step-text">
              <p>
                Зарегистрируйтесь на нашем сайте или через Telegram, чтобы
                получить персональный адрес в США, Европе и Турции и создать
                аккаунт для управления своими посылками.
              </p>
              <p>
                На этот адрес вы сможете делать заказы в зарубежных
                интернет-магазинах. А в вашем личном кабинете будет храниться
                вся информация о ваших посылках.
              </p>
            </div>
          </div>
          <img
            src="/images/svg/how-it-works/step2-full.svg"
            alt="Стрелка к следующему шагу"
            className="hide-less-tablet how-page__step-image"
          />
        </li>
        <li className="how-page__step">
          <div className="how-page__step-info">
            <h2 className="how-page__step-title">
              <img
                src="/images/svg/how-it-works/step3-number.svg"
                alt="Порядковый номер шага (3)"
                className="how-page__step-number hide-tablet-and-more"
              />
              Получаем посылку
            </h2>
            <div className="how-page__step-text">
              <p>
                Зарегистрируйтесь на нашем сайте или через Telegram, чтобы
                получить персональный адрес в США, Европе и Турции и создать
                аккаунт для управления своими посылками.
              </p>
              <p>
                На этот адрес вы сможете делать заказы в зарубежных
                интернет-магазинах. А в вашем личном кабинете будет храниться
                вся информация о ваших посылках.
              </p>
            </div>
          </div>
          <img
            src="/images/svg/how-it-works/step3-full.svg"
            alt="Стрелка к следующему шагу"
            className="hide-less-tablet how-page__step-image"
          />
        </li>
      </ul>
    </div>
  );
}
