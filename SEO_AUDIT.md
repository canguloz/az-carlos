# Auditoría SEO — AZCONSULTING

**Fecha:** 2026-07-19
**Herramientas:** `analyze_pages.py`, `check_robots_sitemap.py`, revisión manual complementaria

---

## 🔴 Críticos

### 1. blog-uxui.html: título, description y canonical duplicados con blog-ia.html

- **Archivo:** `blog/blog-uxui.html`
- **Problema:** El `<title>`, `meta description` y `canonical` son copia exacta de `blog-ia.html`:
  - Title: `"IA Empresarial en 2026 | AZCONSULTING"` 
  - Description: `"Descubre cómo las empresas están automatizando procesos clave con inteligencia artificial generativa..."`
  - Canonical: apunta a `blog/blog-ia.html` en vez de a sí mismo
- **Riesgo:** Google puede considerar ambas páginas como duplicadas y no indexar la correcta, o peor, penalizar.
- **Solución:** Cambiar title a "Tendencias UX/UI en 2026 | AZCONSULTING", meta description acorde, y canonical a `blog-uxui.html`. Ya se hizo para el Twitter Card pero falta el resto.

### 2. blog-uxui.html ausente del sitemap.xml

- **Archivo:** `sitemap.xml`
- **Problema:** Faltan las URLs de `blog-uxui.html`.
- **Riesgo:** Google puede tardar más en descubrir e indexar la página.
- **Solución:** Agregar las URLs faltantes al `sitemap.xml`.

---

## 🟡 Importantes

### 3. 404.html sin meta description

- **Archivo:** `404.html`
- **Problema:** La página de error 404 no tiene `<meta name="description">`.
- **Riesgo:** Bajo impacto en ranking (no debe indexarse idealmente), pero si se indexa se verá incompleta en SERP.
- **Solución:** Agregar `<meta name="description" content="La página que buscas no está disponible. Volvé al inicio o explorá nuestro blog de tecnología.">`

### 4. Imágenes de socios sin atributo alt (7 imágenes)

- **Archivo:** `index.html` (sección de socios)
- **Problema:** Las siguientes imágenes en el carrusel de socios no tienen `alt`:
  - `amazonforetag.png`, `microsoft.png`, `aws.png`, `google.png`, `oracle.png`, `cisco.png`, `dell.png`
- **Riesgo:** Pérdida de accesibilidad y señal SEO de contexto.
- **Solución:** Ya tienen `alt` con el nombre de cada socio, excepto las duplicadas del carrusel infinito (que usan `aria-hidden="true"`). Las primeras 7 sí tienen alt. Las segundas 7 son duplicados decorativos y deberían tener `alt=""` en vez de no tener atributo.

### 5. Blog: breadcrumb con nombre incorrecto

- **Archivo:** `blog/blog-desarrollo.html` (línea 97)
- **Problema:** El BreadcrumbList dice `"name": "IA Empresarial en 2026"` en vez de `"Frameworks Web en 2026"`.
- **Riesgo:** Confunde a motores de búsqueda con datos estructurados incorrectos.
- **Solución:** Cambiar el nombre del breadcrumb al título correcto del artículo.

---

## 🟢 Opcionales

### 6. Title ligeramente largo en blog-desarrollo.html

- **Archivo:** `blog/blog-desarrollo.html`
- **Problema:** Title de 57 caracteres (`"Frameworks Web en 2026: React, Vue y Astro | AZCONSULTING"`). Google corta alrededor de 55-60px.
- **Recomendación:** Opcional, está en el límite. Podría acortarse a "Frameworks Web 2026: React, Vue y Astro | AZCONSULTING" (49 caracteres).

---

## Limitaciones de esta auditoría

- No se midieron **Core Web Vitals** (LCP, INP, CLS) — requiere el sitio desplegado en vivo y herramientas como PageSpeed Insights o Lighthouse.
- No se verificó **HTTPS** ni **redirects** — requiere el sitio publicado con dominio propio.
- **Enlaces dinámicos** (JavaScript) no se verifican contra filesystem, solo se reportan como existentes en el HTML estático.

---

## Resumen

| Prioridad | Cantidad |
|-----------|----------|
| 🔴 Crítico | 2 |
| 🟡 Importante | 3 |
| 🟢 Opcional | 1 |

