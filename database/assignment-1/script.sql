-- Active: 1677384415382@@127.0.0.1@8888@blog_app@public
CREATE TYPE user_role AS ENUM('author', 'admin', 'moderator');

CREATE TABLE users(
    id serial NOT NULL PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL,
    role user_role NOT NULL
);

CREATE TYPE post_status AS ENUM('draft', 'post');

CREATE TABLE posts(
    id serial NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    Foreign Key (user_id) REFERENCES users(id) ON DELETE NO ACTION,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    status post_status NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE categories(
    post_id int NOT NULL,
    Foreign Key (post_id) REFERENCES posts(id) ON DELETE NO ACTION,
    name VARCHAR(30) NOT NULL UNIQUE,
    description VARCHAR(100) NOT NULL
);

CREATE TABLE tags(
    post_id int NOT NULL,
    Foreign Key (post_id) REFERENCES posts(id) ON DELETE NO ACTION,
    name VARCHAR(30) NOT NULL UNIQUE,
    description VARCHAR (100) NOT NULL
);

CREATE TABLE comments(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    Foreign Key (user_id) REFERENCES users(id) ON DELETE NO ACTION,
    Foreign Key (post_id) REFERENCES posts(id) ON DELETE NO ACTION,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE replies(
    comment_id INT NOT NULL,
    Foreign Key (comment_id) REFERENCES comments(id) ON DELETE NO ACTION,
    reply TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE post_metadata(
    post_id INT NOT NULL,
    Foreign Key (post_id) REFERENCES posts(id) ON DELETE NO ACTION,
    views INT DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE
);

-- insert new user
INSERT INTO
    users(username, password, role)
VALUES
    ('Baymax', '1234', 'author');

INSERT INTO
    users(username, password, role)
VALUES
    ('sitaram', '1234', 'admin');

INSERT INTO
    posts(user_id, title, content, status)
VALUES
    (
        1,
        'Change password',
        'describe how to change password',
        'draft'
    );

UPDATE
    posts
SET
    status = 'post'
WHERE
    status = 'draft';

INSERT INTO
    comments(user_id, post_id, comment)
VALUES
    (1, 1, 'this is a comment');

INSERT INTO
    replies(comment_id, reply)
VALUES
    ('1', 'this is a reply');

INSERT INTO
    categories(post_id, name, description)
VALUES
    ('1', 'category1', 'this is category 1');

INSERT INTO
    tags(post_id, name, description)
VALUES
    ('1', 'tag1', 'this is tag 1');

INSERT INTO
    post_metadata(post_id, views, featured)
VALUES
    ('1', '200', TRUE);

-- select post by category or tag