export const USER_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
`


export const TODO_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS ToDo (
        id SERIAL PRIMARY KEY,
        userid INT UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        status BOOLEAN NOT NULL,
        description VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userid)
            REFERENCES Users(id)
            ON DELETE CASCADE -- This means that if the worker id is deleted, all entries of bonus which are mapped with that
    );
`