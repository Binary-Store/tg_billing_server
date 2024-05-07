-- migrate:up

ALTER TABLE "product"
ADD COLUMN IF NOT EXISTS "description" VARCHAR(500) NULL;

-- migrate:down

ALTER TABLE "product"
DROP COLUMN IF EXISTS "description";