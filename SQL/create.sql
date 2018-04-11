CREATE DATABASE auction;

\c auction;

CREATE TABLE users (
	username varchar(50) NOT NULL UNIQUE,
	password varchar(255) NOT NULL,
	enabled BOOLEAN NOT NULL DEFAULT true,
	CONSTRAINT users_pk PRIMARY KEY (username)
);

CREATE TABLE user_roles (
	user_role_id bigserial NOT NULL,
	username varchar(50) NOT NULL REFERENCES users(username) ON DELETE CASCADE,
	role varchar(50) NOT NULL,
  CONSTRAINT uniq_username_role UNIQUE (username, role),
	CONSTRAINT user_roles_pk PRIMARY KEY (user_role_id)
);

CREATE TABLE categories (
	name varchar(50) NOT NULL UNIQUE,
	CONSTRAINT categories_pk PRIMARY KEY (name)
);

CREATE TABLE products (
	id bigserial NOT NULL,
	name varchar(50) NOT NULL,
	category varchar(50) NOT NULL REFERENCES categories(name) ON DELETE CASCADE,
	price float8 NOT NULL,
	description varchar,
	CONSTRAINT products_pk PRIMARY KEY (id)
);

CREATE TABLE auctions (
	id bigserial NOT NULL,
	owner varchar(50) NOT NULL REFERENCES users(username) ON DELETE CASCADE,
	product_id bigint NOT NULL UNIQUE REFERENCES products(id) ON DELETE CASCADE,
	create_time TIMESTAMP NOT NULL,
	end_time TIMESTAMP NOT NULL,
	description varchar NOT NULL,
	finished BOOLEAN NOT NULL DEFAULT false,
	CONSTRAINT auctions_pk PRIMARY KEY (id)
);

CREATE TABLE bets (
	id bigserial NOT NULL,
	auction_id bigint NOT NULL REFERENCES auctions(id) ON DELETE CASCADE,
	username varchar(50) NOT NULL REFERENCES users(username) ON DELETE CASCADE,
	bet_time TIMESTAMP NOT NULL,
	price float8 NOT NULL,
	CONSTRAINT bets_pk PRIMARY KEY (id)
);