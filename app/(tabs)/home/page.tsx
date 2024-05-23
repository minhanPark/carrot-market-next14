import ListProduct from "@/components/list-product";
import ProductList from "@/components/product-list";
import db from "@/libs/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";
import Link from "next/link";

// static으로 생성된 파일을 강제적으로 다이나믹으로 바꾼다.
// 즉 캐시를 사용하지 않음
export const dynamic = "force-dynamic";

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
  const revalidate = async () => {
    "use server";
    revalidatePath("/home");
  };
  return (
    <div className="">
      <ProductList initialProducts={initialProducts} />
      <form action={revalidate}>
        <button>Revalidate</button>
      </form>
      <Link
        href="/products/add"
        className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
