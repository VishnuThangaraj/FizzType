from fastapi import HTTPException, status
from pymongo.errors import DuplicateKeyError
from beanie.operators import Or

from src.models.User import User
from src.utils.security import verify_password, create_access_token
from src.schemas.authSchemas import RegisterRequest,LoginRequest

# Login User
async def login_user(data:LoginRequest):

    existing_user = await User.find_one(
        User.email == data.email
    )

    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    if not verify_password(data.password, existing_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    print(existing_user)
    user_data = existing_user.model_dump(exclude={"password"})
    user_data["id"] = str(existing_user.id)
    
    access_token = create_access_token(data={"sub": user_data["id"]})

    return {
        "message": "User logged in successfully",
        "user": user_data,
        "token": access_token
    }

# Create New User
async def create_user(data: RegisterRequest):

    existing_user = await User.find_one(
        Or(User.email == data.email, User.username == data.username)
    )
    
    if existing_user:
        if existing_user.email == data.email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        if existing_user.username == data.username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken"
            )

    user = User(
        username=data.username,
        email=data.email,
        password=data.password,
    )

    try:
        await user.insert()
    except DuplicateKeyError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already exists"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while creating the user"
        )
    
    user_data = user.model_dump(exclude={"password"})
    user_data["id"] = str(user.id)
    
    access_token = create_access_token(data={"sub": user_data["id"]})

    return {
        "message": "User created successfully",
        "user": user_data,
        "token": access_token
    }