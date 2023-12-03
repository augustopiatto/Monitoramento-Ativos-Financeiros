import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Limpa depois de cada teste
afterEach(() => {
  cleanup();
});
