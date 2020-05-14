const typeorm = require('typeorm')

class Creator {
    constructor(id, name, img, ytURL, subscribers){
        this.id = id;
        this.name = name;
        this.img = img;
        this.ytURL = ytURL;
        this.subscribers = subscribers
    }
}

const EntitySchema = require("typeorm").EntitySchema;

const CreatorSchema = new EntitySchema({
    name: "Creator",
    target: Creator,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        img: {
            type: "text"
        },
        ytURL: {
            type: "text"
        },
        subscribers: {
            type:"text"
        }
    }
});

async function getConnection(){
    return await typeorm.createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: "webscrapapp",
        synchronize: true,
        logging: false,
        entities: [
            CreatorSchema
        ]
    })
}

async function getAllCreators(){
    const connection = await getConnection();
    const creatorRepo = connection.getRepository(Creator);
    const creators = await creatorRepo.find();
    connection.close();
    return creators;
}

async function insertCreator(name, img, ytURL, subscribers){
    const connection = await getConnection();

    const creator = new Creator();
    creator.name = name;
    creator.img = img;
    creator.ytURL = ytURL;
    creator.subscribers = subscribers;

    const creatorRepo = connection.getRepository(Creator);
    const res = await creatorRepo.save(creator)
    console.log('saved', img)

    const allCreators = await creatorRepo.find();
    connection.close();
    return allCreators;
}

module.exports = {
    getAllCreators,
    insertCreator
}