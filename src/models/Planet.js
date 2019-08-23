import Model from './Model';

class Planet extends Model {
    static primary = 'url'
    static model_name = 'planets'
    static fields = [
        'name', // Key
        'population',
        'climate',
    ]

    constructor(properties) {
        super(properties);
    }

    static build(properties) {
        const me = new Planet();
        me.key = properties[Planet.primary];
        Planet.fields.map(field => {
            me[field] = properties[field];
        });

        return me;
    }
}

export default Planet;