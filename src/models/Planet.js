import Model from "./Model";

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
        this.key = properties[Planet.primary];
        Planet.fields.map(field => {
            this[field] = properties[field];
        });
    }

    associated() {

    };

    static build(properties) {
        const me = new Person();
        me.key = properties[Planet.primary];
        Planet.fields.map(field => {
            me[field] = properties[field];
        });

        me.associated();

        return me;
    }
}

export default Planet;