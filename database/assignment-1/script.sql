-- Active: 1677603582207@@127.0.0.1@8888@blog_app_v2@public
CREATE TYPE user_role AS ENUM('author', 'admin', 'moderator');

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    role user_role NOT NULL
);

CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(100) NOT NULL
);

CREATE TYPE post_status AS ENUM('draft', 'published');

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    Foreign Key (user_id) REFERENCES users(id) ON DELETE NO ACTION,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    status post_status NOT NULL,
    category_id INT NOT NULL,
    Foreign Key (category_id) REFERENCES categories(id) ON DELETE NO ACTION,
    created_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tags(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(100) NOT NULL
);

-- one post can have many tags and one tag can be associated with many posts
CREATE TABLE post_tags(
    post_id INT NOT NULL,
    Foreign Key (post_id) REFERENCES posts(id) ON DELETE NO ACTION,
    tag_id INT NOT NULL,
    Foreign Key (tag_id) REFERENCES tags(id) ON DELETE NO ACTION,
    PRIMARY KEY (post_id, tag_id)
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    Foreign Key (user_id) REFERENCES users(id) ON DELETE NO ACTION,
    post_id INT NOT NULL,
    Foreign Key (post_id) REFERENCES posts(id) ON DELETE NO ACTION,
    comment TEXT NOT NULL,
    parent_comment_id INT REFERENCES comments(id) ON DELETE NO ACTION,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE metadata(
    id SERIAL PRIMARY KEY,
    views INT DEFAULT 0,
    featured BOOLEAN DEFAULT false
);

CREATE TABLE post_metadata(
    metadata_id INT NOT NULL UNIQUE,
    Foreign Key (metadata_id) REFERENCES metadata(id),
    post_id INT NOT NULL UNIQUE,
    Foreign Key (post_id) REFERENCES posts(id),
    PRIMARY KEY (metadata_id, post_id)
);

-- insert author 
INSERT INTO
    users(email, password, role)
VALUES
    ('sita@gmail.com', '1234', 'author');

-- insert admin
INSERT INTO
    users(email, password, role)
VALUES
    ('ram@gmail.com', '1234', 'admin');

-- create category
INSERT INTO
    categories(name, description)
VALUES
    ('category1', 'category1 description'),
    ('category2', 'category2 description');

-- create tags
INSERT INTO
    tags(name, description)
VALUES
    ('tag1', 'tag1 description'),
    ('tag2', 'tag2 description');

-- create a new post with draft
INSERT INTO
    posts(user_id, title, content, status, category_id)
VALUES
    (1, 'post1 title', 'post1 content', 'draft', 1);

-- add tags to a post
INSERT INTO
    post_tags(post_id, tag_id)
VALUES
    (1, 1),
    (1, 2);

-- create metadata for a post1
INSERT INTO
    metadata(views, featured)
VALUES
    (DEFAULT, DEFAULT);

INSERT INTO
    post_metadata(metadata_id, post_id)
VALUES
    (1, 1);

-- publish post1
UPDATE
    posts
SET
    status = 'published'
WHERE
    id = 1
    AND status = 'draft';

-- make a post featured
UPDATE
    metadata
set
    featured = TRUE
WHERE
    EXISTS(
        SELECT
            *
        from
            metadata
            INNER JOIN post_metadata ON post_metadata.metadata_id = metadata.id
            AND post_metadata.post_id = 1
    );

-- add comment/reply
INSERT INTO
    comments(user_id, post_id, comment)
VALUES
    (2, 1, 'comment1 to a post1 by user2');

INSERT INTO
    comments(user_id, post_id, comment, parent_comment_id)
VALUES
    (1, 1, 'reply to comment1 on post1 by user1', 1);

-- retrieving posts by category/tag
SELECT
    users.email as author,
    posts.title,
    posts.content,
    categories.name as category
FROM
    users
    INNER JOIN posts ON posts.user_id = users.id
    INNER JOIN categories ON categories.id = posts.category_id
WHERE
    categories.name = 'category1';

-- increase views only if post exists
UPDATE
    metadata
set
    views = views + 1
WHERE
    EXISTS(
        SELECT
            *
        from
            metadata
            INNER JOIN post_metadata ON post_metadata.metadata_id = metadata.id
            AND post_metadata.post_id = 1
    );

-- retrieving featured posts
SELECT
    users.email as author,
    posts.title,
    posts.content,
    metadata.views,
    metadata.featured
FROM
    users
    INNER JOIN posts ON posts.user_id = users.id
    INNER JOIN post_metadata ON post_metadata.post_id = posts.id
    INNER JOIN metadata on metadata.id = post_metadata.metadata_id
WHERE
    metadata.featured = TRUE;

-- retrieving popular posts
SELECT
    users.email as author,
    posts.title,
    posts.content,
    metadata.views
FROM
    users
    INNER JOIN posts ON posts.user_id = users.id
    INNER JOIN post_metadata ON post_metadata.post_id = posts.id
    INNER JOIN metadata ON metadata.id = post_metadata.metadata_id
ORDER BY
    metadata.views DESC
LIMIT
    10;