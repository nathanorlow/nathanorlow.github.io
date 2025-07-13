import type { Route } from "./+types/home";
import { Create } from "../create/create";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Know Show Create" },
    { name: "description", content: "Know Show Create page" },
  ];
}

export default function CreatePage() {
  return <Create />;
}
