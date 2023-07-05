class avatar {
    #positionx;
    #positiony;
    #life = 10;
    #damage = 1;
    #coins = 0;

    constructor(_positionx, _positiony) {
        if (_positionx < 0 || _positiony < 0) {
            throw "Posição inicial inválida!";            
        } else {
            this.#positionx = _positionx;
            this.#positiony = _positiony;
        }

        if (_positionx === undefined || _positiony === undefined) {
            throw "Posição inicial não informada!";                        
        }
    }

    get positionx() {
        if (this.#life !== 0) {
            return this.#positionx;           
        }
    }
    
    get positiony() {
        if (this.#life !== 0) {
            return this.#positiony;           
        }
    }
    
    get coins() {
        if (this.#life !== 0) {
            return this.#coins;              
        }
    }

    forward() {
        if (this.#life !== 0) {
            this.#positiony++;           
        }
    }

    back() {
        if (this.#life !== 0) {
            this.#positiony--;
    
            if (this.#positiony < 0) {
                this.#positiony = 0;            
            }           
        }
    }
    
    right() {
        if (this.#life !== 0) {
            this.#positionx++;
        }
    }
    
    left() {
        if (this.#life !== 0) {
            this.#positionx--;
    
            if (this.#positionx < 0) {
                this.#positionx = 0;            
            }           
        }
    }
    
    addcoins() {
        if (this.#life !== 0) {
            this.#coins++;    
        }
    }

    attack() {
        if (this.#life !== 0) {
            return this.#damage;  
        }
    }

    affected(value) {
        this.#life -= value;

        if (this.#life < 0) {
            this.#life = 0;            
        }
        return this.#life;
    }
}

const mario = new avatar(0, 0);

class cowboy extends avatar {
    #bullets = 10;
    #damage = 2;

    attack() {
        this.#bullets -= 1;

        if (this.#bullets < 0) {
            this.#bullets = 0;
            return 0;            
        }

        return this.#damage;
    }

    addBullets() {
        this.#bullets += 1;
        return this.#bullets;
    }
}

class mage extends avatar {
    #spells = 10;
    #damage = 3;
    
    attack() {

        if (this.#spells > 0) {
            this.#spells -= 1;
    
            if (this.#spells == 0) {
                setTimeout(() => {
                    this.#spells = 10;                
                }, 10000)            
            }

            return this.#damage;
        }
            
        return 0;
    }
}

const luigi = new cowboy(1, 1);
console.log(luigi);

const browser = new mage(2, 2);
console.log(browser);