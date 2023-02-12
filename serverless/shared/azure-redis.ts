import { createClient } from 'redis';

// async function init(connect) {
//   var client = createClient(6380, 
//     config.AZURE_REDIS_CACHE_HOSTNAME, {
//         auth_pass: config.AZURE_REDIS_CACHE_KEY,
//         tls: {
//         servername: config.AZURE_REDIS_CACHE_HOSTNAME,
//         },
//     }
//   );
//   return await client.connect();
// }
// export async function store(client,config) {
//     const client = await init(config)
//   const val = await client.set(config.name, config.value);
//   await client.disconnect();
//   return val
// }
// export async function get(client, config) {
//     const client = await init(config)
//   const val= await client.get(config.name);
//   await client.disconnect();
//   return val
// }
