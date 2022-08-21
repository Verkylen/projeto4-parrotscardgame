let Quantity;

function Start() {
    document.querySelector('.Board').innerHTML = '';

    Quantity = 0;
    let Input;

    do {
        Input = prompt('Quantidade de cartas (4 ~ 14):');
        if (!isNaN(Input)) {
            Quantity = Number(Input);
            if (Number.isInteger(Quantity)) {
                Quantity = parseInt(Quantity);
            }
        }
    } while ((Quantity % 2 !== 0) || (Quantity < 4) || (Quantity > 14));

    let Deck = [
        `<img src="images/1_bobrossparrot.gif" alt="Imagem não suportada ou indisponível">`,
        `<img src="images/2_explodyparrot.gif" alt="Imagem não suportada ou indisponível">`,
        `<img src="images/3_fiestaparrot.gif" alt="Imagem não suportada ou indisponível">`,
        `<img src="images/4_metalparrot.gif" alt="Imagem não suportada ou indisponível">`,
        `<img src="images/5_revertitparrot.gif" alt="Imagem não suportada ou indisponível">`,
        `<img src="images/6_tripletsparrot.gif" alt="Imagem não suportada ou indisponível">`,
        `<img src="images/7_unicornparrot.gif" alt="Imagem não suportada ou indisponível">`
    ];

    let Distribution = [];

    for (let i = 0; i != parseInt(Quantity/2); i++) {
        Distribution.push(Deck[i], Deck[i]);
    }

    function comparador() { 
        return Math.random() - 0.5;
    }

    Distribution.sort(comparador);

    for (let i = 0; i < Quantity; i++) {
        document.querySelector('.Board').innerHTML += `<div class="Card"><div class="Hidden">${Distribution[i]}</div><div class="Back" onclick="Turn(this)"><img src="images/back.png" alt="Imagem não suportada ou indisponível"></div></div>`;
    }
}

Start();

let Attempts = 0;
let Revealed = 0;
let Save1;
let Save2;
let Wait = false;

function Switch() {
    Wait = false;
}

function Cover() {
    Save1.parentNode.querySelector('.Visible').classList.remove('Visible');
    Save1.classList.remove('Hidden');

    Save2.parentNode.querySelector('.Visible').classList.remove('Visible');
    Save2.classList.remove('Hidden');
    Wait = false;
}

function Turn(x) {
    if (!Wait) {
        Wait = true;
        setTimeout(Switch, 500);

        x.parentNode.querySelector('.Hidden').classList.add('Visible');
        x.classList.add('Hidden');

        Attempts++;
        Revealed++;

        if (Attempts%2 == 1) {
            Save1 = x;

        } else if (x.parentNode.querySelector('.Visible').innerHTML != Save1.parentNode.querySelector('.Visible').innerHTML) {
            Revealed -= 2;
            Save2 = x;
            Wait = true;
            setTimeout(Cover, 1000);
        }
    }

    setTimeout(Won, 500);
}

function Won() {
    if (Revealed == Quantity) {
        alert(`Você ganhou em ${Attempts} jogadas!`);

        let Play = undefined;

        do {
            Play = prompt('Deseja jogar novamente? (sim/não)');
        } while (!['sim', 'não'].includes(Play));

        if (Play == 'sim') {
            Attempts = 0;
            Revealed = 0;
            Save1 = undefined;
            Save2 = undefined;
            Start();
        }
    }
}

function Quit() {
    alert('Opção inválida. Continue jogando.');
}