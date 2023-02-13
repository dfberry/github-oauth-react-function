import { createClient } from 'redis';

// connection string format
// redis[s]://[[username][:password]@][host][:port][/db-number]:

// client configuration
// https://github.com/redis/node-redis/blob/master/docs/client-configuration.md

async function init(config) {
  var client = createClient(6380, 
    config.AZURE_REDIS_CACHE_HOSTNAME, {
        auth_pass: config.AZURE_REDIS_CACHE_KEY,
        tls: {
        servername: config.AZURE_REDIS_CACHE_HOSTNAME,
        },
    }
  );
  return await client.connect();
}
export async function store(client,config) {
    const client = await init(config)
  const val = await client.set(config.name, config.value);
  await client.disconnect();
  return val
}
export async function get(client, config) {
    const client = await init(config)
  const val= await client.get(config.name);
  await client.disconnect();
  return val
}


// export async function store(client,config) {
//   await client.set(config.name, config.value);
// }

