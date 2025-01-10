"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import Link from "next/link";
export default function dashboard() {
  const { status } = useSession();
  const router = useRouter();
  if (status === "authenticated") {
    return (
      <>
        <Navbar fluid rounded>
          <NavbarBrand href="https://flowbite-react.com">
            <img
              src="/next.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite React Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Flowbite React
            </span>
          </NavbarBrand>
          <div className="flex md:order-2">
            <NavbarToggle />
          </div>
          <NavbarCollapse>
            <NavbarLink href="#" active>
              Home
            </NavbarLink>
            <NavbarLink href="#">About</NavbarLink>
            <NavbarLink href="#">Services</NavbarLink>
            <NavbarLink href="#">Pricing</NavbarLink>
            <NavbarLink href="#">Contact</NavbarLink>
            <NavbarLink
              onClick={() => {
                signOut({ redirect: false }).then(() => {
                  router.push("/");
                });
              }}
            >
              Sign Out
            </NavbarLink>
            <NavbarLink>
              <Flowbite>
                <DarkThemeToggle className="p-0" />
              </Flowbite>
            </NavbarLink>
          </NavbarCollapse>
        </Navbar>
      </>
    );
  } else if (status === "loading") {
    return <span className="text-[#888] text-sm mt-7">Loading...</span>;
  } else {
    return (
      <Link
        href="/login"
        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        Sign In
      </Link>
    );
  }
}
