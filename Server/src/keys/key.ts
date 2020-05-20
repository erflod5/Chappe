let keyMongo = {
    server : process.env.DB_SERVER || '',
    database : process.env.DB_DATABASE || '',
    user : process.env.DB_USER || '',
    pass : process.env.DB_PASS || ''
}

export default keyMongo;
