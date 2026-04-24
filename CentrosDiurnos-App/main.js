const { app, BrowserWindow, Menu, dialog, ipcMain, nativeImage } = require('electron');
const path = require('path');
const fs   = require('fs');
const os   = require('os');

let mainWindow;

// Ruta al ícono (funciona tanto en desarrollo como instalado)
function getIconPath() {
  const candidates = [
    path.join(__dirname, 'assets', 'icon.ico'),
    path.join(process.resourcesPath || '', 'assets', 'icon.ico'),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return undefined;
}

function createWindow() {
  const iconPath = getIconPath();

  mainWindow = new BrowserWindow({
    width:    1440,
    height:   900,
    minWidth:  960,
    minHeight: 640,
    title: 'Centros Diurnos — Línea Base 2025',
    icon: iconPath,
    backgroundColor: '#FAF7F2',
    show: false,           // evita flash en blanco al cargar
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile('index.html');

  // Mostrar ventana cuando esté lista para evitar flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
}

// ── IPC: guardar archivo desde renderer ──────────────
ipcMain.handle('save-file', async (event, filename, content, filters) => {
  const { filePath, canceled } = await dialog.showSaveDialog(mainWindow, {
    title: 'Guardar archivo',
    defaultPath: filename,
    filters: filters || [{ name: 'Todos los archivos', extensions: ['*'] }],
  });
  if (canceled || !filePath) return { success: false };
  fs.writeFileSync(filePath, content, 'utf8');
  return { success: true, filePath };
});

// ── IPC: cargar backup JSON ───────────────────────────
ipcMain.handle('load-json', async () => {
  const { filePaths, canceled } = await dialog.showOpenDialog(mainWindow, {
    title: 'Cargar copia de seguridad',
    filters: [{ name: 'JSON', extensions: ['json'] }],
    properties: ['openFile'],
  });
  if (canceled || !filePaths.length) return { success: false };
  const content = fs.readFileSync(filePaths[0], 'utf8');
  return { success: true, content };
});

// ── SYNC: Configuración OneDrive ──────────────────────
function getConfigPath() {
  return path.join(app.getPath('userData'), 'sync-config.json');
}

function readConfig() {
  try {
    return JSON.parse(fs.readFileSync(getConfigPath(), 'utf8'));
  } catch {
    return { dataFolder: null };
  }
}

function writeConfig(cfg) {
  fs.writeFileSync(getConfigPath(), JSON.stringify(cfg, null, 2), 'utf8');
}

function getDataFilePath(cfg) {
  if (!cfg || !cfg.dataFolder) return null;
  return path.join(cfg.dataFolder, 'datos.json');
}

function detectOneDrivePath() {
  const fromEnv = process.env.OneDrive || process.env.ONEDRIVE || process.env.OneDriveConsumer;
  if (fromEnv && fs.existsSync(fromEnv)) return fromEnv;
  const home = os.homedir();
  const candidates = [
    path.join(home, 'OneDrive'),
    path.join(home, 'OneDrive - Personal'),
    path.join(home, 'OneDrive Personal'),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

let fileWatcher = null;

function startWatcher(cfg) {
  if (fileWatcher) { fileWatcher.close(); fileWatcher = null; }
  const filePath = getDataFilePath(cfg);
  if (!filePath || !fs.existsSync(path.dirname(filePath))) return;
  let debounce = null;
  fileWatcher = fs.watch(path.dirname(filePath), (event, filename) => {
    if (filename !== 'datos.json') return;
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('db:changed');
      }
    }, 500);
  });
}

ipcMain.handle('db:getConfig', () => readConfig());

ipcMain.handle('db:setConfig', (event, cfg) => {
  writeConfig(cfg);
  startWatcher(cfg);
  return { ok: true };
});

ipcMain.handle('db:detectOneDrive', () => ({ path: detectOneDrivePath() }));

ipcMain.handle('db:selectFolder', async () => {
  const { filePaths, canceled } = await dialog.showOpenDialog(mainWindow, {
    title: 'Seleccionar carpeta compartida en OneDrive',
    properties: ['openDirectory', 'createDirectory'],
  });
  if (canceled || !filePaths.length) return { canceled: true };
  return { path: filePaths[0] };
});

ipcMain.handle('db:read', () => {
  const cfg = readConfig();
  const filePath = getDataFilePath(cfg);
  if (!filePath) return { ok: false, reason: 'not-configured' };
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    const empty = { version: 1, pacientes: [], meta: { created: new Date().toISOString() } };
    fs.writeFileSync(filePath, JSON.stringify(empty, null, 2), 'utf8');
    return { ok: true, data: empty };
  }
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return { ok: true, data };
  } catch (e) {
    return { ok: false, reason: 'parse-error', error: e.message };
  }
});

