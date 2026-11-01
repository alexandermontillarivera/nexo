# Nexo · Prototipo logístico

Interfaz en español con Astro, CSS y JavaScript sin dependencias de UI.

## Ejecutar

```sh
npm install
npm run dev
```

Abrir la dirección que muestra Astro (normalmente http://localhost:4321).

```sh
npm run build
npm start
```

## Funcionalidades

- Resumen con indicadores y mapa esquemático de República Dominicana.
- Búsqueda y filtros de envíos.
- Programación de envíos con cliente, mercancía, peso, chofer, camión y horarios.
- Validación de rutas, fechas y coincidencias de horario para un mismo chofer.
- Detalle y transición de estados: Programado → En tránsito → Entregado.
- Vistas de referencia de flota, choferes, rutas y mercancías.
- Persistencia local de envíos y diseño adaptable con navegación móvil.

Es un prototipo: no tiene backend ni conexión con una base de datos o GPS. El mapa y los kilómetros son ilustrativos; flota, rutas y catálogo son datos de referencia. Los envíos se conservan en localStorage del navegador. Para reiniciar, borrar la clave `nexo-shipments` del almacenamiento local.

## Rutas

- / — Resumen
- /envios — Gestión de envíos
- /flota — Camiones
- /choferes — Equipo
- /rutas — Orígenes y destinos
- /mercancias — Catálogo

Astro renderiza las seis rutas en el servidor con el adaptador de Node en modo standalone. La navegación sincroniza la URL y admite los botones atrás y adelante. Node se gestiona externamente con fnm.

## Producción

`npm run build` genera el servidor. `npm start` ejecuta `dist/server/entry.mjs`. Puedes configurar la dirección y el puerto con las variables de entorno `HOST` y `PORT`. Node se gestiona con fnm.
