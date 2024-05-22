"use client";

import { InitailProducts } from "@/app/(tabs)/home/page";
import ListProduct from "./list-product";
import { useEffect, useRef, useState } from "react";
import { getMoreProduct } from "@/app/(tabs)/home/actions";

interface ProductList {
  initialProducts: InitailProducts;
}

export default function ProductList({ initialProducts }: ProductList) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     async (
  //       entries: IntersectionObserverEntry[],
  //       observer: IntersectionObserver
  //     ) => {
  //       const element = entries[0];
  //       if (element.isIntersecting && trigger.current) {
  //         observer.unobserve(trigger.current);
  //         setIsLoading(true);
  //         const newProducts = await getMoreProduct(page + 1);
  //         if (newProducts.length !== 0) {
  //           setPage(page + 1);
  //           setProducts((prev) => [...prev, ...newProducts]);
  //         } else {
  //           setIsLast(true);
  //         }
  //         setIsLoading(false);
  //       }
  //     },
  //     { threshold: 1.0 }
  //   );
  //   if (trigger.current) {
  //     observer.observe(trigger.current);
  //   }
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, [page]);

  const onLoadMoreClick = async () => {
    setIsLoading(true);
    const newProducts = await getMoreProduct(page + 1);
    if (newProducts.length !== 0) {
      setPage(page + 1);
      setProducts((prev) => [...prev, ...newProducts]);
    } else {
      setIsLast(true);
    }
    setIsLoading(false);
  };
  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
      {/* {!isLast && (
        <span
          ref={trigger}
          className="primary-btn py-2.5 text-center text-white w-48 mx-auto"
        >
          {isLoading ? "불러오는 중" : "Load more"}
        </span>
      )} */}
    </div>
  );
}
