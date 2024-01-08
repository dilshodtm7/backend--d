
CREATE DATABASE winfake;

CREATE TABLE login(
    id SERIAL PRIMARY KEY,
    username VARCHAR(10),
    password VARCHAR(12),
    email VARCHAR(24),
    winid VARCHAR(12),
    status VARCHAR(16) default "inactive"
)
