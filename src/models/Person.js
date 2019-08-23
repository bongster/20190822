import Model from './Model';

class Person extends Model {
    static primary = 'url';
    static model_name = 'people'
    static fields = [
        'name',
        'gender',
        'homeworld',
        'vehicles',
        'starships',
    ]

    constructor(properties) {
        super(properties);
        this.key = properties[Person.primary];
        Person.fields.map(field => {
            this[field] = properties[field];
        });
    }
}

export default Person;