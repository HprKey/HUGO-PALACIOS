# Portafolio Hugo Palacios · HPR-KEY

Web estática (HTML + CSS + JavaScript). Sin npm, sin frameworks. Lista para GitHub Pages.

## 1. Estructura

```
portfolio-hugo-palacios/
├── index.html
├── css/style.css
├── js/main.js
├── assets/
│   ├── images/
│   │   ├── hugo-palacios.jpg       <- tu fotografía
│   │   ├── logo-hpr-key.png        <- tu logo
│   │   └── proyectos/              <- capturas de proyectos
│   ├── cv/CV-Hugo-Palacios.pdf     <- tu CV (cuando lo tengas)
│   └── icons/favicon.png           <- favicon (opcional)
└── README.md
```

## 2. Colocar tus archivos

1. Fotografía: guárdala como `assets/images/hugo-palacios.jpg`.
2. Logo: guárdalo como `assets/images/logo-hpr-key.png`.
3. CV: cuando lo tengas, guárdalo como `assets/cv/CV-Hugo-Palacios.pdf`.
4. Favicon: opcional, `assets/icons/favicon.png` (por ejemplo 64x64 px).

Respeta mayúsculas y minúsculas: GitHub Pages distingue `Foto.JPG` de `foto.jpg`.

## 3. Ver la web en tu computadora

- Opción simple: abre `index.html` con doble clic.
- Opción recomendada: en VS Code instala **Live Server** y pulsa "Go Live".

## 4. Agregar o editar proyectos

Todo se hace en `js/projects.js`. Copia el bloque de ejemplo, quita las `//` y completa nombre, categoría, descripción, tecnologías, imagen (opcional) y `url`.

- Con `url`, el botón **Vista previa** muestra el sitio en vivo dentro de una ventana.
- Algunos sitios bloquean ser mostrados dentro de otra página. Si pasa, la ventana tiene el botón para abrirlo en una pestaña nueva.
- Si no hay proyectos, la web muestra "Próximamente".

## 5. Capturas de proyectos

Guarda las imágenes en `assets/images/proyectos/` y escribe su ruta en el campo `imagen`.

## 6. Otros ajustes

- Número de WhatsApp: constante `WA_NUMBER` en `js/main.js`.
- Colores: variables al inicio de `css/style.css`.
- Textos animados del Hero: lista `ROLES` en `js/main.js`.
- Mensaje de cada servicio: atributo `data-service` de cada botón.

## 7. Subir a GitHub

1. Crea una cuenta en github.com y pulsa **New repository**.
2. Nombre sugerido: `portfolio-hugo-palacios`. Público. Crear.
3. En el repositorio pulsa **uploading an existing file**, arrastra TODO el contenido de la carpeta (no la carpeta contenedora: `index.html` debe quedar en la raíz) y pulsa **Commit changes**.

Con Git: `git init`, `git add .`, `git commit -m "Portafolio"`, `git branch -M main`, `git remote add origin URL`, `git push -u origin main`.

## 8. Activar GitHub Pages

1. Repositorio → **Settings** → **Pages**.
2. En **Source** elige **Deploy from a branch**.
3. Rama `main`, carpeta `/ (root)`, **Save**.
4. Espera 1 o 2 minutos.

## 9. Tu enlace público

`https://TU-USUARIO.github.io/portfolio-hugo-palacios/`

Si el repositorio se llama `TU-USUARIO.github.io`, el enlace será `https://TU-USUARIO.github.io/`.
