-- migrate:up

CREATE TABLE IF NOT EXISTS "user"(
	"id" UUID DEFAULT GEN_RANDOM_UUID(),
	"name" VARCHAR(100) NOT NULL,
  "email" VARCHAR(100) NOT NULL,
  "phone" VARCHAR(20) NOT NULL,
  "password" VARCHAR(200) NOT NULL,
  "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "pk_user" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "uk_user_email" ON "user" ("email");



CREATE TABLE IF NOT EXISTS "product"(
	"id" UUID DEFAULT GEN_RANDOM_UUID(),
	"userId" UUID NOT NULL,
	"code" VARCHAR(20) NOT NULL,
	"name" VARCHAR(200) NOT NULL,
	"price" NUMERIC(12, 2) NOT NULL,
	"quantity" INTEGER NOT NULL DEFAULT 0,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "pk_product" PRIMARY KEY ("id"),
	CONSTRAINT "fk_product_userId" FOREIGN KEY ("userId") REFERENCES "user" ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "uk_product_name" ON "product" ("name");
CREATE UNIQUE INDEX IF NOT EXISTS "uk_product_code" ON "product" ("code");



CREATE TABLE IF NOT EXISTS "customer"(
	"id" UUID DEFAULT GEN_RANDOM_UUID(),
	"userId" UUID NOT NULL,
	"name" VARCHAR(100) NOT NULL,
	"phone" VARCHAR(20) NOT NULL,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "pk_customer" PRIMARY KEY ("id"),
	CONSTRAINT "fk_customer_userId" FOREIGN KEY ("userId") REFERENCES "user" ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "uk_customer_phone" ON "customer" ("phone");


CREATE TABLE IF NOT EXISTS "bill"(
	"id" UUID DEFAULT GEN_RANDOM_UUID(),
	"userId" UUID NOT NULL,
	"amount" NUMERIC(12, 2) NOT NULL,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "pk_bill" PRIMARY KEY ("id"),
	CONSTRAINT "fk_bill_userId" FOREIGN KEY ("userId") REFERENCES "user" ("id")
);



CREATE TABLE IF NOT EXISTS "billProductMapping"(
	"id" UUID DEFAULT GEN_RANDOM_UUID(),
	"billId" UUID NOT NULL,
	"productId" UUID NOT NULL,
	"quantity" INTEGER NOT NULL DEFAULT 0,
	"price" NUMERIC(12, 2) NOT NULL,
	CONSTRAINT "fk_billProductMapping_billId" FOREIGN KEY ("billId") REFERENCES "bill" ("id"),
	CONSTRAINT "fk_billProductMapping_productId" FOREIGN KEY ("productId") REFERENCES "product" ("id")
);


-- migrate:down

DROP TABLE IF EXISTS "billProductMapping";
DROP TABLE IF EXISTS "bill";
DROP TABLE IF EXISTS "customer";
DROP TABLE IF EXISTS "product";
DROP TABLE IF EXISTS "user";

