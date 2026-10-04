import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  PORTRAIT_CATEGORIES,
  ASPECT_OPTIONS,
  DEFAULT_PORTRAIT_PINS,
} from "../src/content/portrait-gallery";

describe("Portrait Gallery Validation & Content Specifications", () => {
  const VALID_CATEGORIES = new Set([
    "exhibitions",
    "activations",
    "corporate",
    "workshops",
    "consultancy",
  ]);

  const VALID_ASPECTS = new Set([
    "portrait",
    "tall",
    "square",
    "wide",
    "cinema",
  ]);

  it("verifies all default portrait pins have valid categories and aspect ratios", () => {
    assert.equal(DEFAULT_PORTRAIT_PINS.length, 12);
    for (const pin of DEFAULT_PORTRAIT_PINS) {
      assert.ok(VALID_CATEGORIES.has(pin.category), `Category ${pin.category} must be valid`);
      assert.ok(VALID_ASPECTS.has(pin.aspect), `Aspect ${pin.aspect} must be valid`);
      assert.ok(pin.title.length >= 2, "Title must be at least 2 chars");
      assert.ok(pin.subtitle.length >= 2, "Subtitle must be at least 2 chars");
      assert.ok(pin.image.startsWith("/") || pin.image.startsWith("http"), "Image must be valid URL or path");
      assert.ok(Array.isArray(pin.tags), "Tags must be array");
      assert.ok(Array.isArray(pin.deliverables), "Deliverables must be array");
      assert.ok(Array.isArray(pin.disciplines), "Disciplines must be array");
    }
  });

  it("verifies category and aspect options registries match schema requirements", () => {
    assert.equal(PORTRAIT_CATEGORIES.length, 5);
    for (const cat of PORTRAIT_CATEGORIES) {
      assert.ok(VALID_CATEGORIES.has(cat.key));
      assert.ok(cat.label.length > 0);
    }

    assert.equal(ASPECT_OPTIONS.length, 5);
    for (const asp of ASPECT_OPTIONS) {
      assert.ok(VALID_ASPECTS.has(asp.key));
      assert.ok(asp.ratio.length > 0);
    }
  });

  it("slugifies titles cleanly without invalid characters", () => {
    const slugify = (title: string) =>
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    assert.equal(slugify("THE RAMADAN FAIR"), "the-ramadan-fair");
    assert.equal(slugify("HAUTE PARFUMERIE & LUXURY MAISON!"), "haute-parfumerie-luxury-maison");
    assert.equal(slugify("   DUBAI ATELIER 2024   "), "dubai-atelier-2024");
  });
});
