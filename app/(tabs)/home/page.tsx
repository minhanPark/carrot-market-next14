import ListProduct from "@/components/list-product";
import ProductList from "@/components/product-list";
import db from "@/libs/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache } from "next/cache";
import Link from "next/link";

const getCachedProducts = nextCache(getInitialProduct, ["home-products"]);

async function getInitialProduct() {
  console.log("hitt");
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export type InitailProducts = Prisma.PromiseReturnType<
  typeof getInitialProduct
>;

export default async function Page() {
  const initialProducts = await getCachedProducts();
  return (
    <div className="">
      <ProductList initialProducts={initialProducts} />
      <Link
        href="/products/add"
        className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
