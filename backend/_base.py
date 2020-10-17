from datetime import datetime
from sqlalchemy.ext.declarative import declared_attr, declarative_base
from sqlalchemy.schema import Column
from sqlalchemy.types import DateTime, BigInteger


class Base(object):
    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()

    __table_args__ = {'mysql_engine': 'InnoDB'}

    id = Column(BigInteger, primary_key=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now())
    updated_at = Column(DateTime, nullable=False, default=datetime.now(), onupdate=datetime.now())


Base = declarative_base(cls=Base)