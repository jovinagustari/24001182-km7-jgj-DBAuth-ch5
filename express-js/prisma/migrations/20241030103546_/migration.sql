-- CreateTable
CREATE TABLE "car_models" (
    "id" BIGSERIAL NOT NULL,
    "model_name" VARCHAR(255) NOT NULL,
    "manufacturer" VARCHAR(255) NOT NULL,
    "transmission" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "car_type_id" BIGINT NOT NULL,
    "specs" JSON,
    "options" JSON,

    CONSTRAINT "car_models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car_types" (
    "id" BIGSERIAL NOT NULL,
    "body_style" VARCHAR(255) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "fuel_type" VARCHAR(255) NOT NULL,

    CONSTRAINT "car_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars" (
    "id" BIGSERIAL NOT NULL,
    "plate" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255),
    "rentPerDay" INTEGER NOT NULL,
    "availableAt" TIMESTAMPTZ(6) NOT NULL,
    "available" BOOLEAN NOT NULL,
    "year" INTEGER NOT NULL,
    "car_model_id" BIGINT NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "profile_picture" VARCHAR,
    "role_id" INTEGER DEFAULT 2,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "car_models" ADD CONSTRAINT "fk_car_types" FOREIGN KEY ("car_type_id") REFERENCES "car_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "fk_car_models" FOREIGN KEY ("car_model_id") REFERENCES "car_models"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
