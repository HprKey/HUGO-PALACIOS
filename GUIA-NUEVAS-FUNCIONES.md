# HPR Digital — ampliación del portafolio

## Qué se añadió
- Planes web con cotización por WhatsApp.
- HPR Digital Academy con búsqueda y filtros.
- Carrito local con cantidades, total y preparación de pedido por WhatsApp.
- Integración al menú del portafolio original.

## Antes de publicar
1. Verifica el WhatsApp configurado en `js/main.js` y `js/store.js`.
2. La guía **Inteligencia Artificial desde Cero** está terminada y habilitada para solicitar por WhatsApp. Los otros tres productos siguen **próximamente**. Para habilitar los restantes, prepara y revisa el material y cambia `available:false` a `available:true` en `js/store.js`.
3. El carrito NO procesa pagos, no guarda pedidos en servidor y no envía archivos automáticamente.
4. Comprueba precios, plazos, información de contacto y políticas comerciales.
5. Añade aviso de privacidad y políticas legales definitivas antes de recoger datos o vender.

## Uso
Abre `index.html` o ejecuta un servidor local, por ejemplo `python -m http.server 8000` en la carpeta del proyecto. Publica como sitio estático en GitHub Pages o Netlify.

## Conservación
Se mantuvieron las imágenes, proyectos de demostración, plantillas, CV y lógica principal del portafolio original.

## Entrega de la guía IA
El PDF de venta se entrega **fuera del sitio web** tras verificar manualmente el pago. Se incluye en una carpeta separada del ZIP llamada `PRODUCTO_PRIVADO_NO_PUBLICAR`. No subas esa carpeta a GitHub Pages ni al hosting público. El carrito solo prepara pedidos por WhatsApp y no confirma pagos.
