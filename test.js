const simpleDatabase = require('.');
(async () => {
    await simpleDatabase.newDB('db');
    const db = new simpleDatabase('db');
    await db.set('key', 'value');
    console.log(await db.get('key'));
    await db.set('raw', Buffer.from('raw data'), { raw: true });
    console.log(await db.get('raw', { raw: true }));
    console.log(await db.listKeys());
    await db.empty(true);
    console.log(await db.listKeys());
    await db.delete(true);
})();