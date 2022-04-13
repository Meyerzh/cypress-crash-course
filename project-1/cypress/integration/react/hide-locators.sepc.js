/// <reference types="cypress" />

describe('Locators', () => {
  beforeEach(() => {
    cy.visit("https://dev.covermore.com.au/")
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
  })


  it('01 Update alert text:', () => {
    cy.contains('COVID-19 COVER: Discover how our COVID-19 benefits can help protect your trip.')
      .should('be.visible')

    cy.get('.header-tips-text a.readmore')
      .should('have.attr', 'href', '/travel-insurance/benefits/covid-19')
      .should(($div) => {
        expect($div.text().trim()).equal('Learn More');
      });

    // Assert the href attribute is equal to '/users'

    // cy.url().should('include', '/travel-insurance/benefits/covid-19') // => true
    // // cy.url().should('eq', 'http://localhost:8000/users/1/edit')
    // cy.go('back')
  })

  it('02 Update Link text to "Learn More"', () => {
    cy.get('.header-tips-text a.readmore')
      .should('have.attr', 'href', '/travel-insurance/benefits/covid-19')
      .should(($div) => {
        expect($div.text().trim()).equal('Learn More');
      });
  })

  it('03 Learn More link href equal "/travel-insurance/benefits/covid-19"', () => {
    cy.get('.header-tips-text a.readmore')
      .should('have.attr', 'href', '/travel-insurance/benefits/covid-19')
  })

  it('04: change "Compare our plans" to "Compare Our Plans"', () => {
    cy.get('.nav-li-a').contains('TRAVEL INSURANCE').trigger('mouseover')
    cy.contains('Compare Our Plans').should('be.visible')
  })

// Ukraine Attacks - travel-alerts/ukraine-attacks
// QLD & NSW Floodings - travel-alerts/qld-nsw-floods

// COVID-19 - travel-alerts/coronavirus
// COVID-19 International Travel Tool - covid-international-travel-requirements

  it('05: add Ukraine Attacks, QLD & NSW Floodings, COVID-19, COVID-19 International Travel Tool ', () => {
    cy.get('.nav-li-a').contains('TRAVEL ALERTS').trigger('mouseover')
    cy.get('#menu-two > li a').should(($list) => {
      expect($list).to.have.length(4)
      expect($list.eq(0), 'first item')
        .to.contain('Ukraine Attacks')
        .and.to.have.attr('href', '/travel-alerts/ukraine-attacks')
      expect($list.eq(1), 'second item')
        .to.contain('QLD & NSW Floodings')
        .and.to.have.attr('href', '/travel-alerts/qld-nsw-floods')
      expect($list.eq(2), 'third item')
        .to.contain('COVID-19')
        .and.to.have.attr('href', '/travel-alerts/coronavirus')
      expect($list.eq(3), 'fourth item')
        .to.contain('COVID-19 International Travel Tool')
        .and.to.have.attr('href', '/covid-international-travel-requirements')


    })
  })

})