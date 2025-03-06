import pg from 'pg';

const { Client } = pg;
const client = new Client({
	user: 'postgres',
	password: 'postgres',
	host: 'host',
	port: '5432',
	database: 'city',
});

export default client;