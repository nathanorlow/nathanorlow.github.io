import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/create.tsx"),
    route("create/:encodedString", "routes/create.tsx", {id: 'green-screen-create'}),
    route("solve/:encodedString", "routes/solve.tsx", {id: 'green-screen-solve'}),
] satisfies RouteConfig;
