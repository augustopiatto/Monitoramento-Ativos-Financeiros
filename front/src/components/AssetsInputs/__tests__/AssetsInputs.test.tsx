import { test, expect, describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AssetsInputs from "../AssetsInputs";
import userEvent from "@testing-library/user-event";

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

  test("Adiciona um input", async () => {
    render(<AssetsInputs />);

    const selectInput = screen.getByTestId("select");
    userEvent.selectOptions(selectInput, "ABC");
    expect(selectInput.value).toBe("ABC");

    const innerPeriodicityInput = screen.getByTestId("input");
    fireEvent.change(innerPeriodicityInput, {
      target: { value: "1" },
    });
    expect(innerPeriodicityInput.value).toBe("1");

    const innerMoneyInputs = screen.getAllByTestId("money-input");
    const maxValueInput = innerMoneyInputs[0];
    const minValueInput = innerMoneyInputs[1];
    fireEvent.change(maxValueInput, {
      target: { value: "2" },
    });
    fireEvent.change(minValueInput, {
      target: { value: "1" },
    });
    expect(maxValueInput.value).toBe("2");
    expect(minValueInput.value).toBe("1");

    const buttonInput = screen.getByText("Adicionar");
    fireEvent.click(buttonInput);

    // expect(innerPeriodicityInput.value).toBe("");
  });
});
