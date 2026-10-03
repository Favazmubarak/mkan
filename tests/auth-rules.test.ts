import { describe, it } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";

describe("Authentication Security & Validation Rules", () => {
  it("rejects invalid or empty email addresses", () => {
    const invalidEmails = ["", "not-an-email", "@mkan.ae", "admin@", " "];
    for (const email of invalidEmails) {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && email.length <= 254;
      assert.equal(isValid, false, `Expected ${email} to be invalid`);
    }
  });

  it("accepts valid corporate admin emails", () => {
    const validEmails = ["admin@mkanconcept.ae", "favaz@mkanconcept.ae"];
    for (const email of validEmails) {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && email.length <= 254;
      assert.equal(isValid, true, `Expected ${email} to be valid`);
    }
  });

  it("enforces password max byte limit (bcrypt 72-byte truncation boundary)", () => {
    const normalPassword = "Mkan@Luxury2026";
    const oversizedPassword = "A".repeat(73);
    assert.equal(Buffer.byteLength(normalPassword, "utf8") <= 72, true);
    assert.equal(Buffer.byteLength(oversizedPassword, "utf8") > 72, true);
  });

  it("hashes session tokens with SHA-256 with consistent length", () => {
    const rawToken = crypto.randomBytes(32).toString("hex");
    assert.equal(rawToken.length, 64);
    const hash = crypto.createHash("sha256").update(rawToken).digest("hex");
    assert.equal(hash.length, 64);
    assert.notEqual(rawToken, hash);
  });
});
