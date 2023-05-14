from enum import Enum
from langchain.sql_database import SQLDatabase
from sqlalchemy.engine import create_engine
import json
from decouple import config
from snowflake.sqlalchemy import URL


class DatabaseType(Enum):
    BigQuery = "bigquery"
    Snowflake = "snowflake"
    DuckDB = "duckdb"


class DatabaseFactory:
    @classmethod
    def create_database(cls) -> SQLDatabase:
        db_type = DatabaseType(config("DB_TYPE"))
        match db_type:
            case DatabaseType.BigQuery:
                return cls.__create_bigquery_database()
            case DatabaseType.Snowflake:
                return cls.__create_snowflake_database()
            case DatabaseType.DuckDB:
                return cls.__create_duck_db_database()
            case _:
                raise Exception("Database Type not supported")

    @classmethod
    def __create_bigquery_database(cls) -> SQLDatabase:
        engine = create_engine(
            "bigquery://", credentials_info=json.loads(config("BQ_API_KEY"))
        )
        return SQLDatabase(engine=engine)

    @classmethod
    def __create_duck_db_database(cls) -> SQLDatabase:
        engine = create_engine("duckdb:///:memory:")
        # you need to create the table before SQLDatabase is initialised
        # otherwise SQLAlchemy will say there are no tables
        csv_path = config("DUCKDB_CSV_PATH")
        if csv_path:
            with engine.connect() as con:
                con.execute(
                    f"CREATE TABLE leads AS SELECT * FROM read_csv_auto('{csv_path}')"
                )
        else:
            print("DUCKDB_CSV_PATH not set, skipping table creation")

        db = SQLDatabase(engine=engine)
        return db

    @classmethod
    def __create_snowflake_database(cls) -> SQLDatabase:
        engine = create_engine(
            URL(
                account=config("SNOWFLAKE_ACCOUNT"),
                user=config("SNOWFLAKE_USER"),
                password=config("SNOWFLAKE_PASSWORD"),
                database=config("SNOWFLAKE_DATABASE"),
                schema=config("SNOWFLAKE_SCHEMA"),
            )
        )
        connection = engine.connect()
        return SQLDatabase(
            engine=engine, include_tables=[config("SNOWFLAKE_TABLE")]
        )  # TODO: Create Vector Store & Embeddings
