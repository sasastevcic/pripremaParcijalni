let studenti: Student[] = [];
let aktivanStudent: Student = null;


function promeniAktivnog(selekt: HTMLSelectElement){
   //TODO Implement
   if(Number(selekt.value) == aktivanStudent.jmbg){
       
   }

}

class Predmet{

    naziv: string;
    ocena: number;

    constructor(naziv: string, ocena: number){
        this.naziv = naziv;
        this.ocena = ocena;
    }
}

class Student{

    private _ime: string;
    private _prezime: string;
    private _jmbg: number;
    private _predmeti: Predmet[];

    constructor(ime: string, prezime: string, jmbg: number){
        this._ime = ime;
        this._prezime = prezime;
        this._jmbg = jmbg;
        this._predmeti = [];
    }


    /**
     * Getter ime
     * @return {string}
     */
	public get ime(): string {
		return this._ime;
	}

    /**
     * Setter ime
     * @param {string} value
     */
	public set ime(value: string) {
		this._ime = value;
	}

    /**
     * Getter prezime
     * @return {string}
     */
	public get prezime(): string {
		return this._prezime;
	}

    /**
     * Setter prezime
     * @param {string} value
     */
	public set prezime(value: string) {
		this._prezime = value;
	}

    /**
     * Getter jmbg
     * @return {number}
     */
	public get jmbg(): number {
		return this._jmbg;
	}

    /**
     * Setter jmbg
     * @param {number} value
     */
	public set jmbg(value: number) {
		this._jmbg = value;
	}

    /**
     * Getter predmeti
     * @return {Predmet[]}
     */
	public get predmeti(): Predmet[] {
		return this._predmeti;
    }
    
    dodajPredmet(value: Predmet): void{
        this.predmeti.push(value);
        this.refreshPredmeti();
    }

    refreshPredmeti(): void{

        let refresh = document.getElementById('predmeti');
        refresh.innerHTML = '';
        for(let i in this._predmeti){
            refresh.innerHTML += `Predmet: ${this._predmeti[i].naziv} <br/>Ocena: ${this._predmeti[i].ocena}<br/><br/>`
        }

    }

    getProsek(): number{
        return this._predmeti.reduce((prev, el) => prev + el.ocena, 0)/this._predmeti.length;
        // return this._predmeti.reduce((total, amount, i, arr) => {
        //     total + (amount.ocena / arr.length)
        // }, 0)
    }

}

function wireEvents(): void{

    document.getElementById('dodajPredmet').addEventListener('click', () => {
        let naziv: HTMLInputElement = document.getElementById('naziv') as HTMLInputElement;
        let ocena: HTMLInputElement = document.getElementById('ocena') as HTMLInputElement;
        let predmet = new Predmet(naziv.value, Number(ocena.value));
        aktivanStudent.dodajPredmet(predmet);
    });

    document.getElementById('izracunajProsecnuOcenu').addEventListener('click', () => {
        let prosecenaOcena = document.getElementById('prosecnaOcena');
        prosecenaOcena.innerHTML = `Prosecna ocena ${aktivanStudent.getProsek()}`;
    })
    

}












//OVAJ KOD OSTAVITI NA DNU FAJLA
window.onload = function() {
    initStudenti.forEach((elem) => {
        let s: Student = new Student(elem.ime, elem.prezime, Number(elem.jmbg));
        elem.predmeti.forEach((elem)=>{
            let p: Predmet = new Predmet(elem.naziv, elem.ocena);
            s.dodajPredmet(p);
        });
        studenti.push(s);
        if(aktivanStudent == null){
            aktivanStudent = s;
        }
    });
    if(QueryString["ime"] != null){
        var student = new Student(QueryString["ime"], QueryString["prezime"], Number(QueryString["jmbg"]));
        studenti.push(student);    
    }
    let selekt: HTMLElement = document.getElementById("student");
    let output: string = "";
    for(let i = 0; i < studenti.length; i++){
        let optionElem = `<option value=${studenti[i].jmbg}>${studenti[i].ime} ${studenti[i].prezime}</option>`;
        output += optionElem;         
    }
    selekt.innerHTML = output;
    aktivanStudent.refreshPredmeti();
    wireEvents();
}

var initStudenti = [
    {
        ime: "Pera",
        prezime: "Peric",
        jmbg: "1123456789000",
        predmeti: [
            {
                naziv: "Predmet1",
                ocena: 10
            },
            {
                naziv: "Predmet2",
                ocena: 8
            },
            {
                naziv: "Predmet3",
                ocena: 9
            },
            {
                naziv: "Predmet4",
                ocena: 9
            }
        ]
    },
    {
        ime: "Mika",
        prezime: "Mikic",
        jmbg: "1123456789001",
        predmeti: [
            {
                naziv: "Predmet1",
                ocena: 7
            },
            {
                naziv: "Predmet2",
                ocena: 10
            },
            {
                naziv: "Predmet3",
                ocena: 8
            }
        ]
    }
]

var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
    return query_string;
}();

