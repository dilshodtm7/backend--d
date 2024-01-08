import pg from 'pg'
import dotenv from 'dotenv'


export class PostgresModel {
    #pg

    constructor() {
        this.#pg = new pg.Pool({
            connectionString:'postgres://gpezfzcr:T-C1930x0m0LGVXLnm0MpJe0BfsoS0a_@satao.db.elephantsql.com/gpezfzcr'
            
        })
    }

    async fetch(SQL, ...params) {
        const client = await this.#pg.connect()
        try {
            const { rows } = await client.query(SQL, params.length ? params : null)
            return rows
        } catch(err) {
            console.log(err)
        } finally {
            client.release()
        }
    }
}
