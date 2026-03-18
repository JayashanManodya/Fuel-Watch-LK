CREATE TABLE "fuel_updates" (
	"id" serial PRIMARY KEY NOT NULL,
	"station_id" integer,
	"user_name" varchar(255),
	"message" text,
	"status" varchar(50),
	"petrol92" varchar(50),
	"petrol95" varchar(50),
	"diesel" varchar(50),
	"kerosene" varchar(50),
	"queue_length" integer,
	"waiting_time" integer,
	"timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "stations" (
	"id" serial PRIMARY KEY NOT NULL,
	"osm_id" varchar(50),
	"name" varchar(255) NOT NULL,
	"name_si" varchar(255),
	"name_ta" varchar(255),
	"lat" double precision,
	"lng" double precision,
	"address" varchar(255),
	"address_si" varchar(255),
	"address_ta" varchar(255),
	"status" varchar(50) DEFAULT 'available',
	"petrol_92_status" varchar(50) DEFAULT 'not-available',
	"petrol_95_status" varchar(50) DEFAULT 'not-available',
	"diesel_status" varchar(50) DEFAULT 'not-available',
	"kerosene_status" varchar(50) DEFAULT 'not-available',
	"queue_length" integer DEFAULT 0,
	"waiting_time" integer DEFAULT 0,
	"last_updated" timestamp DEFAULT now(),
	CONSTRAINT "stations_osm_id_unique" UNIQUE("osm_id")
);
--> statement-breakpoint
ALTER TABLE "fuel_updates" ADD CONSTRAINT "fuel_updates_station_id_stations_id_fk" FOREIGN KEY ("station_id") REFERENCES "public"."stations"("id") ON DELETE no action ON UPDATE no action;