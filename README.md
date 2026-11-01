# Nexo Â· Prototipo logÃ­stico

Interfaz en espaÃ±ol con Astro, CSS y JavaScript sin dependencias de UI.

## Ejecutar

```sh
npm install
npm run dev
```

Abrir la direcciÃ³n que muestra Astro (normalmente http://localhost:4321).

```sh
npm run build
npm run preview
```

## Funcionalidades

- Resumen con indicadores y mapa esquemÃ¡tico de RepÃºblica Dominicana.
- BÃºsqueda y filtros de envÃ­os.
- ProgramaciÃ³n de envÃ­os con cliente, mercancÃ­a, peso, chofer, camiÃ³n y horarios.
- ValidaciÃ³n de rutas, fechas y coincidencias de horario para un mismo chofer.
- Detalle y transiciÃ³n de estados: Programado â†’ En trÃ¡nsito â†’ Entregado.
- Vistas de referencia de flota, choferes, rutas y mercancÃ­as.
- Persistencia local de envÃ­os y diseÃ±o adaptable con navegaciÃ³n mÃ³vil.

Es un prototipo: no tiene backend ni conexiÃ³n con una base de datos o GPS. El mapa y los kilÃ³metros son ilustrativos; flota, rutas y catÃ¡logo son datos de referencia. Los envÃ­os se conservan en localStorage del navegador. Para reiniciar, borrar la clave `nexo-shipments` del almacenamiento local.

## Rutas

- / â€” Resumen
- /envios â€” GestiÃ³n de envÃ­os
- /flota â€” Camiones
- /choferes â€” Equipo
- /rutas â€” OrÃ­genes y destinos
- /mercancias â€” CatÃ¡logo

Astro genera las seis rutas estÃ¡ticas. La navegaciÃ³n sincroniza la URL y admite los botones atrÃ¡s y adelante. Node se gestiona externamente con fnm.
