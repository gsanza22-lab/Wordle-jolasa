// aldagaiak

let saiakeraKopurua = 6;
let letraKopurua = 5;

let hitzZuzena = "";

let unekoSaiakera = 0;

let unekoHitza = "";

let saiakerak = [];

let jokoaAmaituta = false;

// HTML elementuak

const konfigurazioa = document.getElementById("container-config");

const jokoa = document.getElementById("container-juego");

const emaitza = document.getElementById("container-resultado");

const taula = document.getElementById("taula");

const teklatua = document.getElementById("teklatua");

const saiakeraKopuruaInput = document.getElementById("saiakeraKopurua");

const letraKopuruaInput = document.getElementById("letraKopurua");

const hasiBotoia = document.getElementById("btn-jugar");

const jokoBerriaBotoia = document.getElementById("btn-reiniciar");

const emaitzaMezua = document.getElementById("emaitzaMezua");

const hitzarenEmaitza = document.getElementById("hitzarenEmaitza");

const historial = document.getElementById("lista-historial");

// eventuak

hasiBotoia.addEventListener("click", hasiJokoa);

jokoBerriaBotoia.addEventListener("click", () => {
  location.reload();
});

document.addEventListener("keydown", kontrolatuTeklatua);

// jokoa hasi

async function hasiJokoa() {
  saiakeraKopurua = parseInt(saiakeraKopuruaInput.value);

  letraKopurua = parseInt(letraKopuruaInput.value);

  if (saiakeraKopurua < 1 || saiakeraKopurua > 10) {
    alert("Saiakera kopurua 1 eta 10 artean egon behar da.");

    return;
  }

  if (letraKopurua < 3 || letraKopurua > 8) {
    alert("Letra kopurua 3 eta 8 artean egon behar da.");

    return;
  }

  hitzZuzena = await lortuHitza();

  if (hitzZuzena === "") {
    alert("Ezin izan da hitza lortu.");

    return;
  }

  sortuTaula();

  sortuTeklatua();

  konfigurazioa.classList.add("ezkutuan");

  jokoa.classList.remove("ezkutuan");
}

// api hitza lortu

async function lortuHitza() {
  try {
    const erantzuna = await fetch(
      "https://random-word-api.herokuapp.com/word?number=1&lang=es",
    );

    const datuak = await erantzuna.json();

    let hitza = datuak[0].toLowerCase();

    while (hitza.length !== letraKopurua) {
      const erantzunBerria = await fetch(
        "https://random-word-api.herokuapp.com/word?number=1&lang=es", // la funcion mas importante/compleja , para que lo explique en el docs
      );

      const datuBerriak = await erantzunBerria.json();

      hitza = datuBerriak[0].toLowerCase();
    }

    console.log("La palabra es:", hitza);
    return hitza;
  } catch (errorea) {
    console.error("Errorea hitza lortzerakoan:", errorea);

    return "";
  }
}

// taula sortu

function sortuTaula() {
  taula.innerHTML = "";

  taula.style.gridTemplateColumns = `repeat(${letraKopurua}, 50px)`;

  for (let lerro = 0; lerro < saiakeraKopurua; lerro++) {
    for (let zutabe = 0; zutabe < letraKopurua; zutabe++) {
      const laukia = document.createElement("div");

      laukia.classList.add("laukia");

      laukia.dataset.lerro = lerro;

      laukia.dataset.zutabe = zutabe;

      taula.appendChild(laukia);
    }
  }
}

// teklatu birtuala sortu

function sortuTeklatua() {
  teklatua.innerHTML = "";

  const lerroak = ["QWERTYUIOP", "ASDFGHJKLÑ", "ZXCVBNM"];

  lerroak.forEach((lerroa) => {
    const teklatuLerroa = document.createElement("div");

    teklatuLerroa.classList.add("teklatu-lerroa");

    lerroa.split("").forEach((letra) => {
      const botoia = document.createElement("button");

      botoia.classList.add("teklatua-botoia");

      botoia.textContent = letra;

      botoia.dataset.letra = letra.toLowerCase();

      botoia.addEventListener("click", () => {
        sakatuLetra(letra.toLowerCase());
      });

      teklatuLerroa.appendChild(botoia);
    });

    teklatua.appendChild(teklatuLerroa);
  });

  // ezabatu botoia

  const lerroa = document.createElement("div");

  lerroa.classList.add("teklatu-lerroa");

  const ezabatu = document.createElement("button");

  ezabatu.classList.add("teklatua-botoia");

  ezabatu.textContent = "DEL";

  ezabatu.addEventListener("click", ezabatuLetra);

  lerroa.appendChild(ezabatu);

  // enter botoia

  const enter = document.createElement("button");

  enter.classList.add("teklatua-botoia");

  enter.textContent = "ENTER";

  enter.addEventListener("click", egiaztatuHitza);

  lerroa.appendChild(enter);

  teklatua.appendChild(lerroa);
}

// benetako teklatua

