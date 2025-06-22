import 'dotenv/config'
import {defineConfig} from 'drizzle-kit'

const url = process.env.DATABASE_URL!
export default defineConfig({
    out:'./migrations',
    dialect:'postgresql',
    schema:'./src/models/schema',
    dbCredentials:{
        url
    }
})
