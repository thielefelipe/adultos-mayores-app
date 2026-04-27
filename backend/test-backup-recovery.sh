#!/bin/bash
# ⚡ TEST DE BACKUP Y RECUPERACIÓN
# Este script simula un desastre de BD y demuestra que el backup funciona

set -e

echo "════════════════════════════════════════════════════════════════"
echo "🧪 TEST: Backup y Recuperación de Base de Datos"
echo "════════════════════════════════════════════════════════════════"
echo ""

# Configuración
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_NAME=${DB_NAME:-centros_diurnos_db}
DB_USER=${DB_USERNAME:-admin}
BACKUP_DIR="./test-backups"
BACKUP_FILE="$BACKUP_DIR/test_backup_$(date +%s).sql"
TEST_DB="${DB_NAME}_test_restore"

mkdir -p "$BACKUP_DIR"

echo "📋 PASO 1: Estado actual de la BD"
echo "─────────────────────────────────────────────────────────────────"
export PGPASSWORD=$DB_PASSWORD

# Contar usuarios actuales
USERS_COUNT=$(psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" \
  -t -c "SELECT COUNT(*) FROM usuario;" 2>/dev/null || echo "0")

PACIENTES_COUNT=$(psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" \
  -t -c "SELECT COUNT(*) FROM paciente;" 2>/dev/null || echo "0")

echo "✓ Usuarios en BD: $USERS_COUNT"
echo "✓ Pacientes en BD: $PACIENTES_COUNT"
echo ""

echo "📊 PASO 2: Agregar datos de prueba"
echo "─────────────────────────────────────────────────────────────────"

# Crear usuario de prueba
psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" << SQL
INSERT INTO usuario (username, nombre, password, rol, activo, "createdAt", "updatedAt")
VALUES ('test_user', 'Usuario de Prueba', 'hashed_pwd', 'operador', true, NOW(), NOW())
ON CONFLICT DO NOTHING;
SQL

echo "✓ Datos de prueba agregados"
echo ""

echo "💾 PASO 3: Hacer BACKUP de la BD actual"
echo "─────────────────────────────────────────────────────────────────"

PGPASSWORD=$DB_PASSWORD pg_dump \
  -h "$DB_HOST" \
  -p "$DB_PORT" \
  -U "$DB_USER" \
  -d "$DB_NAME" \
  --no-password \
  > "$BACKUP_FILE"

BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
echo "✓ Backup creado: $BACKUP_FILE"
echo "✓ Tamaño: $BACKUP_SIZE"
echo ""

echo "⚠️  PASO 4: SIMULAR DESASTRE - Borrar todos los datos (⚡ PELIGRO)"
echo "─────────────────────────────────────────────────────────────────"

psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" << SQL
-- ⚠️ SIMULACIÓN DE DESASTRE: Borrar todo
DELETE FROM audit_log;
DELETE FROM usuario;
DELETE FROM paciente;
DELETE FROM token_revocado;
SQL

echo "❌ BD DESTRUIDA - Verificando..."
USERS_AFTER=$(psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" \
  -t -c "SELECT COUNT(*) FROM usuario;" 2>/dev/null || echo "0")
PACIENTES_AFTER=$(psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" \
  -t -c "SELECT COUNT(*) FROM paciente;" 2>/dev/null || echo "0")

echo "❌ Usuarios después del desastre: $USERS_AFTER (TODOS BORRADOS)"
echo "❌ Pacientes después del desastre: $PACIENTES_AFTER (TODOS BORRADOS)"
echo ""

echo "🔄 PASO 5: RESTAURAR desde BACKUP"
echo "─────────────────────────────────────────────────────────────────"

PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" < "$BACKUP_FILE" 2>&1 | tail -20

echo "✓ Restauración completada"
echo ""

echo "✅ PASO 6: VERIFICAR que los datos fueron restaurados"
echo "─────────────────────────────────────────────────────────────────"

USERS_RESTORED=$(psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" \
  -t -c "SELECT COUNT(*) FROM usuario;" 2>/dev/null || echo "0")

PACIENTES_RESTORED=$(psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" \
  -t -c "SELECT COUNT(*) FROM paciente;" 2>/dev/null || echo "0")

TEST_USER_EXISTS=$(psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" \
  -t -c "SELECT COUNT(*) FROM usuario WHERE username='test_user';" 2>/dev/null || echo "0")

echo "✅ Usuarios restaurados: $USERS_RESTORED"
echo "✅ Pacientes restaurados: $PACIENTES_RESTORED"
echo "✅ Usuario de prueba existe: $TEST_USER_EXISTS"
echo ""

echo "════════════════════════════════════════════════════════════════"
echo "📊 RESUMEN DEL TEST"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "ANTES del desastre:"
echo "  • Usuarios: $USERS_COUNT"
echo "  • Pacientes: $PACIENTES_COUNT"
echo ""
echo "DESPUÉS del desastre (antes de restaurar):"
echo "  • Usuarios: $USERS_AFTER ❌"
echo "  • Pacientes: $PACIENTES_AFTER ❌"
echo ""
echo "DESPUÉS de restaurar desde BACKUP:"
echo "  • Usuarios: $USERS_RESTORED ✅"
echo "  • Pacientes: $PACIENTES_RESTORED ✅"
echo "  • Usuario de prueba: $TEST_USER_EXISTS ✅"
echo ""

if [ "$USERS_RESTORED" == "$USERS_COUNT" ] && [ "$PACIENTES_RESTORED" == "$PACIENTES_COUNT" ]; then
  echo "✅✅✅ TEST EXITOSO ✅✅✅"
  echo "Los datos fueron completamente restaurados desde el backup"
  echo ""
  echo "Archivo de backup guardado en:"
  echo "  $BACKUP_FILE"
  echo "  Tamaño: $BACKUP_SIZE"
  exit 0
else
  echo "❌ TEST FALLIDO"
  exit 1
fi
