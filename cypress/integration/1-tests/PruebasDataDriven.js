/// <reference types="Cypress"/>
 
// Suite de casos de prueba avanzados 
describe('Segundo conjunto de casos de pruebas avanzadas', function () {
    before(function () {
        //Cargamos los valores del archivo example.json en un objeto de datos
        cy.fixture('example').then(function (datos) {
            this.datos = datos
            cy.fixture(this.datos.imagen).as('imagen')
 
        })
    })
    beforeEach(() => {
        //Ingresamos a la pagina de formulario
        cy.visit('https://demoqa.com/automation-practice-form')
    })
 
    //Caso 7
    it('Lleanmos nuestro primer formulario utilizando data', function () {
        cy.get('#firstName').type(this.datos.nombre)
        cy.get('#lastName').type(this.datos.apellido)
        cy.get('#userEmail').type(this.datos.email)
        cy.get('input[name="gender"][value="' + this.datos.sexo + '"]').check({ force: true }).should('be.checked')//con force true fuerzo que clicke el check aunque exista un elemento sobre el check
        cy.get('#userNumber').type(this.datos.telefono)
        cy.get('#dateOfBirthInput').click()
        cy.get('.react-datepicker__month-select').should('be.visible').select(this.datos.fechaDeNacimiento[0])
        cy.get('.react-datepicker__year-select').should('be.visible').select(this.datos.fechaDeNacimiento[1])
        cy.get('.react-datepicker__day--0' + this.datos.fechaDeNacimiento[2]).should('be.visible').click()
        cy.get('#dateOfBirthInput')
            .should('contain.value', this.datos.fechaDeNacimiento[0].substring(0, 3))
            .should('contain.value', this.datos.fechaDeNacimiento[1])
            .should('contain.value', this.datos.fechaDeNacimiento[2])
        cy.get('.subjects-auto-complete__value-container').type(this.datos.materia)
        cy.get('div[id^="react-select-"]').click()
        cy.get('.subjects-auto-complete__value-container').should('contain.text', this.datos.materia)
        cy.get("div[class='custom-control custom-checkbox custom-control-inline']:has(label:contains('" + this.datos.hobbies[0] + "')) input").check({ force: true }).should('be.checked')
        cy.get("div[class='custom-control custom-checkbox custom-control-inline']:has(label:contains('" + this.datos.hobbies[1] + "')) input").check({ force: true }).should('be.checked')
 
        cy.get('#uploadPicture').then(function ($el) {
            //convertir la imagen en un string de base64
            const blob = Cypress.Blob.base64StringToBlob(this.imagen, 'image/png')
 
            const file = new File([blob], this.datos.imagen, { type: 'image/png' })
            const list = new DataTransfer()
 
            list.items.add(file)
            const myFileList = list.files
 
            $el[0].files = myFileList
            $el[0].dispatchEvent(new Event('change', { bubbles: true }))
        })
 
        cy.get('#currentAddress').type(this.datos.direccion)
        cy.get('#state').click().find("div:contains('" + this.datos.estado + "')[id*='react-select']").should('be.visible').click()
        cy.get('#city').click().find("div:contains('" + this.datos.ciudad + "')[id*='react-select']").should('be.visible').click()
        cy.get('#submit').click()
 
        //Aserciones
 
        cy.get('#example-modal-sizes-title-lg')
            .should('have.text', 'Thanks for submitting the form')
 
        cy.get('td:contains(Student Name) +td') // como es td, busco el principal y con + el hermano relacionado
            .should('have.text', this.datos.nombre + " " + this.datos.apellido)//el " "  es porque tengo un espacio entre nombre y apellido
 
        cy.get('td:contains(Student Email) +td')
            .should('have.text', this.datos.email)
 
        cy.get('td:contains(Gender) +td')
            .should('have.text', this.datos.sexo)
 
 
        cy.get('td:contains(Mobile) +td')
            .should('have.text', this.datos.telefono)
 
 
        cy.get('td:contains(Date of Birth) +td')
            .should('have.text', this.datos.fechaDeNacimiento[2] + " "
                + this.datos.fechaDeNacimiento[0] + ","
                + this.datos.fechaDeNacimiento[1])
 
 
        cy.get('td:contains(Subjects) +td')
            .should('have.text', this.datos.materia)
 
 
        cy.get('td:contains(Hobbies) +td')
            .should('have.text', this.datos.hobbies[0] + ", " + this.datos.hobbies[1])
 
 
        cy.get('td:contains(Picture) +td')
            .should('have.text', this.datos.imagen)
 
 
        cy.get('td:contains(Address) +td')
            .should('have.text', this.datos.direccion)
 
 
        cy.get('td:contains(State and City) +td')
            .should('have.text', this.datos.estado + " " + this.datos.ciudad)
    })
 
})