/// <reference types="Cypress" />

describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("첫 번째 글자가 있는가", () => {
    cy.get("#root").should("have.text", "delectus aut autem");
  });

  it("모킹 테스트1", () => {
    // 요청에 대한 가짜 응답을 설정
    const mockingData = [
      {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false,
      },
      {
        userId: 2,
        id: 2,
        title: "왕왕",
        completed: false,
      },
    ];

    cy.intercept("https://jsonplaceholder.typicode.com/todos", mockingData).as(
      "getMockedResponse"
    );

    cy.wait("@getMockedResponse"); // 가짜 응답을 기다림

    cy.get("#root").contains("왕왕").should("have.text", "왕왕");
  });
});

describe("인터셉터 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("모킹 테스트", () => {
    // 요청에 대한 가짜 응답을 설정
    const mockingData = [
      {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false,
      },
      {
        userId: 2,
        id: 2,
        title: "두 번재 todo",
        completed: false,
      },
    ];

    cy.intercept("https://jsonplaceholder.typicode.com/todos", mockingData).as(
      "getMockedResponse"
    );

    cy.wait("@getMockedResponse"); // 가짜 응답을 기다림

    cy.get("#root")
      .contains("두 번재 todo")
      .should("have.text", "두 번재 todo");
  });
});
