var studenti = [];
var aktivanStudent = null;
function promeniAktivnog(selekt) {
    //TODO Implement
    if (Number(selekt.value) == aktivanStudent.jmbg) {
    }
}
var Predmet = /** @class */ (function () {
    function Predmet(naziv, ocena) {
        this.naziv = naziv;
        this.ocena = ocena;
    }
    return Predmet;
}());
var Student = /** @class */ (function () {
    function Student(ime, prezime, jmbg) {
        this._ime = ime;
        this._prezime = prezime;
        this._jmbg = jmbg;
        this._predmeti = [];
    }
    Object.defineProperty(Student.prototype, "ime", {
        /**
         * Getter ime
         * @return {string}
         */
        get: function () {
            return this._ime;
        },
        /**
         * Setter ime
         * @param {string} value
         */
        set: function (value) {
            this._ime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "prezime", {
        /**
         * Getter prezime
         * @return {string}
         */
        get: function () {
            return this._prezime;
        },
        /**
         * Setter prezime
         * @param {string} value
         */
        set: function (value) {
            this._prezime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "jmbg", {
        /**
         * Getter jmbg
         * @return {number}
         */
        get: function () {
            return this._jmbg;
        },
        /**
         * Setter jmbg
         * @param {number} value
         */
        set: function (value) {
            this._jmbg = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "predmeti", {
        /**
         * Getter predmeti
         * @return {Predmet[]}
         */
        get: function () {
            return this._predmeti;
        },
        enumerable: true,
        configurable: true
    });
    Student.prototype.dodajPredmet = function (value) {
        this.predmeti.push(value);
        this.refreshPredmeti();
    };
    Student.prototype.refreshPredmeti = function () {
        var refresh = document.getElementById('predmeti');
        refresh.innerHTML = '';
        for (var i in this._predmeti) {
            refresh.innerHTML += "Predmet: " + this._predmeti[i].naziv + " <br/>Ocena: " + this._predmeti[i].ocena + "<br/><br/>";
        }
    };
    Student.prototype.getProsek = function () {
        return this._predmeti.reduce(function (prev, el) { return prev + el.ocena; }, 0) / this._predmeti.length;
        // return this._predmeti.reduce((total, amount, i, arr) => {
        //     total + (amount.ocena / arr.length)
        // }, 0)
    };
    return Student;
}());
function wireEvents() {
    document.getElementById('dodajPredmet').addEventListener('click', function () {
        var naziv = document.getElementById('naziv');
        var ocena = document.getElementById('ocena');
        var predmet = new Predmet(naziv.value, Number(ocena.value));
        aktivanStudent.dodajPredmet(predmet);
    });
    document.getElementById('izracunajProsecnuOcenu').addEventListener('click', function () {
        var prosecenaOcena = document.getElementById('prosecnaOcena');
        prosecenaOcena.innerHTML = "Prosecna ocena " + aktivanStudent.getProsek();
    });
}
//OVAJ KOD OSTAVITI NA DNU FAJLA
window.onload = function () {
    initStudenti.forEach(function (elem) {
        var s = new Student(elem.ime, elem.prezime, Number(elem.jmbg));
        elem.predmeti.forEach(function (elem) {
            var p = new Predmet(elem.naziv, elem.ocena);
            s.dodajPredmet(p);
        });
        studenti.push(s);
        if (aktivanStudent == null) {
            aktivanStudent = s;
        }
    });
    if (QueryString["ime"] != null) {
        var student = new Student(QueryString["ime"], QueryString["prezime"], Number(QueryString["jmbg"]));
        studenti.push(student);
    }
    var selekt = document.getElementById("student");
    var output = "";
    for (var i = 0; i < studenti.length; i++) {
        var optionElem = "<option value=" + studenti[i].jmbg + ">" + studenti[i].ime + " " + studenti[i].prezime + "</option>";
        output += optionElem;
    }
    selekt.innerHTML = output;
    aktivanStudent.refreshPredmeti();
    wireEvents();
};
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
];
var QueryString = function () {
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        }
        else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        }
        else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}();
//# sourceMappingURL=proba.js.map