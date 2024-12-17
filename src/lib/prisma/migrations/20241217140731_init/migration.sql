-- DropEnum
-- DROP TYPE "crdb_internal_region";

-- CreateTable
CREATE TABLE "User" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "username" STRING NOT NULL,
    "password" STRING NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");