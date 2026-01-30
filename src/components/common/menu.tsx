"use client";
import {
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  TruckIcon,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { authClient } from "@/src/lib/auth-client";

import { Separator } from "../ui/separator";
import { Cart } from "./cart";

export const Menu = () => {
  const { data: session } = authClient.useSession();

  const handleLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast("Logout realizado com sucesso");
        },
        onError: () => {
          toast("Erro ao realizar logout");
        },
      },
    });
  };

  const handleSignInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-bold">Menu</SheetTitle>
        </SheetHeader>
        <div className="px-5">
          {session?.user ? (
            <>
              <div className="flex justify-between space-y-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={session?.user?.image as string | undefined}
                    />
                    <AvatarFallback>
                      {session?.user?.name?.split(" ")?.[0]?.[0]}
                      {session?.user?.name?.split(" ")?.[1]?.[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="text-sm font-semibold sm:text-base">
                      {session?.user?.name}
                    </h3>
                    <span className="text-muted-foreground block text-xs sm:text-sm">
                      {session?.user?.email}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Olá. Faça seu login!</h2>
            </div>
          )}
        </div>

        <div className="px-5">
          <Separator />
          {/* navigation links */}
          <div className="flex flex-col gap-3 pt-5">
            <Link href="/">
              <div className="flex gap-2">
                <HomeIcon size={16} />{" "}
                <p className="text-xs font-medium">Início</p>
              </div>
            </Link>

            <Link href="/my-orders">
              <div className="flex gap-2">
                <TruckIcon size={16} />{" "}
                <p className="text-xs font-medium">Meus pedidos</p>
              </div>
            </Link>
            <Cart menuOpen="bag" />
          </div>
        </div>

        <div className="px-5">
          <Separator />
        </div>
        {session?.user ? (
          <div className="w-full px-3">
            <Button
              variant="ghost"
              className="text-muted-foreground font-regular"
              onClick={handleLogout}
            >
              <LogOutIcon size={16} />
              Logout
            </Button>
          </div>
        ) : (
          <div className="w-full px-3">
            <Button
              variant="ghost"
              className="text-muted-foreground font-regular"
              onClick={handleSignInWithGoogle}
            >
              <LogInIcon size={16} />
              Login
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
