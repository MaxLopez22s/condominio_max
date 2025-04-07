from fastapi import FastAPI
from condominios.db import models
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class Usuario(BaseModel):
    nombre: str
    email: str
    rol: Optional[str] = "usuario"

class Condominio(BaseModel):
    nombre: str
    direccion: str

@app.get("/")
def inicio():
    return {"mensaje": "API de Condominios funcionando 🔥"}

@app.get("/condominios")
def listar_condominios():
    return models.listar_condominios()

@app.post("/usuarios")
def crear_usuario(usuario: Usuario):
    nuevo_id = models.crear_usuario(usuario.dict())
    return {"mensaje": "Usuario creado", "id": nuevo_id}
