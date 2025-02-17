# auth-template

Aplicación que ejemplifica un sistema básico con creación de cuentas de usuario e inicio de sesión.

Aplicación web básica que ejemplifica un sistema que incluye creación de cuentas de usuario, autenticación y autorización. También sirve como plantilla para sistemas pequeños. El frontend está creado con React, mientras que el backend está implementado dos veces, de modo que es posible elegir entre la implementación con PHP y la implementación con Express.

Tecnologías principales:
* En el frontend: Typescript 4.6, React 18.0
* Backend #1: PHP 8.3.17, MySQL 8
* Backend #2: Typescript 5.7, Express 4.21, PostgreSQL 12

## Instrucciones de desarrollo

Desde `./frontend-react/`:

Cree un archivo .env y establezca la variable con la dirección de la API. En `example.env` puede encontrar un ejemplo. 
Si aún no conoce esta dirección, primero lea en las siguientes secciones cómo configurar un servidor de prueba con la API.

Una vez hecho esto, descargue las dependencias y ejecute el proyecto de React en modo de desarrollo con
```
npm install
npm start
```
En el caso del backend, tiene dos opciones para elegir: Express o PHP. Se describen las instrucciones para ambos casos.

### Configurar backend con Express:

Desde `./backend-express/`:

Asegúrese de tener un usuario de PostgreSQL con contraseña establecida, y configurado para usar autenticación con contraseña. De lo contrario la aplicación no podrá acceder a la base de datos.
Cree una base de datos con el nombre que desee. Luego ejecute con psql el script `./auth_template.sql`. El siguiente es un ejemplo de cómo podría hacer esto:

```sh
PGPASSWORD=mi_contraseña psql -U mi_usuario -d postgres -c "CREATE DATABASE mi_base_de_datos;"

PGPASSWORD=mi_contraseña psql -U mi_usuario -d mi_base_de_datos -f ./backend-express/auth_template.sql
```

Cree un archivo `.env` y configure las variables de entorno. En `example.env` puede encontrar un ejemplo con el formato esperado.

Por último, instale las dependencias y ejecute el servidor de prueba con:
```sh
npm install
npm start
```

### Configurar backend con PHP:

Desde `./backend-php/`:

Ejecute con MySQL el script `auth_template.sql`.
```
mysql -u mi_usuario -pmi_contraseña < auth_template.sql
```

Cree un archivo `.env` y configure las variables de entorno. En `example.env` puede encontrar un ejemplo con el formato esperado.

Por último, instale las dependencias y ejecute el servidor de prueba con:
```sh
composer install
sudo php -S localhost:80 -t public
```

## Instrucciones de producción


### Usando express y nginx

Algunas de las instrucciones a continuación se valen de variables establecidas en un archivo ./backend-express/.env.production...

Cargar variables, crear base de datos:
```sh
source ./backend-express/.env.production

PGPASSWORD=$PG_PASSWORD psql -U $PG_USER -d postgres -c "CREATE DATABASE ${PG_DB};"
PGPASSWORD=$PG_PASSWORD psql -U $PG_USER -d $PG_DB -f ./backend-express/auth_template.sql
```

Instalar dependencias, crear build:
```sh
sudo apt update
sudo apt install -y nginx nodejs
sudo npm install -g pm2 typescript
cd ./backend-express && npm install && tsc
cd ../frontend-react && npm run build && cd ..
```

Copiar aplicación a la ruta del servidor (asumiendo que no está ahí):
```sh
mkdir ${NGINX_ROOT_PATH}
mv ./frontend-react/build "${NGINX_ROOT_PATH}frontend"
cp -r ./backend-express "${NGINX_ROOT_PATH}backend"
mv "${NGINX_ROOT_PATH}backend/.env.production" "${NGINX_ROOT_PATH}backend/.env"
```

Configure NGINX. Edite el archivo de configuración en `/etc/nginx/sites-available/default`:
```sh
sudo tee /etc/nginx/sites-available/default > /dev/null <<EOF
server {
  listen ${NGINX_PORT};
  server_name ${NGINX_SERVER_NAME};

  location / {
    root ${NGINX_ROOT_PATH}frontend;
    index index.html;
    try_files \$uri /index.html;
  }

  location /api/ {
    proxy_pass http://localhost:${NODE_PORT};
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
  }

  location /uploads/ {
    root ${NGINX_ROOT_PATH};
  }
}
EOF
```

Luego inicie los servidores con:
```sh
sudo systemctl restart nginx
pm2 start ${NGINX_ROOT_PATH}backend/dist/index.js
echo "¡Listo! Acceda a la aplicación desde http://${NGINX_SERVER_NAME}:${NGINX_PORT}"
```

### Usando php y apache2

Algunas de las instrucciones a continuación se valen de variables establecidas en un archivo ./backend-php/.env.production...

Cargar variables, crear base de datos:
```sh
source ./backend-php/.env.production

sudo mysql -u $DB_USER -p${DB_PASSWORD} < ./backend-php/auth_template.sql
```

Instalar dependencias, crear build:
```sh
cd ./backend-php
sudo apt update
sudo apt install apache2 php libapache2-mod-php php-cli php-mysql php-mbstring unzip curl
sudo apt-get install php8.3-mysql
composer install --no-dev --optimize-autoloader
cd ../frontend-react && npm run build && cd ..
```

