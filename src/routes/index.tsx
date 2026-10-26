import { createFileRoute } from "@tanstack/react-router";
import PortfolioPage from "@/components/portfolio/PortfolioPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adrian | Linux, Programmierung & IT-Projekte" },
      {
        name: "description",
        content:
          "Adrians IT-Portfolio: Linux, eigene Softwareprojekte, Go, Rust und Systemadministration. Auf der Suche nach einem IT-Ausbildungsplatz ab 2027.",
      },
      { property: "og:title", content: "Adrian | Linux, Programmierung & IT-Projekte" },
      {
        property: "og:description",
        content:
          "Adrians IT-Portfolio: Linux, eigene Softwareprojekte, Go, Rust und Systemadministration. Auf der Suche nach einem IT-Ausbildungsplatz ab 2027.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "de_DE" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Adrian | Linux, Programmierung & IT-Projekte" },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: PortfolioPage,
});
