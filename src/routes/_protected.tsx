import { useLayoutEffect, useRef, useState } from "react";
// import { useTranslation } from "react-i18next";

// import { useSessionStorage } from "~/hooks/use-session-storage";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import Navbar from "../components/navbar";
import { Header } from "../components/header";

export const Route = createFileRoute("/_protected")({
  component: RouteGuard,
});

function RouteGuard() {
  //   const { t } = useTranslation();
  const [headerHeight, setHeaderHeight] = useState(0);

  const headerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, []);

  return (
    <>
      {" "}
        <div
          className="main-layout w-full"
          style={
            {
              "--page-header-height": `${headerHeight}px`,
            } as React.CSSProperties
          }
        >
          <Navbar />
          <div className="w-full">
            <Header ref={headerRef} className="header" />

            <main className="content p-5">
              <Outlet />
            </main>
          </div>
        </div>
    </>
  );
}
