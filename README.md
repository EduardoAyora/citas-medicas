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
DATABASE_URL="postgresql://postgres:v9aZjFb7wSvXrf8lboYN@containers-us-west-54.railway.app:7107/railway"
NEXTAUTH_SECRET="secEsEstoYn4di3pu3EEEcuvvrir47361"
NEXTAUTH_URL=http://localhost:3000
```

Ejecutar el servidor de desarrollo

```
npm run dev
```

En el navegador ingresar a `http://localhost:3000/login` y se puede ingresar los siguientes usuarios:

* Secretario: En el usuario poner `karen` y la contraseña `123`
* Doctor: En el usuario poner `edu` y la contraseña `123`
* Admin: En el usuario poner `admin` y la contraseña `123`
