
const myList = document.getElementById('ingredients');
const myRequest = new Request('cocktails/assets/data.json');
var data = null;

fetch(myRequest)
  .then((response) => response.json())
    .then((data) => {
        thisData(data);
        console.log(data, this.data);
    for (const product of data) {
        const listItem = document.createElement('button');
        listItem.classList.add('btn', 'btn-ingredients');
        listItem.setAttribute('data-ingredient', product.name);
        listItem.setAttribute('data-ingredient-id', JSON.stringify(product.ingredients));
      listItem.innerText = product.name;
    //   listItem.append(
    //     ` ingredients: ${
    //       product.ingredients
    //     }. Cost: `
    //   );
      
      myList.appendChild(listItem);
    }
    setListerens();
  })
  .catch(console.error);
 


var glass = document.getElementById('glass');
var glassHeght = glass.offsetHeight * 0.8;
var glassWidth = glass.offsetWidth - 10;
console.log(glassHeght);
function thisData(data) {
    if (!this.data) {
        this.data = data;  
    }
    return this.data;
   
}
function setListerens() {
    var buttons = document.querySelectorAll('.btn-ingredients');
    var ingredientsWrapper = document.getElementById('ingredients');
    
    console.log(buttons);
    buttons.forEach(element => {
        element.addEventListener('click', function (event) {
            // console.log(ingredientsWrapper.scroll(0,0));
            buttons.forEach(element => element.classList.remove('active'));
            event.target.classList.add('active');
            window.scrollTo({top:ingredientsWrapper.offsetTop, behavior: 'smooth'});
            console.log(event.target);
            var ingredientName = event.target.getAttribute('data-ingredient');
            var ingredients = thisData();
            var selected = ingredients.find( ingredient => ingredient.name === ingredientName);
            console.log(selected);
            fillIngredeints(selected);
        
        });
    });
}
function fillIngredeints(selected) {
    var ingredients = selected.ingredients;
    // var ingredientList = document.getElementById('ingredient-list');
    this.glass.innerHTML = '';
    this.glass.classList.remove('animate');
    let index = 0
    var totParts = ingredients.reduce((sum, ingredient) => sum + ingredient.part, 0);
    ingredients.forEach(ingredient => {
        var i = document.createElement('span');
        i.classList.add('ingredient');

        i.style.height = (this.glassHeght / totParts) * ingredient.part + 'px';
        i.style.backgroundColor='rgb('+rgbToHex(ingredient.color)+')';
        i.style.animationDelay = index * 0.5 + 's';
        
        if (ingredient.name.includes('cubes')) {
            var cubesPartHigh = (this.glassHeght / totParts) * ingredient.part;
            var cubesCount = (this.glassWidth * cubesPartHigh) / 6400;
            console.log(Math.round(cubesCount, cubesPartHigh));
            i.classList.add('cubes');
            const cube = document.createElement('span');
            cube.classList.add('cube');
            i.setAttribute('data-title', ingredient.part + ' part of ' + ingredient.name);
            for (let index = 0; index < cubesCount; index++) {
                var c = cube.cloneNode(true);
                c.style.borderRadius= mathVal(5,8)*3 + 'px ' + mathVal(5,8)*3 + 'px ' + mathVal(5,8)*3 + 'px ' + mathVal(5,8)*3 + 'px ';
                c.style.animationDelay = mathVal(0, 4) + (mathVal(1, 9) * 0.1) + 's';
                c.style.marginLeft = mathVal(5, 15) + 'px';
                c.style.marginRight = mathVal(5, 15) + 'px';
                i.appendChild(c);
            }
        } else if (ingredient.name.includes('orange')){
            i.classList.add('oranges');
            const orange = document.createElement('span');
            orange.classList.add('orange');
            i.setAttribute('data-title', ingredient.part + ' part of ' + ingredient.name);
            var o = orange.cloneNode(true);
            i.appendChild(o);
        }
        
        else {
            i.innerText = ingredient.part + ' part of ' + ingredient.name;
        }
        
        this.glass.appendChild(i);
        // this.glass.insertAdjacentHTML('beforeend', i);
        index++;
    });
    this.glass.classList.add('animate');
}
function mathVal(min,max) {
    min = Math.ceil(min);
  max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
    
    // return Math.round(Math.random() * 10);
}
function rgbToHex(hex)
{
    const col = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
        , (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16));
    return col[0] + "," + col[1] + "," + col[2];
//   return arrByte[1] + "," + arrByte[2] + "," + arrByte[3];
}
