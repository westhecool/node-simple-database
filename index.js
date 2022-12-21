const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

async function newDB(directory) {
    if (typeof directory != 'string') throw new Error('Invalid type for "directory"');
    if (!directory) throw new Error('No directory');
    else await fs.promises.mkdir(directory, { recursive: true });
}

function newDBSync(directory) {
    if (typeof directory != 'string') throw new Error('Invalid type for "directory"');
    if (!directory) throw new Error('No directory');
    else fs.mkdirSync(directory, { recursive: true });
}

class simpleDatabase {
    constructor(directory) {
        if (typeof directory != 'string') throw new Error('Invalid type for "directory"');
        if (!directory) throw new Error('No directory');
        this.directory = directory;
        try {
            fs.accessSync(this.directory, fs.constants.R_OK);
            fs.accessSync(this.directory, fs.constants.W_OK);
        } catch (error) {
            throw new Error('Unable to read from and/or write to the database directory');
        }
        if (!fs.lstatSync(this.directory).isDirectory()) throw new Error('The given directory appears not to be a directory');
    }

    isValidKey(key = '') {
        if (!key || key.length > 255) {
            return false;
        }

        if ((/[<>:"/\\|?*\u0000-\u001F]/g).test(key) || (/^(con|prn|aux|nul|com\d|lpt\d)$/i).test(key)) {
            return false;
        }

        if (key === '.' || key === '..') {
            return false;
        }

        return true;
    }

    async get(key = '', config = {}) {
        if (typeof key != 'string') throw new Error('Invalid type for "key"');
        if (typeof config != 'object') throw new Error('Invalid type for "config"');
        if (!this.isValidKey(key)) {
            throw new Error('Invalid key name');
        } else {
            if (config.raw) {
                return await fs.promises.readFile(path.join(this.directory, key));
            } else {
                return JSON.parse(await fs.promises.readFile(path.join(this.directory, key))).data;
            }
        }
    }

    getSync(key = '', config = {}) {
        if (typeof key != 'string') throw new Error('Invalid type for "key"');
        if (typeof config != 'object') throw new Error('Invalid type for "config"');
        if (!this.isValidKey(key)) {
            throw new Error('Invalid key name');
        } else {
            if (config.raw) {
                return fs.readFileSync(path.join(this.directory, key));
            } else {
                return JSON.parse(fs.readFileSync(path.join(this.directory, key))).data;
            }
        }
    }

    async set(key = '', data, config = {}) {
        if (typeof key != 'string') throw new Error('Invalid type for "key"');
        if (typeof config != 'object') throw new Error('Invalid type for "config"');
        if (!this.isValidKey(key)) {
            throw new Error('Invalid key name');
        } else {
            if (config.raw) {
                await fs.promises.writeFile(path.join(this.directory, key), data);
            } else {
                await fs.promises.writeFile(path.join(this.directory, key), JSON.stringify({ data }));
            }
        }
    }

    setSync(key = '', data, config = {}) {
        if (typeof key != 'string') throw new Error('Invalid type for "key"');
        if (typeof config != 'object') throw new Error('Invalid type for "config"');
        if (!this.isValidKey(key)) {
            throw new Error('Invalid key name!');
        } else {
            if (config.raw) {
                fs.writeFileSync(path.join(this.directory, key), data);
            } else {
                fs.writeFileSync(path.join(this.directory, key), JSON.stringify({ data }));
            }
        }
    }

    async listKeys() {
        return await fs.promises.readdir(this.directory);
    }

    listKeysSync() {
        return fs.readdirSync(this.directory);
    }

    async delete(areYouSure = false) {
        if (areYouSure === true) {
            await fs.promises.rm(this.directory, { recursive: true, force: true });
        }
    }

    async deleteSync(areYouSure = false) {
        if (areYouSure === true) {
            fs.rmSync(this.directory, { recursive: true, force: true });
        }
    }

    async empty(areYouSure = false) {
        if (areYouSure === true) {
            await this.delete(true);
            await newDB(this.directory);
        }
    }

    async emptySync(areYouSure = false) {
        if (areYouSure === true) {
            this.deleteSync(true);
            newDBSync(this.directory);
        }
    }
}
module.exports = simpleDatabase;
module.exports.newDB = newDB;
module.exports.newDBSync = newDBSync;