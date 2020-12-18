# Contributing

Antes de contribuir en este repositorio, por favor
 * lee el [README.md](https://github.com/faztcommunity/xfazt-bot/blob/main/README.md),
 * visita nuestros [issues](https://github.com/faztcommunity/xfazt-bot/issues),
 * revisa la [wiki](https://github.com/faztcommunity/xfazt-bot/wiki),
 * lee nuestro [CODE_OF_CONDUCT.md](https://github.com/faztcommunity/xfazt-bot/blob/main/.github/CODE_OF_CONDUCT.md),
 * lee los [lineamientos de nuestra comunidad](https://faztcommunity.github.io/fazt-community-docs),
 * considera formar parte de la discusión en nuestra comunidad de [Discord](https://discord.gg/rg3fKr6) o en [Discussions](https://github.com/faztcommunity/xfazt-bot/discussions),
 * si es tu primera vez, lee un resumen de cómo contribuir: [Contribuir por primera vez en Github](https://gist.github.com/EnzoDiazDev/31e73d0573142d0573eb58d69a5158fd),
 * termina de leer este archivo. 

Crea un issue planteando el problema a resolver y espera una respuesta. </br>
Sé amable en la discusión y permite que los desarrolladores principales ofrezcan su ayuda para resolver los problemas.</br>
Siéntete libre de crear cualquier issue que tengas en mente. Todas las ideas son bienvenidas, pero asegúrate que ésta no haya sido planteada con anterioridad.

## Objetivo

FaztBot nace con la necesidad de administrar el servidor de la comunidad en Discord, de forma fácil y personalizada, incorporando avanzadas técnicas de moderación y logging.<br>

A su vez, este es un proyecto de espíritu colaborativo, por lo que toda la construcción del proyecto gira en torno al opensource y el aprendizaje. 

<!-- Como desarrollo en paralelo, se lleva a cabo una librería que aporta funcionalidades antispam y antiraid en los servidors de Discord. <br>
Para más información: https://github.com/faztcommunity/DBS/ -->

## Contribuir
Si es tu primera vez, considera nuevamente leer mi [guía](https://gist.github.com/EnzoDiazDev/31e73d0573142d0573eb58d69a5158fd)
Tanto para pull requests como para nuevos issues, usa los labels adecuados.

### Primeros pasos
En la raíz del proyecto, ejecuta el comando `npm i`.<br>
Crea un archivo `.env` también en la raiz del proyecto y añade tus variables de entorno. <br>
Crea y trabaja sobre una nueva rama.<br>

Lee los [issues](https://github.com/faztcommunity/xfazt-bot/issues), selecciona la tarea, y desarrolla la solución. 

Para picar código, no olvides tener la extension [eslint](https://eslint.org/) instalada en tu editor de código favorito. 

Realiza tus cambios y asegurate de abarcar unicamente la tarea encomendada.

Ejecuta `npm run dev` y verifica que todo funcione. 

#### Variables de entorno 
Asegurate de tener las variables de entorno esenciales para correr los tests o la totalidad de las funcionalidades. <br>
*Aquellas funcionalidades que dependan de una apikey o similar, lanzaran un error que será mostrado por consola, sin afectar el funcionamiento de otras funcionalidades.*

 * TOKEN_BOT - [*?*](https://discord.com/developers/)

### Estructura
*En progreso...*
```
project/
├── src/
│   └── Main.ts
│
├── .env
├── package.json
├── .gitignore
├── tsconfig.json
├── .eslintrc.json
└── ...
```

`package.json`, `.gitignore`, `tsconfig.json`, `.eslintrc.json`, entre otros, son los archivos de configuración del entorno. Estos nos definen algunas reglas de estilo que hay que respetar.

En todo el proyecto a lógica es la misma: Cada archivo exporta por defecto una clase o una función con el mismo nombre del archivo.</br>
Evitá lo mas posible el uso de funciones individuales.

Para poder realizar un Pull Request, primero debe de haber un issue.

### Dependencias
Para conocer las dependencias visita la wiki.
<!--url a la wiki-->

### Estilo
Programar con estilo es clave. <br>
Algunas buenas prácticas: 
* Sigue las reglas del linter.
* Define las variables y nombres de funciones en `snake_case` minúsculas.
* Evita a toda costa el código ofuscado. Una linea, una instrucción.
* Usa los [JSDoc](https://jsdoc.app/) SIEMPRE
* Una función/método, una acción. 
* Evita más de dos parámetros por función/método, sino se entiende que esa función hace demasiadas cosas.
* Define los tipos de datos siempre, incluyendo los de retorno. 
* Colocale nombres descriptivos a las funciones/métodos. Asegúrate que éstas o hagan exactamente lo que dice su nombre.
* Evitar las funciones anonimas en funciones que no son anónimas.
* Usar comillas doble `"` para manejar strings.
* Siempre declarar parametros con su respectivo tipo.
* Usar el paradigma orientado a objetos.
* Patrones predominantes: Observer, Decorador, Delegación

La documentación se puede hacer en español (recomendado para este proyecto) o ingles, como quieras.

### Esqueleto
Conoce la estructura principal, el esqueleto de la aplicación en<br>
https://github.com/faztcommunity/xfazt-bot/wiki/Manifiesto-xFazt-bot

