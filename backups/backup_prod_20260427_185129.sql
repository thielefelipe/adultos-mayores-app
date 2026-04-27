--
-- PostgreSQL database dump
--

\restrict zubtqhTwnnIdT2wISunCS4ccYY0xapfIVZxYfZozuCosVgtCqfXP6eZ6fgktjWC

-- Dumped from database version 18.3 (Debian 18.3-1.pgdg12+1)
-- Dumped by pg_dump version 18.3 (Debian 18.3-1.pgdg13+1)

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
    "fechaEliminacion" timestamp without time zone
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
\.


--
-- Data for Name: pacientes; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pacientes (id, rut, dv, nombre, sexo, edad, telefono, escolaridad, pueblo, rsh, f_ingreso, f_consentimiento, f_egreso, naturaleza, comuna, rural, dependencia, enfermedades, pai, obj_pai, obj_alc, talleres, barthel1, pfeiffer1, lawton1, tug1, mini1, yesa1, eq1, barthel2, pfeiffer2, lawton2, tug2, mini2, yesa2, eq2, t1_fecha, t1_punt, t1_barthel, t1_mini, t2_fecha, t2_punt, t2_barthel, t2_mini, t3_fecha, t3_punt, t3_barthel, t3_mini, t4_fecha, t4_punt, t4_barthel, t4_mini, notas, plan, "creadoPor", "fechaRegistro", "modificadoPor", "modificadoEn", eliminado, "fechaEliminacion") FROM stdin;
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
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.usuarios (id, username, nombre, password, rol, activo, creado, "ultimoAcceso", actualizado, email, telefono, region, provincia, comuna, rut) FROM stdin;
5cb98619-4fd3-4197-8511-b7285e67f197	166132916	Camilo Oviedo	$2b$10$D.gp1YzTH/eBGMEGOCtdOeDpn5ZRmwdxSt5kky5x.yhdvOwCxYdZq	operador	t	2026-04-24 22:31:57.798685	\N	2026-04-27 02:34:57.834745	camilooviedo@gmail.com	+56912345678	Biobío	Arauco	Contulmo	\N
9b31eec0-530f-4827-a214-6bcb31fd7be3	12345678	El Mecas	$2b$10$58QWjSQXu29QL9mG3zunXubSDgOcZbE7Opwo65U229BB9GPW4MQNC	operador	f	2026-04-24 22:32:44.890927	\N	2026-04-24 22:38:35.411922	\N	\N	\N	\N	\N	\N
7b30f312-1a5f-4775-8c4a-b5e9ea8d0b48	12346578	El Mecas	$2b$10$E5LZerT8G3h8767Af9PCdOazLQDJknfuYeMH0csjxImJTkkPAjtmi	operador	f	2026-04-24 22:40:18.713539	\N	2026-04-24 22:52:43.626061	\N	\N	\N	\N	\N	\N
36fecd5f-dda4-4a18-939d-e12a3931332c	197479817	Felipe Thiele	$2b$10$.lX8.7izrfcabp0DOAmim.g1gz3eHRwshdsfco.FhtcxzOIu6jkFC	analista	t	2026-04-24 22:30:40.424911	2026-04-25 21:51:37.09	2026-04-25 21:51:37.180389	\N	\N	\N	\N	\N	\N
ad0038a3-b02c-494d-a588-584f43e491ec	admin	Administrador	$2b$10$dhMQtGBa7l.Lpyq0ZwyI1u9lJV0qwYxta5GfBq5ifH.f4V3S.BvxO	admin	t	2026-04-24 21:39:07.288206	2026-04-27 12:52:05.153	2026-04-27 12:52:05.175926	\N	\N	\N	\N	\N	\N
\.


--
-- Name: audit_logs PK_1bb179d048bbc581caa3b013439; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT "PK_1bb179d048bbc581caa3b013439" PRIMARY KEY (id);


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
-- Name: usuarios UQ_9e90b993976dcd8bdabf4e3159d; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT "UQ_9e90b993976dcd8bdabf4e3159d" UNIQUE (rut);


--
-- Name: usuarios UQ_9f78cfde576fc28f279e2b7a9cb; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT "UQ_9f78cfde576fc28f279e2b7a9cb" UNIQUE (username);


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

\unrestrict zubtqhTwnnIdT2wISunCS4ccYY0xapfIVZxYfZozuCosVgtCqfXP6eZ6fgktjWC

