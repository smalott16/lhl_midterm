INSERT INTO users (name, email, password) VALUES ('John Smith', 'jsmith@internet.com', 'password');

INSERT INTO categories (name) VALUES ('eat');
INSERT INTO categories (name) VALUES ('watch');
INSERT INTO categories (name) VALUES ('read');
INSERT INTO categories (name) VALUES ('buy');

INSERT INTO lists (user_id, category_id) VALUES (1, 1);
INSERT INTO lists (user_id, category_id) VALUES (1, 2);
INSERT INTO lists (user_id, category_id) VALUES (1, 3);
INSERT INTO lists (user_id, category_id) VALUES (1, 4);

INSERT INTO items (name, list_id) VALUES ('Cedar Creek', 1);
INSERT INTO items (name, list_id) VALUES ('Quails Gate', 1);
INSERT INTO items (name, list_id) VALUES ('Raudz', 1);
INSERT INTO items (name, list_id) VALUES ('O.E.B', 1);
INSERT INTO items (name, list_id) VALUES ('Game of Thrones', 2);
INSERT INTO items (name, list_id) VALUES ('Squid Game', 2);
INSERT INTO items (name, list_id) VALUES ('The Departed', 2);
INSERT INTO items (name, list_id) VALUES ('Apollo 13', 2);
INSERT INTO items (name, list_id) VALUES ('Outside Magazine', 3);
INSERT INTO items (name, list_id) VALUES ('Into the Wild', 3);
INSERT INTO items (name, list_id) VALUES ('The Science of When', 3);
INSERT INTO items (name, list_id) VALUES ('Becomming Michelle Obama', 3);
INSERT INTO items (name, list_id) VALUES ('Dyson Vaccuum', 4);
INSERT INTO items (name, list_id) VALUES ('Iphone 12', 4);
INSERT INTO items (name, list_id) VALUES ('Macbook Pro', 4);
INSERT INTO items (name, list_id) VALUES ('Xbox Series X', 4);
