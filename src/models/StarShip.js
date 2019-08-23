import Model from "./Model";

class StarShip extends Model {
    static primary = 'url'
    static model_name = 'starships'
    static fields = [
        {
            key: 'name',
        }, {
            key: 'model',
        }, {
            key: 'starship_class',
        }, {
            key: 'hyperdrive_rating',
        }, {
            key: 'cost_in_credits',
        }, {
            key: 'manufacturer',
        }
    ]

    static async build(properties, key=null) {
        const p = new StarShip(properties);
        p.key = key || properties[StarShip.primary];

        let fieldData = properties;
        if (!properties || !Object.keys(properties).length) {
            fieldData = await this.getItem(p.key);
        }

        StarShip.fields.map(async ({ key, model, hasMany, belongsTo }) => {
            if (model && belongsTo) {
                p[key] = await model.build({}, fieldData[key]);
            } else {
                p[key] = fieldData[key];
            }
        });
        return Promise.resolve(p);
    }
}

export default StarShip;