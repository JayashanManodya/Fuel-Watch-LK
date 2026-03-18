ALTER TABLE "stations" ADD COLUMN "station_code" varchar(50);--> statement-breakpoint
ALTER TABLE "stations" ADD CONSTRAINT "stations_station_code_unique" UNIQUE("station_code");