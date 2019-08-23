import Model from "./Model";

class Vehicle extends Model {
    static primary = 'url'
    static model_name = 'vehicles'
    static fields = [
        {
            key: 'name',
        }, {
            key: 'model',
        }, {
            key: 'cost_in_credits',
        }
    ]

    constructor(properties, targetClass=Vehicle) {
        super(properties);
        this.build(targetClass, properties);
    }
}

export default Vehicle;