import Carousel from './Carousel';
import Recommendations from './Recommendations';

import { bannerData } from '../data/bannerData';

export default function ProductsSection() {

    const recommendations = [1, 2, 3];

    return(
        <main>
            <Carousel showIndicators>
                {bannerData.map((item) => {
                return (
                    <img src={ item.src } alt={ item.alt } key={ item.id} />
                );
            })}
            </Carousel>
            <div className='py-10 bg-amber-500'>
                {
                    recommendations.map(id => <Recommendations key={id} RecommId={id} />)
                }
            </div>
        </main>
    );
}