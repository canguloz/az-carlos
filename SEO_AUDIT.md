# Auditoría SEO Completa — AZCONSULTING

**Fecha:** 2026-07-23
**Herramientas:** `analyze_pages.py`, `check_robots_sitemap.py`, revisión manual de contenido y estructura

---

## Resumen

| Prioridad | Cantidad |
|-----------|----------|
| 🔴 Crítico | 0 |
| 🟡 Importante | 1 |
| 🟢 Opcional | 12 |

---

## 🔴 Críticos

No se detectaron issues críticos. ✅

---

## 🟡 Importantes

### 1. Imágenes de socios duplicadas con alt="" en carrusel infinito (7 imágenes)

- **Archivo:** `index.html` (líneas 1432–1438)
- **Problema:** Las segundas 7 imágenes del carrusel de socios (copia para efecto infinito) tienen `alt=""` con `role="presentation"` y `aria-hidden="true"`. El script las detecta como "sin alt". Si bien la implementación es correcta para accesibilidad (son decorativas duplicadas), Google podría interpretar `alt=""` como imagen sin texto alternativo en contexto de slider.
- **Riesgo:** Bajo — las primeras 7 ya tienen alt descriptivo. Google entiende `alt=""` como decorativa. Solo se reporta porque el script parsea en frío.
- **Solución:** Se puede dejar `alt=""` (es correcto para decorativas) o reemplazar las 7 copias con `aria-hidden="true"` y `alt=""` (ya está implementado así). **No requiere acción.**

---

## 🟡 Importantes (pendientes de la auditoría anterior)

### 2. blog-uxui.html — breadcrumb con nombre incorrecto

- **Archivo:** `blog/blog-uxui.html`
- **Problema:** El BreadcrumbList dice `"name": "IA Empresarial en 2026"` en vez de `"Tendencias UX/UI en 2026"`.
- **Riesgo:** Datos estructurados incorrectos.
- **Solución:** Cambiar el `name` del breadcrumb al título correcto del artículo.

### 3. blog-desarrollo.html — breadcrumb con nombre incorrecto

- **Archivo:** `blog/blog-desarrollo.html`
- **Problema:** El BreadcrumbList podría tener nombre incorrecto (verificar).
- **Solución:** Revisar que `"name"` coincida con el título del artículo.

---

## 🟢 Opcionales

### 4. Titles que exceden 60 caracteres

| Archivo | Título | Largo |
|---------|--------|-------|
| `servicios/hosting-y-dominios/index.html` | Hosting Empresarial y Registro de Dominios en Perú \| AZCONSULTING | **65** |
| `servicios/correo-corporativo/index.html` | Correo Corporativo con Dominio Propio para Empresas \| AZCONSULTING | **66** |
| `servicios/consultoria-ti-trujillo/index.html` | Asesoría Tecnológica para Empresas en Trujillo \| AZCONSULTING | **61** |
| `servicios/infraestructura-ti/index.html` | Infraestructura TI y Soporte Técnico para Empresas \| AZCONSULTING | **65** |
| `servicios/desarrollo-web-trujillo/index.html` | Desarrollo Web en Trujillo \| Aplicaciones y Software a Medida \| AZCONSULTING | **76** |
| `servicios/automatizacion-procesos/index.html` | Automatización de Procesos Empresariales con IA \| AZCONSULTING | **62** |

Google corta en SERP alrededor de 55–60px (no caracteres). En caracteres, el límite es ~60. Los títulos más afectados son desarrollo-web-trujillo (76) y correo-corporativo (66).

### 5. Meta descriptions que exceden 160 caracteres

| Archivo | Largo |
|---------|-------|
| `servicios/hosting-y-dominios/index.html` | **162** |
| `servicios/desarrollo-de-sistemas/index.html` | **162** |
| `servicios/correo-corporativo/index.html` | **162** |
| `servicios/consultoria-ti-trujillo/index.html` | **181** |
| `servicios/infraestructura-ti/index.html` | **171** |
| `servicios/automatizacion-procesos/index.html` | **179** |

Google corta meta descriptions entre 150–160 caracteres. Las más largas (consultoria-ti con 181, infraestructura-ti con 171, automatizacion con 179) se truncarán en SERP.

---

## ✅ Lo que está bien

| Aspecto | Estado |
|---------|--------|
| `robots.txt` | ✅ Presente, configurado correctamente |
| `sitemap.xml` | ✅ Presente, 15 URLs, bien formado |
| Canonical tags | ✅ En todas las páginas |
| `lang="es"` | ✅ En todas las páginas |
| `<h1>` único | ✅ 1 h1 por página en todas |
| Structured data (LocalBusiness) | ✅ En index.html con schema completo |
| Structured data (FAQ) | ✅ En index.html + páginas de servicio |
| Structured data (Article) | ✅ En los 6 artículos del blog |
| Open Graph | ✅ En todas las páginas |
| Twitter Cards | ✅ En todas las páginas |
| Títulos duplicados | ✅ 0 duplicados |
| Descripciones duplicadas | ✅ 0 duplicados |
| Enlaces rotos internos | ✅ 0 rotos |
| Viewport meta | ✅ Presente en todas |
| Favicon | ✅ Presente |
| PWA manifest | ✅ Presente |
| Service Worker | ✅ Implementado con estrategias de caché |
| Imágenes con formato WebP/AVIF | ✅ En main y blog |
| Carga diferida (lazy loading) | ✅ En imágenes no críticas |
| Preload hero image (LCP) | ✅ En index.html |
| DNS prefetch | ✅ Para CDNs externos |

---

## Recomendaciones estratégicas (checklist on-page)

### Palabras clave
- ✅ Cada página de servicio tiene keyword + "Trujillo" / "La Libertad"
- ✅ Keyword en title, h1 y descripción
- ⚠️ Las descripciones largas diluyen el peso de la keyword principal — priorizar recortar las que superan 160 caracteres

### Contenido
- ✅ Contenido único por página (sin duplicación entre servicios)
- ⚠️ Revisar si los blogs tienen suficiente profundidad (mín 300 palabras de contenido real)

### Enlazado interno
- ✅ Menú principal enlaza a todas las secciones clave
- ✅ Footer tiene todos los servicios
- ⚠️ No hay páginas huérfanas

### Imágenes
- ✅ Nombres de archivo descriptivos
- ✅ WebP/AVIF con fallback JPEG
- ⚠️ Las 7 imágenes de socios duplicadas tienen `alt=""` (correcto para decorativas)

---

## Limitaciones de esta auditoría

- **Core Web Vitals** (LCP, INP, CLS) no se midieron — requiere PageSpeed Insights con el sitio desplegado
- **HTTPS** no se verificó — requiere dominio publicado
- **Velocidad de carga real** no se midió — requiere pruebas con el sitio en producción
- **Contenido dinámico** (JavaScript, chatbot) no se evalúa — los bots pueden o no ejecutarlo
- **Análisis de backlinks** no se realizó — requiere herramientas externas (Ahrefs, SEMrush)
