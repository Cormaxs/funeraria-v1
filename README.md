# Backend funeraria

Proyecto Backend para una funeraria (MVP), es una API rest, dividida en 3 modulos(auth, socios, inventario) individuales reutulizables en futuros proyectos.

## indice

* [Auth](./doc/autenticacion.md)
* [Asociados](./doc/asociados.md)
* [Inventario](./doc/ges-inv.md)
* [General](./doc/general.md)
* [Modulos](./doc/modulos.md)

## requrimientos

* Node
* npm

## Pasos de instalacion

1) clonar el repositorio

```JSON
    git clone https://github.com/Cormaxs/funeraria-v1
```

2) ejecutar el siguiente comando dentro de la carpeta creada al clonarlo.

```JSON
    npm install
```

1) estando en la posicion /src ejecutar el comando.

```JSON
    node app.js
```

## Formato de variables de entorno

Crear el archivo .env en la hubicacion /src/.env , donde esta app.js.

```JSON
PORT=5000
MONGO_URI=mongodb://admin-db:ejemplo-de-uri-mongo-db
JWT_SECRET=la-clave-que-deberia-ir
```

## Dependencias

* bcryptjs -> 3.0.3
* cors -> 2.8.5
* dotenv -> 17.2.3
* express -> 5.2.1
* joi -> 18.0.2
* jsonwebtoken -> 9.0.3
* mongoose -> 9.0.2
* morgan -> 1.10.1
