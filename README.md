<p align="center">
  <a href="https://www.cypress.io"><img src="https://cloud.githubusercontent.com/assets/1268976/20607953/d7ae489c-b24a-11e6-9cc4-91c6c74c5e88.png"/></a>
</p>
<p align="center">
  <a href="https://on.cypress.io">Documentation</a> |
  <a href="https://on.cypress.io/changelog">Changelog</a> |
  <a href="https://on.cypress.io/roadmap">Roadmap</a>
</p>


## Use cypress


```bash
npm install cypress

npx cypress open
```

## API


you need to know
context() is just an alias for describe()
https://mochajs.org/#bdd

cy.get()
https://docs.cypress.io/api/commands/get

cy.contains()
```
cy.get('.nav').contains('About')
```
https://docs.cypress.io/api/commands/contains



## cypress.json
{
  // "baseUrl": "http://localhost:3000",
  "ignoreTestFiles": "**/2-advanced-examples/*"
}