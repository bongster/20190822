import Model from './Model';
import Planet from './Planet';
import Vehicle from './Vehicle';
import StarShip from './StarShip';

class Person extends Model {
    static primary = 'url';
    static model_name = 'people'
    static fields = [
        {
            key: 'name',
        }, {
            key: 'gender',
        }, {
            key: 'homeworld',
            model: Planet,
            belongsTo: true,
        }, {
            key: 'vehicles',
            model: Vehicle,
            // hasMany: true,
        }, {
            key: 'starships',
            model: StarShip,
            hasMany: true,
        },
    ]

    static async build(properties, key=null) {
        const p = new Person(properties);
        p.key = key || properties[Person.primary];

        let fieldData = properties;
        if (!properties || !Object.keys(properties).length) {
            fieldData = await this.getItem(p.key);
        }

        Person.fields.map(async ({ key, model, hasMany, belongsTo }) => {
            if (model && belongsTo) {
                p[key] = await model.build({}, fieldData[key]);
            } else if (model && hasMany) {
                p[key] = await Promise.all(fieldData[key].map(async key => await model.build({}, key)));
            }
            else {
                p[key] = fieldData[key];
            }
        });
        return Promise.resolve(p);
    }
}

export default Person;