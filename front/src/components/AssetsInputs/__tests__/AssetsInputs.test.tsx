import { test, expect, describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AssetsInputs from "../AssetsInputs";

describe("AssetsInputs.tsx", () => {
  test("Componente sendo montado", () => {
    render(<AssetsInputs />);

    const select = screen.getByText("Escolha o ativo");
    const periodicityInput = screen.getByText("Peridiocidade");
    const maxValueInput = screen.getByText("Túnel Superior (R$)");
    const minValueInput = screen.getByText("Túnel Inferior (R$)");
    const button = screen.getByText("Adicionar");

    expect(select).toBeDefined();
    expect(periodicityInput).toBeDefined();
    expect(maxValueInput).toBeDefined();
    expect(minValueInput).toBeDefined();
    expect(button).toBeDefined();
  });

  test("Adiciona valores", async () => {
    render(<AssetsInputs />);

    const innerPeriodicityInput = screen.getByTestId(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(innerPeriodicityInput, {
      target: { value: "1" },
    });
    expect(innerPeriodicityInput.value).toBe("1");

    const innerMoneyInputs = screen.getAllByTestId("money-input");
    const maxValueInput = innerMoneyInputs[0] as HTMLInputElement;
    const minValueInput = innerMoneyInputs[1] as HTMLInputElement;
    fireEvent.change(maxValueInput, {
      target: { value: "2" },
    });
    fireEvent.change(minValueInput, {
      target: { value: "1" },
    });
    expect(maxValueInput.value).toBe("2");
    expect(minValueInput.value).toBe("1");
  });
});
