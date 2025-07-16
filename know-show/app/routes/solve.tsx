import type { Route } from "./+types/home";
import { Solve } from "../solve/solve";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Know Show Solvee" },
    { name: "description", content: "Know Show Solve page" },
  ];
}

export default function CreatePage() {
  return <Solve />;
}
