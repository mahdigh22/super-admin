// import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { SidebarProvider } from "../components/ui/sidebar";
// import { ThemeProvider } from "~/components/theme-provider";
// import { GlobalStateProvider } from "~/global-state/global-state-store";
// import { queryClient } from "~/lib/api/query-client";

export const Route = createRootRoute({
  component: MainLayout,
});

export function MainLayout() {
  return (
    // TODO: Implement layout using CSS Grid
    // <QueryClientProvider client={queryClient}>
    //   <GlobalStateProvider>
    //     <ThemeProvider>
    <SidebarProvider>
      <Outlet />
    </SidebarProvider>
    //     </ThemeProvider>
    //   </GlobalStateProvider>
    // </QueryClientProvider>
  );
}
