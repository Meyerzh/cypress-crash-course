/// <reference types="cypress" />

describe('Theme-Costcotravel', () => {
  beforeEach(() => {

    cy.visit('https://costcotravel.dev-innateacsf.acsitefactory.com/', {
      auth: {
        username: 'innate',
        password: 'etanni',
      },
    })
  })


  it('Fill in form', () => {
    const data = [
      {
        "Where": "Australia",
        "Departure Date": "04/22/2022",
        "Return Date": "04/25/2022",
        "State of Residence": "Alabama",
        "Trip Cost Per Traveler" : ['3100']
      }
    ]
    cy.get('[id=edit-destinations--2-selectized]').type(`${data[0]['Where']}{enter}`)
    cy.get('[id=edit-dep-date]').type(`${data[0]['Departure Date']}{enter}`)
    cy.get('[id="edit-return-date"]').type(`${data[0]['Return Date']}{enter}`)
    cy.get('[id="edit-state-selectized"]').type(`${data[0]['State of Residence']}{enter}`)
    cy.get('[id="edit-age-trip-cost-0"]').type(`${data[0]['Trip Cost Per Traveler'][0]}`)
    cy.wait(5000);
    cy.get('[id="edit-submit"]').click()


  })






})