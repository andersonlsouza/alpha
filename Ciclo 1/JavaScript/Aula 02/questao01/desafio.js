function comparar (){
    var number1 = document.getElementById("number1").value;
    var number2 = document.getElementById("number2").value;
    if (number1 > number2) {
        alert("Número da esquerda é maior que o número da direita")        
    } else {
        if (number1 < number2) {
            alert("Número da esquerda é menor que o número da direita")            
        } else {
            alert("Número da esquerda é igual ao número da direita")
        }        
    }
}

function comparar_string(){
    var string1 = document.getElementById("string_1").value.length;
    var string2 = document.getElementById("string_2").value.length;

    if (string1 > string2) {
        alert("String 1 é maior que a string 2")        
    } else {
        if (string1 < string2) {
            alert("String 1 é menor que o String 2")            
        } else {
            alert("String 1 é igual ao String 2")
        }        
    }
}

document.getElementById("button").addEventListener("click", function() {
    var string_1 = document.getElementById("string1").value.length;
    var string_2 = document.getElementById("string2").value.length;
    var result = document.getElementById("result");

    if (string_1 > string_2) {
        console.log("TEste");
        result.textContent = "String 1 é maior que a string 2";     
    } else {
        if (string_1 < string_2) {
            result.textContent = "String 1 é menor que o String 2";            
        } else {
            result.textContent = "String 1 é igual ao String 2";
        }        
    }
});