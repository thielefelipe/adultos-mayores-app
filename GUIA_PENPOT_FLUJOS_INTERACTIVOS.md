# 📋 GUÍA: FLUJOS INTERACTIVOS EN PENPOT
## Municipalidad de Coelemu - Sistema RRHH

---

## 📌 ÍNDICE
1. [Configuración Inicial](#configuración-inicial)
2. [Pantallas a Crear](#pantallas-a-crear)
3. [Especificaciones de Diseño](#especificaciones-de-diseño)
4. [Cómo Hacer Interactividad](#cómo-hacer-interactividad)
5. [Flujos de Navegación](#flujos-de-navegación)
6. [Exportar y Usar](#exportar-y-usar)

---

## 🎨 CONFIGURACIÓN INICIAL

### Paso 1: Crear Nuevo Proyecto
1. Ve a **penpot.app**
2. Inicia sesión con tu cuenta
3. Haz clic en **"+ New File"**
4. Nombre: `RRHH-Sistema-Coelemu-Interactivo`
5. Tamaño: **1920 x 1080 px** (Desktop)

### Paso 2: Configurar Guías
1. Menú **View** → **Show Guides**
2. Menú **View** → **Show Grid**
3. Esto te ayudará con la alineación

---

## 📱 PANTALLAS A CREAR

### Pantalla 1: LOGIN
**Dimensiones:** 1920 x 1080px

**Elementos:**
- Fondo azul degradado (#003D82 → #0066CC)
- Logo Municipalidad (esquina superior izquierda)
- Contenedor formulario (centro): ancho 400px
  - Campo "Usuario" (input)
  - Campo "Contraseña" (input)
  - Botón "Iniciar Sesión" (azul #0066CC)
  - Texto "¿Olvidaste tu contraseña?" (link)

**Especificaciones:**
- Font: Montserrat Bold (títulos), Open Sans (body)
- Tamaño títulos: 32px
- Tamaño inputs: 14px
- Botón: 48px alto, esquinas redondeadas 8px
- Color botón: #0066CC
- Color texto botón: #FFFFFF

**Interactividad:**
- El botón "Iniciar Sesión" navega a → PANTALLA DASHBOARD

---

### Pantalla 2: DASHBOARD
**Dimensiones:** 1920 x 1080px

**Elementos:**
- Header: Color #003D82, altura 80px
  - Logo Municipalidad (izquierda)
  - Título "Dashboard RRHH" (centro)
  - Avatar usuario + nombre (derecha) → Botón interactivo (logout)
  
- Sidebar (izquierda): Ancho 250px, color #F5F5F5
  - Menú: Dashboard (activo), Gestión Usuarios, Reportes, Configuración
  - Cada item del menú es clickeable
  
- Contenido principal (derecha):
  - Título: "Bienvenido al Sistema"
  - Cards de estadísticas:
    * Usuarios Activos (número + icon)
    * Reportes Pendientes (número + icon)
    * Últimas Actividades (lista)
  
  - Botón "Ir a Gestión de Usuarios" → Navega a PANTALLA GESTIÓN USUARIOS

**Especificaciones:**
- Header: Sombra 0px 2px 8px rgba(0,0,0,0.1)
- Cards: Borde 1px #E0E0E0, esquinas 8px
- Spacing cards: 24px

**Interactividad:**
- Menú lateral clickeable
  - "Dashboard" → Permanece en Dashboard
  - "Gestión Usuarios" → Va a PANTALLA GESTIÓN USUARIOS
  - "Reportes" → Va a PANTALLA REPORTES (básica)
  - "Configuración" → Va a PANTALLA CONFIGURACIÓN (básica)
- Avatar (logout) → Va a PANTALLA LOGIN

---

### Pantalla 3: GESTIÓN DE USUARIOS
**Dimensiones:** 1920 x 1080px

**Elementos:**
- Header: Igual al Dashboard
- Sidebar: Igual al Dashboard (GESTIÓN USUARIOS activo)

- Contenido principal:
  - Título: "Gestión de Usuarios"
  - Botón "➕ Crear Usuario" (azul #0066CC) → Navega a PANTALLA CREAR USUARIO
  - Botón "📊 Exportar Excel" (ambar #E8A05C)
  
  - Tabla de usuarios:
    * Columnas: ID, Usuario, Nombre, Email, Teléfono, Rol, Región, Activo
    * Al menos 5 filas de ejemplo
    * Cada fila es clickeable → Navega a PANTALLA DETALLES USUARIO
    * Controles: Filtros, búsqueda, paginación

**Especificaciones:**
- Tabla: Bordes #E0E0E0
- Encabezados: Fondo #F5F5F5, font bold
- Filas alternadas: Fondo blanco y #FAFAFA
- Botón primario: #0066CC
- Botón secundario: #E8A05C

**Interactividad:**
- Botón "Crear Usuario" → PANTALLA CREAR USUARIO
- Hacer clic en una fila → PANTALLA DETALLES USUARIO
- Menú lateral funcional como en Dashboard
- Avatar (logout) → PANTALLA LOGIN

---

### Pantalla 4: CREAR USUARIO
**Dimensiones:** 1920 x 1080px

**Elementos:**
- Header: Igual al Dashboard
- Sidebar: Igual al Dashboard (GESTIÓN USUARIOS activo)

- Contenido principal:
  - Título: "Crear Nuevo Usuario"
  - Formulario en dos columnas:
    * Columna izquierda:
      - Campo "Usuario" (input)
      - Campo "Email" (input)
      - Campo "Región" (dropdown)
      - Campo "Provincia" (dropdown)
    
    * Columna derecha:
      - Campo "Nombre" (input)
      - Campo "Teléfono" (input)
      - Campo "Rol" (dropdown) → Opciones: Admin, Operador, Analista
      - Campo "Comuna" (dropdown)
  
  - Botones:
    * "Guardar" (azul #0066CC) → Navega a PANTALLA DETALLES USUARIO
    * "Cancelar" (gris #E0E0E0) → Vuelve a GESTIÓN USUARIOS

**Especificaciones:**
- Inputs: Borde 1px #CCCCCC, altura 40px, padding 12px
- Labels: Font 12px bold
- Espaciado entre campos: 16px
- Botones: Altura 48px, ancho mínimo 120px

**Interactividad:**
- Botón "Guardar" → PANTALLA DETALLES USUARIO
- Botón "Cancelar" → PANTALLA GESTIÓN USUARIOS
- Menú lateral funcional
- Avatar (logout) → PANTALLA LOGIN

---

### Pantalla 5: DETALLES USUARIO
**Dimensiones:** 1920 x 1080px

**Elementos:**
- Header: Igual al Dashboard
- Sidebar: Igual al Dashboard (GESTIÓN USUARIOS activo)

- Contenido principal:
  - Título: "Detalles del Usuario"
  - Sección "Información Personal":
    * Nombre: [nombre del usuario]
    * Email: [email]
    * Teléfono: [teléfono]
    * Usuario: [usuario]
  
  - Sección "Ubicación":
    * Región: [región]
    * Provincia: [provincia]
    * Comuna: [comuna]
  
  - Sección "Rol y Permisos":
    * Rol: [admin/operador/analista] (badge con color)
    * Estado: [Activo/Inactivo] (badge verde/rojo)
    * Fecha Creación: [fecha]
    * Último Acceso: [fecha]
  
  - Botones:
    * "✏️ Editar" (azul #0066CC) → Va a PANTALLA CREAR USUARIO (modo edición)
    * "🗑️ Eliminar" (rojo #E53935) → Muestra confirmación
    * "← Volver" (gris) → PANTALLA GESTIÓN USUARIOS

**Especificaciones:**
- Cada sección separada con línea 1px #E0E0E0
- Badges: Padding 8px 12px, esquinas 16px
- Rol Admin: Fondo #003D82, texto blanco
- Rol Operador: Fondo #0066CC, texto blanco
- Rol Analista: Fondo #4DA6FF, texto blanco
- Estado Activo: Verde #4CAF50
- Estado Inactivo: Rojo #E53935

**Interactividad:**
- Botón "Editar" → PANTALLA CREAR USUARIO
- Botón "Eliminar" → Muestra modal de confirmación (opcional)
- Botón "Volver" → PANTALLA GESTIÓN USUARIOS
- Menú lateral funcional
- Avatar (logout) → PANTALLA LOGIN

---

### Pantalla 6: REPORTES (Básica)
**Dimensiones:** 1920 x 1080px

**Elementos:**
- Header, Sidebar igual al Dashboard (REPORTES activo)
- Contenido: Título "Reportes" + mensaje "Sección en desarrollo"
- Botón para volver a Dashboard

**Interactividad:**
- Menú lateral funcional

---

### Pantalla 7: CONFIGURACIÓN (Básica)
**Dimensiones:** 1920 x 1080px

**Elementos:**
- Header, Sidebar igual al Dashboard (CONFIGURACIÓN activo)
- Contenido: Título "Configuración" + mensaje "Sección en desarrollo"
- Botón para volver a Dashboard

**Interactividad:**
- Menú lateral funcional

---

## 🎨 ESPECIFICACIONES DE DISEÑO

### Paleta de Colores
```
Primario Oscuro:  #003D82
Primario Medio:   #0066CC
Primario Claro:   #4DA6FF
Gris Claro:       #F5F5F5
Gris Medio:       #E0E0E0
Gris Oscuro:      #666666
Blanco:           #FFFFFF
Éxito:            #4CAF50
Error:            #E53935
Advertencia:      #FFC107
Ambar:            #E8A05C
```

### Tipografía
- **Títulos (H1):** Montserrat Bold, 32px, color #003D82
- **Títulos (H2):** Montserrat Bold, 24px, color #003D82
- **Subtítulos:** Montserrat Bold, 18px, color #0066CC
- **Body:** Open Sans Regular, 14px, color #666666
- **Labels:** Open Sans Bold, 12px, color #333333
- **Pequeño:** Open Sans, 12px, color #999999

### Espaciado
- Padding general: 24px
- Padding contenedores: 16px
- Margen entre elementos: 16px
- Margen entre secciones: 24px

### Sombras
- Sombra elevada: `0px 4px 12px rgba(0,0,0,0.15)`
- Sombra media: `0px 2px 8px rgba(0,0,0,0.1)`
- Sombra baja: `0px 1px 4px rgba(0,0,0,0.05)`

### Border Radius
- Botones: 8px
- Cards: 8px
- Inputs: 4px
- Badges: 16px

---

## ⚙️ CÓMO HACER INTERACTIVIDAD EN PENPOT

### Paso 1: Agregar Interactividad a un Botón
1. Selecciona el botón
2. Panel derecho → Busca pestaña **"Interactions"** (o **"Prototype"**)
3. Haz clic en **"+ Add Interaction"**
4. Selecciona el tipo: **"Navigate to"** o **"Open Overlay"**
5. Elige la pantalla destino
6. Evento: **"On Click"** (por defecto)
7. Aplica

### Paso 2: Hacer Interactiva una Fila de Tabla
1. Selecciona la fila (agrúpala si no está agrupada)
2. Panel derecho → **Interactions**
3. **Add Interaction** → **Navigate to**
4. Selecciona la pantalla de detalles
5. Evento: **On Click**

### Paso 3: Hacer Interactivo el Menú Lateral
1. Selecciona cada item del menú
2. Agrega interacción **Navigate to** para cada uno
3. Asegúrate de que el item "activo" tenga un estilo diferente (fondo de color)

### Paso 4: Vista Previa de Flujo
1. Arriba a la derecha: **"▶ Play"** o **"View Prototype"**
2. Esto abre una vista previa interactiva
3. Prueba hacer clic en los botones y navega entre pantallas

---

## 🔀 FLUJOS DE NAVEGACIÓN

### Flujo Principal: Login → Dashboard
```
LOGIN
  ↓ (Botón "Iniciar Sesión")
DASHBOARD
  ├─ Menú: Dashboard (permanece)
  ├─ Menú: Gestión Usuarios → GESTIÓN USUARIOS
  ├─ Menú: Reportes → REPORTES
  ├─ Menú: Configuración → CONFIGURACIÓN
  └─ Avatar (Logout) → LOGIN
```

### Flujo Gestión de Usuarios
```
GESTIÓN USUARIOS
  ├─ Botón "Crear Usuario" → CREAR USUARIO
  ├─ Clic en fila de tabla → DETALLES USUARIO
  │  ├─ Botón "Editar" → CREAR USUARIO
  │  ├─ Botón "Volver" → GESTIÓN USUARIOS
  │  └─ Avatar (Logout) → LOGIN
  └─ Avatar (Logout) → LOGIN

CREAR USUARIO
  ├─ Botón "Guardar" → DETALLES USUARIO
  ├─ Botón "Cancelar" → GESTIÓN USUARIOS
  └─ Avatar (Logout) → LOGIN
```

### Resumen de Navegaciones
| Desde | Botón/Elemento | Hacia |
|-------|----------------|-------|
| LOGIN | "Iniciar Sesión" | DASHBOARD |
| DASHBOARD | Menú "Gestión Usuarios" | GESTIÓN USUARIOS |
| DASHBOARD | Menú "Reportes" | REPORTES |
| DASHBOARD | Menú "Configuración" | CONFIGURACIÓN |
| DASHBOARD | Avatar | LOGIN |
| GESTIÓN USUARIOS | "Crear Usuario" | CREAR USUARIO |
| GESTIÓN USUARIOS | Fila tabla (clic) | DETALLES USUARIO |
| GESTIÓN USUARIOS | Avatar | LOGIN |
| CREAR USUARIO | "Guardar" | DETALLES USUARIO |
| CREAR USUARIO | "Cancelar" | GESTIÓN USUARIOS |
| CREAR USUARIO | Avatar | LOGIN |
| DETALLES USUARIO | "Editar" | CREAR USUARIO |
| DETALLES USUARIO | "Volver" | GESTIÓN USUARIOS |
| DETALLES USUARIO | Avatar | LOGIN |
| REPORTES | Avatar | LOGIN |
| CONFIGURACIÓN | Avatar | LOGIN |

---

## 📤 EXPORTAR Y USAR

### Opción 1: Compartir Prototipo
1. Arriba a la derecha: **"Share"**
2. Obtén el link del prototipo interactivo
3. Comparte con stakeholders para feedback

### Opción 2: Exportar como Imagen
1. Menú **File** → **Export**
2. Selecciona las pantallas
3. Formato: PNG o SVG

### Opción 3: Crear un Video de Demostración
1. Usa **OBS Studio** (gratuito) o **ScreenFlow**
2. Abre la vista previa del prototipo
3. Graba tu navegación por todos los flujos
4. Exporta el video

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

- [ ] Crear proyecto en Penpot
- [ ] Configurar canvas 1920x1080px
- [ ] Crear pantalla LOGIN
- [ ] Crear pantalla DASHBOARD
- [ ] Crear pantalla GESTIÓN USUARIOS
- [ ] Crear pantalla CREAR USUARIO
- [ ] Crear pantalla DETALLES USUARIO
- [ ] Crear pantalla REPORTES (básica)
- [ ] Crear pantalla CONFIGURACIÓN (básica)
- [ ] Agregar colores de paleta (Assets)
- [ ] Agregar tipografía (Assets)
- [ ] Hacer interactivo: LOGIN → DASHBOARD
- [ ] Hacer interactivo: DASHBOARD → todas las pantallas
- [ ] Hacer interactivo: GESTIÓN USUARIOS → CREAR USUARIO
- [ ] Hacer interactivo: GESTIÓN USUARIOS → filas de tabla
- [ ] Hacer interactivo: CREAR USUARIO ↔ GESTIÓN USUARIOS
- [ ] Hacer interactivo: DETALLES USUARIO → acciones
- [ ] Hacer interactivo: Avatar (Logout) en todas las pantallas
- [ ] Probar todos los flujos con vista previa
- [ ] Compartir link del prototipo

---

## 🎯 TIPS Y TRUCOS

### Optimización de Trabajo
1. **Usa Componentes:** Crea el botón una vez, úsalo en todas las pantallas
2. **Usa Colors Assets:** Define los colores una vez, úsalos en todo
3. **Usa Text Styles:** Define tipografías una vez
4. **Agrupa elementos:** Agrupa botones, campos, etc. para que sean fáciles de seleccionar

### Productividad
- Atajo: `Ctrl + D` para duplicar elementos (usa para copiar pantallas)
- Atajo: `Ctrl + G` para agrupar
- Atajo: `Ctrl + /` para búsqueda

### Cuando Algo No Funciona
- Verifica que el elemento esté seleccionado correctamente
- Asegúrate de que la interacción esté configurada en "On Click"
- Prueba en la vista previa (Play button arriba a la derecha)
- Si una pantalla no aparece: Verifica que esté creada y nombrada correctamente

---

## 📞 SIGUIENTE PASO
Una vez termines Penpot, pasamos a **RIVE** para las animaciones interactivas.

¡Adelante! 🚀
