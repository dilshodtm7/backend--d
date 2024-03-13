
CREATE DATABASE winfake;

CREATE TABLE login(
    id SERIAL PRIMARY KEY,
    email VARCHAR(24),
    password VARCHAR(12), 
    status VARCHAR(16) default "inactive"
)
