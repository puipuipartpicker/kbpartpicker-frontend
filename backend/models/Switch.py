from ._base import Base

from sqlalchemy.schema import Column
from sqlalchemy.types import Boolean, Text, Integer
from sqlalchemy_utils import ChoiceType

class Product(Base):

    name = Column(Text, nullable=False)
    img_url = Column(Text, nullable=False)
    product_type = Column(ChoiceType(ProductType, impl=Integer()))
    product_size = Column(ChoiceType(SizeType, impl=Integer()))
    hotswap = Column(Boolean)