
-- Lock down has_role: only callable internally (used by RLS policies)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;

-- Replace permissive insert policy with minimal validation
DROP POLICY "Anyone can insert leads" ON public.leads;

CREATE POLICY "Anyone can submit a lead"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    (phone IS NOT NULL AND length(phone) > 0)
    OR (email IS NOT NULL AND length(email) > 0)
    OR source <> 'lead_form'
  );
