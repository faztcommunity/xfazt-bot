# Contributing

Antes de contribuir en este repositorio, por favor
 * lee el [README.md](https://github.com/faztcommunity/xfazt-bot/blob/master/README.md),
 * lee nuestro [CODE_OF_CONDUCT.md](https://github.com/faztcommunity/xfazt-bot/blob/master/CODE_OF_CONDUCT.md),
 * visita nuestros [issues](https://github.com/faztcommunity/xfazt-bot/issues),
 * lee los [lineamientos de nuestra comunidad](https://faztcommunity.github.io/fazt-community-docs)
 * considera formar parte de la discusión en nuestra comunidad de [Discord](https://discord.gg/rg3fKr6),
 * si es tu primera vez, lee un resumen de cómo contribuir: [Contribuir por primera vez en Github](https://gist.github.com/EnzoDiazDev/31e73d0573142d0573eb58d69a5158fd)
 * termina de leer este archivo. 

Crea un issue planteando el problema a resolver y espera una respuesta. </br>
Sé amable en la discusión y permite que los desarrolladores principales ofrezcan su ayuda para resolver los problemas.</br>
Siéntete libre de crear cualquier issue que tengas en mente. Todas las ideas son bienvenidas, pero asegúrate que ésta no haya sido planteada con anterioridad.

## Objetivo

FaztBot nace con la necesidad de administrar el servidor de la comunidad en Discord, de forma fácil y personalizada, incorporando avanzadas técnicas de moderación y logging.<br>

A su vez, este es un proyecto de espíritu colaborativo, por lo que toda la construcción del proyecto gira en torno al opensource y el aprendizaje. 

En un inicio, fazt-bot debería ser capaz de:
 * Mediante una orden, moderar usuarios.
   * Warn, mute, kick, ban, etc, añadiendo y notificando el motivo. 
 * Prevenir ataques de spam, estafas, multicuentas y otras técnicas que rompan las reglas del servidor. 
 * Manejar un ranking de usuarios y contribuidores de la comunidad. 
 * Muchos comandos de utilidad y de no mucha utilidad, pero interesantes. 

## Contribuir
Si es tu primera vez, considera nuevamente leer mi [guía](https://gist.github.com/EnzoDiazDev/31e73d0573142d0573eb58d69a5158fd) 
Recuerda seguir los [lineamientos de contribución](https://faztcommunity.github.io/fazt-community-docs) de Fazt Community

### Primeros pasos
En la raíz del proyecto, ejecuta el comando `npm i`.<br>
Crea una nueva rama.<br>

*En progreso...*

Ejecuta `npm run dev` y verifica que todo funcione. 

Para picar código, no olvides tener la extension [eslint](https://eslint.org/) instalada en tu editor de código favorito. 

Lee los [issues](https://github.com/faztcommunity/xfazt-bot/issues), selecciona la tarea, y desarrolla la solución. 

#### Variables de entorno 
Asegurate de tener las variables de entorno esenciales para correr los tests o la totalidad de las funcionalidades. <br>
*Aquellas funcionalidades que dependan de una apikey o similar, lanzaran un error que será mostrado por consola, sin afectar el funcionamiento de otras.*

*En progreso...*

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
* cross-env:<br>
*descripción...*

* dotenv:<br>
*descripción...*

* eslint:<br>
*descripción...*

* eslint-config-prettier:<br>
*descripción...*

* husky:<br>
*descripción...*

* nodemon:<br>
*descripción...*

* prettier:<br>
*descripción...*

* ts-node:<br>
*descripción...*

* typescript:<br>
*descripción...*


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
* Evitar las funciones flechas en funciones no anónimas.
* Usar doble comillas `"` para manejar strings.
* Siempre declarar variable con su respectivo tipo.
* Usar el paradigma orientado a objetos.
* Patrones a usar: decorador y delegación.

La documentación se puede hacer en español (recomendado para este proyecto) o ingles según su preferencia.
