--
-- PostgreSQL database dump
--

\restrict 50QyxP6VGGUFvuzfcjMgEWMGEhUFmJsCf71pJH4FhcZm0JzOG56ssZsqk70n7n0

-- Dumped from database version 18.3 (Debian 18.3-1.pgdg12+1)
-- Dumped by pg_dump version 18.4 (Debian 18.4-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: admin
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO admin;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.audit_logs (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    usuario character varying(255) NOT NULL,
    accion character varying(50) NOT NULL,
    entidad character varying(100) NOT NULL,
    "entidadId" character varying(255),
    cambios text,
    ip character varying(50),
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL,
    "userAgent" character varying(255)
);


ALTER TABLE public.audit_logs OWNER TO admin;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO admin;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO admin;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: pacientes; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.pacientes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    rut character varying(9) NOT NULL,
    dv character varying(1) NOT NULL,
    nombre character varying(255) NOT NULL,
    sexo character varying(20),
    edad integer,
    telefono character varying(20),
    escolaridad character varying(50),
    pueblo character varying(50),
    rsh character varying(50),
    f_ingreso date,
    f_consentimiento date,
    f_egreso date,
    naturaleza character varying(255),
    comuna character varying(100) NOT NULL,
    rural character varying(20),
    dependencia character varying(100),
    enfermedades text,
    pai text,
    obj_pai integer,
    obj_alc integer,
    talleres text,
    barthel1 integer,
    pfeiffer1 integer,
    lawton1 integer,
    tug1 numeric(5,2),
    mini1 integer,
    yesa1 integer,
    eq1 character varying(50),
    barthel2 integer,
    pfeiffer2 integer,
    lawton2 integer,
    tug2 numeric(5,2),
    mini2 integer,
    yesa2 integer,
    eq2 character varying(50),
    t1_fecha date,
    t1_punt integer,
    t1_barthel integer,
    t1_mini integer,
    t2_fecha date,
    t2_punt integer,
    t2_barthel integer,
    t2_mini integer,
    t3_fecha date,
    t3_punt integer,
    t3_barthel integer,
    t3_mini integer,
    t4_fecha date,
    t4_punt integer,
    t4_barthel integer,
    t4_mini integer,
    notas text,
    plan text,
    "creadoPor" character varying(255) NOT NULL,
    "fechaRegistro" timestamp without time zone DEFAULT now() NOT NULL,
    "modificadoPor" character varying(255),
    "modificadoEn" timestamp without time zone DEFAULT now() NOT NULL,
    eliminado boolean DEFAULT false NOT NULL,
    "fechaEliminacion" timestamp without time zone,
    region character varying(100),
    provincia character varying(100),
    operador_id character varying(255),
    operador_nombre character varying(255),
    fecha_nacimiento date,
    anio integer,
    semestre integer,
    contacto_nombre character varying(255),
    contacto_telefono character varying(20),
    contacto_relacion character varying(50),
    sector character varying(100),
    direccion character varying(255)
);


ALTER TABLE public.pacientes OWNER TO admin;

--
-- Name: tokens_revocados; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.tokens_revocados (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    token text NOT NULL,
    "usuarioId" character varying(36) NOT NULL,
    username character varying(255) NOT NULL,
    revocado timestamp without time zone DEFAULT now() NOT NULL,
    "expiresAt" timestamp without time zone NOT NULL
);


ALTER TABLE public.tokens_revocados OWNER TO admin;

--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.usuarios (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(50) NOT NULL,
    nombre character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    rol character varying(20) NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    creado timestamp without time zone DEFAULT now() NOT NULL,
    "ultimoAcceso" timestamp without time zone,
    actualizado timestamp without time zone DEFAULT now() NOT NULL,
    email character varying(255),
    telefono character varying(20),
    region character varying(100),
    provincia character varying(100),
    comuna character varying(100),
    rut character varying(12)
);


ALTER TABLE public.usuarios OWNER TO admin;

