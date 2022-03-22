-- CreateTable
CREATE TABLE "Study" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "conditions" TEXT,
    "url" TEXT,
    "locations" TEXT,
    "tnterventions" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Study_id_key" ON "Study"("id");
