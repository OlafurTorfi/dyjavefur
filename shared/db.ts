import { QueryResult } from 'pg'

export interface DB {
    query: () => Promise<QueryResult>
}