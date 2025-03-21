import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Progress Visualiser" },
    { name: "description", content: "Welcome to Progress Visualiser!" },
  ];
}

export default function Home() {
  return "Welcome to Progress Visualiser!";
}
