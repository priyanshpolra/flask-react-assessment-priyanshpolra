# ===========================
# 1) Backend image
# ===========================
FROM python:3.11-slim AS backend
WORKDIR /app

# Install backend dependencies
COPY src/apps/backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY src/apps/backend /app

# Expose backend port
EXPOSE 5001

# Default command
CMD ["python", "run.py"]


# ===========================
# 2) Frontend image (build Vite)
# ===========================
FROM node:20 AS frontend
WORKDIR /app

# Install dependencies
COPY src/apps/frontend/package*.json ./
RUN npm install

# Copy frontend source
COPY src/apps/frontend .

# Build React
RUN npm run build


# ===========================
# 3) Final image
# ===========================
FROM python:3.11-slim AS final
WORKDIR /app

# Copy backend Python environment
COPY --from=backend /usr/local/lib/python3.11 /usr/local/lib/python3.11

# Copy backend code
COPY --from=backend /app /app

# Copy built frontend
COPY --from=frontend /app/dist /app/static

EXPOSE 5001
CMD ["python", "run.py"]
