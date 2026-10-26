import { describe, expect, it } from "vitest";
import { application, contactMailto } from "@/lib/portfolio";

describe("Portfolio application facts", () => {
  it("keeps Adrian's age and school grade", () => {
    expect(application.age).toBe(16);
    expect(application.grade).toBe(10);
  });
  it("marks graduation as expected in summer 2027", () => {
    expect(application.graduation).toEqual({ year: 2027, season: "summer", expected: true });
  });
  it("seeks an apprenticeship in summer or autumn 2027", () => {
    expect(application.apprenticeship.year).toBe(2027);
    expect(application.apprenticeship.seasons).toEqual(["summer", "autumn"]);
  });
  it("prefers system integration without excluding other IT fields", () => {
    expect(application.apprenticeship.preferredField).toBe("system-integration");
    expect(application.apprenticeship.otherITFields).toBe(true);
  });
  it("keeps an internship secondary and by arrangement", () => {
    expect(application.internship).toEqual({ byArrangement: true, primaryGoal: false });
  });
  it("preserves the existing contact address", () => {
    expect(new URL(contactMailto).pathname).toBe("adrian.neub@icloud.com");
  });
});