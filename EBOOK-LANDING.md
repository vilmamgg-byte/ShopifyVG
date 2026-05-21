# DisciplinaVG — Ebook Landing Page Premium

> Landing page de alta conversión para Shopify. Estética Apple × Nike × MasterClass.
> Diseñada para vender el ebook *Disciplina Total* como una inversión en transformación personal.

---

## Estructura de archivos

```
ShopifyVG/
├── assets/
│   ├── ebook-landing.css        ← Sistema de diseño completo
│   └── ebook-landing.js         ← Interacciones y animaciones
├── sections/
│   └── ebook-landing.liquid     ← HTML completo de la página
├── templates/
│   └── page.ebook-landing.json  ← Template de Shopify
└── EBOOK-LANDING.md             ← Este archivo
```

---

## Activación en Shopify

### Paso 1 — Subir al tema
1. Ir a **Shopify Admin → Tienda en línea → Temas**
2. Click en **Acciones → Editar código** en el tema activo
3. Copiar los archivos en sus carpetas correspondientes

### Paso 2 — Crear la página
1. Ir a **Shopify Admin → Tienda en línea → Páginas**
2. Crear nueva página: título `"Ebook Disciplina Total"`
3. En la sección **Tema**, seleccionar la plantilla `page.ebook-landing`
4. Guardar y publicar

### Paso 3 — Configurar el producto
En `sections/ebook-landing.liquid`, línea del botón CTA final:
```html
<a href="/cart/add" class="el-btn-gold" ...>
```
Reemplazar `"/cart/add"` por la URL real del producto o variante:
```
/products/disciplina-total?variant=XXXXXXXX
```

---

## Sistema de diseño

### Paleta de colores

| Token             | Valor                          | Uso                        |
|-------------------|--------------------------------|----------------------------|
| `--el-deep`       | `#080808`                      | Fondo principal            |
| `--el-dark`       | `#111111`                      | Fondo secciones alternas   |
| `--el-charcoal`   | `#1a1a1a`                      | Cards y surfaces           |
| `--el-border`     | `#2a2a2a`                      | Bordes sutiles             |
| `--el-gold`       | `#c9a84c`                      | Acento principal (dorado)  |
| `--el-gold-bright`| `#e8c97a`                      | Hover del dorado           |
| `--el-gold-dim`   | `rgba(201, 168, 76, 0.10)`     | Fondos dorados suaves      |
| `--el-white`      | `#ffffff`                      | Texto principal            |
| `--el-gray`       | `#888888`                      | Texto secundario           |

### Tipografías

```html
<!-- Cargadas desde Google Fonts (en ebook-landing.css) -->
Inter    → Texto de cuerpo, nav, botones, subtítulos
Poppins  → Títulos, headings, book mockup
```

### Animaciones incluidas

| Clase CSS         | Efecto                                    |
|-------------------|-------------------------------------------|
| `.el-anim`        | Fade-up al entrar en viewport             |
| `.el-anim-d1..d6` | Delays escalonados (0.08s × n)            |
| `.el-book-wrap`   | Float suave continuo (7s loop)            |
| `.el-book-glow`   | Pulso de luz dorada (5s loop)             |
| `.el-badge-dot`   | Punto pulsante de estado                  |
| `[data-count]`    | Contadores animados al entrar en viewport |

---

## Secciones de la página

| # | Sección             | ID Anchor          | Descripción                                  |
|---|---------------------|--------------------|----------------------------------------------|
| 1 | Header sticky       | —                  | Transparente → sólido al scroll              |
| 2 | Hero cinematográfico| `#el-inicio`       | Título emocional + mockup 3D CSS del ebook   |
| 3 | Trust strip         | —                  | 5 puntos de confianza                        |
| 4 | Beneficios          | `#el-beneficios`   | 4 cards con íconos SVG y animaciones         |
| 5 | Qué incluye         | `#el-ebook`        | 6 cards con contenido del ebook              |
| 6 | Testimonios         | `#el-testimonios`  | 4 testimonios estilo Apple/MasterClass       |
| 7 | Sobre el autor      | —                  | Bio + stats animados + autoridad             |
| 8 | FAQ                 | `#el-faq`          | 5 preguntas con accordion elegante           |
| 9 | CTA final           | `#el-comprar`      | Precio + botón principal + garantía          |
| 10| Footer              | —                  | 4 columnas + legal + social                  |

---

## Personalización rápida

