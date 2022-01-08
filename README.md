# proyecto04: Ventas
Este proyecto contine varios scripts para la base de datos MongoDB. Realizado por Iván Gasent Zarza de 1 DAM.

## Base de datos
La base de datos contiene información sobre las ventas de una tienda de informática centrada en ventas a individuales en cantidades mayores a la normal. Cada documento tiene la siguiente estructura:
```
{
    producto: "Xiaomi Mi 11",
    precioUnidad: 389.35,
    cantidad: 2,
    fechaVenta: new Date("2019-12-27"),
    costeUnidad: 234.45,
    cliente: "Alex Tintor",
    vendedor: "Gustavo Magistrez",
    categoria: "telefono"
}
```
producto: alfanumérico con el nombre del artículo vendido.

precioUnidad: número con el precio del artículo vendido.

cantidad: número con la cantidad de artículos vendidos.

fechaVenta: fecha de la venta.

costeUnidad: número con el coste de cada unidad para la empresa.

cliente: alfanumérico con el nombre del comprador.

vendedor: alfanumérico con el nombre del vendedor que atendió al cliente.

categoria: alfanumérico con el nombre de la categoría a la que pertenece el artículo.


## Estructura
El repositorio tiene la siguiente estructura:
>README.md
>
>src
>>aggregateVentas.js
>>
>>insertVentas.js


La carpeta `src` contiene dos scripts, uno para insertar los datos de la base de datos y otro con enunciados y respuestas usando el comando aggregate.
