import db from "@/libs/db";
import getSession from "@/libs/session";
import { redirect, notFound } from "next/navigation";
import React from "react";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Page() {
  const user = await getUser();
  const logout = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div className="">
      <h1>Welcome {user?.username}</h1>
      <form action={logout}>
        <button>Log out</button>
      </form>
    </div>
  );
}
