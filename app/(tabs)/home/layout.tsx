type Rayout = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function Layout({ children, modal }: Rayout) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
