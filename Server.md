# Servidor Web
Para correr el servidor, ejecutar los siguientes comandos
````sh
git clone https://github.com/erflod5/uSocialServer.git
cd uSocialServer
npm install
npm run dev
````
## Requisitos
### Node && NPM
````
https://nodejs.org/en/download/package-manager/
````

### Nodemon
Es una herramienta que ayuda a desarrollar aplicaciones basadas en node.js al reiniciar automáticamente la aplicación de nodo cuando se detectan cambios en el directorio.
````
npm i nodemon -d
````

### Express
Infraestructura web rápida, minimalista y flexible para Node.js
````
npm i express
````

### Aws-sdk
El SDK oficial de AWS para JavaScript, disponible para navegadores y dispositivos móviles, o backends de Node.js
````
npm i aws-sdk
````
### Typescript
TypeScript es un lenguaje de programación libre y de código abierto desarrollado y mantenido por Microsoft. Es un superconjunto de JavaScript, que esencialmente añade tipos estáticos y objetos basados en clases.

## Rutas
### User
#### ReadOne
* **Funcion:** Busca la información de un usuario en especifico.
* **Metodo:** GET
* **Formato de Envio:** No aplica
* **Params:** _id
* **Formato de Respuesta:** JSON
* **Estructura de Respuesta Correcta:**
````js
		{
			username : string,
			img : string,
			fullName :string
		}
````
* **Estructura de Respuesta Incorrecta:**
````js
		{
			status: false		
		}
````
* **Servicios utilizados:** Ninguno.

#### ReadMany
* **Funcion:** Busca la información de todos los usuarios
* **Metodo:** GET
* **Formato de Envio:** No aplica
* **Params:** Vacio
* **Formato de Respuesta:** JSON
* **Estructura de Respuesta Correcta:**
````js
		[
			{
				username : string,
				img : string,
				fullName :string
			}
		]
````
* **Estructura de Respuesta Incorrecta:**
````js
		{
			status: false		
		}
````
* **Servicios utilizados:** Ninguno.
* 
#### readFriends
* **Funcion:** Busca la información de los amigos de un usuario.
* **Metodo:** GET
* **Formato de Envio:** No aplica
* **Params:** _id
* **Formato de Respuesta:** JSON
* **Estructura de Respuesta Correcta:**
````js
		[
			{
				username : string,
				img : string,
				fullName :string
			}
		]
````
* **Estructura de Respuesta Incorrecta:**
````js
		{
			status: false		
		}
````
* **Servicios utilizados:** Ninguno.

#### create
* **Funcion:** Crea un nuevo usuario.
* **Metodo:** POST
* **Formato de Envio:**
````js
		{
			username : string,
			img : string,
			fullName :string,
			password : string,
			imgProfile : string
		}
````
* **Params:** Ninguno
* **Formato de Respuesta:** JSON
* **Estructura de Respuesta Correcta:**
````js
		{
			username : string,
			img : string,
			fullName :string
		}
````
* **Estructura de Respuesta Incorrecta:**
````js
		{
			status: false		
		}
````
* **Servicios utilizados:** Ninguno.
#### update
* **Funcion:** Actualiza la informacion de un usuario.
* **Metodo:** PUT
* **Formato de Envio:**
````js
		{
			username : string,
			fullName :string,
			password : string,
			imgProfile : string
		}
````
* **Params:** _id
* **Formato de Respuesta:** JSON
* **Estructura de Respuesta Correcta:**
````js
		{
			username : string,
			img : string,
			fullName :string
		}
````
* **Estructura de Respuesta Incorrecta:**
````js
		{
			status: false		
		}
````
* **Servicios utilizados:** Ninguno.
### Posts
#### create
* **Funcion:** Crea un nuevo post.
* **Metodo:** POST
* **Formato de Envio:**
````js
		{
			username : string,
			img : string,
			creationDate : Date,
			type : number,
			text : string
		}
````
* **Params:** Ninguno
* **Formato de Respuesta:** JSON
* **Estructura de Respuesta Correcta:**
````js
		{
			username : string,
			img : string,
			creationDate : Date,
			type : number,
			text : string
		}
````
* **Estructura de Respuesta Incorrecta:**
````js
		{
			status: false		
		}
````
* **Servicios utilizados:** Ninguno.

#### read
* **Funcion:** Lee todos los posts realizados.
* **Metodo:** GET
* **Formato de Envio:** No aplica
* **Params:** Ninguno
* **Formato de Respuesta:** JSON
* **Estructura de Respuesta Correcta:**
````js
		[
			{
				username : string,
				img : string,
				creationDate : Date,
				type : number,
				text : string
			}
		]
````
* **Estructura de Respuesta Incorrecta:**
````js
		[]
````
* **Servicios utilizados:** Ninguno.

### Login
#### login
* **Funcion:** Login del sistema.
* **Metodo:** POST
* **Formato de Envio:**
````js
		{
			username : string,
			password : string
		}
````
* **Params:** Ninguno
* **Formato de Respuesta:** JSON
* **Estructura de Respuesta Correcta:**
````js
		{
			username : string,
			imgProfile : string,
			fullname : string
		}
````
* **Estructura de Respuesta Incorrecta:**
````js
		{
			status: false		
		}
````
* **Servicios utilizados:** Ninguno.