/// <reference types="Cypress"/>

/* Notas
ordenar el código alt+shift+f
"#" hace referencia a un elemento del tipo id
"." hace referencia a un elemento del tipo class
*/
//suite de pruebas
describe('Primer suite de pruebas', function () {
    beforeEach(() => {
        //Ingreso al sitio    
        cy.visit("http://automationpractice.com/index.php")


    })

    //caso 1
    /*
    it('Contabilizar la cantidad de elementos visibles en home', function(){
        //Paso 1
        //verifico cantidad de elementos visibles
        cy.get('#homefeatured .product-container').should('have.length',7)
        
        //Obtenemos el elemento homefeatured como parámetro
        cy.get('#homefeatured .product-container').as('ProductosPopulares')
    
        //Verifico usando el parámetro
        cy.get('@ProductosPopulares').should('have.length',7)
    })*/

    //caso 2
    /*
    it('Agregar el producto blusa al carrito desde la home', function(){
    
        //Obtenemos el elemento homefeatured como parámetro
        cy.get('#homefeatured .product-container').as('ProductosPopulares')
    
        //Iteramos para encontrar el producto con nombre x 
        cy.get('@ProductosPopulares') //me voy al contenedor
        .find('.product-name')//busco dentro del contenedor los elementos del tipo class product-name 
        .each(($el,index, $list) => { //itero dentro del contenedor que es del tipo array
            
            cy.get('@ProductosPopulares').eq(index).find('.price').then(function($el1){
                let precio = $el1.text()
                cy.log(precio)
        
            
            if($el.attr('title')==='Printed Dress' && precio.includes('50.99')){ //busco que cumpla la condición
                cy.log('se encontró el elemento buscado')
                cy.log('se encontró el precio buscado')
                cy.get('@ProductosPopulares').eq(index).contains('Add to cart').click()
            }
    
            })
        
    
            })
            cy.get('h2 > .ajax_cart_product_txt_s')
            .should('contain.text','\n						There are 1 items in your cart.'+
            '\n					')
            //.should('be.visible')
    })
    */
    //caso 3
    /*
    it('Verificamos que el drop down de women, tenga los elementos necesarios', function () {
     
        //Flotamos sobre un elemento
        cy.get('#block_top_menu > ul > li:nth-child(1) > ul').invoke('attr', 'style', 'display: block')
        cy.get('a[title="Tops"]').should('be.visible')
        cy.get('a[title="T-shirts"]').should('be.visible')
        cy.get('a[title="Blouses"]').should('be.visible')
        cy.get('a[title="Dresses"]').should('be.visible')
        cy.get('a[title^="Casual"]').should('be.visible') // con ^ me busca todo lo que empiece con Casual sin importar lo q sigue
        cy.get('a[title^="Evening"]').should('be.visible')
        cy.get('a[title^="Summer"]').should('be.visible')
    })
    */
    //caso 4
    /*
    it('Verificar que los checkboxes estan funcionando', function () {
        cy.get('.sf-menu > :nth-child(2) > .sf-with-ul').click()
        cy.get('li[class="nomargin hiddable col-lg-6"]:has(a[href*="categories-casual_dresses"]) input').check().should('be.checked')
        cy.get('li[class="nomargin hiddable col-lg-6"]:has(a[href*="categories-evening_dresses"]) input').should('not.be.checked')
        cy.get('li[class="nomargin hiddable col-lg-6"]:has(a[href*="categories-summer_dresses"]) input').should('not.be.checked')
    })
    */
    //caso 5
    /*
    it('Verificar que los dropdowns de arrelgo estén funcionando funcionando', function () {
        cy.get('.sf-menu > :nth-child(2) > .sf-with-ul').click()
        cy.get('#selectProductSort').select('In stock').should('have.value','quantity:desc')

    })
    */
    //caso 6
    it('Crear una compra desde cero', function () {
        cy.get('#search_query_top').type('Blouse')
        cy.get('#searchbox > .btn').click()
        cy.get('.product-container:has(.product-name[title="Blouse"]) .ajax_add_to_cart_button').click()
        cy.get('.button-medium[title="Proceed to checkout"]').click()
        cy.get('tr[id^=product]').find('.product-name > a').should('contain.text', 'Blouse')
        cy.get('tr[id^=product]').find('.price').should('contain.text', '27.00')
        cy.get('.cart_navigation > .button').click()
        cy.get('#email').type('cypress@ateneaconocimientos.net')
        cy.get('#passwd').type('Atenea')
        cy.get('#SubmitLogin').click()
        cy.get('.cart_navigation > .button').click()
        cy.get('#cgv').check().should('be.checked')
        cy.get('.cart_navigation > .button').click()
        cy.get('.bankwire').click()
        cy.get('.cart_navigation > .button').click()
        cy.get('.cheque-indent > .dark').should('contain.text','Your order on My Store is complete.')
    })
})