### Cambiar el precio
En `sections/ebook-landing.liquid`, buscar:
```html
<span class="el-price-old">$47</span>
<span class="el-price-amount">17</span>
```

### Cambiar el nombre del autor / ebook
En el mismo archivo, buscar y reemplazar:
- `"Vilma García"` → nombre real
- `"DISCIPLINA TOTAL"` → título del ebook
- `"Guía de Transformación"` → subtítulo del ebook

### Cambiar el color dorado
En `assets/ebook-landing.css`, modificar las variables:
```css
--el-gold:        #c9a84c;   /* Color base */
--el-gold-bright: #e8c97a;   /* Hover */
```

### Agregar imagen real al mockup del libro
En `sections/ebook-landing.liquid`, dentro de `.el-book`, reemplazar el contenido por:
```html
<img src="{{ 'ebook-cover.png' | asset_url }}" alt="Ebook Disciplina Total"
     style="width:100%;height:100%;object-fit:cover;border-radius:3px 14px 14px 3px;">
```

### Agregar foto real del autor
En `sections/ebook-landing.liquid`, dentro de `.el-author-photo`, reemplazar el emoji por:
```html
<img src="{{ 'author-photo.jpg' | asset_url }}" alt="Vilma García"
     style="width:100%;height:100%;object-fit:cover;object-position:top;">
```

---

## Interacciones JavaScript

| Función                  | Descripción                                           |
|--------------------------|-------------------------------------------------------|
| Header scroll            | Detecta `scrollY > 60` → agrega clase `.scrolled`    |
| Smooth scroll            | Todos los `href="#..."` navegan suavemente            |
| Mobile menu              | Toggle + bloqueo de scroll en body                    |
| Scroll reveal            | `IntersectionObserver` activa `.el-anim` → `.visible` |
| FAQ accordion            | Un item abierto a la vez, altura animada con JS       |
| Book 3D parallax         | Mousemove sobre `.el-hero-visual` rota el libro       |
| Contadores animados      | `data-count`, `data-suffix`, `data-dec` en el DOM     |
| Active nav highlight     | Resalta link activo según sección en viewport         |

---

## Checklist de lanzamiento

- [ ] Subir archivos al tema activo en Shopify
- [ ] Crear página y asignar plantilla `page.ebook-landing`
- [ ] Actualizar URL del CTA final con el ID real del producto
- [ ] Agregar imagen real de portada del ebook al mockup
- [ ] Agregar foto profesional del autor
- [ ] Reemplazar textos placeholder (nombre, precios, bio)
- [ ] Actualizar links de redes sociales en el footer
- [ ] Actualizar links de políticas legales (Privacy, Terms, Refund)
- [ ] Configurar el producto digital en Shopify (PDF download app)
- [ ] Probar en móvil (iOS Safari + Android Chrome)
- [ ] Probar pago de prueba end-to-end
- [ ] Configurar Google Analytics / Meta Pixel
- [ ] Activar SSL (siempre activo en Shopify)

---

## Apps de Shopify recomendadas

| App                   | Propósito                                         |
|-----------------------|---------------------------------------------------|
| **Sky Pilot**         | Entrega automática de archivos digitales (PDF)    |
| **Digital Downloads** | App oficial Shopify para productos digitales      |
| **Klaviyo**           | Email marketing post-compra y seguimiento         |
| **Lucky Orange**      | Heatmaps y grabaciones de sesión para optimizar   |
| **ReConvert**         | Upsell post-compra para maximizar AOV             |

---

## Decisiones de diseño

**¿Por qué no hay slider automático?**
Los carruseles automáticos reducen la conversión. El usuario pierde control y el ritmo de lectura se interrumpe. Se eligió un grid estático que muestra todo el contenido de forma inmediata.

**¿Por qué mockup CSS y no imagen?**
El mockup 3D en CSS puro carga en 0ms, no depende de assets externos, es responsive nativo y puede animarse con CSS/JS sin overhead. Se puede reemplazar por imagen real cuando esté disponible.

**¿Por qué dorado como acento único?**
Un solo color de acento crea jerarquía visual clara y refuerza la percepción premium. El dorado comunica autoridad, valor y exclusividad sin saturar la paleta oscura.

**¿Por qué no popup de captura de emails?**
Los popups agresivos dañan la experiencia en móvil (Core Web Vitals) y generan fricción en el primer contacto. Se prioriza la conversión directa a compra sobre la captura de leads.

---

*Generado para DisciplinaVG · 2025*
