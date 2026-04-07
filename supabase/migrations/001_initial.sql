-- Profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'trainee', -- 'trainee' | 'admin'
  language TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- One active training session per user
CREATE TABLE training_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  language TEXT NOT NULL DEFAULT 'en',
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id)
);

-- One row per module per session
CREATE TABLE module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES training_sessions(id) ON DELETE CASCADE,
  module_index INTEGER NOT NULL CHECK (module_index BETWEEN 0 AND 5),
  module_label TEXT NOT NULL,
  best_score INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL,
  passed BOOLEAN NOT NULL DEFAULT false,
  attempts INTEGER NOT NULL DEFAULT 0,
  last_attempted_at TIMESTAMPTZ DEFAULT now(),
  passed_at TIMESTAMPTZ,
  UNIQUE(session_id, module_index)
);

-- Certificate issued when all 6 modules passed
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES training_sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  participant_name TEXT NOT NULL,
  overall_score INTEGER NOT NULL,
  overall_total INTEGER NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  issued_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(session_id)
);

-- RLS POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Users see only their own data
CREATE POLICY "own_profile" ON profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "own_session" ON training_sessions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "own_progress" ON module_progress
  FOR ALL USING (
    session_id IN (
      SELECT id FROM training_sessions WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "own_certificate" ON certificates
  FOR ALL USING (auth.uid() = user_id);

-- Admins see everything
CREATE POLICY "admin_all_profiles" ON profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "admin_all_sessions" ON training_sessions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "admin_all_progress" ON module_progress
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "admin_all_certs" ON certificates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', '')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
