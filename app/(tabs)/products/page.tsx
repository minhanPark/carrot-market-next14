import ListProduct from "@/components/list-product";
import ProductList from "@/components/product-list";
import db from "@/libs/db";
import { Prisma } from "@prisma/client";

async function getInitialProduct() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    take: 1,
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
  const initialProducts = await getInitialProduct();
  return (
    <div className="">
      <ProductList initialProducts={initialProducts} />
    </div>
  );
}
