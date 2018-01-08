BEGIN;

CREATE SEQUENCE circle_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE circle_id_seq
  OWNER TO metacity;

CREATE SEQUENCE data_set_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE data_set_id_seq

CREATE SEQUENCE local_authority_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE local_authority_id_seq
  OWNER TO metacity;

CREATE SEQUENCE user_id_seq
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;
ALTER TABLE user_id_seq
  OWNER TO metacity;

CREATE TABLE credential
(
  access_key character varying NOT NULL,
  secret character varying(250) NOT NULL,
  roles text NOT NULL,
  CONSTRAINT credential_pkey PRIMARY KEY (access_key)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE credential
  OWNER TO metacity;

CREATE TABLE local_authority
(
  id bigserial NOT NULL,
  name character varying(250) NOT NULL,
  ui_config_json_string text,
  credential_access_key character varying,
  CONSTRAINT local_authority_pkey PRIMARY KEY (id),
  CONSTRAINT credential_access_key FOREIGN KEY (credential_access_key)
      REFERENCES credential (access_key) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE local_authority
  OWNER TO metacity;

CREATE TABLE data_set
(
  id bigserial NOT NULL,
  name character varying(250) NOT NULL,
  description character varying,
  data_type text NOT NULL,
  restricted boolean NOT NULL,
  roles text NOT NULL,
  local_authority_id bigint,
  CONSTRAINT data_set_pkey PRIMARY KEY (id),
  CONSTRAINT local_authority_id FOREIGN KEY (local_authority_id)
      REFERENCES local_authority (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE data_set
  OWNER TO metacity;

CREATE TABLE circle
(
  id bigserial NOT NULL,
  name character varying(250) NOT NULL,
  default_circle boolean NOT NULL,
  roles text NOT NULL,
  local_authority_id bigint,
  CONSTRAINT circle_pkey PRIMARY KEY (id),
  CONSTRAINT local_authority_id FOREIGN KEY (local_authority_id)
      REFERENCES local_authority (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE circle
  OWNER TO metacity;

CREATE TABLE "user"
(
  id bigserial NOT NULL,
  first_name character varying NOT NULL,
  last_name character varying NOT NULL,
  password character varying NOT NULL,
  last_connection bigint,
  avatar_url character varying,
  email character varying NOT NULL,
  CONSTRAINT user_pkey PRIMARY KEY (id),
  CONSTRAINT uk_user_email UNIQUE (email)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE "user"
  OWNER TO metacity;

CREATE TABLE circle_users_user
(
  circle_id bigint NOT NULL,
  user_id bigint NOT NULL,
  CONSTRAINT circle_users_user_pkey PRIMARY KEY (circle_id, user_id),
  CONSTRAINT circle_id FOREIGN KEY (circle_id)
      REFERENCES circle (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT user_id FOREIGN KEY (user_id)
      REFERENCES "user" (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE circle_users_user
  OWNER TO metacity;

COMMIT;