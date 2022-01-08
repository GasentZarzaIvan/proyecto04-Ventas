/*
Muestra la cantidad total de productos vendidos.
*/
db.productos.aggregate([{
    $group: {
        _id: "Productos",
        ProductosVendidos: {
            $sum: "$cantidad"
        }
    }
},
{
    $project: {
        _id: 0,
        ProductosVendidos: 1
    }
}
])

/*
Muestra el número de ventas de cada categoria.
*/
db.productos.aggregate([{
    $group: {
        _id: "$categoria",
        productos: { $count: {} }
    }
},
{
    $project: {
        _id: 0,
        categoria: "$_id",
        productos: "$productos"
    }
},
{
    $sort: { categoria: 1 }
}])

/*
Muestra el precio pagado en cada venta, que producto se vendió, 
cuando se realizó y quienes la llevaron a cabo.
*/
db.productos.aggregate([
    {
        $group: {
            _id: {
                id: "$_id",
                producto: "$producto",
                cantidad: "$cantidad",
                precioUnidad: "$precioUnidad",
                fechaVenta: "$fechaVenta",
                cliente: "$cliente",
                vendedor: "$vendedor"
            },
        }
    },
    {
        $project: {
            _id: 0,
            producto: "$_id.producto",
            precioTotal: {
                $multiply: ["$_id.cantidad", "$_id.precioUnidad"]
            },
            fechaVenta: "$_id.fechaVenta",
            cliente: "$_id.cliente",
            vendedor: "$_id.vendedor"
        }
    }]).pretty()

/*
Muestra la media de los beneficios de cada categoria según año.
*/
db.productos.aggregate([{
    $group: {
        _id: {
            año: {
                $year: "$fechaVenta"
            },
            categoria: "$categoria"
        },
        pago: {
            $avg: {
                $multiply: ["$cantidad", "$precioUnidad"]
            }
        },
        coste: {
            $avg: {
                $multiply: ["$cantidad", "$costeUnidad"]
            }
        }
    }
},
{
    $project: {
        _id: 0,
        categoria: "$_id.categoria",
        año: "$_id.año",
        beneficios: { $round: [{ $subtract: ["$pago", "$coste"] }, 2] }
    }
},
{
    $sort: { categoria: 1, año: 1 }
}
])

/*
Muestra al empleado que más teléfonos
 haya vendido antes de junio de 2019
*/
db.productos.aggregate([{
    $match: {
        $and: [
            { $expr: { $lte: [{ $year: "$fechaVenta" }, 2019] } },
            { $expr: { $lt: [{ $month: "$fecha_venta" }, 6] } },
            { categoria: { $regex: /tel.fono/i } }
        ]
    }
},
{
    $group: {
        _id: "$vendedor",
        cantidad: {
            $sum: "$cantidad"
        }
    }
},
{
    // Esta fase sirve para recoger el mayor vendedor, guardando en maximoVendedor el objeto reunido por $max.
    // Al ser _id:null no se agrupan valores
    $group: {
        _id: null,
        maximoVendedor: {
            $max: {
                "cantidad": "$cantidad",
                "nombre": "$_id"
            }
        }
    }
},
{
    $project: {
        _id: 0,
        nombre: "$maximoVendedor.nombre",
        cantidad: "$maximoVendedor.cantidad"
    }
}
])

/*
Muestra el precio a pagar de la compra más cara si se aplica un descuento del 20%.
*/
db.productos.aggregate([{
    $group: {
        _id: "$producto",
        precio: {
            $max: { $multiply: ["$cantidad", "$precioUnidad"] }
        },

    }
},
{
    $group: {
        _id: null,
        maximaCompra: {
            $max: {
                "precio": "$precio",
                "nombre": "$_id"
            }
        }
    }
},
{
    $project: {
        _id: 0,
        producto: "$maximaCompra.nombre",
        precio: "$maximaCompra.precio",
        precioDescuento: {
            $round: [{
                $subtract: [
                    "$maximaCompra.precio",
                    { $divide: ["$maximaCompra.precio", 5] }
                ]
            },
                2]
        }
    }
}
])