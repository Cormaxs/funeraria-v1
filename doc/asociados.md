# Routes asociados test

## estructura de los datos

```JSON
{
  "fullName": "Distribuidora Logística S.A.",
  "documentId": "NIT-900456789-2",
  "type": "proveedor",
  "status": "activo",
  "userId": "658a1234567890abcdef1234",
  "history": [
    {
      "action": "Creación",
      "date": "2023-10-27T10:00:00.000Z",
      "details": "Registro inicial del proveedor en el sistema"
    }
  ],
  "_id": "658b9876543210fedcba4321",
  "createdAt": "2023-10-27T10:00:00.000Z",
  "updatedAt": "2023-10-27T10:00:00.000Z"
}
```

### Todas las rutas necesitan token del usuario creado anteriormente, osea el admin

* Create Associate (POST)
  
```JSON
http://localhost:5000/api/asociados
```

```JSON
{
  "fullName": "Juan Pérez",
  "documentId": "20-12345678-9",
  "type": "socio_activo",
  "status": "activo"
}
```

[ejemplo postman](https://www.postman.com/security-engineer-64827471/workspace/backend-facstock/request/41936041-dd8d5586-9d35-40f2-a3ad-05bf2cc13481?action=share&source=copy-link&creator=41936041&ctx=documentation)

* Get asociados (GET)

```JSON
http://localhost:5000/api/asociados?type=socio_activo&status=activo
```

[ejemplo postman](https://www.postman.com/security-engineer-64827471/workspace/backend-facstock/request/41936041-b18ff453-204e-4cfb-ab71-ba7e4c140554?action=share&source=copy-link&creator=41936041&ctx=documentation)

* Update Associate (PUT)

```JSON
http://localhost:5000/api/asociados/ID_DEL_ASOCIADO
```

```JSON
{
  "fullName": "Juan Pérez Modificado",
  "type": "cliente_vip"
}
```

[ejemplo postman](https://www.postman.com/security-engineer-64827471/workspace/backend-facstock/request/41936041-7a1e9aa6-d684-4c90-95ff-f95d7f414c8c?action=share&source=copy-link&creator=41936041&ctx=documentation)

* Toggle actividad asociados (PUT)

```JSON
PATCH http://localhost:5000/api/asociados/ID_DEL_ASOCIADO/status
```

```JSON
{ "status": "inactivo" o "inactivo" }
```

[ejemplo postman](https://www.postman.com/security-engineer-64827471/workspace/backend-facstock/request/41936041-2a42b713-cc8b-44dc-b4d4-965753f8fee7?action=share&source=copy-link&creator=41936041&ctx=documentation)
