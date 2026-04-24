Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$assetsDir   = Join-Path $projectRoot "assets"
$icoPath     = Join-Path $assetsDir "icon.ico"

if (-not (Test-Path $assetsDir)) { New-Item -ItemType Directory -Path $assetsDir | Out-Null }

$size = 256
$bmp  = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g    = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.Clear([System.Drawing.Color]::Transparent)

# Fondo redondeado clay->terra
$r  = 52
$gp = New-Object System.Drawing.Drawing2D.GraphicsPath
$gp.AddArc(0, 0, $r*2, $r*2, 180, 90)
$gp.AddArc($size-$r*2, 0, $r*2, $r*2, 270, 90)
$gp.AddArc($size-$r*2, $size-$r*2, $r*2, $r*2, 0, 90)
$gp.AddArc(0, $size-$r*2, $r*2, $r*2, 90, 90)
$gp.CloseFigure()
$gb = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    [System.Drawing.PointF]::new(0,0), [System.Drawing.PointF]::new($size,$size),
    [System.Drawing.Color]::FromArgb(255,196,168,130),
    [System.Drawing.Color]::FromArgb(255,110,78,42))
$g.FillPath($gb, $gp)

# Pen blanco
$pen = New-Object System.Drawing.Pen([System.Drawing.Color]::White, 14)
$pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$pen.EndCap   = [System.Drawing.Drawing2D.LineCap]::Round

# Horizonte
$hy = 138
$g.DrawLine($pen, 30, $hy, 226, $hy)

# Arco sol
$g.DrawArc($pen, 70, 78, 116, 116, 180, 180)

# Rayos
$rays = @(270,225,315,180,0)
foreach ($a in $rays) {
    $rad = [Math]::PI * $a / 180.0
    $x1 = 128 + 68 * [Math]::Cos($rad); $y1 = $hy + 68 * [Math]::Sin($rad)
    $x2 = 128 + 92 * [Math]::Cos($rad); $y2 = $hy + 92 * [Math]::Sin($rad)
    $g.DrawLine($pen, [float]$x1, [float]$y1, [float]$x2, [float]$y2)
}

# Persona
$g.DrawEllipse($pen, 108, 154, 40, 40)
$g.DrawArc($pen, 88, 196, 80, 46, 0, 180)
$g.Dispose()

# PNG en memoria
$ms = New-Object System.IO.MemoryStream
$bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
$png = $ms.ToArray()
$ms.Close(); $bmp.Dispose()

# Escribir ICO (PNG-in-ICO, Windows Vista+)
$fs = New-Object System.IO.FileStream($icoPath, [System.IO.FileMode]::Create)
$w  = New-Object System.IO.BinaryWriter($fs)
$w.Write([uint16]0); $w.Write([uint16]1); $w.Write([uint16]1)
$w.Write([byte]0); $w.Write([byte]0); $w.Write([byte]0); $w.Write([byte]0)
$w.Write([uint16]1); $w.Write([uint16]32)
$w.Write([uint32]$png.Length); $w.Write([uint32]22)
$w.Write($png); $w.Flush(); $w.Close(); $fs.Close()

Write-Host "  [OK] Icono generado: $icoPath"
