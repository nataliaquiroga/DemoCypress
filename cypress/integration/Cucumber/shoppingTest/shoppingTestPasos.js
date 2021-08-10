import {Given,When,Then,And} from "cypress-cucumber-preprocessor/steps";
Given('el usuario se encuentra en la pagina de compra',()=>{
    cy.visit("http://automationpractice.com/index.php")
})
And('el usuario busca un articulo llamado blusa',()=>{
  
    cy.get('#search_query_top').type('Blouse')
    cy.get('#searchbox > .btn').click()
})
And('agrega una blusa al carrito',()=>{
    cy.get('.product-container:has(.product-name[title="Blouse"]) .ajax_add_to_cart_button').click()
    cy.get('.button-medium[title="Proceed to checkout"]').click()
})
Then('el valor del artículo es de 27 dolares',()=>{
    cy.get('tr[id^=product]').find('.product-name > a').should('contain.text', 'Blouse')
    cy.get('tr[id^=product]').find('.price').should('contain.text', '27.00')
})
When('finaliza la comprade de los articulos',()=>{
    cy.get('.cart_navigation > .button').click()
    cy.get('#email').type('cypress@ateneaconocimientos.net')
    cy.get('#passwd').type('Atenea')
    cy.get('#SubmitLogin').click()
    cy.get('.cart_navigation > .button').click()
    cy.get('#cgv').check().should('be.checked')
    cy.get('.cart_navigation > .button').click()
    cy.get('.bankwire').click()
    cy.get('.cart_navigation > .button').click()
})