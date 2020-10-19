from datetime import datetime
from inflection import underscore, pluralize
from sqlalchemy.ext.declarative import declared_attr, declarative_base
from sqlalchemy.schema import Column
from sqlalchemy.types import DateTime, BigInteger
from sqlalchemy.exc import IntegrityError
from sqlalchemy.sql.expression import ClauseElement


class BaseModel:
    @declared_attr
    def __tablename__(cls):
        return pluralize(underscore(cls.__name__.lower()))

    # __table_args__ = {'mysql_engine': 'InnoDB'}

    id = Column(BigInteger, primary_key=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now())
    updated_at = Column(DateTime, nullable=False, default=datetime.now(), onupdate=datetime.now())

    @classmethod
    def get_or_create(cls, session, **kwargs):
        query = session.query(cls).filter_by(**kwargs).with_lockmode("update")
        instance = query.one_or_none()
        if instance:
            session.begin()
            session.commit()
            return instance, False
        else:
            params = dict((k, v) for k, v in kwargs.items() if not isinstance(v, ClauseElement))
            instance = cls(**params)
            try:
                session.add(instance)
                session.begin()
                session.commit()
                return instance, True
            except IntegrityError as e:
                error_message = e.args[0]
                if "Duplicate entry" in error_message:
                    session.rollback()
                    print(error_message, file=sys.stderr)
                    return query.one(), False
                else:
                    raise e


Base = declarative_base(cls=BaseModel)