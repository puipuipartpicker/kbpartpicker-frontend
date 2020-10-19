from ._base import Base

from sqlalchemy.schema import Column
from sqlalchemy.types import Boolean, Text, Integer
from sqlalchemy_utils import ChoiceType
from .types import ProductType, LayoutType, SizeType

class Product(Base):

    name = Column(Text, nullable=False)
    img_url = Column(Text, nullable=False)
    type = Column(ChoiceType(ProductType, impl=Integer()), nullable=False)
    size = Column(ChoiceType(SizeType, impl=Integer()))
    layout = Column(ChoiceType(LayoutType, impl=Integer()))
    hotswap = Column(Boolean)