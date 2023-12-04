import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Limpa depois de cada teste
afterEach(() => {
  cleanup();
});

const windowAlert = vi.fn(() => ({
  alert: vi.fn(),
}));

vi.stubGlobal("alert", windowAlert);
