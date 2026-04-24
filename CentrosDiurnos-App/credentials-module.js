// ═══════════════════════════════════════════════════════════════
// MÓDULO DE CREDENCIALES - Captura, generación e impresión
// ═══════════════════════════════════════════════════════════════

let credentialState = {
  photoData: null,
  cameraStream: null,
};

// ── INICIALIZAR CÁMARA ──────────────────────────────────────
async function initCamera() {
  try {
    const video = document.getElementById('cameraPreview');
    const canvas = document.getElementById('cameraCanvas');

    if (!video) return console.error('Video element not found');

    // Solicitar acceso a cámara
    credentialState.cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
      audio: false
    });

    video.srcObject = credentialState.cameraStream;
    video.style.display = 'block';
    document.getElementById('cameraControls').style.display = 'flex';
    document.getElementById('cameraMessage').style.display = 'none';
  } catch (err) {
    console.error('Error accessing camera:', err);
    document.getElementById('cameraMessage').textContent =
      '❌ No se pudo acceder a la cámara. Verifica los permisos.';
    document.getElementById('cameraMessage').style.display = 'block';
  }
}

// ── CAPTURAR FOTO ──────────────────────────────────────────
function capturePhoto() {
  const video = document.getElementById('cameraPreview');
  const canvas = document.getElementById('cameraCanvas');

  if (!video || !canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);

  credentialState.photoData = canvas.toDataURL('image/jpeg', 0.95);

  // Mostrar preview de foto
  document.getElementById('photoPreview').src = credentialState.photoData;
  document.getElementById('photoPreview').style.display = 'block';
  document.getElementById('captureBtn').textContent = '📸 Capturar de nuevo';

  // Generar credencial con la nueva foto
  generateCredential();
}

// ── DETENER CÁMARA ──────────────────────────────────────────
function stopCamera() {
  if (credentialState.cameraStream) {
    credentialState.cameraStream.getTracks().forEach(track => track.stop());
    credentialState.cameraStream = null;
  }
  const video = document.getElementById('cameraPreview');
  if (video) video.style.display = 'none';
  document.getElementById('cameraControls').style.display = 'none';
  document.getElementById('cameraMessage').style.display = 'block';
  document.getElementById('cameraMessage').textContent = '📷 Clic para acceder a la cámara';
}

// ── GENERAR CREDENCIAL ──────────────────────────────────────
function generateCredential() {
  const nombre = document.getElementById('f_nombre')?.value || 'SIN NOMBRE';
  const rut = document.getElementById('f_rut')?.value || '';
  const dv = document.getElementById('f_dv')?.value || '';
  const edad = document.getElementById('f_edad')?.value || '—';

  const rutCompleto = rut && dv ? `${rut}-${dv}` : rut;

  const credentialHTML = `
    <div class="cred">
      <div class="franja"></div>
      <div class="chdr">
        <div class="chlg">
          <img src="${credentialState.photoData || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2232%22 height=%2232%22%3E%3Crect fill=%22%23ddd%22 width=%2232%22 height=%2232%22/%3E%3C/svg%3E'}" alt="Foto">
        </div>
        <div class="chtxt">
          <div class="chorg">Centro Diurno</div>
          <div class="chsub">SENAMA 2025</div>
        </div>
      </div>
      <div class="cbody">
        <div class="cname">${nombre.substring(0, 30)}</div>
        <div class="cmeta">
          <div><span class="clbl">RUT:</span> <span class="cval">${rutCompleto}</span></div>
          <div><span class="clbl">Edad:</span> <span class="cval">${edad} años</span></div>
        </div>
      </div>
      <div class="cfoot">
        <div class="cfoottx">Válida 2025</div>
      </div>
      <div class="franja-b"></div>
    </div>
  `;

  document.getElementById('credentialPreview').innerHTML = credentialHTML;
}

