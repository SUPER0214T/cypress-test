/// <reference types="Cypress" />

const interceptOnce = (method: string, url: any, response) => {
  // I am using "count" to show how easy you can implement
  // different responses for different interceptors
  let count = 0;
  return cy.intercept(method, url, (req) => {
    count += 1;
    if (count < 2) {
      req.reply(response);
    } else {
      // do nothing
    }
  });
};

const 클릭함수 = (clickCount: number, callback: Function) => {
  for (let i = 0; i < clickCount; i++) {
    callback();
  }
};

describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("첫 번째 글자가 있는가", () => {
    cy.get("#root").find(".title").should("have.text", "delectus aut autem");
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
    // given
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

    // when
    interceptOnce(
      "GET",
      "https://jsonplaceholder.typicode.com/todos",
      mockingData
    ).as("getMockedResponse");

    cy.wait("@getMockedResponse"); // 가짜 응답을 기다림

    // then
    cy.get("#root")
      .contains("두 번재 todo")
      .should("have.text", "두 번재 todo");
    /**
     * @description reload로 request가 모킹되지 않는 상태인지 확인하려고 했는데 이건 좋지 않은 방법처럼 보인다.
     * master를 검증하는데 쓰일 텐데 master 정보가 바뀐다면 테스트는 실패할 것이다. 그러니 response를 검증하는건 맞지 않는 테스트 방법으로 보인다.
     * 따라서 모킹 후의 동작이 원하는 동작인지만을 검증하면 될 것이라고 생각된다.
     */
  });

  it("count는 5를 초과할 수 없다.", () => {
    interceptOnce("GET", "http://localhost:3000/api/counter/limit", {
      limit: 5,
    }).as("getCounterLimit");

    cy.wait("@getCounterLimit"); // 가짜 응답을 기다림
    클릭함수(10, () => cy.get(".increase-btn").click());

    cy.get(".count").should("have.text", 5);
  });

  it("count는 7을 초과할 수 없다.", () => {
    interceptOnce("GET", "http://localhost:3000/api/counter/limit", {
      limit: 7,
    }).as("getCounterLimit");

    cy.wait("@getCounterLimit"); // 가짜 응답을 기다림
    클릭함수(10, () => cy.get(".increase-btn").click());

    cy.get(".count").should("have.text", 7);
  });
});
