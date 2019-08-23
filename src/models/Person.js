import Model from './Model';
import models from '../models';
import Planet from './Planet';

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

    static hasMany = [
        'vehicles',
        'starships',
    ]

    constructor(properties) {
        super(properties);
    }

    static hasMany(ForeignModel, options) {
        const { key } = options;
        this[key] = this[key].map(Pk => {
            return ForeignModel.getItem(Pk);
        });
    }

    static belongsTo(ForeignModel, options) {
        const { key } = options;
        this[key] = ForeignModel.getItem(key);
    }

    associated() {
        Person.belongsTo(Planet, {
            key: 'homeworld',
        });
    }

    static build(properties) {
        const me = new Person();
        me.key = properties[Person.primary];
        Person.fields.map(field => {
            me[field] = properties[field];
        });

        me.associated();

        return me;
    }
}

export default Person;