--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.audit_logs (id, usuario, accion, entidad, "entidadId", cambios, ip, "timestamp", "userAgent") FROM stdin;
3d96b844-fb97-4cbf-94d2-1fd1935f1dab	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-24 22:28:51.277379	\N
5a899e31-3e15-4449-b66f-24fc550da64e	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-24 22:29:35.084039	\N
3fcd5e39-5816-47eb-a1f4-44cb0018cbf8	admin	CREAR_USUARIO	usuario	36fecd5f-dda4-4a18-939d-e12a3931332c	{"username":"197479817","rol":"analista"}	\N	2026-04-24 22:30:40.434261	\N
b391cc71-d229-44c6-b551-d0255b8deacb	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-24 22:30:47.319754	\N
7f888b29-87ea-4c06-93ee-29e618b6677b	197479817	LOGIN	usuario	36fecd5f-dda4-4a18-939d-e12a3931332c	\N	::1	2026-04-24 22:30:54.890299	\N
c2a41d39-e7ed-425d-8181-ccaacdc7147c	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-24 22:31:10.233195	\N
dfe2de02-6a24-4db6-a13c-0ab265b80251	admin	CREAR_USUARIO	usuario	5cb98619-4fd3-4197-8511-b7285e67f197	{"username":"166132916","rol":"operador"}	\N	2026-04-24 22:31:57.931902	\N
59cbe3f4-fe69-4371-a714-0f6c3b916eee	admin	CREAR_USUARIO	usuario	9b31eec0-530f-4827-a214-6bcb31fd7be3	{"username":"12345678","rol":"operador"}	\N	2026-04-24 22:32:44.903903	\N
9bb05c56-9cca-4af1-ac4d-7a53111bff8e	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-24 22:34:28.771459	\N
5089bcd7-2067-477b-b324-8e649353b057	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-24 22:34:33.5392	\N
7d95a112-4e32-4d5b-87ad-30f1bd18936a	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-24 22:34:36.719667	\N
556a5c2f-3104-4557-be17-b607222ea838	197479817	LOGIN	usuario	36fecd5f-dda4-4a18-939d-e12a3931332c	\N	::1	2026-04-24 22:34:46.987078	\N
e9485bb1-ecce-48fc-a155-43378d3e13a2	197479817	LOGOUT	token	36fecd5f-dda4-4a18-939d-e12a3931332c	{"accion":"Token revocado"}	\N	2026-04-24 22:35:10.261895	\N
b1108d41-da49-4e90-8ca4-1cd3755889d5	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-24 22:37:34.734766	\N
e39c0862-6e9a-44a8-8d4e-bae768df936e	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-24 22:37:37.778501	\N
8ada3aca-b950-42eb-a3a0-9528fdf2b536	197479817	LOGIN	usuario	36fecd5f-dda4-4a18-939d-e12a3931332c	\N	::1	2026-04-24 22:37:45.332803	\N
e07329cd-fb6c-4f34-bbca-974685b77e92	197479817	LOGOUT	token	36fecd5f-dda4-4a18-939d-e12a3931332c	{"accion":"Token revocado"}	\N	2026-04-24 22:37:49.138908	\N
65832be9-dfe4-46d5-8201-cf1d5dcbc073	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-24 22:38:22.426636	\N
f7578f27-8ff8-43cf-8176-789cb0013a9d	admin	ELIMINAR_USUARIO	usuario	9b31eec0-530f-4827-a214-6bcb31fd7be3	{"username":"12345678","rol":"operador","nota":"Usuario desactivado (soft delete)"}	\N	2026-04-24 22:38:35.420382	\N
75b1bac7-5974-4bac-85ca-7db9c9771eed	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-24 22:38:49.726202	\N
a899f74a-8f83-4a41-bd76-0c06d42707ff	12346578	LOGIN_FAILED	usuario	unknown	{"razon":"usuario no encontrado o inactivo"}	::1	2026-04-24 22:38:56.320951	\N
e42b8af8-d294-49bc-95ff-590e7332ba23	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-24 22:39:35.831886	\N
2bc0667c-750f-4e5b-8f29-28c31190e830	admin	CREAR_USUARIO	usuario	7b30f312-1a5f-4775-8c4a-b5e9ea8d0b48	{"username":"12346578","rol":"operador"}	\N	2026-04-24 22:40:18.721539	\N
761f5cfe-d53e-4738-b51b-d18873d518f1	admin	ELIMINAR_USUARIO	usuario	7b30f312-1a5f-4775-8c4a-b5e9ea8d0b48	{"username":"12346578","rol":"operador","nota":"Usuario desactivado (soft delete)"}	\N	2026-04-24 22:52:43.711947	\N
8dc9a95e-dd69-4471-b63f-b93e91c5546c	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-24 22:59:04.052071	\N
80cd81e5-6edb-4e98-94be-b08153ed7682	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-24 22:59:08.233908	\N
d0cdb452-1cd6-4272-a262-66f9f504d8ce	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-24 23:16:01.423167	\N
f15e09e7-b991-42fc-abb0-7e1b5fa72b86	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-24 23:16:06.215069	\N
68063821-7a3c-464f-840f-ddb2ae383a3c	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-24 23:22:27.532164	\N
8fd23c16-8627-4595-a480-1dcaff2f1ace	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-24 23:22:31.601876	\N
a6ac63c5-8232-4f96-9825-3e5934d7c659	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-24 23:29:19.302328	\N
a1e54d54-7071-4a8a-9fae-b8bfa1338e6c	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-24 23:56:10.963998	\N
866ed1de-1e3c-4c2c-83ef-5a4b89d7892f	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 00:16:07.389894	\N
9c0c541b-d072-4069-aaf2-fe77f43b3471	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 00:22:52.774933	\N
2ea48768-15e4-45fc-8fde-e41fc7ec47b1	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 00:22:57.296228	\N
87876959-3bb0-45e5-87cb-6e73a3b487bc	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 00:45:14.992279	\N
87ad8dc9-708f-4638-8736-9b781e288c70	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 00:45:20.352485	\N
9f292fd5-a067-4ff6-b893-379e68c5eff5	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 00:47:26.783177	\N
217ba3d2-7816-4ee7-b67f-4d781dcb1e7b	197479817	LOGIN	usuario	36fecd5f-dda4-4a18-939d-e12a3931332c	\N	::1	2026-04-25 00:47:39.385397	\N
519c9835-1e5e-438c-951e-05b62c8554ba	197479817	LOGOUT	token	36fecd5f-dda4-4a18-939d-e12a3931332c	{"accion":"Token revocado"}	\N	2026-04-25 00:47:45.524184	\N
4bfad05a-ca49-4306-ad1f-2c6f41c24c78	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 00:47:50.385928	\N
b3462f5b-a3b5-4dad-87a5-1e68354f2715	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 19:00:41.329511	\N
64316866-a036-4a91-b085-6358ee6d082d	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 19:00:41.435685	\N
3cb67e73-ba7b-496f-9df3-8fbd21f5f9d3	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 19:00:54.826888	\N
5f10ee9a-9ae0-4492-8b08-90c494167869	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 19:04:13.033084	\N
49fa68d6-b3a7-40a4-b54a-38b9a552c1bd	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 19:06:23.739983	\N
db3effca-d295-4025-9ff3-e739e6afb5ef	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 19:11:39.392401	\N
2bb51313-7fb6-43a6-bb7f-875d10857489	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 19:36:35.38167	\N
f41b57ba-fa1c-4b54-9619-ad51f4993625	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 20:20:04.581047	\N
a4d60e35-7bca-40f3-a5d2-a670fbdf8b62	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 20:20:04.69351	\N
d0f55234-8236-45c4-a70b-f81a47711020	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 20:20:09.284038	\N
de0a979a-7cb8-40b9-b19f-60a79dbc4490	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 21:02:22.439898	\N
a5069443-6d13-4984-895d-e54bc233e57b	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 21:02:27.041896	\N
c755aeac-f9e9-4ec4-9275-ddc08fee14e5	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 21:11:15.824882	\N
99b285ac-0714-470a-b314-df9b4737b7ce	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 21:11:20.546706	\N
7f6039d0-2fb9-4b46-b6c7-096e03e93c9e	197479817	LOGIN	usuario	36fecd5f-dda4-4a18-939d-e12a3931332c	\N	::1	2026-04-25 21:17:31.668867	\N
f78b9213-bf6b-4a49-b0ac-1b37e4981e5f	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 21:30:12.375969	\N
5a97ee85-839c-46a9-9daf-e7b6fb3b4eac	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 21:30:17.859221	\N
5d2dc295-af50-48a4-8b08-73f91aa5adf7	197479817	LOGOUT	token	36fecd5f-dda4-4a18-939d-e12a3931332c	{"accion":"Token revocado"}	\N	2026-04-25 21:40:48.677896	\N
929e019d-cb61-44c4-a731-a4696037d073	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 21:40:52.17722	\N
4c13b720-192c-4aa7-901a-cf20160855c4	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 21:44:35.613555	\N
59c01658-ccec-41c9-a384-bb3d1eca3bd1	197479817	LOGIN	usuario	36fecd5f-dda4-4a18-939d-e12a3931332c	\N	::1	2026-04-25 21:44:46.198282	\N
b4e4e5bb-b73f-4a06-aea8-1c2a98371357	197479817	LOGOUT	token	36fecd5f-dda4-4a18-939d-e12a3931332c	{"accion":"Token revocado"}	\N	2026-04-25 21:44:47.373946	\N
18c4f1c6-216b-4077-a9b1-8f3f0f6f3c72	197479817	LOGIN_FAILED	usuario	36fecd5f-dda4-4a18-939d-e12a3931332c	{"razon":"contraseña incorrecta"}	::1	2026-04-25 21:44:54.324951	\N
1ccab8f7-3ba5-405d-be69-ab7642f37eb5	19747981	LOGIN_FAILED	usuario	unknown	{"razon":"usuario no encontrado o inactivo"}	::1	2026-04-25 21:44:56.368331	\N
9d99a430-2793-41db-9af2-4c366349d896	197479817	LOGIN	usuario	36fecd5f-dda4-4a18-939d-e12a3931332c	\N	::1	2026-04-25 21:45:03.827166	\N
b6c2f975-45d5-415b-8c72-3fabd9384f5c	197479817	LOGOUT	token	36fecd5f-dda4-4a18-939d-e12a3931332c	{"accion":"Token revocado"}	\N	2026-04-25 21:45:07.611926	\N
f142e1ae-4aa7-403a-953f-7d42e9027850	197479817	LOGIN	usuario	36fecd5f-dda4-4a18-939d-e12a3931332c	\N	::1	2026-04-25 21:47:29.160079	\N
5b222427-8740-4a8a-9173-1fc18086df0a	197479817	LOGOUT	token	36fecd5f-dda4-4a18-939d-e12a3931332c	{"accion":"Token revocado"}	\N	2026-04-25 21:48:16.944634	\N
b36f5030-fac8-4eda-b800-ab9a8f214588	197479817	LOGIN	usuario	36fecd5f-dda4-4a18-939d-e12a3931332c	\N	::1	2026-04-25 21:48:23.556046	\N
c1bd8f80-84c3-4d41-bbf2-639312eaeccf	197479817	LOGOUT	token	36fecd5f-dda4-4a18-939d-e12a3931332c	{"accion":"Token revocado"}	\N	2026-04-25 21:48:31.443328	\N
a0114370-cd4b-4e5a-8421-b9b20d6fd4e6	197479817	LOGIN	usuario	36fecd5f-dda4-4a18-939d-e12a3931332c	\N	::1	2026-04-25 21:48:38.953149	\N
1c3203b5-bec4-4bc1-86e9-55fbcc6d505c	197479817	LOGOUT	token	36fecd5f-dda4-4a18-939d-e12a3931332c	{"accion":"Token revocado"}	\N	2026-04-25 21:51:24.092756	\N
8697d17e-4428-4a36-9d78-4469e827db67	197479817	LOGIN_FAILED	usuario	36fecd5f-dda4-4a18-939d-e12a3931332c	{"razon":"contraseña incorrecta"}	::1	2026-04-25 21:51:33.189323	\N
54decc5a-4c5b-4168-9267-25c7958ed7f4	197479817	LOGIN	usuario	36fecd5f-dda4-4a18-939d-e12a3931332c	\N	::1	2026-04-25 21:51:37.187453	\N
dd3ba978-1dc0-43b4-86dd-131d85693493	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 22:00:57.849778	\N
05f255f6-324b-4b51-aa92-9ef770122ed0	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 22:01:01.624301	\N
ad5ad403-cb34-402b-8cb1-efcb533e36e6	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 22:30:07.485519	\N
82c3f1cd-9f60-4d3e-ae72-9e96b3a89d51	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 22:30:11.97673	\N
011b1f94-f459-4f29-9217-d23fe867eb30	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 22:30:15.780925	\N
3cbf9099-7bd1-48fc-87af-8e36e9b4c801	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 22:30:25.690407	\N
bf4146e7-a9d2-4588-a9f4-f869257625c4	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 22:32:01.726345	\N
20df0299-de88-4d2a-b95a-f4571662c660	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 22:32:06.690876	\N
8c960545-872e-482b-ae6d-0a3f4c446098	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 22:33:48.624924	\N
975e4a94-f141-4a66-bd50-6ef7e3486757	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 22:33:55.387535	\N
07f5493e-77a1-40fd-94f5-ea7144255754	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 22:34:35.347966	\N
858092d0-41df-4d8a-8e73-cba39574ecb7	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 22:34:42.681374	\N
59ee5afb-a7a3-4fcc-a4aa-79f3e2c324c8	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 22:35:42.986188	\N
5e5a7be8-a2db-4657-a3cb-f7a8a247d1a1	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 22:35:48.174819	\N
e0fd3890-1dd8-4ec7-9d2c-0052cc94c1e1	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 22:35:52.059269	\N
4a1d2daa-2075-460e-9631-1a048089d6d2	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 22:35:55.7934	\N
26ca31b3-1e3d-4ae6-afd6-4f6257136f66	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 22:37:43.609295	\N
50f2c689-e2b1-4043-a7f1-dbc27b4e9856	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 22:37:48.272005	\N
3580a2af-0d44-4742-861d-3dd215082f68	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 22:37:58.710334	\N
1a054dd6-3433-4526-8805-29bee8123727	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 22:38:02.972903	\N
e9e399fd-3d19-45c6-b7b3-e2b07d9bb156	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 22:38:05.538919	\N
d522197b-2729-4b23-9a32-38ccd40179ec	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 22:38:09.484632	\N
3c7c4c65-34e0-43e6-964d-9e9ee25efbab	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-25 22:50:04.32965	\N
9c5ecf45-6dac-4ddf-a954-19493a36053e	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-25 22:50:10.739048	\N
0eccff09-af32-4851-a246-72936d5c8ade	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-26 00:45:21.450349	\N
2d4422e3-57fc-4cd4-8eb6-ea1577c25c65	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-27 00:36:30.897967	\N
89ba33a3-ff42-4de9-a2c3-74dd2cf578ce	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-27 00:36:42.692381	\N
b1a2222e-e429-47a5-9876-1de062027a87	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-27 00:36:46.601371	\N
9c001ec9-8359-4de5-82ca-458694d5f727	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-27 00:39:33.798903	\N
71e89775-fede-4cec-940c-3648a2ead347	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-27 00:39:37.310088	\N
052a0e0c-127b-42e3-b235-621bdd88082f	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-27 00:39:40.000132	\N
8321e242-b7cb-4502-8e0f-f5f334df795e	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-27 00:39:46.816114	\N
4f561fa0-be08-42b9-b28e-dcd5edd83fe7	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-27 00:40:26.207799	\N
522fffe1-012d-4033-923a-ed442701e4b6	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-27 00:40:29.717433	\N
91176924-d187-4222-bf3f-ec7597594452	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-27 00:40:35.258501	\N
daf78e04-3d35-40f7-a20b-b7785f4fd44b	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-27 00:40:38.813332	\N
f387d181-8710-421b-8ca5-583fdd1a39ac	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-27 00:45:07.082403	\N
4bbfdfce-d7b1-4647-85cc-e6bd0c83b465	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-27 00:45:10.891301	\N
0f88934a-c58d-4105-b870-690498075b1c	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-27 00:51:51.422114	\N
51abd026-50c0-4df4-9989-3f9bc52ed78f	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-27 01:01:32.796915	\N
b1269aa2-7264-4055-a118-f43404768558	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-27 01:01:37.884202	\N
416abee8-9602-48f9-884c-60d52393b9b4	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-27 01:03:28.296379	\N
b51dd903-403a-4834-917a-c84dd1b7eb57	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-27 01:03:34.689986	\N
f75b3c63-6e5e-4a75-89a3-5510e321919b	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-27 01:12:11.58664	\N
0cb353fd-4be5-4aa7-a8c1-bf78505b1933	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-27 01:12:16.080951	\N
77ecadd4-0bbf-423d-b701-0cc935ce4c22	admin	ACTUALIZAR_USUARIO	usuario	5cb98619-4fd3-4197-8511-b7285e67f197	{"nombre":"Camilo Oviedo","rol":"operador","email":"camilooviedo@gmail.com","telefono":"+56912345678","region":"Biobío","provincia":"Arauco","comuna":"Contulmo"}	\N	2026-04-27 02:34:57.935979	\N
7ec489ce-8fa7-4f90-838a-c5ee01bbde56	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-27 12:24:01.603286	\N
b16423f5-98b9-4d2d-8de2-aa7baec4f8bd	admin	LOGIN_FAILED	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	{"razon":"contraseña incorrecta"}	::1	2026-04-27 19:18:40.257902	\N
596ae0c8-925e-4840-bc96-206107716c67	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-27 19:19:29.866879	\N
7d85545f-dc79-41ef-be2b-3b7f413feb4d	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-27 20:07:45.212353	\N
27d706d2-c9c2-4817-ae95-5273d25cd2ed	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-28 13:00:58.669206	\N
c9a8bf7b-543b-4f26-a21b-d5ba5403263e	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-28 13:37:10.569938	\N
96022bb6-5899-4570-b277-7b3c1f52f742	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-28 13:37:15.876891	\N
86b2cb0e-cc02-4e51-947d-4970fbe4bd63	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-28 14:15:56.273038	\N
9cf4837c-5259-48f8-9b7c-834b98b6701f	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-28 14:16:00.451147	\N
288ac13f-6715-4ede-a0b8-58300f07d3e5	admin	ACTUALIZAR_USUARIO	usuario	5cb98619-4fd3-4197-8511-b7285e67f197	{"nombre":"Camilo Oviedo","rol":"operador","email":"camilooviedo@gmail.com","telefono":"+56912345678","region":"Biobío","provincia":"Arauco","comuna":"Arauco"}	\N	2026-04-28 15:14:06.009326	\N
bc4f1227-942a-4021-aac1-75f8d5492347	admin	ACTUALIZAR_USUARIO	usuario	5cb98619-4fd3-4197-8511-b7285e67f197	{"nombre":"Camilo Oviedo","rol":"operador","email":"camilooviedo@gmail.com","telefono":"+56912345678","region":"Biobío","provincia":"Arauco","comuna":"Arauco"}	\N	2026-04-28 15:20:39.379895	\N
ddab20ca-9755-4fd7-b6a7-8610d63d94da	admin	ACTUALIZAR_USUARIO	usuario	36fecd5f-dda4-4a18-939d-e12a3931332c	{"nombre":"Felipe Thiele","rol":"analista","email":"thiele.felipe97@gmail.com","telefono":"+56973952750","region":"Biobío","provincia":"Arauco","comuna":"Contulmo"}	\N	2026-04-28 15:21:03.993099	\N
4cf89b56-fbde-4184-b8f4-de5248261e9f	admin	REACTIVAR_USUARIO	usuario	9b31eec0-530f-4827-a214-6bcb31fd7be3	{"username":"12345678"}	\N	2026-04-28 15:23:58.050287	\N
4bf67fa1-c42d-40ba-915d-1ac33a9c8f77	admin	REACTIVAR_USUARIO	usuario	7b30f312-1a5f-4775-8c4a-b5e9ea8d0b48	{"username":"12346578"}	\N	2026-04-28 15:23:59.672884	\N
d531bb1c-10ba-424b-8170-fbf0186ce7d4	admin	ACTUALIZAR_USUARIO	usuario	36fecd5f-dda4-4a18-939d-e12a3931332c	{"rut":"197479817","nombre":"Felipe Thiele","rol":"analista","email":"thiele.felipe97@gmail.com","telefono":"+56973952750","region":"Biobío","provincia":"Arauco","comuna":"Contulmo"}	\N	2026-04-28 15:41:27.382234	\N
00b0effd-e212-488c-8d83-a4946a863ece	admin	ACTUALIZAR_USUARIO	usuario	36fecd5f-dda4-4a18-939d-e12a3931332c	{"rut":"197479817","nombre":"Felipe Thiele","rol":"analista","email":"thiele.felipe97@gmail.com","telefono":"+56973952750","region":"Biobío","provincia":"Arauco","comuna":"Contulmo"}	\N	2026-04-28 15:48:28.438034	\N
7be5ef4c-9534-49a5-b90e-5421c6f17525	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-28 18:42:20.920491	\N
9417e145-3e6f-440d-8209-40eebf12550d	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-28 21:45:18.860876	\N
35f85a74-d5ff-4ab9-b072-f6a67ddaf58a	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-28 21:45:23.173217	\N
64281683-18eb-4f7c-8b48-e8136ea76875	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-29 01:22:29.849055	\N
bea6f478-47e3-4da6-b165-e866c7a43c68	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-29 14:37:33.538143	\N
32f41e91-6690-43c0-964e-ebe79cc49d05	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-29 14:37:38.83959	\N
7f70c8be-9858-4971-9f22-daf605a76f98	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-29 14:37:56.919701	\N
92e35405-eb2b-45c7-867a-c71869c97e48	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-29 14:38:00.727376	\N
b484b430-12d2-4a8e-b6da-7d8c9f79bc41	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-29 14:41:34.461706	\N
9a98a5fe-5f14-4431-bc39-575453c81749	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-29 14:45:02.536235	\N
022a8b1c-e7bb-459d-8d4e-2c3abecbc9d3	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-29 14:45:06.426611	\N
0a5a253c-e935-4ccb-9822-31f95c87ac52	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-29 15:13:54.360919	\N
001ac5df-4f9e-4b85-ad2b-6632ba16f3de	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-29 15:13:58.233697	\N
d0a3a446-d83c-4e45-a6e9-681e1531b255	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-29 15:26:36.064903	\N
5452a6e0-fff3-4c9b-ac99-d14fed33bdf2	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-29 15:26:48.362977	\N
eb9b90cc-e5e4-4ec5-917e-fe6ad00f0283	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-29 15:38:47.502835	\N
2e817077-1d65-4a3a-a9eb-34e47e9b8565	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-29 15:38:51.802649	\N
36ba555e-08ab-47aa-a0bd-444f7b7ce904	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-29 18:01:52.186509	\N
8d1e6c0a-5c5c-4b96-b73c-b60c72e4587f	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-29 18:02:03.478968	\N
39b4c168-1475-474b-8efe-36d746ee575f	admin	ELIMINAR_USUARIO	usuario	9b31eec0-530f-4827-a214-6bcb31fd7be3	{"username":"12345678","rol":"operador","nota":"Usuario desactivado (soft delete)"}	\N	2026-04-29 19:01:03.135565	\N
83c4ef80-a05a-4a34-9522-423299f767b6	admin	ELIMINAR_USUARIO	usuario	7b30f312-1a5f-4775-8c4a-b5e9ea8d0b48	{"username":"12346578","rol":"operador","nota":"Usuario desactivado (soft delete)"}	\N	2026-04-29 19:01:13.437747	\N
56fd692d-1ad7-4abe-a012-e4450c194284	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-29 19:11:33.901291	\N
5bd1eb77-d430-4bf8-8791-3ed93a3dfa96	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-29 19:11:38.097456	\N
e3258518-9274-4561-bab6-0a996b5eef0e	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-30 12:39:25.620097	\N
0f52c3f9-f383-4532-88c3-bde51edd6c2c	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-30 12:39:30.618861	\N
6b043711-00f8-42f1-bbfd-4188410dce81	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-04-30 12:44:51.24988	\N
73d3d512-3199-4dbd-b72c-45b17d970190	197479817	LOGIN	usuario	36fecd5f-dda4-4a18-939d-e12a3931332c	\N	::1	2026-04-30 16:45:21.65825	\N
1dceb149-ae0a-489b-bdc8-ec67e4e642f8	197479817	LOGOUT	token	36fecd5f-dda4-4a18-939d-e12a3931332c	{"accion":"Token revocado"}	\N	2026-04-30 16:45:35.686479	\N
ee790635-7e99-486d-8fb6-33b68fdd2f30	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-30 16:45:40.432047	\N
3bbe95ae-051a-4531-af5a-e2cfc0300b79	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-04-30 23:13:13.631882	\N
4316dd85-a6aa-4df6-b662-65f5cbe14789	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-01 12:37:37.860755	\N
51af935d-85ba-4781-91e8-5e49f1cd2a9f	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-04 14:08:11.616911	\N
ca7b7dc4-cb9f-4752-b1a3-f881c4074b64	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-04 14:28:36.696039	\N
42dc9958-d03a-4672-8eee-bc252fac65ec	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-04 14:35:16.053879	\N
d69ee930-aa1c-468e-a068-dc2592928087	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-04 14:41:11.795295	\N
86283bb8-f01d-4391-ba1f-43805427526a	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-04 14:44:59.009663	\N
436e6528-46ca-4f2a-8c84-ae00e4c03f8e	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-04 14:50:00.813285	\N
8805125c-80a9-4b8c-a8ab-834090b971b0	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-04 14:53:01.222777	\N
7d6ce09b-a509-4dc8-9147-ad7b0d47176f	166132916	LOGIN	usuario	5cb98619-4fd3-4197-8511-b7285e67f197	\N	::1	2026-05-04 14:57:14.299441	\N
c65b0b2c-bbc1-4d14-b89a-51d819d6cb94	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-04 15:02:01.323212	\N
deec6873-faa7-4abe-a52c-558c69daa527	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-04 15:02:06.402609	\N
29dcab3c-76d9-436a-9369-c7941bf3b8d8	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-04 15:07:07.421494	\N
1a4a01ac-85b5-430d-88df-df7dfa969375	16613916	LOGIN_FAILED	usuario	unknown	{"razon":"usuario no encontrado o inactivo"}	::1	2026-05-04 15:07:18.888959	\N
5760eb55-e18f-49f1-95c9-cd7c07a1ae31	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-04 15:07:35.743948	\N
bb8de155-431c-4dd9-8424-3ee0c7771183	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-04 15:07:50.936197	\N
407d1cb9-740e-4a55-b4f8-6efae55a1d23	166132916	LOGIN	usuario	5cb98619-4fd3-4197-8511-b7285e67f197	\N	::1	2026-05-04 15:07:59.624162	\N
fe7e92ce-b73d-4450-9974-1feaea60109d	166132916	LOGIN	usuario	5cb98619-4fd3-4197-8511-b7285e67f197	\N	::1	2026-05-04 15:08:09.225637	\N
c2bb5b5b-f0c1-4628-987d-076e1f91dc61	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-04 15:10:38.138063	\N
eafbce83-9e9b-459c-be40-49d36bf9e0ff	166132916	LOGIN	usuario	5cb98619-4fd3-4197-8511-b7285e67f197	\N	::1	2026-05-04 15:14:58.54447	\N
33f4661f-910a-412d-bc37-e27be02e7677	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-04 15:15:39.397288	\N
a58a2abc-8278-404a-9aa7-527db1914734	166132916	LOGOUT	token	5cb98619-4fd3-4197-8511-b7285e67f197	{"accion":"Token revocado"}	\N	2026-05-04 15:21:15.9003	\N
1f6b9585-3229-443d-9de2-2704fb4f2243	166132916	LOGIN	usuario	5cb98619-4fd3-4197-8511-b7285e67f197	\N	::1	2026-05-04 15:21:24.110956	\N
42e6b82f-7bb0-4ca3-9666-bac5353d430e	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-04 15:21:40.618388	\N
ce3bc87b-d2cf-42f0-9c53-b59d7534ba19	166132916	LOGOUT	token	5cb98619-4fd3-4197-8511-b7285e67f197	{"accion":"Token revocado"}	\N	2026-05-04 15:42:08.284979	\N
b17abfad-5bf1-49fe-95c5-d6d92a6b7240	166132916	LOGIN_FAILED	usuario	5cb98619-4fd3-4197-8511-b7285e67f197	{"razon":"contraseña incorrecta"}	::1	2026-05-04 15:42:14.279314	\N
9321bb96-14b9-475d-b45b-79888127a4a6	166132916	LOGIN	usuario	5cb98619-4fd3-4197-8511-b7285e67f197	\N	::1	2026-05-04 15:42:20.194576	\N
c67a56fe-bda9-4be0-aebc-67855d673ad3	166132916	LOGOUT	token	5cb98619-4fd3-4197-8511-b7285e67f197	{"accion":"Token revocado"}	\N	2026-05-04 16:56:34.005332	\N
44da9552-8a19-44e6-b81f-f8de80bd9d4c	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-04 17:01:33.973762	\N
71c8d395-264b-4c87-b4ec-f7d3e38eb7bc	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-04 18:00:11.681036	\N
0033d589-713c-46de-8639-a7967dbb9036	166132916	LOGIN	usuario	5cb98619-4fd3-4197-8511-b7285e67f197	\N	::1	2026-05-04 18:07:52.674534	\N
44270898-2cea-4530-96ea-6227d97f8d92	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-04 18:13:42.286891	\N
1ce064bb-669b-437a-b7c3-4d8378e5e1c2	admin	LOGIN_FAILED	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	{"razon":"contraseña incorrecta"}	::1	2026-05-04 18:13:48.064928	\N
582c476a-2bdf-4e65-859a-b70818c1e390	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-04 18:13:52.365016	\N
7ce68780-6267-4492-b0b7-6d023dd430c7	166132916	LOGIN	usuario	5cb98619-4fd3-4197-8511-b7285e67f197	\N	::1	2026-05-04 19:20:40.655891	\N
d0c9f91e-a1ae-40c4-a910-c6cf8790a68d	166132916	LOGOUT	token	5cb98619-4fd3-4197-8511-b7285e67f197	{"accion":"Token revocado"}	\N	2026-05-04 19:25:56.840886	\N
c01230aa-e648-40a9-8530-950b29b715e1	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-05 03:14:26.319492	\N
80877f3a-acc2-48fc-9e1f-b48b8fe32a23	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-05 12:15:38.239487	\N
59f7178e-db29-4476-8111-4d87e255b374	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-05 12:15:45.526693	\N
6aa63749-bc0c-42ec-9879-b8f199ca93b8	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-05 14:14:51.224941	\N
497addc8-4af7-413c-9cc9-f8c4c613dcea	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-05 14:22:22.527984	\N
25368c9d-4a2b-4159-90eb-41e63cc03978	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-05 14:36:26.537583	\N
f557f7d3-2f7b-4351-add4-689a6b2571ad	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-05 14:36:32.528308	\N
e9807709-3742-41b3-bba9-72c208893c17	admin	LOGIN_FAILED	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	{"razon":"contraseña incorrecta"}	::1	2026-05-05 15:32:52.716079	\N
5889fd04-5d3c-4494-9f25-32a558b5dad7	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-05 15:33:07.081733	\N
e155bad7-7196-4ab8-8ad7-32f1cefc6777	166132916	LOGIN	usuario	5cb98619-4fd3-4197-8511-b7285e67f197	\N	::1	2026-05-05 20:32:10.741784	\N
64b3559f-723f-4793-a8f5-fa0c127fec62	admin	LOGIN_FAILED	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	{"razon":"contraseña incorrecta"}	::1	2026-05-06 18:25:29.190445	\N
9d78f9bb-b818-421d-96b0-0e80fe435b63	admin	LOGIN_FAILED	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	{"razon":"contraseña incorrecta"}	::1	2026-05-06 18:25:43.58206	\N
2d3407f9-77ac-4388-83c0-68becfabfe93	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-06 18:25:49.090884	\N
49de4854-e4e8-45d1-a80d-04e6ce21655f	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-07 12:34:54.850147	\N
e310c995-b481-41fa-8073-57931eacc3ef	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-07 12:34:58.713431	\N
918ce76c-0fa4-4b0a-bd67-7be52053e5ff	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-08 12:36:09.18588	\N
482202a4-2e30-4a03-9ff5-e31082032e34	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-08 12:41:09.615344	\N
f2fd5a65-1299-488f-a5fb-5da6d7ff1359	admin	LOGIN_FAILED	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	{"razon":"contraseña incorrecta"}	::1	2026-05-08 12:48:22.641924	\N
84c1c9e9-2edf-4267-b068-cec0a183f11e	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-08 12:48:28.1458	\N
c5c55667-670d-4ab0-bbee-50a134149c98	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-11 00:54:37.519212	\N
bfe2d75e-b6e2-4d3a-ad37-6df283c57b6b	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-11 01:16:24.96967	\N
7df6697d-f3de-4667-b2b9-62c7bd984d0b	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-11 01:16:28.471366	\N
a893133b-bf5e-454a-ba72-5a898c365a39	admin	LOGIN_FAILED	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	{"razon":"contraseña incorrecta"}	::1	2026-05-11 01:20:18.704693	\N
4b0a379d-73b0-4b1f-8939-52a145fe5692	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-11 01:20:21.607148	\N
0cecba1f-c361-4a3f-bb34-b118e9449759	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-11 12:04:44.061803	\N
efc5df22-4cd4-4f6e-967a-b60802e84238	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-11 13:47:45.620492	\N
1c9f2d1d-56b7-4d1a-b6eb-4c359c7016d4	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-11 13:47:50.523918	\N
bff803b8-fde8-4680-919f-89313e6524ea	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-11 13:55:32.087494	\N
a25563cd-3767-427a-87c2-343501cbeedd	admin	LOGIN_FAILED	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	{"razon":"contraseña incorrecta"}	::1	2026-05-11 13:57:04.127902	\N
f6d08b5b-03ef-4f59-8840-2b89c3d04056	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-11 13:57:28.207074	\N
90c77927-817d-44ad-9ce8-4753f4de82de	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-11 14:02:34.936797	\N
c83d5d2b-eb00-4c8b-a6b8-99b353388bc4	admin	LOGIN_FAILED	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	{"razon":"contraseña incorrecta"}	::1	2026-05-11 14:03:41.735676	\N
9c51dc40-0b22-4557-96e3-826b365d9c34	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-11 14:03:45.243823	\N
e05e3e79-4a75-45ea-b8f9-65e9b72c020c	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-11 14:09:17.28865	\N
f0c68470-01ce-4785-a0b1-4a381a19d864	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-11 14:09:17.385397	\N
cfc9e36d-9328-4d3a-b52c-a65137f76259	admin	LOGIN_FAILED	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	{"razon":"contraseña incorrecta"}	::1	2026-05-11 14:09:33.671099	\N
6f8d2ea0-68f7-4dfa-a85e-d169d08896a6	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-11 14:09:36.673364	\N
a1a28f1b-aff7-4c93-b73b-47eb295bc27a	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-11 14:14:53.049408	\N
a8a2c70f-5bf5-4c11-9f63-802f2336b427	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-11 14:14:53.058178	\N
1c81303b-4339-470d-9bd9-83d92db0b168	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-11 14:15:22.571922	\N
1eea757a-93af-4178-97d5-917f64e7d43b	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-11 14:23:37.128012	\N
7d6428ed-45ee-4e35-af44-114342557b37	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-11 14:23:37.132629	\N
2c59ca88-1de1-4f6e-9d79-dd5b16165cfe	admin	LOGIN_FAILED	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	{"razon":"contraseña incorrecta"}	::1	2026-05-11 14:37:36.559608	\N
0fd7fccf-bd31-4b7d-997c-a2383ca2c126	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-11 14:37:41.256193	\N
1e438bfc-0816-476d-8085-25819d94a3c6	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-11 14:42:45.068901	\N
908d8187-b922-4680-b625-7f8567849762	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-11 14:48:08.814605	\N
c8365176-4c8b-4f48-83ed-66755538edc1	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-11 14:53:45.250149	\N
0d82915a-9452-47b9-bb6d-f7192f7452e6	admin	LOGIN_FAILED	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	{"razon":"contraseña incorrecta"}	::1	2026-05-11 14:57:04.008084	\N
845b144e-e264-4daf-ab89-47299be85901	admin	LOGIN_FAILED	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	{"razon":"contraseña incorrecta"}	::1	2026-05-11 14:57:06.223899	\N
d2369d22-420f-43ff-91d8-183478ea53f0	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-11 14:57:10.914525	\N
08c9fbea-83e1-4cf9-a4f1-4817bfb1eb84	admin	LOGIN_FAILED	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	{"razon":"contraseña incorrecta"}	::1	2026-05-11 15:05:40.224937	\N
c0627b2c-551c-4c6e-a55b-3e4a13d0b73f	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-11 15:05:44.224294	\N
e81d9884-737e-417f-adc2-b06e91290292	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-11 15:14:09.830286	\N
bbd1b78d-085c-4f05-85a9-b6e671dfea6f	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-11 15:17:24.121743	\N
00c50093-357b-45f2-9bec-782407575a86	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-11 15:22:28.258753	\N
e1f2307f-6e02-41eb-9f66-2a8557c7776c	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-11 15:28:37.41991	\N
a3a50302-5ba4-4a0c-afe3-a3571a8eea4e	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-11 15:48:54.176964	\N
f9ec9e2a-5f5b-404e-909d-96e935daff34	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-11 15:51:18.17601	\N
792080d7-b299-4a4e-b19f-359aa756d9b1	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-11 15:53:59.536959	\N
45469118-9849-49d6-9f37-84a8b315ae34	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-11 16:31:58.563043	\N
3d4b4522-3a76-44a6-95f8-98ea4a18bfa3	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-11 16:37:01.851666	\N
849a28a0-0a1d-476f-a663-1124bf41d1fe	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-11 16:39:58.763472	\N
1c2b1f99-ab3c-4a5e-86a6-bb25f09fb9a1	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-11 16:45:00.330534	\N
381783e2-13e0-4a1a-8141-9ce00ea29edf	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-11 16:45:00.428813	\N
b9ac9f35-5792-4c56-981b-15905e69122b	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-11 16:54:18.008918	\N
2be62477-06b3-40df-80e2-f1a5c32d4273	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-11 16:59:19.259725	\N
1709f93f-183b-48c7-9c59-01b734881a36	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-11 18:03:55.385894	\N
580d7c0a-c865-452d-ad08-e2bbb9feb0e8	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-11 18:15:19.636938	\N
71f23260-4ade-4659-8f0e-76c99bc7a61d	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-11 18:26:47.123943	\N
9195308a-ffa2-4215-9dbb-281dff1772f7	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-11 18:45:09.060788	\N
d00b260f-df90-47fc-a135-268b2f1405d1	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-12 00:17:20.325922	\N
87819f0e-753e-4978-8bc8-99d40ae56722	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-12 13:53:21.292815	\N
0a248d29-2d03-451d-b703-9a5ddeff4e30	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-12 13:59:36.098834	\N
5b5a5890-0098-4360-addf-e217fb3d8d28	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-12 14:00:06.594315	\N
c74b9c2b-a6c7-4d95-ad81-fb59f0d76ec8	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-12 14:13:26.255877	\N
c0d88721-8ac3-4480-b117-9f779a4a3fbb	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-12 14:24:18.065471	\N
9633be07-1487-4d9a-95aa-00917a6f4fde	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-12 14:24:49.162729	\N
1cd53b46-1778-4faf-bdc2-c1e8a812efd3	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-12 14:25:42.665495	\N
eb9a9687-b3f4-45ed-baec-3ec487f04936	admni	LOGIN_FAILED	usuario	unknown	{"razon":"usuario no encontrado o inactivo"}	::1	2026-05-12 14:35:10.960075	\N
c4a467f9-4ba2-4edd-9191-81e1facf3487	admni	LOGIN_FAILED	usuario	unknown	{"razon":"usuario no encontrado o inactivo"}	::1	2026-05-12 14:35:17.486977	\N
75415768-a6ee-4b1e-b830-efda6c05ce21	admni	LOGIN_FAILED	usuario	unknown	{"razon":"usuario no encontrado o inactivo"}	::1	2026-05-12 14:35:24.6338	\N
9b32b984-7f25-4d2b-83ca-f186fdc0cb8d	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-12 14:35:31.368823	\N
5143bee9-4b7b-450a-aa39-5544bc15327e	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-12 14:54:38.863923	\N
98c0ec77-334d-40a5-aba8-691ebbfdea80	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-12 14:56:00.461623	\N
a3d342a8-d439-433c-9ba0-a43d7f6b32f4	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-12 15:17:18.474954	\N
ad4de580-5ce9-4e36-ab73-8b4ee040703f	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-12 15:26:03.349155	\N
ef662182-99e3-4601-a93e-1e610af855bb	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-12 15:36:01.289735	\N
ae487f91-993e-42ac-a81a-172427a12173	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-12 15:39:33.794583	\N
e8b57556-bddb-4e68-ac73-35231fda9d69	admin	LOGIN_FAILED	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	{"razon":"contraseña incorrecta"}	::1	2026-05-12 15:44:48.600379	\N
e305871f-6213-46a7-b784-2f0b8492352e	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-12 15:45:33.401622	\N
d5b2e242-a8ff-479e-8036-4e08119023cf	admin	LOGIN_FAILED	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	{"razon":"contraseña incorrecta"}	::1	2026-05-12 15:54:59.736297	\N
80e8f6b8-0d1e-4d84-87a0-53b8c15c89c1	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-12 15:55:03.745791	\N
a86d1bef-c865-42a1-9837-b77f93d9e13d	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-12 16:04:11.545596	\N
5fd969cb-5d53-49e3-bf8f-607f1cb4b594	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-12 16:13:37.493046	\N
f6be47f6-8966-4710-91e9-0d4b816b40bc	admin	LOGIN_FAILED	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	{"razon":"contraseña incorrecta"}	::1	2026-05-12 16:21:38.75491	\N
30fd3a24-4f76-41c7-bc91-acb8e53b602d	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-12 16:21:42.57788	\N
02e39d4d-b228-4001-89ae-d4e640f0ea24	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-12 16:42:10.07389	\N
d6a831f8-0825-4258-a54e-ac13d9d725c2	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-12 16:48:19.264027	\N
8d1b164f-3ce0-41de-8178-6830b084ddd0	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-12 18:04:23.934952	\N
510c2ea6-86ed-4f84-abfc-91bc621d5932	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-12 18:09:24.627986	\N
1c5a4ae2-7504-4bad-95e1-fea045ece4b4	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-13 04:22:23.598899	\N
71d99ea3-1502-432a-a94b-3f2e9caac3c7	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-13 04:22:50.981933	\N
3d5cbc78-1bc7-4233-adcc-aeffd3c81a63	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-13 15:15:58.781004	\N
22fe77bc-cfd7-445d-89d4-73c5ce3fd59d	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-13 15:34:06.266646	\N
08876f26-8e10-4c8a-9842-c7d473eb7815	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-13 18:15:36.720559	\N
c97bb259-c27e-495c-8324-6565a9096bea	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-13 20:54:24.147504	\N
2b84b9cd-c9ea-4fa1-bbcd-58cee4e0f342	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-14 04:05:06.703977	\N
32cb4de6-0ca2-407f-bd4f-1bdc8bd72bd1	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-14 04:14:55.16711	\N
1ff1922a-9c95-4f37-bfde-a150440222d4	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-14 04:33:58.853086	\N
af922bfb-bf04-46bf-bcc3-24ad9cb48866	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-14 04:40:08.056375	\N
16b85b8f-07c3-4eb2-acee-0751b28558a3	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-14 04:57:24.495367	\N
3123640e-d0e2-4054-91ec-540bb36ae1fb	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-14 05:08:17.508008	\N
e99d7b83-9e46-42d5-b0dc-952074e466c6	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-14 12:06:17.020769	\N
ae992940-b63e-43c0-b8d2-bed27508b4a3	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-14 12:12:03.515913	\N
3a3692ba-1c9a-47d4-a85e-652dedebace8	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-14 12:19:10.504088	\N
3f31dcb4-0fbe-409b-a56d-89937846de8a	166132916	LOGIN	usuario	5cb98619-4fd3-4197-8511-b7285e67f197	\N	::1	2026-05-14 14:32:12.451032	\N
1935439f-f6b5-4fcc-8644-45ac2595c856	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-14 14:49:42.387346	\N
61d9f5c1-f1b8-4c51-b225-e690277ba424	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-14 14:50:38.374995	\N
1b17947d-b2a7-4ceb-ac73-8e9ea530c3fc	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-14 14:50:42.48867	\N
5e9c7d51-fbdc-40ac-b79e-a981824bd430	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-14 14:56:51.659811	\N
3a530002-552e-4c63-b89c-b9c55ae60ca1	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-14 14:56:55.666218	\N
7b6ea78c-d3e4-48f9-b0f5-73e0f375aed3	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-14 14:57:14.671729	\N
6d484030-74be-4031-bff0-50951f17c629	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-14 15:05:41.083033	\N
55e44689-d1b6-4127-8c0a-69b8e9c3a8b8	166132916	LOGIN	usuario	5cb98619-4fd3-4197-8511-b7285e67f197	\N	::1	2026-05-14 15:09:39.196114	\N
fbf5a2b4-0015-4b5b-be58-6627815de99d	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-14 15:10:42.66443	\N
8fea3d29-495e-4c9d-9804-7b9ff047ac95	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-14 15:14:16.005817	\N
2058c5b1-ed87-4e5f-b9f8-0d11a4afe956	166132916	LOGIN	usuario	5cb98619-4fd3-4197-8511-b7285e67f197	\N	::1	2026-05-14 15:17:04.828466	\N
5f621267-6b51-4130-9761-ef3265ac744a	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-14 15:21:32.098953	\N
77ec2081-d28c-47ff-a12f-dca20dfcf1df	166132916	CREATE	paciente	3a67a51e-ae91-4880-be04-730eb29365ef	{"rut":"05501439","nombre":"MARTA LUISA ESPINOZA AGUILERA"}	\N	2026-05-14 15:28:15.683438	\N
c9ba0003-3826-4dae-a549-eecb8e67063e	166132916	CREATE	paciente	0b9bf683-bc1d-40b8-8c17-c128dfe0c6b3	{"rut":"07440782","nombre":"RUTH GENOVEVA ALARCON INZUNZA"}	\N	2026-05-14 15:28:16.196506	\N
54d3efa3-0c46-428d-9acc-7da5dd1ceb34	166132916	CREATE	paciente	f0aeb662-82ac-4300-bb44-26a4a7651600	{"rut":"04447453","nombre":"ALVARITA DEL CARMEN BAEZA DIAZ"}	\N	2026-05-14 15:28:17.065595	\N
fb42afdc-0a7a-4fe3-b7e8-7bf833143f85	166132916	CREATE	paciente	4b52bd0c-e33f-40d0-8c8c-e4b3b99d8675	{"rut":"9984126","nombre":"ANA ROSA VERGARA SILVA"}	\N	2026-05-14 15:28:17.480751	\N
3ba784a1-6e8d-4d2b-b811-d099fb5e4b4a	166132916	LOGIN	usuario	5cb98619-4fd3-4197-8511-b7285e67f197	\N	::1	2026-05-14 15:30:38.597442	\N
c695d2c1-201e-4115-aa35-e3319f0ebec9	166132916	CREATE	paciente	ef33db0f-4db1-4a63-b08a-e1e87f224ed6	{"rut":"16613291","nombre":"CAMILO OVIEDO"}	\N	2026-05-14 15:34:46.632961	\N
462173d3-6526-49c9-a1af-083ca5feffef	166132916	LOGOUT	token	5cb98619-4fd3-4197-8511-b7285e67f197	{"accion":"Token revocado"}	\N	2026-05-14 15:42:31.115115	\N
663716f3-362d-4887-8e18-384ee26be8de	166132916	LOGOUT	token	5cb98619-4fd3-4197-8511-b7285e67f197	{"accion":"Token revocado"}	\N	2026-05-14 15:55:45.732467	\N
146fbbcb-253b-4170-9ed7-95c796ece1cf	166132916	LOGIN	usuario	5cb98619-4fd3-4197-8511-b7285e67f197	\N	::1	2026-05-14 16:07:17.938522	\N
e2b038f0-dcc3-4506-afb0-039829c61925	166132916	LOGIN	usuario	5cb98619-4fd3-4197-8511-b7285e67f197	\N	::1	2026-05-14 16:07:52.341063	\N
7d4a8360-c85c-49d6-9ba5-40cf94eb51a6	166132916	LOGOUT	token	5cb98619-4fd3-4197-8511-b7285e67f197	{"accion":"Token revocado"}	\N	2026-05-14 16:12:19.975105	\N
d7e86753-5703-4a77-abfc-a259a046441d	166132916	LOGOUT	token	5cb98619-4fd3-4197-8511-b7285e67f197	{"accion":"Token revocado"}	\N	2026-05-14 16:12:20.001409	\N
32383969-f9fe-429b-a523-9f5b1412d405	admin	LOGIN_FAILED	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	{"razon":"contraseña incorrecta"}	::1	2026-05-14 18:11:46.157428	\N
e0124351-1cf5-42bd-89ac-d54fd5eac269	admin	LOGIN	usuario	ad0038a3-b02c-494d-a588-584f43e491ec	\N	::1	2026-05-14 18:11:54.564603	\N
73fcede3-dcc9-4f53-b539-306ba7a5c993	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-14 18:16:55.908194	\N
bac23334-13d3-470a-b656-f56b2de20b1a	admin	LOGOUT	token	ad0038a3-b02c-494d-a588-584f43e491ec	{"accion":"Token revocado"}	\N	2026-05-14 18:16:55.911971	\N
32f818f2-7bd4-49fc-a6b3-dbaf28bb057d	166132916	LOGIN	usuario	5cb98619-4fd3-4197-8511-b7285e67f197	\N	::1	2026-05-14 18:45:08.074707	\N
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1262778000000	AddRegionColumn1262778000000
2	1262778000001	AddFechaNacimientoColumn1262778000001
3	1262770000000	CreatePacientesTable1262770000000
4	1262770000001	CreateUsuariosTable1262770000001
5	1262770000002	CreateAuditLogsTable1262770000002
6	1262770000003	CreateTokensRevocadosTable1262770000003
7	1262778000002	AddOperadorColumns1262778000002
8	1262780000000	RestorePacienteJoseTorres1262780000000
9	1262790000000	AddMissingColumns1262790000000
10	1262800000000	AddContactoAndDireccionColumns1262800000000
\.


