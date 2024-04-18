#!/bin/bash

# Define el color amarillo
YELLOW='\033[0;33m'

# Navega al directorio del backend
cd backend

if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env with DB configuration...${YELLOW}"
    echo 'DATABASE_URL="file:./dev.db"' > .env
else
    echo -e "${YELLOW}El archivo .env ya existe. No se realizarán cambios.${YELLOW}"
    echo -e "${YELLOW}env file already exists. No changes required.${YELLOW}"
fi

# Instala las dependencias del backend
echo -e "${YELLOW}Installing backend dependencies...${YELLOW}"
npm install

echo -e "${YELLOW}Configuring SQLite database with Prisma...${YELLOW}"
npx prisma migrate dev 

# Inicia el servidor backend con SQLite
echo -e "${YELLOW}Starting backend server...${YELLOW}"
npm run dev &

# Navega al directorio del frontend
cd ../frontend

# Instala las dependencias del frontend
echo -e "${YELLOW}Installing frontend dependencies...${YELLOW}"
npm install

# Inicia el servidor de desarrollo del frontend con Vite
echo -e "${YELLOW}Starting development server with Vite...${YELLOW}"
npm run dev &

echo -e "${YELLOW}Waiting for all services to start...${YELLOW}"

wait
