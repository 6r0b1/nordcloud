/*
  Warnings:

  - You are about to drop the column `best_station` on the `previous_results` table. All the data in the column will be lost.
  - Added the required column `station_x` to the `previous_results` table without a default value. This is not possible if the table is not empty.
  - Added the required column `station_y` to the `previous_results` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "previous_results" DROP COLUMN "best_station",
ADD COLUMN     "station_x" INTEGER NOT NULL,
ADD COLUMN     "station_y" INTEGER NOT NULL;
