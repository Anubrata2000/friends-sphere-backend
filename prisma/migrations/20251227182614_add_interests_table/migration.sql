-- CreateTable
CREATE TABLE "Interest" (
    "id" SERIAL NOT NULL,
    "tag_name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Interest_user_id_tag_name_key" ON "Interest"("user_id", "tag_name");

-- AddForeignKey
ALTER TABLE "Interest" ADD CONSTRAINT "Interest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
