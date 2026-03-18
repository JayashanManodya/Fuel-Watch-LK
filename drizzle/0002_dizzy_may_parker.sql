CREATE TABLE "station_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar(50) NOT NULL,
	"station_id" integer,
	"name" varchar(255),
	"name_si" varchar(255),
	"name_ta" varchar(255),
	"lat" double precision,
	"lng" double precision,
	"address" varchar(255),
	"address_si" varchar(255),
	"address_ta" varchar(255),
	"station_code" varchar(50),
	"message" text,
	"status" varchar(50) DEFAULT 'pending',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "station_requests" ADD CONSTRAINT "station_requests_station_id_stations_id_fk" FOREIGN KEY ("station_id") REFERENCES "public"."stations"("id") ON DELETE no action ON UPDATE no action;