import Model from "./Model";

class Planet extends Model {
    static primary = 'url'
    static model_name = 'planets'
    static fields = [
        {
            key: 'name',
        }, {
            key: 'population',
        }, {
            key: 'climate',
        }
    ]

    constructor(properties, targetClass=Planet) {
        super(properties);
    }

    static async build(properties, key=null) {
        const c = new Planet(properties);
        c.key = key || properties[Planet.primary];

        let fieldData = properties;
        if (!properties || !Object.keys(properties).length) {
            fieldData = await this.getItem(c.key);
        }

        Planet.fields.map(({ key, model, hasMany, belongsTo }) => {
            c[key] = fieldData[key];
        });

        return Promise.resolve(c);
    }
}

export default Planet;