--
-- Data for Name: pacientes; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pacientes (id, rut, dv, nombre, sexo, edad, telefono, escolaridad, pueblo, rsh, f_ingreso, f_consentimiento, f_egreso, naturaleza, comuna, rural, dependencia, enfermedades, pai, obj_pai, obj_alc, talleres, barthel1, pfeiffer1, lawton1, tug1, mini1, yesa1, eq1, barthel2, pfeiffer2, lawton2, tug2, mini2, yesa2, eq2, t1_fecha, t1_punt, t1_barthel, t1_mini, t2_fecha, t2_punt, t2_barthel, t2_mini, t3_fecha, t3_punt, t3_barthel, t3_mini, t4_fecha, t4_punt, t4_barthel, t4_mini, notas, plan, "creadoPor", "fechaRegistro", "modificadoPor", "modificadoEn", eliminado, "fechaEliminacion", region, provincia, operador_id, operador_nombre, fecha_nacimiento, anio, semestre, contacto_nombre, contacto_telefono, contacto_relacion, sector, direccion) FROM stdin;
3c744559-acab-4095-bd3c-8dceca6e2bf6	1111111	1	José Torres	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	Contulmo	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	admin	2026-05-11 18:11:39.526999	\N	2026-05-11 18:11:39.526999	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
3a67a51e-ae91-4880-be04-730eb29365ef	05501439	6	MARTA LUISA ESPINOZA AGUILERA	Femenino	82	976531980	Básica Incompleta	No	0%-40%	2026-04-29	2026-04-29	2027-09-08	Comunitario	COELEMU	Urbana	Leve	Comorbilidad	Sí	7	7	Participa entre 2 y 4 talleres semanales	95	4	7	11.00	25	\N	Muy buena	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	166132916	2026-05-14 15:28:15.590133	\N	2026-05-14 15:28:15.590133	f	\N	Ñuble	Itata	\N	\N	\N	2026	1	CECILIA CONCHA	976531980	Hijo/Hija	\N	POBLACION 11 DE SEPTIEMBRE, LOS ALOAMOS 416
0b9bf683-bc1d-40b8-8c17-c128dfe0c6b3	07440782	K	RUTH GENOVEVA ALARCON INZUNZA	Femenino	71	98961005	Media Incompleta	No	0%-40%	2026-04-20	2026-04-20	2026-09-09	Comunitario	COELEMU	Rural	Leve	Comorbilidad	Sí	7	7	Participa entre 2 y 4 talleres semanales	80	1	8	\N	17	10	Buena	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	166132916	2026-05-14 15:28:16.109876	\N	2026-05-14 15:28:16.109876	f	\N	Ñuble	Itata	\N	\N	\N	2026	1	RUTH ROA ALARCON	+56975781440	Hijo/Hija	\N	SAMUEL BAMBACH 148
f0aeb662-82ac-4300-bb44-26a4a7651600	04447453	0	ALVARITA DEL CARMEN BAEZA DIAZ	Femenino	82	944714728	Básica Incompleta	No	0%-40%	2026-05-21	2026-04-21	2027-09-08	Comunitario	COELEMU	Urbana	Leve	Comorbilidad	Sí	7	7	Participa entre 2 y 4 talleres semanales	85	7	8	7.00	16	1	Muy buena	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	166132916	2026-05-14 15:28:16.976182	\N	2026-05-14 15:28:16.976182	f	\N	Ñuble	\N	\N	\N	\N	2026	1	CARMEN MORAGA	+56981595771	Yerno/Nuera	\N	POBLACION 11 DE SEPTIEMBRE, CALLE LOS LEONES *378
4b52bd0c-e33f-40d0-8c8c-e4b3b99d8675	9984126	5	ANA ROSA VERGARA SILVA	Femenino	61	950276774	Básica Incompleta	No	0%-40%	2026-04-20	2026-05-20	2027-09-08	Comunitario	Coelemu	Urbana	Leve	Comorbilidad	Sí	7	7	Participa entre 2 y 4 talleres semanales	95	2	7	5.80	22	6	Más o menos	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	166132916	2026-05-14 15:28:17.391098	\N	2026-05-14 15:28:17.391098	f	\N	Ñuble	Itata	166132916	Camilo Oviedo	1964-06-17	2026	\N	ANA NOVA VERGARA	+56953996887	Hijo/Hija	\N	POBLACION ALEJANDRO PEDREZ, PSJE ENDESA #1
ef33db0f-4db1-4a63-b08a-e1e87f224ed6	16613291	6	CAMILO OVIEDO	Masculino	36	963159870	Media Completa	No	51%-60%	2026-01-14	2026-01-14	\N	Comunitario	Arauco	Rural	Moderada	Secuela ACV	No	\N	\N	Participa en más de 6 talleres semanales	80	8	8	12.00	12	10	Buena	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	166132916	2026-05-14 15:34:46.553467	\N	2026-05-14 15:34:46.553467	f	\N	Biobío	Arauco	166132916	Camilo Oviedo	1989-08-25	2026	\N	TERESA BARRALES	+9632158096	Padre/Madre	ARAUCASO	LOS HUILLINES 1023
\.


