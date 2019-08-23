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
        this.build(targetClass, properties);
    }
}

export default Planet;