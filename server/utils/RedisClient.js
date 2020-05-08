require('dotenv').config();
const redis = require('redis')
var Container = require("typedi").Container;


class RedisInstance {
    constructor() {
        this.port = process.env.PORT || 6379;
    }
    createClient() {
        return redis.createClient(this.port);
    }
}

module.exports = RedisInstance