// ── IMPRIMIR CREDENCIAL ────────────────────────────────────
function printCredential() {
  if (!credentialState.photoData) {
    alert('❌ Debes capturar una foto primero');
    return;
  }

  const printWindow = window.open('', '_blank');
  const nombre = document.getElementById('f_nombre')?.value || 'SIN NOMBRE';
  const rut = document.getElementById('f_rut')?.value || '';
  const dv = document.getElementById('f_dv')?.value || '';
  const rutCompleto = rut && dv ? `${rut}-${dv}` : rut;
  const edad = document.getElementById('f_edad')?.value || '—';

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Imprimir Credencial</title>
      <style>
        :root {
          --vd: #1a5c28;
          --vm: #2d7a3a;
          --vc: #4aaa5a;
          --vs: #a8d5a2;
          --vp: #e8f5eb;
          --oro: #d4a843;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { padding: 20px; background: #f0f0f0; font-family: 'DM Sans', sans-serif; }
        .print-container { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }

        .cred {
          width: 330px;
          height: 220px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 28px rgba(0,0,0,.28);
          background: #fff;
          display: flex;
          flex-direction: column;
        }
        .franja {
          height: 5px;
          background: linear-gradient(90deg, #d4a843 33%, #1a5c28 33% 66%, #a8d5a2 66%);
        }
        .franja-b {
          height: 5px;
          background: linear-gradient(90deg, #4aaa5a 33%, #1a5c28 33% 66%, #d4a843 66%);
        }
        .chdr {
          height: 46px;
          background: linear-gradient(135deg, #1a5c28, #2d7a3a 55%, #4aaa5a);
          padding: 0 10px;
          display: flex;
          align-items: center;
          gap: 7px;
          border-bottom: 2px solid rgba(255,255,255,.2);
        }
        .chlg {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          overflow: hidden;
          border: 1.5px solid rgba(255,255,255,.45);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .chlg img {
          width: 32px;
          height: 32px;
          object-fit: cover;
        }
        .chtxt { flex: 1; }
        .chorg {
          font-size: 7.5px;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: .4px;
          line-height: 1.3;
        }
        .chsub {
          font-size: 6px;
          color: rgba(255,255,255,.75);
          margin-top: 1px;
        }
        .cbody {
          flex: 1;
          background: linear-gradient(135deg, #f5fff7, #e8f5eb);
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .cname {
          font-size: 11px;
          font-weight: 700;
          color: #1a5c28;
          line-height: 1.2;
          margin-bottom: 4px;
        }
        .cmeta {
          font-size: 8px;
          color: #2d7a3a;
          line-height: 1.4;
        }
        .clbl {
          font-weight: 600;
          color: #1a5c28;
        }
        .cval {
          color: #4aaa5a;
          font-weight: 500;
        }
        .cfoot {
          height: 26px;
          background: #f5fff7;
          border-top: 1px solid #a8d5a2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          color: #2d7a3a;
          font-weight: 600;
        }
        @media print {
          body { background: white; padding: 0; }
          .print-container { gap: 0; }
          .cred { box-shadow: none; }
        }
      </style>
    </head>
    <body>
      <div class="print-container">
        <div class="cred">
          <div class="franja"></div>
          <div class="chdr">
            <div class="chlg"><img src="${credentialState.photoData}" alt="Foto"></div>
            <div class="chtxt">
              <div class="chorg">Centro Diurno</div>
              <div class="chsub">SENAMA 2025</div>
            </div>
          </div>
          <div class="cbody">
            <div class="cname">${nombre}</div>
            <div class="cmeta">
              <div><span class="clbl">RUT:</span> <span class="cval">${rutCompleto}</span></div>
              <div><span class="clbl">Edad:</span> <span class="cval">${edad} años</span></div>
            </div>
          </div>
          <div class="cfoot">
            <div class="cfoottx">Válida 2025</div>
          </div>
          <div class="franja-b"></div>
        </div>
      </div>
      <script>
        window.print();
        setTimeout(() => window.close(), 500);
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

// ── GUARDAR FOTO EN OBJETO PACIENTE ────────────────────────
function guardarFotoEnPaciente(paciente) {
  if (credentialState.photoData) {
    paciente.foto = credentialState.photoData;
    paciente.credentialDate = new Date().toISOString();
  }
}

// ── CARGAR FOTO EN FORMULARIO (EDICIÓN) ────────────────────
function cargarFotoEnFormulario(photoData) {
  if (!photoData) return;
  credentialState.photoData = photoData;
  document.getElementById('photoPreview').src = photoData;
  document.getElementById('photoPreview').style.display = 'block';
  generateCredential();
}
