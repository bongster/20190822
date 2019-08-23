import Model from "./Model";

class StarShip extends Model {
    static primary = 'url'
    static model_name = 'starships'
    static fields = [
        'name', // Key
        'model',
        'starship_class',
        'hyperdrive_rating',
        'cost_in_credits',
        'manufacturer',
    ]

    static async build(properties) {
        const me = new StarShip();
        me.key = properties[StarShip.primary];
        StarShip.fields.map(field => {
            me[field] = properties[field];
        });

        return me;
    }
}

export default StarShip;