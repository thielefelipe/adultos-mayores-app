# 🧪 Test de Backup y Recuperación

## ¿Qué hace este test?

Este script **simula un desastre real** y demuestra que puedes recuperar todos tus datos:

1. ✅ **Captura el estado actual** de la BD (cuántos usuarios, pacientes, etc.)
2. 📊 **Agrega datos de prueba** para que veas que no se pierden
3. 💾 **Hace un BACKUP completo** de la BD
4. ⚡ **SIMULA UN DESASTRE** - borra TODOS los datos (usuarios, pacientes, etc.)
5. 🔄 **RESTAURA desde el BACKUP** - recupera TODO automáticamente
6. ✅ **VERIFICA** que los datos están exactamente como eran

## Instrucciones

### Requisitos:
- PostgreSQL instalado localmente (con `psql` disponible)
- Variables de entorno configuradas:
  ```bash
  export DB_HOST=localhost
  export DB_PORT=5432
  export DB_USERNAME=admin
  export DB_PASSWORD=admin
  export DB_NAME=centros_diurnos_db
  ```

### Ejecutar el test:

**En Linux/Mac:**
```bash
cd backend
chmod +x test-backup-recovery.sh
./test-backup-recovery.sh
```

**En Windows PowerShell:**
```powershell
cd backend
bash test-backup-recovery.sh
```

## Resultado esperado:

```
════════════════════════════════════════════════════════════════
🧪 TEST: Backup y Recuperación de Base de Datos
════════════════════════════════════════════════════════════════

📋 PASO 1: Estado actual de la BD
─────────────────────────────────────────────────────────────────
✓ Usuarios en BD: 3
✓ Pacientes en BD: 15

📊 PASO 2: Agregar datos de prueba
─────────────────────────────────────────────────────────────────
✓ Datos de prueba agregados

💾 PASO 3: Hacer BACKUP de la BD actual
─────────────────────────────────────────────────────────────────
✓ Backup creado: ./test-backups/test_backup_1714237832.sql
✓ Tamaño: 450K

⚠️  PASO 4: SIMULAR DESASTRE - Borrar todos los datos (⚡ PELIGRO)
─────────────────────────────────────────────────────────────────
❌ BD DESTRUIDA - Verificando...
❌ Usuarios después del desastre: 0 (TODOS BORRADOS)
❌ Pacientes después del desastre: 0 (TODOS BORRADOS)

🔄 PASO 5: RESTAURAR desde BACKUP
─────────────────────────────────────────────────────────────────
✓ Restauración completada

✅ PASO 6: VERIFICAR que los datos fueron restaurados
─────────────────────────────────────────────────────────────────
✅ Usuarios restaurados: 3
✅ Pacientes restaurados: 15
✅ Usuario de prueba existe: 1

════════════════════════════════════════════════════════════════
📊 RESUMEN DEL TEST
════════════════════════════════════════════════════════════════

ANTES del desastre:
  • Usuarios: 3
  • Pacientes: 15

DESPUÉS del desastre (antes de restaurar):
  • Usuarios: 0 ❌
  • Pacientes: 0 ❌

DESPUÉS de restaurar desde BACKUP:
  • Usuarios: 3 ✅
  • Pacientes: 15 ✅
  • Usuario de prueba: 1 ✅

✅✅✅ TEST EXITOSO ✅✅✅
Los datos fueron completamente restaurados desde el backup
```

## ¿Qué significa esto?

- ✅ **Tu backup funciona perfectamente**
- ✅ **Incluso si algo catastrófico sucede, puedes recuperar TODO**
- ✅ **Los usuarios, pacientes, auditoría - TODO se restaura**
- ✅ **Nunca perderás datos nuevamente**

## Para Render (Producción):

Si quieres hacer el mismo test en Render:

```bash
# 1. Conectarte a Render
export RENDER_DB_URL="postgres://user:password@host:port/database"

# 2. Hacer backup de Render
pg_dump $RENDER_DB_URL > render_backup_before_test.sql

# 3. Hacer el test (con cuidado - borrará datos reales)
./test-backup-recovery.sh

# 4. Si algo sale mal, restaurar inmediatamente
psql $RENDER_DB_URL < render_backup_before_test.sql
```

⚠️ **Nota**: En producción, prueba primero en un clone de la BD, no en la BD real.

## Script auxiliar para clonar BD en Render:

```bash
# 1. Desde Render dashboard, obtén una copia de tu BD
# 2. Crea nueva BD PostgreSQL
# 3. Usa este comando para copiar:

pg_dump original_db_url | psql clone_db_url
```
