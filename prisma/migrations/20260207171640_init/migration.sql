-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('DANGER', 'DEFAULT');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('Подтвержденно', 'Отклонен');

-- CreateTable
CREATE TABLE "stack_items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image_src" TEXT,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stack_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio_items" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "site_link" TEXT,
    "github_link" TEXT,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "image_sources" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "portfolio_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "description_items" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "min_sum" INTEGER NOT NULL,
    "max_sum" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories_on_services" (
    "id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_on_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "category_name" TEXT NOT NULL,
    "categoryType" "CategoryType" NOT NULL DEFAULT 'DEFAULT',
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "text_review" TEXT NOT NULL,
    "status" "ReviewStatus" NOT NULL DEFAULT 'Отклонен',
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL DEFAULT 'Имя пользователя',
    "last_name" TEXT NOT NULL DEFAULT 'Фамилия пользователя',
    "email" TEXT NOT NULL DEFAULT 'Не указана',
    "phone" TEXT NOT NULL DEFAULT 'Не указан',
    "comment" TEXT NOT NULL DEFAULT 'Комментарий не указан',
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stack_items_name_key" ON "stack_items"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_on_services_service_id_category_id_key" ON "categories_on_services"("service_id", "category_id");

-- AddForeignKey
ALTER TABLE "categories_on_services" ADD CONSTRAINT "categories_on_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories_on_services" ADD CONSTRAINT "categories_on_services_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
