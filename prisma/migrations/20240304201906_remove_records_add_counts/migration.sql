/*
  Warnings:

  - You are about to drop the `Records` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Records";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Counts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT NOT NULL,
    "count" INTEGER NOT NULL
);
