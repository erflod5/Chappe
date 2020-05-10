let keyMongo = {
    server : process.env.DB_SERVER || '3.23.132.171:27017',
    database : process.env.DB_DATABASE || 'uSocial',
    user : process.env.DB_USER || 'erflod1',
    pass : process.env.DB_PASS || 'usocial123'
}

export default keyMongo;
