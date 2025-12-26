# Backend funeraria

Backend de funeraria (MVP), es una API rest, dividida en 3 modulos individuales reutulizables en futuros proyectos.<br>

+ autentificacion
+ asociados
+ gestion de inventario

Se usa Clean Architecture para el backend.

## 1) Módulo de Autenticación y Autorización

### Rrequerimientos funcionales

+ Registro y Login : Soporte para email/password.
  
+ Gestion de sesiones : Implementación de JWT.
  
+ Manejo de roles : Definición de permisos (Admin, Usuario, etc).
  
+ Recuperacion de cuentas : Flujo de "olvidé mi contraseña" vía email.(a futuro)

+ Hashing : bcrypt.
  
+ Middleware de validacion : Un componente que verifique el token en cada petición antes de llegar a los otros módulos.

[Documentacion de auth](./doc/autenticacion.md)

## 2) Módulo de Gestión de Asociados

+ CRUD de Asociados
  
+ Categorización : Clasificar asociados (ej. Proveedor, Cliente VIP, Socio activo).
  
+ Historial de Actividad : Registro de las interacciones principales del asociado con el sistema.
  
+ Búsqueda y Filtros: Filtrado por estado, fecha de alta.

+ Validación de Identidad : Reglas para evitar duplicidad de documentos o emails.

+ Relación con Auth: El asociado debe estar vinculado a un user_id del módulo de Login.

[Documentacion de Asociados](./doc/asociados.md)

## 3) Módulo de Gestión de Inventario

+ Catálogo de Productos: Gestión de nombres, SKUs, categorías y descripciones.
  
+ Control de Stock: Registro de cantidades actuales y alertas de "stock bajo".
  
+ Movimientos de Inventario: Registro de entradas (compras/devoluciones) y salidas (ventas/mermas).
  
+ Transaccionalidad: Asegurar que si una salida de stock falla, no se registre el movimiento (Atomicidad).

+ Trazabilidad: Auditoría de quién modificó el stock y en qué fecha.

[Documentacion de Inventario](./doc/ges-inv.md)
