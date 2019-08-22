import Model from "./Model";

class Vehicle extends Model {
    static primary = 'url'
    static model_name = 'vehicles'
    static fields = [
        'name', // Key
        'model',
        'cost_in_credits',
    ]

    constructor(properties) {
        super(properties);
        this.key = properties[Vehicle.primary];
        Vehicle.fields.map(field => {
            this[field] = properties[field];
        });
    }
}

export default Vehicle;