import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/prompt-generator")({
  beforeLoad: () => {
    throw redirect({ to: "/prompts" });
  },
});