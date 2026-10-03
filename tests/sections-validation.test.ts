import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("CMS Section & Content Validation", () => {
  const SECTION_KEYS = new Set([
    "site",
    "hero",
    "about",
    "expertise",
    "method",
    "experiences",
    "builtForBrands",
    "trustedBy",
    "impactBanner",
    "contact",
  ]);

  function validateSectionKey(sectionKey: string, locale: string): string | null {
    if (!SECTION_KEYS.has(sectionKey)) return "Unknown website section.";
    if (!/^[a-z]{2}(?:-[A-Z]{2})?$/.test(locale)) return "Invalid content locale.";
    return null;
  }

  it("accepts all 10 registered section keys", () => {
    for (const key of SECTION_KEYS) {
      assert.equal(validateSectionKey(key, "en"), null);
    }
  });

  it("rejects unregistered section keys", () => {
    assert.equal(validateSectionKey("invalidSection", "en"), "Unknown website section.");
    assert.equal(validateSectionKey("adminConfig", "en"), "Unknown website section.");
  });

  it("validates locale strings", () => {
    assert.equal(validateSectionKey("hero", "en"), null);
    assert.equal(validateSectionKey("hero", "ar"), null);
    assert.equal(validateSectionKey("hero", "en-US"), null);
    assert.equal(validateSectionKey("hero", "INVALID"), "Invalid content locale.");
  });
});
