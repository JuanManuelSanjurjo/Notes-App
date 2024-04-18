# Navega al directorio del backend
Set-Location -Path .\backend

# Verifica si el archivo .env existe
if (-not (Test-Path .\.env)) {
    Write-Host -ForegroundColor Yellow "Creating .env with DB configuration..."
    Set-Content -Path .\.env -Value 'DATABASE_URL="file:./dev.db"'
} else {
    Write-Host -ForegroundColor Yellow "El archivo .env ya existe. No se realizarán cambios."
    Write-Host -ForegroundColor Yellow "env file already exists. No changes required."
}

# Instala las dependencias del backend
Write-Host -ForegroundColor Yellow "Installing backend dependencies..."
npm install

Write-Host -ForegroundColor Yellow "Configuring SQLite database with Prisma..."
npx prisma migrate dev 

# Inicia el servidor backend con SQLite
Write-Host -ForegroundColor Yellow "Starting backend server..."
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "run dev"

# Navega al directorio del frontend
Set-Location -Path ..\frontend

# Instala las dependencias del frontend
Write-Host -ForegroundColor Yellow "Installing frontend dependencies..."
npm install

# Inicia el servidor de desarrollo del frontend con Vite
Write-Host -ForegroundColor Yellow "Starting development server with Vite..."
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "run dev"

Write-Host -ForegroundColor Yellow "Waiting for all services to start..."
