from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class SystemBase(BaseModel):
    name: str
    description: Optional[str] = None
    owner: str
    status: str = "active"

class SystemCreate(SystemBase):
    pass

class System(SystemBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class ComputationalResourceBase(BaseModel):
    resource_type: str
    cpu_cores: Optional[int] = None
    memory_gb: Optional[float] = None
    storage_gb: Optional[float] = None
    ip_address: Optional[str] = None
    hostname: Optional[str] = None
    os: Optional[str] = None
    status: str = "active"

class ComputationalResourceCreate(ComputationalResourceBase):
    system_id: int

class ComputationalResource(ComputationalResourceBase):
    id: int
    system_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class SystemWithResources(System):
    resources: List[ComputationalResource] = []