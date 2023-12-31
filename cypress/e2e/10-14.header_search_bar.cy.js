/// <reference types="cypress" />

const fetchMock = require('../mocks/fetch');
const soupMeals = require('../mocks/soupMeals');
const ginDrinks = require('../mocks/ginDrinks');
describe('10 - Implemente os elementos da barra de busca respeitando os atributos descritos no protótipo', () => {
  it('Tem os data-testids tanto da barra de busca quanto de todos os radio-buttons', () => {
    cy.visit('http://localhost:3000/meals');

    cy.get('[data-testid="search-top-btn"]').click();

    cy.get('[data-testid="search-input"]');
    cy.get('[data-testid="ingredient-search-radio"]');
    cy.get('[data-testid="name-search-radio"]');
    cy.get('[data-testid="first-letter-search-radio"]');
    cy.get('[data-testid="exec-search-btn"]');
  });
});

describe('11 - Implemente 3 radio buttons na barra de busca: Ingredient, Name e First letter', () => {
  it('Se o radio selecionado for Ingredient, a busca na API é feita corretamente pelo ingrediente', () => {
    cy.visit('http://localhost:3000/meals', {
      onBeforeLoad(win) {
        cy.spy(win, 'fetch');
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="ingredient-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('chicken');
    cy.get('[data-testid="exec-search-btn"]').click();
    cy.window()
      .its('fetch')
      .should('be.calledWith', 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
  });

  it('Se o radio selecionado for Name, a busca na API é feita corretamente pelo nome', () => {
    cy.visit('http://localhost:3000/meals', {
      onBeforeLoad(win) {
        cy.spy(win, 'fetch');
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="name-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('soup');
    cy.get('[data-testid="exec-search-btn"]').click();
    cy.window()
      .its('fetch')
      .should('be.calledWith', 'https://www.themealdb.com/api/json/v1/1/search.php?s=soup');
  });

  it('Se o radio selecionado for First letter, a busca na API é feita corretamente pelo primeira letra', () => {
    cy.visit('http://localhost:3000/meals', {
      onBeforeLoad(win) {
        cy.spy(win, 'fetch');
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="first-letter-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('a');
    cy.get('[data-testid="exec-search-btn"]').click();
    cy.window()
      .its('fetch')
      .should('be.calledWith', 'https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  });

  it('Se o radio selecionado for First letter e a busca na API for feita com mais de uma letra, deve-se exibir um alert', () => {
    cy.visit('http://localhost:3000/meals', {
      onBeforeLoad(win) {
        cy.spy(win, 'alert');
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="first-letter-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('aaa');
    cy.get('[data-testid="exec-search-btn"]').click();
    cy.window()
      .its('alert')
      .should('be.calledWith', 'Your search must have only 1 (one) character');
  });
});

describe('12 - Busque na API de comidas caso a pessoa esteja na página de comidas, e na API de bebidas caso esteja na de bebidas', () => {
  it('Na tela de bebidas, se o radio selecionado for Ingredient, a busca na API é feita corretamente pelo ingrediente', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        cy.spy(win, 'fetch');
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="ingredient-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('lemon');
    cy.get('[data-testid="exec-search-btn"]').click();
    cy.window()
      .its('fetch')
      .should('be.calledWith', 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon');
  });

  it('Na tela de bebidas, se o radio selecionado for Name, a busca na API é feita corretamente pelo nome', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        cy.spy(win, 'fetch');
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="name-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('gin');
    cy.get('[data-testid="exec-search-btn"]').click();
    cy.window()
      .its('fetch')
      .should('be.calledWith', 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin');
  });

  it('Na tela de bebidas, se o radio selecionado for First letter, a busca na API é feita corretamente pelo primeira letra', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        cy.spy(win, 'fetch');
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="first-letter-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('a');
    cy.get('[data-testid="exec-search-btn"]').click();
    cy.window()
      .its('fetch')
      .should('be.calledWith', 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
  });

  it('Na tela de bebidas, se o radio selecionado for First letter e a busca na API for feita com mais de uma letra, deve-se exibir um alert', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        cy.spy(win, 'alert');
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="first-letter-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('aaa');
    cy.get('[data-testid="exec-search-btn"]').click();
    cy.window()
      .its('alert')
      .should('be.calledWith', 'Your search must have only 1 (one) character');
  });

  it('Verifica a cobertura de 45% do Componente SearchBar', () => {
    cy.getCoverage().its('SearchBar.functions.pct', { timeout: 0 }).should('be.gte', 45.00);
    cy.getCoverage().its('SearchBar.branches.pct', { timeout: 0 }).should('be.gte', 45.00);
  });
});

describe('13 - Redirecione para a tela de detalhes da receita caso apenas uma receita seja encontrada, com o ID da mesma na URL', () => {
  it('Caso apenas uma comida seja encontrada, deve-se ir para sua rota de detalhes', () => {
    cy.visit('http://localhost:3000/meals', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="name-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('Arrabiata');
    cy.get('[data-testid="exec-search-btn"]').click();

    cy.location().should((loc) => expect(loc.pathname).to.eq('/meals/52771'));
  });

  it('Caso apenas uma bebida seja encontrada, deve-se ir para sua rota de detalhes', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="name-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('Aquamarine');
    cy.get('[data-testid="exec-search-btn"]').click();

    cy.location().should((loc) => expect(loc.pathname).to.eq('/drinks/178319'));
  });
});

describe('14 - Exiba um `alert` caso nenhuma receita seja encontrada', () => {
  it('Caso nenhuma comida seja encontrada o alert deve ser exibido', () => {
    cy.visit('http://localhost:3000/meals', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
        cy.spy(win, 'alert');
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="name-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('xablau');
    cy.get('[data-testid="exec-search-btn"]').click();

    cy.window()
      .its('alert')
      .should('be.calledWith', 'Sorry, we haven\'t found any recipes for these filters');
  });

  it('Caso nenhuma bebida seja encontrada o alert deve ser exibido', () => {
    cy.visit('http://localhost:3000/drinks', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
        cy.spy(win, 'alert');
      },
    });

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="name-search-radio"]').click();
    cy.get('[data-testid="search-input"]').type('xablau');
    cy.get('[data-testid="exec-search-btn"]').click();

    cy.window()
      .its('alert')
      .should('be.calledWith', 'Sorry, we haven\'t found any recipes for these filters');
  });

  it('Verifica a cobertura de 90% do Componente SearchBar', () => {
    cy.getCoverage().its('SearchBar.functions.pct', { timeout: 0 }).should('be.gte', 90.00);
    cy.getCoverage().its('SearchBar.branches.pct', { timeout: 0 }).should('be.gte', 90.00);
  });
});
