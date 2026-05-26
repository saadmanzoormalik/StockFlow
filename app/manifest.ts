import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Stock Pick Check",
    short_name: "Stock Check",
    description: "Retail-friendly stock intelligence based on sector rotations, earnings momentum, and market bottlenecks.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#F7FAFC",
    theme_color: "#15202B",
    orientation: "portrait",
    categories: ["finance", "education", "productivity"]
  };
}
