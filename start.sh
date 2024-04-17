#!/bin/bash

# Navega al directorio del backend
cd backend

# Instala las dependencias del backend
echo "Instalando dependencias del backend..."
npm install

# Inicia el servidor backend con SQLite
echo "Iniciando servidor backend..."
npm run dev

# Navega al directorio del frontend
cd ../frontend

# Instala las dependencias del frontend
echo "Instalando dependencias del frontend..."
npm install

# Inicia el servidor de desarrollo del frontend con Vite
echo "Iniciando servidor de desarrollo del frontend con Vite..."
npm run dev
