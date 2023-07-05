CREATE TABLE public.accounts (
	id uuid NOT NULL,
	email TEXT NOT NULL UNIQUE,
	name TEXT NOT NULL,
	password TEXT NOT NULL,
	CONSTRAINT accounts_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);