import { Cache, MemoryStorage, FileStorage } from '../Cache';


test('Cache MemoryStorage working', async () => {
    const cache = new Cache(new MemoryStorage());
});

test('Cache FileStorage workout', async () => {
    const cache = new Cache(new FileStorage());
    const storage = await cache.storage.load();
    console.log(storage);
});
