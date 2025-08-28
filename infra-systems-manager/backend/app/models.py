from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class System(Base):
    __tablename__ = "systems"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text)
    owner = Column(String, nullable=False)
    status = Column(String, default="active")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    resources = relationship("ComputationalResource", back_populates="system")

class ComputationalResource(Base):
    __tablename__ = "computational_resources"

    id = Column(Integer, primary_key=True, index=True)
    system_id = Column(Integer, ForeignKey("systems.id"))
    resource_type = Column(String, nullable=False)
    cpu_cores = Column(Integer)
    memory_gb = Column(Float)
    storage_gb = Column(Float)
    ip_address = Column(String)
    hostname = Column(String)
    os = Column(String)
    status = Column(String, default="active")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    system = relationship("System", back_populates="resources")