const redis = require('redis');

const resourceName = process.env.AZURE_CACHE_FOR_REDIS_RESOURCE_NAME
const resourceKey = process.env.AZURE_CACHE_FOR_REDIS_RESOURCE_KEY

const config = {
    "HOST": `${resourceName}.redis.cache.windows.net`,
    "KEY": `${resourceKey}`,
    "TIMEOUT": 300,
    "KEY_PREFIX": "demoExample:"
}

var cacheHostName = config.HOST;
var cachePassword = config.KEY;
var cacheConnection = redis.createClient({
    // rediss for TLS
    url: "rediss://" + cacheHostName + ":6380",
    password: cachePassword,
});

export async function connect(){
    return await cacheConnection.connect();
}
export async function set(key, value){
    return await cacheConnection.set(key,value)
}
export async function get(key){
    return await cacheConnection.get("Message");
}
