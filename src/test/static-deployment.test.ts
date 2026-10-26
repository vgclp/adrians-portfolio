import { describe, expect, it } from "vitest";
import { staticDeployment } from "@/lib/static-deployment";

describe("Static deployment", () => {
  it("mounts GitHub Pages at the requested repository base", () => {
    expect(staticDeployment(true).base).toBe("/pixel-perfect-replay-8921/");
  });
  it("leaves the Lovable preview at the root", () => {
    expect(staticDeployment(false).base).toBe("/");
  });
  it("keeps the upload directory separate from the build-time server", () => {
    expect(staticDeployment(true).publicDir).toBe(".output/public");
    expect(staticDeployment(true).serverDir).toBe(".output/server");
  });
});