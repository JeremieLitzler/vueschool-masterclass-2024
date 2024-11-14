// to internationlize the faked data, use the XX_ZZ local
// and import fake like the comment below
// import { fakerFR_BE as faker } from '@faker-js/faker'
import { faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

console.log(import.meta.env)
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_PROJECT_SERVICE_ROLE

console.log('supabaseUrl', supabaseUrl)
console.log('supabaseKey', supabaseKey)
const supabase = createClient(supabaseUrl, supabaseKey)

const seedProjects = async (numEntries = 10) => {
  const projects = []
  for (let index = 0; index < numEntries; index++) {
    const name = faker.lorem.words(3)
    const newProject = {
      name,
      slug: name.toLocaleLowerCase().replace(/ /g, '-'),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([1, 2, 3]),
    }
    projects.push(newProject)
  }

  await supabase.from('projects').insert(projects)
}

await seedProjects()
