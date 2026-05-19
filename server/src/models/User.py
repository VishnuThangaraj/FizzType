from typing import Optional
from datetime import datetime
from beanie import Document, before_event, Insert, Save
from pydantic import Field
from pymongo import IndexModel, ASCENDING

from src.utils.security import hash_password

class User(Document):
    username:str
    email:str
    password:str

    createdAt: Optional[datetime] = Field(default_factory=datetime.utcnow)
    updatedAt: Optional[datetime] = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "users"
        indexes = [IndexModel([("email", ASCENDING)], unique=True),
        IndexModel([("username", ASCENDING)], unique=True)]

    @before_event(Insert)
    async def hash_password(self):
        self.password = hash_password(self.password)

    @before_event(Save)
    async def update_timestamps(self):
        self.updatedAt = datetime.utcnow()