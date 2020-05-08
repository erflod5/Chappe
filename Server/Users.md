# Usuarios

## S3-admin
* **Nombre:** S3-admin
* **Clave de Acceso:** AKIAYZJK4JNQKUKJOR6I
* **Clave privada:** Z7cQG8RIpT5puXD1nb0sJhIuuu0UyPlSXm4V28g5
* **Permisos:** [AmazonS3FullAccess](https://console.aws.amazon.com/iam/home?region=us-east-2#/policies/arn%3Aaws%3Aiam%3A%3Aaws%3Apolicy%2FAmazonS3FullAccess)
* **Descripcion:** Usuario utilizado para el acceso al Bucket de S3 mediante NodeJs, con permisos de leer, escribir y eliminar archivos, esto debido a que el sistema puede guardar imagenes, leer imagenes y modificar la imagen de perfil, al hacer esto, eliminaria la imagen de perfil anterior.
* **Rol:** Administrador de S3.

## EC2-admin
* **Nombre:** EC2-G5
* **Clave de Acceso:** AKIARFT5QG3RF52U5GQO
* **Clave privada:** UvnHKYQh243tiqlO7xv2ksXBq6w+7OZo/9EtbIrM
* **Permisos:** EC2FullAccess
* **Descripcion:** Usuario utilizado para el manejo de instancias EC2, administrador y encargado de la creacion y el manejo correcto de estas instancias.
* **Rol:** Administrador de EC2.

## VPC-admin
* **Nombre:** VPC-G5
* **Clave de Acceso:** AKIARFT5QG3RGRWUMQBK    
* **Clave privada:** 7FHVoiiLru5WAG8JoCqSuQYC7yXa3Cv87AcFE0TO
* **Permisos:** VPCFullAccess
* **Descripcion:** Usuario utilizado para el manejo de VPC, administrador de las redes.
* **Rol:** Administrador de VPC.