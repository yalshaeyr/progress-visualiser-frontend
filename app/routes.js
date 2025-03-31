import { layout, index, route } from "@react-router/dev/routes";

export default [
    layout("components/Layout.jsx", [
        index("routes/home.jsx"),
        route("metrics", "routes/metrics.jsx")
    ])
];