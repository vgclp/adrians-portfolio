import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
  it("matches the homepage below the GitHub Pages repository path", () => {
    const router = createRouter({
      routeTree,
      basepath: "/pixel-perfect-replay-8921/",
      context: { queryClient: new QueryClient() },
    });
    const location = router.parseLocation({
      pathname: "/pixel-perfect-replay-8921/",
      search: "",
      hash: "",
      href: "/pixel-perfect-replay-8921/",
      state: { __TSR_index: 0 },
    });
    expect(location.pathname).toBe("/");
    expect(router.matchRoutes(location.pathname).at(-1)?.routeId).toBe("/");
  });
});
