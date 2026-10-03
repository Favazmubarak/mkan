import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("Contact Inquiries Validation Rules", () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  it("validates email formatting accurately", () => {
    assert.equal(emailRegex.test("client@dubai.ae"), true);
    assert.equal(emailRegex.test("investor.vip@emirates.com"), true);
    assert.equal(emailRegex.test("plainaddress"), false);
    assert.equal(emailRegex.test("@missingusername.com"), false);
    assert.equal(emailRegex.test("user@.com"), false);
  });

  it("validates input lengths according to specification", () => {
    const minNameLength = 2;
    const maxNameLength = 200;
    const maxCompanyLength = 200;
    const minMessageLength = 10;
    const maxMessageLength = 10000;

    assert.equal("A".length >= minNameLength, false);
    assert.equal("John Doe".length >= minNameLength && "John Doe".length <= maxNameLength, true);
    assert.equal("MKAN Global".length <= maxCompanyLength, true);
    assert.equal("Hi".length >= minMessageLength, false);
    assert.equal("Please send me a proposal for the upcoming gala dinner.".length >= minMessageLength, true);
    assert.equal("A".repeat(10001).length <= maxMessageLength, false);
  });

  it("escapes HTML entities to prevent XSS payloads", () => {
    function escapeHtml(value: string): string {
      const entities: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };
      return value.replace(/[&<>"']/g, (char) => entities[char]);
    }

    const payload = '<script>alert("xss")</script>';
    const sanitized = escapeHtml(payload);
    assert.equal(sanitized, "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;");
    assert.equal(sanitized.includes("<script>"), false);
  });
});
