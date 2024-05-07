-- migrate:up


ALTER TABLE "product"
ADD COLUMN IF NOT EXISTS "description" VARCHAR(500) NULL;

ALTER TABLE "bill"
ADD COLUMN IF NOT EXISTS "customerId" UUID NOT NULL,
ADD CONSTRAINT "fk_bill_customerId" FOREIGN KEY ("customerId") REFERENCES "customer" ("id");


-- migrate:down

ALTER TABLE "bill" 
DROP CONSTRAINT IF EXISTS "fk_bill_customerId",
DROP COLUMN IF EXISTS "customerId";

ALTER TABLE "product"
DROP COLUMN IF EXISTS "description";

