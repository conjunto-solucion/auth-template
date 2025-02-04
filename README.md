# php-auth-api

Una API que ejemplifica un sistema básico con creación de cuentas de usuario, autenticación y autorización en PHP.

Las tecnologías usadas son:
* Backend: PHP 7.4.3.
* Base de datos: MySQL 8.


## Configurar y probar la aplicación para el desarrollo.

Cree un archivo `.env` en el directorio raíz y configure las variables de entorno. En `example.env` puede encontrar un ejemplo con el formato esperado.

Ejecute con MySQL el script `./php-auth-api-sql`.

Instale las dependencias y ejecute el servidor de prueba con:
```sh
composer install
sudo php -S localhost:80 ./public/index.php
```
(requiere composer 1 y php 7.4.3 o superior)

Puede hacer pruebas manualmente o usando algún cliente especializado (como Postman). En [este repositorio](https://github.com/conjunto-solucion/react-auth-client) encontrará un proyecto de React creado específicamente para probar esta API.

## Preparar la aplicación para producción.

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
|  frontend/ # contiene un proyecto compilado de React  
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

Configure apache2. Cree un archivo de configuración `/etc/apache2/sites-available/ejemplo.conf`. El archivo debería verse algo como esto:

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
Otorgue a apache2 para crear archivos en el directorio `api/uploads/` con:
```
sudo chown -R www-data:www-data /var/www/ejemplo/api/uploads
sudo chmod -R 775 /var/www/ejemplo/api/uploads
```

Luego inicie el servidor usando:
```sh
sudo a2ensite ejemplo.conf
sudo systemctl restart apache2
```

Acceda a la aplicación desde http://localhost:81/ y a la API desde http://localhost:81/api/.

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
* Ruta de acceso: /auth
* Método: GET
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
```ts
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