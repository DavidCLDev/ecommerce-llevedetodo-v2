import { useState, useEffect } from "react";

import ProductCard from "./ProductCard";
import Carousel from "./Carousel";

export default function Recommendations({RecommId}) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/products/recomendados')
        .then(res => res.json())
        .then(data => setProducts(data));
    }, []);

    return (
        <section className="flex w-full h-112 justify-center py-10 overflow-hidden">
            <div className="w-7/10 h-full bg-zinc-100 rounded-lg">
                <Carousel arrowSize='size-12' arrowPadL='-left-8' arrowPadR='-right-8'>
                <div className="size-full p-6">
                    <div className="grid grid-cols-6 size-full gap-4">
                        {
                            products.map((product) => <ProductCard producto={ product } parentId={ RecommId } key={ product.id } />)
                        }
                    </div>
                </div>
                </Carousel>
            </div>
        </section>
    );
}
