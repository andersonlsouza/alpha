class Validator {
    constructor( public data: any ) {
        this.data = data;        
    }
}

class StringValidator extends Validator {
    constructor(data: any) {
        if (typeof data !== "string") {
            throw new Error("O tipo está errado");          
        }
        super(data);
    }
}

class NumberValidator extends Validator {
    constructor(data: any) {
        if (typeof data !== "string") {
            throw new Error("O tipo está errado");          
        }
        super(data);
    }
}

class BooleanValidator extends Validator {
    constructor(data: any) {
        if (typeof data !== "string") {
            throw new Error("O tipo está errado");          
        }
        super(data);
    }
}

try {
    const stringValidator = new StringValidator('string');
    console.log(stringValidator.data);
} catch (error: any) {
    console.log(error.message);
}