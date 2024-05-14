async function getProducts() {
  await new Promise((resolve) => setTimeout(resolve, 10000));
}

export default async function Page() {
  const products = await getProducts();
  return <div className="">Product</div>;
}
