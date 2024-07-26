let obj = {};

obj["Um atributo com espaços"] = 1;

Object.defineProperty(obj, "Outro atributo com espaços", {
    value: 1,
});

console.log(obj);