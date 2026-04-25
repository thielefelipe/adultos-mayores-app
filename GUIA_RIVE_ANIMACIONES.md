# 🎬 GUÍA: ANIMACIONES INTERACTIVAS EN RIVE
## Municipalidad de Coelemu - Sistema RRHH

---

## 📌 ÍNDICE
1. [¿Qué es Rive?](#qué-es-rive)
2. [Instalación y Setup](#instalación-y-setup)
3. [Conceptos Básicos](#conceptos-básicos)
4. [Animaciones a Crear](#animaciones-a-crear)
5. [Interactividad](#interactividad)
6. [Exportar para Web](#exportar-para-web)

---

## 🎨 ¿QUÉ ES RIVE?

**Rive** es una herramienta para crear **animaciones interactivas basadas en vectores**.

**Ventajas:**
- ✅ Animaciones suaves y profesionales
- ✅ Interactividad (estados, hover, click)
- ✅ Exportable para web
- ✅ Versión gratuita funcional
- ✅ Integrable en React/Vue/JavaScript

**Perfecto para:**
- Botones animados
- Transiciones entre estados
- Iconos animados
- Microinteracciones

---

## 🚀 INSTALACIÓN Y SETUP

### Paso 1: Registrarse en Rive
1. Ve a **rive.app**
2. Haz clic en **"Sign Up"**
3. Crea una cuenta (gratuita)
4. Confirma tu email

### Paso 2: Crear Nuevo Proyecto
1. Dashboard → **"New File"**
2. Elige **"Blank Canvas"**
3. Nombre: `RRHH-Animaciones-Coelemu`
4. Resolucion: **1920 x 1080 px**

### Paso 3: Familiarizarte con la Interfaz
```
┌─────────────────────────────────┐
│  Toolbar (Herramientas)         │
├──────────────┬──────────────────┤
│              │                  │
│  Canvas      │  Propiedades     │
│  (Dibujar)   │  (Inspector)     │
│              │                  │
├──────────────┼──────────────────┤
│  Layers/Animations              │
└─────────────────────────────────┘
```

---

## 📚 CONCEPTOS BÁSICOS

### 1. **Artboards**
- Contenedores para tu animación
- Organiza diferentes elementos

### 2. **Layers**
- Cada forma/texto es un layer
- Se animan por separado

### 3. **Timeline (Línea de tiempo)**
- Donde creas las animaciones fotograma por fotograma
- Duración en milisegundos

### 4. **State Machine (Máquina de Estados)**
- Define comportamientos interactivos
- Ej: botón en estado "normal" → "hover" → "click"

### 5. **Animations**
- Movimiento, opacidad, escala, rotación
- Se crean entre fotogramas clave

---

## 🎬 ANIMACIONES A CREAR

### ANIMACIÓN 1: BOTÓN CON HOVER Y CLICK

**Objetivo:** Un botón que:
- Cambia color al pasar el mouse (hover)
- Se anima al hacer clic
- Vuelve a su estado normal

**Pasos:**

#### 1.1 Crear el Botón Base
1. Herramienta **Rectangle** → Dibuja un rectángulo
   - Ancho: 200px
   - Alto: 48px
   - Radio de esquinas: 8px
2. Relleno: **#0066CC** (azul primario)
3. Nombre la capa: **"Button_Base"**

#### 1.2 Agregar Texto al Botón
1. Herramienta **Text** → Agrega texto: "Guardar"
   - Font: Open Sans
   - Tamaño: 14px
   - Color: #FFFFFF
2. Centra el texto sobre el botón
3. Nombre: **"Button_Text"**

#### 1.3 Agrupar el Botón
1. Selecciona ambas capas (Button_Base y Button_Text)
2. Atajo: **Ctrl + G** para agrupar
3. Nombre del grupo: **"Button_Guardar"**

#### 1.4 Crear Animación de Hover
1. Click derecho en **Button_Guardar** → **"New Animation"**
2. Nombre: **"Hover"**
3. Duración: **200ms** (milisegundos)

4. En la timeline:
   - **Frame 0ms:** Button_Base con color #0066CC, escala 1
   - **Frame 200ms:** Button_Base con color #005AAD (azul más oscuro), escala 1.05
   
5. Rive interpolará automáticamente el movimiento

#### 1.5 Crear State Machine
1. Panel izquierdo → **"State Machine"**
2. Haz clic en **"+"** para agregar nueva máquina
3. Nombre: **"ButtonStates"**

4. Crea 3 estados:
   - Estado **"Idle"** (Normal)
   - Estado **"Hover"** (Al pasar mouse)
   - Estado **"Pressed"** (Al hacer clic)

5. Crea transiciones:
   - Idle → Hover (evento: "hover_enter")
   - Hover → Idle (evento: "hover_exit")
   - Hover → Pressed (evento: "click")
   - Pressed → Idle (evento: "release")

6. Vincula animaciones:
   - Transición Idle → Hover: Reproduce animación **"Hover"**
   - Transición Hover → Idle: Reproduce animación inversa

#### 1.6 Testar Interactividad
1. Arriba a la derecha: **"▶ Play"** o **"Preview"**
2. Intenta hacer hover y click en el botón
3. Debería cambiar color y tamaño suavemente

---

### ANIMACIÓN 2: TRANSICIÓN DE PANTALLA

**Objetivo:** Animar el cambio de pantalla con fade (desvanecimiento)

**Pasos:**

#### 2.1 Crear Dos Artboards (Pantallas)
1. **Artboard 1:** "Login" (la que ya tienes del SVG)
2. **Artboard 2:** "Dashboard" (crea una con fondo azul)

#### 2.2 Crear Animación de Fade Out (Login)
1. Selecciona el Artboard "Login"
2. New Animation → Nombre: **"FadeOut"**
3. Duración: **500ms**

4. Timeline:
   - Frame 0ms: Opacidad = 1 (visible)
   - Frame 500ms: Opacidad = 0 (invisible)

#### 2.3 Crear Animación de Fade In (Dashboard)
1. Selecciona Artboard "Dashboard"
2. New Animation → Nombre: **"FadeIn"**
3. Duración: **500ms**

4. Timeline:
   - Frame 0ms: Opacidad = 0 (invisible)
   - Frame 500ms: Opacidad = 1 (visible)

#### 2.4 State Machine para Transiciones
1. Crea máquina de estados: **"ScreenTransition"**
2. Estados:
   - "LoginScreen"
   - "DashboardScreen"

3. Transiciones:
   - LoginScreen → DashboardScreen (evento: "navigate_dashboard")
   - DashboardScreen → LoginScreen (evento: "navigate_login")

4. Al transicionar:
   - Reproduce FadeOut en Login
   - Reproduce FadeIn en Dashboard

---

### ANIMACIÓN 3: ICONO ANIMADO

**Objetivo:** Un icono que rota continuamente (útil para loading, dashboards)

**Pasos:**

#### 3.1 Crear Icono
1. Importa un icono SVG o dibuja una forma
2. Ejemplo: Círculo concéntrico (rueda de engranaje)
3. Nombre: **"LoadingIcon"**

#### 3.2 Crear Animación de Rotación
1. New Animation → Nombre: **"Spinning"**
2. Duración: **2000ms** (2 segundos, para rotación continua)

3. Timeline:
   - Frame 0ms: Rotación = 0°
   - Frame 2000ms: Rotación = 360°

#### 3.3 Hacer Continua
1. En propiedades de animación:
   - Marca **"Loop"** (si existe la opción)
   - O crea una state machine que vuelve a sí misma

---

### ANIMACIÓN 4: TRANSICIÓN DE BADGE (Rol)

**Objetivo:** Un badge que cambia color según el rol (Admin, Operador, Analista)

**Pasos:**

#### 4.1 Crear Badge Base
1. Rectángulo con esquinas muy redondeadas (border-radius: 16px)
2. Ancho: 80px, Alto: 25px
3. Nombre: **"RoleBadge"**

4. Crea 3 versiones:
   - Badge_Admin (fondo #003D82)
   - Badge_Operador (fondo #0066CC)
   - Badge_Analista (fondo #4DA6FF)

#### 4.2 Crear Animaciones de Cambio
1. New Animation → **"ChangeToAdmin"** (300ms)
   - Frame 0: Opacidad = 1, escala = 1
   - Frame 150: Opacidad = 0, escala = 0.8
   - Frame 300: Opacidad = 1, escala = 1, color = #003D82

2. Repite para los otros roles

#### 4.3 State Machine
Estados: "Admin", "Operador", "Analista"
Transiciones entre ellos reproducen las animaciones

---

## ⚙️ INTERACTIVIDAD

### Agregar Interactividad a un Botón

1. Selecciona el botón
2. Panel **State Machine** → Crea máquina llamada **"ButtonInteraction"**
3. Estados:
   - **"Idle"** (estado inicial)
   - **"Hovered"** (al pasar mouse)
   - **"Pressed"** (al hacer click)

4. Crea transiciones:
   - Idle ↔ Hovered (evento: **"pointerenter"** y **"pointerleave"**)
   - Hovered → Pressed (evento: **"pointerdown"**)
   - Pressed → Idle (evento: **"pointerup"**)

5. Vincula animaciones a las transiciones

### Variables Interactivas

Rive permite variables que cambian con interacción:

```
Input (entrada del usuario)
  ↓
State Machine (procesa)
  ↓
Output (cambios visuales)
```

Ejemplo:
- Input: "isDark" (boolean)
- State Machine: if isDark → aplicar tema oscuro
- Output: cambiar colores

---

## 📤 EXPORTAR PARA WEB

### Opción 1: Embed en Página Web

1. En Rive, haz clic en **"Share"** → **"Embed"**
2. Copia el código HTML:
```html
<div>
  <rive-canvas src="https://rive.app/..."></rive-canvas>
</div>
<script src="https://cdn.rive.app/rive.js"></script>
```

3. Pega en tu página HTML

### Opción 2: Exportar como Archivo

1. Menú **File** → **"Export"**
2. Formato: **".riv"** (formato nativo de Rive)
3. Copia el archivo descargado a tu proyecto

### Opción 3: Integrar con React

```javascript
import { Rive } from '@rive-app/react-canvas';

export default function ButtonAnimation() {
  return (
    <Rive src="rrhh-animaciones.riv" />
  );
}
```

---

## 🎯 FLUJO DE TRABAJO RECOMENDADO

### Semana 1: Aprende lo básico
1. Crea un botón simple con hover
2. Practica con transiciones entre artboards
3. Experimenta con opacidad y escala

### Semana 2: Crea animaciones del sistema
1. Botones: Guardar, Cancelar, Eliminar
2. Badges de roles (Admin, Operador, Analista)
3. Transiciones entre Login → Dashboard → Gestión Usuarios

### Semana 3: Interactividad avanzada
1. State machines más complejas
2. Variables dinámicas
3. Integración con código (React/Vue)

---

## 📚 RECURSOS ÚTILES

- **Tutorial oficial:** rive.app/learn
- **Community:** rive.app/community
- **Discord:** Comunidad activa de Rive

---

## ✅ CHECKLIST DE ANIMACIONES

- [ ] Crear proyecto en Rive
- [ ] Botón con hover y click animados
- [ ] Transición fade entre Login y Dashboard
- [ ] Icono de loading rotativo
- [ ] Badge con cambios de color (roles)
- [ ] State machines funcionales
- [ ] Probar todas las interacciones
- [ ] Exportar archivo ".riv"
- [ ] Integrar en página web o React

---

## 🚀 SIGUIENTE PASO

Una vez termines con Rive, creamos las guías para:
- **Blender:** 3D (logo animado, fondos)
- **Pencil2D:** Animación 2D (procesos RRHH)
- **OpenShot:** Video de demostración

¡A por ello! 🎬
