
from bson import ObjectId
from .connection import db

# Colecciones
usuarios_collection = db["usuarios"]
condominios_collection = db["condominios"]

# Funciones de ejemplo

# Usuarios
def crear_usuario(usuario):
    result = usuarios_collection.insert_one(usuario)
    return str(result.inserted_id)

def obtener_usuario_por_id(usuario_id):
    return usuarios_collection.find_one({"_id": ObjectId(usuario_id)})

# Condominios
def crear_condominio(condominio):
    result = condominios_collection.insert_one(condominio)
    return str(result.inserted_id)

def listar_condominios():
    return list(condominios_collection.find())
