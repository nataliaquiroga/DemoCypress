Feature: Primer suite de pruebas

    Este feature es para modificar test a formato cucumber

    Scenario: Crear una compra desde cero
        Given el usuario se encuentra en la pagina de compra
        And el usuario busca un articulo llamado blusa
        And agrega una blusa al carrito
        When agrega una blusa al carrito
        Then el valor del artículo es de 27 dolares
        When finaliza la comprade de los articulos
        Then el mensaje de orden completada deberia aparecer