// BURGER MENU

let burgerBtn = document.querySelector('#navbar__burger-btn');
let burgerList = document.querySelector('#navbar__burger-list');
let body = document.querySelector('body');

burgerBtn.addEventListener('click', function() {
    burgerBtn.classList.toggle('active');
    burgerList.classList.toggle('active');
});


// MODALS

let modalLogin = document.querySelector('#modalLogin');
let modalSignin = document.querySelector('#modalSignin');
let modalLoginBtn = document.querySelector('#modalLogin-btn');
let modalSigninBtn = document.querySelector('#modalSignin-btn');
let loginLink = document.querySelector('#loginLink');
let signinLink = document.querySelector('#signinLink');

// MODALS ACTIVATING

modalLoginBtn.addEventListener('click', modalLoginOpen);
modalSigninBtn.addEventListener('click', modalSigninOpen);

// MODALS SWITCHING

loginLink.addEventListener('click', function(event) {
    event.preventDefault();
    modalSignin.style.display = 'none';
    modalLoginOpen();
});
signinLink.addEventListener('click', function(event) {
    event.preventDefault();
    modalLogin.style.display = 'none';
    modalSigninOpen();
})

function modalLoginOpen() {
    modalLogin.style.display = "block";
    document.querySelector('.close-login').addEventListener('click', function close() {
        modalLogin.style.display = "none";
    });
    window.addEventListener('click', function(event) {
        if (event.target == modalLogin) {
            modalLogin.style.display = 'none';
        }
    });
};

function modalSigninOpen() {
    modalSignin.style.display = "block";
    document.querySelector('.close-signin').addEventListener('click', function close() {
        modalSignin.style.display = "none";
    });
    window.addEventListener('click', function(event) {
        if (event.target == modalSignin) {
            modalSignin.style.display = 'none';
        }
    });
};

// MODALS INPUT VALUE HIDING

let loginInput = modalLogin.querySelectorAll('input');
let signinInput = modalSignin.querySelectorAll('input');

for (let input of loginInput) {
    input.addEventListener('focus', hideInpVal);
};
for (let input of signinInput) {
    input.addEventListener('focus', hideInpVal);
};


function hideInpVal() {
    if (this.type != 'submit' && this.value == this.getAttribute('value')) {
        this.value = '';
        this.addEventListener('blur', function() {
            if (this.value == '') {
                this.value = this.getAttribute('value');
            }
        });
    }
};


// SLIDER

new Swiper('.swiper-container', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }
});


// RESTAURANTS 

let restList = [
    {
        name: 'italian',
        recipes: '327',
    },
    {
        name: 'indian',
        recipes: '856',
    },
    {
        name: 'french',
        recipes: '27',
    },
    {
        name: 'steakhouse',
        recipes: '174',
    },
    {
        name: 'seafood',
        recipes: '731',
    },
    {
        name: 'sushi',
        recipes: '237',
    },
    {
        name: 'mexican',
        recipes: '529',
    },
    {
        name: 'chinese',
        recipes: '145',
    },
    {
        name: 'pizza',
        recipes: '327',
    },
    {
        name: 'american',
        recipes: '1437',
    },
];

let restCards = document.querySelectorAll('.restaurants .restaurants__menu .restaurants__row .restaurants__col .col__card .card__info');

for (let i = 0; i < restCards.length; i++) {
    let recipes = restCards[i].querySelector('span');
    recipes.innerHTML = restList[i]['recipes'];
    let name = restCards[i].querySelector('h3');
    name.innerHTML = restList[i]['name'];
    console.log(recipes, name);
}


// ANIMATED COUNTERS

// GETTING THE OBJECT TO BE OBSERVED WITH INTERSECTION OBSERVER API

let countersCounter = document.querySelector('.counters__counter');

// ANIMATION START MOMENT

let startAnimCount = function() {
    let counterQuant = document.querySelectorAll('.counter__quant');
    let speed = 200;

    counterQuant.forEach(counter => {
        let updateCount = () => {
            let target = +counter.dataset.target;
            let count = +counter.innerText;
            let inc = target / speed;
            console.log(count);
            if (count < target) {
                counter.innerText = Math.floor(count + inc);
                setTimeout(updateCount, 2);
            } else {
                counter.innerText = target;
            }
        }
        updateCount();
    });
}

let callback = entries => {
    entries.forEach(ent => {
        if (ent.isIntersecting) {
            startAnimCount();
        }
    });
};

let options = {
    threshold: 0.3,
}

let observer = new IntersectionObserver(callback, options);

observer.observe(countersCounter);
