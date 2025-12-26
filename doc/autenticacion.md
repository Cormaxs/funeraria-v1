# Routes CRUD auth

## Estructura en base de datos

```JSON
{
  "email": "admin@empresa.com",
  "password": "password123",
  "role": "admin"
}
```

### test de rutas

* register (publico) POST
  
```JSON
http://localhost:5000/api/auth/register
```

```JSON
{
  "email": "admin@empresa.com",
  "password": "password123",
  "role": "admin"
}
```

[ejemplo postman](https://www.postman.com/security-engineer-64827471/workspace/backend-facstock/request/41936041-2c4cf281-d6d2-4ffa-92ee-82d24d9b6f15?action=share&creator=41936041&ctx=documentation)

* Login (Público)

```JSON
POST http://localhost:5000/api/auth/login
```

```JSON
{
  "email": "admin@empresa.com",
  "password": "password123"
}
```

[ejemplo postman](https://www.postman.com/security-engineer-64827471/workspace/backend-facstock/request/41936041-25bcd2c2-f01d-45a0-9141-aa7e1cac23a6?action=share&creator=41936041&ctx=documentation)

### Para las rutas protegidas es necesario copiar el token dado por el backend

```JSON
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NGRlYTc0MTYwYzZkMzJiMTBlZTM4YiIsImlhdCI6MTc2NjcxMzk3MiwiZXhwIjoxNzY2ODAwMzcyfQ.IFa1FtXRJGXA6VZPUBJM-2ElRO6owxitXTKtOXhDgbY
```

* Ver Perfil (Protegido)

```JSON
GET http://localhost:5000/api/auth/profile
```

```JSON
{
  "Authorization": "Bearer TU_TOKEN_AQUI"
}
```

[ejemplo postman](https://www.postman.com/security-engineer-64827471/workspace/backend-facstock/request/41936041-f972054b-64bf-4cea-910b-2a12cc4f7735?action=share&creator=41936041&ctx=documentation)

* Actualizar Usuario (Solo Admin)

```JSON
POST http://localhost:5000/api/auth/update/ID_DEL_USUARIO
```

```JSON
{
  "Authorization": "Bearer TU_TOKEN_AQUI"
}
```

```JSON
{
  "role": "socio"
}
```

[ejemplo postman](https://www.postman.com/security-engineer-64827471/workspace/backend-facstock/request/41936041-6b4c2722-d220-437e-a9d3-d3c0b9760922?action=share&source=copy-link&creator=41936041&ctx=documentation)

* Eliminar Usuario (Solo Admin)

```JSON
DELETE http://localhost:5000/api/auth/delete/ID_DEL_USUARIO
```

```JSON
{
  "Authorization": "Bearer TU_TOKEN_AQUI"
}
```

[ejemplo postman](https://www.postman.com/security-engineer-64827471/workspace/backend-facstock/request/41936041-3103f2df-671d-4e68-8a6f-c5b325fe5ac8?action=share&source=copy-link&creator=41936041&ctx=documentation)
