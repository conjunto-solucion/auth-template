# auth-template

Aplicación que ejemplifica un sistema básico con creación de cuentas de usuario e inicio de sesión.

Aplicación web básica que ejemplifica un sistema que incluye creación de cuentas de usuario, autenticación y autorización. También sirve como plantilla para sistemas pequeños. El frontend está creado con React, mientras que el backend está implementado dos veces, de modo que es posible elegir entre la implementación con PHP y la implementación con Express.

Tecnologías principales:
* En el frontend: Typescript 4.6, React 18.0
* Backend #1: PHP 7.4, MySQL 8
* Backend #2: Typescript 5.7, Express 4.21, PostgreSQL 12



## Instrucciones para el backend con PHP

Puede ignorar esta sección si desea usar el backend implementado con Express.

Desde `./backend-php/`:

Cree un archivo `.env` y configure las variables de entorno. En `example.env` puede encontrar un ejemplo con el formato esperado.

Ejecute con MySQL el script `auth_template.sql`.

Instale las dependencias y ejecute el servidor de prueba con:
```sh
composer install
sudo php -S localhost:80 ./public/index.php
```
(requiere composer 1 y php 7.4.3 o superior)



A continuación se explica cómo configurar la aplicación para producción:

Instale dependencias con:
```sh
composer install --no-dev --optimize-autoloader
```

Para este ejemplo voy a asumir lo siguiente:

* El servidor es **apache2**
* El servidor escucha en localhost:80, y las llamadas a la API comienzan con localhost:80/api/
* La aplicación subida al servidor tiene la siguiente estructura:
```sh
/var/www/ejemplo/
|  frontend/ # proyecto compilado de react
|  api/ # contiene este proyecto de PHP
|  | public/index.php
|  | src/
|  | uploads/
```

Verifique que tiene instalados los siguientes paquetes:
```
sudo apt install apache2 php libapache2-mod-php php-cli php-mysql php-mbstring unzip curl
```

Habilite los módulos necesarios de apache2:
```
sudo a2enmod rewrite headers proxy proxy_http
```

Configure apache2. Cree un archivo de configuración `/etc/apache2/sites-available/ejemplo.conf`:

```apache
<VirtualHost *:80>
	ServerName localhost
	DocumentRoot /var/www/ejemplo/frontend

	<Directory /var/www/ejemplo/frontend>
		Options -Indexes +FollowSymLinks
		AllowOverride All
		Require all granted

		RewriteEngine On

		RewriteCond %{REQUEST_FILENAME} !-f
		RewriteCond %{REQUEST_FILENAME} !-d

		RewriteRule ^ index.html [L]
	</Directory>

	Alias /api /var/www/ejemplo/api/public
	<Directory /var/www/ejemplo/api/public>
		Options -Indexes +FollowSymLinks
		AllowOverride All
		Require all granted

		RewriteEngine On
		RewriteCond %{REQUEST_FILENAME} !-f
		RewriteRule ^(.*)$ index.php [QSA,L]
	</Directory>

	ErrorLog ${APACHE_LOG_DIR}/ejemplo_error.log
	CustomLog ${APACHE_LOG_DIR}/ejemplo_access.log combined
</VirtualHost>
```
Otorgue a apache2 permisos para crear archivos en el directorio `api/uploads/` con:
```
sudo chown -R www-data:www-data /var/www/ejemplo/api/uploads
sudo chmod -R 775 /var/www/ejemplo/api/uploads
```

Luego inicie el servidor usando:
```sh
sudo a2ensite ejemplo.conf
sudo systemctl restart apache2
```

Acceda a la aplicación desde `http://localhost:80/` y a la API desde `http://localhost:80/api/`.



## Instrucciones para el backend con Express

Puede ignorar esta sección si desea usar el backend implementado con PHP.

Desde `./backend-express/`:

Asegúrese de tener un usuario de PostgreSQL con contraseña establecida, y configurado para usar autenticación con contraseña.

Ejecute con psql el script `auth_template.sql`.

Cree un archivo `.env` y configure las variables de entorno. En `example.env` puede encontrar un ejemplo con el formato esperado.

Instale las dependencias y ejecute el servidor de prueba con:
```sh
npm install
npm start
```

A continuación se explica cómo configurar la aplicación para producción:

Transpile el proyecto a JavaScript con
```
tsc
```
Esto genera un directorio `dist/` con el proyecto transpilado.

Para este ejemplo voy a asumir lo siguiente:

* El servidor proxy es **NGINX**
* El servidor NGINX escucha en localhost:80, y el backend (con node) se ejecuta en localhost:2222
* La aplicación subida al servidor tiene la siguiente estructura:
```sh
/var/www/ejemplo/
|  frontend/ # proyecto compilado de react
|  backend/ # proyecto de express
|  | dist/
|  | src/
|  uploads/
```

Verifique que tiene instalados los siguientes paquetes:
```
sudo apt update
sudo apt install nginx -y
```

Configure NGINX. Edite el archivo de configuración en `/etc/nginx/sites-available/default`:

```nginx
server {
  listen 80;
  server_name localhost;

  location / {
    root /var/www/ejemplo/frontend;
    index index.html;
    try_files $uri /index.html;
  }

  location /api/ {
    proxy_pass http://localhost:2222;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

Con esta configuración: las peticiones a localhost:80/api/ son redirigidas a localhost:2222 para ser resueltas por el proceso de node.
Las demás peticiones a localhost:80 son resueltas por el mismo NGINX, devolviendo el frontend.


Luego inicie los servidores con:
```sh
sudo systemctl restart nginx
sudo node /var/www/ejemplo/backend/dist
```

Si desea que la API siga ejecutandose luego de cerrar la terminal, ejecute el proyecto con pm2:
```
pm2 start /var/www/ejemplo/backend/dist/index.js
```

Acceda a la aplicación desde `http://localhost:80/` y a la API desde `http://localhost:80/api/`

