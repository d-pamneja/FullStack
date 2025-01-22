export const USER_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
`

export const USER_ADDRESS_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS Address (
        id SERIAL PRIMARY KEY,
        userid INT NOT NULL,
        street VARCHAR(50),
        city VARCHAR(50),
        country VARCHAR(50),
        pincode VARCHAR(50),
        FOREIGN KEY(userid)
            REFERENCES users(id)
            ON DELETE CASCADE -- This means that if the user id is deleted, all entries of addresses which are mapped with that user are deleted as well
    );
`


export const TODO_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS ToDo (
        id SERIAL PRIMARY KEY,
        userid INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        status BOOLEAN NOT NULL DEFAULT FALSE,
        description VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userid)
            REFERENCES Users(id)
            ON DELETE CASCADE -- This means that if the user id is deleted, all entries of todos which are mapped with that user are deleted as well
    );
`