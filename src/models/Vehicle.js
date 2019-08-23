import Model from "./Model";

class Vehicle extends Model {
    static primary = 'url'
    static model_name = 'vehicles'
    static fields = [
        'name', // Key
        'model',
        'cost_in_credits',
    ]

    static async build(properties) {
        const me = new Vehicle();
        me.key = properties[Vehicle.primary];
        Vehicle.fields.map(field => {
            me[field] = properties[field];
        });

        return me;
    }
}

export default Vehicle;