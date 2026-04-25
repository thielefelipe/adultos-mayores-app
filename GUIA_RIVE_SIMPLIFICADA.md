# 🎬 RIVE SIMPLIFICADO - Animaciones Básicas
## Municipalidad de Coelemu

---

## ⚡ ENFOQUE SIMPLIFICADO

En lugar de máquinas de estado complejas, vamos a hacer **animaciones simples y directas** que puedas:
- ✅ Ver funcionando rápido
- ✅ Entender fácilmente  
- ✅ Exportar e integrar en tu web

---

## 🎯 PROYECTO 1: BOTÓN CON FADE (DESVANECIMIENTO)

### Objetivo
Un botón que **se desvanece** cuando está inactivo

### Pasos

#### 1. Ya tienes el botón hecho ✓
- Botón azul con texto "Guardar"

#### 2. Crear animación simple
1. **Panel izquierdo** → Click en **"Animations"** (el + verde)
2. Nombre: **"FadeOut"**
3. Duración: **500ms**

#### 3. Crear keyframes
1. En la timeline (abajo), veras números: 0, 5f, 10f, 15f, etc.
2. **Click derecho en 0ms** → "Add Keyframe"
3. Esto guarda el estado actual (botón visible, opacidad 1)

4. **Mueve el slider a 500ms** (o 25f)
5. **Selecciona el botón** en el canvas
6. Panel derecho → Busca **"Opacity"**
7. Cambia a **0** (invisible)
8. **Click derecho en 500ms** → "Add Keyframe"

#### 4. ¡Listo!
- Click en **Play (▶)** arriba a la derecha
- Verás el botón desvanecerse suavemente

---

## 🎯 PROYECTO 2: ICONO ROTATIVO (LOADING)

### Objetivo
Un icono que rota continuamente

### Pasos

#### 1. Crear un círculo
1. Toolbar → Ellipse (círculo)
2. Dibuja un círculo (100px x 100px)
3. Color: #0066CC (azul)
4. Sin relleno interior, solo borde

#### 2. Crear animación de rotación
1. Animations → New Animation
2. Nombre: **"Spin"**
3. Duración: **2000ms** (2 segundos para una rotación completa)

#### 3. Crear keyframes
1. **Click en 0ms** → "Add Keyframe"
   - Rotación: 0°

2. **Mueve a 2000ms (25f)**
3. Selecciona el círculo
4. Panel derecho → **"Rotation"**
5. Cambia a **360°**
6. **Click en 2000ms** → "Add Keyframe"

#### 4. Hacer continua
1. Click en la animación **"Spin"**
2. Panel derecho → Busca **"Loop"**
3. Marca como **"Loop"** (si existe la opción)

#### 5. ¡Listo!
- Play (▶) para ver girar infinitamente

---

## 🎯 PROYECTO 3: BADGE CAMBIA COLOR

### Objetivo
Un badge que cambia de color (para roles: Admin, Operador, Analista)

### Pasos

#### 1. Crear badge
1. Rectángulo redondeado (80px x 25px)
2. Radius: 16px
3. Color: #003D82 (azul oscuro para Admin)
4. Texto: "Admin"

#### 2. Crear animación de cambio
1. Animations → New Animation
2. Nombre: **"ChangeRole"**
3. Duración: **300ms**

#### 3. Keyframes
1. **0ms** → Keyframe (azul #003D82)

2. **150ms**:
   - Selecciona el badge
   - Panel derecho → Opacity = 0 (invisible momentáneamente)
   - Keyframe en 150ms

3. **300ms**:
   - Cambia el color a #0066CC (azul más claro, para Operador)
   - Opacity = 1 (visible)
   - Keyframe en 300ms

#### 4. ¡Listo!
- Play para ver cambiar de color

---

## 📤 EXPORTAR Y USAR

### Opción 1: Descargar archivo .riv
1. Menu **File** → **Download**
2. Guarda el archivo

### Opción 2: Compartir
1. Arriba a la derecha → **"Share"**
2. Copia el link
3. Comparte con otros

### Opción 3: Integrar en Web (Avanzado)
```html
<iframe src="https://rive.app/..."></iframe>
```

---

## ✅ RESUMEN RÁPIDO

| Animación | Duración | Keyframes |
|-----------|----------|-----------|
| FadeOut | 500ms | 2 (0ms, 500ms) |
| Spin | 2000ms | 2 (0ms, 2000ms) |
| ChangeRole | 300ms | 3 (0ms, 150ms, 300ms) |

---

## 🚀 SIGUIENTE PASO

Cuando termines:
1. **Exporta el archivo**
2. **Guarda como archivo .riv**
3. Luego pasamos a **Blender, Pencil2D y OpenShot**

---

## 💡 TIPS

- **Duración corta = animación rápida** (200ms)
- **Duración larga = animación lenta** (2000ms)
- **Opacity 0 = invisible**
- **Opacity 1 = visible**
- **Rotation 360 = una vuelta completa**

¡Prueba estas animaciones simples! 🎬
