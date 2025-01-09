import { createFileRoute } from "@tanstack/react-router";
import StorePage from "../../pages/store";

export const Route = createFileRoute("/_protected/store")({
  component: StorePage,
});
