# To use the aliases below, make sure to run `source .bashrc`
#
# Then use these aliases:
alias sb='source .bashrc'
alias sp-init='supabase init'
alias sp-login='supabase login'
alias sp-link-env='source .env && echo "linking to $SUPABASE_PROJECT_ID ... using password=$SUPABASE_PROJECT_PASSWORD" && supabase link --project-ref $SUPABASE_PROJECT_ID'
alias sp-gen-types='source .env && supabase gen types --lang=typescript --project-id "$SUPABASE_PROJECT_ID" --schema public > src/types/database.types.ts'
alias sp-db-mnew='supabase migration new $1'
alias sp-db-mup='supabase migration up --linked'
alias sp-db-reset='supabase db reset --linked'
alias sp-db-seed='node --env-file=.env database/sedding.js'
alias sp-db-rs='sp-db-reset && node --env-file=.env database/sedding.js'
alias node-env-debug='source .env && node -e "console.log(true)"'
alias debug-alias='/usr/bin/echo "test"'
alias ui-add='npx shadcn-vue@latest add'
alias git-ac='git ac $1'
alias git-a='git add $1'
alias git-c='git commit -m $1'
alias git-d='git pull'
alias git-u='git push'
alias git-nb='git cb $1'
alias git-pb='git ct origin/$1'
alias git-rb='git c main && git branch -D $1'