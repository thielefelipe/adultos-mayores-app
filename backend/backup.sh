#!/bin/bash
# Script de backup de PostgreSQL
# Uso: ./backup.sh

set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"
BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.sql"

# Crear directorio si no existe
mkdir -p "$BACKUP_DIR"

# Variables de BD
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_NAME=${DB_NAME:-centros_diurnos_db}
DB_USER=${DB_USERNAME:-admin}

echo "🔄 Iniciando backup de $DB_NAME..."

# Ejecutar pg_dump
PGPASSWORD=$DB_PASSWORD pg_dump \
  -h "$DB_HOST" \
  -p "$DB_PORT" \
  -U "$DB_USER" \
  -d "$DB_NAME" \
  --no-password \
  > "$BACKUP_FILE"

echo "✅ Backup completado: $BACKUP_FILE"
echo "📊 Tamaño: $(du -h "$BACKUP_FILE" | cut -f1)"
echo ""
echo "Para restaurar:"
echo "  PGPASSWORD=\$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME < $BACKUP_FILE"
