CREATE TABLE public.accounts (
	id uuid NOT NULL,
	email TEXT NOT NULL UNIQUE,
	name TEXT NOT NULL,
	password TEXT NOT NULL,
	CONSTRAINT accounts_pk PRIMARY KEY (id)
);

INSERT INTO accounts (id, email, name, password) VALUES('d38b2d17-709a-4b02-a3ac-c445f5158b9e', 'teste@teste.com', 'teste', '123');

SELECT * FROM accounts;