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
    constructor(properties) {
        super();
        this.key = properties[StarShip.primary];
        StarShip.fields.map(field => {
            this[field] = properties[field];
        });
    }
}

export default StarShip;