## Instrucciones para el frontend

Puede ignorar esta sección si desea usar un cliente distinto del proyecto de React en este repositorio.

Desde `./frontend-react/`:

Cree un archivo .env y establezca la variable con la dirección de la API. Puede ver un ejemplo en `example.env`. Si aún no conoce esta dirección o no hay un servidor en ejecución con alguno de los dos backends, la aplicación no será utilizable.

Descargue las dependencias y ejecute el proyecto en modo de desarrollo con

```
npm install
npm start
```

Para compilar el proyecto use
```
npm run build
```
Luego mueva la carpeta generada `./frontend` a la ruta pública del servidor según se especifica en la documentación de alguno de los dos backends.


# Información básica de requisitos del sistema.

### Objetivos.

`OBJ-1`: crear cuentas de usuario.
* Descripción: la aplicación debe permitir crear una cuenta de usuario. La cuenta de usuario consiste en un nombre de usuario, email, contraseña y foto de perfil.

`OBJ-2`: gestionar sesiones de usuario.
* Descripción: la aplicación debe permitir iniciar una sesión de usuario. El sistema tiene una pantalla principal que sólo es accesible cuando el sistema detecta una sesión válida activa.

### Requisitos de información.

`IRQ-1`: información sobre usuarios.
* Objetivos asociados: OBJ-1.
* Datos:
    * Nombre de usuario.
    * Dirección de correo electrónico.
    * Contraseña.
    * Foto de perfil.

### Casos de uso.

`UC-1`: Crear cuenta de usuario.
* Objetivos asociados: OBJ-1.
* Precondición: no existe una cuenta correspondiente a los datos que dispone el usuario no registrado.
* Secuencia:
    1. El usuario ingresa a la aplicación.
    2. El sisema solicita al usuario que inicie una sesión.
    3. El usuario selecciona la opción para crear una nueva cuenta.
    4. El sistema solicita al usuario los datos de la nueva cuenta.
    5. El usuario ingresa los datos y solicita la creación de la cuenta.
    6. El sistema intenta crear la cuenta.
    7. Si hubo un fallo, el sistema muestra al usuario un mensaje de error.
    8. Si no hubo un fallo, el sistema abre una sesión de usuario con la cuenta recién creada, y redirige al usuario a la página principal.
* Postcondición: se ha registrado un nuevo usuario.

`UC-2`: iniciar sesión.
* Objetivos asociados: OBJ-2.
* Precondición: el usuario está registrado y conoce su email y su contraseña.
* Secuencia:
    1. El usuario ingresa a la aplicación.
    2. El sistema carga el formulario para iniciar sesión.
    3. El usuario ingresa su email y su contraseña, y selecciona una opción para iniciar sesión.
    4. El sistema intenta iniciar sesión.
    5. Si los datos son incorrectos, muestra un mensaje de error al usuario.
    6. Si la sesión sesión se pudo iniciar correctamente, el sistema redirige al usuario a la paǵina principal.
* Postcondición: se guardó una sesión en la memoria (por ejemplo, las cookies), que le permite al usuario acceder a las funcionalidades del servidor y ver la paǵina principal.

`UC-3`: cerrar sesión.
* Objetivos asociados: OBJ-2.
* Precondición: el usuario tiene una sesión activa.
* Secuencia:
    1. El usuario selecciona una opción en la interfaz para cerrar la sesión.
    2. El sistema borra los datos de la sesión y redirige a la página de inicio de sesión.
* Postcondición: la sesión del usuario fue borrada de la memoria.

## Descripción de los endpoints

**Crear cuenta de usuario.**
* Ruta de acceso: /api/users
* Método: POST
* Tipo de contenido: application/json
* Requiere autorización: no
* Responde con estado 201
* Input:
```ts
{
  username: string,
  email: string,
  password: string
}
```
* Output:
```ts
{
  message: string
}
```

**Iniciar sesión.**
* Ruta de acceso: /api/auth
* Método: POST
* Tipo de contenido: application/json
* Necesita autorización: no
* Responde con estado 200
* Input:
```ts
{
  email: string,
  password: string
}
```
* Output:
```ts
{
  message: string 
}
```

**Cerrar sesión.**
* Ruta de acceso: /api/auth
* Método: DELETE
* Necesita autorización: no
* Responde con estado 200
* Input: ninguno
* Output:
```ts
{
  message: string 
}
```

**Verificar y refrescar token.**
* Ruta de acceso: /api/auth
* Método: PUT
* Necesita autorización: sí
* Responde con estado 200
* Input: ninguno
* Output:
```ts
{
  message: string 
}
```


**Recuperar información de la cuenta.**
* Ruta de acceso: /api/users
* Método: GET
* Requiere autorización: sí
* Responde con estado 200
* Input: ninguno
* Output:
```ts
{
  message: string
  content: {
    username: string,
    email: string
  }
}


```
**Subir foto de perfil.**
* Ruta de acceso: /api/profile_photos
* Método: POST
* Tipo de contenido: multipart/form-data
* Requiere autorización: sí
* Responde con estado 200
* Input:
```ts
{
  profilePhoto: Blob
}
```
* Output:
```ts
{
  message: string
}
```

**Recuperar foto de perfil.**
* Ruta de acceso: /api/profile_photos
* Método: GET
* Requiere autorización: sí
* Responde con estado 200
* Input: ninguno
* Output: `blob`