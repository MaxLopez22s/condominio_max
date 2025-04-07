
from pymongo import MongoClient

# URI de conexión a MongoDB Atlas
MONGO_URI = "mongodb+srv://maxlopez:max.lopez.22@cluster0.fixejdk.mongodb.net/"

# Crear cliente
client = MongoClient(MONGO_URI)

# Selección de base de datos (puedes cambiar 'condominios_db' al nombre que desees)
db = client["condominios_db"]
