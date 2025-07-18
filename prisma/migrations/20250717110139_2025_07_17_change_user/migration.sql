-- DropForeignKey
-- ALTER TABLE "user" DROP CONSTRAINT "user_supervisor_id_fkey";

DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'user_supervisor_id_fkey' 
        AND table_name = 'user'
    ) THEN
        ALTER TABLE "user" DROP CONSTRAINT "user_supervisor_id_fkey";
    END IF;
END $$;

