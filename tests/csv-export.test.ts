import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("CSV Export Formula Injection Sanitization", () => {
  function sanitizeCsvCell(value: unknown): string {
    const str = typeof value === "string" ? value : value ? String(value) : "";
    const cleaned = str.replace(/"/g, '""').replace(/[\r\n]+/g, " ");
    if (/^[=+\-@\t\r]/.test(cleaned)) {
      return `"'${cleaned}"`;
    }
    return `"${cleaned}"`;
  }

  it("neutralizes formula injection strings", () => {
    const maliciousInputs = [
      "=CMD|' /C calc'!A0",
      "+SUM(A1:A10)",
      "-2+3+cmd|' /C calc'!A0",
      "@SUM(1+1)",
      "\tTAB_INJECT",
    ];

    for (const input of maliciousInputs) {
      const sanitized = sanitizeCsvCell(input);
      assert.equal(sanitized.startsWith("\"'"), true, `Expected ${input} to be prefixed with apostrophe`);
    }
  });

  it("handles normal benign inputs properly", () => {
    assert.equal(sanitizeCsvCell("MKAN Concept"), '"MKAN Concept"');
    assert.equal(sanitizeCsvCell('Client with "quotes"'), '"Client with ""quotes"""');
    assert.equal(sanitizeCsvCell("Line1\nLine2"), '"Line1 Line2"');
  });
});