function kontrolatuTeklatua(eventua) {
  if (jokoaAmaituta) {
    return;
  }

  if (jokoa.classList.contains("ezkutuan")) {
    return;
  }

  const tekla = eventua.key.toLowerCase();

  if (/^[a-zñ]$/.test(tekla)) {
    sakatuLetra(tekla);
  }

  if (tekla === "backspace" || tekla === "delete") {
    ezabatuLetra();
  }

  if (tekla === "enter") {
    egiaztatuHitza();
  }
}

// letra bat sartu

function sakatuLetra(letra) {
  if (unekoHitza.length >= letraKopurua) {
    return;
  }

  unekoHitza += letra;

  eguneratuLaukiak();
}

// letra ezabatu

function ezabatuLetra() {
  if (unekoHitza.length === 0) {
    return;
  }

  unekoHitza = unekoHitza.substring(0, unekoHitza.length - 1);

  eguneratuLaukiak();
}

// laukiak eguneratu

function eguneratuLaukiak() {
  const laukiak = document.querySelectorAll(
    `.laukia[data-lerro="${unekoSaiakera}"]`,
  );

  laukiak.forEach((laukia, indizea) => {
    if (unekoHitza[indizea]) {
      laukia.textContent = unekoHitza[indizea].toUpperCase();
    } else {
      laukia.textContent = "";
    }
  });
}

// hitza egiaztatu

function egiaztatuHitza() {
  if (unekoHitza.length !== letraKopurua) {
    alert(`Hitzak ${letraKopurua} letra izan behar ditu.`);

    return;
  }

  saiakerak.push(unekoHitza);

  erakutsiEmaitza(unekoHitza);

  if (unekoHitza === hitzZuzena) {
    amaituJokoa(true);

    return;
  }

  unekoSaiakera++;

  if (unekoSaiakera >= saiakeraKopurua) {
    amaituJokoa(false);

    return;
  }

  unekoHitza = "";
}

// emaitza erakutsi

function erakutsiEmaitza(hitza) {
  const laukiak = document.querySelectorAll(
    `.laukia[data-lerro="${unekoSaiakera}"]`,
  );

  for (let i = 0; i < letraKopurua; i++) {
    const letra = hitza[i];

    const laukia = laukiak[i];

    if (letra === hitzZuzena[i]) {
      laukia.classList.add("ok");
    } else if (hitzZuzena.includes(letra)) {
      laukia.classList.add("existe");
    } else {
      laukia.classList.add("no");
    }

    eguneratuTeklatuarenKolorea(letra);
  }
}

// teklatuaren koloreak

function eguneratuTeklatuarenKolorea(letra) {
  const tekla = document.querySelector(
    `.teklatua-botoia[data-letra="${letra}"]`,
  );

  if (!tekla) {
    return;
  }

  if (hitzZuzena.includes(letra)) {
    tekla.classList.add("existe");
  } else {
    tekla.classList.add("no");
  }

  if (hitzZuzena.indexOf(letra) !== -1) {
    tekla.classList.remove("no");

    tekla.classList.add("ok");
  }
}

// jokoa amaitu

function amaituJokoa(irabazi) {
  jokoaAmaituta = true;

  gordeJokoa(irabazi);

  if (irabazi) {
    emaitzaMezua.textContent = "Irabazi duzu!";
  } else {
    emaitzaMezua.textContent = "Galdu egin duzu.";
  }

  hitzarenEmaitza.textContent = `Hitz zuzena: ${hitzZuzena.toUpperCase()}`;

  jokoa.classList.add("ezkutuan");

  emaitza.classList.remove("ezkutuan");

  erakutsiHistoriala();
}

// localstorage

function gordeJokoa(irabazi) {
  const gordetakoJokoak =
    JSON.parse(localStorage.getItem("wordleJokoak")) || [];

  const jokoa = {
    hitza: hitzZuzena,

    saiakerak: [...saiakerak],

    data: new Date().toLocaleString(),

    irabazi: irabazi,
  };

  gordetakoJokoak.unshift(jokoa);

  if (gordetakoJokoak.length > 10) {
    gordetakoJokoak.pop();
  }

  localStorage.setItem("wordleJokoak", JSON.stringify(gordetakoJokoak));
}

// historiala erakutsi

function erakutsiHistoriala() {
  historial.innerHTML = "";

  const jokoak = JSON.parse(localStorage.getItem("wordleJokoak")) || [];

  jokoak.forEach((jokoa, indizea) => {
    const elementua = document.createElement("div");

    elementua.classList.add("jokoa-historialean");

    elementua.innerHTML = `

                <strong>
                    ${indizea + 1}. jokoa
                </strong>

                <br>

                Data: ${jokoa.data}

                <br>

                Hitza:
                ${jokoa.hitza.toUpperCase()}

                <br>

                Saiakerak:
                ${jokoa.saiakerak.join(", ")}

                <br>

                Emaitza:
                ${jokoa.irabazi ? "IRABAZI" : "GALDU"}

            `;

    historial.appendChild(elementua);
  });
}
