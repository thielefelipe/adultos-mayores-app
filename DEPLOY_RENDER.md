# 🚀 Deploy en Render.com (Gratis)

## Pasos para Deployar en Render

### 1. Crear cuenta en Render
1. Ve a https://render.com
2. Haz clic en "Get Started"
3. Elige "GitHub" para conectar tu repositorio
4. Autoriza a Render acceder a tu GitHub

### 2. Crear el Backend (Node.js Web Service)

1. En el dashboard de Render, haz clic en "+ New +" → "Web Service"
2. Selecciona el repositorio `adultos-mayores-app`
3. Configura:
   - **Name**: `adultos-mayores-backend`
   - **Environment**: `Node`
   - **Region**: `Ohio` (más rápido)
   - **Branch**: `main`
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm run start:prod`
   - **Plan**: `Free`

4. En "Environment Variables" agrega:
   ```
   NODE_ENV=production
   PORT=3000
   JWT_SECRET=your_super_secret_jwt_key_change_in_production
   JWT_EXPIRE=24h
   ENCRYPTION_KEY=your_32_character_encryption_key_here
   CORS_ORIGIN=https://adultos-mayores-frontend.onrender.com
   ```

5. Haz clic en "Create Web Service"
6. Espera a que termine el deploy (5-10 minutos)
7. **Copia la URL** que genera (ej: `https://adultos-mayores-backend.onrender.com`)

### 3. Crear el Frontend (Static Site)

1. En el dashboard de Render, haz clic en "+ New +" → "Static Site"
2. Selecciona el repositorio `adultos-mayores-app`
3. Configura:
   - **Name**: `adultos-mayores-frontend`
   - **Region**: `Ohio`
   - **Branch**: `main`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`

4. En "Environment Variables" agrega:
   ```
   VITE_API_URL=https://adultos-mayores-backend.onrender.com
   ```
   (Reemplaza con la URL del backend que copiaste arriba)

5. Haz clic en "Create Static Site"
6. Espera a que termine el deploy (3-5 minutos)
7. **Copia la URL** que genera (ej: `https://adultos-mayores-frontend.onrender.com`)

---

## ✅ Verificación

Después del deploy:

1. Abre: `https://adultos-mayores-frontend.onrender.com`
2. Login con:
   - Usuario: `admin`
   - Contraseña: `admin123`
3. Deberías ver la tabla de usuarios

---

## 🎯 URL Final para Presentación

Compartir con el Centro de Adultos Mayores:

**Sistema en Línea:**
```
https://adultos-mayores-frontend.onrender.com
```

**Credenciales de Prueba:**
- Usuario: `admin`
- Contraseña: `admin123`

---

## ⚠️ Limitaciones del Plan Gratis (Importante)

- **Hibernación**: Después de 30 min sin uso, el servidor se pausa (tarda 30 seg en reactivarse en el próximo acceso)
- **Tráfico**: Limitado pero suficiente para demostración
- **Uptime**: ~99% para pruebas

**Solución**: Cuando esté listo para producción real, cambiar a plan de pago ($7-12/mes)

---

## 🔧 Próximos Pasos

### Para una Presentación Profesional:
1. Cambiar `JWT_SECRET` y `ENCRYPTION_KEY` a valores reales y seguros
2. Crear más usuarios de prueba en la base de datos
3. Personalizar el nombre/logo de la aplicación
4. Hacer un plan de capacitación para el Centro

### Para Producción:
1. Cambiar a plan de pago en Render
2. Usar base de datos externa (PostgreSQL)
3. Configurar dominio personalizado (ej: `centro.com`)
4. Habilitar HTTPS (automático en Render)
5. Hacer backups automáticos

---

## 📞 Soporte

Si hay problemas:

1. **Verifica los logs**: En Render dashboard → Logs
2. **Check CORS**: El frontend debe poder acceder al backend
3. **Check base de datos**: Backend crea SQLite automáticamente
4. **Reconstruir**: En Render, click "Manual Deploy" en la rama main