ipcMain.handle('db:write', (event, pacientes) => {
  const cfg = readConfig();
  const filePath = getDataFilePath(cfg);
  if (!filePath) return { ok: false, reason: 'not-configured' };
  try {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    const data = {
      version: 1,
      pacientes,
      meta: { lastModified: new Date().toISOString(), modifiedBy: os.hostname() }
    };
    const tmpPath = filePath + '.tmp';
    fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tmpPath, filePath);
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: 'write-error', error: e.message };
  }
});

// ── Menú de aplicación ────────────────────────────────
function buildMenu() {
  const template = [
    {
      label: 'Archivo',
      submenu: [
        {
          label: 'Nuevo adulto mayor',
          accelerator: 'CmdOrCtrl+N',
          click: () => mainWindow?.webContents.executeJavaScript('abrirModal()'),
        },
        { type: 'separator' },
        {
          label: 'Exportar CSV…',
          accelerator: 'CmdOrCtrl+E',
          click: () => mainWindow?.webContents.executeJavaScript('exportarDatos()'),
        },
        {
          label: 'Guardar copia de seguridad (JSON)…',
          accelerator: 'CmdOrCtrl+S',
          click: () => mainWindow?.webContents.executeJavaScript('guardarBackup()'),
        },
        {
          label: 'Restaurar desde copia de seguridad…',
          accelerator: 'CmdOrCtrl+O',
          click: () => mainWindow?.webContents.executeJavaScript('cargarDatos()'),
        },
        { type: 'separator' },
        { label: 'Salir', role: 'quit' },
      ],
    },
    {
      label: 'Ver',
      submenu: [
        { label: 'Recargar', role: 'reload' },
        { type: 'separator' },
        { label: 'Ampliar',          role: 'zoomIn',         accelerator: 'CmdOrCtrl+=' },
        { label: 'Reducir',          role: 'zoomOut',        accelerator: 'CmdOrCtrl+-' },
        { label: 'Restablecer zoom', role: 'resetZoom',      accelerator: 'CmdOrCtrl+0' },
        { type: 'separator' },
        { label: 'Pantalla completa', role: 'togglefullscreen', accelerator: 'F11' },
      ],
    },
    {
      label: 'Ayuda',
      submenu: [
        {
          label: 'Acerca de la aplicación',
          click: () =>
            dialog.showMessageBox(mainWindow, {
              title:   'Acerca de',
              message: 'Centros Diurnos SENAMA',
              detail:  'Sistema de registro y seguimiento de adultos mayores.\n' +
                       'Línea Base 2025 · SENAMA\n\n' +
                       'Versión 1.0.0',
              type:    'info',
              buttons: ['Cerrar'],
              icon:    getIconPath() ? nativeImage.createFromPath(getIconPath()) : undefined,
            }),
        },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  createWindow();
  buildMenu();

  // Iniciar watcher de sincronización
  const cfg = readConfig();
  startWatcher(cfg);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (fileWatcher) fileWatcher.close();
  if (process.platform !== 'darwin') app.quit();
});
