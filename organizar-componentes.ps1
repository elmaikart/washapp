# ==========================================
# 🧩 Script: organizar-componentes.ps1
# Limpieza y reubicación de componentes WashApp
# ==========================================

Write-Host "🚀 Iniciando reorganización de componentes..."

# Paths base
$componentsPath = "src/components"
$uiPath = "$componentsPath/ui"
$commonPath = "$componentsPath/common"

# Crear carpetas si no existen
if (!(Test-Path $uiPath)) {
    New-Item -ItemType Directory -Path $uiPath | Out-Null
    Write-Host "📁 Carpeta creada: $uiPath"
}

if (!(Test-Path $commonPath)) {
    New-Item -ItemType Directory -Path $commonPath | Out-Null
    Write-Host "📁 Carpeta creada: $commonPath"
}

# Archivos a mover
$uiFiles = @("Card.tsx", "Header.tsx", "Footer.tsx")
$commonFiles = @("ModalUbicacion.tsx")

# Mover archivos UI
foreach ($file in $uiFiles) {
    $source = "$componentsPath\$file"
    $destination = "$uiPath\$file"
    if (Test-Path $source) {
        Move-Item -Path $source -Destination $destination -Force
        Write-Host "✅ Movido: $file → ui/"
    } else {
        Write-Host "⚠️ No encontrado (ya movido o no existe): $file"
    }
}

# Mover archivos comunes
foreach ($file in $commonFiles) {
    $source = "$componentsPath\$file"
    $destination = "$commonPath\$file"
    if (Test-Path $source) {
        Move-Item -Path $source -Destination $destination -Force
        Write-Host "✅ Movido: $file → common/"
    } else {
        Write-Host "⚠️ No encontrado (ya movido o no existe): $file"
    }
}

# Actualizar imports en todos los archivos del proyecto
Write-Host "`n🔍 Actualizando imports..."
Get-ChildItem -Path "src" -Include *.tsx, *.ts -Recurse | ForEach-Object {
    (Get-Content $_.FullName) |
    ForEach-Object {
        $_ -replace '@/components/Card', '@/components/ui/Card' `
           -replace '@/components/Header', '@/components/ui/Header' `
           -replace '@/components/Footer', '@/components/ui/Footer' `
           -replace '@/components/ModalUbicacion', '@/components/common/ModalUbicacion'
    } | Set-Content $_.FullName
}

Write-Host "`n🎯 Reorganización completada con éxito."
Write-Host "Estructura final:"
Write-Host "   src/components/ui/ → Card.tsx, Header.tsx, Footer.tsx"
Write-Host "   src/components/common/ → ModalUbicacion.tsx"
Write-Host "`n💡 Consejo: ejecutá 'npm run dev' para verificar que todo sigue funcionando correctamente."
