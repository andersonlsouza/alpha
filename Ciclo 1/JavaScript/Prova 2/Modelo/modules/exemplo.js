export default function exemplo(params) {
    console.log("Modelo função");    
}


// setTimeOut e setInterval
const time = 1000;
const id = setInterval(function () {
    console.log("setInterval");
}, time);
clearInterval(id);

const id2 = setTimeout(function () {
    console.log("setTimout");    
}, time)
clearTimeout(id2);


class padrao1{
    var1;
    var2;
    var3;

    constructor(_var1, _var2, _var3){
        this.var1 = _var1;
        this.var2 = _var2;
        this.var3 = _var3;
    }

    get getvar1(){
        return this.var1;
    }

    set setVar1(value) {
        this.var1 = value;
    }

    set time(time){
        const id = setInterval(function () {
            console.log("setInterval");
        }, time);
        clearInterval(id);

        const id2 = setTimeout(function () {
            console.log("setTimout");    
        }, time)
        clearTimeout(id2);
    }

    metodo() {
        console.log("Padrão");
    }
}