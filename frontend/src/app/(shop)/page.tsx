import './MainPage.scss';
import Banner from '@shopComponents/Banner/Banner';

export default async function MainPage() {
  return (
    <div className="main-page">
      <section className="main-page__banner-section">
        <Banner />
      </section>
    </div>
  );
}
