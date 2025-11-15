CREATE TABLE "conversations" (
	"id" serial PRIMARY KEY NOT NULL,
	"conversation_id" varchar(255) NOT NULL,
	"agent_id" varchar(255) NOT NULL,
	"user_id" varchar(255),
	"status" varchar(50),
	"start_time" timestamp,
	"call_duration_seconds" integer,
	"cost" numeric(10, 6),
	"transcript" jsonb,
	"analysis" jsonb,
	"metadata" jsonb,
	"conversation_initiation_data" jsonb,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "conversations_conversation_id_unique" UNIQUE("conversation_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"role" varchar(50) DEFAULT 'student',
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
