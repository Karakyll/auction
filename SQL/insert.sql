------------------------------------ fill users table -----------------------------------

INSERT INTO users (username, password, enabled)
VALUES ('user', '$2a$04$S52xFTxBbLoFZ.bXRl0tB.Vcncx2FEki8JCEnNEI25wy0Zg2UoE8y', true),
        ('testuser', '$2a$04$Lx/sqdDLnOhSd/XmWQs.vu/4hufx0BKJjWphERSh4DRPiqjVfWo5m', true),
        ('testuser2', '$2a$04$Unw/gozf1Q27beXC7ACF5OX7G5uQdFhm.8JTyBTcjLLealHk0rm2C', true),
        ('manager', '$2a$04$c6kI0YhJZzssTRKGJ4LJuuiq3rkYwE4Wal/B8vK/4o9FOFNKUjKLy', true),
        ('admin','$2a$04$EtawSjS0nKziSZ38PoguJ.mCHXZ7/TF1ybiwVz8/VjbbvmH6Z.dZC', true);

------------------------------------ fill user_roles table -----------------------------------

INSERT INTO user_roles (username, role)
VALUES ('user', 'ROLE_USER'),
        ('testuser', 'ROLE_USER'),
        ('testuser2', 'ROLE_USER'),
        ('manager', 'ROLE_USER'),
        ('manager', 'ROLE_MANAGER'),
        ('admin', 'ROLE_USER'),
        ('admin', 'ROLE_MANAGER'),
        ('admin', 'ROLE_ADMIN');

----------------------------------- fill categoriestable ---------------------------------

INSERT INTO categories (name)
VALUES ('phones'),
        ('books'),
        ('jewelry');

----------------------------------- fill products table ---------------------------------

INSERT INTO products (name, category, price, description)
VALUES ('Nokia 3310', 'phones', 33.10, 'Good phone with good camera.'),
        ('Samsung Galaxy S9', 'phones', 999.99, 'Xiaomi better.'),
        ('Xiaomi mi7', 'phones', 699.99, 'Best phone ever.'),
        ('The lord of the rings', 'books', 20.05, 'Jh. R. R. Tolkien.'),
        ('The hobbit', 'books', 25.75, 'Good book.'),
        ('Gold ring', 'jewelry', 355.10, 'Grandma ring'),
        ('Silver ring', 'jewelry', 150.20, 'Need money!');

----------------------------------- fill auctions table ---------------------------------

INSERT INTO auctions (owner, product_id, create_time, end_time, description, finished)
VALUES ('user', 1, '2018-02-09 10:10:10', '2018-05-10 10:10:10', 'Selling bicycle.', false),        
        ('user', 2, '2018-02-09 12:12:12', '2018-05-10 12:12:12', 'Selling cakes.', false),
        ('testuser', 3, '2018-02-09 12:12:12', '2018-05-10 12:12:12', 'Selling cakes.', false),
        ('testuser', 4, '2018-02-09 12:12:12', '2018-05-10 12:12:12', 'Selling cakes.', false),
        ('user', 5, '2018-02-09 12:12:12', '2018-02-10 12:12:12', 'Selling cakes.', false),
        ('testuser2', 6, '2018-02-09 12:12:12', '2018-02-10 12:12:12', 'Selling cakes.', false),
        ('testuser', 7, '2018-02-09 12:12:12', '2018-02-10 12:12:12', 'Selling cakes.', false);

----------------------------------- fill bets table ---------------------------------

INSERT INTO bets (auction_id, username, bet_time, price)
VALUES (1, 'testuser', '2018-02-09 10:11:10', 35.20),
        (1, 'testuser2', '2018-02-09 10:12:10', 37.30),
        (1, 'testuser', '2018-02-09 10:14:10', 39.40),
        (2, 'testuser2', '2018-02-09 12:12:20', 1010),
        (2, 'testuser', '2018-02-09 12:14:20', 1040),
        (3, 'testuser2', '2018-02-09 12:13:20', 730.40),
        (3, 'user', '2018-02-09 12:15:20', 755.75),
        (3, 'testuser2', '2018-02-09 12:17:45', 770.65),
        (4, 'user', '2018-02-09 12:13:20', 21.15),
        (4, 'testuser2', '2018-02-09 12:17:20', 22.45),
        (4, 'user', '2018-02-09 12:24:20', 24.85),
        (5, 'testuser', '2018-02-09 12:13:20', 26.13),
        (6, 'user', '2018-02-09 12:13:20', 400.00),
        (7, 'user', '2018-02-09 12:13:20', 170.50),
        (7, 'testuser2', '2018-02-09 12:18:20', 195.70);