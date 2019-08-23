import Model from './Model';
import Planet from './Planet';
import Vehicle from './Vehicle';
import StarShip from './StarShip';

class Person extends Model {
    static primary = 'url';
    static model_name = 'people'
    static fields = [
        {
            key: 'name',
        }, {
            key: 'gender',
        }, {
            key: 'homeworld',
            model: Planet,
            belongsTo: true,
        }, {
            key: 'vehicles',
            model: Vehicle,
            hasMany: true,
        }, {
            key: 'starships',
            model: StarShip,
            hasMany: true,
        },
    ]

    constructor(properties, targetClass=Person) {
        super(properties);
        this.build(targetClass, properties);
    }
}

export default Person;