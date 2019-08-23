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
    constructor(properties, targetClass=StarShip) {
        super(properties);
        this.build(targetClass, properties);
    }
}

export default StarShip;