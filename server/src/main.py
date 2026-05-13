import uvicorn
from os import getenv
from fastapi import FastAPI
from dotenv import load_dotenv
from contextlib import asynccontextmanager
from src.config.corsConfig import setup_cors
from src.config.dbConfig import connect_db, close_db

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    #startup
    await connect_db()
    yield
    #shutdown
    await close_db()

app = FastAPI(title="TypeFizz API", lifespan=lifespan)

# Apply CORS middleware
setup_cors(app)

@app.get('/')
def root():
    return {
        'message': 'TypeFizz Server Running...',
        'version': '0.0.1',
    }

if __name__ == "__main__":
    port = int(getenv("PORT"))
    uvicorn.run("src.main:app", host="localhost", port=port, reload=True)
