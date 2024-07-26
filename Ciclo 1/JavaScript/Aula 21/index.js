class avatar {
    #positionx;
    #positiony;
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
        return this.#positionx;
    }
    
    get positiony() {
        return this.#positiony;
    }
    
    get coins() {
        return this.#coins;   
    }

    forward() {
        this.#positiony++;
    }

    back() {
        this.#positiony--;

        if (this.#positiony < 0) {
            this.#positiony = 0;            
        }
    }
    
    right() {
        this.#positionx++;
    }
    
    left() {
        this.#positionx--;

        if (this.#positionx < 0) {
            this.#positionx = 0;            
        }
    }
    
    addcoins() {
        this.#coins++;   
    }
}

const mario = new avatar(0, 0);