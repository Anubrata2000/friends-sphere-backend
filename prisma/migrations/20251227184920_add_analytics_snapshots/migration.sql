-- CreateTable
CREATE TABLE "analytics_snapshots" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "active_users" INTEGER NOT NULL,
    "channel_distribution" JSONB NOT NULL,
    "revenue_total" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "analytics_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "analytics_snapshots_timestamp_active_users_idx" ON "analytics_snapshots"("timestamp", "active_users");
