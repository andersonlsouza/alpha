const car = document.querySelector("#selections");

console.log(car);
console.log(car.value);
console.dir(car);

function cars(event) {
    const image = document.querySelector("#car-image")
    const name = document.querySelector("#car-name");
    const manufacturer = document.querySelector("#car-manufacturer");
    const vel_max = document.querySelector("#car-vel-max");
    const fuel = document.querySelector("#car-fuel");
    const transmission = document.querySelector("#car-transmission");
    const direction = document.querySelector("#car-direction");
    const traction = document.querySelector("#car-traction");

    switch (car.value) {
        case "car-1":
            image.innerHTML = "<img src='https://s2.glbimg.com/5XJhjhyKCxW7oqH_xMOE-k7i72A=/0x0:620x380/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/M/B/3Hx5BDSkiwlKGw6zNvjg/2014-10-24-hyundai-hb20-1.png'>";
            name.innerHTML = "HB20";           
            manufacturer.innerHTML = "Hyundai";           
            vel_max.innerHTML = "193 km/h";           
            fuel.innerHTML = "Flex";           
            transmission.innerHTML = "Automática/Manual";           
            direction.innerHTML = "Elétrica";           
            traction.innerHTML = "Dianteira";           
            break;
    
        case "car-2":
            image.innerHTML = "<img src='https://secure-developments.com/commonwealth/brasil/colorizer_onix/images/colorizer/onix-3-4-frente-branco-summit.png'>";
            name.innerHTML = "Onix";           
            manufacturer.innerHTML = "Chevrolet";           
            vel_max.innerHTML = "195 km/h";           
            fuel.innerHTML = "Flex";           
            transmission.innerHTML = "Automática";           
            direction.innerHTML = "Elétrica";           
            traction.innerHTML = "Dianteira";
            break;
    
        case "car-3":
            image.innerHTML = "<img src='https://www.valencejeep.com.br/wp-content/uploads/2022/03/sport@3x-1.png'>";
            name.innerHTML = "Renegade";           
            manufacturer.innerHTML = "Jeep";           
            vel_max.innerHTML = "210 km/h";           
            fuel.innerHTML = "Flex";           
            transmission.innerHTML = "Manual";           
            direction.innerHTML = "Elétrica";           
            traction.innerHTML = "4x4";            
            break;
    
        case "car-4":
            image.innerHTML = "<img src='https://production.autoforce.com/uploads/version/profile_image/6900/comprar-ranch-cd-1-3-at-flex_f8d8d46e32.png'>";
            name.innerHTML = "Strada";           
            manufacturer.innerHTML = "Fiat";           
            vel_max.innerHTML = "180 km/h";           
            fuel.innerHTML = "Flex";           
            transmission.innerHTML = "Manual";           
            direction.innerHTML = "Hidráulica";           
            traction.innerHTML = "Traseira";            
            break;
    
        case "car-5":
            image.innerHTML = "<img src='https://toro.fiat.com.br/content/dam/fiat/products/226/1ym/1/2023/page/hero.png'>";
            name.innerHTML = "Toro";           
            manufacturer.innerHTML = "Fiat";           
            vel_max.innerHTML = "200 km/h";           
            fuel.innerHTML = "Diesel";           
            transmission.innerHTML = "Automática";           
            direction.innerHTML = "Elétrica";           
            traction.innerHTML = "4x4";            
            break;
    
        default:
            image.innerHTML = "";
            name.innerHTML = "";           
            manufacturer.innerHTML = "";           
            vel_max.innerHTML = "";           
            fuel.innerHTML = "";           
            transmission.innerHTML = "";           
            direction.innerHTML = "";           
            traction.innerHTML = ""; 
            break;
    }
}

car.addEventListener("change", cars);