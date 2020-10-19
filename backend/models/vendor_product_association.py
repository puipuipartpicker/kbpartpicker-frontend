from ._base import Base

from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Text, BigInteger

class VendorProductAssociation(Base):

    name = Column(Text, nullable=False)
    product_id = Column(BigInteger, ForeignKey('products.id'))
    product = relationship(
        'Product', backref='vendor_product_associations', foreign_keys=[product_id])
    vendor_id = Column(BigInteger, ForeignKey('vendors.id'))
    vendor = relationship(
        'Vendor', backref='vendor_product_associations', foreign_keys=[vendor_id])
