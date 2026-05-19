from fastapi import APIRouter
from src.schemas.authSchemas import RegisterRequest, LoginRequest
from src.controllers.authController import create_user, login_user

router = APIRouter(prefix="/auth")

@router.post("/register")
async def register(user: RegisterRequest):
    return await create_user(user)

@router.post("/login")
async def login(credentials: LoginRequest):
    return await login_user(credentials)