--
-- Data for Name: tokens_revocados; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.tokens_revocados (id, token, "usuarioId", username, revocado, "expiresAt") FROM stdin;
88e64b29-454e-489b-9f85-4b97f41045e1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MDY5Nzc1LCJleHAiOjE3NzcxNTYxNzV9.x0HM2PUk4PbP5Tq2Uo22IPB1cR8gynP_OPGaRZ2DeeE	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-24 22:30:47.307762	2026-04-25 22:29:35
91444959-b5f5-4e6f-b5f8-1aa15e4e213a	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MDY5ODcwLCJleHAiOjE3NzcxNTYyNzB9.xvewDaCX_yt0dRHHeWFgNNiDNzS8btBAD2LM8BsTcWk	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-24 22:34:28.755733	2026-04-25 22:31:10
9c367d61-ae23-446b-b106-020d66435694	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MDcwMDczLCJleHAiOjE3NzcxNTY0NzN9.3s0GTNqcQOZkQgu5OxyQeCD5wa95tp7XRf5lFqVRjU8	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-24 22:34:36.710718	2026-04-25 22:34:33
ba7474bb-1d00-4562-b162-d402887ca084	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNmZlY2Q1Zi1kZGE0LTRhMTgtOTM5ZC1lMTJhMzkzMTMzMmMiLCJ1c2VybmFtZSI6IjE5NzQ3OTgxNyIsIm5vbWJyZSI6IkZlbGlwZSBUaGllbGUiLCJyb2wiOiJhbmFsaXN0YSIsImlhdCI6MTc3NzA3MDA4NiwiZXhwIjoxNzc3MTU2NDg2fQ.kI7nzjM4uWEgcEJ7DYAFdpF2PcMedFPpnn0XIkdW3W8	36fecd5f-dda4-4a18-939d-e12a3931332c	197479817	2026-04-24 22:35:10.236913	2026-04-25 22:34:46
5e819985-d3be-45f6-8bb9-b08254795201	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MDcwMjU0LCJleHAiOjE3NzcxNTY2NTR9.My6wi-iLdM_HItcPjXq_YmxWFCMf6WRaFGOyJk9L71o	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-24 22:37:37.771829	2026-04-25 22:37:34
ccf7a950-ddc3-4cf6-96fe-e123d8ecfcaa	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNmZlY2Q1Zi1kZGE0LTRhMTgtOTM5ZC1lMTJhMzkzMTMzMmMiLCJ1c2VybmFtZSI6IjE5NzQ3OTgxNyIsIm5vbWJyZSI6IkZlbGlwZSBUaGllbGUiLCJyb2wiOiJhbmFsaXN0YSIsImlhdCI6MTc3NzA3MDI2NSwiZXhwIjoxNzc3MTU2NjY1fQ.TXwpplyQ5alBjr5Y5gYed29uaRl-ygRmgRr5nG819vU	36fecd5f-dda4-4a18-939d-e12a3931332c	197479817	2026-04-24 22:37:49.13314	2026-04-25 22:37:45
5b0ae269-ab39-4b0f-b044-110afcd367ac	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MDcwMzAyLCJleHAiOjE3NzcxNTY3MDJ9.w4kpYq--QaBqbPGCA3M3lyrdKJqz8LSR5pQIypx4Mts	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-24 22:38:49.718458	2026-04-25 22:38:22
dc2131af-ee65-4f2d-9826-30d4771c022e	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MDcwMzc1LCJleHAiOjE3NzcxNTY3NzV9.8QQvt9IJX3XmJBvjwYlooovtBzE6m9qWUUw5tc5SXAQ	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-24 22:59:04.044432	2026-04-25 22:39:35
bea2397d-1ea7-48a6-a611-a3ea0fb8412e	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MDcxNTQ4LCJleHAiOjE3NzcxNTc5NDh9.bVLfd7aMeSRaJJm57-4-KYX5qGK7_PoqjP9z7_fnkj8	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-24 23:16:01.400014	2026-04-25 22:59:08
87db299e-944e-4d5d-9b0e-c9ba1f441cbe	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MDcyNTY2LCJleHAiOjE3NzcxNTg5NjZ9.lQw88b8wZmBpx7h5NZdm3iRjPLEEr6gzoy4JxRet1zM	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-24 23:22:27.522506	2026-04-25 23:16:06
184100a1-45c8-4989-b3ee-08e15984d1a5	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MDc0OTcwLCJleHAiOjE3NzcxNjEzNzB9.i8GMaSdU-Bfn2vSnK0X3_Xx8AIIxuS6A21IHzjWhSQE	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 00:22:52.756284	2026-04-25 23:56:10
9826288c-1cca-4b7b-86b1-fe4c37e1fda1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MDc2NTc3LCJleHAiOjE3NzcxNjI5Nzd9.Fz-yA15MOuhH05KqlCisafu3JawOURdMz9QIEopupoU	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 00:45:14.985172	2026-04-26 00:22:57
beb89f64-9fc9-4fa7-b460-8e4ded5bdc6a	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MDc3OTIwLCJleHAiOjE3NzcxNjQzMjB9.apouIUASPTQyMeGW0LtZaLe5OobdOhkdtzugMQRiIKc	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 00:47:26.769193	2026-04-26 00:45:20
abd872e8-6187-4d22-963d-982f438c4f1e	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNmZlY2Q1Zi1kZGE0LTRhMTgtOTM5ZC1lMTJhMzkzMTMzMmMiLCJ1c2VybmFtZSI6IjE5NzQ3OTgxNyIsIm5vbWJyZSI6IkZlbGlwZSBUaGllbGUiLCJyb2wiOiJhbmFsaXN0YSIsImlhdCI6MTc3NzA3ODA1OSwiZXhwIjoxNzc3MTY0NDU5fQ.8t2KIZfpBomI5HV874XO2QwJJuNRidWPYPjJ1Sz9v9U	36fecd5f-dda4-4a18-939d-e12a3931332c	197479817	2026-04-25 00:47:45.516223	2026-04-26 00:47:39
8ee2adb5-e37e-4e67-ac41-5f767d18abd9	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MDc4MDcwLCJleHAiOjE3NzcxNjQ0NzB9.MeRjJwWPQBq2MqfbHXCO_7skhYpXjqj8W28b9YmN-lk	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 19:00:41.306546	2026-04-26 00:47:50
aa3f1184-0c4a-4b62-90f6-579f9f746931	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MDc4MDcwLCJleHAiOjE3NzcxNjQ0NzB9.MeRjJwWPQBq2MqfbHXCO_7skhYpXjqj8W28b9YmN-lk	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 19:00:41.422938	2026-04-26 00:47:50
cca14c6c-ebc2-42c2-8b0b-675a425a3077	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MTQzNjU0LCJleHAiOjE3NzcyMzAwNTR9.pgtKZw8DmJ9bT2edtQKKCPiSk5l0tgoDmMmoa_NBtXs	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 19:04:13.025545	2026-04-26 19:00:54
49a4123f-1d03-478c-9a88-f490a0676e0b	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MTQzOTgzLCJleHAiOjE3NzcyMzAzODN9.Q_3YcCp3ANKLlr1DjfB-q9MlW7_Z0wn4_Tp89wvv98E	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 19:11:39.380269	2026-04-26 19:06:23
d1e0a269-628c-4cd4-b767-31d606b742ec	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MTQ1Nzk1LCJleHAiOjE3NzcyMzIxOTV9.b4kV0je5StKBF58CnKaKKW187JPrcb7YViXSDNJPvUU	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 20:20:04.482503	2026-04-26 19:36:35
fa63cd7f-ea89-4675-b981-32990433a43e	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MTQ1Nzk1LCJleHAiOjE3NzcyMzIxOTV9.b4kV0je5StKBF58CnKaKKW187JPrcb7YViXSDNJPvUU	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 20:20:04.675206	2026-04-26 19:36:35
0daf4423-2a20-446e-a01d-171b0a1caad7	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MTQ4NDA5LCJleHAiOjE3NzcyMzQ4MDl9.Mqp3ghT7t04f7qv2oFiX3e-tklNaogjGfod-fIGxzQs	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 21:02:22.369881	2026-04-26 20:20:09
7deebc16-1f2b-45b3-ae7d-9958adb8f90d	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MTUwOTQ3LCJleHAiOjE3NzcyMzczNDd9.NsnxDM8xyf5_jo1tGSdpRuRQqZVo15F2CG-E-s49-Go	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 21:11:15.809986	2026-04-26 21:02:27
0e6fdf29-02b9-45c8-8435-240689ef4b55	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MTUxNDgwLCJleHAiOjE3NzcyMzc4ODB9.p3IxweR4SBYlltc9Q7dX9Kcri8jkE9kqsM6naYCvMFs	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 21:30:12.35339	2026-04-26 21:11:20
98685571-c190-40d8-8df4-3b20fcb5c345	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNmZlY2Q1Zi1kZGE0LTRhMTgtOTM5ZC1lMTJhMzkzMTMzMmMiLCJ1c2VybmFtZSI6IjE5NzQ3OTgxNyIsIm5vbWJyZSI6IkZlbGlwZSBUaGllbGUiLCJyb2wiOiJhbmFsaXN0YSIsImlhdCI6MTc3NzE1MTg1MSwiZXhwIjoxNzc3MjM4MjUxfQ.dINs_Q865C8ZSxcD7Lli6sd12L5ytJpdEK3L7esm7cU	36fecd5f-dda4-4a18-939d-e12a3931332c	197479817	2026-04-25 21:40:48.605884	2026-04-26 21:17:31
4e83d2a2-02e4-46f3-ba14-b08c3f35f96d	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MTUzMjUyLCJleHAiOjE3NzcyMzk2NTJ9.cRd80-Rp0kxxV98NecPvntrtqKy9BT7Q7l1gP9QOBbs	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 21:44:35.524929	2026-04-26 21:40:52
227524a0-5aa6-48ce-bb29-3051e300b30c	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNmZlY2Q1Zi1kZGE0LTRhMTgtOTM5ZC1lMTJhMzkzMTMzMmMiLCJ1c2VybmFtZSI6IjE5NzQ3OTgxNyIsIm5vbWJyZSI6IkZlbGlwZSBUaGllbGUiLCJyb2wiOiJhbmFsaXN0YSIsImlhdCI6MTc3NzE1MzQ4NiwiZXhwIjoxNzc3MjM5ODg2fQ.ocodm5r1ccK40tMF8lYBzyU7Laz6KId6Ntn1IZ_OJDI	36fecd5f-dda4-4a18-939d-e12a3931332c	197479817	2026-04-25 21:44:47.368445	2026-04-26 21:44:46
c4eadbdf-0222-41e4-95db-9481f0b32848	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNmZlY2Q1Zi1kZGE0LTRhMTgtOTM5ZC1lMTJhMzkzMTMzMmMiLCJ1c2VybmFtZSI6IjE5NzQ3OTgxNyIsIm5vbWJyZSI6IkZlbGlwZSBUaGllbGUiLCJyb2wiOiJhbmFsaXN0YSIsImlhdCI6MTc3NzE1MzUwMywiZXhwIjoxNzc3MjM5OTAzfQ.kRwD5-ezpOpT0vPx3g-vvmLzMLf3Xx_KSawbymUM9nw	36fecd5f-dda4-4a18-939d-e12a3931332c	197479817	2026-04-25 21:45:07.602644	2026-04-26 21:45:03
9ee47e71-02d4-444f-8e62-25383c91ba98	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNmZlY2Q1Zi1kZGE0LTRhMTgtOTM5ZC1lMTJhMzkzMTMzMmMiLCJ1c2VybmFtZSI6IjE5NzQ3OTgxNyIsIm5vbWJyZSI6IkZlbGlwZSBUaGllbGUiLCJyb2wiOiJhbmFsaXN0YSIsImlhdCI6MTc3NzE1MzY0OSwiZXhwIjoxNzc3MjQwMDQ5fQ.J3uKkgg1bNVqkKdSdYTiJz773yrH20M0eE8t-9osMLY	36fecd5f-dda4-4a18-939d-e12a3931332c	197479817	2026-04-25 21:48:16.937269	2026-04-26 21:47:29
689cb8b9-ddb2-4a2d-a431-2144b7bf664d	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNmZlY2Q1Zi1kZGE0LTRhMTgtOTM5ZC1lMTJhMzkzMTMzMmMiLCJ1c2VybmFtZSI6IjE5NzQ3OTgxNyIsIm5vbWJyZSI6IkZlbGlwZSBUaGllbGUiLCJyb2wiOiJhbmFsaXN0YSIsImlhdCI6MTc3NzE1MzcwMywiZXhwIjoxNzc3MjQwMTAzfQ.npSXN57u4tjjhHSprLOiVrA4_EP8Dltcw2nAMl7i-sA	36fecd5f-dda4-4a18-939d-e12a3931332c	197479817	2026-04-25 21:48:31.432558	2026-04-26 21:48:23
758cf047-bc5e-49d1-84a0-04cc91eeed68	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNmZlY2Q1Zi1kZGE0LTRhMTgtOTM5ZC1lMTJhMzkzMTMzMmMiLCJ1c2VybmFtZSI6IjE5NzQ3OTgxNyIsIm5vbWJyZSI6IkZlbGlwZSBUaGllbGUiLCJyb2wiOiJhbmFsaXN0YSIsImlhdCI6MTc3NzE1MzcxOCwiZXhwIjoxNzc3MjQwMTE4fQ.9_rB1phNn1WlrfEBwhbygNQPbZUf1Jv3Rq9b8EawKec	36fecd5f-dda4-4a18-939d-e12a3931332c	197479817	2026-04-25 21:51:24.035031	2026-04-26 21:48:38
21d1be3f-ca5e-484f-9f5e-34525e3421ca	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MTUyNjE3LCJleHAiOjE3NzcyMzkwMTd9.CrskiWh2jwYHuP8hfl7R3g4EcyvEf3piqcI8aWwJijk	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 22:00:57.725903	2026-04-26 21:30:17
57375238-a9f3-4778-982c-9acfb08208ed	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MTU0NDYxLCJleHAiOjE3NzcyNDA4NjF9.7fx4yHhir4eJycC8AX6qd8NphJ0JI0j_1yUsJ4iJAoI	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 22:30:07.418019	2026-04-26 22:01:01
9ba5b74c-6c20-4a03-b972-b6556bebc1d5	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MTU2MjExLCJleHAiOjE3NzcyNDI2MTF9.pznzZyeRDy1-opecCq4GDY40akvgWC8TpFp1vgh4N60	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 22:30:15.772908	2026-04-26 22:30:11
2a28d24f-38f6-458a-961f-391350cfd82e	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MTU2MjI1LCJleHAiOjE3NzcyNDI2MjV9.7-ziv__QhDVBMSMUJ2CFlAKykV80B1Zk-fJDrDM2gno	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 22:32:01.673418	2026-04-26 22:30:25
b5b7ac95-6633-48d8-b158-81f8fdc68f75	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MTU2MzI2LCJleHAiOjE3NzcyNDI3MjZ9.58w62bwtYCKggInO2AmqNC78NdlVE0JrM8MV013k1wk	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 22:33:48.617578	2026-04-26 22:32:06
58eaa17c-1cc2-40ba-808d-27d8bb5d1b0d	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MTU2NDM1LCJleHAiOjE3NzcyNDI4MzV9.guc-dbp5P-CooYM4dkJjRc4i0ZZqvofI3Rz7FEIQSXA	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 22:34:35.339305	2026-04-26 22:33:55
79d30e34-c6ff-4f13-a027-5ceb4ea15489	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MTU2NDgyLCJleHAiOjE3NzcyNDI4ODJ9.3rkdpeRNrMdEyvrCCGhEa93K_Q7Pl-co56MymANd0GE	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 22:35:42.978894	2026-04-26 22:34:42
43dc8a3f-f99d-4726-99c7-b9cce51cd549	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MTU2NTQ4LCJleHAiOjE3NzcyNDI5NDh9.eBgapQmGNSottGReWVQCd9CdGq_4euGFRQau9uEebKg	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 22:35:52.05091	2026-04-26 22:35:48
f92416b4-13b7-4f2c-a218-2957790ea30c	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MTU2NTU1LCJleHAiOjE3NzcyNDI5NTV9.7Cgx8TeLctF2b1dpJIjy4279YReei3jr5itpXnAovVw	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 22:37:43.602275	2026-04-26 22:35:55
e39b28b8-8ac3-4ab9-9276-4a19007e41e4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MTU2NjY4LCJleHAiOjE3NzcyNDMwNjh9.LN9lY0jVcDzECnoIGQusGcE4DR76dkw8h4C7KZpjQr4	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 22:37:58.703707	2026-04-26 22:37:48
95d9ec2e-059a-4991-a90a-db535871e585	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MTU2NjgyLCJleHAiOjE3NzcyNDMwODJ9.11RkdA3JFbmq_Qh3LJCDE28Uvp-78xafGIphNPOdN8I	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 22:38:05.52597	2026-04-26 22:38:02
5bede9bf-5dc1-4817-9177-087e0c862a9d	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MTU2Njg5LCJleHAiOjE3NzcyNDMwODl9.bBju1jsb8TKdRR3X5d_1W0Kyy8Z2EGi0f9GtFaLc_Lg	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-25 22:50:04.25649	2026-04-26 22:38:09
1ee7914f-45a0-4783-8f0c-dbefded63b38	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MjUwMTkwLCJleHAiOjE3NzczMzY1OTB9.AuKE3O600B2UDPbZFZ44eIi3hYhZZNKPaUjhtNJR5yA	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-27 00:36:42.684259	2026-04-28 00:36:30
1015047d-95e3-4937-a81d-d1c25ffc65cd	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MjUwMjA2LCJleHAiOjE3NzczMzY2MDZ9.znuWzhxz2XxFFCFi5uC22C7sMh6j_gCEcu__-CJWGz0	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-27 00:39:33.785271	2026-04-28 00:36:46
00c6505e-ea92-4f30-80d5-df882f52250b	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MjUwMzc3LCJleHAiOjE3NzczMzY3Nzd9.WAkPp4iZvrQR0llBGXvPTwtSmFTJctHa2IAYSgVw258	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-27 00:39:39.987248	2026-04-28 00:39:37
9a2a3b1f-bc58-48e1-b0f6-7293b7604c69	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MjUwMzg2LCJleHAiOjE3NzczMzY3ODZ9._rOg8eAH-9wzl7GS1UQ6W-5r301IEkNSIOMvjCb-N1M	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-27 00:40:26.135978	2026-04-28 00:39:46
92a8bc61-c770-4237-86a4-3146b2cb7e95	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MjUwNDI5LCJleHAiOjE3NzczMzY4Mjl9.H9xOOK1kQYgb8dFYA0vN4cnOn6Yh_muuiZ2rUgGBzhU	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-27 00:40:35.251071	2026-04-28 00:40:29
6285ee9d-0eef-406c-bf39-507851862f20	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MjUwNDM4LCJleHAiOjE3NzczMzY4Mzh9.tT6o1K7suvn4dSQC218YHYspFwlOHFK0ADFKPeVQ-zs	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-27 00:45:07.036876	2026-04-28 00:40:38
977f0764-ac7c-4923-955a-a7a1be2bc619	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MjUwNzEwLCJleHAiOjE3NzczMzcxMTB9.rckcgs1d-pRD3__xehrLl44mNvyqdfPI82ttj9-Ph78	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-27 01:01:32.773642	2026-04-28 00:45:10
1c0e6f40-0955-4e73-8c64-857e584ad3dd	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MjUxNjk3LCJleHAiOjE3NzczMzgwOTd9.Tqw137QLXM3hxpAJLus9fTlunjDYjwg8VUYJWu9TFGM	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-27 01:03:28.289904	2026-04-28 01:01:37
ccf69a5f-8d44-421a-a8c9-d5986278b1fd	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MjUxODE0LCJleHAiOjE3NzczMzgyMTR9.VS8fQ0eqfvcu6O_kEma9wro0ucBqYWdpRqKGAb_lOA8	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-27 01:12:11.57982	2026-04-28 01:03:34
9f5e6aef-696a-4c9f-83bb-c2346ba460ac	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MzgxMjU4LCJleHAiOjE3Nzc0Njc2NTh9.5XfXY_7d1DKGKDCytNCURo6UYFW3CDLLvZpV0Yaxb0Q	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-28 13:37:10.53891	2026-04-29 13:00:58
8b581ce8-aaa1-4543-99c3-4e897a93098c	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3MzgzNDM1LCJleHAiOjE3Nzc0Njk4MzV9.krYYtpzAW4rzB3aNrZ5TmkGN2MK-PqO5V03IJaVXb2U	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-28 14:15:56.260131	2026-04-29 13:37:15
cff7b42e-535f-46e3-bd2a-551bb30db300	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3Mzg1NzYwLCJleHAiOjE3Nzc0NzIxNjB9.tlXz_CJl_Si3UJV5f7Wkr5S_covfc39aVlrMtoAkuOw	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-28 21:45:18.846884	2026-04-29 14:16:00
9f6bc173-80d7-44e6-b070-a54ed4a3f940	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3NDEyNzIzLCJleHAiOjE3Nzc0OTkxMjN9.nMw3Zu8qZaUQtw7smX76azwsCamILNiGHFJhhTpfJGQ	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-29 14:37:33.430371	2026-04-29 21:45:23
e64398ad-0f19-4299-bd0b-8699a200bfd3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3NDczNDU4LCJleHAiOjE3Nzc1NTk4NTh9.agrSxbfCdqjPw4P5Xj2s8uEQAAe3YvGYhAEyKTyuqBo	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-29 14:37:56.913806	2026-04-30 14:37:38
313b3901-39ac-4db7-9153-fc2bee8f77e4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3NDczNDgwLCJleHAiOjE3Nzc1NTk4ODB9.i7o4aD8wsYSzoap1fw-yft6HY-zUlnMwTc7Z2Ka8K_Q	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-29 14:45:02.517473	2026-04-30 14:38:00
3348e807-6bc0-48f5-a465-061d4b7feeae	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3NDczOTA2LCJleHAiOjE3Nzc1NjAzMDZ9.FI7VDHtoip4NxBvE9kqVrauOrQXnm93-58ol3Yj7eqE	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-29 15:13:54.290968	2026-04-30 14:45:06
9706e1cf-c1ec-401b-9d43-e7927d0e0d3a	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3NDc1NjM4LCJleHAiOjE3Nzc1NjIwMzh9.GJGQgObgGDrv1cSz_yJRZFOTZaRX5oiteOg9GgX5-t4	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-29 15:26:36.047016	2026-04-30 15:13:58
99da06c5-00ea-48dd-be23-e7d5377d3714	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3NDc2NDA4LCJleHAiOjE3Nzc1NjI4MDh9.c3DxJ5sePyr5OScLKJ7l9u_5f2DNqB3-bg5I6cZN8OA	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-29 15:38:47.40592	2026-04-30 15:26:48
08f6be6c-14e2-4a8d-b65b-db34ea6165af	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3NDc3MTMxLCJleHAiOjE3Nzc1NjM1MzF9.W9hJ6qb7hVr2xp_QVOuV_6piLOj0WXMaXM5cxr73_Uo	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-29 18:01:52.176159	2026-04-30 15:38:51
8428b3d3-43e5-4573-9146-d5022d2bdfb2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3NDg1NzIzLCJleHAiOjE3Nzc1NzIxMjN9.8X4ByXnr0gXY44fIboIc32lj1xgh6TkfY0CW7jSSw_M	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-29 19:11:33.886645	2026-04-30 18:02:03
2b139a0c-fcf1-460c-9d46-8d620ff4ccf5	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3NDg5ODk4LCJleHAiOjE3Nzc1NzYyOTh9.odx3L2kZa0elgx4tOrUb7RlC6ne1TIlt5O5BXHlXkco	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-30 12:39:25.521961	2026-04-30 19:11:38
7ec7b677-9f20-4a05-9c0a-140983893868	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3NTUyNzcwLCJleHAiOjE3Nzc2MzkxNzB9.mUOjXOv_SVgZGe1GPcwzcCGs-CsOmxYyA1pNyNdKJpc	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-04-30 12:44:51.231694	2026-05-01 12:39:30
180c39fe-12b4-4e24-b1bb-34784fb49f57	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNmZlY2Q1Zi1kZGE0LTRhMTgtOTM5ZC1lMTJhMzkzMTMzMmMiLCJ1c2VybmFtZSI6IjE5NzQ3OTgxNyIsIm5vbWJyZSI6IkZlbGlwZSBUaGllbGUiLCJyb2wiOiJhbmFsaXN0YSIsImlhdCI6MTc3NzU2NzUyMSwiZXhwIjoxNzc3NjUzOTIxfQ.eJyEtl9DNnwq-mcn7jFVxZR6JBKa8iYpWEFnUGwSbOE	36fecd5f-dda4-4a18-939d-e12a3931332c	197479817	2026-04-30 16:45:35.667307	2026-05-01 16:45:21
65ae17d1-058e-4f72-a097-ee89f2bf61a5	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3OTAzNjkxLCJleHAiOjE3Nzc5OTAwOTF9.2oHtbNTYxrpqjfnY7j8WdAFmaU3xeDidxiHRRmB0nVc	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-04 14:28:36.688095	2026-05-05 14:08:11
13ca9494-dfe1-4c6e-a4ca-45684cc29c92	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3OTA1MzE2LCJleHAiOjE3Nzc5OTE3MTZ9.X-NNeZw4dHtHmt86YPRdfXSFbOG4TEKN1RiFAdZipVk	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-04 14:41:11.784714	2026-05-05 14:35:16
f9f01abe-94f4-423e-a7a3-6744e6481d3b	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3OTA1ODk5LCJleHAiOjE3Nzc5OTIyOTl9.CBhxTkNyhBbOUOUSlGisynOcDZTrcARmq4WEMfiqzdc	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-04 14:50:00.796936	2026-05-05 14:44:59
960720d9-a3d7-4bce-be2d-2ad90f33d4e3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3OTA2MzgxLCJleHAiOjE3Nzc5OTI3ODF9.iPM8IgoZt396_HR78SGpcZRojFt-nd1SKHTrcYBsLQg	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-04 15:02:01.316251	2026-05-05 14:53:01
7a9540c7-05c7-4081-b4fd-9e78762d12d8	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3OTA2OTI2LCJleHAiOjE3Nzc5OTMzMjZ9.sr5ZkWK6rOKkjEUDnvgIYVLyn5SNVFGUZgoy6xZ6zAU	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-04 15:07:07.403909	2026-05-05 15:02:06
c995c5eb-a9a3-4aa7-957b-01e78ba48f10	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3OTA3MjU1LCJleHAiOjE3Nzc5OTM2NTV9.RG9tfkFjfXWG5dYPuqqnCjqGY71L8Xqp8TOVSPvsfoU	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-04 15:07:50.929556	2026-05-05 15:07:35
f44d0d13-8c02-4f28-9df6-21f1742c0982	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3OTA3NDM4LCJleHAiOjE3Nzc5OTM4Mzh9.enobgsWG7UtqXdw343mC8YgSJGxDQMqsUx5ZVdDHjTA	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-04 15:15:39.389048	2026-05-05 15:10:38
fa4bb856-e857-4f8c-8c7f-554eaf2b6363	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2I5ODYxOS00ZmQzLTQxOTctODUxMS1iNzI4NWU2N2YxOTciLCJ1c2VybmFtZSI6IjE2NjEzMjkxNiIsIm5vbWJyZSI6IkNhbWlsbyBPdmllZG8iLCJyb2wiOiJvcGVyYWRvciIsImlhdCI6MTc3NzkwNzI3OSwiZXhwIjoxNzc3OTkzNjc5fQ.ZrYECHMtNVn7AssMWrcA7JR0K7LGfuPwVe-VuzP_UIQ	5cb98619-4fd3-4197-8511-b7285e67f197	166132916	2026-05-04 15:21:15.805734	2026-05-05 15:07:59
49cf067e-4616-4bb5-a3f7-d7e9f8328845	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2I5ODYxOS00ZmQzLTQxOTctODUxMS1iNzI4NWU2N2YxOTciLCJ1c2VybmFtZSI6IjE2NjEzMjkxNiIsIm5vbWJyZSI6IkNhbWlsbyBPdmllZG8iLCJyb2wiOiJvcGVyYWRvciIsImlhdCI6MTc3NzkwODA4NCwiZXhwIjoxNzc3OTk0NDg0fQ.YaGwHgq79od_PDPISISgMCD2dWw1FSFnuhZA9vMScAQ	5cb98619-4fd3-4197-8511-b7285e67f197	166132916	2026-05-04 15:42:08.186946	2026-05-05 15:21:24
d5e2f982-b20d-4df1-a119-c688af287d35	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2I5ODYxOS00ZmQzLTQxOTctODUxMS1iNzI4NWU2N2YxOTciLCJ1c2VybmFtZSI6IjE2NjEzMjkxNiIsIm5vbWJyZSI6IkNhbWlsbyBPdmllZG8iLCJyb2wiOiJvcGVyYWRvciIsImlhdCI6MTc3NzkwNzI4OSwiZXhwIjoxNzc3OTkzNjg5fQ.9U5j8S198jLPO0VeVqwR_Pn4UvB6EHxPjiKj8kJTGLs	5cb98619-4fd3-4197-8511-b7285e67f197	166132916	2026-05-04 16:56:33.896896	2026-05-05 15:08:09
cfcd22e6-a61c-4b9e-b480-a974d52ec37d	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3OTA4MTAwLCJleHAiOjE3Nzc5OTQ1MDB9.0nz6EVyBzR9a70V0rMZMRABB8CxT6g9CTTRwEkhwMao	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-04 17:01:33.871042	2026-05-05 15:21:40
a027c767-9f67-4526-b49a-1820a8a4e45a	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3OTE3NjExLCJleHAiOjE3NzgwMDQwMTF9.ZkriEi6arxg9LaGXuIDAJ4aEh8RH0ay2PMerIBQuBSU	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-04 18:13:42.274416	2026-05-05 18:00:11
3b449af7-7d48-4ae7-ad14-767d9afd55ee	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2I5ODYxOS00ZmQzLTQxOTctODUxMS1iNzI4NWU2N2YxOTciLCJ1c2VybmFtZSI6IjE2NjEzMjkxNiIsIm5vbWJyZSI6IkNhbWlsbyBPdmllZG8iLCJyb2wiOiJvcGVyYWRvciIsImlhdCI6MTc3NzkyMjQ0MCwiZXhwIjoxNzc4MDA4ODQwfQ.hBkhtB7ofyuowzJ64u1vb7FKphMSd7A_HNOqh91-AJ4	5cb98619-4fd3-4197-8511-b7285e67f197	166132916	2026-05-04 19:25:56.832477	2026-05-05 19:20:40
6f769327-c61a-4903-8176-28edbfd4c839	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc3OTE4NDMyLCJleHAiOjE3NzgwMDQ4MzJ9.ek0B1AfZsxzNdWXjDnezSffFR2R1EDno9kHeN7zuKjY	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-05 12:15:38.213018	2026-05-05 18:13:52
9a6fac73-bc62-4ffb-bb3c-a0863a45717a	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4MDkxOTQ5LCJleHAiOjE3NzgxNzgzNDl9.ry7qu2m2cibeSxE0lrdROt8ow69v3m9r3Vf7yQBAxxg	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-07 12:34:54.813964	2026-05-07 18:25:49
b7035118-5f55-421f-903b-287633dd683e	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4MjQzNzY5LCJleHAiOjE3NzgzMzAxNjl9.IELIqUeEcpeQBvtAUvvp79l-PMcMlDSyGa22Eh3W0W4	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-08 12:41:09.594444	2026-05-09 12:36:09
feaf5cf9-7896-4413-bec7-20c02a8464e6	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NDYwODc3LCJleHAiOjE3Nzg1NDcyNzd9.yOAT60d6e82WxtOQn-vXUJHqdvdJnMpwWsI1yfczOXM	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-11 01:16:24.95627	2026-05-12 00:54:37
43db573f-3548-44c5-9053-332a989cae20	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NTAxMDg0LCJleHAiOjE3Nzg1ODc0ODR9.ZYUX_zApjNOZWhZ9Cg-dZgPD_phqRRg0Hb1cxKULR-8	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-11 13:47:45.600798	2026-05-12 12:04:44
2eb356ff-75f6-4ab0-96d0-0258587379a1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NTA3MjcwLCJleHAiOjE3Nzg1OTM2NzB9.F-bUJU067mGpmdkHjrGW23xG6FAAQIIqxYhuznr3J0M	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-11 13:55:32.07289	2026-05-12 13:47:50
d2d4bbe8-4495-4790-977d-1cb2d45327a2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NTA3ODQ4LCJleHAiOjE3Nzg1OTQyNDh9.Df36RbzxjHVyur2HLTGPSg90dxlCGMvYXU-7ow6iOyc	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-11 14:02:34.929643	2026-05-12 13:57:28
c0199bf1-1a70-4646-adee-76b66ddc47e1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NTA4MjI1LCJleHAiOjE3Nzg1OTQ2MjV9.9srfX2tn1GVsCRKqEhkV4LN8b8wCnizj6mxume_3pro	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-11 14:09:17.23236	2026-05-12 14:03:45
f4d9e96f-4feb-47b3-94de-aada1ba977dc	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NTA4MjI1LCJleHAiOjE3Nzg1OTQ2MjV9.9srfX2tn1GVsCRKqEhkV4LN8b8wCnizj6mxume_3pro	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-11 14:09:17.287434	2026-05-12 14:03:45
34bdbc07-b278-4bbc-83e8-3bcfc461c462	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NTA4NTc2LCJleHAiOjE3Nzg1OTQ5NzZ9.FwyRHX1962KEy0oARd4OPYKVvss8Ia84lAtfYSo8En4	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-11 14:14:53.02548	2026-05-12 14:09:36
66914fb7-5f2d-4913-b5d0-c6f037d15e83	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NTA4NTc2LCJleHAiOjE3Nzg1OTQ5NzZ9.FwyRHX1962KEy0oARd4OPYKVvss8Ia84lAtfYSo8En4	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-11 14:14:53.044523	2026-05-12 14:09:36
e234effb-9fbd-4efb-b424-a8c2bb8d2071	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NTA4OTIyLCJleHAiOjE3Nzg1OTUzMjJ9.FXHwX4PeXdzLUwr_vTzgwe6I8KWYF56Jym2q1iK4tR4	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-11 14:23:37.045617	2026-05-12 14:15:22
166493ec-b781-49d3-aa0b-208674b62601	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NTA4OTIyLCJleHAiOjE3Nzg1OTUzMjJ9.FXHwX4PeXdzLUwr_vTzgwe6I8KWYF56Jym2q1iK4tR4	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-11 14:23:37.048133	2026-05-12 14:15:22
82dff983-0341-499d-b9a4-b2797083c00b	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NTEwMjYxLCJleHAiOjE3Nzg1OTY2NjF9.uIGJEwVlGKyjtnbeQY833lnVU2XGKNSiztUDbbGO1Qo	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-11 14:42:45.061464	2026-05-12 14:37:41
6bd6d077-2c8c-43bc-abc8-7565b401636d	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NTEwODg4LCJleHAiOjE3Nzg1OTcyODh9.cDyTK2tGqD6Vu8YLuh4s5SGWz8rpot40L7R0ZQqIS2I	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-11 14:53:45.171476	2026-05-12 14:48:08
f47da35d-5fb1-4646-a5bc-6c7d6f035f0d	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NTExOTQ0LCJleHAiOjE3Nzg1OTgzNDR9.BzypacoaPQ_4J_CKHwMLXRYqzXc89LRrn-SW99_e1qE	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-11 15:14:09.73349	2026-05-12 15:05:44
caee1098-0296-4988-8234-707f46257823	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NTEyNjQ0LCJleHAiOjE3Nzg1OTkwNDR9.wjXUhHC3WzmUhMo9KUMa4kMTgRehKAxwvMtE5uvvEUI	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-11 15:22:28.246686	2026-05-12 15:17:24
dd4d99ae-eb32-4acb-bd48-3afa14f6e37c	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NTEzMzE3LCJleHAiOjE3Nzg1OTk3MTd9.cQ7Z_yW0OlurdeuxKB0vH46xp9XKiKwgbBE2oNdaAV0	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-11 15:51:18.167134	2026-05-12 15:28:37
f827efc8-06de-45a0-a289-a10f40b52e23	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NTE0NTM0LCJleHAiOjE3Nzg2MDA5MzR9.arQoQ4k-i8y2aoiaea61esy43lyXEyuCfIQB1j_x3Z8	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-11 15:53:59.530244	2026-05-12 15:48:54
c96da5e6-150a-4d9e-8e87-9ef568ace2ee	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NTE3MTE4LCJleHAiOjE3Nzg2MDM1MTh9.TOikkeoPLMiVPojuUGAIzc_k3lDJacA-o3J1WzOxtDU	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-11 16:37:01.844056	2026-05-12 16:31:58
d298472b-e406-4fbb-b8e1-4b8d84dabe7a	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NTE3NTk4LCJleHAiOjE3Nzg2MDM5OTh9.6Iawo_F9Whnp2IC-tF124-eCWvcVsHukHQErae2oSSk	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-11 16:45:00.311044	2026-05-12 16:39:58
c8394a5a-c6f3-4303-a31c-b90c23ed1879	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NTE3NTk4LCJleHAiOjE3Nzg2MDM5OTh9.6Iawo_F9Whnp2IC-tF124-eCWvcVsHukHQErae2oSSk	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-11 16:45:00.326605	2026-05-12 16:39:58
b725e302-a06f-43c6-854d-4d707997cbd3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NTE4NDU4LCJleHAiOjE3Nzg2MDQ4NTh9.q7wzCIcgKR8GiZTVQORPw_oQFbVdCEmB8_hNmR6BafI	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-11 16:59:19.252575	2026-05-12 16:54:18
48be5594-9032-4ffc-9af7-c08fc674db28	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NjA5MDY0LCJleHAiOjE3Nzg2OTU0NjR9.B5-P0iPb2SanV2p_vCn3TW4LiXp_QNmrypEBI8iUYtc	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-12 18:09:24.562925	2026-05-13 18:04:24
44c2c47d-5909-4393-965b-74d865300a94	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NzcwMTgyLCJleHAiOjE3Nzg4NTY1ODJ9.2qeWiRnkgFzLtwBgMMeXMlWSiNZ4TCgVn1X9KJ0GGPA	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-14 14:50:38.278327	2026-05-15 14:49:42
8c35a800-b153-4ec6-aab2-68383fe7ad36	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NzcwMjQyLCJleHAiOjE3Nzg4NTY2NDJ9.OvUlBEUJw8aml1yU3ZkTFIWd8aTTgdyExpWuwCpXN00	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-14 14:56:51.577889	2026-05-15 14:50:42
3a0eddb5-75a5-47bd-9db9-1d2fc388c310	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NzcxMTQxLCJleHAiOjE3Nzg4NTc1NDF9.d6KCNqSuUQIkfATALspO_13fDQpjXmUP72tsjv4WxZM	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-14 15:10:42.579102	2026-05-15 15:05:41
40347e85-34a5-4812-bba5-c6b427ffb41f	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2I5ODYxOS00ZmQzLTQxOTctODUxMS1iNzI4NWU2N2YxOTciLCJ1c2VybmFtZSI6IjE2NjEzMjkxNiIsIm5vbWJyZSI6IkNhbWlsbyBPdmllZG8iLCJyb2wiOiJvcGVyYWRvciIsImlhdCI6MTc3ODc3MjYzOCwiZXhwIjoxNzc4ODU5MDM4fQ.cwqOr1Amg4fz7eh0IH8yQPDLA5-OGsnGLuuxBsbkRYQ	5cb98619-4fd3-4197-8511-b7285e67f197	166132916	2026-05-14 15:42:31.030187	2026-05-15 15:30:38
d7bb1703-c620-44d1-81c5-5b498d588758	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2I5ODYxOS00ZmQzLTQxOTctODUxMS1iNzI4NWU2N2YxOTciLCJ1c2VybmFtZSI6IjE2NjEzMjkxNiIsIm5vbWJyZSI6IkNhbWlsbyBPdmllZG8iLCJyb2wiOiJvcGVyYWRvciIsImlhdCI6MTc3ODc3MTgyNCwiZXhwIjoxNzc4ODU4MjI0fQ.yzt8FHxHkPmRil61aDyK5N5Rq4bsHwfIn6lUwArC4ps	5cb98619-4fd3-4197-8511-b7285e67f197	166132916	2026-05-14 15:55:45.640186	2026-05-15 15:17:04
ca9bf28c-fe2d-4276-823a-f373e5601ee9	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2I5ODYxOS00ZmQzLTQxOTctODUxMS1iNzI4NWU2N2YxOTciLCJ1c2VybmFtZSI6IjE2NjEzMjkxNiIsIm5vbWJyZSI6IkNhbWlsbyBPdmllZG8iLCJyb2wiOiJvcGVyYWRvciIsImlhdCI6MTc3ODc3NDgzOCwiZXhwIjoxNzc4ODYxMjM4fQ.tEl9-aKK6q0WTqDXgMSo0PMKpZJJwYxUvT8ad1M0eQs	5cb98619-4fd3-4197-8511-b7285e67f197	166132916	2026-05-14 16:12:19.892923	2026-05-15 16:07:18
e58bf0df-f359-4d5d-bc00-6aff01dd852f	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2I5ODYxOS00ZmQzLTQxOTctODUxMS1iNzI4NWU2N2YxOTciLCJ1c2VybmFtZSI6IjE2NjEzMjkxNiIsIm5vbWJyZSI6IkNhbWlsbyBPdmllZG8iLCJyb2wiOiJvcGVyYWRvciIsImlhdCI6MTc3ODc3NDgzOCwiZXhwIjoxNzc4ODYxMjM4fQ.tEl9-aKK6q0WTqDXgMSo0PMKpZJJwYxUvT8ad1M0eQs	5cb98619-4fd3-4197-8511-b7285e67f197	166132916	2026-05-14 16:12:19.912176	2026-05-15 16:07:18
da1d7d3b-79e3-4418-b2d7-f9eb3f2ee2b8	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NzgyMzE0LCJleHAiOjE3Nzg4Njg3MTR9.pvzGS4TVJXix9bsUdeL7Y4s0uQFgoK_GOkJxyGNk-t8	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-14 18:16:55.823085	2026-05-15 18:11:54
86e5e0ed-9c8d-49b1-8d5a-e68a6b04f6f8	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZDAwMzhhMy1iMDJjLTQ5NGQtYTU4OC01ODRmNDNlNDkxZWMiLCJ1c2VybmFtZSI6ImFkbWluIiwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc4NzgyMzE0LCJleHAiOjE3Nzg4Njg3MTR9.pvzGS4TVJXix9bsUdeL7Y4s0uQFgoK_GOkJxyGNk-t8	ad0038a3-b02c-494d-a588-584f43e491ec	admin	2026-05-14 18:16:55.825971	2026-05-15 18:11:54
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.usuarios (id, username, nombre, password, rol, activo, creado, "ultimoAcceso", actualizado, email, telefono, region, provincia, comuna, rut) FROM stdin;
9b31eec0-530f-4827-a214-6bcb31fd7be3	12345678	El Mecas	$2b$10$58QWjSQXu29QL9mG3zunXubSDgOcZbE7Opwo65U229BB9GPW4MQNC	operador	f	2026-04-24 22:32:44.890927	\N	2026-04-29 19:01:03.050139	\N	\N	\N	\N	\N	\N
7b30f312-1a5f-4775-8c4a-b5e9ea8d0b48	12346578	El Mecas	$2b$10$E5LZerT8G3h8767Af9PCdOazLQDJknfuYeMH0csjxImJTkkPAjtmi	operador	f	2026-04-24 22:40:18.713539	\N	2026-04-29 19:01:13.432329	\N	\N	\N	\N	\N	\N
ad0038a3-b02c-494d-a588-584f43e491ec	admin	Administrador	$2b$10$NsKGOrt.pxBtovbtqY2D9.kawyrUtxkE/2yfrjd5pgUeSAcZN2OqS	admin	t	2026-04-24 21:39:07.288206	2026-05-14 18:16:53.619	2026-05-14 18:16:53.661093	\N	\N	\N	\N	\N	\N
5cb98619-4fd3-4197-8511-b7285e67f197	166132916	Camilo Oviedo	$2b$10$D.gp1YzTH/eBGMEGOCtdOeDpn5ZRmwdxSt5kky5x.yhdvOwCxYdZq	operador	t	2026-04-24 22:31:57.798685	2026-05-14 18:45:07.951	2026-05-14 18:45:07.993718	camilooviedo@gmail.com	+56912345678	Biobío	Arauco	Arauco	\N
36fecd5f-dda4-4a18-939d-e12a3931332c	197479817	Felipe Thiele	$2b$10$.lX8.7izrfcabp0DOAmim.g1gz3eHRwshdsfco.FhtcxzOIu6jkFC	analista	t	2026-04-24 22:30:40.424911	2026-04-30 16:45:21.557	2026-04-30 16:45:21.566289	thiele.felipe97@gmail.com	+56973952750	Biobío	Arauco	Contulmo	197479817
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.migrations_id_seq', 10, true);


