# Feature: mobile-header-overlay

## Objetivo

El header (navbar) debe verse también en móvil, reducido a logo + botón hamburguesa. Al pulsar el
botón se abre un overlay a pantalla completa con estética coherente con la web (oscuro tipo tinta,
`neutral-800`, texto claro), minimalista, con los enlaces grandes y centrados. El overlay se cierra
con el icono X y también al elegir cualquier enlace.

## Estado de partida (explorado)

- `src/components/Navbar.astro` es el único header. Hoy: `hidden md:flex` en el `<header>`, por lo
  que **en móvil (<768px) el header no se ve en absoluto**; el menú desplegable (`#menu`) existe solo
  entre `md` y `lg`, con el mismo `<ul>` que en escritorio más un botón `#menuBtn` (`lg:hidden`).
- Los enlaces salen de `src/lib/routes.ts` (4 rutas) y `Navbar.astro` añade manualmente el enlace
  `#contact` ("Contacto") que hace scroll al bloque de contacto.
- `src/layouts/Layout.astro`: `<html class="scroll-smooth">` y el `<Navbar />` fuera del flujo
  normal de secciones; el `<div>` contenedor es `flex min-h-screen flex-col` con
  `bg-gray-50 bg-[url('pattern.png')]`.
- Convenciones visuales a respetar: título con `font-title`; secciones oscuras con `bg-neutral-800`
  + `text-neutral-100`; radios `rounded-xl`; bordes `neutral-200`; transiciones suaves.
- El icono X no existe como asset; se dibuja con spans/CSS o SVG inline (evitar dependencias).

## Decisiones tomadas con el usuario

1. Estética del overlay: **oscuro tipo tinta** (`bg-neutral-800`, enlaces `text-neutral-100`,
   tamaño grande), coherente con las secciones de contacto y el footer.
2. Git: rama `feat/mobile-header-overlay` con **commits por unidad de trabajo**. Sin push ni merge.

## Tareas

- [x] T1. Hacer visible el header en móvil con logo + botón hamburguesa, sin enlaces en el header.
- [x] T2. Overlay a pantalla completa (oscuro, enlaces grandes y centrados, logo + X).
- [x] T3. Interacciones: abrir con hamburguesa, cerrar con X, cerrar al elegir enlace, bloqueo de
      scroll del body, Escape, foco y ARIA correctos.
- [x] T4. Comprobar que escritorio (>=1024px) queda igual y que tablet (768–1023px) usa el overlay
      en lugar del antiguo desplegable.
- [x] T5. Verificación funcional con navegador real (Puppeteer) en 390 / 768 / 900 / 1440 px sobre
      las 4 páginas, más `astro check` y `astro build`.
- [ ] T6. Añadir aire sobre el primer enlace del overlay hasta ~100px (el primer intento usó un
      sesgo de centrado y quedó en 226px).
- [ ] T7. Añadir padding superior solo en móvil dentro de la primera sección de las páginas de
      inicio, láser y estética (no en FAQ) para que el header no quede tan cerca.

## Superficies de edición (real)

- `src/components/Navbar.astro`: header visible en todos los anchos, overlay `#mobileMenu` y script
  de interacciones.
- `src/assets/icons/Menu.astro` y `src/assets/icons/Close.astro`: iconos nuevos con la misma base que
  el resto del set (24×24, `stroke-width: 2`, `stroke: currentColor`, `fill: none`).
- No hizo falta tocar paddings de ningún hero: la captura móvil de las 4 páginas no muestra solape.

## Fuera de alcance

- Cambiar la estética de escritorio, el contenido de `routes.ts`, o el bloque de contacto.
- Animaciones complejas, dropdowns, o submenús.
- Defecto preexistente detectado en `src/components/Link.astro` (ver abajo), no corregido aquí.

## Evidencia de verificación

Commit de la implementación: `b583e89`.

- `node ./node_modules/astro/astro.js check` → 0 errores, 0 warnings, 1 hint preexistente
  (`Link` sin usar en `Team.astro`).
- `node ./node_modules/astro/astro.js build` → 4 páginas construidas, sin errores.
- Puppeteer, 40 comprobaciones, todas en PASS:
  - móvil 390 y 430: header visible con logo + hamburguesa y sin enlaces; overlay ocupa viewport
    completo (`1024×768`/`fixed`), fondo `rgb(38, 38, 38)`; 5 enlaces en orden
    (Inicio, Láser, Estética, FAQ, Contacto), centrados, 30px; aire sobre el primer enlace de 96px
    (`pt-24` con la lista alineada arriba, tras el ajuste de T6); foco pasa a la X;
    `aria-expanded=true`, scroll del body bloqueado, header `inert`.
  - cierre verificado por los tres caminos: X (recupera foco en la hamburguesa y desbloquea),
    Escape, y clic en enlace (`#contact` cierra y hace scroll; ruta cierra y navega).
  - tablet 768 / 900 / 1023: header con hamburguesa, sin desplegable embebido, overlay a 36px.
  - escritorio 1440: sin hamburguesa, overlay oculto, 5 enlaces en orden y estilos calculados
    idénticos al estado previo (`16px`, `padding 12px 24px 8px`, borde `2px`, radio `8px`, fondo
    transparente, `Sporting Grotesk`).
- CSS compilado: `.overflow-hidden`, `.mt-16` y `.size-11` presentes (la clase que añade el script se
  genera correctamente).
- Revisión visual por captura en 390px (4 páginas) y del overlay en 390 y 900px: sin solape del
  header con el contenido.

### Errores de test corregidos durante la verificación

La primera corrida dio 10 FAIL que resultaron ser defectos del test, no del producto:
`offsetParent` es `null` en elementos `position: fixed`; el filtro `href="/"` descartaba también el
enlace "Inicio"; la URL de Astro no lleva barra final; y `font-family` se calcula entre comillas.
Dos defectos reales sí aparecieron y se corrigieron: faltaba la clase `flex` en el overlay (el
`flex-1` no estiraba y la lista no quedaba centrada) y el sesgo de aire superior era insuficiente.

## Pendiente / siguiente paso

- Defecto preexistente en `src/components/Link.astro`: al pasar `class` a `<Link>` se emiten **dos
  atributos `class`** en el HTML (`class:list` + `{...props}`), así que el navegador ignora el
  segundo y las sobrescrituras de clase no se aplican (afecta a los botones de `Contact.astro`).
  Requiere decisión del usuario antes de tocarlo, porque cambia el aspecto de botones existentes.
- El resto de cambios del árbol de trabajo (`Contact.astro`, `routes.ts`, `equipo.astro`,
  `Gallery.astro`) permanecen sin commitear, fuera de esta feature.
