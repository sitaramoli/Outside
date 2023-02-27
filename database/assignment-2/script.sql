-- Active: 1677384415382@@127.0.0.1@8888@twitter_app@public
-- create users
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL
);

-- insert into users
INSERT INTO
    users(email, password)
VALUES
    ('sitaramoli1998@gmail.com', '1234');

INSERT INTO
    users(email, password)
VALUES
    ('user@gmail.com', '1234');

-- create tweets
CREATE TABLE tweets(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    Foreign Key (user_id) REFERENCES users(id) ON DELETE NO ACTION,
    text VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- post tweet
INSERT INTO
    tweets(user_id, text)
VALUES
    (1, 'this is my first tweet');

-- create followers
CREATE TABLE followers(
    user_id int NOT NULL,
    follower_id int NOT NULL,
    Foreign Key (user_id) REFERENCES users(id) ON DELETE NO ACTION,
    Foreign Key (follower_id) REFERENCES users(id) ON DELETE NO ACTION
);

-- follow user
INSERT INTO
    followers(user_id, follower_id)
VALUES
    (1, 2);

-- create followings
CREATE TABLE followings(
    user_id INT NOT NULL,
    following_id INT NOT NULL,
    Foreign Key (user_id) REFERENCES users(id) ON DELETE NO ACTION,
    Foreign Key (following_id) REFERENCES users(id) ON DELETE NO ACTION
);

-- followed by the user
INSERT INTO
    followings(user_id, following_id)
VALUES
    (1, 2);

-- create likes
CREATE TABLE likes(
    tweet_id INT NOT NULL,
    Foreign Key (tweet_id) REFERENCES tweets(id) ON DELETE NO ACTION,
    likes_count INT DEFAULT 0
);

-- create liked by
CREATE TABLE liked_by(
    tweet_id INT NOT NULL,
    Foreign Key (tweet_id) REFERENCES tweets(id) ON DELETE NO ACTION,
    user_id INT NOT NULL,
    Foreign Key (user_id) REFERENCES users(id) ON DELETE NO ACTION
);

-- like a tweet
INSERT INTO
    likes(tweet_id, likes_count)
VALUES
    (1, 1);

INSERT INTO
    liked_by(tweet_id, user_id)
VALUES
    (1, 1);

-- create comments
CREATE TABLE comments(
    tweet_id INT NOT NULL,
    Foreign Key (tweet_id) REFERENCES tweets(id) ON DELETE NO ACTION,
    user_id INT NOT NULL,
    Foreign Key (user_id) REFERENCES users(id) ON DELETE NO ACTION,
    created_at TIMESTAMP DEFAULT NOW(),
    comment VARCHAR(200) NOT NULL
);

-- comment in a tweet
INSERT INTO
    comments(tweet_id, user_id, comment)
VALUES
    (1, 2, 'this is commented by user 2');

-- hastags
CREATE TABLE hastags(
    tweet_id INT NOT NULL,
    Foreign Key (tweet_id) REFERENCES tweets(id) ON DELETE NO ACTION,
    tag VARCHAR(50) NOT NULL,
    PRIMARY KEY(tweet_id, tag)
);

INSERT INTO
    hastags(tweet_id, tag)
VALUES
    (1, 'tag2');

-- login user
SELECT
    *
FROM
    users
WHERE
    email = 'sitaramoli1998@gmail.com'
    AND password = '1234';

-- get a list of users followers
SELECT
    users.id,
    users.email
from
    users
    INNER JOIN followers ON followers.user_id = users.id;

-- list of user following the user
SELECT
    users.id,
    users.email,
    followers.follower_id
FROM
    users
    INNER JOIN followers ON followers.user_id = users.id;

-- like tweet 1
UPDATE
    likes
SET
    likes_count = 1
WHERE
    tweet_id = 1;

-- trending tags
SELECT
    COUNT(DISTINCT tag)
FROM
    hastags
WHERE
    tag = 'tag1';