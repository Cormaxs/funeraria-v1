# Documentación de Rutas inventario

## Recordar poner el token para las peticiones

### crea nuevo producto POST

  permisos -> admin, socios

```JSON
http://localhost:5000/api/inventario/products
```

```JSON
{
  "name": "Monitor Gamer 24\"",
  "sku": "MON-24-G",
  "description": "144Hz 1ms response time",
  "category": "Monitores",
  "price": 250.00,
  "minStock": 10
}
```

[ejemplo postman](https://www.postman.com/security-engineer-64827471/workspace/backend-facstock/request/41936041-ba2af251-7cbb-48a4-8016-526368fc0e76?action=share&source=copy-link&creator=41936041&ctx=documentation)

### obtener lista de productos GET

permisos -> cualquier usuario

```JSON
http://localhost:5000/api/inventario/products
```

[ejemplo postman](https://www.postman.com/security-engineer-64827471/workspace/backend-facstock/request/41936041-39cfdbc1-7c9b-406d-9454-c14e2148b8c7?action=share&source=copy-link&creator=41936041&ctx=documentation)

### Control de Stock POST

Registra una entrada o salida de mercadería. Si la operación falla, no se altera el stock

Permisos -> Cualquier usuario autenticado.

```JSON
http://localhost:5000/api/inventario/products/:productId/movement
```

```JSON
{
  "type": "salida",
  "reason": "venta",
  "quantity": 10,
  "notes": "Venta realizada por mostrador"
}
```

### Obtener un Producto por ID GET

permisos -> cualquier usuario

```JSON
http://localhost:5000/api/inventario/:id
```

```JSON
{
  "_id": "658b9876543210fedcba4321",
  "name": "Teclado Mecánico RGB",
  "sku": "TEC-001-PRO",
  "description": "Teclado switch blue con retroiluminación",
  "category": "Periféricos",
  "price": 4500.50,
  "stock": 15,
  "minStock": 5,
  "status": "activo"
}
```

[ejemplo postman](https://www.postman.com/security-engineer-64827471/workspace/backend-facstock/request/41936041-01d137dc-ac93-4bba-b541-ffcd7a326062?action=share&source=copy-link&creator=41936041&ctx=documentation)

### Actualizar Producto PUT

permisos -> solo admin

```JSON
http://localhost:5000/api/inventario/:id
```

```JSON
{
  "price": 4800.00,
  "description": "Edición limitada con switches red",
  "minStock": 8
}
```

[ejemplo postman](https://www.postman.com/security-engineer-64827471/workspace/backend-facstock/request/41936041-c0a11c11-fae7-462a-bc7c-98f88b2b027e?action=share&source=copy-link&creator=41936041&ctx=documentation)

### Eliminar Producto DELETE

permisos -> admin

```JSON
http://localhost:5000/api/inventario/:id
```

[ejemplo postman](https://www.postman.com/security-engineer-64827471/workspace/backend-facstock/request/41936041-74969ffd-1108-4744-b42e-1f8ac8e353af?action=share&source=copy-link&creator=41936041&ctx=documentation)

### Obtener Historial de Movimientos

permisos -> admin

parametros -> ?productId=ID_AQUÍ

```JSON
http://localhost:5000/api/inventario/movements/history?productId=ID_AQUÍ
```
