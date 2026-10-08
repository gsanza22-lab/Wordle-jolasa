# Wordle jolasa

## 1. Hasierako planteamendua

Proiektu honetan Wordle bezalako joko bat sortu dut JavaScript erabiliz.

Jokoa hasi aurretik erabiltzaileak bi aukera aukeratu behar ditu:

- Zenbat saiakera izango dituen.
- Hitzak zenbat letra izango dituen.

Erabiltzaileak datuak aukeratu ondoren, "Jokoa hasi" botoia sakatuko du.

Ondoren, hasierako formularioa desagertuko da eta jokoa agertuko da.

Jokoak bi atal nagusi izango ditu:

- Hitzaren taula.
- Teklatu birtuala.


## 2. Nola funtzionatzen du jokoak

Jokoa hastean JavaScript-ek API batera `fetch` eskaera egiten du.

API-tik gaztelaniazko hitz bat lortzen da.

Hitzaren luzera erabiltzaileak aukeratutako letra kopuruarekin bat etorri behar da.

Ondoren, joko-taula sortzen da.

Adibidez, erabiltzaileak 5 letra eta 6 saiakera aukeratzen baditu, taulak 6 lerro eta 5 lauki izango ditu.

Erabiltzaileak hitzak idatzi ditzake:

- Ordenagailuko teklatuarekin.
- Pantailako teklatu birtualarekin.

Letra bakoitza dagokion laukian agertzen da.

Letra bat ezabatzeko `Delete` edo `Backspace` teklak erabil daitezke.

Hitz osoa idatzi ondoren, `Enter` sakatu behar da hitza egiaztatzeko.


## 3. Letren koloreak

Hitz bat egiaztatzean, letra bakoitzaren egoera aztertzen da.

### Berdea

Letra hitzean dago eta posizio zuzenean dago.

CSS-ko `ok` klasea erabiltzen da.

### Horia

Letra hitzean dago baina beste posizio batean dago.

CSS-ko `existe` klasea erabiltzen da.

### Grisa

Letra ez dago hitz zuzenean.

CSS-ko `no` klasea erabiltzen da.


## 4. Jokoa amaitzea

Jokoa bi egoeratan amaitzen da.

Lehenengo aukera hitza asmatzea da.

Kasu horretan erabiltzaileak irabazi egiten du.

Bigarren aukera saiakera guztiak erabiltzea da.

Kasu horretan erabiltzaileak galdu egiten du.

Jokoa amaitzen denean, taula eta teklatu birtuala ezkutatzen dira.

Ondoren, hitz zuzena eta jokoaren emaitza erakusten dira.

Gainera, azken 10 jokoak erakusten dira.

Amaieran "Berriro jokatu" botoia dago.


## 5. localStorage

Jokoaren informazioa `localStorage` erabiliz gordetzen da.

Joko bakoitzeko objektuak datu hauek ditu:

```text
{
    hitza: "coche",
    saiakerak: ["casa", "coche"],
    data: "16/09/2026, 10:00:00",
    irabazi: true
}# Wordle-jolasa
