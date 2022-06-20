# Aplicación para citas médicas

## Utilizar el proyecto en desarrollo

Se requiere tener node.js instalado

Clonar el proyecto:

```
git clone git@github.com:EduardoAyora/citas-medicas.git
```

Ingresar en el proyecto:

```
cd citas-medicas
```

Instalar las dependencias:

```
npm install
```

Crear un archivo nombrado .env y establecer las variables de entorno

```
DATABASE_URL="postgresql://postgres:URLdelaBase"
JWT_SECRET="SecretoParaElToken"
NEXTAUTH_URL=http://localhost:3000
```