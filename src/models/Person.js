import Model from './Model';
import models from '../models';
import Planet from './Planet';
import StarShip from './StarShip';
import Vehicle from './Vehicle';

class Person extends Model {
    static primary = 'url';
    static model_name = 'people'
    static fields = [
        'name',
        'gender',
        'homeworld',
        'vehicles',
        'starships',
    ]

    constructor(properties) {
        super(properties);
    }

    async hasMany(ForeignModel, options) {
        const { key } = options;
        this[key] = await Promise.all(this[key].map(async Pk => {
            return await ForeignModel.getItem(Pk);
        }));
    }

    async belongsTo(ForeignModel, options) {
        const { key } = options;
        const relatedData = await ForeignModel.getItem(this[key]);
        this[key] = relatedData;
    }

    async associated() {
        await this.belongsTo(Planet, {
            key: 'homeworld',
        });

        await this.hasMany(StarShip, {
            key: 'starships',
        });

        await this.hasMany(Vehicle, {
            key: 'vehicles',
        });
    }

    static async build(properties) {
        const me = new Person();
        me.key = properties[Person.primary];
        Person.fields.map(field => {
            me[field] = properties[field];
        });

        await me.associated();

        return me;
    }
}

export default Person;