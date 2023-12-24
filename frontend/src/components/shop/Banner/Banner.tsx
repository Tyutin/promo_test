/* eslint-disable @next/next/no-img-element */
import Button from '@commonComponents/Button/Button';
import './Banner.scss';

export default function Banner() {
  return (
    <div className="banner">
      <div className="banner__info">
        <h1 className="banner__title">
          Доставка товаров из‑за рубежа в&nbsp;Россию
        </h1>
        <p className="banner__text">
          Начните экономить до 80% на шопинге. Регистрируйтесь в DELIVERY.GO,
          чтобы покупать со скидками в США, Европе и Турции одежду, обувь,
          гаджеты известных брендов и безопасно отправлять вещи в Россию.
        </p>
        <Button
          theme="orange"
          additionalClasses="banner__action-button"
          tag="a"
          href="/how-it-works"
        >
          Начать покупки
        </Button>
      </div>
      <img
        src="/images/delivery-guy.svg"
        alt="Парень доставщик едет на мопеде"
        className="banner__image"
      />
    </div>
  );
}