Copiar aplicación a la ruta del servidor (asumiendo que no está ahí):
```sh
mkdir ${APACHE_ROOT_PATH}
cp -r ./frontend-react/build "${APACHE_ROOT_PATH}frontend"
cp -r ./backend-php ${APACHE_ROOT_PATH}backend
cp -f "${APACHE_ROOT_PATH}backend/.env.production" "${APACHE_ROOT_PATH}backend/.env"
```

Cambiar permisos de escritura:
```sh
sudo chown -R www-data:www-data ${APACHE_ROOT_PATH}backend/public/uploads
sudo chmod -R 775 ${APACHE_ROOT_PATH}backend/public/uploads
```


Configure apache2. Cree un archivo de configuración `/etc/apache2/sites-available/auth_template.conf`:

```sh
sudo tee /etc/apache2/sites-available/auth_template.conf > /dev/null <<EOF
<VirtualHost *:${APACHE_PORT}>
	ServerName ${APACHE_SERVER_NAME}
	DocumentRoot ${APACHE_ROOT_PATH}frontend

	<Directory ${APACHE_ROOT_PATH}frontend>
		Options -Indexes +FollowSymLinks
		AllowOverride All
		Require all granted

		RewriteEngine On

		RewriteCond %{REQUEST_FILENAME} !-f
		RewriteCond %{REQUEST_FILENAME} !-d

		RewriteRule ^ index.html [L]
	</Directory>

	Alias /api ${APACHE_ROOT_PATH}backend/public
	<Directory ${APACHE_ROOT_PATH}backend/public>
		Options -Indexes +FollowSymLinks
		AllowOverride All
		Require all granted

		RewriteEngine On
		RewriteCond %{REQUEST_FILENAME} !-f
		RewriteRule ^(.*)$ index.php [QSA,L]
	</Directory>

  	Alias /uploads ${APACHE_ROOT_PATH}backend/public/uploads
	<Directory ${APACHE_ROOT_PATH}backend/public/uploads>
		Options -Indexes +FollowSymLinks
		AllowOverride All
		Require all granted
	</Directory>

</VirtualHost>
EOF
```

Habilite los módulos de apache2 y active la configuración:
```sh
sudo a2enmod rewrite headers proxy proxy_http
a2ensite auth_template.conf
```

Puede que tenga que habilitar un nuevo puerto en `/etc/apache2/ports.conf`, agregando una línea como Listen n, para permitir que apache2 escuche en el puerto n, donde n es el puerto en el que pretende servir la aplicación.

Luego inicie el servidor usando:
```sh
sudo systemctl restart apache2
echo "¡Listo! Acceda a la aplicación desde http://${APACHE_SERVER_NAME}:${APACHE_PORT}"
```


# Información básica de requisitos del sistema

### Objetivos

`OBJ-1`: crear cuentas de usuario.
* Descripción: la aplicación debe permitir crear una cuenta de usuario. La cuenta de usuario consiste en un nombre de usuario, email, contraseña y foto de perfil.

`OBJ-2`: gestionar sesiones de usuario.
* Descripción: la aplicación debe permitir iniciar una sesión de usuario. El sistema tiene una pantalla principal que sólo es accesible cuando el sistema detecta una sesión válida activa.

### Requisitos de información

`IRQ-1`: información sobre usuarios.
* Objetivos asociados: OBJ-1.
* Datos:
    * Nombre de usuario.
    * Dirección de correo electrónico.
    * Contraseña.
    * Foto de perfil.

### Casos de uso

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

Resumen:
* Crear cuenta de usuario: `POST /api/users`
* Obtener información de la cuenta: `GET /api/users`
* Iniciar sesión: `POST /api/auth`
* Cerrar sesión: `DELETE /api/auth`
* Refrescar sesión: `PUT /api/auth`
* Subir foto de perfil: `POST /api/profile_photos`
* Recuperar foto de perfil: `GET /api/profile_photos`


### Crear cuenta de usuario
* Ruta de acceso: /api/users
* Método: POST
* Requiere autorización: no
* Input esperado (application/json):
```ts
{
  username: string,
  email: string,
  password: string
}
```
* Output (application/json):
```ts
{
  message: string
}
```

### Obtener información de la cuenta
* Ruta de acceso: /api/users
* Método: GET
* Requiere autorización: sí
* Output (application/json):
```ts
{
  message: string,
  content: {
    username: string,
    email: string
  }
}
```

### Iniciar sesión
* Ruta de acceso: /api/auth
* Método: POST
* Requiere autorización: no
* Input esperado (application/json):
```ts
{
  email: string,
  password: string
}
```
* Output (application/json):
```ts
{
  message: string 
}
```

### Cerrar sesión
* Ruta de acceso: /api/auth
* Método: DELETE
* Necesita autorización: no
* Output (application/json):
```ts
{
  message: string 
}
```

### Refrescar sesión
* Ruta de acceso: /api/auth
* Método: PUT
* Necesita autorización: sí
* Input esperado: ninguno
* Output (application/json):
```ts
{
  message: string 
}
```



### Subir foto de perfil
* Ruta de acceso: /api/profile_photos
* Método: POST
* Requiere autorización: sí
* Input esperado (multipart/form-data):
```ts
{
  profilePhoto: Blob
}
```
* Output (application/json):
```ts
{
  message: string,
  content: {
    profilePhotoURL: string
  }
}
```

### Obtener enlace a foto de perfil
* Ruta de acceso: /api/profile_photos
* Método: GET
* Requiere autorización: sí
* Output (application/json):
```ts
{
  message: string,
  content: {
    profilePhotoURL: string
  }
}
```