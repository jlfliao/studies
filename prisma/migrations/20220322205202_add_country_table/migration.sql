-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_id_key" ON "Country"("id");
