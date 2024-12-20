-- TODO > This allows to enable row level security on your tables.
-- See https://supabase.com/docs/guides/database/postgres/row-level-security#enabling-row-level-security
alter table "public"."projects" enable row level security;
alter table "public"."tasks" enable row level security;
alter table "public"."profiles" enable row level security;

-- TODO > The following create row level access policies to protect the data to
--        viewed or altered from outside.  
-- You can visit this link on your account.
-- Replace {project_id} and {table_id} with your account's data.
-- https://supabase.com/dashboard/project/{project_id}/auth/policies?search={table_id}&schema=public
create policy "Enable read access for authenticated users only"
on "public"."projects"
as PERMISSIVE
for SELECT
to authenticated
using (true);

create policy "Enable insert access for authenticated users only"
on "public"."projects"
as PERMISSIVE
for INSERT
to authenticated
with check (true);

create policy "Enable update access for authenticated users only"
on "public"."projects"
as PERMISSIVE
for UPDATE
to authenticated
using (true)
with check (true);

create policy "Enable delete access for authenticated users only"
on "public"."projects"
as PERMISSIVE
for DELETE
to authenticated
using (true);

create policy "Enable read access for authenticated users only"
on "public"."tasks"
as PERMISSIVE
for SELECT
to authenticated
using (true);

create policy "Enable insert access for authenticated users only"
on "public"."tasks"
as PERMISSIVE
for INSERT
to authenticated
with check (true);

create policy "Enable update access for authenticated users only"
on "public"."tasks"
as PERMISSIVE
for UPDATE
to authenticated
using (true)
with check (true);

create policy "Enable delete access for authenticated users only"
on "public"."tasks"
as PERMISSIVE
for DELETE
to authenticated
using (true);

create policy "Enable read access for authenticated users only"
on "public"."profiles"
as PERMISSIVE
for SELECT
to authenticated
using (true);


create policy "Enable insert access for authenticated users only"
on "public"."profiles"
as PERMISSIVE
for INSERT
to authenticated
with check (true);
