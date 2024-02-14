import Monster from "../models/monster.model.js";

export const getMonstersFromRepository = async (query) => {
    try {
        const monsters = await Monster.find(query);
        return monsters;
    } catch (e) {
        throw Error("Error while fetching monsters");
    }
}

export const updateMonstersInRepository = async (query, update) => {
    try {
        const monster = await Monster.findOneAndUpdate(
            { ...query },
            { ...update },
            { new: true }
        ).lean();
        return monster;
    } catch (e) {
        if(!("name" in payload && "image_url" in payload && "id" in payload)){
            throw Error("Required fields (name, image_url, id) are empty");
        }

        throw Error("Error while updating monster");
    }
}

export const deleteMonsterFromRepository = async (query) => {
    try {
        const monster = await Monster.findOneAndDelete({ ...query });
        return monster;
    } catch (e) {
        throw Error("Error while deleting a monster");
    }
}

export const createMonstersInRepository = async (payload) => {
    try {
        const monsters = await Monster.find({});
        const lastmonster = monsters[monsters.length-1];
        const id = lastmonster["id"] + 1;
        payload["id"]= id;
        payload["image_url"] = `https://robohash.org/${id}?set=set2&size =15x15`;
        const newMonster = new Monster(payload);
        const savedMonster = await newMonster.save();
        return savedMonster;
        
    } catch (e) {
        if(!("name" in payload && "image_url" in payload && "id" in payload)){
            throw Error("Required field (name) is empty");
        }

        throw Error("Error while creating a monster");
    }
}