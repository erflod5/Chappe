# AWS
## Usuarios
### Erik
* **Nombre:** Erik Flores
* **Rol:** Development
* **Descripcion:** Usuario encargado del desarrollo backend del proyecto.
* **Grupos:** BackendDevelop
* **Politicas Asociadas:** TranslateReadOnly, ChappeS3

### Luis
* **Nombre:** Luis Vargas
* **Rol:** Development
* **Descripcion:** Usuario encargado del desarrollo backend del proyecto.
* **Grupos:** BackendDevelop
* **Politicas Asociadas:** TranslateReadOnly, ChappeS3

## Administradores

### S3_Admin
* **Nombre:** Erik Flores
* **Rol:** Administrador
* **Descripcion:** Usuario encargado de la creacion, monitoreo y mantenimiento de Buckets en S3.
* **Grupos:** Acces_S3
* **Politicas Asociadas:** AmazonS3FullAccess

### Translate_Admin
* **Nombre:** Erik Flores
* **Rol:** Administrador
* **Descripcion:** Usuario encargado del monitoreo de las métricas de Aws Translate.
* **Politicas Asociadas:** TranslateFullAccess

### EC2_Admin:
* **Nombre:** Luis Vargas
* **Rol:** Administrador
* **Descripcion:** Usuario encargado del manejo, creacion, monitoreo y mantenimiento de EC2.
* **Politicas Asociadas:** AmazonEC2FullAccess

## Grupos
### BackendDevelop
* **Descripcion:** Grupo de desarrolladores backend del proyecto uSocialBot
* **Politicas Asociadas:** TranslateReadOnly, ChappeS3
 
### EC2G
* **Descripcion:** Grupo de administrador con permiso de acceso a EC2.
* **Politicas Asociadas:** AmazonEC2FullAccess

### IAGruop
* **Descripcion:** Grupo de administradores de Aws Translate
* **Politicas Asociadas:** TranslateFullAccess

## Politicas
### ChappeS3
* **Descripcion:** Politica creada para el acceso seguro al Bucket de uSocialBot, excluyendo el acceso a cualquier otro bucket que no sea este.
* **JSON:**
````js
	{
	    "Version": "2012-10-17",
	    "Statement": [
	        {
	            "Sid": "sfd3828daj",
	            "Effect": "Allow",
	            "Action": "s3:*",
	            "Resource": [
	                "arn:aws:s3:::usocial",
	                "arn:aws:s3:::usocial/*"
	            ]
	        }
	    ]
	}
````
