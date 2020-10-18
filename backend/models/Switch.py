from ._base import Base

from sqlalchemy.schema import Column
from sqlalchemy.types import Text

class Switch(Base):

    name = Column(Text, nullable=False)
    img_url = Column(Text, nullable=False)