# php-auth-api

Una API que ejemplifica un sistema básico con creación de cuentas de usuario, autenticación y autorización en PHP.

Las tecnologías usadas son:
* Backend: PHP 7.4.3.
* Base de datos: MySQL 8.


## Configurar y probar la aplicación para el desarrollo.

Cree un archivo `.env` en el directorio raíz y configure las variables de entorno. En `example.env` puede encontrar un ejemplo con el formato esperado.

Instale las dependencias y ejecute el servidor de prueba con:
```sh
composer install
sudo php -S localhost:80 ./public/index.php
```
(requiere composer 1 y php 7.4.3 o superior)

Puede hacer pruebas manualmente o usando algún cliente especializado (como Postman). En [este repositorio](github.com/conjunto-solucion/react-auth-client) encontrará un proyecto de React creado específicamente para probar esta API.

## Preparar la aplicación para producción.

Instale dependencias con:
```sh
composer install --no-dev --optimize-autoloader
```

Copie el proyecto en el directorio público del servidor (por ejemplo: `/var/www/html/`)

Configure el servidor. El siguiente es un ejemplo con apache2 desde `sites-available/php-auth-api.conf`:
```apache
<VirtualHost *:80>
    DocumentRoot /var/www/php-auth-api/public

    <Directory /var/www/php-auth-api/public>
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/php-auth-api_error.log
    CustomLog ${APACHE_LOG_DIR}/php-auth-api_access.log combined
</VirtualHost>
```
Luego inicie el servidor usando:
```sh
sudo a2enmod headers
sudo a2ensite php-auth-api.conf
sudo systemctl restart apache2
```


## Descripción de los endpoints

**Crear cuenta de usuario.**
* Ruta de acceso: /users
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
  content: {
    accessToken: string,
    refreshToken: string
  }
  message: string
}
```

**Iniciar sesión.**
* Ruta de acceso: /users
* Método: PUT
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
  content: {
    accessToken: string,
    refreshToken: string
  },
  message: string 
}
```

**Verificar y refrescar token.**
* Ruta de acceso: /users
* Método: HEAD
* Necesita autorización: sí
* Responde con estado 200
* Input: ninguno
* Output:
```ts
{
  content: {
    accessToken: string,
    refreshToken: string
  },
  message: string 
}
```


**Recuperar información de la cuenta.**
* Ruta de acceso: /users
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
* Ruta de acceso: /profile_photos
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
```
{
  message: string
}
```

**Recuperar foto de perfil.**
* Ruta de acceso: /profile_photos
* Método: GET
* Requiere autorización: sí
* Responde con estado 200
* Input: ninguno
* Output: `blob`