--
-- Name: audit_logs PK_1bb179d048bbc581caa3b013439; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT "PK_1bb179d048bbc581caa3b013439" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: pacientes PK_aa9c9f624ff22fc06c44d8b1609; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT "PK_aa9c9f624ff22fc06c44d8b1609" PRIMARY KEY (id);


--
-- Name: usuarios PK_d7281c63c176e152e4c531594a8; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY (id);


--
-- Name: tokens_revocados PK_e042245c9e3cb2f20f8118f743c; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tokens_revocados
    ADD CONSTRAINT "PK_e042245c9e3cb2f20f8118f743c" PRIMARY KEY (id);


--
-- Name: usuarios UQ_9f78cfde576fc28f279e2b7a9cb; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT "UQ_9f78cfde576fc28f279e2b7a9cb" UNIQUE (username);


--
-- Name: usuarios usuarios_rut_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_rut_key UNIQUE (rut);


--
-- Name: IDX_9a278775fa19f41e182df84c74; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "IDX_9a278775fa19f41e182df84c74" ON public.tokens_revocados USING btree (token);


--
-- Name: IDX_fd546be48054ccbc0aeaedf2ef; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "IDX_fd546be48054ccbc0aeaedf2ef" ON public.tokens_revocados USING btree ("usuarioId");


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.uuid_generate_v1() TO admin;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.uuid_generate_v1mc() TO admin;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.uuid_generate_v3(namespace uuid, name text) TO admin;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.uuid_generate_v4() TO admin;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.uuid_generate_v5(namespace uuid, name text) TO admin;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.uuid_nil() TO admin;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.uuid_ns_dns() TO admin;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.uuid_ns_oid() TO admin;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.uuid_ns_url() TO admin;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.uuid_ns_x500() TO admin;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO admin;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO admin;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO admin;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO admin;


--
-- PostgreSQL database dump complete
--

\unrestrict 50QyxP6VGGUFvuzfcjMgEWMGEhUFmJsCf71pJH4FhcZm0JzOG56ssZsqk70n7n0

