// import "~/i18n";
import "./app.css";
// import "@fontsource/inter/100.css"; // Thin
// import "@fontsource/inter/200.css"; // ExtraLight
// import "@fontsource/inter/300.css"; // Light
// import "@fontsource/inter/400.css"; // Regular
// import "@fontsource/inter/500.css"; // Medium
// import "@fontsource/inter/600.css"; // SemiBold
// import "@fontsource/inter/700.css"; // Bold
// import "@fontsource/inter/800.css"; // ExtraBold
// import "@fontsource/inter/900.css"; // Black

import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { TanStackRouterDevtools } from "./components/tanstack-devtools";

// Import the generated route tree

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const inDevelopmentMode = import.meta.env.DEV;

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
      {inDevelopmentMode && (
        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
      )}
    </StrictMode>
  );
}
