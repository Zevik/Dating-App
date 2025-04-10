-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "birth_date" DATE NOT NULL,
    "gender" TEXT,
    "looking_for_gender" TEXT[],
    "relationship_type" TEXT[],
    "city" TEXT,
    "bio" TEXT,
    "profile_image_url" TEXT,
    "additional_photos" JSONB,
    "preferred_age_min" INTEGER NOT NULL DEFAULT 18,
    "preferred_age_max" INTEGER NOT NULL DEFAULT 99,
    "preferred_distance_km" INTEGER NOT NULL DEFAULT 50,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_paid" BOOLEAN NOT NULL DEFAULT false,
    "paid_until" TIMESTAMPTZ(3),
    "verified_email" BOOLEAN NOT NULL DEFAULT false,
    "consents" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_active_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" SERIAL NOT NULL,
    "from_user_id" INTEGER NOT NULL,
    "to_user_id" INTEGER NOT NULL,
    "is_like" BOOLEAN NOT NULL,
    "timestamp" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matches" (
    "id" SERIAL NOT NULL,
    "user1_id" INTEGER NOT NULL,
    "user2_id" INTEGER NOT NULL,
    "matched_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "closed_at" TIMESTAMPTZ(3),
    "close_reason" TEXT,
    "default_voice_call_duration_sec" INTEGER NOT NULL DEFAULT 300,
    "default_video_call_duration_sec" INTEGER NOT NULL DEFAULT 300,
    "last_interaction_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "match_inactivity_timeout_interval" TEXT NOT NULL DEFAULT '14 days',

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calls" (
    "id" BIGSERIAL NOT NULL,
    "match_id" INTEGER NOT NULL,
    "call_segment_uuid" UUID NOT NULL,
    "previous_call_segment_uuid" UUID,
    "initiator_user_id" INTEGER NOT NULL,
    "receiver_user_id" INTEGER NOT NULL,
    "call_type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "start_time" TIMESTAMPTZ(3),
    "end_time" TIMESTAMPTZ(3),
    "duration_seconds" INTEGER,
    "end_reason" TEXT,
    "initiated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "calls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" SERIAL NOT NULL,
    "reporter_id" INTEGER,
    "reported_id" INTEGER NOT NULL,
    "match_id" INTEGER,
    "call_segment_uuid" UUID,
    "reason" TEXT NOT NULL,
    "details" TEXT,
    "timestamp" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'Open',
    "admin_notes" TEXT,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blocks" (
    "id" SERIAL NOT NULL,
    "blocker_id" INTEGER NOT NULL,
    "blocked_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blocks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_last_active_at_idx" ON "users"("last_active_at");

-- CreateIndex
CREATE INDEX "likes_to_user_id_from_user_id_is_like_idx" ON "likes"("to_user_id", "from_user_id", "is_like");

-- CreateIndex
CREATE UNIQUE INDEX "likes_from_user_id_to_user_id_key" ON "likes"("from_user_id", "to_user_id");

-- CreateIndex
CREATE INDEX "matches_user1_id_is_active_idx" ON "matches"("user1_id", "is_active");

-- CreateIndex
CREATE INDEX "matches_user2_id_is_active_idx" ON "matches"("user2_id", "is_active");

-- CreateIndex
CREATE INDEX "matches_is_active_last_interaction_at_idx" ON "matches"("is_active", "last_interaction_at");

-- CreateIndex
CREATE UNIQUE INDEX "calls_call_segment_uuid_key" ON "calls"("call_segment_uuid");

-- CreateIndex
CREATE INDEX "calls_match_id_initiated_at_idx" ON "calls"("match_id", "initiated_at" DESC);

-- CreateIndex
CREATE INDEX "calls_initiator_user_id_idx" ON "calls"("initiator_user_id");

-- CreateIndex
CREATE INDEX "calls_receiver_user_id_idx" ON "calls"("receiver_user_id");

-- CreateIndex
CREATE INDEX "calls_previous_call_segment_uuid_idx" ON "calls"("previous_call_segment_uuid");

-- CreateIndex
CREATE INDEX "reports_reported_id_idx" ON "reports"("reported_id");

-- CreateIndex
CREATE INDEX "reports_status_idx" ON "reports"("status");

-- CreateIndex
CREATE INDEX "reports_timestamp_idx" ON "reports"("timestamp");

-- CreateIndex
CREATE INDEX "blocks_blocked_id_idx" ON "blocks"("blocked_id");

-- CreateIndex
CREATE UNIQUE INDEX "blocks_blocker_id_blocked_id_key" ON "blocks"("blocker_id", "blocked_id");

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_from_user_id_fkey" FOREIGN KEY ("from_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_to_user_id_fkey" FOREIGN KEY ("to_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_user1_id_fkey" FOREIGN KEY ("user1_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_user2_id_fkey" FOREIGN KEY ("user2_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calls" ADD CONSTRAINT "calls_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calls" ADD CONSTRAINT "calls_initiator_user_id_fkey" FOREIGN KEY ("initiator_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calls" ADD CONSTRAINT "calls_receiver_user_id_fkey" FOREIGN KEY ("receiver_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_reported_id_fkey" FOREIGN KEY ("reported_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blocks" ADD CONSTRAINT "blocks_blocker_id_fkey" FOREIGN KEY ("blocker_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blocks" ADD CONSTRAINT "blocks_blocked_id_fkey" FOREIGN KEY ("blocked_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
