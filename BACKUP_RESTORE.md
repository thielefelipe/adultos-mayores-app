# 🔐 Backup y Restauración de Base de Datos

## ⚠️ CRÍTICO: Nunca sincronizar schema en Producción

**TypeORM está configurado para:**
- ✅ **Desarrollo**: `synchronize: true` (cambios automáticos al schema)
- ❌ **Producción**: `synchronize: false` (PROTEGE los datos)

---

## 📊 Backup Manual

### En Local (Linux/Mac):

```bash
# 1. Dar permisos ejecutable
chmod +x backend/backup.sh

# 2. Ejecutar backup
./backend/backup.sh

# Se creará: backups/backup_20260427_120000.sql
```

### En Windows PowerShell:

```powershell
# Usar pg_dump directamente
$env:PGPASSWORD = "tu_password"
pg_dump -h localhost -U admin -d centros_diurnos_db > backup.sql
```

### En Render (desde tu PC, conectado a Render BD):

```bash
# Obtener la URL de conexión desde Render Dashboard
# Formato: postgres://user:password@host:port/database

export DB_URL="postgres://user:password@host:port/database"
pg_dump $DB_URL > render_backup_$(date +%Y%m%d_%H%M%S).sql
```

---

## 📥 Restauración desde Backup

### Restaurar en Base de Datos Existente:

```bash
# ⚠️ ADVERTENCIA: Esto SOBRESCRIBE todos los datos

export PGPASSWORD="tu_password"
psql -h localhost -U admin -d centros_diurnos_db < backup.sql
```

### Restaurar en Render:

```bash
# 1. Desde Render Dashboard, obtén la conexión SQL
# 2. Descarga tu backup local
# 3. Ejecuta:

export PGPASSWORD="render_password"
psql -h render-host -U render-user -d render-db < backup.sql
```

---

## 🤖 Automatización (Recomendado)

### Opción 1: GitHub Actions (Backup automático diario)

Crear `.github/workflows/backup.yml`:

```yaml
name: Daily Database Backup

on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM UTC diariamente

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Backup PostgreSQL
        env:
          DB_URL: ${{ secrets.RENDER_DB_URL }}
        run: |
          pg_dump $DB_URL > backup_$(date +%Y%m%d).sql
          
      - name: Upload to GitHub
        run: |
          git add backup_*.sql
          git commit -m "Daily backup $(date +%Y-%m-%d)"
          git push
```

### Opción 2: Render Automated Backups

1. Ve a Dashboard → PostgreSQL → Backups
2. Activa "Automated backups"
3. Configura retención (recomendado: 30 días)

---

## ✅ Checklist antes de cambios severos

- [ ] ¿Hice backup de la BD? → `./backend/backup.sh`
- [ ] ¿NODE_ENV=production está configurado en Render?
- [ ] ¿synchronize está FALSE en producción? ✔️ (ya configurado)
- [ ] ¿Probé en desarrollo primero?
- [ ] ¿El backup está en lugar seguro?

---

## 🚨 Si algo sale mal

1. **Identifica el problema** en los logs
2. **Detén el deploy** en Render (Pause)
3. **Restaura desde backup**: `psql ... < backup.sql`
4. **Investiga qué falló** antes de reintentar

---

## 📝 Próximas Mejoras

- [ ] Configurar backups automáticos en S3
- [ ] Implementar migraciones de TypeORM (schema versioning)
- [ ] Pre-deploy health checks
- [ ] Alertas automáticas si synchronize está true en prod
