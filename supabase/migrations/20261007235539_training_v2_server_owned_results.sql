-- V2: participants may read their own results, but cannot forge scores,
-- certificates, session ownership or their administrator role.
-- Signup remains open; the profile trigger and server service role still write.
REVOKE ALL ON public.profiles, public.training_sessions,
  public.module_progress, public.certificates FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.profiles, public.training_sessions,
  public.module_progress, public.certificates TO authenticated;
GRANT UPDATE (full_name, language) ON public.profiles TO authenticated;
GRANT ALL ON public.profiles, public.training_sessions,
  public.module_progress, public.certificates TO service_role;

DROP POLICY IF EXISTS own_profile ON public.profiles;
DROP POLICY IF EXISTS own_session ON public.training_sessions;
DROP POLICY IF EXISTS own_progress ON public.module_progress;
DROP POLICY IF EXISTS own_certificate ON public.certificates;
DROP POLICY IF EXISTS admin_all_profiles ON public.profiles;
DROP POLICY IF EXISTS admin_all_sessions ON public.training_sessions;
DROP POLICY IF EXISTS admin_all_progress ON public.module_progress;
DROP POLICY IF EXISTS admin_all_certs ON public.certificates;

CREATE POLICY own_profile_read ON public.profiles FOR SELECT TO authenticated
  USING (id = (SELECT auth.uid()));
CREATE POLICY own_profile_preferences ON public.profiles FOR UPDATE TO authenticated
  USING (id = (SELECT auth.uid())) WITH CHECK (id = (SELECT auth.uid()));
CREATE POLICY own_session_read ON public.training_sessions FOR SELECT TO authenticated
  USING (user_id = (SELECT auth.uid()));
CREATE POLICY own_progress_read ON public.module_progress FOR SELECT TO authenticated
  USING (session_id IN (SELECT id FROM public.training_sessions
                       WHERE user_id = (SELECT auth.uid())));
CREATE POLICY own_certificate_read ON public.certificates FOR SELECT TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- Trigger-only functions are not browser-callable RPCs. The triggers keep working.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
DO $migration$
BEGIN
  IF to_regprocedure('public.rls_auto_enable()') IS NOT NULL THEN
    REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;
  END IF;
END;
$migration$;
