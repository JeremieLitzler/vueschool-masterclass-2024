drop table if exists tasks;

create table 
  tasks (
    id bigint primary key generated always as identity not null,
    created_at timestamptz default now() not null,
    updated_at timestamptz null,
    name text not null,
    status current_status default 'todo' not null,
    description text not null,
    due_date date default null,
    profile_id uuid references profiles (id) on delete cascade not null,
    project_id bigint references projects (id) on delete cascade default null,
    collaborators text array default array[]::varchar[] not null
  );