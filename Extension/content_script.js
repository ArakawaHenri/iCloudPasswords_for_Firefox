function lookUpSpecifier(e, n) {
    return n ? (mapEntry = e[n], mapEntry ? mapEntry.valueSpecifier : null) : null
}

function specifierForAutocompleteToken(e) {
    return e ? lookUpSpecifier(autocompleteTokenMap, e) : null
}

function specifierForFieldLabel(e) {
    return e ? lookUpSpecifier(fieldLabelMap, e) : null
}

function findValueSpecifierForKey(e) {
    let n = specifierForAutocompleteToken(e);
    return n || specifierForFieldLabel(e)
}
var PatternMatcherClass = function(e) {
    this._words = e
};
PatternMatcherClass.prototype = {
    _resultFromMatch: function(e) {
        if (!e) return null;
        if (specifier = findValueSpecifierForKey(e), !specifier) return [e, "", "", ""];
        return [e, specifier.property || "", specifier.category || "", specifier.parentCategory || ""]
    },
    longestMatch: function(e) {
        let n = null,
            r = 0;
        for (let t of this._words) {
            let i = t.length;
            i < r || (regex = RegExp("\\b" + t + "\\b", "i"), regex.test(e) && (n = t, r = i))
        }
        return n ? this._resultFromMatch(n) : null
    },
    searchReverse: function(e) {
        let n = null;
        for (let r = this._words.length - 1; r >= 0; --r) {
            let t = this._words[r];
            if (regex = RegExp("\\b" + t + "\\b", "i"), regex.test(e)) {
                n = t;
                break
            }
        }
        return n ? this._resultFromMatch(n) : null
    }
};
var ValueSpecifier = function(e, n, r, t, i) {
        this.property = e, this.component = n, this.label = r, this.category = t, this.parentProperty = i
    },
    MapEntry = function(e, n, r) {
        this.keyLength = e, this.key = n, this.valueSpecifier = r
    },
    Map = function(e) {
        this.mapEntries = e, this.entryCount = e.length
    },
    valueSpecifiers = [new ValueSpecifier("FullNameComposite", null, null, "FullNameComposite", null), new ValueSpecifier("First", null, null, "First", "FullNameComposite"), new ValueSpecifier("Middle", null, null, "Middle", "FullNameComposite"), new ValueSpecifier("Last", null, null, "Last", "FullNameComposite"), new ValueSpecifier("Birthday", null, null, "Birthday", null), new ValueSpecifier("JobTitle", null, null, "JobTitle", null), new ValueSpecifier("Email", null, null, "Email", null), new ValueSpecifier("Address", "Street", null, "AddressStreet", null), new ValueSpecifier("Address", "City", null, "AddressCity", null), new ValueSpecifier("Address", "State", null, "AddressState", null), new ValueSpecifier("Address", "ZIP", null, "AddressZIP", null), new ValueSpecifier("Address", "Country", null, "AddressCountry", null), new ValueSpecifier("Phone", null, null, "Phone", null), new ValueSpecifier("Organization", null, null, "Organization", null), new ValueSpecifier("Phone", null, "_$!<Home>!$_", "Phone_$!<Home>!$_", null), new ValueSpecifier("Phone", null, "_$!<Work>!$_", "Phone_$!<Work>!$_", null), new ValueSpecifier("Phone", null, "_$!<Mobile>!$_", "Phone_$!<Mobile>!$_", null), new ValueSpecifier("Phone", null, "_$!<Pager>!$_", "Phone_$!<Pager>!$_", null), new ValueSpecifier("<Invalid>", null, null, "<Invalid>", null), new ValueSpecifier("InstantMessage", "AIMInstant", null, "InstantMessageAIMInstant", null), new ValueSpecifier("InstantMessage", "ICQInstant", null, "InstantMessageICQInstant", null), new ValueSpecifier("InstantMessage", "JabberInstant", null, "InstantMessageJabberInstant", null), new ValueSpecifier("InstantMessage", "MSNInstant", null, "InstantMessageMSNInstant", null), new ValueSpecifier("InstantMessage", "QQInstant", null, "InstantMessageQQInstant", null), new ValueSpecifier("InstantMessage", "SkypeInstant", null, "InstantMessageSkypeInstant", null), new ValueSpecifier("URLs", null, "_$!<HomePage>!$_", "URLs_$!<HomePage>!$_", null)],
    autocompleteTokenMap = {
        "additional-name": new MapEntry(15, "additional-name", valueSpecifiers[2]),
        "additional-name-initial": new MapEntry(23, "additional-name-initial", valueSpecifiers[2]),
        "address-line1": new MapEntry(13, "address-line1", valueSpecifiers[7]),
        "address-line2": new MapEntry(13, "address-line2", valueSpecifiers[7]),
        "address-line3": new MapEntry(13, "address-line3", valueSpecifiers[7]),
        "administrative-area": new MapEntry(19, "administrative-area", valueSpecifiers[9]),
        bday: new MapEntry(4, "bday", valueSpecifiers[4]),
        "bday-day": new MapEntry(8, "bday-day", valueSpecifiers[4]),
        "bday-month": new MapEntry(10, "bday-month", valueSpecifiers[4]),
        "bday-year": new MapEntry(9, "bday-year", valueSpecifiers[4]),
        birthday: new MapEntry(8, "birthday", valueSpecifiers[4]),
        "birthday-day": new MapEntry(12, "birthday-day", valueSpecifiers[4]),
        "birthday-month": new MapEntry(14, "birthday-month", valueSpecifiers[4]),
        "birthday-year": new MapEntry(13, "birthday-year", valueSpecifiers[4]),
        city: new MapEntry(4, "city", valueSpecifiers[8]),
        country: new MapEntry(7, "country", valueSpecifiers[11]),
        "country-name": new MapEntry(12, "country-name", valueSpecifiers[11]),
        email: new MapEntry(5, "email", valueSpecifiers[6]),
        "family-name": new MapEntry(11, "family-name", valueSpecifiers[3]),
        "given-name": new MapEntry(10, "given-name", valueSpecifiers[1]),
        locality: new MapEntry(8, "locality", valueSpecifiers[8]),
        "middle-initial": new MapEntry(14, "middle-initial", valueSpecifiers[2]),
        "middle-name": new MapEntry(11, "middle-name", valueSpecifiers[2]),
        name: new MapEntry(4, "name", valueSpecifiers[0]),
        "name-full": new MapEntry(9, "name-full", valueSpecifiers[0]),
        org: new MapEntry(3, "org", valueSpecifiers[13]),
        organization: new MapEntry(12, "organization", valueSpecifiers[13]),
        "organization-title": new MapEntry(18, "organization-title", valueSpecifiers[5]),
        "phone-area-code": new MapEntry(15, "phone-area-code", valueSpecifiers[12]),
        "phone-country-code": new MapEntry(18, "phone-country-code", valueSpecifiers[12]),
        "phone-extension": new MapEntry(15, "phone-extension", valueSpecifiers[12]),
        "phone-full": new MapEntry(10, "phone-full", valueSpecifiers[12]),
        "phone-local": new MapEntry(11, "phone-local", valueSpecifiers[12]),
        "phone-local-prefix": new MapEntry(18, "phone-local-prefix", valueSpecifiers[12]),
        "phone-local-suffix": new MapEntry(18, "phone-local-suffix", valueSpecifiers[12]),
        "phone-national": new MapEntry(14, "phone-national", valueSpecifiers[12]),
        "postal-code": new MapEntry(11, "postal-code", valueSpecifiers[10]),
        province: new MapEntry(8, "province", valueSpecifiers[9]),
        region: new MapEntry(6, "region", valueSpecifiers[9]),
        state: new MapEntry(5, "state", valueSpecifiers[9]),
        "street-address": new MapEntry(14, "street-address", valueSpecifiers[7]),
        surname: new MapEntry(7, "surname", valueSpecifiers[3]),
        tel: new MapEntry(3, "tel", valueSpecifiers[12]),
        "tel-area-code": new MapEntry(13, "tel-area-code", valueSpecifiers[12]),
        "tel-country-code": new MapEntry(16, "tel-country-code", valueSpecifiers[12]),
        "tel-extension": new MapEntry(13, "tel-extension", valueSpecifiers[12]),
        "tel-local": new MapEntry(9, "tel-local", valueSpecifiers[12]),
        "tel-local-prefix": new MapEntry(16, "tel-local-prefix", valueSpecifiers[12]),
        "tel-local-suffix": new MapEntry(16, "tel-local-suffix", valueSpecifiers[12]),
        "tel-national": new MapEntry(12, "tel-national", valueSpecifiers[12])
    },
    fieldLabelMap = {
        "1ère adresse": new MapEntry(12, "1ère adresse", valueSpecifiers[7]),
        "2º nome": new MapEntry(7, "2º nome", valueSpecifiers[2]),
        Beruf: new MapEntry(5, "Beruf", valueSpecifiers[5]),
        Berufsbezeichnung: new MapEntry(17, "Berufsbezeichnung", valueSpecifiers[5]),
        Bundesland: new MapEntry(10, "Bundesland", valueSpecifiers[9]),
        Bundesstaat: new MapEntry(11, "Bundesstaat", valueSpecifiers[9]),
        CAP: new MapEntry(3, "CAP", valueSpecifiers[10]),
        "E-Mail Adresse": new MapEntry(14, "E-Mail Adresse", valueSpecifiers[6]),
        "E-Mail-Adresse": new MapEntry(14, "E-Mail-Adresse", valueSpecifiers[6]),
        Efternavn: new MapEntry(9, "Efternavn", valueSpecifiers[3]),
        "Email アドレス": new MapEntry(10, "Email アドレス", valueSpecifiers[6]),
        "Emailアドレス": new MapEntry(9, "Emailアドレス", valueSpecifiers[6]),
        "Eメールアドレス": new MapEntry(8, "Eメールアドレス", valueSpecifiers[6]),
        "FAX番号": new MapEntry(5, "FAX番号", valueSpecifiers[12]),
        Familienname: new MapEntry(12, "Familienname", valueSpecifiers[3]),
        Fon: new MapEntry(3, "Fon", valueSpecifiers[12]),
        GSM: new MapEntry(3, "GSM", valueSpecifiers[16]),
        Geburtsdatum: new MapEntry(12, "Geburtsdatum", valueSpecifiers[4]),
        Geburtstag: new MapEntry(10, "Geburtstag", valueSpecifiers[4]),
        Handy: new MapEntry(5, "Handy", valueSpecifiers[16]),
        Initialen: new MapEntry(9, "Initialen", valueSpecifiers[2]),
        Mittelname: new MapEntry(10, "Mittelname", valueSpecifiers[2]),
        "Mobilfunk-Vorwahl": new MapEntry(17, "Mobilfunk-Vorwahl", valueSpecifiers[16]),
        "Mobiltelefon-Vorwahl": new MapEntry(20, "Mobiltelefon-Vorwahl", valueSpecifiers[16]),
        NDT: new MapEntry(3, "NDT", valueSpecifiers[17]),
        NPA: new MapEntry(3, "NPA", valueSpecifiers[10]),
        Nachname: new MapEntry(8, "Nachname", valueSpecifiers[3]),
        "Netzbetreiber-Vorwahl": new MapEntry(21, "Netzbetreiber-Vorwahl", valueSpecifiers[16]),
        PLZ: new MapEntry(3, "PLZ", valueSpecifiers[10]),
        "PSČ": new MapEntry(3, "PSČ", valueSpecifiers[10]),
        "Pager-Vorwahl": new MapEntry(13, "Pager-Vorwahl", valueSpecifiers[17]),
        Postleitzahl: new MapEntry(12, "Postleitzahl", valueSpecifiers[10]),
        "Rufnummer (geschäftlich)": new MapEntry(24, "Rufnummer (geschäftlich)", valueSpecifiers[15]),
        "Rufnummer (privat)": new MapEntry(18, "Rufnummer (privat)", valueSpecifiers[14]),
        "Rufnummer abends": new MapEntry(16, "Rufnummer abends", valueSpecifiers[14]),
        "Rufnummer dienstlich": new MapEntry(20, "Rufnummer dienstlich", valueSpecifiers[15]),
        "Rufnummer geschäftlich": new MapEntry(22, "Rufnummer geschäftlich", valueSpecifiers[15]),
        "Rufnummer privat": new MapEntry(16, "Rufnummer privat", valueSpecifiers[14]),
        "Rufnummer tagsüber": new MapEntry(18, "Rufnummer tagsüber", valueSpecifiers[15]),
        Stadt: new MapEntry(5, "Stadt", valueSpecifiers[8]),
        "Str.": new MapEntry(4, "Str.", valueSpecifiers[7]),
        Strasse: new MapEntry(7, "Strasse", valueSpecifiers[7]),
        "Straße": new MapEntry(6, "Straße", valueSpecifiers[7]),
        Telefax: new MapEntry(7, "Telefax", valueSpecifiers[12]),
        "Telefon (geschäftlich)": new MapEntry(22, "Telefon (geschäftlich)", valueSpecifiers[15]),
        "Telefon (privat)": new MapEntry(16, "Telefon (privat)", valueSpecifiers[14]),
        "Telefon abends": new MapEntry(14, "Telefon abends", valueSpecifiers[14]),
        "Telefon dienstlich": new MapEntry(18, "Telefon dienstlich", valueSpecifiers[15]),
        "Telefon geschäftlich": new MapEntry(20, "Telefon geschäftlich", valueSpecifiers[15]),
        "Telefon privat": new MapEntry(14, "Telefon privat", valueSpecifiers[14]),
        "Telefon tagsüber": new MapEntry(16, "Telefon tagsüber", valueSpecifiers[15]),
        "Tätigkeit": new MapEntry(9, "Tätigkeit", valueSpecifiers[5]),
        "Voller Name": new MapEntry(11, "Voller Name", valueSpecifiers[0]),
        "Vollständiger Name": new MapEntry(18, "Vollständiger Name", valueSpecifiers[0]),
        Vorname: new MapEntry(7, "Vorname", valueSpecifiers[1]),
        Vorwahl: new MapEntry(7, "Vorwahl", valueSpecifiers[12]),
        "Vorwahl (Mobil)": new MapEntry(15, "Vorwahl (Mobil)", valueSpecifiers[16]),
        "Vorwahl (Mobilfunk)": new MapEntry(19, "Vorwahl (Mobilfunk)", valueSpecifiers[16]),
        "Vorwahl (Mobiltelefon)": new MapEntry(22, "Vorwahl (Mobiltelefon)", valueSpecifiers[16]),
        "Vorwahl (Netzbetreiber)": new MapEntry(23, "Vorwahl (Netzbetreiber)", valueSpecifiers[16]),
        "Vorwahl (Pager)": new MapEntry(15, "Vorwahl (Pager)", valueSpecifiers[17]),
        "Vorwahl Mobil": new MapEntry(13, "Vorwahl Mobil", valueSpecifiers[16]),
        "Vorwahl Mobilfunk": new MapEntry(17, "Vorwahl Mobilfunk", valueSpecifiers[16]),
        "Vorwahl Mobiltelefon": new MapEntry(20, "Vorwahl Mobiltelefon", valueSpecifiers[16]),
        "Vorwahl Netzbetreiber": new MapEntry(21, "Vorwahl Netzbetreiber", valueSpecifiers[16]),
        "Vorwahl Pager": new MapEntry(13, "Vorwahl Pager", valueSpecifiers[17]),
        Vorwahlnummer: new MapEntry(13, "Vorwahlnummer", valueSpecifiers[12]),
        achternaam: new MapEntry(10, "achternaam", valueSpecifiers[3]),
        "activité": new MapEntry(8, "activité", valueSpecifiers[5]),
        ad: new MapEntry(2, "ad", valueSpecifiers[1]),
        address: new MapEntry(7, "address", valueSpecifiers[7]),
        "address 1": new MapEntry(9, "address 1", valueSpecifiers[7]),
        address1: new MapEntry(8, "address1", valueSpecifiers[7]),
        addresse: new MapEntry(8, "addresse", valueSpecifiers[7]),
        addrstreet: new MapEntry(10, "addrstreet", valueSpecifiers[7]),
        adel: new MapEntry(4, "adel", valueSpecifiers[6]),
        "adr.": new MapEntry(4, "adr.", valueSpecifiers[7]),
        adres: new MapEntry(5, "adres", valueSpecifiers[7]),
        "adres 1": new MapEntry(7, "adres 1", valueSpecifiers[7]),
        adres1: new MapEntry(6, "adres1", valueSpecifiers[7]),
        adresa: new MapEntry(6, "adresa", valueSpecifiers[7]),
        "adresa 1": new MapEntry(8, "adresa 1", valueSpecifiers[7]),
        "adresa e-pošte": new MapEntry(14, "adresa e-pošte", valueSpecifiers[6]),
        "adresa ul.": new MapEntry(10, "adresa ul.", valueSpecifiers[7]),
        "adresa ulice": new MapEntry(12, "adresa ulice", valueSpecifiers[7]),
        adresa1: new MapEntry(7, "adresa1", valueSpecifiers[7]),
        adresi: new MapEntry(6, "adresi", valueSpecifiers[7]),
        adress: new MapEntry(6, "adress", valueSpecifiers[7]),
        "adress 1": new MapEntry(8, "adress 1", valueSpecifiers[7]),
        adress1: new MapEntry(7, "adress1", valueSpecifiers[7]),
        adresse: new MapEntry(7, "adresse", valueSpecifiers[7]),
        "adresse 1": new MapEntry(9, "adresse 1", valueSpecifiers[7]),
        "adresse Internet": new MapEntry(16, "adresse Internet", valueSpecifiers[6]),
        "adresse civique": new MapEntry(15, "adresse civique", valueSpecifiers[7]),
        "adresse courriel": new MapEntry(16, "adresse courriel", valueSpecifiers[6]),
        "adresse de courriel": new MapEntry(19, "adresse de courriel", valueSpecifiers[6]),
        "adresse de courrier électronique": new MapEntry(32, "adresse de courrier électronique", valueSpecifiers[6]),
        "adresse de messagerie": new MapEntry(21, "adresse de messagerie", valueSpecifiers[6]),
        "adresse e-mail": new MapEntry(14, "adresse e-mail", valueSpecifiers[6]),
        "adresse géographique": new MapEntry(20, "adresse géographique", valueSpecifiers[7]),
        "adresse municipale": new MapEntry(18, "adresse municipale", valueSpecifiers[7]),
        "adresse postale": new MapEntry(15, "adresse postale", valueSpecifiers[7]),
        "adresse postale 1": new MapEntry(17, "adresse postale 1", valueSpecifiers[7]),
        "adresse électronique": new MapEntry(20, "adresse électronique", valueSpecifiers[6]),
        adresse1: new MapEntry(8, "adresse1", valueSpecifiers[7]),
        "adresă": new MapEntry(6, "adresă", valueSpecifiers[7]),
        "adresă 1": new MapEntry(8, "adresă 1", valueSpecifiers[7]),
        "adresă stradală": new MapEntry(15, "adresă stradală", valueSpecifiers[7]),
        "adresă1": new MapEntry(7, "adresă1", valueSpecifiers[7]),
        "adresăemail": new MapEntry(11, "adresăemail", valueSpecifiers[6]),
        "adreça": new MapEntry(6, "adreça", valueSpecifiers[7]),
        "adreça 1": new MapEntry(8, "adreça 1", valueSpecifiers[7]),
        "adreça1": new MapEntry(7, "adreça1", valueSpecifiers[7]),
        "adrélec": new MapEntry(7, "adrélec", valueSpecifiers[6]),
        "adı": new MapEntry(3, "adı", valueSpecifiers[0]),
        aim: new MapEntry(3, "aim", valueSpecifiers[19]),
        "akşam alan kodu": new MapEntry(15, "akşam alan kodu", valueSpecifiers[14]),
        "akşam telefonu": new MapEntry(14, "akşam telefonu", valueSpecifiers[14]),
        "alan kodu": new MapEntry(9, "alan kodu", valueSpecifiers[12]),
        "alt prenume": new MapEntry(11, "alt prenume", valueSpecifiers[2]),
        ammatti: new MapEntry(7, "ammatti", valueSpecifiers[5]),
        ammattinimike: new MapEntry(13, "ammattinimike", valueSpecifiers[5]),
        andranamn: new MapEntry(9, "andranamn", valueSpecifiers[2]),
        angiAdresseAdresselinje: new MapEntry(23, "angiAdresseAdresselinje", valueSpecifiers[7]),
        angivAdresseAdresselinje: new MapEntry(24, "angivAdresseAdresselinje", valueSpecifiers[7]),
        aniversari: new MapEntry(10, "aniversari", valueSpecifiers[4]),
        "aniversário": new MapEntry(11, "aniversário", valueSpecifiers[4]),
        anniversaire: new MapEntry(12, "anniversaire", valueSpecifiers[4]),
        apelido: new MapEntry(7, "apelido", valueSpecifiers[3]),
        apellido: new MapEntry(8, "apellido", valueSpecifiers[3]),
        apellidos: new MapEntry(9, "apellidos", valueSpecifiers[3]),
        arbeidstelefon: new MapEntry(14, "arbeidstelefon", valueSpecifiers[15]),
        arbejdsnummer: new MapEntry(13, "arbejdsnummer", valueSpecifiers[15]),
        arbejdstelefon: new MapEntry(14, "arbejdstelefon", valueSpecifiers[15]),
        arbetstelefon: new MapEntry(13, "arbetstelefon", valueSpecifiers[15]),
        "area code": new MapEntry(9, "area code", valueSpecifiers[12]),
        areacode: new MapEntry(8, "areacode", valueSpecifiers[12]),
        "autre prénom": new MapEntry(12, "autre prénom", valueSpecifiers[2]),
        azienda: new MapEntry(7, "azienda", valueSpecifiers[13]),
        bedrijf: new MapEntry(7, "bedrijf", valueSpecifiers[13]),
        befattning: new MapEntry(10, "befattning", valueSpecifiers[5]),
        bellboy: new MapEntry(7, "bellboy", valueSpecifiers[17]),
        bipeur: new MapEntry(6, "bipeur", valueSpecifiers[17]),
        "birinci ad": new MapEntry(10, "birinci ad", valueSpecifiers[1]),
        "birinci adı": new MapEntry(11, "birinci adı", valueSpecifiers[1]),
        "birth date": new MapEntry(10, "birth date", valueSpecifiers[4]),
        "birth day": new MapEntry(9, "birth day", valueSpecifiers[4]),
        "birth month": new MapEntry(11, "birth month", valueSpecifiers[4]),
        "birth year": new MapEntry(10, "birth year", valueSpecifiers[4]),
        birthday: new MapEntry(8, "birthday", valueSpecifiers[4]),
        bolag: new MapEntry(5, "bolag", valueSpecifiers[13]),
        born: new MapEntry(4, "born", valueSpecifiers[4]),
        bostadsort: new MapEntry(10, "bostadsort", valueSpecifiers[8]),
        "broj telefona": new MapEntry(13, "broj telefona", valueSpecifiers[12]),
        bursdag: new MapEntry(7, "bursdag", valueSpecifiers[4]),
        busca: new MapEntry(5, "busca", valueSpecifiers[17]),
        buscapersonas: new MapEntry(13, "buscapersonas", valueSpecifiers[17]),
        business: new MapEntry(8, "business", valueSpecifiers[13]),
        "business area code": new MapEntry(18, "business area code", valueSpecifiers[15]),
        "business areacode": new MapEntry(17, "business areacode", valueSpecifiers[15]),
        "business phone": new MapEntry(14, "business phone", valueSpecifiers[15]),
        businessareacode: new MapEntry(16, "businessareacode", valueSpecifiers[15]),
        businessphone: new MapEntry(13, "businessphone", valueSpecifiers[15]),
        "c. élec.": new MapEntry(8, "c. élec.", valueSpecifiers[6]),
        "cad.": new MapEntry(4, "cad.", valueSpecifiers[7]),
        cadde: new MapEntry(5, "cadde", valueSpecifiers[7]),
        "cadde adresi": new MapEntry(12, "cadde adresi", valueSpecifiers[7]),
        calle: new MapEntry(5, "calle", valueSpecifiers[7]),
        cargo: new MapEntry(5, "cargo", valueSpecifiers[5]),
        "cargo profissional": new MapEntry(18, "cargo profissional", valueSpecifiers[5]),
        cargoprofissional: new MapEntry(17, "cargoprofissional", valueSpecifiers[5]),
        carrer: new MapEntry(6, "carrer", valueSpecifiers[7]),
        "cell area code": new MapEntry(14, "cell area code", valueSpecifiers[16]),
        "cell areacode": new MapEntry(13, "cell areacode", valueSpecifiers[16]),
        "cell phone": new MapEntry(10, "cell phone", valueSpecifiers[16]),
        "cell.": new MapEntry(5, "cell.", valueSpecifiers[16]),
        cellareacode: new MapEntry(12, "cellareacode", valueSpecifiers[16]),
        cellphone: new MapEntry(9, "cellphone", valueSpecifiers[16]),
        cellulaire: new MapEntry(10, "cellulaire", valueSpecifiers[16]),
        cellulare: new MapEntry(9, "cellulare", valueSpecifiers[16]),
        celular: new MapEntry(7, "celular", valueSpecifiers[16]),
        "celé meno": new MapEntry(9, "celé meno", valueSpecifiers[0]),
        cep: new MapEntry(3, "cep", valueSpecifiers[16]),
        "cep numarası": new MapEntry(12, "cep numarası", valueSpecifiers[16]),
        "cep telefonu": new MapEntry(12, "cep telefonu", valueSpecifiers[16]),
        "cercapers.": new MapEntry(10, "cercapers.", valueSpecifiers[17]),
        cercapersone: new MapEntry(12, "cercapersone", valueSpecifiers[17]),
        cercapersones: new MapEntry(13, "cercapersones", valueSpecifiers[17]),
        cidade: new MapEntry(6, "cidade", valueSpecifiers[8]),
        "città": new MapEntry(5, "città", valueSpecifiers[8]),
        city: new MapEntry(4, "city", valueSpecifiers[8]),
        ciudad: new MapEntry(6, "ciudad", valueSpecifiers[8]),
        ciutat: new MapEntry(6, "ciutat", valueSpecifiers[8]),
        "cod poștal": new MapEntry(10, "cod poștal", valueSpecifiers[10]),
        "code ZIP": new MapEntry(8, "code ZIP", valueSpecifiers[10]),
        "code postal": new MapEntry(11, "code postal", valueSpecifiers[10]),
        "code postal américain": new MapEntry(21, "code postal américain", valueSpecifiers[10]),
        "code régional": new MapEntry(13, "code régional", valueSpecifiers[12]),
        "codi postal": new MapEntry(11, "codi postal", valueSpecifiers[10]),
        "codice avviamento postale": new MapEntry(25, "codice avviamento postale", valueSpecifiers[10]),
        "codice di avviamento postale": new MapEntry(28, "codice di avviamento postale", valueSpecifiers[10]),
        "codice postale": new MapEntry(14, "codice postale", valueSpecifiers[10]),
        "codpoștal": new MapEntry(9, "codpoștal", valueSpecifiers[10]),
        cognom: new MapEntry(6, "cognom", valueSpecifiers[3]),
        cognome: new MapEntry(7, "cognome", valueSpecifiers[3]),
        cognoms: new MapEntry(7, "cognoms", valueSpecifiers[3]),
        compagnie: new MapEntry(9, "compagnie", valueSpecifiers[13]),
        companie: new MapEntry(8, "companie", valueSpecifiers[13]),
        company: new MapEntry(7, "company", valueSpecifiers[13]),
        "company area code": new MapEntry(17, "company area code", valueSpecifiers[15]),
        "company areacode": new MapEntry(16, "company areacode", valueSpecifiers[15]),
        "company phone": new MapEntry(13, "company phone", valueSpecifiers[15]),
        "company title": new MapEntry(13, "company title", valueSpecifiers[5]),
        companyareacode: new MapEntry(15, "companyareacode", valueSpecifiers[15]),
        companyia: new MapEntry(9, "companyia", valueSpecifiers[13]),
        companyphone: new MapEntry(12, "companyphone", valueSpecifiers[15]),
        compleanno: new MapEntry(10, "compleanno", valueSpecifiers[4]),
        corporation: new MapEntry(11, "corporation", valueSpecifiers[13]),
        "correo electrónico": new MapEntry(18, "correo electrónico", valueSpecifiers[6]),
        "correu electrònic": new MapEntry(17, "correu electrònic", valueSpecifiers[6]),
        country: new MapEntry(7, "country", valueSpecifiers[11]),
        courriel: new MapEntry(8, "courriel", valueSpecifiers[6]),
        "courrier électronique": new MapEntry(21, "courrier électronique", valueSpecifiers[6]),
        cp: new MapEntry(2, "cp", valueSpecifiers[10]),
        "cumpleaños": new MapEntry(10, "cumpleaños", valueSpecifiers[4]),
        "càrrec": new MapEntry(6, "càrrec", valueSpecifiers[5]),
        "cé": new MapEntry(2, "cé", valueSpecifiers[6]),
        "código de área": new MapEntry(14, "código de área", valueSpecifiers[12]),
        "código de área (celular)": new MapEntry(24, "código de área (celular)", valueSpecifiers[16]),
        "código de área (diurno)": new MapEntry(23, "código de área (diurno)", valueSpecifiers[15]),
        "código de área (empresa)": new MapEntry(24, "código de área (empresa)", valueSpecifiers[15]),
        "código de área (local)": new MapEntry(22, "código de área (local)", valueSpecifiers[14]),
        "código de área (noturno)": new MapEntry(24, "código de área (noturno)", valueSpecifiers[14]),
        "código de área (pager)": new MapEntry(22, "código de área (pager)", valueSpecifiers[17]),
        "código de área (trabalho)": new MapEntry(25, "código de área (trabalho)", valueSpecifiers[15]),
        "código de área comercial": new MapEntry(24, "código de área comercial", valueSpecifiers[15]),
        "código de área da empresa": new MapEntry(25, "código de área da empresa", valueSpecifiers[15]),
        "código de área de casa": new MapEntry(22, "código de área de casa", valueSpecifiers[14]),
        "código de área de dia": new MapEntry(21, "código de área de dia", valueSpecifiers[15]),
        "código de área do celular": new MapEntry(25, "código de área do celular", valueSpecifiers[16]),
        "código de área do pager": new MapEntry(23, "código de área do pager", valueSpecifiers[17]),
        "código de área do telemóvel": new MapEntry(27, "código de área do telemóvel", valueSpecifiers[16]),
        "código de área do trabalho": new MapEntry(26, "código de área do trabalho", valueSpecifiers[15]),
        "código de área noite": new MapEntry(20, "código de área noite", valueSpecifiers[14]),
        "código postal": new MapEntry(13, "código postal", valueSpecifiers[10]),
        "códigodeárea": new MapEntry(12, "códigodeárea", valueSpecifiers[12]),
        "códigodeárea comercial": new MapEntry(22, "códigodeárea comercial", valueSpecifiers[15]),
        "códigodeárea da empresa": new MapEntry(23, "códigodeárea da empresa", valueSpecifiers[15]),
        "códigodeárea de casa": new MapEntry(20, "códigodeárea de casa", valueSpecifiers[14]),
        "códigodeárea de dia": new MapEntry(19, "códigodeárea de dia", valueSpecifiers[15]),
        "códigodeárea do celular": new MapEntry(23, "códigodeárea do celular", valueSpecifiers[16]),
        "códigodeárea do pager": new MapEntry(21, "códigodeárea do pager", valueSpecifiers[17]),
        "códigodeárea do telemóvel": new MapEntry(25, "códigodeárea do telemóvel", valueSpecifiers[16]),
        "códigodeárea do trabalho": new MapEntry(24, "códigodeárea do trabalho", valueSpecifiers[15]),
        "códigodeárea noite": new MapEntry(18, "códigodeárea noite", valueSpecifiers[14]),
        "códigodeáreacomercial": new MapEntry(21, "códigodeáreacomercial", valueSpecifiers[15]),
        "códigodeáreadaempresa": new MapEntry(21, "códigodeáreadaempresa", valueSpecifiers[15]),
        "códigodeáreadecasa": new MapEntry(18, "códigodeáreadecasa", valueSpecifiers[14]),
        "códigodeáreadedia": new MapEntry(17, "códigodeáreadedia", valueSpecifiers[15]),
        "códigodeáreadocelular": new MapEntry(21, "códigodeáreadocelular", valueSpecifiers[16]),
        "códigodeáreadopager": new MapEntry(19, "códigodeáreadopager", valueSpecifiers[17]),
        "códigodeáreadotelemóvel": new MapEntry(23, "códigodeáreadotelemóvel", valueSpecifiers[16]),
        "códigodeáreadotrabalho": new MapEntry(22, "códigodeáreadotrabalho", valueSpecifiers[15]),
        "códigodeáreanoite": new MapEntry(17, "códigodeáreanoite", valueSpecifiers[14]),
        "códigopostal": new MapEntry(12, "códigopostal", valueSpecifiers[10]),
        dagretningsnummer: new MapEntry(17, "dagretningsnummer", valueSpecifiers[15]),
        dagstelefon: new MapEntry(11, "dagstelefon", valueSpecifiers[15]),
        dagtelefon: new MapEntry(10, "dagtelefon", valueSpecifiers[15]),
        "data de naixença": new MapEntry(16, "data de naixença", valueSpecifiers[4]),
        "data de nascimento": new MapEntry(18, "data de nascimento", valueSpecifiers[4]),
        "data di nascita": new MapEntry(15, "data di nascita", valueSpecifiers[4]),
        "data nașterii": new MapEntry(13, "data nașterii", valueSpecifiers[4]),
        "data urodzenia": new MapEntry(14, "data urodzenia", valueSpecifiers[4]),
        "date de naissance": new MapEntry(17, "date de naissance", valueSpecifiers[4]),
        "date of birth": new MapEntry(13, "date of birth", valueSpecifiers[4]),
        "datum rođenja": new MapEntry(13, "datum rođenja", valueSpecifiers[4]),
        "day area code": new MapEntry(13, "day area code", valueSpecifiers[15]),
        "day areacode": new MapEntry(12, "day areacode", valueSpecifiers[15]),
        "day phone": new MapEntry(9, "day phone", valueSpecifiers[15]),
        dayareacode: new MapEntry(11, "dayareacode", valueSpecifiers[15]),
        dayphone: new MapEntry(8, "dayphone", valueSpecifiers[15]),
        "daytime phone": new MapEntry(13, "daytime phone", valueSpecifiers[15]),
        "daytime telephone": new MapEntry(17, "daytime telephone", valueSpecifiers[15]),
        delstat: new MapEntry(7, "delstat", valueSpecifiers[9]),
        "denná predvoľba": new MapEntry(15, "denná predvoľba", valueSpecifiers[15]),
        "denné číslo": new MapEntry(11, "denné číslo", valueSpecifiers[15]),
        "denný telefón": new MapEntry(13, "denný telefón", valueSpecifiers[15]),
        "deuxième prénom": new MapEntry(15, "deuxième prénom", valueSpecifiers[2]),
        "dirección": new MapEntry(9, "dirección", valueSpecifiers[7]),
        "dirección 1": new MapEntry(11, "dirección 1", valueSpecifiers[7]),
        "dirección1": new MapEntry(10, "dirección1", valueSpecifiers[7]),
        "dnevni telefon": new MapEntry(14, "dnevni telefon", valueSpecifiers[15]),
        dojavnik: new MapEntry(8, "dojavnik", valueSpecifiers[17]),
        "domáca predvoľba": new MapEntry(16, "domáca predvoľba", valueSpecifiers[14]),
        "domáci telefón": new MapEntry(14, "domáci telefón", valueSpecifiers[14]),
        dopnamn: new MapEntry(7, "dopnamn", valueSpecifiers[1]),
        "doğum": new MapEntry(5, "doğum", valueSpecifiers[4]),
        "doğum günü": new MapEntry(10, "doğum günü", valueSpecifiers[4]),
        "doğum tarihi": new MapEntry(12, "doğum tarihi", valueSpecifiers[4]),
        "doğumgünü": new MapEntry(9, "doğumgünü", valueSpecifiers[4]),
        drugie: new MapEntry(6, "drugie", valueSpecifiers[2]),
        "drugie imię": new MapEntry(11, "drugie imię", valueSpecifiers[2]),
        "drugo ime": new MapEntry(9, "drugo ime", valueSpecifiers[2]),
        "država": new MapEntry(6, "država", valueSpecifiers[9]),
        "dátum narodenia": new MapEntry(15, "dátum narodenia", valueSpecifiers[4]),
        "døbenavn": new MapEntry(8, "døbenavn", valueSpecifiers[1]),
        "døpenavn": new MapEntry(8, "døpenavn", valueSpecifiers[1]),
        "e-mail": new MapEntry(6, "e-mail", valueSpecifiers[6]),
        "e-mail adresa": new MapEntry(13, "e-mail adresa", valueSpecifiers[6]),
        "e-mail 주소": new MapEntry(9, "e-mail 주소", valueSpecifiers[6]),
        "e-mail주소": new MapEntry(8, "e-mail주소", valueSpecifiers[6]),
        "e-navn": new MapEntry(6, "e-navn", valueSpecifiers[3]),
        "e-post": new MapEntry(6, "e-post", valueSpecifiers[6]),
        "e-posta": new MapEntry(7, "e-posta", valueSpecifiers[6]),
        "e-posta adresi": new MapEntry(14, "e-posta adresi", valueSpecifiers[6]),
        "e-postadr": new MapEntry(9, "e-postadr", valueSpecifiers[6]),
        "e-postadress": new MapEntry(12, "e-postadress", valueSpecifiers[6]),
        "e-postadresse": new MapEntry(13, "e-postadresse", valueSpecifiers[6]),
        "e-pošta": new MapEntry(7, "e-pošta", valueSpecifiers[6]),
        efter: new MapEntry(5, "efter", valueSpecifiers[3]),
        "eftern.": new MapEntry(7, "eftern.", valueSpecifiers[3]),
        efternamn: new MapEntry(9, "efternamn", valueSpecifiers[3]),
        email: new MapEntry(5, "email", valueSpecifiers[6]),
        "email 주소": new MapEntry(8, "email 주소", valueSpecifiers[6]),
        emailAddr: new MapEntry(9, "emailAddr", valueSpecifiers[6]),
        emailAddress: new MapEntry(12, "emailAddress", valueSpecifiers[6]),
        emailAdr: new MapEntry(8, "emailAdr", valueSpecifiers[6]),
        emailAdresa: new MapEntry(11, "emailAdresa", valueSpecifiers[6]),
        "email주소": new MapEntry(7, "email주소", valueSpecifiers[6]),
        emejl: new MapEntry(5, "emejl", valueSpecifiers[6]),
        empresa: new MapEntry(7, "empresa", valueSpecifiers[13]),
        enamn: new MapEntry(5, "enamn", valueSpecifiers[3]),
        enavn: new MapEntry(5, "enavn", valueSpecifiers[3]),
        "endereço": new MapEntry(8, "endereço", valueSpecifiers[7]),
        "endereço 1": new MapEntry(10, "endereço 1", valueSpecifiers[7]),
        "endereço da rua": new MapEntry(15, "endereço da rua", valueSpecifiers[7]),
        "endereço1": new MapEntry(9, "endereço1", valueSpecifiers[7]),
        enterAddressAddressLine: new MapEntry(23, "enterAddressAddressLine", valueSpecifiers[7]),
        entreprise: new MapEntry(10, "entreprise", valueSpecifiers[13]),
        epost: new MapEntry(5, "epost", valueSpecifiers[6]),
        eposta: new MapEntry(6, "eposta", valueSpecifiers[6]),
        "eposta adresi": new MapEntry(13, "eposta adresi", valueSpecifiers[6]),
        epostadress: new MapEntry(11, "epostadress", valueSpecifiers[6]),
        estado: new MapEntry(6, "estado", valueSpecifiers[9]),
        estat: new MapEntry(5, "estat", valueSpecifiers[9]),
        "etter-": new MapEntry(6, "etter-", valueSpecifiers[3]),
        etternavn: new MapEntry(9, "etternavn", valueSpecifiers[3]),
        etu: new MapEntry(3, "etu", valueSpecifiers[1]),
        "etun.": new MapEntry(5, "etun.", valueSpecifiers[1]),
        etunimi: new MapEntry(7, "etunimi", valueSpecifiers[1]),
        "ev alan kodu": new MapEntry(12, "ev alan kodu", valueSpecifiers[14]),
        "ev telefonu": new MapEntry(11, "ev telefonu", valueSpecifiers[14]),
        "evening area code": new MapEntry(17, "evening area code", valueSpecifiers[14]),
        "evening areacode": new MapEntry(16, "evening areacode", valueSpecifiers[14]),
        "evening phone": new MapEntry(13, "evening phone", valueSpecifiers[14]),
        eveningareacode: new MapEntry(15, "eveningareacode", valueSpecifiers[14]),
        eveningphone: new MapEntry(12, "eveningphone", valueSpecifiers[14]),
        exchange: new MapEntry(8, "exchange", valueSpecifiers[12]),
        eyalet: new MapEntry(6, "eyalet", valueSpecifiers[9]),
        "f name": new MapEntry(6, "f name", valueSpecifiers[1]),
        "f-navn": new MapEntry(6, "f-navn", valueSpecifiers[1]),
        faks: new MapEntry(4, "faks", valueSpecifiers[12]),
        "faks numarası": new MapEntry(13, "faks numarası", valueSpecifiers[12]),
        faksi: new MapEntry(5, "faksi", valueSpecifiers[12]),
        familie: new MapEntry(7, "familie", valueSpecifiers[3]),
        familienavn: new MapEntry(11, "familienavn", valueSpecifiers[3]),
        familjenamn: new MapEntry(11, "familjenamn", valueSpecifiers[3]),
        fax: new MapEntry(3, "fax", valueSpecifiers[12]),
        "fecha de nacimiento": new MapEntry(19, "fecha de nacimiento", valueSpecifiers[4]),
        feina: new MapEntry(5, "feina", valueSpecifiers[5]),
        "firemné číslo": new MapEntry(13, "firemné číslo", valueSpecifiers[15]),
        "firemný telefón": new MapEntry(15, "firemný telefón", valueSpecifiers[15]),
        firma: new MapEntry(5, "firma", valueSpecifiers[13]),
        firmaretningsnummer: new MapEntry(19, "firmaretningsnummer", valueSpecifiers[15]),
        firmatelfon: new MapEntry(11, "firmatelfon", valueSpecifiers[15]),
        firmenname: new MapEntry(10, "firmenname", valueSpecifiers[13]),
        first: new MapEntry(5, "first", valueSpecifiers[1]),
        "first and last": new MapEntry(14, "first and last", valueSpecifiers[0]),
        "first and last name": new MapEntry(19, "first and last name", valueSpecifiers[0]),
        "first name": new MapEntry(10, "first name", valueSpecifiers[1]),
        firstname: new MapEntry(9, "firstname", valueSpecifiers[1]),
        fname: new MapEntry(5, "fname", valueSpecifiers[1]),
        fnamn: new MapEntry(5, "fnamn", valueSpecifiers[1]),
        fnavn: new MapEntry(5, "fnavn", valueSpecifiers[1]),
        "for-": new MapEntry(4, "for-", valueSpecifiers[1]),
        "forbogstav, mellemnavn": new MapEntry(22, "forbogstav, mellemnavn", valueSpecifiers[2]),
        "forbokstav, mellomnavn": new MapEntry(22, "forbokstav, mellomnavn", valueSpecifiers[2]),
        forename: new MapEntry(8, "forename", valueSpecifiers[1]),
        fornavn: new MapEntry(7, "fornavn", valueSpecifiers[1]),
        "fulde navn": new MapEntry(10, "fulde navn", valueSpecifiers[0]),
        "fuldt navn": new MapEntry(10, "fuldt navn", valueSpecifiers[0]),
        "full name": new MapEntry(9, "full name", valueSpecifiers[0]),
        fullname: new MapEntry(8, "fullname", valueSpecifiers[0]),
        "fullständigt namn": new MapEntry(17, "fullständigt namn", valueSpecifiers[0]),
        "fullt navn": new MapEntry(10, "fullt navn", valueSpecifiers[0]),
        fulltnavn: new MapEntry(9, "fulltnavn", valueSpecifiers[0]),
        functie: new MapEntry(7, "functie", valueSpecifiers[5]),
        "funcție": new MapEntry(7, "funcție", valueSpecifiers[5]),
        "född": new MapEntry(4, "född", valueSpecifiers[4]),
        "födelsedag": new MapEntry(10, "födelsedag", valueSpecifiers[4]),
        "födelsedatum": new MapEntry(12, "födelsedatum", valueSpecifiers[4]),
        "företag": new MapEntry(7, "företag", valueSpecifiers[13]),
        "företagstelefon": new MapEntry(15, "företagstelefon", valueSpecifiers[15]),
        "förn.": new MapEntry(5, "förn.", valueSpecifiers[1]),
        "förnamn": new MapEntry(7, "förnamn", valueSpecifiers[1]),
        "fødselsdag": new MapEntry(10, "fødselsdag", valueSpecifiers[4]),
        "fødselsdato": new MapEntry(11, "fødselsdato", valueSpecifiers[4]),
        "født": new MapEntry(4, "født", valueSpecifiers[4]),
        gade: new MapEntry(4, "gade", valueSpecifiers[7]),
        gadeadresse: new MapEntry(11, "gadeadresse", valueSpecifiers[7]),
        gata: new MapEntry(4, "gata", valueSpecifiers[7]),
        gate: new MapEntry(4, "gate", valueSpecifiers[7]),
        gateadresse: new MapEntry(11, "gateadresse", valueSpecifiers[7]),
        "gatuadr.": new MapEntry(8, "gatuadr.", valueSpecifiers[7]),
        gatuadress: new MapEntry(10, "gatuadress", valueSpecifiers[7]),
        geboortedatum: new MapEntry(13, "geboortedatum", valueSpecifiers[4]),
        geboren: new MapEntry(7, "geboren", valueSpecifiers[4]),
        "given name": new MapEntry(10, "given name", valueSpecifiers[1]),
        grad: new MapEntry(4, "grad", valueSpecifiers[8]),
        "göbek adı": new MapEntry(9, "göbek adı", valueSpecifiers[2]),
        "gündüz alan kodu": new MapEntry(16, "gündüz alan kodu", valueSpecifiers[15]),
        "gündüz telefonu": new MapEntry(15, "gündüz telefonu", valueSpecifiers[15]),
        hakulaite: new MapEntry(9, "hakulaite", valueSpecifiers[17]),
        hakulaitenro: new MapEntry(12, "hakulaitenro", valueSpecifiers[17]),
        "hakulaitteen numero": new MapEntry(19, "hakulaitteen numero", valueSpecifiers[17]),
        "hela namnet": new MapEntry(11, "hela namnet", valueSpecifiers[0]),
        hemstad: new MapEntry(7, "hemstad", valueSpecifiers[8]),
        hemtelefon: new MapEntry(10, "hemtelefon", valueSpecifiers[14]),
        hjemmetelefon: new MapEntry(13, "hjemmetelefon", valueSpecifiers[14]),
        hjemnummer: new MapEntry(10, "hjemnummer", valueSpecifiers[14]),
        "home area code": new MapEntry(14, "home area code", valueSpecifiers[14]),
        "home areacode": new MapEntry(13, "home areacode", valueSpecifiers[14]),
        "home phone": new MapEntry(10, "home phone", valueSpecifiers[14]),
        homeareacode: new MapEntry(12, "homeareacode", valueSpecifiers[14]),
        homepage: new MapEntry(8, "homepage", valueSpecifiers[25]),
        homephone: new MapEntry(9, "homephone", valueSpecifiers[14]),
        "house name": new MapEntry(10, "house name", valueSpecifiers[7]),
        icq: new MapEntry(3, "icq", valueSpecifiers[20]),
        "ikinci ad": new MapEntry(9, "ikinci ad", valueSpecifiers[2]),
        "ikinci adı": new MapEntry(10, "ikinci adı", valueSpecifiers[2]),
        "ikinci isim": new MapEntry(11, "ikinci isim", valueSpecifiers[2]),
        il: new MapEntry(2, "il", valueSpecifiers[8]),
        iltaisin: new MapEntry(8, "iltaisin", valueSpecifiers[14]),
        ime: new MapEntry(3, "ime", valueSpecifiers[0]),
        "imię": new MapEntry(4, "imię", valueSpecifiers[1]),
        "imię i nazwisko": new MapEntry(15, "imię i nazwisko", valueSpecifiers[0]),
        "ind. e-mail": new MapEntry(11, "ind. e-mail", valueSpecifiers[6]),
        "ind. posta elettronica": new MapEntry(22, "ind. posta elettronica", valueSpecifiers[6]),
        "ind. rég.": new MapEntry(9, "ind. rég.", valueSpecifiers[12]),
        indicatif: new MapEntry(9, "indicatif", valueSpecifiers[12]),
        "indicatif de zone": new MapEntry(17, "indicatif de zone", valueSpecifiers[12]),
        "indicatif régional": new MapEntry(18, "indicatif régional", valueSpecifiers[12]),
        "indicatif téléphonique": new MapEntry(22, "indicatif téléphonique", valueSpecifiers[12]),
        indirizzo: new MapEntry(9, "indirizzo", valueSpecifiers[7]),
        "indirizzo 1": new MapEntry(11, "indirizzo 1", valueSpecifiers[7]),
        "indirizzo di posta elettronica": new MapEntry(30, "indirizzo di posta elettronica", valueSpecifiers[6]),
        "indirizzo e-mail": new MapEntry(16, "indirizzo e-mail", valueSpecifiers[6]),
        "indirizzo postale": new MapEntry(17, "indirizzo postale", valueSpecifiers[7]),
        indirizzo1: new MapEntry(10, "indirizzo1", valueSpecifiers[7]),
        "inicial do 2º nome": new MapEntry(18, "inicial do 2º nome", valueSpecifiers[2]),
        "inicial do meio": new MapEntry(15, "inicial do meio", valueSpecifiers[2]),
        inicialdomeio: new MapEntry(13, "inicialdomeio", valueSpecifiers[2]),
        "iniciála stredného": new MapEntry(18, "iniciála stredného", valueSpecifiers[2]),
        "iniciála stredného mena": new MapEntry(23, "iniciála stredného mena", valueSpecifiers[2]),
        "inicjał drugiego imienia": new MapEntry(24, "inicjał drugiego imienia", valueSpecifiers[2]),
        "initiaal tweede naam": new MapEntry(20, "initiaal tweede naam", valueSpecifiers[2]),
        "initial, mellemnavn": new MapEntry(19, "initial, mellemnavn", valueSpecifiers[2]),
        "initial, mellomnavn": new MapEntry(19, "initial, mellomnavn", valueSpecifiers[2]),
        "initiale autre prénom": new MapEntry(21, "initiale autre prénom", valueSpecifiers[2]),
        "initiale deuxième prénom": new MapEntry(24, "initiale deuxième prénom", valueSpecifiers[2]),
        "initiale second prénom": new MapEntry(22, "initiale second prénom", valueSpecifiers[2]),
        iniziale: new MapEntry(8, "iniziale", valueSpecifiers[2]),
        "iniziale secondo nome": new MapEntry(21, "iniziale secondo nome", valueSpecifiers[2]),
        ir: new MapEntry(2, "ir", valueSpecifiers[12]),
        isim: new MapEntry(4, "isim", valueSpecifiers[0]),
        "iş alan kodu": new MapEntry(12, "iş alan kodu", valueSpecifiers[15]),
        "iş telefonu": new MapEntry(11, "iş telefonu", valueSpecifiers[15]),
        "iş ünvanı": new MapEntry(9, "iş ünvanı", valueSpecifiers[5]),
        jabber: new MapEntry(6, "jabber", valueSpecifiers[21]),
        "job title": new MapEntry(9, "job title", valueSpecifiers[5]),
        jobbretningsnummer: new MapEntry(18, "jobbretningsnummer", valueSpecifiers[15]),
        jobbtelefon: new MapEntry(11, "jobbtelefon", valueSpecifiers[15]),
        jobbtitel: new MapEntry(9, "jobbtitel", valueSpecifiers[5]),
        jobtitle: new MapEntry(8, "jobtitle", valueSpecifiers[5]),
        "județ": new MapEntry(5, "județ", valueSpecifiers[9]),
        "k.": new MapEntry(2, "k.", valueSpecifiers[7]),
        katu: new MapEntry(4, "katu", valueSpecifiers[7]),
        katuosoite: new MapEntry(10, "katuosoite", valueSpecifiers[7]),
        kaupunki: new MapEntry(8, "kaupunki", valueSpecifiers[8]),
        "kodin suuntanumero": new MapEntry(18, "kodin suuntanumero", valueSpecifiers[14]),
        "koko nimi": new MapEntry(9, "koko nimi", valueSpecifiers[0]),
        kommun: new MapEntry(6, "kommun", valueSpecifiers[8]),
        kontor: new MapEntry(6, "kontor", valueSpecifiers[13]),
        kontorstelefon: new MapEntry(14, "kontorstelefon", valueSpecifiers[15]),
        koti: new MapEntry(4, "koti", valueSpecifiers[14]),
        kotinro: new MapEntry(7, "kotinro", valueSpecifiers[14]),
        kotinumero: new MapEntry(10, "kotinumero", valueSpecifiers[14]),
        "kotipuh.": new MapEntry(8, "kotipuh.", valueSpecifiers[14]),
        kotipuhelin: new MapEntry(11, "kotipuhelin", valueSpecifiers[14]),
        krajina: new MapEntry(7, "krajina", valueSpecifiers[11]),
        "krst meno": new MapEntry(9, "krst meno", valueSpecifiers[1]),
        "krst. meno": new MapEntry(10, "krst. meno", valueSpecifiers[1]),
        "krstné": new MapEntry(6, "krstné", valueSpecifiers[1]),
        "krstné meno": new MapEntry(11, "krstné meno", valueSpecifiers[1]),
        "kuruluş": new MapEntry(7, "kuruluş", valueSpecifiers[13]),
        kurum: new MapEntry(5, "kurum", valueSpecifiers[13]),
        kutsumanimi: new MapEntry(11, "kutsumanimi", valueSpecifiers[1]),
        "kućna adresa": new MapEntry(12, "kućna adresa", valueSpecifiers[7]),
        "kućni telefon": new MapEntry(13, "kućni telefon", valueSpecifiers[14]),
        kveldsretningsnummer: new MapEntry(20, "kveldsretningsnummer", valueSpecifiers[14]),
        kveldstelefon: new MapEntry(13, "kveldstelefon", valueSpecifiers[14]),
        "kvällsnummer": new MapEntry(12, "kvällsnummer", valueSpecifiers[14]),
        "l name": new MapEntry(6, "l name", valueSpecifiers[3]),
        land: new MapEntry(4, "land", valueSpecifiers[11]),
        last: new MapEntry(4, "last", valueSpecifiers[3]),
        "last name": new MapEntry(9, "last name", valueSpecifiers[3]),
        lastname: new MapEntry(8, "lastname", valueSpecifiers[3]),
        "linea indirizzo": new MapEntry(15, "linea indirizzo", valueSpecifiers[7]),
        "lloc de treball": new MapEntry(15, "lloc de treball", valueSpecifiers[5]),
        lname: new MapEntry(5, "lname", valueSpecifiers[3]),
        "län": new MapEntry(3, "län", valueSpecifiers[9]),
        "lääni": new MapEntry(5, "lääni", valueSpecifiers[9]),
        "m-navn": new MapEntry(6, "m-navn", valueSpecifiers[2]),
        maa: new MapEntry(3, "maa", valueSpecifiers[11]),
        mail: new MapEntry(4, "mail", valueSpecifiers[6]),
        "matkap.": new MapEntry(7, "matkap.", valueSpecifiers[16]),
        "matkapuhelimen operaattoritunnus": new MapEntry(32, "matkapuhelimen operaattoritunnus", valueSpecifiers[16]),
        matkapuhelin: new MapEntry(12, "matkapuhelin", valueSpecifiers[16]),
        matronyme: new MapEntry(9, "matronyme", valueSpecifiers[2]),
        meio: new MapEntry(4, "meio", valueSpecifiers[2]),
        mejl: new MapEntry(4, "mejl", valueSpecifiers[6]),
        mejladress: new MapEntry(10, "mejladress", valueSpecifiers[6]),
        mellan: new MapEntry(6, "mellan", valueSpecifiers[2]),
        "mellan initial": new MapEntry(14, "mellan initial", valueSpecifiers[2]),
        mellaninitial: new MapEntry(13, "mellaninitial", valueSpecifiers[2]),
        mellannamn: new MapEntry(10, "mellannamn", valueSpecifiers[2]),
        mellem: new MapEntry(6, "mellem", valueSpecifiers[2]),
        "mellem navn": new MapEntry(11, "mellem navn", valueSpecifiers[2]),
        "mellom-": new MapEntry(7, "mellom-", valueSpecifiers[2]),
        mellomnavn: new MapEntry(10, "mellomnavn", valueSpecifiers[2]),
        meno: new MapEntry(4, "meno", valueSpecifiers[0]),
        meslek: new MapEntry(6, "meslek", valueSpecifiers[5]),
        "mesleği": new MapEntry(7, "mesleği", valueSpecifiers[5]),
        "messagerie électronique": new MapEntry(23, "messagerie électronique", valueSpecifiers[6]),
        messageur: new MapEntry(9, "messageur", valueSpecifiers[17]),
        mesto: new MapEntry(5, "mesto", valueSpecifiers[8]),
        middle: new MapEntry(6, "middle", valueSpecifiers[2]),
        "middle initial": new MapEntry(14, "middle initial", valueSpecifiers[2]),
        "middle name": new MapEntry(11, "middle name", valueSpecifiers[2]),
        middleinitial: new MapEntry(13, "middleinitial", valueSpecifiers[2]),
        middlename: new MapEntry(10, "middlename", valueSpecifiers[2]),
        mobiel: new MapEntry(6, "mobiel", valueSpecifiers[16]),
        "mobiele telefoon": new MapEntry(16, "mobiele telefoon", valueSpecifiers[16]),
        mobiili: new MapEntry(7, "mobiili", valueSpecifiers[16]),
        mobil: new MapEntry(5, "mobil", valueSpecifiers[16]),
        "mobil telefon": new MapEntry(13, "mobil telefon", valueSpecifiers[16]),
        "mobile area code": new MapEntry(16, "mobile area code", valueSpecifiers[16]),
        "mobile areacode": new MapEntry(15, "mobile areacode", valueSpecifiers[16]),
        "mobile phone": new MapEntry(12, "mobile phone", valueSpecifiers[16]),
        mobileareacode: new MapEntry(14, "mobileareacode", valueSpecifiers[16]),
        mobilephone: new MapEntry(11, "mobilephone", valueSpecifiers[16]),
        "mobilni telefon": new MapEntry(15, "mobilni telefon", valueSpecifiers[16]),
        "mobilná predvoľba": new MapEntry(17, "mobilná predvoľba", valueSpecifiers[16]),
        "mobilný telefón": new MapEntry(15, "mobilný telefón", valueSpecifiers[16]),
        mobilretningsnummer: new MapEntry(19, "mobilretningsnummer", valueSpecifiers[16]),
        mobiltel: new MapEntry(8, "mobiltel", valueSpecifiers[16]),
        mobiltelefon: new MapEntry(12, "mobiltelefon", valueSpecifiers[16]),
        mobitel: new MapEntry(7, "mobitel", valueSpecifiers[16]),
        msn: new MapEntry(3, "msn", valueSpecifiers[22]),
        "mél.": new MapEntry(4, "mél.", valueSpecifiers[6]),
        "mòbil": new MapEntry(5, "mòbil", valueSpecifiers[16]),
        "móvil": new MapEntry(5, "móvil", valueSpecifiers[16]),
        naam: new MapEntry(4, "naam", valueSpecifiers[0]),
        nacimiento: new MapEntry(10, "nacimiento", valueSpecifiers[4]),
        naissance: new MapEntry(9, "naissance", valueSpecifiers[4]),
        "naixença": new MapEntry(8, "naixença", valueSpecifiers[4]),
        name: new MapEntry(4, "name", valueSpecifiers[0]),
        namef: new MapEntry(5, "namef", valueSpecifiers[1]),
        namel: new MapEntry(5, "namel", valueSpecifiers[3]),
        namn: new MapEntry(4, "namn", valueSpecifiers[0]),
        narodeniny: new MapEntry(10, "narodeniny", valueSpecifiers[4]),
        "narodený/á": new MapEntry(10, "narodený/á", valueSpecifiers[4]),
        nascido: new MapEntry(7, "nascido", valueSpecifiers[4]),
        "nascido(a)": new MapEntry(10, "nascido(a)", valueSpecifiers[4]),
        nascut: new MapEntry(6, "nascut", valueSpecifiers[4]),
        "nato/a": new MapEntry(6, "nato/a", valueSpecifiers[4]),
        navn: new MapEntry(4, "navn", valueSpecifiers[0]),
        nazwisko: new MapEntry(8, "nazwisko", valueSpecifiers[3]),
        netnummer: new MapEntry(9, "netnummer", valueSpecifiers[12]),
        "netnummer 's avonds": new MapEntry(19, "netnummer 's avonds", valueSpecifiers[14]),
        "netnummer GSM": new MapEntry(13, "netnummer GSM", valueSpecifiers[16]),
        "netnummer bedrijf": new MapEntry(17, "netnummer bedrijf", valueSpecifiers[15]),
        "netnummer mobiel": new MapEntry(16, "netnummer mobiel", valueSpecifiers[16]),
        "netnummer mobiele telefoon": new MapEntry(26, "netnummer mobiele telefoon", valueSpecifiers[16]),
        "netnummer overdag": new MapEntry(17, "netnummer overdag", valueSpecifiers[15]),
        "netnummer privé": new MapEntry(15, "netnummer privé", valueSpecifiers[14]),
        "netnummer semafoon": new MapEntry(18, "netnummer semafoon", valueSpecifiers[17]),
        "netnummer thuis": new MapEntry(15, "netnummer thuis", valueSpecifiers[14]),
        "netnummer werk": new MapEntry(14, "netnummer werk", valueSpecifiers[15]),
        "netnummer zakelijk": new MapEntry(18, "netnummer zakelijk", valueSpecifiers[15]),
        nick: new MapEntry(4, "nick", valueSpecifiers[18]),
        nimi: new MapEntry(4, "nimi", valueSpecifiers[0]),
        nom: new MapEntry(3, "nom", valueSpecifiers[3]),
        "nom complet": new MapEntry(11, "nom complet", valueSpecifiers[0]),
        "nom de baptême": new MapEntry(14, "nom de baptême", valueSpecifiers[1]),
        "nom de famille": new MapEntry(14, "nom de famille", valueSpecifiers[3]),
        "nom entier": new MapEntry(10, "nom entier", valueSpecifiers[0]),
        "nom matronymique": new MapEntry(16, "nom matronymique", valueSpecifiers[2]),
        "nom patronyme": new MapEntry(13, "nom patronyme", valueSpecifiers[3]),
        "nom patronymique": new MapEntry(16, "nom patronymique", valueSpecifiers[3]),
        nombre: new MapEntry(6, "nombre", valueSpecifiers[1]),
        "nombre completo": new MapEntry(15, "nombre completo", valueSpecifiers[0]),
        nome: new MapEntry(4, "nome", valueSpecifiers[1]),
        "nome completo": new MapEntry(13, "nome completo", valueSpecifiers[0]),
        "nome de baptismo": new MapEntry(16, "nome de baptismo", valueSpecifiers[1]),
        "nome do meio": new MapEntry(12, "nome do meio", valueSpecifiers[2]),
        "nome e cognome": new MapEntry(14, "nome e cognome", valueSpecifiers[0]),
        nomedomeio: new MapEntry(10, "nomedomeio", valueSpecifiers[2]),
        nume: new MapEntry(4, "nume", valueSpecifiers[0]),
        "nume botez": new MapEntry(10, "nume botez", valueSpecifiers[1]),
        "nume complet": new MapEntry(12, "nume complet", valueSpecifiers[0]),
        "nume familie": new MapEntry(12, "nume familie", valueSpecifiers[3]),
        "nume întreg": new MapEntry(11, "nume întreg", valueSpecifiers[0]),
        "numero di tel. ufficio": new MapEntry(22, "numero di tel. ufficio", valueSpecifiers[15]),
        "numero di telefono": new MapEntry(18, "numero di telefono", valueSpecifiers[12]),
        "numero di telefono casa": new MapEntry(23, "numero di telefono casa", valueSpecifiers[14]),
        "numero di telefono lavoro": new MapEntry(25, "numero di telefono lavoro", valueSpecifiers[15]),
        "numero telefono": new MapEntry(15, "numero telefono", valueSpecifiers[12]),
        nummer: new MapEntry(6, "nummer", valueSpecifiers[12]),
        "numéro de mobile": new MapEntry(16, "numéro de mobile", valueSpecifiers[16]),
        "numéro de tél.": new MapEntry(14, "numéro de tél.", valueSpecifiers[12]),
        "numéro de téléavertisseur": new MapEntry(25, "numéro de téléavertisseur", valueSpecifiers[17]),
        "numéro de téléphone": new MapEntry(19, "numéro de téléphone", valueSpecifiers[12]),
        "numéro de téléphone domicile": new MapEntry(28, "numéro de téléphone domicile", valueSpecifiers[14]),
        "numéro postal": new MapEntry(13, "numéro postal", valueSpecifiers[10]),
        "numéro postal d'acheminement": new MapEntry(28, "numéro postal d'acheminement", valueSpecifiers[10]),
        "număr de telefon": new MapEntry(16, "număr de telefon", valueSpecifiers[12]),
        "număr pager": new MapEntry(11, "număr pager", valueSpecifiers[17]),
        "număr telefon": new MapEntry(13, "număr telefon", valueSpecifiers[12]),
        "né(e) le": new MapEntry(8, "né(e) le", valueSpecifiers[4]),
        "número de telefone": new MapEntry(18, "número de telefone", valueSpecifiers[12]),
        "número de telèfon": new MapEntry(17, "número de telèfon", valueSpecifiers[12]),
        "número de teléfono": new MapEntry(18, "número de teléfono", valueSpecifiers[12]),
        "omdrådenr.": new MapEntry(10, "omdrådenr.", valueSpecifiers[12]),
        "områdenummer": new MapEntry(12, "områdenummer", valueSpecifiers[12]),
        "områdenummer om dagen": new MapEntry(21, "områdenummer om dagen", valueSpecifiers[15]),
        "områdenummer til personsøger": new MapEntry(28, "områdenummer til personsøger", valueSpecifiers[17]),
        "områdenummer, aften": new MapEntry(19, "områdenummer, aften", valueSpecifiers[14]),
        "områdenummer, arbejde": new MapEntry(21, "områdenummer, arbejde", valueSpecifiers[15]),
        "områdenummer, dag": new MapEntry(17, "områdenummer, dag", valueSpecifiers[15]),
        "områdenummer, firma": new MapEntry(19, "områdenummer, firma", valueSpecifiers[15]),
        "områdenummer, mobil": new MapEntry(19, "områdenummer, mobil", valueSpecifiers[16]),
        "områdenummer, personsøger": new MapEntry(25, "områdenummer, personsøger", valueSpecifiers[17]),
        "områdenummer, privat": new MapEntry(20, "områdenummer, privat", valueSpecifiers[14]),
        "områdenummer, selskab": new MapEntry(21, "områdenummer, selskab", valueSpecifiers[15]),
        operaattoritunnus: new MapEntry(17, "operaattoritunnus", valueSpecifiers[16]),
        "oraș": new MapEntry(4, "oraș", valueSpecifiers[8]),
        organisaatio: new MapEntry(12, "organisaatio", valueSpecifiers[13]),
        organisasjon: new MapEntry(12, "organisasjon", valueSpecifiers[13]),
        organisatie: new MapEntry(11, "organisatie", valueSpecifiers[13]),
        organisation: new MapEntry(12, "organisation", valueSpecifiers[13]),
        organisme: new MapEntry(9, "organisme", valueSpecifiers[13]),
        "organització": new MapEntry(12, "organització", valueSpecifiers[13]),
        organizacija: new MapEntry(12, "organizacija", valueSpecifiers[13]),
        "organización": new MapEntry(12, "organización", valueSpecifiers[13]),
        organizasyon: new MapEntry(12, "organizasyon", valueSpecifiers[13]),
        organization: new MapEntry(12, "organization", valueSpecifiers[13]),
        "organização": new MapEntry(11, "organização", valueSpecifiers[13]),
        "organizație": new MapEntry(11, "organizație", valueSpecifiers[13]),
        organizzazione: new MapEntry(14, "organizzazione", valueSpecifiers[13]),
        "organizácia": new MapEntry(11, "organizácia", valueSpecifiers[13]),
        ort: new MapEntry(3, "ort", valueSpecifiers[8]),
        osavaltio: new MapEntry(9, "osavaltio", valueSpecifiers[9]),
        osoite: new MapEntry(6, "osoite", valueSpecifiers[7]),
        "osoite 1": new MapEntry(8, "osoite 1", valueSpecifiers[7]),
        paese: new MapEntry(5, "paese", valueSpecifiers[11]),
        pager: new MapEntry(5, "pager", valueSpecifiers[17]),
        "pager area code": new MapEntry(15, "pager area code", valueSpecifiers[17]),
        "pager areacode": new MapEntry(14, "pager areacode", valueSpecifiers[17]),
        "pager phone": new MapEntry(11, "pager phone", valueSpecifiers[17]),
        pagerareacode: new MapEntry(13, "pagerareacode", valueSpecifiers[17]),
        pagerphone: new MapEntry(10, "pagerphone", valueSpecifiers[17]),
        pagette: new MapEntry(7, "pagette", valueSpecifiers[17]),
        pageur: new MapEntry(6, "pageur", valueSpecifiers[17]),
        paikkakunta: new MapEntry(11, "paikkakunta", valueSpecifiers[8]),
        patronyme: new MapEntry(9, "patronyme", valueSpecifiers[3]),
        pays: new MapEntry(4, "pays", valueSpecifiers[11]),
        "país": new MapEntry(4, "país", valueSpecifiers[11]),
        "personsök": new MapEntry(9, "personsök", valueSpecifiers[17]),
        "personsökare": new MapEntry(12, "personsökare", valueSpecifiers[17]),
        "personsøger": new MapEntry(11, "personsøger", valueSpecifiers[17]),
        "personsøger nr.": new MapEntry(15, "personsøger nr.", valueSpecifiers[17]),
        "personsøkernr.": new MapEntry(14, "personsøkernr.", valueSpecifiers[17]),
        "personsøkernummer": new MapEntry(17, "personsøkernummer", valueSpecifiers[17]),
        "petit nom": new MapEntry(9, "petit nom", valueSpecifiers[1]),
        phone: new MapEntry(5, "phone", valueSpecifiers[12]),
        "phone number": new MapEntry(12, "phone number", valueSpecifiers[12]),
        phonenumber: new MapEntry(11, "phonenumber", valueSpecifiers[12]),
        "pierwsze imię": new MapEntry(13, "pierwsze imię", valueSpecifiers[1]),
        plaats: new MapEntry(6, "plaats", valueSpecifiers[8]),
        pnome: new MapEntry(5, "pnome", valueSpecifiers[1]),
        pnume: new MapEntry(5, "pnume", valueSpecifiers[1]),
        posao: new MapEntry(5, "posao", valueSpecifiers[5]),
        "poslovni telefon": new MapEntry(16, "poslovni telefon", valueSpecifiers[15]),
        "post code": new MapEntry(9, "post code", valueSpecifiers[10]),
        "posta elettronica": new MapEntry(17, "posta elettronica", valueSpecifiers[6]),
        "posta kodu": new MapEntry(10, "posta kodu", valueSpecifiers[10]),
        postal: new MapEntry(6, "postal", valueSpecifiers[10]),
        "postal code": new MapEntry(11, "postal code", valueSpecifiers[10]),
        postalcode: new MapEntry(10, "postalcode", valueSpecifiers[10]),
        postcode: new MapEntry(8, "postcode", valueSpecifiers[10]),
        poste: new MapEntry(5, "poste", valueSpecifiers[5]),
        postinro: new MapEntry(8, "postinro", valueSpecifiers[10]),
        postinumero: new MapEntry(11, "postinumero", valueSpecifiers[10]),
        postitoimipaikka: new MapEntry(16, "postitoimipaikka", valueSpecifiers[8]),
        "postnr.": new MapEntry(7, "postnr.", valueSpecifiers[10]),
        postnummer: new MapEntry(10, "postnummer", valueSpecifiers[10]),
        poststed: new MapEntry(8, "poststed", valueSpecifiers[8]),
        "pozivni broj": new MapEntry(12, "pozivni broj", valueSpecifiers[12]),
        "pozícia": new MapEntry(7, "pozícia", valueSpecifiers[5]),
        "poštanski br.": new MapEntry(13, "poštanski br.", valueSpecifiers[10]),
        "poštanski broj": new MapEntry(14, "poštanski broj", valueSpecifiers[10]),
        "poštové smerovacie číslo": new MapEntry(24, "poštové smerovacie číslo", valueSpecifiers[10]),
        "pracovná pozícia": new MapEntry(16, "pracovná pozícia", valueSpecifiers[5]),
        "pracovná predvoľba": new MapEntry(18, "pracovná predvoľba", valueSpecifiers[15]),
        "pracovný telefón": new MapEntry(16, "pracovný telefón", valueSpecifiers[15]),
        "pre nume": new MapEntry(8, "pre nume", valueSpecifiers[1]),
        "predvoľba": new MapEntry(9, "predvoľba", valueSpecifiers[12]),
        "predvoľba do práce": new MapEntry(18, "predvoľba do práce", valueSpecifiers[15]),
        "predvoľba domov": new MapEntry(15, "predvoľba domov", valueSpecifiers[14]),
        "predvoľba firmy": new MapEntry(15, "predvoľba firmy", valueSpecifiers[15]),
        "predvoľba mobilného telefónu": new MapEntry(28, "predvoľba mobilného telefónu", valueSpecifiers[16]),
        "predvoľba pagera": new MapEntry(16, "predvoľba pagera", valueSpecifiers[17]),
        "predvoľba spoločnosti": new MapEntry(21, "predvoľba spoločnosti", valueSpecifiers[15]),
        "pref. cercapersone": new MapEntry(18, "pref. cercapersone", valueSpecifiers[17]),
        prefijo: new MapEntry(7, "prefijo", valueSpecifiers[12]),
        prefisso: new MapEntry(8, "prefisso", valueSpecifiers[12]),
        "prefisso cell.": new MapEntry(14, "prefisso cell.", valueSpecifiers[16]),
        "prefisso cellulare": new MapEntry(18, "prefisso cellulare", valueSpecifiers[16]),
        "prefisso cercapers.": new MapEntry(19, "prefisso cercapers.", valueSpecifiers[17]),
        "prefisso cercapersone": new MapEntry(21, "prefisso cercapersone", valueSpecifiers[17]),
        "prefisso lavoro": new MapEntry(15, "prefisso lavoro", valueSpecifiers[15]),
        "prefisso locale": new MapEntry(15, "prefisso locale", valueSpecifiers[12]),
        "prefisso numero lavoro": new MapEntry(22, "prefisso numero lavoro", valueSpecifiers[15]),
        "prefisso ore serali": new MapEntry(19, "prefisso ore serali", valueSpecifiers[14]),
        "prefisso tel. privato": new MapEntry(21, "prefisso tel. privato", valueSpecifiers[14]),
        "prefisso telefono abitazione": new MapEntry(28, "prefisso telefono abitazione", valueSpecifiers[14]),
        "prefisso telefono azienda": new MapEntry(25, "prefisso telefono azienda", valueSpecifiers[15]),
        "prefisso telefono casa": new MapEntry(22, "prefisso telefono casa", valueSpecifiers[14]),
        "prefisso telefono cellulare": new MapEntry(27, "prefisso telefono cellulare", valueSpecifiers[16]),
        "prefisso telefono di casa": new MapEntry(25, "prefisso telefono di casa", valueSpecifiers[14]),
        "prefisso telefono lavoro": new MapEntry(24, "prefisso telefono lavoro", valueSpecifiers[15]),
        "prefisso telefono ufficio": new MapEntry(25, "prefisso telefono ufficio", valueSpecifiers[15]),
        "prefisso ufficio": new MapEntry(16, "prefisso ufficio", valueSpecifiers[15]),
        prefix: new MapEntry(6, "prefix", valueSpecifiers[12]),
        "prefix mobil": new MapEntry(12, "prefix mobil", valueSpecifiers[16]),
        "prefix pager": new MapEntry(12, "prefix pager", valueSpecifiers[17]),
        "prefix telefon acasă": new MapEntry(20, "prefix telefon acasă", valueSpecifiers[14]),
        "prefix telefon birou": new MapEntry(20, "prefix telefon birou", valueSpecifiers[15]),
        "prefix telefon companie": new MapEntry(23, "prefix telefon companie", valueSpecifiers[15]),
        "prefix telefon domiciliu": new MapEntry(24, "prefix telefon domiciliu", valueSpecifiers[14]),
        "prefix telefon lucru": new MapEntry(20, "prefix telefon lucru", valueSpecifiers[15]),
        "prefix telefon seară": new MapEntry(20, "prefix telefon seară", valueSpecifiers[14]),
        "prefix telefon serviciu": new MapEntry(23, "prefix telefon serviciu", valueSpecifiers[15]),
        "prefix telefon zi": new MapEntry(17, "prefix telefon zi", valueSpecifiers[15]),
        "prefix zonal": new MapEntry(12, "prefix zonal", valueSpecifiers[12]),
        prenume: new MapEntry(7, "prenume", valueSpecifiers[1]),
        "prenume secundar": new MapEntry(16, "prenume secundar", valueSpecifiers[2]),
        prezime: new MapEntry(7, "prezime", valueSpecifiers[3]),
        primeiro: new MapEntry(8, "primeiro", valueSpecifiers[1]),
        "primeiro nome": new MapEntry(13, "primeiro nome", valueSpecifiers[1]),
        primeironome: new MapEntry(12, "primeironome", valueSpecifiers[1]),
        privat: new MapEntry(6, "privat", valueSpecifiers[14]),
        profesija: new MapEntry(9, "profesija", valueSpecifiers[5]),
        profession: new MapEntry(10, "profession", valueSpecifiers[5]),
        province: new MapEntry(8, "province", valueSpecifiers[9]),
        provincia: new MapEntry(9, "provincia", valueSpecifiers[9]),
        provins: new MapEntry(7, "provins", valueSpecifiers[9]),
        "província": new MapEntry(9, "província", valueSpecifiers[9]),
        "prénom": new MapEntry(6, "prénom", valueSpecifiers[1]),
        "prénom usuel": new MapEntry(12, "prénom usuel", valueSpecifiers[1]),
        "puesto de trabajo": new MapEntry(17, "puesto de trabajo", valueSpecifiers[5]),
        "puh.num.": new MapEntry(8, "puh.num.", valueSpecifiers[12]),
        puhelin: new MapEntry(7, "puhelin", valueSpecifiers[12]),
        "puhelin päiväsaikaan": new MapEntry(20, "puhelin päiväsaikaan", valueSpecifiers[15]),
        puhelinnro: new MapEntry(10, "puhelinnro", valueSpecifiers[12]),
        puhelinnumero: new MapEntry(13, "puhelinnumero", valueSpecifiers[12]),
        "puno ime": new MapEntry(8, "puno ime", valueSpecifiers[0]),
        "päivisin": new MapEntry(8, "päivisin", valueSpecifiers[15]),
        qq: new MapEntry(2, "qq", valueSpecifiers[23]),
        qualifica: new MapEntry(9, "qualifica", valueSpecifiers[5]),
        radiomessageur: new MapEntry(14, "radiomessageur", valueSpecifiers[17]),
        "região": new MapEntry(6, "região", valueSpecifiers[9]),
        "retningsnr.": new MapEntry(11, "retningsnr.", valueSpecifiers[12]),
        "retningsnr., personsøker": new MapEntry(24, "retningsnr., personsøker", valueSpecifiers[17]),
        retningsnummer: new MapEntry(14, "retningsnummer", valueSpecifiers[12]),
        "retningsnummer, arbeid": new MapEntry(22, "retningsnummer, arbeid", valueSpecifiers[15]),
        "retningsnummer, bedrift": new MapEntry(23, "retningsnummer, bedrift", valueSpecifiers[15]),
        "retningsnummer, dag": new MapEntry(19, "retningsnummer, dag", valueSpecifiers[15]),
        "retningsnummer, dagtid": new MapEntry(22, "retningsnummer, dagtid", valueSpecifiers[15]),
        "retningsnummer, firma": new MapEntry(21, "retningsnummer, firma", valueSpecifiers[15]),
        "retningsnummer, hjem": new MapEntry(20, "retningsnummer, hjem", valueSpecifiers[14]),
        "retningsnummer, jobb": new MapEntry(20, "retningsnummer, jobb", valueSpecifiers[15]),
        "retningsnummer, kveld": new MapEntry(21, "retningsnummer, kveld", valueSpecifiers[14]),
        "retningsnummer, kveldstid": new MapEntry(25, "retningsnummer, kveldstid", valueSpecifiers[14]),
        "retningsnummer, mobil": new MapEntry(21, "retningsnummer, mobil", valueSpecifiers[16]),
        "retningsnummer, mobiltelefon": new MapEntry(28, "retningsnummer, mobiltelefon", valueSpecifiers[16]),
        "retningsnummer, personsøker": new MapEntry(27, "retningsnummer, personsøker", valueSpecifiers[17]),
        "retningsnummer, selskap": new MapEntry(23, "retningsnummer, selskap", valueSpecifiers[15]),
        riktnr: new MapEntry(6, "riktnr", valueSpecifiers[12]),
        riktnummer: new MapEntry(10, "riktnummer", valueSpecifiers[12]),
        "riktnummer arbetet": new MapEntry(18, "riktnummer arbetet", valueSpecifiers[15]),
        "riktnummer dagtid": new MapEntry(17, "riktnummer dagtid", valueSpecifiers[15]),
        "riktnummer företaget": new MapEntry(20, "riktnummer företaget", valueSpecifiers[15]),
        "riktnummer hem": new MapEntry(14, "riktnummer hem", valueSpecifiers[14]),
        "riktnummer kontoret": new MapEntry(19, "riktnummer kontoret", valueSpecifiers[15]),
        "riktnummer kvällstid": new MapEntry(20, "riktnummer kvällstid", valueSpecifiers[14]),
        "riktnummer mobil": new MapEntry(16, "riktnummer mobil", valueSpecifiers[16]),
        "riktnummer mobiltelefon": new MapEntry(23, "riktnummer mobiltelefon", valueSpecifiers[16]),
        "riktnummer personsök": new MapEntry(20, "riktnummer personsök", valueSpecifiers[17]),
        "riktnummer personsökare": new MapEntry(23, "riktnummer personsökare", valueSpecifiers[17]),
        "rođendan": new MapEntry(8, "rođendan", valueSpecifiers[4]),
        rua: new MapEntry(3, "rua", valueSpecifiers[7]),
        rue: new MapEntry(3, "rue", valueSpecifiers[7]),
        "ruolo professionale": new MapEntry(19, "ruolo professionale", valueSpecifiers[5]),
        "récepteur de radiomessagerie": new MapEntry(28, "récepteur de radiomessagerie", valueSpecifiers[17]),
        "région": new MapEntry(6, "région", valueSpecifiers[9]),
        "s-posti": new MapEntry(7, "s-posti", valueSpecifiers[6]),
        "second prénom": new MapEntry(13, "second prénom", valueSpecifiers[2]),
        "secondo nome": new MapEntry(12, "secondo nome", valueSpecifiers[2]),
        secundar: new MapEntry(8, "secundar", valueSpecifiers[2]),
        "segon nom": new MapEntry(9, "segon nom", valueSpecifiers[2]),
        "segundo nombre": new MapEntry(14, "segundo nombre", valueSpecifiers[2]),
        selskak: new MapEntry(7, "selskak", valueSpecifiers[13]),
        selskap: new MapEntry(7, "selskap", valueSpecifiers[13]),
        semafoon: new MapEntry(8, "semafoon", valueSpecifiers[17]),
        skype: new MapEntry(5, "skype", valueSpecifiers[24]),
        "službeni telefon": new MapEntry(16, "službeni telefon", valueSpecifiers[15]),
        "smerovacie číslo": new MapEntry(16, "smerovacie číslo", valueSpecifiers[10]),
        sobrenome: new MapEntry(9, "sobrenome", valueSpecifiers[3]),
        "società": new MapEntry(7, "società", valueSpecifiers[13]),
        "société": new MapEntry(7, "société", valueSpecifiers[13]),
        soyad: new MapEntry(5, "soyad", valueSpecifiers[3]),
        "soyadı": new MapEntry(6, "soyadı", valueSpecifiers[3]),
        soyisim: new MapEntry(7, "soyisim", valueSpecifiers[3]),
        soyismi: new MapEntry(7, "soyismi", valueSpecifiers[3]),
        "spoločnosť": new MapEntry(10, "spoločnosť", valueSpecifiers[13]),
        staat: new MapEntry(5, "staat", valueSpecifiers[9]),
        stad: new MapEntry(4, "stad", valueSpecifiers[8]),
        stanowisko: new MapEntry(10, "stanowisko", valueSpecifiers[5]),
        stat: new MapEntry(4, "stat", valueSpecifiers[9]),
        state: new MapEntry(5, "state", valueSpecifiers[9]),
        stato: new MapEntry(5, "stato", valueSpecifiers[9]),
        sted: new MapEntry(4, "sted", valueSpecifiers[8]),
        stilling: new MapEntry(8, "stilling", valueSpecifiers[5]),
        straat: new MapEntry(6, "straat", valueSpecifiers[7]),
        strada: new MapEntry(6, "strada", valueSpecifiers[7]),
        "stredné": new MapEntry(7, "stredné", valueSpecifiers[2]),
        "stredné meno": new MapEntry(12, "stredné meno", valueSpecifiers[2]),
        street: new MapEntry(6, "street", valueSpecifiers[7]),
        "street address": new MapEntry(14, "street address", valueSpecifiers[7]),
        streetaddress: new MapEntry(13, "streetaddress", valueSpecifiers[7]),
        suku: new MapEntry(4, "suku", valueSpecifiers[3]),
        "sukun.": new MapEntry(6, "sukun.", valueSpecifiers[3]),
        sukunimi: new MapEntry(8, "sukunimi", valueSpecifiers[3]),
        surname: new MapEntry(7, "surname", valueSpecifiers[3]),
        suuntanro: new MapEntry(9, "suuntanro", valueSpecifiers[12]),
        suuntanumero: new MapEntry(12, "suuntanumero", valueSpecifiers[12]),
        "suuntanumero iltaisin": new MapEntry(21, "suuntanumero iltaisin", valueSpecifiers[14]),
        "suuntanumero koti": new MapEntry(17, "suuntanumero koti", valueSpecifiers[14]),
        "suuntanumero työ": new MapEntry(16, "suuntanumero työ", valueSpecifiers[15]),
        "suuntanumero yritys": new MapEntry(19, "suuntanumero yritys", valueSpecifiers[15]),
        "syntymäpäivä": new MapEntry(12, "syntymäpäivä", valueSpecifiers[4]),
        syntynyt: new MapEntry(8, "syntynyt", valueSpecifiers[4]),
        "sähköposti": new MapEntry(10, "sähköposti", valueSpecifiers[6]),
        "sähköpostiosoite": new MapEntry(16, "sähköpostiosoite", valueSpecifiers[6]),
        "sémaphone": new MapEntry(9, "sémaphone", valueSpecifiers[17]),
        "tam ad": new MapEntry(6, "tam ad", valueSpecifiers[0]),
        "tam adı": new MapEntry(7, "tam adı", valueSpecifiers[0]),
        "tam isim": new MapEntry(8, "tam isim", valueSpecifiers[0]),
        tel: new MapEntry(3, "tel", valueSpecifiers[12]),
        "tel.": new MapEntry(4, "tel.", valueSpecifiers[12]),
        "tel. lavoro": new MapEntry(11, "tel. lavoro", valueSpecifiers[15]),
        "tel. ufficio": new MapEntry(12, "tel. ufficio", valueSpecifiers[15]),
        "tel. číslo": new MapEntry(10, "tel. číslo", valueSpecifiers[12]),
        telefon: new MapEntry(7, "telefon", valueSpecifiers[12]),
        "telefon (cep)": new MapEntry(13, "telefon (cep)", valueSpecifiers[16]),
        "telefon (ev)": new MapEntry(12, "telefon (ev)", valueSpecifiers[14]),
        "telefon (iş)": new MapEntry(12, "telefon (iş)", valueSpecifiers[15]),
        "telefon acasă": new MapEntry(13, "telefon acasă", valueSpecifiers[14]),
        "telefon arbetet": new MapEntry(15, "telefon arbetet", valueSpecifiers[15]),
        "telefon birou": new MapEntry(13, "telefon birou", valueSpecifiers[15]),
        "telefon celular": new MapEntry(15, "telefon celular", valueSpecifiers[16]),
        "telefon companie": new MapEntry(16, "telefon companie", valueSpecifiers[15]),
        "telefon dagtid": new MapEntry(14, "telefon dagtid", valueSpecifiers[15]),
        "telefon domiciliu": new MapEntry(17, "telefon domiciliu", valueSpecifiers[14]),
        "telefon företaget": new MapEntry(17, "telefon företaget", valueSpecifiers[15]),
        "telefon hem": new MapEntry(11, "telefon hem", valueSpecifiers[14]),
        "telefon kontoret": new MapEntry(16, "telefon kontoret", valueSpecifiers[15]),
        "telefon kvällstid": new MapEntry(17, "telefon kvällstid", valueSpecifiers[14]),
        "telefon lucru": new MapEntry(13, "telefon lucru", valueSpecifiers[15]),
        "telefon mobil": new MapEntry(13, "telefon mobil", valueSpecifiers[16]),
        "telefon no": new MapEntry(10, "telefon no", valueSpecifiers[12]),
        "telefon numarası": new MapEntry(16, "telefon numarası", valueSpecifiers[12]),
        "telefon pager": new MapEntry(13, "telefon pager", valueSpecifiers[17]),
        "telefon seară": new MapEntry(13, "telefon seară", valueSpecifiers[14]),
        "telefon serviciu": new MapEntry(16, "telefon serviciu", valueSpecifiers[15]),
        "telefon tvrtke": new MapEntry(14, "telefon tvrtke", valueSpecifiers[15]),
        "telefon zi": new MapEntry(10, "telefon zi", valueSpecifiers[15]),
        "telefon, aften": new MapEntry(14, "telefon, aften", valueSpecifiers[14]),
        "telefon, arbeid": new MapEntry(15, "telefon, arbeid", valueSpecifiers[15]),
        "telefon, arbejde": new MapEntry(16, "telefon, arbejde", valueSpecifiers[15]),
        "telefon, dag": new MapEntry(12, "telefon, dag", valueSpecifiers[15]),
        "telefon, dagtid": new MapEntry(15, "telefon, dagtid", valueSpecifiers[15]),
        "telefon, firma": new MapEntry(14, "telefon, firma", valueSpecifiers[15]),
        "telefon, hjem": new MapEntry(13, "telefon, hjem", valueSpecifiers[14]),
        "telefon, jobb": new MapEntry(13, "telefon, jobb", valueSpecifiers[15]),
        "telefon, kveldstid": new MapEntry(18, "telefon, kveldstid", valueSpecifiers[14]),
        "telefon, mobil": new MapEntry(14, "telefon, mobil", valueSpecifiers[16]),
        telefone: new MapEntry(8, "telefone", valueSpecifiers[12]),
        "telefone (casa)": new MapEntry(15, "telefone (casa)", valueSpecifiers[14]),
        "telefone (celular)": new MapEntry(18, "telefone (celular)", valueSpecifiers[16]),
        "telefone (diurno)": new MapEntry(17, "telefone (diurno)", valueSpecifiers[15]),
        "telefone (empresa)": new MapEntry(18, "telefone (empresa)", valueSpecifiers[15]),
        "telefone (noturno)": new MapEntry(18, "telefone (noturno)", valueSpecifiers[14]),
        "telefone (pager)": new MapEntry(16, "telefone (pager)", valueSpecifiers[17]),
        "telefone (trabalho)": new MapEntry(19, "telefone (trabalho)", valueSpecifiers[15]),
        "telefone celular": new MapEntry(16, "telefone celular", valueSpecifiers[16]),
        "telefone comercial": new MapEntry(18, "telefone comercial", valueSpecifiers[15]),
        "telefone da empresa": new MapEntry(19, "telefone da empresa", valueSpecifiers[15]),
        "telefone de casa": new MapEntry(16, "telefone de casa", valueSpecifiers[14]),
        "telefone de dia": new MapEntry(15, "telefone de dia", valueSpecifiers[15]),
        "telefone do trabalho": new MapEntry(20, "telefone do trabalho", valueSpecifiers[15]),
        "telefone durante o dia": new MapEntry(22, "telefone durante o dia", valueSpecifiers[15]),
        "telefone pager": new MapEntry(14, "telefone pager", valueSpecifiers[17]),
        "telefone à noite": new MapEntry(16, "telefone à noite", valueSpecifiers[14]),
        telefonecelular: new MapEntry(15, "telefonecelular", valueSpecifiers[16]),
        telefonecomercial: new MapEntry(17, "telefonecomercial", valueSpecifiers[15]),
        telefonedecasa: new MapEntry(14, "telefonedecasa", valueSpecifiers[14]),
        telefonedia: new MapEntry(11, "telefonedia", valueSpecifiers[15]),
        telefoneempresa: new MapEntry(15, "telefoneempresa", valueSpecifiers[15]),
        telefonenoite: new MapEntry(13, "telefonenoite", valueSpecifiers[14]),
        telefonepager: new MapEntry(13, "telefonepager", valueSpecifiers[17]),
        telefonetrabalho: new MapEntry(16, "telefonetrabalho", valueSpecifiers[15]),
        "telefonnr.": new MapEntry(10, "telefonnr.", valueSpecifiers[12]),
        telefonnummer: new MapEntry(13, "telefonnummer", valueSpecifiers[12]),
        telefono: new MapEntry(8, "telefono", valueSpecifiers[12]),
        "telefono abitazione": new MapEntry(19, "telefono abitazione", valueSpecifiers[14]),
        "telefono azienda": new MapEntry(16, "telefono azienda", valueSpecifiers[15]),
        "telefono casa": new MapEntry(13, "telefono casa", valueSpecifiers[14]),
        "telefono cell.": new MapEntry(14, "telefono cell.", valueSpecifiers[16]),
        "telefono cellulare": new MapEntry(18, "telefono cellulare", valueSpecifiers[16]),
        "telefono lavoro": new MapEntry(15, "telefono lavoro", valueSpecifiers[15]),
        "telefono ore serali": new MapEntry(19, "telefono ore serali", valueSpecifiers[14]),
        "telefono ore ufficio": new MapEntry(20, "telefono ore ufficio", valueSpecifiers[15]),
        "telefono privato": new MapEntry(16, "telefono privato", valueSpecifiers[14]),
        "telefono ufficio": new MapEntry(16, "telefono ufficio", valueSpecifiers[15]),
        "telefonski broj": new MapEntry(15, "telefonski broj", valueSpecifiers[12]),
        "telefoon 's avonds": new MapEntry(18, "telefoon 's avonds", valueSpecifiers[14]),
        "telefoon bedrijf": new MapEntry(16, "telefoon bedrijf", valueSpecifiers[15]),
        "telefoon overdag": new MapEntry(16, "telefoon overdag", valueSpecifiers[15]),
        "telefoon privé": new MapEntry(14, "telefoon privé", valueSpecifiers[14]),
        "telefoon thuis": new MapEntry(14, "telefoon thuis", valueSpecifiers[14]),
        "telefoon werk": new MapEntry(13, "telefoon werk", valueSpecifiers[15]),
        "telefoon zakelijk": new MapEntry(17, "telefoon zakelijk", valueSpecifiers[15]),
        "telefoonnnummer thuis": new MapEntry(21, "telefoonnnummer thuis", valueSpecifiers[14]),
        "telefoonnummer bedrijf": new MapEntry(22, "telefoonnummer bedrijf", valueSpecifiers[15]),
        "telefoonnummer overdag": new MapEntry(22, "telefoonnummer overdag", valueSpecifiers[15]),
        "telefoonnummer privé": new MapEntry(20, "telefoonnummer privé", valueSpecifiers[14]),
        "telefoonnummer werk": new MapEntry(19, "telefoonnummer werk", valueSpecifiers[15]),
        "telefoonnummer zakelijk": new MapEntry(23, "telefoonnummer zakelijk", valueSpecifiers[15]),
        "telefón": new MapEntry(7, "telefón", valueSpecifiers[12]),
        "telefón do práce": new MapEntry(16, "telefón do práce", valueSpecifiers[15]),
        "telefón domov": new MapEntry(13, "telefón domov", valueSpecifiers[14]),
        "telefónna predvoľba": new MapEntry(19, "telefónna predvoľba", valueSpecifiers[12]),
        "telefónna predvoľba domov": new MapEntry(25, "telefónna predvoľba domov", valueSpecifiers[14]),
        "telefónne číslo": new MapEntry(15, "telefónne číslo", valueSpecifiers[12]),
        "telemóvel": new MapEntry(9, "telemóvel", valueSpecifiers[16]),
        telephone: new MapEntry(9, "telephone", valueSpecifiers[12]),
        "telèfon": new MapEntry(7, "telèfon", valueSpecifiers[12]),
        "telèfon de casa": new MapEntry(15, "telèfon de casa", valueSpecifiers[14]),
        "telèfon de la feina": new MapEntry(19, "telèfon de la feina", valueSpecifiers[15]),
        "telèfon dia": new MapEntry(11, "telèfon dia", valueSpecifiers[15]),
        "telèfon feina": new MapEntry(13, "telèfon feina", valueSpecifiers[15]),
        "telèfon mòbil": new MapEntry(13, "telèfon mòbil", valueSpecifiers[16]),
        "telèfono casa": new MapEntry(13, "telèfono casa", valueSpecifiers[14]),
        "telèfono nit": new MapEntry(12, "telèfono nit", valueSpecifiers[14]),
        "teléfono": new MapEntry(8, "teléfono", valueSpecifiers[12]),
        "teléfono casa": new MapEntry(13, "teléfono casa", valueSpecifiers[14]),
        "teléfono de casa": new MapEntry(16, "teléfono de casa", valueSpecifiers[14]),
        "teléfono del trabajo": new MapEntry(20, "teléfono del trabajo", valueSpecifiers[15]),
        "teléfono día": new MapEntry(12, "teléfono día", valueSpecifiers[15]),
        "teléfono móvil": new MapEntry(14, "teléfono móvil", valueSpecifiers[16]),
        "teléfono noche": new MapEntry(14, "teléfono noche", valueSpecifiers[14]),
        "teléfono trabajo": new MapEntry(16, "teléfono trabajo", valueSpecifiers[15]),
        titel: new MapEntry(5, "titel", valueSpecifiers[5]),
        titula: new MapEntry(6, "titula", valueSpecifiers[5]),
        "tlf.": new MapEntry(4, "tlf.", valueSpecifiers[12]),
        "toinen etunimi": new MapEntry(14, "toinen etunimi", valueSpecifiers[2]),
        "toinen nimi": new MapEntry(11, "toinen nimi", valueSpecifiers[2]),
        trabajo: new MapEntry(7, "trabajo", valueSpecifiers[5]),
        tvrtka: new MapEntry(6, "tvrtka", valueSpecifiers[13]),
        "työnumero": new MapEntry(9, "työnumero", valueSpecifiers[15]),
        "työnumeron suuntanumero": new MapEntry(23, "työnumeron suuntanumero", valueSpecifiers[15]),
        "työpuhelimen suuntanumero": new MapEntry(25, "työpuhelimen suuntanumero", valueSpecifiers[15]),
        "työpuhelin": new MapEntry(10, "työpuhelin", valueSpecifiers[15]),
        "täydellinen nimi": new MapEntry(16, "täydellinen nimi", valueSpecifiers[0]),
        "tél.": new MapEntry(4, "tél.", valueSpecifiers[12]),
        "tél. cell.": new MapEntry(10, "tél. cell.", valueSpecifiers[16]),
        "téléav.": new MapEntry(7, "téléav.", valueSpecifiers[17]),
        "téléavertisseur": new MapEntry(15, "téléavertisseur", valueSpecifiers[17]),
        "téléc.": new MapEntry(6, "téléc.", valueSpecifiers[12]),
        "télécopie": new MapEntry(9, "télécopie", valueSpecifiers[12]),
        "télécopieur": new MapEntry(11, "télécopieur", valueSpecifiers[12]),
        "téléphone": new MapEntry(9, "téléphone", valueSpecifiers[12]),
        "téléphone (entreprise)": new MapEntry(22, "téléphone (entreprise)", valueSpecifiers[15]),
        "téléphone (jour)": new MapEntry(16, "téléphone (jour)", valueSpecifiers[15]),
        "téléphone (journée)": new MapEntry(19, "téléphone (journée)", valueSpecifiers[15]),
        "téléphone (le soir)": new MapEntry(19, "téléphone (le soir)", valueSpecifiers[14]),
        "téléphone (société)": new MapEntry(19, "téléphone (société)", valueSpecifiers[15]),
        "téléphone (soirée)": new MapEntry(18, "téléphone (soirée)", valueSpecifiers[14]),
        "téléphone bureau": new MapEntry(16, "téléphone bureau", valueSpecifiers[15]),
        "téléphone cellulaire": new MapEntry(20, "téléphone cellulaire", valueSpecifiers[16]),
        "téléphone cellulaire portable": new MapEntry(29, "téléphone cellulaire portable", valueSpecifiers[16]),
        "téléphone cellulaire portatif": new MapEntry(29, "téléphone cellulaire portatif", valueSpecifiers[16]),
        "téléphone de domicile": new MapEntry(21, "téléphone de domicile", valueSpecifiers[14]),
        "téléphone de résidence": new MapEntry(22, "téléphone de résidence", valueSpecifiers[14]),
        "téléphone de travail": new MapEntry(20, "téléphone de travail", valueSpecifiers[15]),
        "téléphone domicile": new MapEntry(18, "téléphone domicile", valueSpecifiers[14]),
        "téléphone maison": new MapEntry(16, "téléphone maison", valueSpecifiers[14]),
        "téléphone mobile": new MapEntry(16, "téléphone mobile", valueSpecifiers[16]),
        "téléphone portable": new MapEntry(18, "téléphone portable", valueSpecifiers[16]),
        "téléphone privé": new MapEntry(15, "téléphone privé", valueSpecifiers[14]),
        "téléphone professionnel": new MapEntry(23, "téléphone professionnel", valueSpecifiers[15]),
        "téléphone résidentiel": new MapEntry(21, "téléphone résidentiel", valueSpecifiers[14]),
        ulica: new MapEntry(5, "ulica", valueSpecifiers[7]),
        urodziny: new MapEntry(8, "urodziny", valueSpecifiers[4]),
        urodzona: new MapEntry(8, "urodzona", valueSpecifiers[4]),
        urodzony: new MapEntry(8, "urodzony", valueSpecifiers[4]),
        vei: new MapEntry(3, "vei", valueSpecifiers[7]),
        veiadresse: new MapEntry(10, "veiadresse", valueSpecifiers[7]),
        vej: new MapEntry(3, "vej", valueSpecifiers[7]),
        vejadresse: new MapEntry(10, "vejadresse", valueSpecifiers[7]),
        "verification code": new MapEntry(17, "verification code", valueSpecifiers[18]),
        verjaardag: new MapEntry(10, "verjaardag", valueSpecifiers[4]),
        "večernji telefon": new MapEntry(16, "večernji telefon", valueSpecifiers[14]),
        "večerný telefón": new MapEntry(15, "večerný telefón", valueSpecifiers[14]),
        via: new MapEntry(3, "via", valueSpecifiers[7]),
        ville: new MapEntry(5, "ville", valueSpecifiers[8]),
        voornaam: new MapEntry(8, "voornaam", valueSpecifiers[1]),
        "väg": new MapEntry(3, "väg", valueSpecifiers[7]),
        werk: new MapEntry(4, "werk", valueSpecifiers[5]),
        "work area code": new MapEntry(14, "work area code", valueSpecifiers[15]),
        "work areacode": new MapEntry(13, "work areacode", valueSpecifiers[15]),
        "work phone": new MapEntry(10, "work phone", valueSpecifiers[15]),
        workareacode: new MapEntry(12, "workareacode", valueSpecifiers[15]),
        workphone: new MapEntry(9, "workphone", valueSpecifiers[15]),
        "yrityksen numero": new MapEntry(16, "yrityksen numero", valueSpecifiers[15]),
        yritys: new MapEntry(6, "yritys", valueSpecifiers[13]),
        yritysnumero: new MapEntry(12, "yritysnumero", valueSpecifiers[15]),
        yrke: new MapEntry(4, "yrke", valueSpecifiers[5]),
        zemlja: new MapEntry(6, "zemlja", valueSpecifiers[11]),
        "zi de naștere": new MapEntry(13, "zi de naștere", valueSpecifiers[4]),
        "zi naștere": new MapEntry(10, "zi naștere", valueSpecifiers[4]),
        zip: new MapEntry(3, "zip", valueSpecifiers[10]),
        "zip code": new MapEntry(8, "zip code", valueSpecifiers[10]),
        "zip kod": new MapEntry(7, "zip kod", valueSpecifiers[10]),
        "zip kodu": new MapEntry(8, "zip kodu", valueSpecifiers[10]),
        zipcode: new MapEntry(7, "zipcode", valueSpecifiers[10]),
        zipkod: new MapEntry(6, "zipkod", valueSpecifiers[10]),
        "çağrı cihazı": new MapEntry(12, "çağrı cihazı", valueSpecifiers[17]),
        "çağrı cihazı numarası": new MapEntry(21, "çağrı cihazı numarası", valueSpecifiers[17]),
        "état": new MapEntry(4, "état", valueSpecifiers[9]),
        "último": new MapEntry(6, "último", valueSpecifiers[3]),
        "último nome": new MapEntry(11, "último nome", valueSpecifiers[3]),
        "últimonome": new MapEntry(10, "últimonome", valueSpecifiers[3]),
        "únome": new MapEntry(5, "únome", valueSpecifiers[3]),
        "ülke": new MapEntry(4, "ülke", valueSpecifiers[11]),
        "ünvan": new MapEntry(5, "ünvan", valueSpecifiers[5]),
        "ünvanı": new MapEntry(6, "ünvanı", valueSpecifiers[5]),
        "číslo do práce": new MapEntry(14, "číslo do práce", valueSpecifiers[15]),
        "číslo domov": new MapEntry(11, "číslo domov", valueSpecifiers[14]),
        "şehir": new MapEntry(5, "şehir", valueSpecifiers[8]),
        "şirket": new MapEntry(6, "şirket", valueSpecifiers[13]),
        "şirket telefonu": new MapEntry(15, "şirket telefonu", valueSpecifiers[15]),
        "štát": new MapEntry(4, "štát", valueSpecifiers[9]),
        "țară": new MapEntry(4, "țară", valueSpecifiers[11]),
        "Τ.Κ.": new MapEntry(4, "Τ.Κ.", valueSpecifiers[10]),
        "αριθμός τηλεφώνου": new MapEntry(17, "αριθμός τηλεφώνου", valueSpecifiers[12]),
        "βομβητής": new MapEntry(8, "βομβητής", valueSpecifiers[17]),
        "γέννηση": new MapEntry(7, "γέννηση", valueSpecifiers[4]),
        "γενέθλια": new MapEntry(8, "γενέθλια", valueSpecifiers[4]),
        "διεύθυνση": new MapEntry(9, "διεύθυνση", valueSpecifiers[7]),
        "διεύθυνση (γραμμή 1)": new MapEntry(20, "διεύθυνση (γραμμή 1)", valueSpecifiers[7]),
        "επώνυμο": new MapEntry(7, "επώνυμο", valueSpecifiers[3]),
        "εργασία": new MapEntry(7, "εργασία", valueSpecifiers[5]),
        "εταιρεία": new MapEntry(8, "εταιρεία", valueSpecifiers[13]),
        "ημερομηνία γέννησης": new MapEntry(19, "ημερομηνία γέννησης", valueSpecifiers[4]),
        "θέση εργασίας": new MapEntry(13, "θέση εργασίας", valueSpecifiers[5]),
        "κινητό": new MapEntry(6, "κινητό", valueSpecifiers[16]),
        "κινητό τηλέφωνο": new MapEntry(15, "κινητό τηλέφωνο", valueSpecifiers[16]),
        "κωδικός περιοχής": new MapEntry(16, "κωδικός περιοχής", valueSpecifiers[12]),
        "μεσαίο όνομα": new MapEntry(12, "μεσαίο όνομα", valueSpecifiers[2]),
        "νομός": new MapEntry(5, "νομός", valueSpecifiers[9]),
        "οδός": new MapEntry(4, "οδός", valueSpecifiers[7]),
        "ονοματεπώνυμο": new MapEntry(13, "ονοματεπώνυμο", valueSpecifiers[0]),
        "οργανισμός": new MapEntry(10, "οργανισμός", valueSpecifiers[13]),
        "πολιτεία": new MapEntry(8, "πολιτεία", valueSpecifiers[9]),
        "πόλη": new MapEntry(4, "πόλη", valueSpecifiers[8]),
        "ταχυδρομικός κωδικός": new MapEntry(20, "ταχυδρομικός κωδικός", valueSpecifiers[10]),
        "τηλέφωνο": new MapEntry(8, "τηλέφωνο", valueSpecifiers[12]),
        "τηλέφωνο εκτός ωρών εργασίας": new MapEntry(28, "τηλέφωνο εκτός ωρών εργασίας", valueSpecifiers[14]),
        "τηλέφωνο εργασίας": new MapEntry(17, "τηλέφωνο εργασίας", valueSpecifiers[15]),
        "τηλέφωνο κατά τις πρωϊνές ώρες": new MapEntry(30, "τηλέφωνο κατά τις πρωϊνές ώρες", valueSpecifiers[15]),
        "τηλέφωνο κατά τις ώρες εργασίας": new MapEntry(31, "τηλέφωνο κατά τις ώρες εργασίας", valueSpecifiers[15]),
        "τηλέφωνο οικίας": new MapEntry(15, "τηλέφωνο οικίας", valueSpecifiers[14]),
        "φαξ": new MapEntry(3, "φαξ", valueSpecifiers[12]),
        "χώρα": new MapEntry(4, "χώρα", valueSpecifiers[11]),
        "όνομα": new MapEntry(5, "όνομα", valueSpecifiers[1]),
        "Адрес": new MapEntry(5, "Адрес", valueSpecifiers[7]),
        "Адрес e-mail": new MapEntry(12, "Адрес e-mail", valueSpecifiers[6]),
        "Адрес email": new MapEntry(11, "Адрес email", valueSpecifiers[6]),
        "Адрес электронной почты": new MapEntry(23, "Адрес электронной почты", valueSpecifiers[6]),
        "В вечерние часы": new MapEntry(15, "В вечерние часы", valueSpecifiers[14]),
        "В дневные часы": new MapEntry(14, "В дневные часы", valueSpecifiers[15]),
        "Вечером": new MapEntry(7, "Вечером", valueSpecifiers[14]),
        "Вид деятельности": new MapEntry(16, "Вид деятельности", valueSpecifiers[5]),
        "Город": new MapEntry(5, "Город", valueSpecifiers[8]),
        "Днем": new MapEntry(4, "Днем", valueSpecifiers[15]),
        "Должность": new MapEntry(9, "Должность", valueSpecifiers[5]),
        "Домашний": new MapEntry(8, "Домашний", valueSpecifiers[14]),
        "Домашний номер": new MapEntry(14, "Домашний номер", valueSpecifiers[14]),
        "Домашний номер телефона": new MapEntry(23, "Домашний номер телефона", valueSpecifiers[14]),
        "Домашний телефонный номер": new MapEntry(25, "Домашний телефонный номер", valueSpecifiers[14]),
        "Имя": new MapEntry(3, "Имя", valueSpecifiers[1]),
        "Индекс": new MapEntry(6, "Индекс", valueSpecifiers[10]),
        "Код города": new MapEntry(10, "Код города", valueSpecifiers[12]),
        "Код домашнего телефонного номера": new MapEntry(32, "Код домашнего телефонного номера", valueSpecifiers[14]),
        "Код края": new MapEntry(8, "Код края", valueSpecifiers[12]),
        "Код населенного пункта": new MapEntry(22, "Код населенного пункта", valueSpecifiers[12]),
        "Код области": new MapEntry(11, "Код области", valueSpecifiers[12]),
        "Код оператора мобильной связи": new MapEntry(29, "Код оператора мобильной связи", valueSpecifiers[16]),
        "Код оператора сотовой связи": new MapEntry(27, "Код оператора сотовой связи", valueSpecifiers[16]),
        "Код рабочего телефонного номера": new MapEntry(31, "Код рабочего телефонного номера", valueSpecifiers[15]),
        "Код республики": new MapEntry(14, "Код республики", valueSpecifiers[12]),
        "Компания": new MapEntry(8, "Компания", valueSpecifiers[13]),
        "Край": new MapEntry(4, "Край", valueSpecifiers[9]),
        "Мобильный": new MapEntry(9, "Мобильный", valueSpecifiers[16]),
        "Мобильный номер телефона": new MapEntry(24, "Мобильный номер телефона", valueSpecifiers[16]),
        "Мобильный телефонный номер": new MapEntry(26, "Мобильный телефонный номер", valueSpecifiers[16]),
        "Населенный пункт": new MapEntry(16, "Населенный пункт", valueSpecifiers[8]),
        "Номер оператора мобильной связи": new MapEntry(31, "Номер оператора мобильной связи", valueSpecifiers[16]),
        "Номер оператора сотовой связи": new MapEntry(29, "Номер оператора сотовой связи", valueSpecifiers[16]),
        "Номер пейджера": new MapEntry(14, "Номер пейджера", valueSpecifiers[17]),
        "Номер телефона": new MapEntry(14, "Номер телефона", valueSpecifiers[12]),
        "Номер факса": new MapEntry(11, "Номер факса", valueSpecifiers[12]),
        "Организация": new MapEntry(11, "Организация", valueSpecifiers[13]),
        "Отчество": new MapEntry(8, "Отчество", valueSpecifiers[2]),
        "Почтовый индекс": new MapEntry(15, "Почтовый индекс", valueSpecifiers[10]),
        "Предприятие": new MapEntry(11, "Предприятие", valueSpecifiers[13]),
        "Профессия": new MapEntry(9, "Профессия", valueSpecifiers[5]),
        "Раб.": new MapEntry(4, "Раб.", valueSpecifiers[15]),
        "Раб. телефон": new MapEntry(12, "Раб. телефон", valueSpecifiers[15]),
        "Рабочий": new MapEntry(7, "Рабочий", valueSpecifiers[15]),
        "Рабочий номер телефона": new MapEntry(22, "Рабочий номер телефона", valueSpecifiers[15]),
        "Рабочий телефонный номер": new MapEntry(24, "Рабочий телефонный номер", valueSpecifiers[15]),
        "Регион": new MapEntry(6, "Регион", valueSpecifiers[9]),
        "Республика": new MapEntry(10, "Республика", valueSpecifiers[9]),
        "Род деятельности": new MapEntry(16, "Род деятельности", valueSpecifiers[5]),
        "Служебный": new MapEntry(9, "Служебный", valueSpecifiers[15]),
        "Служебный телефон": new MapEntry(17, "Служебный телефон", valueSpecifiers[15]),
        "Сотовый": new MapEntry(7, "Сотовый", valueSpecifiers[16]),
        "Сотовый телефон": new MapEntry(15, "Сотовый телефон", valueSpecifiers[16]),
        "Страна": new MapEntry(6, "Страна", valueSpecifiers[11]),
        "Телефакс": new MapEntry(8, "Телефакс", valueSpecifiers[12]),
        "Телефон мобильной связи": new MapEntry(23, "Телефон мобильной связи", valueSpecifiers[16]),
        "Телефон сотовой связи": new MapEntry(21, "Телефон сотовой связи", valueSpecifiers[16]),
        "Телефонный номер": new MapEntry(16, "Телефонный номер", valueSpecifiers[12]),
        "Ул.": new MapEntry(3, "Ул.", valueSpecifiers[7]),
        "Улица": new MapEntry(5, "Улица", valueSpecifiers[7]),
        "Ф.И.О.": new MapEntry(6, "Ф.И.О.", valueSpecifiers[0]),
        "ФИО": new MapEntry(3, "ФИО", valueSpecifiers[0]),
        "Фамилия": new MapEntry(7, "Фамилия", valueSpecifiers[3]),
        "Фирма": new MapEntry(5, "Фирма", valueSpecifiers[13]),
        "Электронный адрес": new MapEntry(17, "Электронный адрес", valueSpecifiers[6]),
        "адреса": new MapEntry(6, "адреса", valueSpecifiers[7]),
        "адреса 1": new MapEntry(8, "адреса 1", valueSpecifiers[7]),
        "адреса1": new MapEntry(7, "адреса1", valueSpecifiers[7]),
        "вечірній телефон": new MapEntry(16, "вечірній телефон", valueSpecifiers[14]),
        "виддеятельности": new MapEntry(15, "виддеятельности", valueSpecifiers[5]),
        "вул.": new MapEntry(4, "вул.", valueSpecifiers[7]),
        "вулиця": new MapEntry(6, "вулиця", valueSpecifiers[7]),
        "г.": new MapEntry(2, "г.", valueSpecifiers[8]),
        "дата народження": new MapEntry(15, "дата народження", valueSpecifiers[4]),
        "дата рождения": new MapEntry(13, "дата рождения", valueSpecifiers[4]),
        "датарождения": new MapEntry(12, "датарождения", valueSpecifiers[4]),
        "денний телефон": new MapEntry(14, "денний телефон", valueSpecifiers[15]),
        "день народження": new MapEntry(15, "день народження", valueSpecifiers[4]),
        "день рождения": new MapEntry(13, "день рождения", valueSpecifiers[4]),
        "деньрождения": new MapEntry(12, "деньрождения", valueSpecifiers[4]),
        "дом.": new MapEntry(4, "дом.", valueSpecifiers[14]),
        "дом. тел.": new MapEntry(9, "дом. тел.", valueSpecifiers[14]),
        "дом. телефон": new MapEntry(12, "дом. телефон", valueSpecifiers[14]),
        "дом.тел.": new MapEntry(8, "дом.тел.", valueSpecifiers[14]),
        "дом.телефон": new MapEntry(11, "дом.телефон", valueSpecifiers[14]),
        "домашний телефон": new MapEntry(16, "домашний телефон", valueSpecifiers[14]),
        "домашній телефон": new MapEntry(16, "домашній телефон", valueSpecifiers[14]),
        "ел. адреса": new MapEntry(10, "ел. адреса", valueSpecifiers[6]),
        "ел. пошта": new MapEntry(9, "ел. пошта", valueSpecifiers[6]),
        "ел.адреса": new MapEntry(9, "ел.адреса", valueSpecifiers[6]),
        "ел.пошта": new MapEntry(8, "ел.пошта", valueSpecifiers[6]),
        "електронна адреса": new MapEntry(17, "електронна адреса", valueSpecifiers[6]),
        "електронна пошта": new MapEntry(16, "електронна пошта", valueSpecifiers[6]),
        "електроннаадреса": new MapEntry(16, "електроннаадреса", valueSpecifiers[6]),
        "електроннапошта": new MapEntry(15, "електроннапошта", valueSpecifiers[6]),
        "код вечірнього телефону": new MapEntry(23, "код вечірнього телефону", valueSpecifiers[14]),
        "код денного телефону": new MapEntry(20, "код денного телефону", valueSpecifiers[15]),
        "код дом.": new MapEntry(8, "код дом.", valueSpecifiers[14]),
        "код дом. тел.": new MapEntry(13, "код дом. тел.", valueSpecifiers[14]),
        "код дом. телефону": new MapEntry(17, "код дом. телефону", valueSpecifiers[14]),
        "код дом.телефону": new MapEntry(16, "код дом.телефону", valueSpecifiers[14]),
        "код домашнього телефону": new MapEntry(23, "код домашнього телефону", valueSpecifiers[14]),
        "код моб.": new MapEntry(8, "код моб.", valueSpecifiers[16]),
        "код моб. тел.": new MapEntry(13, "код моб. тел.", valueSpecifiers[16]),
        "код моб. телефону": new MapEntry(17, "код моб. телефону", valueSpecifiers[16]),
        "код моб.телефону": new MapEntry(16, "код моб.телефону", valueSpecifiers[16]),
        "код мобільного телефону": new MapEntry(23, "код мобільного телефону", valueSpecifiers[16]),
        "код області": new MapEntry(11, "код області", valueSpecifiers[12]),
        "код пейджера": new MapEntry(12, "код пейджера", valueSpecifiers[17]),
        "код регіону": new MapEntry(11, "код регіону", valueSpecifiers[12]),
        "код роб.": new MapEntry(8, "код роб.", valueSpecifiers[15]),
        "код роб. тел.": new MapEntry(13, "код роб. тел.", valueSpecifiers[15]),
        "код роб. телефону": new MapEntry(17, "код роб. телефону", valueSpecifiers[15]),
        "код роб.телефону": new MapEntry(16, "код роб.телефону", valueSpecifiers[15]),
        "код робочого телефону": new MapEntry(21, "код робочого телефону", valueSpecifiers[15]),
        "код сотового телефону": new MapEntry(21, "код сотового телефону", valueSpecifiers[16]),
        "коддом.тел.": new MapEntry(11, "коддом.тел.", valueSpecifiers[14]),
        "кодмоб.тел.": new MapEntry(11, "кодмоб.тел.", valueSpecifiers[16]),
        "кодобласті": new MapEntry(10, "кодобласті", valueSpecifiers[12]),
        "кодпейджера": new MapEntry(11, "кодпейджера", valueSpecifiers[17]),
        "кодрегіону": new MapEntry(10, "кодрегіону", valueSpecifiers[12]),
        "кодроб.тел.": new MapEntry(11, "кодроб.тел.", valueSpecifiers[15]),
        "компанія": new MapEntry(8, "компанія", valueSpecifiers[13]),
        "країна": new MapEntry(6, "країна", valueSpecifiers[11]),
        "моб.": new MapEntry(4, "моб.", valueSpecifiers[16]),
        "моб. тел.": new MapEntry(9, "моб. тел.", valueSpecifiers[16]),
        "моб. телефон": new MapEntry(12, "моб. телефон", valueSpecifiers[16]),
        "моб.тел.": new MapEntry(8, "моб.тел.", valueSpecifiers[16]),
        "моб.телефон": new MapEntry(11, "моб.телефон", valueSpecifiers[16]),
        "мобильный телефон": new MapEntry(17, "мобильный телефон", valueSpecifiers[16]),
        "мобільний телефон": new MapEntry(17, "мобільний телефон", valueSpecifiers[16]),
        "місто": new MapEntry(5, "місто", valueSpecifiers[8]),
        "народився": new MapEntry(9, "народився", valueSpecifiers[4]),
        "обл.": new MapEntry(4, "обл.", valueSpecifiers[9]),
        "область": new MapEntry(7, "область", valueSpecifiers[9]),
        "організація": new MapEntry(11, "організація", valueSpecifiers[13]),
        "пейджер": new MapEntry(7, "пейджер", valueSpecifiers[17]),
        "по батькові": new MapEntry(11, "по батькові", valueSpecifiers[2]),
        "побатькові": new MapEntry(10, "побатькові", valueSpecifiers[2]),
        "повне ім'я": new MapEntry(10, "повне ім'я", valueSpecifiers[0]),
        "повне ім’я": new MapEntry(10, "повне ім’я", valueSpecifiers[0]),
        "повнеім'я": new MapEntry(9, "повнеім'я", valueSpecifiers[0]),
        "повнеім’я": new MapEntry(9, "повнеім’я", valueSpecifiers[0]),
        "полное имя": new MapEntry(10, "полное имя", valueSpecifiers[0]),
        "полноеимя": new MapEntry(9, "полноеимя", valueSpecifiers[0]),
        "посада": new MapEntry(6, "посада", valueSpecifiers[5]),
        "поштовий код": new MapEntry(12, "поштовий код", valueSpecifiers[10]),
        "поштовий індекс": new MapEntry(15, "поштовий індекс", valueSpecifiers[10]),
        "провулок": new MapEntry(8, "провулок", valueSpecifiers[7]),
        "проспект": new MapEntry(8, "проспект", valueSpecifiers[7]),
        "прізвище": new MapEntry(8, "прізвище", valueSpecifiers[3]),
        "рабочий телефон": new MapEntry(15, "рабочий телефон", valueSpecifiers[15]),
        "роб.": new MapEntry(4, "роб.", valueSpecifiers[15]),
        "роб. тел.": new MapEntry(9, "роб. тел.", valueSpecifiers[15]),
        "роб. телефон": new MapEntry(12, "роб. телефон", valueSpecifiers[15]),
        "роб.тел.": new MapEntry(8, "роб.тел.", valueSpecifiers[15]),
        "роб.телефон": new MapEntry(11, "роб.телефон", valueSpecifiers[15]),
        "робочий телефон": new MapEntry(15, "робочий телефон", valueSpecifiers[15]),
        "роддеятельности": new MapEntry(15, "роддеятельности", valueSpecifiers[5]),
        "родилась": new MapEntry(8, "родилась", valueSpecifiers[4]),
        "родился": new MapEntry(7, "родился", valueSpecifiers[4]),
        "рядок адреси": new MapEntry(12, "рядок адреси", valueSpecifiers[7]),
        "сотовий телефон": new MapEntry(15, "сотовий телефон", valueSpecifiers[16]),
        "тел": new MapEntry(3, "тел", valueSpecifiers[12]),
        "тел.": new MapEntry(4, "тел.", valueSpecifiers[12]),
        "телефон": new MapEntry(7, "телефон", valueSpecifiers[12]),
        "установа": new MapEntry(8, "установа", valueSpecifiers[13]),
        "факс": new MapEntry(4, "факс", valueSpecifiers[12]),
        "ім'я": new MapEntry(4, "ім'я", valueSpecifiers[1]),
        "ім’я": new MapEntry(4, "ім’я", valueSpecifiers[1]),
        "індекс": new MapEntry(6, "індекс", valueSpecifiers[10]),
        "אמצעי": new MapEntry(5, "אמצעי", valueSpecifiers[2]),
        "ארגון": new MapEntry(5, "ארגון", valueSpecifiers[13]),
        "בית": new MapEntry(3, "בית", valueSpecifiers[14]),
        "דוא״ל": new MapEntry(5, "דוא״ל", valueSpecifiers[6]),
        "זימונית": new MapEntry(7, "זימונית", valueSpecifiers[17]),
        "חברה": new MapEntry(4, "חברה", valueSpecifiers[13]),
        "טלפון": new MapEntry(5, "טלפון", valueSpecifiers[12]),
        "טלפון בית": new MapEntry(9, "טלפון בית", valueSpecifiers[14]),
        "טלפון בעבודה": new MapEntry(12, "טלפון בעבודה", valueSpecifiers[15]),
        "יום הולדת": new MapEntry(9, "יום הולדת", valueSpecifiers[4]),
        "יישוב": new MapEntry(5, "יישוב", valueSpecifiers[8]),
        "כתובת": new MapEntry(5, "כתובת", valueSpecifiers[7]),
        "מדינה": new MapEntry(5, "מדינה", valueSpecifiers[9]),
        "מחוז": new MapEntry(4, "מחוז", valueSpecifiers[9]),
        "מייל": new MapEntry(4, "מייל", valueSpecifiers[6]),
        "מיקוד": new MapEntry(5, "מיקוד", valueSpecifiers[10]),
        "משפחה": new MapEntry(5, "משפחה", valueSpecifiers[3]),
        "משרד": new MapEntry(4, "משרד", valueSpecifiers[15]),
        "נייד": new MapEntry(4, "נייד", valueSpecifiers[16]),
        "סלולרי": new MapEntry(6, "סלולרי", valueSpecifiers[16]),
        "עבודה": new MapEntry(5, "עבודה", valueSpecifiers[15]),
        "עיר": new MapEntry(3, "עיר", valueSpecifiers[8]),
        "פקס": new MapEntry(3, "פקס", valueSpecifiers[12]),
        "פרטי": new MapEntry(4, "פרטי", valueSpecifiers[1]),
        "קידומת": new MapEntry(6, "קידומת", valueSpecifiers[12]),
        "רחוב": new MapEntry(4, "רחוב", valueSpecifiers[7]),
        "שם": new MapEntry(2, "שם", valueSpecifiers[0]),
        "שם אמצעי": new MapEntry(8, "שם אמצעי", valueSpecifiers[2]),
        "שם מלא": new MapEntry(6, "שם מלא", valueSpecifiers[0]),
        "שם משפחה": new MapEntry(8, "שם משפחה", valueSpecifiers[3]),
        "שם פרטי": new MapEntry(7, "שם פרטי", valueSpecifiers[1]),
        "תאריך לידה": new MapEntry(10, "תאריך לידה", valueSpecifiers[4]),
        "תפקיד": new MapEntry(5, "תפקיד", valueSpecifiers[5]),
        "أدخل عنوان سطر العنوان": new MapEntry(22, "أدخل عنوان سطر العنوان", valueSpecifiers[7]),
        "اسم العائلة": new MapEntry(11, "اسم العائلة", valueSpecifiers[3]),
        "الأول": new MapEntry(5, "الأول", valueSpecifiers[1]),
        "الاسم": new MapEntry(5, "الاسم", valueSpecifiers[0]),
        "الاسم الأوسط": new MapEntry(12, "الاسم الأوسط", valueSpecifiers[2]),
        "الاسم الأول": new MapEntry(11, "الاسم الأول", valueSpecifiers[1]),
        "الاسم الكامل": new MapEntry(12, "الاسم الكامل", valueSpecifiers[0]),
        "البريد الإلكتروني": new MapEntry(17, "البريد الإلكتروني", valueSpecifiers[6]),
        "البلد": new MapEntry(5, "البلد", valueSpecifiers[11]),
        "التليفون": new MapEntry(8, "التليفون", valueSpecifiers[12]),
        "الحرف الأول من الاسم الأوسط": new MapEntry(27, "الحرف الأول من الاسم الأوسط", valueSpecifiers[2]),
        "الرمز البريدي": new MapEntry(13, "الرمز البريدي", valueSpecifiers[10]),
        "الشارع": new MapEntry(6, "الشارع", valueSpecifiers[7]),
        "الشركة": new MapEntry(6, "الشركة", valueSpecifiers[13]),
        "العنوان": new MapEntry(7, "العنوان", valueSpecifiers[7]),
        "العنوان ١": new MapEntry(9, "العنوان ١", valueSpecifiers[7]),
        "الفاكس": new MapEntry(6, "الفاكس", valueSpecifiers[12]),
        "المؤسسة": new MapEntry(7, "المؤسسة", valueSpecifiers[13]),
        "المدينة": new MapEntry(7, "المدينة", valueSpecifiers[8]),
        "المسمى الوظيفي": new MapEntry(14, "المسمى الوظيفي", valueSpecifiers[5]),
        "الهاتف": new MapEntry(6, "الهاتف", valueSpecifiers[12]),
        "الهاتف الخلوي": new MapEntry(13, "الهاتف الخلوي", valueSpecifiers[16]),
        "الهاتف المحمول": new MapEntry(14, "الهاتف المحمول", valueSpecifiers[16]),
        "الهاتف في الصباح": new MapEntry(16, "الهاتف في الصباح", valueSpecifiers[15]),
        "الهاتف في المساء": new MapEntry(16, "الهاتف في المساء", valueSpecifiers[14]),
        "الهاتف في المساء ": new MapEntry(17, "الهاتف في المساء ", valueSpecifiers[14]),
        "الولاية": new MapEntry(7, "الولاية", valueSpecifiers[9]),
        "تاريخ الميلاد": new MapEntry(13, "تاريخ الميلاد", valueSpecifiers[4]),
        "رقم الهاتف": new MapEntry(10, "رقم الهاتف", valueSpecifiers[12]),
        "عنوان الشارع": new MapEntry(12, "عنوان الشارع", valueSpecifiers[7]),
        "كود المنطقة": new MapEntry(11, "كود المنطقة", valueSpecifiers[12]),
        "كود المنطقة السكنية": new MapEntry(19, "كود المنطقة السكنية", valueSpecifiers[14]),
        "كود المنطقة للهاتف في المساء": new MapEntry(28, "كود المنطقة للهاتف في المساء", valueSpecifiers[14]),
        "كود منطقة الشركة": new MapEntry(16, "كود منطقة الشركة", valueSpecifiers[15]),
        "كود منطقة العمل": new MapEntry(15, "كود منطقة العمل", valueSpecifiers[15]),
        "كود منطقة الهاتف الخلوي": new MapEntry(23, "كود منطقة الهاتف الخلوي", valueSpecifiers[16]),
        "كود منطقة الهاتف المحمول": new MapEntry(24, "كود منطقة الهاتف المحمول", valueSpecifiers[16]),
        "كود منطقة الهاتف في الصباح": new MapEntry(26, "كود منطقة الهاتف في الصباح", valueSpecifiers[15]),
        "كود منطقة جهاز النداء": new MapEntry(21, "كود منطقة جهاز النداء", valueSpecifiers[17]),
        "كود منطقة هاتف العمل": new MapEntry(20, "كود منطقة هاتف العمل", valueSpecifiers[15]),
        "مولود": new MapEntry(5, "مولود", valueSpecifiers[4]),
        "هاتف الشركة": new MapEntry(11, "هاتف الشركة", valueSpecifiers[15]),
        "هاتف العمل": new MapEntry(10, "هاتف العمل", valueSpecifiers[15]),
        "هاتف المنزل": new MapEntry(11, "هاتف المنزل", valueSpecifiers[14]),
        "هاتف نداء": new MapEntry(9, "هاتف نداء", valueSpecifiers[17]),
        "กลาง": new MapEntry(4, "กลาง", valueSpecifiers[2]),
        "ชื่อ": new MapEntry(4, "ชื่อ", valueSpecifiers[1]),
        "ชื่อกลาง": new MapEntry(8, "ชื่อกลาง", valueSpecifiers[2]),
        "ชื่อกลางย่อ": new MapEntry(11, "ชื่อกลางย่อ", valueSpecifiers[2]),
        "ชื่อกลางระหว่าง": new MapEntry(15, "ชื่อกลางระหว่าง", valueSpecifiers[2]),
        "ชื่อจริง": new MapEntry(8, "ชื่อจริง", valueSpecifiers[1]),
        "ชื่อตัว": new MapEntry(7, "ชื่อตัว", valueSpecifiers[1]),
        "ชื่อตำแหน่ง": new MapEntry(11, "ชื่อตำแหน่ง", valueSpecifiers[5]),
        "ชื่อต้น": new MapEntry(7, "ชื่อต้น", valueSpecifiers[1]),
        "ชื่อถนน": new MapEntry(7, "ชื่อถนน", valueSpecifiers[7]),
        "ชื่อท้าย": new MapEntry(8, "ชื่อท้าย", valueSpecifiers[3]),
        "ชื่อสกุล": new MapEntry(8, "ชื่อสกุล", valueSpecifiers[3]),
        "ชื่อสกุลท้าย": new MapEntry(12, "ชื่อสกุลท้าย", valueSpecifiers[3]),
        "ชื่อหน้า": new MapEntry(8, "ชื่อหน้า", valueSpecifiers[1]),
        "ชื่อเต็ม": new MapEntry(8, "ชื่อเต็ม", valueSpecifiers[0]),
        "ชื่อแรก": new MapEntry(7, "ชื่อแรก", valueSpecifiers[1]),
        "ชื่อและนามสุกล": new MapEntry(14, "ชื่อและนามสุกล", valueSpecifiers[0]),
        "ตัวย่อชื่อกลาง": new MapEntry(14, "ตัวย่อชื่อกลาง", valueSpecifiers[2]),
        "ตำแหน่ง": new MapEntry(7, "ตำแหน่ง", valueSpecifiers[5]),
        "ถนน": new MapEntry(3, "ถนน", valueSpecifiers[7]),
        "ถนนที่อยู่": new MapEntry(10, "ถนนที่อยู่", valueSpecifiers[7]),
        "ที่ทำงานรหัส": new MapEntry(12, "ที่ทำงานรหัส", valueSpecifiers[15]),
        "ที่อยู่": new MapEntry(7, "ที่อยู่", valueSpecifiers[7]),
        "ที่อยู่ 1": new MapEntry(9, "ที่อยู่ 1", valueSpecifiers[7]),
        "ที่อยู่ถนน": new MapEntry(10, "ที่อยู่ถนน", valueSpecifiers[7]),
        "ที่อยู่อีเมล": new MapEntry(12, "ที่อยู่อีเมล", valueSpecifiers[6]),
        "ที่อยู่แรก": new MapEntry(10, "ที่อยู่แรก", valueSpecifiers[7]),
        "ที่ีรหัสทำงาน": new MapEntry(13, "ที่ีรหัสทำงาน", valueSpecifiers[15]),
        "ท้าย": new MapEntry(4, "ท้าย", valueSpecifiers[3]),
        "ธุรกิจรหัสพื้นที่": new MapEntry(17, "ธุรกิจรหัสพื้นที่", valueSpecifiers[15]),
        "นามสกุล": new MapEntry(7, "นามสกุล", valueSpecifiers[3]),
        "บริษัท": new MapEntry(6, "บริษัท", valueSpecifiers[13]),
        "บ้านรหัสพื้นที่": new MapEntry(15, "บ้านรหัสพื้นที่", valueSpecifiers[14]),
        "ประเทศ": new MapEntry(6, "ประเทศ", valueSpecifiers[11]),
        "ป้อนบรรทัดที่อยู่": new MapEntry(17, "ป้อนบรรทัดที่อยู่", valueSpecifiers[7]),
        "พื้นที่รหัส": new MapEntry(11, "พื้นที่รหัส", valueSpecifiers[12]),
        "พื้นที่รหัสบริษัท": new MapEntry(17, "พื้นที่รหัสบริษัท", valueSpecifiers[15]),
        "พื้นที่รหัสโทรศัพท์มือถือ": new MapEntry(25, "พื้นที่รหัสโทรศัพท์มือถือ", valueSpecifiers[16]),
        "มือถือ": new MapEntry(6, "มือถือ", valueSpecifiers[16]),
        "รหัส": new MapEntry(4, "รหัส", valueSpecifiers[10]),
        "รหัสจดหมาย": new MapEntry(10, "รหัสจดหมาย", valueSpecifiers[10]),
        "รหัสทำงาน": new MapEntry(9, "รหัสทำงาน", valueSpecifiers[15]),
        "รหัสที่ทำงาน": new MapEntry(12, "รหัสที่ทำงาน", valueSpecifiers[15]),
        "รหัสธุรกิจ": new MapEntry(10, "รหัสธุรกิจ", valueSpecifiers[15]),
        "รหัสบริษัท": new MapEntry(10, "รหัสบริษัท", valueSpecifiers[15]),
        "รหัสบ้าน": new MapEntry(8, "รหัสบ้าน", valueSpecifiers[14]),
        "รหัสพื้นที่": new MapEntry(11, "รหัสพื้นที่", valueSpecifiers[12]),
        "รหัสพื้นที่งาน": new MapEntry(14, "รหัสพื้นที่งาน", valueSpecifiers[15]),
        "รหัสพื้นที่ทำงาน": new MapEntry(16, "รหัสพื้นที่ทำงาน", valueSpecifiers[15]),
        "รหัสพื้นที่ธุรกิจ": new MapEntry(17, "รหัสพื้นที่ธุรกิจ", valueSpecifiers[15]),
        "รหัสพื้นที่บริษัท": new MapEntry(17, "รหัสพื้นที่บริษัท", valueSpecifiers[15]),
        "รหัสพื้นที่บ้าน": new MapEntry(15, "รหัสพื้นที่บ้าน", valueSpecifiers[14]),
        "รหัสพื้นที่มือถือ": new MapEntry(17, "รหัสพื้นที่มือถือ", valueSpecifiers[16]),
        "รหัสพื้นที่วิทยุติดตามตัว": new MapEntry(25, "รหัสพื้นที่วิทยุติดตามตัว", valueSpecifiers[17]),
        "รหัสพื้นที่ส่วนตัว": new MapEntry(18, "รหัสพื้นที่ส่วนตัว", valueSpecifiers[14]),
        "รหัสพื้นที่เพจเจอร์": new MapEntry(19, "รหัสพื้นที่เพจเจอร์", valueSpecifiers[17]),
        "รหัสพื้นที่โทรศัพท์มือถือ": new MapEntry(25, "รหัสพื้นที่โทรศัพท์มือถือ", valueSpecifiers[16]),
        "รหัสพื้นที่โทรศัพท์ส่วนตัว": new MapEntry(26, "รหัสพื้นที่โทรศัพท์ส่วนตัว", valueSpecifiers[16]),
        "รหัสส่งจดหมาย": new MapEntry(13, "รหัสส่งจดหมาย", valueSpecifiers[10]),
        "รหัสเบอร์บ้าน": new MapEntry(13, "รหัสเบอร์บ้าน", valueSpecifiers[14]),
        "รหัสเบอร์ส่วนตัว": new MapEntry(16, "รหัสเบอร์ส่วนตัว", valueSpecifiers[14]),
        "รหัสเพจเจอร์": new MapEntry(12, "รหัสเพจเจอร์", valueSpecifiers[17]),
        "รหัสโทรศัพท์มือถือ": new MapEntry(18, "รหัสโทรศัพท์มือถือ", valueSpecifiers[16]),
        "รหัสโทรศัพท์ส่วนตัว": new MapEntry(19, "รหัสโทรศัพท์ส่วนตัว", valueSpecifiers[16]),
        "รหัสไปรษณีย์": new MapEntry(12, "รหัสไปรษณีย์", valueSpecifiers[10]),
        "รัฐ": new MapEntry(3, "รัฐ", valueSpecifiers[9]),
        "วันที่เกิด": new MapEntry(10, "วันที่เกิด", valueSpecifiers[4]),
        "วันเกิด": new MapEntry(7, "วันเกิด", valueSpecifiers[4]),
        "วิทยุติดตามตัว": new MapEntry(14, "วิทยุติดตามตัว", valueSpecifiers[17]),
        "สกุล": new MapEntry(4, "สกุล", valueSpecifiers[3]),
        "หมายเลขโทรศัพท์": new MapEntry(15, "หมายเลขโทรศัพท์", valueSpecifiers[12]),
        "หมายเลขโทรฯ": new MapEntry(11, "หมายเลขโทรฯ", valueSpecifiers[12]),
        "องค์กร": new MapEntry(6, "องค์กร", valueSpecifiers[13]),
        "อี-เมล": new MapEntry(6, "อี-เมล", valueSpecifiers[6]),
        "อีเมล": new MapEntry(5, "อีเมล", valueSpecifiers[6]),
        "อีเมลที่อยู่": new MapEntry(12, "อีเมลที่อยู่", valueSpecifiers[6]),
        "เกิด": new MapEntry(4, "เกิด", valueSpecifiers[4]),
        "เบอร์งาน": new MapEntry(8, "เบอร์งาน", valueSpecifiers[15]),
        "เบอร์ติดต่อ": new MapEntry(11, "เบอร์ติดต่อ", valueSpecifiers[14]),
        "เบอร์ทำงาน": new MapEntry(10, "เบอร์ทำงาน", valueSpecifiers[15]),
        "เบอร์ที่ทำงาน": new MapEntry(13, "เบอร์ที่ทำงาน", valueSpecifiers[15]),
        "เบอร์ธุรกิจ": new MapEntry(11, "เบอร์ธุรกิจ", valueSpecifiers[15]),
        "เบอร์บริษัท": new MapEntry(11, "เบอร์บริษัท", valueSpecifiers[15]),
        "เบอร์บ้าน": new MapEntry(9, "เบอร์บ้าน", valueSpecifiers[14]),
        "เบอร์ส่วนตัว": new MapEntry(12, "เบอร์ส่วนตัว", valueSpecifiers[14]),
        "เบอร์โทรศัพท์": new MapEntry(13, "เบอร์โทรศัพท์", valueSpecifiers[12]),
        "เมือง": new MapEntry(5, "เมือง", valueSpecifiers[8]),
        "โทรศัพท์": new MapEntry(8, "โทรศัพท์", valueSpecifiers[12]),
        "โทรศัพท์งาน": new MapEntry(11, "โทรศัพท์งาน", valueSpecifiers[15]),
        "โทรศัพท์ติดต่องาน": new MapEntry(17, "โทรศัพท์ติดต่องาน", valueSpecifiers[15]),
        "โทรศัพท์ที่ทำงาน": new MapEntry(16, "โทรศัพท์ที่ทำงาน", valueSpecifiers[15]),
        "โทรศัพท์ธุรกิจ": new MapEntry(14, "โทรศัพท์ธุรกิจ", valueSpecifiers[15]),
        "โทรศัพท์บริษัท": new MapEntry(14, "โทรศัพท์บริษัท", valueSpecifiers[15]),
        "โทรศัพท์บ้าน": new MapEntry(12, "โทรศัพท์บ้าน", valueSpecifiers[14]),
        "โทรศัพท์มือถือ": new MapEntry(14, "โทรศัพท์มือถือ", valueSpecifiers[16]),
        "โทรศัพท์ส่วนตัว": new MapEntry(15, "โทรศัพท์ส่วนตัว", valueSpecifiers[16]),
        "โทรสาร": new MapEntry(6, "โทรสาร", valueSpecifiers[12]),
        "ไปรษณีย์": new MapEntry(8, "ไปรษณีย์", valueSpecifiers[10]),
        "〒": new MapEntry(1, "〒", valueSpecifiers[10]),
        "お名前": new MapEntry(3, "お名前", valueSpecifiers[0]),
        "お誕生日": new MapEntry(4, "お誕生日", valueSpecifiers[4]),
        "ご住所": new MapEntry(3, "ご住所", valueSpecifiers[7]),
        "それ以降の住所": new MapEntry(7, "それ以降の住所", valueSpecifiers[7]),
        "アドレス": new MapEntry(4, "アドレス", valueSpecifiers[7]),
        "エリアコード": new MapEntry(6, "エリアコード", valueSpecifiers[12]),
        "ケータイ": new MapEntry(4, "ケータイ", valueSpecifiers[16]),
        "ケータイ番号": new MapEntry(6, "ケータイ番号", valueSpecifiers[16]),
        "ケータイ電話": new MapEntry(6, "ケータイ電話", valueSpecifiers[16]),
        "ケータイ電話番号": new MapEntry(8, "ケータイ電話番号", valueSpecifiers[16]),
        "ファクシミリ": new MapEntry(6, "ファクシミリ", valueSpecifiers[12]),
        "ファクシミリ番号": new MapEntry(8, "ファクシミリ番号", valueSpecifiers[12]),
        "ファクス": new MapEntry(4, "ファクス", valueSpecifiers[12]),
        "ファクス番号": new MapEntry(6, "ファクス番号", valueSpecifiers[12]),
        "ファックス": new MapEntry(5, "ファックス", valueSpecifiers[12]),
        "ファックス番号": new MapEntry(7, "ファックス番号", valueSpecifiers[12]),
        "フルネーム": new MapEntry(5, "フルネーム", valueSpecifiers[0]),
        "ポケットベル": new MapEntry(6, "ポケットベル", valueSpecifiers[17]),
        "ポケットベル番号": new MapEntry(8, "ポケットベル番号", valueSpecifiers[17]),
        "ポケットベル電話番号": new MapEntry(10, "ポケットベル電話番号", valueSpecifiers[17]),
        "ポケベル": new MapEntry(4, "ポケベル", valueSpecifiers[17]),
        "ポケベル番号": new MapEntry(6, "ポケベル番号", valueSpecifiers[17]),
        "ポケベル電話番号": new MapEntry(8, "ポケベル電話番号", valueSpecifiers[17]),
        "ミドルネーム": new MapEntry(6, "ミドルネーム", valueSpecifiers[2]),
        "メアド": new MapEntry(3, "メアド", valueSpecifiers[6]),
        "メルアド": new MapEntry(4, "メルアド", valueSpecifiers[6]),
        "メール": new MapEntry(3, "メール", valueSpecifiers[6]),
        "メールアドレス": new MapEntry(7, "メールアドレス", valueSpecifiers[6]),
        "个人主页": new MapEntry(4, "个人主页", valueSpecifiers[25]),
        "个人网站": new MapEntry(4, "个人网站", valueSpecifiers[25]),
        "个人网页": new MapEntry(4, "个人网页", valueSpecifiers[25]),
        "中間名": new MapEntry(3, "中間名", valueSpecifiers[2]),
        "中间名": new MapEntry(3, "中间名", valueSpecifiers[2]),
        "会社": new MapEntry(2, "会社", valueSpecifiers[13]),
        "会社名": new MapEntry(3, "会社名", valueSpecifiers[13]),
        "会社電話": new MapEntry(4, "会社電話", valueSpecifiers[15]),
        "会社電話番号": new MapEntry(6, "会社電話番号", valueSpecifiers[15]),
        "会社電話：": new MapEntry(5, "会社電話：", valueSpecifiers[15]),
        "传呼机": new MapEntry(3, "传呼机", valueSpecifiers[17]),
        "传呼机区号": new MapEntry(5, "传呼机区号", valueSpecifiers[17]),
        "传真": new MapEntry(2, "传真", valueSpecifiers[12]),
        "住址": new MapEntry(2, "住址", valueSpecifiers[7]),
        "住宅電話": new MapEntry(4, "住宅電話", valueSpecifiers[14]),
        "住家電話": new MapEntry(4, "住家電話", valueSpecifiers[14]),
        "住所": new MapEntry(2, "住所", valueSpecifiers[7]),
        "住所入力欄": new MapEntry(5, "住所入力欄", valueSpecifiers[7]),
        "住所（17文字以内）": new MapEntry(10, "住所（17文字以内）", valueSpecifiers[7]),
        "個人電話番号": new MapEntry(6, "個人電話番号", valueSpecifiers[14]),
        "傳呼機": new MapEntry(3, "傳呼機", valueSpecifiers[17]),
        "傳呼機號碼": new MapEntry(5, "傳呼機號碼", valueSpecifiers[17]),
        "傳真": new MapEntry(2, "傳真", valueSpecifiers[12]),
        "傳真號碼": new MapEntry(4, "傳真號碼", valueSpecifiers[12]),
        "全名": new MapEntry(2, "全名", valueSpecifiers[0]),
        "公務電話": new MapEntry(4, "公務電話", valueSpecifiers[15]),
        "公司": new MapEntry(2, "公司", valueSpecifiers[13]),
        "公司名稱": new MapEntry(4, "公司名稱", valueSpecifiers[13]),
        "公司电话": new MapEntry(4, "公司电话", valueSpecifiers[15]),
        "公司电话区号": new MapEntry(6, "公司电话区号", valueSpecifiers[15]),
        "公司電話": new MapEntry(4, "公司電話", valueSpecifiers[15]),
        "出生": new MapEntry(2, "出生", valueSpecifiers[4]),
        "出生年月日": new MapEntry(5, "出生年月日", valueSpecifiers[4]),
        "出生日期": new MapEntry(4, "出生日期", valueSpecifiers[4]),
        "勤務先": new MapEntry(3, "勤務先", valueSpecifiers[13]),
        "勤務先会社": new MapEntry(5, "勤務先会社", valueSpecifiers[13]),
        "勤務先会社名": new MapEntry(6, "勤務先会社名", valueSpecifiers[13]),
        "勤務先電話番号": new MapEntry(7, "勤務先電話番号", valueSpecifiers[15]),
        "区号": new MapEntry(2, "区号", valueSpecifiers[12]),
        "區域碼": new MapEntry(3, "區域碼", valueSpecifiers[12]),
        "區域號碼": new MapEntry(4, "區域號碼", valueSpecifiers[12]),
        "區碼": new MapEntry(2, "區碼", valueSpecifiers[12]),
        "单位": new MapEntry(2, "单位", valueSpecifiers[13]),
        "单位名称": new MapEntry(4, "单位名称", valueSpecifiers[13]),
        "名前": new MapEntry(2, "名前", valueSpecifiers[0]),
        "名字": new MapEntry(2, "名字", valueSpecifiers[0]),
        "名稱": new MapEntry(2, "名稱", valueSpecifiers[0]),
        "名（全角8文字以内）": new MapEntry(10, "名（全角8文字以内）", valueSpecifiers[1]),
        "呼叫器": new MapEntry(3, "呼叫器", valueSpecifiers[17]),
        "呼叫器號碼": new MapEntry(5, "呼叫器號碼", valueSpecifiers[17]),
        "商用電話": new MapEntry(4, "商用電話", valueSpecifiers[15]),
        "固定電話": new MapEntry(4, "固定電話", valueSpecifiers[12]),
        "固定電話番号": new MapEntry(6, "固定電話番号", valueSpecifiers[12]),
        "国": new MapEntry(1, "国", valueSpecifiers[11]),
        "国/地域名": new MapEntry(5, "国/地域名", valueSpecifiers[11]),
        "国/地域名：": new MapEntry(6, "国/地域名：", valueSpecifiers[11]),
        "国、地域": new MapEntry(4, "国、地域", valueSpecifiers[11]),
        "国家": new MapEntry(2, "国家", valueSpecifiers[11]),
        "国家/地区": new MapEntry(5, "国家/地区", valueSpecifiers[11]),
        "国／地域名": new MapEntry(5, "国／地域名", valueSpecifiers[11]),
        "国／地域名：": new MapEntry(6, "国／地域名：", valueSpecifiers[11]),
        "國家": new MapEntry(2, "國家", valueSpecifiers[11]),
        "國家∕地區": new MapEntry(5, "國家∕地區", valueSpecifiers[11]),
        "國家或地區": new MapEntry(5, "國家或地區", valueSpecifiers[11]),
        "地区": new MapEntry(2, "地区", valueSpecifiers[11]),
        "地址": new MapEntry(2, "地址", valueSpecifiers[7]),
        "城市": new MapEntry(2, "城市", valueSpecifiers[8]),
        "夜晚电话区号": new MapEntry(6, "夜晚电话区号", valueSpecifiers[14]),
        "夜間電話": new MapEntry(4, "夜間電話", valueSpecifiers[14]),
        "夜間電話番号": new MapEntry(6, "夜間電話番号", valueSpecifiers[14]),
        "夜间电话": new MapEntry(4, "夜间电话", valueSpecifiers[14]),
        "大哥大": new MapEntry(3, "大哥大", valueSpecifiers[16]),
        "大哥大電話": new MapEntry(5, "大哥大電話", valueSpecifiers[16]),
        "姓": new MapEntry(1, "姓", valueSpecifiers[3]),
        "姓名": new MapEntry(2, "姓名", valueSpecifiers[0]),
        "姓氏": new MapEntry(2, "姓氏", valueSpecifiers[3]),
        "家庭电话": new MapEntry(4, "家庭电话", valueSpecifiers[14]),
        "家庭电话区号": new MapEntry(6, "家庭电话区号", valueSpecifiers[14]),
        "家用電話": new MapEntry(4, "家用電話", valueSpecifiers[14]),
        "家裡電話": new MapEntry(4, "家裡電話", valueSpecifiers[14]),
        "州": new MapEntry(1, "州", valueSpecifiers[9]),
        "州/省": new MapEntry(3, "州/省", valueSpecifiers[9]),
        "州または郡/市区町村": new MapEntry(10, "州または郡/市区町村", valueSpecifiers[8]),
        "州または郡／市区町村": new MapEntry(10, "州または郡／市区町村", valueSpecifiers[8]),
        "工作电话": new MapEntry(4, "工作电话", valueSpecifiers[15]),
        "工作电话区号": new MapEntry(6, "工作电话区号", valueSpecifiers[15]),
        "工作职位": new MapEntry(4, "工作职位", valueSpecifiers[5]),
        "工作職稱": new MapEntry(4, "工作職稱", valueSpecifiers[5]),
        "工作職銜": new MapEntry(4, "工作職銜", valueSpecifiers[5]),
        "工作電話": new MapEntry(4, "工作電話", valueSpecifiers[15]),
        "市区町村": new MapEntry(4, "市区町村", valueSpecifiers[8]),
        "市区町村（11文字以内）": new MapEntry(12, "市区町村（11文字以内）", valueSpecifiers[8]),
        "市区町村：": new MapEntry(5, "市区町村：", valueSpecifiers[8]),
        "市区郡町村": new MapEntry(5, "市区郡町村", valueSpecifiers[8]),
        "市外局番": new MapEntry(4, "市外局番", valueSpecifiers[12]),
        "役職": new MapEntry(2, "役職", valueSpecifiers[5]),
        "所属": new MapEntry(2, "所属", valueSpecifiers[13]),
        "所属組織": new MapEntry(4, "所属組織", valueSpecifiers[13]),
        "所属組織名": new MapEntry(5, "所属組織名", valueSpecifiers[13]),
        "手持電話": new MapEntry(4, "手持電話", valueSpecifiers[16]),
        "手提電話": new MapEntry(4, "手提電話", valueSpecifiers[16]),
        "手机": new MapEntry(2, "手机", valueSpecifiers[16]),
        "手机区号": new MapEntry(4, "手机区号", valueSpecifiers[16]),
        "手機": new MapEntry(2, "手機", valueSpecifiers[16]),
        "手機電話": new MapEntry(4, "手機電話", valueSpecifiers[16]),
        "携帯": new MapEntry(2, "携帯", valueSpecifiers[16]),
        "携帯番号": new MapEntry(4, "携帯番号", valueSpecifiers[16]),
        "携帯電話": new MapEntry(4, "携帯電話", valueSpecifiers[16]),
        "携帯電話番号": new MapEntry(6, "携帯電話番号", valueSpecifiers[16]),
        "日中電話番号": new MapEntry(6, "日中電話番号", valueSpecifiers[15]),
        "日間電話": new MapEntry(4, "日間電話", valueSpecifiers[15]),
        "昼間電話番号": new MapEntry(6, "昼間電話番号", valueSpecifiers[15]),
        "晚上電話": new MapEntry(4, "晚上電話", valueSpecifiers[14]),
        "晚間電話": new MapEntry(4, "晚間電話", valueSpecifiers[14]),
        "机构": new MapEntry(2, "机构", valueSpecifiers[13]),
        "机构/组织": new MapEntry(5, "机构/组织", valueSpecifiers[13]),
        "機構": new MapEntry(2, "機構", valueSpecifiers[13]),
        "機關": new MapEntry(2, "機關", valueSpecifiers[13]),
        "氏": new MapEntry(1, "氏", valueSpecifiers[3]),
        "氏名": new MapEntry(2, "氏名", valueSpecifiers[0]),
        "生年月日": new MapEntry(4, "生年月日", valueSpecifiers[4]),
        "生日": new MapEntry(2, "生日", valueSpecifiers[4]),
        "电子邮件": new MapEntry(4, "电子邮件", valueSpecifiers[6]),
        "电子邮件地址": new MapEntry(6, "电子邮件地址", valueSpecifiers[6]),
        "电话": new MapEntry(2, "电话", valueSpecifiers[12]),
        "电话号码": new MapEntry(4, "电话号码", valueSpecifiers[12]),
        "番地": new MapEntry(2, "番地", valueSpecifiers[7]),
        "番地：": new MapEntry(3, "番地：", valueSpecifiers[7]),
        "白天电话": new MapEntry(4, "白天电话", valueSpecifiers[15]),
        "白天电话区号": new MapEntry(6, "白天电话区号", valueSpecifiers[15]),
        "白天電話": new MapEntry(4, "白天電話", valueSpecifiers[15]),
        "省": new MapEntry(1, "省", valueSpecifiers[9]),
        "真实姓名": new MapEntry(4, "真实姓名", valueSpecifiers[0]),
        "真實姓名": new MapEntry(4, "真實姓名", valueSpecifiers[0]),
        "移动电话": new MapEntry(4, "移动电话", valueSpecifiers[16]),
        "移动电话区号": new MapEntry(6, "移动电话区号", valueSpecifiers[16]),
        "組織": new MapEntry(2, "組織", valueSpecifiers[13]),
        "組織∕機構": new MapEntry(5, "組織∕機構", valueSpecifiers[13]),
        "組織名": new MapEntry(3, "組織名", valueSpecifiers[13]),
        "縣∕市": new MapEntry(3, "縣∕市", valueSpecifiers[8]),
        "縣市": new MapEntry(2, "縣市", valueSpecifiers[8]),
        "縣（市）": new MapEntry(4, "縣（市）", valueSpecifiers[8]),
        "组织": new MapEntry(2, "组织", valueSpecifiers[13]),
        "职位": new MapEntry(2, "职位", valueSpecifiers[5]),
        "职务": new MapEntry(2, "职务", valueSpecifiers[5]),
        "联系人": new MapEntry(3, "联系人", valueSpecifiers[0]),
        "聯絡地址": new MapEntry(4, "聯絡地址", valueSpecifiers[7]),
        "聯絡電話": new MapEntry(4, "聯絡電話", valueSpecifiers[12]),
        "職位": new MapEntry(2, "職位", valueSpecifiers[5]),
        "職位名稱": new MapEntry(4, "職位名稱", valueSpecifiers[5]),
        "職務": new MapEntry(2, "職務", valueSpecifiers[5]),
        "職務名稱": new MapEntry(4, "職務名稱", valueSpecifiers[5]),
        "職場": new MapEntry(2, "職場", valueSpecifiers[13]),
        "職場電話番号": new MapEntry(6, "職場電話番号", valueSpecifiers[15]),
        "職業": new MapEntry(2, "職業", valueSpecifiers[5]),
        "職種": new MapEntry(2, "職種", valueSpecifiers[5]),
        "職稱": new MapEntry(2, "職稱", valueSpecifiers[5]),
        "職稱名稱": new MapEntry(4, "職稱名稱", valueSpecifiers[5]),
        "職銜": new MapEntry(2, "職銜", valueSpecifiers[5]),
        "自宅": new MapEntry(2, "自宅", valueSpecifiers[14]),
        "自宅電話": new MapEntry(4, "自宅電話", valueSpecifiers[14]),
        "自宅電話番号": new MapEntry(6, "自宅電話番号", valueSpecifiers[14]),
        "自宅電話：": new MapEntry(5, "自宅電話：", valueSpecifiers[14]),
        "行動": new MapEntry(2, "行動", valueSpecifiers[16]),
        "行動電話": new MapEntry(4, "行動電話", valueSpecifiers[16]),
        "街道": new MapEntry(2, "街道", valueSpecifiers[7]),
        "街道地址": new MapEntry(4, "街道地址", valueSpecifiers[7]),
        "誕生日": new MapEntry(3, "誕生日", valueSpecifiers[4]),
        "详细地址": new MapEntry(4, "详细地址", valueSpecifiers[7]),
        "身份证": new MapEntry(3, "身份证", valueSpecifiers[18]),
        "输入街道地址行": new MapEntry(7, "输入街道地址行", valueSpecifiers[7]),
        "辦公室電話": new MapEntry(5, "辦公室電話", valueSpecifiers[15]),
        "通訊地址": new MapEntry(4, "通訊地址", valueSpecifiers[7]),
        "連絡地址": new MapEntry(4, "連絡地址", valueSpecifiers[7]),
        "連絡電話": new MapEntry(4, "連絡電話", valueSpecifiers[12]),
        "邮政编码": new MapEntry(4, "邮政编码", valueSpecifiers[10]),
        "邮编": new MapEntry(2, "邮编", valueSpecifiers[10]),
        "郡市区(島・国名)": new MapEntry(9, "郡市区(島・国名)", valueSpecifiers[8]),
        "郡市区（島・国名）": new MapEntry(9, "郡市区（島・国名）", valueSpecifiers[8]),
        "郵便番号": new MapEntry(4, "郵便番号", valueSpecifiers[10]),
        "郵便番号：": new MapEntry(5, "郵便番号：", valueSpecifiers[10]),
        "郵遞區號": new MapEntry(4, "郵遞區號", valueSpecifiers[10]),
        "都道府県": new MapEntry(4, "都道府県", valueSpecifiers[9]),
        "都道府県：": new MapEntry(5, "都道府県：", valueSpecifiers[9]),
        "電子メール": new MapEntry(5, "電子メール", valueSpecifiers[6]),
        "電子信箱": new MapEntry(4, "電子信箱", valueSpecifiers[6]),
        "電子郵件": new MapEntry(4, "電子郵件", valueSpecifiers[6]),
        "電子郵件位址": new MapEntry(6, "電子郵件位址", valueSpecifiers[6]),
        "電子郵件信箱": new MapEntry(6, "電子郵件信箱", valueSpecifiers[6]),
        "電子郵件地址": new MapEntry(6, "電子郵件地址", valueSpecifiers[6]),
        "電子郵箱": new MapEntry(4, "電子郵箱", valueSpecifiers[6]),
        "電話": new MapEntry(2, "電話", valueSpecifiers[12]),
        "電話(ポケットベル)": new MapEntry(10, "電話(ポケットベル)", valueSpecifiers[17]),
        "電話(ポケベル)": new MapEntry(8, "電話(ポケベル)", valueSpecifiers[17]),
        "電話(会社)": new MapEntry(6, "電話(会社)", valueSpecifiers[15]),
        "電話(個人)": new MapEntry(6, "電話(個人)", valueSpecifiers[14]),
        "電話(勤務先)": new MapEntry(7, "電話(勤務先)", valueSpecifiers[15]),
        "電話(夜間)": new MapEntry(6, "電話(夜間)", valueSpecifiers[14]),
        "電話(日中)": new MapEntry(6, "電話(日中)", valueSpecifiers[15]),
        "電話(昼間)": new MapEntry(6, "電話(昼間)", valueSpecifiers[15]),
        "電話(職場)": new MapEntry(6, "電話(職場)", valueSpecifiers[15]),
        "電話(自宅)": new MapEntry(6, "電話(自宅)", valueSpecifiers[14]),
        "電話番号": new MapEntry(4, "電話番号", valueSpecifiers[12]),
        "電話番号(FAX)": new MapEntry(9, "電話番号(FAX)", valueSpecifiers[12]),
        "電話番号(ファクシミリ)": new MapEntry(12, "電話番号(ファクシミリ)", valueSpecifiers[12]),
        "電話番号(ファクス)": new MapEntry(10, "電話番号(ファクス)", valueSpecifiers[12]),
        "電話番号(ファックス)": new MapEntry(11, "電話番号(ファックス)", valueSpecifiers[12]),
        "電話番号(ポケットベル)": new MapEntry(12, "電話番号(ポケットベル)", valueSpecifiers[17]),
        "電話番号(ポケベル)": new MapEntry(10, "電話番号(ポケベル)", valueSpecifiers[17]),
        "電話番号(会社)": new MapEntry(8, "電話番号(会社)", valueSpecifiers[15]),
        "電話番号(個人)": new MapEntry(8, "電話番号(個人)", valueSpecifiers[14]),
        "電話番号(勤務先)": new MapEntry(9, "電話番号(勤務先)", valueSpecifiers[15]),
        "電話番号(固定)": new MapEntry(8, "電話番号(固定)", valueSpecifiers[12]),
        "電話番号(夜間)": new MapEntry(8, "電話番号(夜間)", valueSpecifiers[14]),
        "電話番号(携帯)": new MapEntry(8, "電話番号(携帯)", valueSpecifiers[16]),
        "電話番号(日中)": new MapEntry(8, "電話番号(日中)", valueSpecifiers[15]),
        "電話番号(昼間)": new MapEntry(8, "電話番号(昼間)", valueSpecifiers[15]),
        "電話番号(職場)": new MapEntry(8, "電話番号(職場)", valueSpecifiers[15]),
        "電話番号(自宅)": new MapEntry(8, "電話番号(自宅)", valueSpecifiers[14]),
        "電話番号※": new MapEntry(5, "電話番号※", valueSpecifiers[12]),
        "電話番号（FAX）": new MapEntry(9, "電話番号（FAX）", valueSpecifiers[12]),
        "電話番号（ファクシミリ）": new MapEntry(12, "電話番号（ファクシミリ）", valueSpecifiers[12]),
        "電話番号（ファクス）": new MapEntry(10, "電話番号（ファクス）", valueSpecifiers[12]),
        "電話番号（ファックス）": new MapEntry(11, "電話番号（ファックス）", valueSpecifiers[12]),
        "電話番号（ポケットベル）": new MapEntry(12, "電話番号（ポケットベル）", valueSpecifiers[17]),
        "電話番号（ポケベル）": new MapEntry(10, "電話番号（ポケベル）", valueSpecifiers[17]),
        "電話番号（会社）": new MapEntry(8, "電話番号（会社）", valueSpecifiers[15]),
        "電話番号（個人）": new MapEntry(8, "電話番号（個人）", valueSpecifiers[14]),
        "電話番号（勤務先）": new MapEntry(9, "電話番号（勤務先）", valueSpecifiers[15]),
        "電話番号（固定）": new MapEntry(8, "電話番号（固定）", valueSpecifiers[12]),
        "電話番号（夜間）": new MapEntry(8, "電話番号（夜間）", valueSpecifiers[14]),
        "電話番号（携帯）": new MapEntry(8, "電話番号（携帯）", valueSpecifiers[16]),
        "電話番号（日中）": new MapEntry(8, "電話番号（日中）", valueSpecifiers[15]),
        "電話番号（昼間）": new MapEntry(8, "電話番号（昼間）", valueSpecifiers[15]),
        "電話番号（職場）": new MapEntry(8, "電話番号（職場）", valueSpecifiers[15]),
        "電話番号（自宅）": new MapEntry(8, "電話番号（自宅）", valueSpecifiers[14]),
        "電話號碼": new MapEntry(4, "電話號碼", valueSpecifiers[12]),
        "電話（ポケットベル）": new MapEntry(10, "電話（ポケットベル）", valueSpecifiers[17]),
        "電話（ポケベル）": new MapEntry(8, "電話（ポケベル）", valueSpecifiers[17]),
        "電話（会社）": new MapEntry(6, "電話（会社）", valueSpecifiers[15]),
        "電話（個人）": new MapEntry(6, "電話（個人）", valueSpecifiers[14]),
        "電話（勤務先）": new MapEntry(7, "電話（勤務先）", valueSpecifiers[15]),
        "電話（夜間）": new MapEntry(6, "電話（夜間）", valueSpecifiers[14]),
        "電話（日中）": new MapEntry(6, "電話（日中）", valueSpecifiers[15]),
        "電話（昼間）": new MapEntry(6, "電話（昼間）", valueSpecifiers[15]),
        "電話（職場）": new MapEntry(6, "電話（職場）", valueSpecifiers[15]),
        "電話（自宅）": new MapEntry(6, "電話（自宅）", valueSpecifiers[14]),
        "電郵": new MapEntry(2, "電郵", valueSpecifiers[6]),
        "頭銜": new MapEntry(2, "頭銜", valueSpecifiers[5]),
        "验 证 码": new MapEntry(5, "验 证 码", valueSpecifiers[18]),
        "验证码": new MapEntry(3, "验证码", valueSpecifiers[18]),
        "가운데 이름": new MapEntry(6, "가운데 이름", valueSpecifiers[2]),
        "가운데 이름 첫자": new MapEntry(9, "가운데 이름 첫자", valueSpecifiers[2]),
        "가운데이름": new MapEntry(5, "가운데이름", valueSpecifiers[2]),
        "가운데이름 첫자": new MapEntry(8, "가운데이름 첫자", valueSpecifiers[2]),
        "국가": new MapEntry(2, "국가", valueSpecifiers[11]),
        "나라": new MapEntry(2, "나라", valueSpecifiers[11]),
        "낮시간 연락처": new MapEntry(7, "낮시간 연락처", valueSpecifiers[15]),
        "낮시간 연락처 지역 번호": new MapEntry(13, "낮시간 연락처 지역 번호", valueSpecifiers[15]),
        "낮시간연락처": new MapEntry(6, "낮시간연락처", valueSpecifiers[15]),
        "낮시간연락처 지역번호": new MapEntry(11, "낮시간연락처 지역번호", valueSpecifiers[15]),
        "낮시간연락처지역번호": new MapEntry(10, "낮시간연락처지역번호", valueSpecifiers[15]),
        "도": new MapEntry(1, "도", valueSpecifiers[9]),
        "도시": new MapEntry(2, "도시", valueSpecifiers[8]),
        "사서함": new MapEntry(3, "사서함", valueSpecifiers[10]),
        "상세 주소": new MapEntry(5, "상세 주소", valueSpecifiers[7]),
        "상세주소": new MapEntry(4, "상세주소", valueSpecifiers[7]),
        "생년월일": new MapEntry(4, "생년월일", valueSpecifiers[4]),
        "생일": new MapEntry(2, "생일", valueSpecifiers[4]),
        "성": new MapEntry(1, "성", valueSpecifiers[3]),
        "성 이름": new MapEntry(4, "성 이름", valueSpecifiers[0]),
        "성, 이름": new MapEntry(5, "성, 이름", valueSpecifiers[0]),
        "성이름": new MapEntry(3, "성이름", valueSpecifiers[0]),
        "소속": new MapEntry(2, "소속", valueSpecifiers[13]),
        "시": new MapEntry(1, "시", valueSpecifiers[8]),
        "업무용 전화": new MapEntry(6, "업무용 전화", valueSpecifiers[15]),
        "업무용 지역 번호": new MapEntry(9, "업무용 지역 번호", valueSpecifiers[15]),
        "업무용 지역번호": new MapEntry(8, "업무용 지역번호", valueSpecifiers[15]),
        "업무용전화": new MapEntry(5, "업무용전화", valueSpecifiers[15]),
        "업무용지역번호": new MapEntry(7, "업무용지역번호", valueSpecifiers[15]),
        "연락 번호": new MapEntry(5, "연락 번호", valueSpecifiers[12]),
        "우편": new MapEntry(2, "우편", valueSpecifiers[10]),
        "우편 번호": new MapEntry(5, "우편 번호", valueSpecifiers[10]),
        "우편번호": new MapEntry(4, "우편번호", valueSpecifiers[10]),
        "이름": new MapEntry(2, "이름", valueSpecifiers[1]),
        "이메일": new MapEntry(3, "이메일", valueSpecifiers[6]),
        "이메일 주소": new MapEntry(6, "이메일 주소", valueSpecifiers[6]),
        "이메일주소": new MapEntry(5, "이메일주소", valueSpecifiers[6]),
        "저녁 시간 연락처": new MapEntry(9, "저녁 시간 연락처", valueSpecifiers[14]),
        "저녁 연락처": new MapEntry(6, "저녁 연락처", valueSpecifiers[14]),
        "저녁 연락처 지역 번호": new MapEntry(12, "저녁 연락처 지역 번호", valueSpecifiers[14]),
        "저녁 연락처 지역번호": new MapEntry(11, "저녁 연락처 지역번호", valueSpecifiers[14]),
        "저녁시간 연락처": new MapEntry(8, "저녁시간 연락처", valueSpecifiers[14]),
        "저녁시간연락처": new MapEntry(7, "저녁시간연락처", valueSpecifiers[14]),
        "저녁연락처": new MapEntry(5, "저녁연락처", valueSpecifiers[14]),
        "저녁연락처 지역 번호": new MapEntry(11, "저녁연락처 지역 번호", valueSpecifiers[14]),
        "저녁연락처 지역번호": new MapEntry(10, "저녁연락처 지역번호", valueSpecifiers[14]),
        "저녁연락처지역번호": new MapEntry(9, "저녁연락처지역번호", valueSpecifiers[14]),
        "전체 이름": new MapEntry(5, "전체 이름", valueSpecifiers[0]),
        "전화": new MapEntry(2, "전화", valueSpecifiers[12]),
        "전화 번호": new MapEntry(5, "전화 번호", valueSpecifiers[12]),
        "전화번호": new MapEntry(4, "전화번호", valueSpecifiers[12]),
        "조직": new MapEntry(2, "조직", valueSpecifiers[13]),
        "주": new MapEntry(1, "주", valueSpecifiers[9]),
        "주소": new MapEntry(2, "주소", valueSpecifiers[7]),
        "주소 1": new MapEntry(4, "주소 1", valueSpecifiers[7]),
        "주소1": new MapEntry(3, "주소1", valueSpecifiers[7]),
        "중간 이름": new MapEntry(5, "중간 이름", valueSpecifiers[2]),
        "중간 이름 첫자": new MapEntry(8, "중간 이름 첫자", valueSpecifiers[2]),
        "중간이름": new MapEntry(4, "중간이름", valueSpecifiers[2]),
        "중간이름 첫자": new MapEntry(7, "중간이름 첫자", valueSpecifiers[2]),
        "지역 번호": new MapEntry(5, "지역 번호", valueSpecifiers[12]),
        "지역번호": new MapEntry(4, "지역번호", valueSpecifiers[12]),
        "직위": new MapEntry(2, "직위", valueSpecifiers[5]),
        "직장 전화": new MapEntry(5, "직장 전화", valueSpecifiers[15]),
        "직장 지역 번호": new MapEntry(8, "직장 지역 번호", valueSpecifiers[15]),
        "직장전화": new MapEntry(4, "직장전화", valueSpecifiers[15]),
        "직장지역번호": new MapEntry(6, "직장지역번호", valueSpecifiers[15]),
        "직책": new MapEntry(2, "직책", valueSpecifiers[5]),
        "직함": new MapEntry(2, "직함", valueSpecifiers[5]),
        "집 전화": new MapEntry(4, "집 전화", valueSpecifiers[14]),
        "집 지역 번호": new MapEntry(7, "집 지역 번호", valueSpecifiers[14]),
        "집 지역번호": new MapEntry(6, "집 지역번호", valueSpecifiers[14]),
        "집전화": new MapEntry(3, "집전화", valueSpecifiers[14]),
        "집지역번호": new MapEntry(5, "집지역번호", valueSpecifiers[14]),
        "징장 지역번호": new MapEntry(7, "징장 지역번호", valueSpecifiers[15]),
        "출생일": new MapEntry(3, "출생일", valueSpecifiers[4]),
        "태어난 날": new MapEntry(5, "태어난 날", valueSpecifiers[4]),
        "태어난 날짜": new MapEntry(6, "태어난 날짜", valueSpecifiers[4]),
        "팩스": new MapEntry(2, "팩스", valueSpecifiers[12]),
        "호출 번호": new MapEntry(5, "호출 번호", valueSpecifiers[17]),
        "호출기": new MapEntry(3, "호출기", valueSpecifiers[17]),
        "호출기 번호": new MapEntry(6, "호출기 번호", valueSpecifiers[17]),
        "호출기 지역 번호": new MapEntry(9, "호출기 지역 번호", valueSpecifiers[17]),
        "호출기 지역번호": new MapEntry(8, "호출기 지역번호", valueSpecifiers[17]),
        "호출기지역번호": new MapEntry(7, "호출기지역번호", valueSpecifiers[17]),
        "회사": new MapEntry(2, "회사", valueSpecifiers[13]),
        "회사 전화": new MapEntry(5, "회사 전화", valueSpecifiers[15]),
        "회사 지역 번호": new MapEntry(8, "회사 지역 번호", valueSpecifiers[15]),
        "회사 지역번호": new MapEntry(7, "회사 지역번호", valueSpecifiers[15]),
        "회사전화": new MapEntry(4, "회사전화", valueSpecifiers[15]),
        "회사지역번호": new MapEntry(6, "회사지역번호", valueSpecifiers[15]),
        "휴대 전화": new MapEntry(5, "휴대 전화", valueSpecifiers[16]),
        "휴대 전화 지역 번호": new MapEntry(11, "휴대 전화 지역 번호", valueSpecifiers[16]),
        "휴대 전화 지역번호": new MapEntry(10, "휴대 전화 지역번호", valueSpecifiers[16]),
        "휴대전화": new MapEntry(4, "휴대전화", valueSpecifiers[16]),
        "휴대전화 지역 번호": new MapEntry(10, "휴대전화 지역 번호", valueSpecifiers[16]),
        "휴대전화 지역번호": new MapEntry(9, "휴대전화 지역번호", valueSpecifiers[16]),
        "휴대전화지역번호": new MapEntry(8, "휴대전화지역번호", valueSpecifiers[16]),
        "휴대폰": new MapEntry(3, "휴대폰", valueSpecifiers[16]),
        "휴대폰 지역 번호": new MapEntry(9, "휴대폰 지역 번호", valueSpecifiers[16]),
        "휴대폰 지역번호": new MapEntry(8, "휴대폰 지역번호", valueSpecifiers[16]),
        "휴대폰지역번호": new MapEntry(7, "휴대폰지역번호", valueSpecifiers[16])
    },
    addressBookFieldLabelPatternMatchers = [new PatternMatcherClass(["姓名", "真实姓名", "全名", "повнеім'я", "повнеім’я", "повне ім'я", "повне ім’я", "tam adı", "tam isim", "tam ad", "ชื่อและนามสุกล", "ชื่อเต็ม", "fullständigt namn", "hela namnet", "nombre completo", "celé meno", "Ф.И.О.", "ФИО", "полноеимя", "полное имя", "nume complet", "nume întreg", "fullt navn", "fulltnavn", "성이름", "성, 이름", "성 이름", "전체 이름", "フルネーム", "氏名", "名前", "お名前", "nome completo", "nome e cognome", "puno ime", "שם מלא", "Voller Name", "Vollständiger Name", "nom entier", "täydellinen nimi", "koko nimi", "ονοματεπώνυμο", "fuldt navn", "fulde navn", "nom complet", "الاسم الكامل", "first and last name", "first and last", "full name", "fullname", "ім’я", "ім'я", "birinci ad", "birinci adı", "ad", "ชื่อหน้า", "ชื่อแรก", "ชื่อจริง", "ชื่อตัว", "ชื่อต้น", "ชื่อ", "dopnamn", "fnamn", "förnamn", "förn.", "nombre", "krst. meno", "krst meno", "krstné meno", "krstné", "Имя", "pnume", "nume botez", "pre nume", "prenume", "nome de baptismo", "primeironome", "pnome", "primeiro nome", "primeiro", "pierwsze imię", "imię", "døpenavn", "for-", "이름", "名（全角8文字以内）", "nome", "שם פרטי", "פרטי", "Vorname", "prénom usuel", "petit nom", "nom de baptême", "prénom", "kutsumanimi", "etun.", "etu", "etunimi", "όνομα", "voornaam", "døbenavn", "f-navn", "fnavn", "fornavn", "الاسم الأول", "الأول", "forename", "given name", "firstname", "f name", "namef", "fname", "first name", "first", "中間名", "中间名", "побатькові", "по батькові", "göbek adı", "ikinci adı", "ikinci isim", "ikinci ad", "กลาง", "ชื่อกลางระหว่าง", "ชื่อกลาง", "ชื่อกลางย่อ", "ตัวย่อชื่อกลาง", "mellan", "andranamn", "mellannamn", "mellan initial", "mellaninitial", "segundo nombre", "stredné", "stredné meno", "iniciála stredného", "iniciála stredného mena", "Отчество", "secundar", "alt prenume", "prenume secundar", "meio", "nomedomeio", "nome do meio", "inicialdomeio", "inicial do meio", "2º nome", "inicial do 2º nome", "inicjał drugiego imienia", "drugie imię", "drugie", "mellom-", "m-navn", "mellomnavn", "initial, mellomnavn", "forbokstav, mellomnavn", "가운데이름 첫자", "가운데 이름 첫자", "중간이름 첫자", "중간 이름 첫자", "가운데이름", "가운데 이름", "중간이름", "중간 이름", "ミドルネーム", "secondo nome", "iniziale secondo nome", "iniziale", "drugo ime", "שם אמצעי", "אמצעי", "Initialen", "Mittelname", "nom matronymique", "matronyme", "second prénom", "initiale autre prénom", "autre prénom", "initiale deuxième prénom", "initiale second prénom", "deuxième prénom", "toinen nimi", "toinen etunimi", "μεσαίο όνομα", "initiaal tweede naam", "mellem", "mellem navn", "initial, mellemnavn", "forbogstav, mellemnavn", "segon nom", "الاسم الأوسط", "الحرف الأول من الاسم الأوسط", "middle", "middlename", "middle name", "middleinitial", "middle initial", "姓氏", "прізвище", "soyismi", "soyisim", "soyadı", "soyad", "ชื่อสกุลท้าย", "ชื่อท้าย", "ชื่อสกุล", "สกุล", "นามสกุล", "ท้าย", "enamn", "familjenamn", "efternamn", "eftern.", "apellidos", "apellido", "Фамилия", "familie", "nume familie", "apelido", "últimonome", "únome", "último nome", "último", "sobrenome", "nazwisko", "e-navn", "etternavn", "etter-", "성", "氏", "姓", "cognome", "prezime", "שם משפחה", "משפחה", "Familienname", "Nachname", "nom patronymique", "nom patronyme", "patronyme", "nom", "nom de famille", "sukun.", "suku", "sukunimi", "επώνυμο", "achternaam", "familienavn", "enavn", "Efternavn", "efter", "cognoms", "cognom", "اسم العائلة", "surname", "lastname", "l name", "namel", "lname", "last name", "last", "出生年月日", "出生", "出生日期", "生日", "народився", "дата народження", "день народження", "doğum tarihi", "doğum", "doğum günü", "doğumgünü", "เกิด", "วันที่เกิด", "วันเกิด", "född", "födelsedatum", "födelsedag", "cumpleaños", "nacimiento", "fecha de nacimiento", "narodený/á", "dátum narodenia", "narodeniny", "родилась", "родился", "датарождения", "деньрождения", "дата рождения", "день рождения", "nascut", "data nașterii", "zi naștere", "zi de naștere", "nascido", "nascido(a)", "data de nascimento", "aniversário", "urodzona", "urodzony", "data urodzenia", "urodziny", "bursdag", "태어난 날짜", "태어난 날", "출생일", "생년월일", "생일", "お誕生日", "生年月日", "誕生日", "nato/a", "data di nascita", "compleanno", "datum rođenja", "rođendan", "יום הולדת", "תאריך לידה", "Geburtsdatum", "Geburtstag", "anniversaire", "né(e) le", "naissance", "date de naissance", "syntynyt", "syntymäpäivä", "γέννηση", "ημερομηνία γέννησης", "γενέθλια", "geboren", "geboortedatum", "verjaardag", "født", "fødselsdato", "fødselsdag", "aniversari", "naixença", "data de naixença", "مولود", "تاريخ الميلاد", "born", "date of birth", "birth year", "birth month", "birth day", "birthday", "birth date", "頭銜", "職銜", "工作職銜", "工作職稱", "職務名稱", "職務", "職位名稱", "職位", "職稱名稱", "職稱", "工作职位", "职务", "职位", "посада", "meslek", "mesleği", "iş ünvanı", "ünvanı", "ünvan", "ชื่อตำแหน่ง", "ตำแหน่ง", "yrke", "befattning", "titel", "jobbtitel", "trabajo", "puesto de trabajo", "pozícia", "pracovná pozícia", "Должность", "роддеятельности", "Род деятельности", "виддеятельности", "Вид деятельности", "Профессия", "funcție", "cargoprofissional", "cargo profissional", "cargo", "stanowisko", "직함", "직책", "직위", "職業", "職種", "役職", "ruolo professionale", "qualifica", "profesija", "posao", "titula", "תפקיד", "Tätigkeit", "Berufsbezeichnung", "Beruf", "poste", "profession", "activité", "ammattinimike", "ammatti", "εργασία", "θέση εργασίας", "werk", "functie", "stilling", "feina", "lloc de treball", "càrrec", "المسمى الوظيفي", "company title", "jobtitle", "job title", "電郵", "電子郵箱", "電子信箱", "電子郵件信箱", "電子郵件地址", "電子郵件位址", "電子郵件", "电子邮件地址", "电子邮件", "ел. адреса", "ел.адреса", "електроннаадреса", "електронна адреса", "ел. пошта", "ел.пошта", "електроннапошта", "електронна пошта", "eposta adresi", "e-posta adresi", "e-posta", "eposta", "อี-เมล", "ที่อยู่อีเมล", "อีเมลที่อยู่", "อีเมล", "mejladress", "mejl", "emejl", "epostadress", "e-postadress", "correo electrónico", "emailAdr", "emailAdresa", "Адрес email", "Адрес e-mail", "Электронный адрес", "Адрес электронной почты", "adresăemail", "mail", "epost", "e-mail주소", "e-mail 주소", "email주소", "email 주소", "이메일주소", "이메일 주소", "이메일", "メルアド", "メアド", "Eメールアドレス", "電子メール", "Email アドレス", "Emailアドレス", "メールアドレス", "メール", "ind. posta elettronica", "posta elettronica", "indirizzo di posta elettronica", "indirizzo e-mail", "ind. e-mail", "e-pošta", "adresa e-pošte", "e-mail adresa", "מייל", "דוא״ל", "E-Mail-Adresse", "E-Mail Adresse", "adel", "mél.", "cé", "c. élec.", "adresse Internet", "adrélec", "adresse e-mail", "adresse courriel", "adresse de courrier électronique", "adresse de courriel", "courrier électronique", "adresse électronique", "adresse de messagerie", "messagerie électronique", "courriel", "sähköpostiosoite", "s-posti", "sähköposti", "e-postadresse", "e-postadr", "e-post", "correu electrònic", "البريد الإلكتروني", "e-mail", "emailAddress", "emailAddr", "email", "详细地址", "地址", "输入街道地址行", "街道地址", "街道", "адреса1", "адреса 1", "рядок адреси", "проспект", "провулок", "вул.", "вулиця", "cad.", "cadde adresi", "cadde", "ที่อยู่ 1", "ที่อยู่แรก", "ป้อนบรรทัดที่อยู่", "ชื่อถนน", "ถนนที่อยู่", "ที่อยู่ถนน", "ถนน", "adress 1", "adress1", "adr.", "gatuadr.", "väg", "gatuadress", "gata", "dirección1", "dirección 1", "calle", "adresa ul.", "adresa ulice", "Ул.", "Улица", "adresă stradală", "adresă1", "adresă 1", "strada", "endereço da rua", "endereço 1", "endereço1", "rua", "angiAdresseAdresselinje", "veiadresse", "vei", "gateadresse", "gate", "주소 1", "주소1", "상세 주소", "상세주소", "番地：", "住所入力欄", "住所（17文字以内）", "それ以降の住所", "番地", "indirizzo 1", "indirizzo1", "linea indirizzo", "indirizzo postale", "via", "adresa 1", "adresa1", "kućna adresa", "ulica", "רחוב", "Str.", "Strasse", "Straße", "adresse civique", "adresse municipale", "adresse géographique", "adresse postale 1", "1ère adresse", "adresse postale", "rue", "osoite 1", "k.", "katu", "katuosoite", "διεύθυνση (γραμμή 1)", "οδός", "adres 1", "adres1", "straat", "adresse 1", "adresse1", "angivAdresseAdresselinje", "vejadresse", "vej", "gadeadresse", "gade", "adreça1", "adreça 1", "carrer", "العنوان ١", "أدخل عنوان سطر العنوان", "عنوان الشارع", "الشارع", "address 1", "address1", "house name", "enterAddressAddressLine", "addrstreet", "streetaddress", "street address", "street", "縣∕市", "縣（市）", "縣市", "城市", "місто", "il", "şehir", "เมือง", "hemstad", "bostadsort", "ort", "kommun", "stad", "ciudad", "mesto", "г.", "Населенный пункт", "Город", "oraș", "cidade", "sted", "poststed", "도시", "시", "郡市区(島・国名)", "州または郡/市区町村", "郡市区（島・国名）", "州または郡／市区町村", "市区町村：", "市区町村（11文字以内）", "市区郡町村", "市区町村", "città", "grad", "יישוב", "עיר", "Stadt", "ville", "postitoimipaikka", "paikkakunta", "kaupunki", "πόλη", "plaats", "ciutat", "المدينة", "city", "省", "州/省", "обл.", "область", "eyalet", "รัฐ", "län", "provins", "provincia", "štát", "Край", "Регион", "Республика", "județ", "stat", "região", "estado", "도", "주", "州", "都道府県：", "都道府県", "stato", "država", "מדינה", "מחוז", "Bundesstaat", "Bundesland", "province", "région", "état", "osavaltio", "lääni", "νομός", "πολιτεία", "staat", "delstat", "província", "estat", "الولاية", "state", "郵遞區號", "邮编", "邮政编码", "поштовий код", "поштовий індекс", "індекс", "zipkod", "zip kod", "zip kodu", "posta kodu", "รหัสส่งจดหมาย", "รหัสจดหมาย", "รหัสไปรษณีย์", "ไปรษณีย์", "รหัส", "smerovacie číslo", "poštové smerovacie číslo", "PSČ", "Индекс", "Почтовый индекс", "codpoștal", "cod poștal", "códigopostal", "cp", "código postal", "postnummer", "사서함", "우편", "우편번호", "우편 번호", "〒", "郵便番号：", "郵便番号", "codice postale", "codice avviamento postale", "codice di avviamento postale", "CAP", "poštanski br.", "poštanski broj", "מיקוד", "Postleitzahl", "PLZ", "code postal américain", "code ZIP", "NPA", "numéro postal d'acheminement", "numéro postal", "code postal", "postinro", "postinumero", "Τ.Κ.", "ταχυδρομικός κωδικός", "postnr.", "codi postal", "الرمز البريدي", "post code", "postcode", "postal code", "postalcode", "postal", "zip code", "zipcode", "zip", "國家或地區", "國家∕地區", "國家", "地区", "国家", "国家/地区", "країна", "ülke", "ประเทศ", "krajina", "Страна", "țară", "나라", "국가", "国／地域名：", "国／地域名", "国/地域名：", "国/地域名", "国、地域", "国", "paese", "zemlja", "pays", "maa", "χώρα", "land", "país", "البلد", "country", "晚上電話", "晚間電話", "夜間電話", "住宅電話", "家裡電話", "家用電話", "住家電話", "夜晚电话区号", "家庭电话区号", "夜间电话", "家庭电话", "код вечірнього телефону", "код дом.", "коддом.тел.", "код дом. тел.", "код дом.телефону", "код дом. телефону", "код домашнього телефону", "вечірній телефон", "дом.", "дом.тел.", "дом. тел.", "дом.телефон", "дом. телефон", "домашній телефон", "akşam alan kodu", "ev alan kodu", "akşam telefonu", "telefon (ev)", "ev telefonu", "รหัสเบอร์บ้าน", "รหัสเบอร์ส่วนตัว", "รหัสพื้นที่ส่วนตัว", "รหัสบ้าน", "บ้านรหัสพื้นที่", "รหัสพื้นที่บ้าน", "เบอร์ส่วนตัว", "เบอร์ติดต่อ", "โทรศัพท์บ้าน", "เบอร์บ้าน", "riktnummer kvällstid", "riktnummer hem", "telefon kvällstid", "kvällsnummer", "telefon hem", "hemtelefon", "teléfono noche", "teléfono casa", "teléfono de casa", "domáca predvoľba", "telefónna predvoľba domov", "predvoľba domov", "večerný telefón", "číslo domov", "telefón domov", "domáci telefón", "Код домашнего телефонного номера", "Домашний телефонный номер", "Домашний номер телефона", "Домашний номер", "Вечером", "В вечерние часы", "Домашний", "домашний телефон", "prefix telefon seară", "prefix telefon domiciliu", "prefix telefon acasă", "telefon seară", "telefon domiciliu", "telefon acasă", "códigodeáreanoite", "códigodeárea noite", "código de área noite", "códigodeáreadecasa", "códigodeárea de casa", "código de área de casa", "telefone à noite", "telefonenoite", "telefone de casa", "telefonedecasa", "código de área (noturno)", "código de área (local)", "telefone (noturno)", "telefone (casa)", "kveldsretningsnummer", "retningsnummer, kveldstid", "retningsnummer, kveld", "retningsnummer, hjem", "telefon, kveldstid", "kveldstelefon", "telefon, hjem", "hjemmetelefon", "저녁연락처지역번호", "저녁연락처 지역번호", "저녁연락처 지역 번호", "저녁 연락처 지역번호", "저녁 연락처 지역 번호", "집지역번호", "집 지역번호", "집 지역 번호", "저녁 시간 연락처", "저녁시간 연락처", "저녁시간연락처", "저녁 연락처", "저녁연락처", "집 전화", "집전화", "自宅電話：", "自宅電話", "電話（個人）", "電話（夜間）", "電話（自宅）", "電話(個人)", "電話(夜間)", "電話(自宅)", "電話番号（個人）", "電話番号（夜間）", "電話番号（自宅）", "電話番号(個人)", "電話番号(夜間)", "電話番号(自宅)", "個人電話番号", "夜間電話番号", "自宅電話番号", "自宅", "prefisso telefono abitazione", "prefisso telefono di casa", "prefisso ore serali", "prefisso tel. privato", "prefisso telefono casa", "telefono ore serali", "telefono abitazione", "telefono privato", "numero di telefono casa", "telefono casa", "večernji telefon", "kućni telefon", "בית", "טלפון בית", "Rufnummer abends", "Rufnummer (privat)", "Rufnummer privat", "Telefon abends", "Telefon (privat)", "Telefon privat", "numéro de téléphone domicile", "téléphone (soirée)", "téléphone de domicile", "téléphone de résidence", "téléphone (le soir)", "téléphone domicile", "téléphone maison", "téléphone privé", "téléphone résidentiel", "suuntanumero iltaisin", "suuntanumero koti", "kodin suuntanumero", "iltaisin", "kotipuh.", "kotinro", "koti", "kotinumero", "kotipuhelin", "τηλέφωνο εκτός ωρών εργασίας", "τηλέφωνο οικίας", "netnummer 's avonds", "netnummer thuis", "netnummer privé", "telefoonnnummer thuis", "telefoon 's avonds", "telefoonnummer privé", "telefoon privé", "telefoon thuis", "områdenummer, aften", "områdenummer, privat", "telefon, aften", "privat", "hjemnummer", "telèfono nit", "telèfono casa", "telèfon de casa", "كود المنطقة للهاتف في المساء", "كود المنطقة السكنية", "الهاتف في المساء ", "الهاتف في المساء", "هاتف المنزل", "eveningareacode", "evening areacode", "evening area code", "homeareacode", "home areacode", "home area code", "evening phone", "eveningphone", "home phone", "homephone", "白天電話", "日間電話", "公務電話", "辦公室電話", "工作電話", "商用電話", "公司電話", "公司电话区号", "白天电话区号", "工作电话区号", "公司电话", "白天电话", "工作电话", "код денного телефону", "код роб.", "кодроб.тел.", "код роб. тел.", "код роб.телефону", "код роб. телефону", "код робочого телефону", "денний телефон", "роб.", "роб.тел.", "роб. тел.", "роб.телефон", "роб. телефон", "робочий телефон", "iş alan kodu", "gündüz alan kodu", "gündüz telefonu", "telefon (iş)", "şirket telefonu", "iş telefonu", "ธุรกิจรหัสพื้นที่", "รหัสธุรกิจ", "รหัสพื้นที่ธุรกิจ", "พื้นที่รหัสบริษัท", "รหัสบริษัท", "รหัสพื้นที่บริษัท", "ที่ีรหัสทำงาน", "ที่ทำงานรหัส", "รหัสทำงาน", "รหัสพื้นที่งาน", "รหัสที่ทำงาน", "รหัสพื้นที่ทำงาน", "โทรศัพท์ธุรกิจ", "เบอร์ธุรกิจ", "โทรศัพท์บริษัท", "เบอร์บริษัท", "เบอร์ที่ทำงาน", "โทรศัพท์ติดต่องาน", "โทรศัพท์งาน", "เบอร์งาน", "โทรศัพท์ที่ทำงาน", "เบอร์ทำงาน", "riktnummer kontoret", "riktnummer företaget", "riktnummer dagtid", "riktnummer arbetet", "telefon företaget", "företagstelefon", "telefon dagtid", "dagstelefon", "telefon kontoret", "kontorstelefon", "telefon arbetet", "arbetstelefon", "teléfono del trabajo", "teléfono trabajo", "teléfono día", "predvoľba spoločnosti", "predvoľba firmy", "denná predvoľba", "pracovná predvoľba", "predvoľba do práce", "firemné číslo", "firemný telefón", "denné číslo", "denný telefón", "číslo do práce", "telefón do práce", "pracovný telefón", "Код рабочего телефонного номера", "Рабочий телефонный номер", "Рабочий номер телефона", "Днем", "В дневные часы", "Служебный", "Служебный телефон", "Раб. телефон", "Раб.", "Рабочий", "рабочий телефон", "prefix telefon zi", "prefix telefon companie", "prefix telefon lucru", "prefix telefon birou", "prefix telefon serviciu", "telefon zi", "telefon companie", "telefon lucru", "telefon birou", "telefon serviciu", "códigodeáreacomercial", "códigodeárea comercial", "código de área comercial", "códigodeáreadaempresa", "códigodeárea da empresa", "código de área da empresa", "códigodeáreadedia", "códigodeárea de dia", "código de área de dia", "códigodeáreadotrabalho", "códigodeárea do trabalho", "código de área do trabalho", "telefone comercial", "telefonecomercial", "telefone da empresa", "telefoneempresa", "telefone durante o dia", "telefone de dia", "telefonedia", "telefone do trabalho", "telefonetrabalho", "código de área (empresa)", "código de área (diurno)", "código de área (trabalho)", "telefone (empresa)", "telefone (diurno)", "telefone (trabalho)", "retningsnummer, selskap", "retningsnummer, bedrift", "firmaretningsnummer", "retningsnummer, firma", "dagretningsnummer", "retningsnummer, dag", "retningsnummer, dagtid", "jobbretningsnummer", "retningsnummer, arbeid", "retningsnummer, jobb", "arbeidstelefon", "jobbtelefon", "telefon, jobb", "telefon, arbeid", "업무용지역번호", "업무용 지역번호", "업무용 지역 번호", "회사지역번호", "회사 지역번호", "회사 지역 번호", "낮시간연락처지역번호", "낮시간연락처 지역번호", "낮시간 연락처 지역 번호", "직장지역번호", "징장 지역번호", "직장 지역 번호", "업무용 전화", "업무용전화", "회사 전화", "회사전화", "낮시간 연락처", "낮시간연락처", "직장 전화", "직장전화", "会社電話：", "会社電話", "電話(昼間)", "電話(日中)", "電話(職場)", "電話(勤務先)", "電話(会社)", "電話（昼間）", "電話（日中）", "電話（職場）", "電話（勤務先）", "電話（会社）", "電話番号(昼間)", "電話番号(日中)", "電話番号(職場)", "電話番号(勤務先)", "電話番号(会社)", "電話番号（昼間）", "電話番号（日中）", "電話番号（職場）", "電話番号（勤務先）", "電話番号（会社）", "昼間電話番号", "日中電話番号", "職場電話番号", "会社電話番号", "勤務先電話番号", "prefisso numero lavoro", "prefisso telefono azienda", "prefisso telefono ufficio", "prefisso ufficio", "prefisso telefono lavoro", "prefisso lavoro", "numero di tel. ufficio", "telefono azienda", "telefono ore ufficio", "numero di telefono lavoro", "tel. ufficio", "telefono ufficio", "tel. lavoro", "telefono lavoro", "telefon tvrtke", "službeni telefon", "dnevni telefon", "poslovni telefon", "משרד", "עבודה", "טלפון בעבודה", "Rufnummer dienstlich", "Rufnummer tagsüber", "Rufnummer (geschäftlich)", "Rufnummer geschäftlich", "Telefon dienstlich", "Telefon tagsüber", "Telefon (geschäftlich)", "Telefon geschäftlich", "téléphone (société)", "téléphone (entreprise)", "téléphone (jour)", "téléphone (journée)", "téléphone de travail", "téléphone bureau", "téléphone professionnel", "suuntanumero yritys", "suuntanumero työ", "työnumeron suuntanumero", "työpuhelimen suuntanumero", "yritysnumero", "yrityksen numero", "päivisin", "puhelin päiväsaikaan", "työnumero", "työpuhelin", "τηλέφωνο κατά τις πρωϊνές ώρες", "τηλέφωνο κατά τις ώρες εργασίας", "τηλέφωνο εργασίας", "netnummer zakelijk", "netnummer bedrijf", "netnummer overdag", "netnummer werk", "telefoonnummer zakelijk", "telefoon zakelijk", "telefoonnummer bedrijf", "telefoon bedrijf", "telefoonnummer overdag", "telefoon overdag", "telefoonnummer werk", "telefoon werk", "områdenummer, selskab", "områdenummer, firma", "områdenummer, dag", "områdenummer om dagen", "områdenummer, arbejde", "arbejdstelefon", "telefon, firma", "firmatelfon", "telefon, dagtid", "telefon, dag", "dagtelefon", "telefon, arbejde", "arbejdsnummer", "telèfon de la feina", "telèfon feina", "telèfon dia", "كود منطقة العمل", "كود منطقة الشركة", "كود منطقة الهاتف في الصباح", "كود منطقة هاتف العمل", "هاتف الشركة", "الهاتف في الصباح", "هاتف العمل", "businessareacode", "business areacode", "business area code", "companyareacode", "company areacode", "company area code", "dayareacode", "day areacode", "day area code", "workareacode", "work areacode", "work area code", "business phone", "businessphone", "company phone", "companyphone", "daytime telephone", "daytime phone", "day phone", "dayphone", "work phone", "workphone", "手持電話", "手提電話", "手機電話", "手機", "大哥大電話", "大哥大", "行動電話", "行動", "手机区号", "移动电话区号", "手机", "移动电话", "код сотового телефону", "код моб.", "кодмоб.тел.", "код моб. тел.", "код моб.телефону", "код моб. телефону", "код мобільного телефону", "сотовий телефон", "моб.", "моб.тел.", "моб. тел.", "моб.телефон", "моб. телефон", "мобільний телефон", "cep numarası", "cep", "mobil telefon", "telefon (cep)", "cep telefonu", "พื้นที่รหัสโทรศัพท์มือถือ", "รหัสโทรศัพท์ส่วนตัว", "รหัสพื้นที่โทรศัพท์ส่วนตัว", "รหัสพื้นที่มือถือ", "รหัสโทรศัพท์มือถือ", "รหัสพื้นที่โทรศัพท์มือถือ", "โทรศัพท์ส่วนตัว", "โทรศัพท์มือถือ", "มือถือ", "riktnummer mobiltelefon", "riktnummer mobil", "mobiltel", "móvil", "teléfono móvil", "mobilná predvoľba", "predvoľba mobilného telefónu", "mobilný telefón", "Мобильный телефонный номер", "Мобильный номер телефона", "Номер оператора сотовой связи", "Номер оператора мобильной связи", "Код оператора сотовой связи", "Код оператора мобильной связи", "Телефон сотовой связи", "Телефон мобильной связи", "Сотовый", "Сотовый телефон", "Мобильный", "мобильный телефон", "prefix mobil", "celular", "telefon celular", "telefon mobil", "códigodeáreadocelular", "códigodeárea do celular", "código de área do celular", "códigodeáreadotelemóvel", "códigodeárea do telemóvel", "código de área do telemóvel", "telefone celular", "telefonecelular", "telemóvel", "código de área (celular)", "telefone (celular)", "mobilretningsnummer", "retningsnummer, mobil", "retningsnummer, mobiltelefon", "mobil", "휴대폰지역번호", "휴대폰 지역번호", "휴대폰 지역 번호", "휴대전화지역번호", "휴대 전화 지역 번호", "휴대 전화 지역번호", "휴대전화 지역 번호", "휴대전화 지역번호", "휴대폰", "휴대 전화", "휴대전화", "ケータイ番号", "ケータイ電話番号", "ケータイ電話", "ケータイ", "携帯番号", "電話番号(携帯)", "電話番号（携帯）", "携帯電話番号", "携帯電話", "携帯", "prefisso cell.", "telefono cell.", "prefisso telefono cellulare", "prefisso cellulare", "cellulare", "telefono cellulare", "mobitel", "mobilni telefon", "סלולרי", "נייד", "Vorwahl (Netzbetreiber)", "Vorwahl Netzbetreiber", "Netzbetreiber-Vorwahl", "Vorwahl (Mobilfunk)", "Vorwahl Mobilfunk", "Mobilfunk-Vorwahl", "Mobiltelefon-Vorwahl", "Vorwahl (Mobil)", "Vorwahl (Mobiltelefon)", "Vorwahl Mobil", "Vorwahl Mobiltelefon", "Handy", "numéro de mobile", "téléphone cellulaire portable", "téléphone cellulaire portatif", "cell.", "tél. cell.", "cellulaire", "téléphone mobile", "téléphone cellulaire", "téléphone portable", "operaattoritunnus", "matkapuhelimen operaattoritunnus", "mobiili", "matkap.", "matkapuhelin", "κινητό", "κινητό τηλέφωνο", "netnummer GSM", "netnummer mobiele telefoon", "netnummer mobiel", "GSM", "mobiele telefoon", "mobiel", "områdenummer, mobil", "telefon, mobil", "mobiltelefon", "mòbil", "telèfon mòbil", "كود منطقة الهاتف الخلوي", "كود منطقة الهاتف المحمول", "الهاتف الخلوي", "الهاتف المحمول", "cellareacode", "cell areacode", "cell area code", "mobileareacode", "mobile areacode", "mobile area code", "cell phone", "cellphone", "mobile phone", "mobilephone", "呼叫器號碼", "傳呼機號碼", "呼叫器", "傳呼機", "传呼机区号", "传呼机", "кодпейджера", "код пейджера", "пейджер", "çağrı cihazı numarası", "çağrı cihazı", "รหัสเพจเจอร์", "รหัสพื้นที่เพจเจอร์", "รหัสพื้นที่วิทยุติดตามตัว", "วิทยุติดตามตัว", "riktnummer personsök", "riktnummer personsökare", "personsök", "personsökare", "buscapersonas", "busca", "predvoľba pagera", "Номер пейджера", "prefix pager", "număr pager", "telefon pager", "códigodeáreadopager", "códigodeárea do pager", "código de área do pager", "telefone pager", "telefonepager", "código de área (pager)", "telefone (pager)", "retningsnr., personsøker", "retningsnummer, personsøker", "personsøkernr.", "personsøkernummer", "호출기지역번호", "호출기 지역번호", "호출기 지역 번호", "호출 번호", "호출기 번호", "호출기", "ポケベル電話番号", "ポケベル番号", "ポケベル", "電話(ポケベル)", "電話(ポケットベル)", "電話（ポケベル）", "電話（ポケットベル）", "電話番号(ポケベル)", "電話番号(ポケットベル)", "電話番号（ポケベル）", "電話番号（ポケットベル）", "ポケットベル電話番号", "ポケットベル番号", "ポケットベル", "pref. cercapersone", "prefisso cercapers.", "prefisso cercapersone", "cercapers.", "cercapersone", "dojavnik", "pager", "זימונית", "Pager-Vorwahl", "Vorwahl (Pager)", "Vorwahl Pager", "numéro de téléavertisseur", "NDT", "bipeur", "pageur", "bellboy", "pagette", "téléav.", "sémaphone", "messageur", "radiomessageur", "récepteur de radiomessagerie", "téléavertisseur", "hakulaitenro", "hakulaitteen numero", "hakulaite", "βομβητής", "netnummer semafoon", "semafoon", "områdenummer til personsøger", "områdenummer, personsøger", "personsøger nr.", "personsøger", "cercapersones", "كود منطقة جهاز النداء", "هاتف نداء", "pagerareacode", "pager areacode", "pager area code", "pager phone", "pagerphone", "區碼", "區域碼", "區域號碼", "区号", "кодрегіону", "кодобласті", "код регіону", "код області", "alan kodu", "พื้นที่รหัส", "รหัสพื้นที่", "riktnr", "riktnummer", "prefijo", "telefónna predvoľba", "predvoľba", "Код населенного пункта", "Код края", "Код республики", "Код области", "Код города", "prefix zonal", "códigodeárea", "código de área", "retningsnr.", "retningsnummer", "지역번호", "지역 번호", "エリアコード", "市外局番", "prefisso locale", "prefisso", "pozivni broj", "קידומת", "Vorwahlnummer", "Vorwahl", "ind. rég.", "ir", "indicatif", "code régional", "indicatif téléphonique", "indicatif de zone", "indicatif régional", "suuntanro", "suuntanumero", "κωδικός περιοχής", "netnummer", "omdrådenr.", "områdenummer", "prefix", "كود المنطقة", "areacode", "area code", "傳真號碼", "傳真", "传真", "факс", "faks numarası", "โทรสาร", "Телефакс", "Номер факса", "팩스", "電話番号(FAX)", "電話番号(ファクシミリ)", "電話番号(ファックス)", "電話番号(ファクス)", "電話番号（FAX）", "電話番号（ファクシミリ）", "電話番号（ファックス）", "電話番号（ファクス）", "FAX番号", "ファクシミリ番号", "ファックス番号", "ファクス番号", "ファクシミリ", "ファックス", "ファクス", "faks", "פקס", "Telefax", "télécopieur", "téléc.", "télécopie", "faksi", "φαξ", "الفاكس", "fax", "機關", "機構", "組織∕機構", "单位名称", "单位", "公司名稱", "公司", "组织", "机构", "机构/组织", "установа", "організація", "компанія", "organizasyon", "şirket", "kuruluş", "kurum", "บริษัท", "องค์กร", "kontor", "bolag", "företag", "organización", "firmenname", "firma", "spoločnosť", "organizácia", "Фирма", "Компания", "Организация", "Предприятие", "organizație", "companie", "organização", "selskap", "organisasjon", "소속", "회사", "조직", "所属組織名", "所属組織", "勤務先会社名", "勤務先会社", "勤務先", "組織名", "会社名", "職場", "組織", "会社", "所属", "azienda", "società", "organizzazione", "tvrtka", "organizacija", "חברה", "ארגון", "corporation", "compagnie", "société", "entreprise", "organisme", "yritys", "organisaatio", "εταιρεία", "οργανισμός", "bedrijf", "organisatie", "selskak", "organisation", "companyia", "organització", "empresa", "الشركة", "المؤسسة", "business", "company", "organization", "验 证 码", "验证码", "verification code", "身份证", "nick", "aim", "icq", "jabber", "msn", "qq", "skype", "个人网页", "个人网站", "个人主页", "homepage"]), new PatternMatcherClass(["電話號碼", "連絡電話", "聯絡電話", "电话号码", "电话", "тел", "тел.", "телефон", "telefon no", "telefon numarası", "หมายเลขโทรฯ", "หมายเลขโทรศัพท์", "เบอร์โทรศัพท์", "โทรศัพท์", "nummer", "número de teléfono", "teléfono", "tel. číslo", "telefónne číslo", "telefón", "Телефонный номер", "Номер телефона", "număr de telefon", "număr telefon", "número de telefone", "telefone", "연락 번호", "전화 번호", "전화번호", "전화", "tel", "電話番号(固定)", "電話番号（固定）", "固定電話番号", "固定電話", "電話番号※", "電話番号", "電話", "numero di telefono", "tel.", "numero telefono", "telefono", "telefonski broj", "broj telefona", "טלפון", "Fon", "numéro de tél.", "tél.", "numéro de téléphone", "téléphone", "puh.num.", "puhelinnro", "puhelinnumero", "puhelin", "αριθμός τηλεφώνου", "τηλέφωνο", "telefon", "telefonnr.", "telefonnummer", "tlf.", "número de telèfon", "telèfon", "التليفون", "رقم الهاتف", "الهاتف", "exchange", "telephone", "phone number", "phonenumber", "phone"]), new PatternMatcherClass(["联系人", "真實姓名", "名稱", "adı", "isim", "namn", "meno", "nume", "imię i nazwisko", "名字", "ime", "שם", "nimi", "naam", "navn", "الاسم", "name"]), new PatternMatcherClass(["通訊地址", "聯絡地址", "連絡地址", "住址", "адреса", "adresi", "ที่อยู่", "adress", "dirección", "Адрес", "adresă", "endereço", "주소", "アドレス", "ご住所", "住所", "indirizzo", "adresa", "כתובת", "addresse", "osoite", "διεύθυνση", "adres", "adresse", "adreça", "العنوان", "address"])],
    FormMetadataJSControllerObject = function() {
        this.mapOfKeywordsIndicatingLoginFormTypeToScoreForMatching = {
            login: 1,
            "log in": 1,
            log_on: 1,
            signin: 1,
            "sign in": 1,
            signon: 1,
            "sign on": 1,
            "登录": 1,
            "登入": 1,
            "welcome back": 1,
            anmelden: 1,
            absenden: 1,
            reauth: 2,
            "forgot user": 1,
            "@me": 1,
            "enter your password": 2
        }, this.mapOfKeywordsIndicatingNewAccountFormTypeToScoreForMatching = {
            reg: 1,
            enrollment: 1,
            setup: 1,
            "set up": 1,
            signup: 1,
            "sign up": 1,
            create: 1,
            "注册": 1,
            activate: 1
        }, this.mapOfKeywordsIndicatingChangePasswordFormTypeToScoreForMatching = {
            change: 1,
            forgotpassword: 1,
            "forgot-password": 1,
            update: 1,
            reset: 1,
            "再設定": 1
        }, this.keywordsIndicatingNonAutoFillableFormType = ["import"], this.regularExpressionsForForgotPasswordLink = ["^forgot.*password"], this.shouldShowAdditionalUI = !0, this.nonUsernameFieldLabelPatternMatchers = function nonUsernameFieldLabelPatternMatchers() {
            return [new PatternMatcherClass(["login code", "otpcode", "password", "captcha", "recaptcha", "sound", "answer", "confirmation code", "verification code", "zip code", "stock symbol", "chart", "table", "certificate", "cash card number"])]
        }(), this.nonEmailFieldLabelPatternMatchers = function nonEmailFieldLabelPatternMatchers() {
            return [new PatternMatcherClass(["確認コード"])]
        }(), this.passwordFieldLabelPatternMatchers = function passwordFieldLabelPatternMatchers() {
            return [new PatternMatcherClass(["password", "passwd", "设置密码", "passwort"])]
        }(), this.confirmPasswordFieldLabelPatternMatchers = function confirmPasswordFieldLabelPatternMatchers() {
            return [new PatternMatcherClass(["repeat", "retype", "confirm", "verify", "new"])]
        }(), this.confirmEmailFieldLabelPatternMatchers = function confirmEmailFieldLabelPatternMatchers() {
            return [new PatternMatcherClass(["confirm"])]
        }(), this.oldPasswordFieldLabelPatternMatchers = function oldPasswordFieldLabelPatternMatchers() {
            return [new PatternMatcherClass(["current", "old", "original"])]
        }(), this.usernameFieldLabelPatternMatchers = function usernameFieldLabelPatternMatchers() {
            return [new PatternMatcherClass(["username", "user name", "screenname", "screen name", "loginname", "login name", "account name", "userID", "loginID", "accountID", "Online ID", "GmailAddress", "Gmail Address", "usuario", "Library Card Number", "E-Mail-Adresse"])]
        }(), this.loginFormTypePatternMatchers = new PatternMatcherClass(Object.keys(this.mapOfKeywordsIndicatingLoginFormTypeToScoreForMatching)), this.newAccountFormTypePatternMatchers = new PatternMatcherClass(Object.keys(this.mapOfKeywordsIndicatingNewAccountFormTypeToScoreForMatching)), this.emailFieldLabelPatternMatchers = function emailFieldLabelPatternMatchers() {
            return [new PatternMatcherClass(["email", "emailAddr", "emailAddress", "e-mail", "البريد الإلكتروني", "correu electrònic", "e-post", "e-postadr", "e-postadresse", "sähköposti", "s-posti", "sähköpostiosoite", "courriel", "messagerie électronique", "adresse de messagerie", "adresse électronique", "courrier électronique", "adresse de courriel", "adresse de courrier électronique", "adresse courriel", "adresse e-mail", "adrélec", "adresse Internet", "c. élec.", "cé", "mél.", "adel", "E-Mail Adresse", "E-Mail-Adresse", "דוא״ל", "מייל", "e-mail adresa", "adresa e-pošte", "e-pošta", "ind. e-mail", "indirizzo e-mail", "indirizzo di posta elettronica", "posta elettronica", "ind. posta elettronica", "メール", "メールアドレス", "Emailアドレス", "Email アドレス", "電子メール", "Eメールアドレス", "メアド", "メルアド", "이메일", "이메일 주소", "이메일주소", "email 주소", "email주소", "e-mail 주소", "e-mail주소", "epost", "mail", "adresăemail", "Адрес электронной почты", "Электронный адрес", "Адрес e-mail", "Адрес email", "emailAdresa", "emailAdr", "correo electrónico", "e-postadress", "epostadress", "emejl", "mejl", "mejladress", "อีเมล", "อีเมลที่อยู่", "ที่อยู่อีเมล", "อี-เมล", "eposta", "e-posta", "e-posta adresi", "eposta adresi", "електронна пошта", "електроннапошта", "ел.пошта", "ел. пошта", "електронна адреса", "електроннаадреса", "ел.адреса", "ел. адреса", "电子邮件", "电子邮件地址", "電子郵件", "電子郵件位址", "電子郵件地址", "電子郵件信箱", "電子信箱", "電子郵箱", "電郵"])]
        }(), this.addressBookFieldLabelPatternMatchers = function addressBookFieldLabelPatternMatchers() {
            return [new PatternMatcherClass([])]
        }(), this.nonAccountPasswordSecureTextEntryFieldLabelPatternMatchers = function nonAccountPasswordSecureTextEntryFieldLabelPatternMatchers() {
            return [new PatternMatcherClass(["debit", "answer", "account number"])]
        }(), this.showHideButtonLabelPatternMatchers = function showHideButtonLabelPatternMatchers() {
            return [new PatternMatcherClass(["show", "hide"])]
        }(), this.nonCreditCardCardNumberFieldLabelPatternMatchers = function nonCreditCardCardNumberFieldLabelPatternMatchers() {
            return [new PatternMatcherClass(["gift card", "giftcard", "rewards card", "rewardscard", "loyalty card", "loyaltycard", "health card", "library card"])]
        }(), this.creditCardNumberFieldLabelPatternMatchers = function creditCardNumberFieldLabelPatternMatchers() {
            return [new PatternMatcherClass(["card number", "cardnumber", "cardnum", "ccnum", "ccnumber", "cc num", "creditcardnumber", "credit card number", "newcreditcardnumber", "new credit card", "creditcardno", "credit card no", "card#", "card #"])]
        }(), this.creditCardSecurityCodeFieldLabelPatternMatchers = function creditCardSecurityCodeFieldLabelPatternMatchers() {
            return [new PatternMatcherClass(["cvv", "cvc", "cvc2", "cvv2", "ccv2", "cid", "cvn", "security code", "card verification"])]
        }(), this.creditCardCardholderFieldLabelPatternMatchers = function creditCardCardholderFieldLabelPatternMatchers() {
            return [new PatternMatcherClass(["name on credit card", "name on card", "nameoncard", "cardholder", "card holder", "name des karteninhabers"])]
        }(), this.creditCardCompositeExpirationDateFieldLabelPatternMatchers = function creditCardCompositeExpirationDateFieldLabelPatternMatchers() {
            return [new PatternMatcherClass(["expiration date", "expirationdate", "expdate"])]
        }(), this.creditCardTypeFieldLabelPatternMatchers = function creditCardTypeFieldLabelPatternMatchers() {
            return [new PatternMatcherClass(["card type", "cardtype", "cc type", "cctype", "payment type"])]
        }(), this.dayFieldLabelPatternMatchers = function dayFieldLabelPatternMatchers() {
            return [new PatternMatcherClass(["day"])]
        }(), this.monthFieldLabelPatternMatchers = function monthFieldLabelPatternMatchers() {
            return [new PatternMatcherClass(["month", "date m", "date mo"])]
        }(), this.yearFieldLabelPatternMatchers = function yearFieldLabelPatternMatchers() {
            return [new PatternMatcherClass(["year", "date y", "date yr"])]
        }(), this.oneTimeCodeFieldLabelPatternMatchers = function oneTimeCodeFieldLabelPatternMatchers() {
            return [new PatternMatcherClass(["security code", "login code", "enter the code", "enter code", "otp", "onetimecode", "onetimepasscode", "one time password", "one time passcode", "verification code", "verificationCode", "confirmation code", "identification code", "identificationCode", "access code", "SMS", "digit code", "2fa", "twofactor token", "two factor auth", "two factor authentication", "two-factor authentication", "6-digit authentication code", "two step sign in", "two-step sign in", "MFA code", "验证码", "校验码", "驗證碼", "驗証碼", "確認碼", "認證碼", "確認コード", "認証コード", "인증번호", "확인코드", "code de sécurité", "code de vérification", "code de validation", "code d'identification", "code d'authentification", "code d'autorisation", "code de confirmation", "code SMS de vérification", "Authorisierungscode", "Sicherheitscode", "Überprüfungscode", "Bestätigungscode", "Bestatigungscode", "Verifizierungscode", "Aktivierungscode", "Codice di sicurezza", "Codice attivazione", "codice di attivazione", "codice di conferma", "codice di verifica", "Kod bezpieczeństwa", "Kod autoryzacyjny", "Kod weryfikacyjny", "código de seguridad", "código de confirmación", "código de seguranca", "digite o codigo", "código de verificación", "código de verificação", "código de confirmacao", "Код проверки", "код безопасности", "код подтверждения", "Код аутентификации", "код підтвердження", "dogrulama kodu", "mã bảo mật", "Mã Xác Minh", "mã kích hoạt", "รหัสความปลอดภัย", "รหัสยืนยัน", "รหัสOTP", "รหัสการตรวจสอบยืนยัน", "รหัสการยืนยัน", "Kode keamanan", "Kode konfirmasi", "Kode verifikasi", "सत्यापन कोड", "Kod pengesahan", "Masukkan Kod", "Codul de confirmare"])]
        }(), this.weakOneTimeCodeFieldLabelPatternMatchers = function weakOneTimeCodeFieldLabelPatternMatchers() {
            return [new PatternMatcherClass(["code", "passcode", "PIN", "código", "코드", "コード", "код"])]
        }(), this.ignoredDataTypeFieldLabelPatternMatchers = function ignoredDataTypeFieldLabelPatternMatchers() {
            return [new PatternMatcherClass(["search", "social security", "socialsecurity", "ssn", "ssno", "ssnum", "airport", "gate code"])]
        }(), this.searchFieldLabelPatternMatchers = function searchFieldLabelPatternMatchers() {
            return [new PatternMatcherClass(["search"])]
        }(), this.shouldIncludeNonEmptyFields = !1, this.nextFormUniqueIDValue = 0;
        let e = Object.create(null);
        e.get = function getNextFormUniqueID() {
            return this.nextFormUniqueIDValue++, this.nextFormUniqueIDValue
        }, Object.defineProperty(FormMetadataJSControllerObject.prototype, "nextFormUniqueID", e), this.nextControlUniqueIDValue = 0, e = Object.create(null), e.get = function getNextControlUniqueID() {
            return this.nextControlUniqueIDValue++, this.nextControlUniqueIDValue
        }, Object.defineProperty(FormMetadataJSControllerObject.prototype, "nextControlUniqueID", e)
    };
FormMetadataJSControllerObject.prototype = {
    setInputElementSpellCheckEnabled: function(e, n) {},
    setInputElementAutofilled: function(e, n) {},
    finishedAutoFillingControlsInForm: function(e, n) {},
    finishedAutoFillingOneTimeCode: function(e) {},
    categorySpecifierForFormControl: function(e) {
        if (!e) return null;
        let n = e.AutocompleteTokens;
        if (n && Array.isArray(n))
            for (let e of n) {
                let n = specifierForAutocompleteToken(e);
                if (n) return n.category
            }
        return specifier = specifierForFieldLabel(e.AddressBookLabel), specifier ? specifier.category : null
    }
};
var FormMetadataJSController = new FormMetadataJSControllerObject;
const WBSAutoFillFormTypeUndetermined = 0,
    WBSAutoFillFormTypeAutoFillableStandard = 1,
    WBSAutoFillFormTypeNonAutoFillable = 2,
    WBSAutoFillFormTypeAutoFillableLogin = 3,
    WBSAutoFillFormTypeNewAccount = 4,
    WBSAutoFillFormTypeChangePassword = 5,
    WBSFormMetadataRequestNormal = 0,
    WBSFormMetadataRequestPreFill = 1,
    WBSFormMetadataRequestTesting = 2,
    WBSFormMetadataRequestTextChange = 3,
    WBSFormMetadataRequestCollectMetadataFromDebugMenu = 4,
    ShouldStopAfterFirstMatch = {
        CollectAllMatches: 0,
        StopAfterFirstMatch: 1
    },
    ShouldFocusAndBlur = {
        No: 0,
        Yes: 1
    },
    ForceNonFormElementAsLogicalBackingElement = {
        No: !1,
        Yes: !0
    },
    MatchCriteria = {
        Property: 0,
        Category: 1,
        Literal: 2
    },
    PageScanCharactersSearchedThreshold = 500,
    PageScanMaxCharactersSearched = 600,
    MaximumNumberOfCharactersToCollectForLanguageIdentification = 300,
    MinValueForMaxLengthAttributeToTreatAsPasswordField = 4,
    UsernameCandidateScoreForPlainTextField = 1,
    UsernameCandidateScoreForPlainTextFieldDirectlyBeforePasswordField = 2,
    UsernameCandidateScoreForEmailLabeledFieldBelowPasswordField = 3,
    UsernameCandidateScoreForUsernameLabeledFieldBelowPasswordField = 4,
    UsernameCandidateScoreForEmailLabeledFieldAbovePasswordField = 5,
    UsernameCandidateScoreForUsernameLabeledFieldAbovePasswordField = 6,
    UsernameCandidateScoreBonusForVisibleElement = .5,
    UsernameCandidateScorePenaltyForReadOnlyElement = .5,
    UsernameCandidateScorePenaltyForMatchingNonUsernameFieldLabelPattern = 2,
    UsernameCandidateScorePenaltyForMatchingSearchFieldLabelPattern = 1.5,
    UsernameCandidateScorePenaltyForAnonymousElement = 1,
    LowestScoreForUsernameFieldCandidate = 1,
    LowestScoreForLabeledUsernameFieldCandidate = 3,
    MaxValueForMaxLengthAttributeToTreatAsOneTimeCodeField = 10,
    DateTimeInputTypes = ["date", "datetime-local", "month", "time", "week"],
    DateTimeInputTypeFormats = {
        date: "yyyy-MM-dd",
        "datetime-local": "yyyy-MM-dd'T'hh:mm",
        month: "yyyy-MM",
        time: "hh:mm",
        week: "yyyy-'W'ww"
    },
    numberOfConsecutiveElementsWithoutSuccessfulPageScanAfterWhichPageScanIsAbandoned = 40;
var mapOfFormTypeToProducerOfAssociatedKeywords = function() {
        var e = {
            4: function() {
                return FormMetadataJSController.mapOfKeywordsIndicatingNewAccountFormTypeToScoreForMatching
            },
            3: function() {
                return FormMetadataJSController.mapOfKeywordsIndicatingLoginFormTypeToScoreForMatching
            },
            5: function() {
                return FormMetadataJSController.mapOfKeywordsIndicatingChangePasswordFormTypeToScoreForMatching
            }
        };
        return e
    }(),
    visibilityCacheGeneration = 0;

function legacyPlaceholderInfoForInputElement(e) {
    if ("text" !== e.type) return null;
    var n = e.value.trim();
    if (!n) return null;
    for (var r = !1, t = !0, i = e.attributes, a = i.length, o = 0; o < a; ++o) {
        var l = i[o];
        if (n === l.value.trim() && (r = !0, "value" !== l.name.toLowerCase())) {
            t = !1;
            break
        }
    }
    return r ? {
        Text: n,
        AttributeMatchedWasValue: t
    } : null
}

function placeholderInfoForElement(e) {
    var n = e.getAttribute("placeholder");
    return n ? {
        Text: n,
        AttributeMatchedWasValue: !1
    } : isInputElement(e) ? legacyPlaceholderInfoForInputElement(e) : null
}

function sharedPrefixLength(e, n) {
    for (var r = 0, t = 0, i = e.length; t < i && e[t] === n[t]; ++t) r++;
    return r
}

function rowContainingLabelAboveRow(e) {
    for (var n = e.getBoundingClientRect(), r = e.previousElementSibling; r instanceof HTMLTableRowElement; r = r.previousElementSibling) {
        if (r.querySelector("input, select, textarea")) return null;
        var t = r.getBoundingClientRect();
        if (n.top - t.bottom > n.height / 2) return null;
        if (r.innerText.match(/\S/)) return r
    }
    return null
}

function cellVisuallyAbove(e) {
    var n = e.parentElement;
    if (!(n && n instanceof HTMLTableRowElement)) return null;
    var r = rowContainingLabelAboveRow(n);
    if (!r) return null;
    for (var t = e.getBoundingClientRect(), i = r.children, a = i.length, o = null, l = 0, s = 0; s < a; ++s) {
        var p = i[s],
            c = p.getBoundingClientRect(),
            u = Math.min(c.right, t.right) - Math.max(c.left, t.left);
        (!o || u > l) && (l = u, o = p)
    }
    return o
}

function couldBeFormSubmissionControl(e) {
    if (e instanceof HTMLButtonElement) return !0;
    if (e instanceof HTMLInputElement) {
        var n = e.type;
        return "submit" === n || "image" === n
    }
    return !1
}

function isInputElement(e) {
    return e instanceof HTMLInputElement
}

function isDateTimeInputElement(e) {
    return !!isInputElement(e) && DateTimeInputTypes.includes(e.type)
}

function isRadioButtonElement(e) {
    return !!isInputElement(e) && "radio" === e.type
}

function anchorWithURLString(e) {
    var n = document.createElement("a");
    return n.href = e, n
}

function pathComponentsForLocation(e) {
    var n = e.pathname.substring(1).split("/");
    return n[n.length - 1] || n.pop(), n
}

function lastPathComponentFromAnchor(e) {
    var n = pathComponentsForLocation(e);
    return n.length ? n[n.length - 1] : null
}

function lastPathComponentForURLString(e) {
    return lastPathComponentFromAnchor(anchorWithURLString(e))
}

function urlEncode(e) {
    return encodeURIComponent(e).replace(/%20/g, "+")
}

function isCheckboxOrRadioButtonInDefaultState(e) {
    return e.checked === e.defaultChecked
}

function isSelectInDefaultState(e) {
    for (var n = e.options, r = n.length, t = 0; t < r; ++t) {
        var i = n[t];
        if (i.selected !== i.defaultSelected) {
            if (i.defaultSelected) return !1;
            if (e.multiple || t) return !1
        }
    }
    return !0
}

function formActionAsAnchorElement(e, n) {
    if (!(e instanceof HTMLFormElement)) return null;
    let r = e.getAttribute("action");
    if (!r && n) return null;
    var t = document.createElement("a");
    return t.href = r || "", t
}

function eventThatBubbles(e) {
    return new CustomEvent(e, {
        bubbles: !0
    })
}

function formControlHasBeenClassifiedInAnInterestingWay(e) {
    return e.ControlIsActiveElement || e.ControlIsSecureTextField || e.ControlLooksLikePasswordCredentialField || e.ControlLooksLikeCreditCardNumberField || e.ControlLooksLikeCreditCardSecurityCodeField || e.ControlLooksLikeCreditCardCardholderField || e.ControlLooksLikeCreditCardTypeField || e.AddressBookLabel || e.ControlLooksLikeDayField || e.ControlLooksLikeMonthField || e.ControlLooksLikeYearField || e.ControlLooksLikeOneTimeCodeField || e.ControlLooksLikeCreditCardCompositeExpirationDateField
}

function isValidUsernameOrEmail(e) {
    return !(!e || e.length < 3 || "true" === e || "false" === e) && (/^[a-z_][a-z0-9_.]{2,30}$/i.test(e) || /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(e))
}

function hasOwnProperties(e) {
    return Object.getOwnPropertyNames(e).length > 0
}

function defaultOptionForSelectElement(e) {
    for (var n = e.options, r = n.length, t = 0; t < r; ++t) {
        var i = n[t];
        if (i.defaultSelected) return i
    }
    return n[0]
}

function selectElementOptionsSequenceAnalysis(e, n) {
    for (var r = e.options, t = r.length, i = 0, a = -1, o = -1, l = 0, s = 0; s < t; ++s) {
        var p = r[s],
            c = parseInt(p[n]);
        isNaN(c) ? (l >= i && (i = l, a = o), o = -1, l = 0) : -1 === o ? (o = c, l = 1) : c === o + 1 && (o = c, l++)
    }
    return l >= i && (i = l, a = o), {
        lengthOfLongestSequence: i,
        lastNumberInSequence: a
    }
}

function isElementPositionedToBeEffectivelyInvisible(e) {
    for (var n = !1, r = e; r; r = r.parentElement)
        if ("fixed" === getComputedStyle(r).position) {
            n = !0;
            break
        }
    var t, i, a, o = e.getBoundingClientRect();
    if (n) t = o, i = window.innerWidth, a = window.innerHeight;
    else {
        var l = window.scrollY,
            s = window.scrollX;
        t = {
            top: o.top + l,
            right: o.right + s,
            bottom: o.bottom + l,
            left: o.left + s,
            width: o.width,
            height: o.height
        }, i = document.documentElement.scrollWidth, a = Math.max(document.documentElement.scrollHeight, window.innerHeight)
    }
    return t.top >= a || t.right <= 0 || t.bottom <= 0 || t.left >= i
}

function isCredentialElementUniqueID(e, n) {
    return n === e.UsernameElementUniqueID || n === e.PasswordElementUniqueID || n === e.ConfirmPasswordElementUniqueID || n === e.OldPasswordElementUniqueID
}

function autocompleteTokens(e) {
    const n = ["autocomplete", "autocompletetype", "x-autocompletetype"];
    let r = [];
    for (const t of n) e.hasAttribute(t) && r.push(e.getAttribute(t).trim().toLowerCase());
    if (!r.length) return null;
    let t = r.join(" ").split(/\s+/).filter((function(e) {
        return e.length && "off" !== e && "on" !== e
    }));
    return t.length ? t : null
}

function controlAppearsToBePartOfPhotoTaggingInterface(e) {
    const n = /photo.*tag/i;
    for (var r = e.parentElement; r; r = r.parentElement)
        if (n.test(r.className)) return !0;
    return !1
}

function levenshteinDistance(e, n) {
    for (var r = e.length, t = n.length, i = new Array(r + 1), a = 0; a < r + 1; ++a) i[a] = new Array(t + 1), i[a][0] = a;
    for (var o = 0; o < t + 1; ++o) i[0][o] = o;
    for (o = 1; o < t + 1; ++o)
        for (a = 1; a < r + 1; ++a)
            if (e[a - 1] === n[o - 1]) i[a][o] = i[a - 1][o - 1];
            else {
                var l = i[a - 1][o] + 1,
                    s = i[a][o - 1] + 1,
                    p = i[a - 1][o - 1] + 1;
                i[a][o] = Math.min(l, s, p)
            }
    return i[r][t]
}

function stringSimilarity(e, n) {
    var r = Math.max(e.length, n.length);
    return r ? (r - levenshteinDistance(e, n)) / r : 0
}

function articleTitleAndSiteNameFromTitleString(e, n) {
    const r = [" - ", " – ", " — ", ": ", " | ", " » "],
        t = r.length;
    for (var i, a, o = e.replace(/^(www|m|secure)\./, ""), l = o.replace(/\.(com|info|net|org|edu|gov)$/, "").toLowerCase(), s = 0; s < t; ++s) {
        var p = n.split(r[s]);
        if (2 === p.length) {
            var c = p[0].trim(),
                u = p[1].trim(),
                f = c.toLowerCase(),
                d = u.toLowerCase(),
                m = Math.max(stringSimilarity(f, o), stringSimilarity(f, l)),
                v = Math.max(stringSimilarity(d, o), stringSimilarity(d, l)),
                y = Math.max(m, v);
            (!a || y > a) && (a = y, i = m > v ? {
                siteName: c,
                articleTitle: u
            } : {
                siteName: u,
                articleTitle: c
            })
        }
    }
    return i && a >= .6 ? i : null
}

function documentTitleWithoutHostNamePrefix() {
    const e = document.title,
        n = articleTitleAndSiteNameFromTitleString(window.location.host, e);
    return n ? n.articleTitle : e
}
console.autofillDebugLog = function(e, ...n) {
    FormMetadataJSController.isDebugConsoleLoggingEnabled
}, Node.prototype.traversePreviousNode = function(e) {
    if (this) {
        var n = this.previousSibling;
        if (e(n)) return null;
        for (; n && n.lastChild;)
            if (e(n = n.lastChild)) return null;
        return n || this.parentNode
    }
}, Node.prototype.traverseNextNode = function(e) {
    if (this) {
        var n = this.firstChild;
        if (n) return n;
        if (e && this === e) return null;
        if (n = this.nextSibling) return n;
        for (n = this; n && !n.nextSibling && (!e || !n.parentNode || n.parentNode !== e);) n = n.parentNode;
        return n ? n.nextSibling : null
    }
}, Node.prototype.isVisible = function() {
    var e = this;
    if (e._isVisible === visibilityCacheGeneration) return !0;
    if (e._isVisible === -visibilityCacheGeneration) return !1;
    var n = e.nodeType == Node.TEXT_NODE ? e.parentNode : e,
        r = getComputedStyle(n, null);
    return e._isVisible = -visibilityCacheGeneration, "none" !== r.display && "visible" === r.visibility && (!(n.offsetWidth < 2) && (!(n.offsetHeight < 2) && (e._isVisible = visibilityCacheGeneration, !0)))
}, Object.defineProperty(Array.prototype, "joinFirstItems", {
    value: function(e, n) {
        n > this.length && (n = this.length);
        for (var r = "", t = 0; t < n; ++t) t > 0 && (r += e), r += this[t];
        return r
    }
}), DOMRect.prototype.isZeroRect = function() {
    return !(this.top || this.right || this.bottom || this.left)
}, DOMRect.prototype.distanceToRect = function(e) {
    var n = [{
            x: this.left,
            y: this.top
        }, {
            x: this.right,
            y: this.top
        }],
        r = [{
            x: this.right,
            y: this.top
        }, {
            x: this.right,
            y: this.bottom
        }],
        t = [{
            x: this.left,
            y: this.bottom
        }, {
            x: this.right,
            y: this.bottom
        }],
        i = [{
            x: this.left,
            y: this.top
        }, {
            x: this.left,
            y: this.bottom
        }],
        a = [{
            x: e.left,
            y: e.top
        }, {
            x: e.right,
            y: e.top
        }],
        o = [{
            x: e.right,
            y: e.top
        }, {
            x: e.right,
            y: e.bottom
        }],
        l = [{
            x: e.left,
            y: e.bottom
        }, {
            x: e.right,
            y: e.bottom
        }],
        s = [{
            x: e.left,
            y: e.top
        }, {
            x: e.left,
            y: e.bottom
        }],
        p = [
            [i, s],
            [i, o],
            [n, a],
            [n, l],
            [r, s],
            [r, o],
            [t, a],
            [t, l]
        ].map((function distanceBetweenTwoParallelLineSegments(e) {
            var n = e[0],
                r = e[1];
            if (n[0].x >= r[0].x && n[0].x < r[1].x || r[0].x >= n[0].x && r[0].x < n[1].x) return Math.abs(n[0].y - r[0].y);
            if (n[0].y >= r[0].y && n[0].y < r[1].y || r[0].y >= n[0].y && r[0].y < n[1].y) return Math.abs(n[0].x - r[0].x);

            function distanceBetweenTwoPointsSquared(e, n) {
                return Math.pow(e.x - n.x, 2) + Math.pow(e.y - n.y, 2)
            }
            return Math.sqrt(Math.min(distanceBetweenTwoPointsSquared(n[0], r[1]), distanceBetweenTwoPointsSquared(n[1], r[0])))
        }));
    return Math.min.apply(Math, p)
}, HTMLElement.prototype.closestCommonAncestor = function(e) {
    for (var n = this.parentElement; n;) {
        if (n.contains(e)) return n;
        n = n.parentElement
    }
    return null
}, HTMLFormElement.prototype.isVisible = function() {
    if (Node.prototype.isVisible.call(this)) return !0;
    for (var e = this.elements, n = e.length, r = 0; r < n; ++r)
        if (e[r].isVisible()) return !0;
    return !1
}, RegExp.prototype.testMatchesEntireString = function(e) {
    if (!e) return !1;
    let n = this.exec(e);
    return !(!n || n[0] !== e)
}, LogicalForm = function(e, n) {
    var r = e.length;
    this._formElement = e[0].form, this._backingElement = this._formElement, !n && this._backingElement || (this._backingElement = 1 === r ? e[0] : e[0].closestCommonAncestor(e[r - 1])), this._formElement || (this._formElement = this._backingElement);
    for (var t = 0; t < r; t++) e[t]._logicalForm = this, t + 1 < r && (e[t]._nextControlInLogicalForm = e[t + 1]), t > 0 && (e[t]._previousControlInLogicalForm = e[t - 1]);
    this._controls = Array.prototype.slice.call(e), this._backingElement._logicalFormUniqueID || (this._backingElement._logicalFormUniqueID = FormMetadataJSController.nextFormUniqueID)
}, LogicalForm.prototype = {
    get elements() {
        return this._controls
    }, get formElement() {
        return this._formElement
    }, get backingElement() {
        return this._backingElement
    }, get formUniqueID() {
        return this._backingElement._logicalFormUniqueID
    }, containsControl: function(e) {
        return e._logicalForm ? e._logicalForm === this : e.form === this._formElement
    }, radioButtonsWithName: function(e) {
        var n = document.getElementsByName(e);
        return Array.prototype.filter.call(n, (function(e) {
            return (e.form === this._formElement || this._formElement.contains(e)) && isRadioButtonElement(e)
        }), this)
    }, annotate: function(e) {
        var n = this._formElement,
            r = n._annotations;
        if (r) {
            for (var t in e) {
                var i = e[t];
                i ? r[t] = i : delete r[t]
            }
            hasOwnProperties(r) || delete n._annotations
        } else n._annotations = e
    }, get annotations() {
        return this._formElement._annotations
    }, get isAnnotated() {
        return !!this._formElement._annotations
    }
}, FormMetadata = function() {
    this._forms = [], this._formMetadata = [], this._elementsWithGeneratedPasswords = [], this._generatedPasswords = [], this._labels = document.getElementsByTagName("label"), this._controlUniqueIDToControlMap = [], this._mapOfFormTypeToExtraScoreProducer = function() {
        let e = {
            4: function(e) {
                return 0
            }
        };
        return e[3] = function(e) {
            return 1 === e._controls.filter((e => function(e) {
                return "checkbox" === e.type && FormMetadataJS._labelsForElement(e).some((e => /remember me/i.test(e.innerText.trim()) && e.isVisible()))
            }(e))).length ? 2 : 0
        }, e[5] = function(e) {
            return 0
        }, e
    }(), this._requiredFormatForDateTimeInput = DateTimeInputTypes.reduce((function(e, n) {
        let r = document.createElement("input");
        r.type = n;
        return r.value = "a", e[n] = "" === r.value ? DateTimeInputTypeFormats[n] : "", e
    }), {})
}, FormMetadata.prototype = {
    _getTagName: function(e) {
        var n = e.tagName;
        return "string" == typeof n || "string" == typeof(n = e.nodeName) ? n : void 0
    },
    _getNameOrId: function(e) {
        return e.name && e.name.length ? e.name : e.id
    },
    controlUniqueID: function(e) {
        if (e._controlUniqueID) return e._controlUniqueID;
        var n = "ControlID-" + FormMetadataJSController.nextControlUniqueID;
        return e._controlUniqueID = n, this._controlUniqueIDToControlMap[n] = e, FormMetadataJSController.shouldShowAdditionalUI && e.setAttribute("control-id", n), e._controlUniqueID
    },
    controlCategory: function(e) {
        return e._controlCategory || (e._controlCategory = e.getAttribute("category")), e._controlCategory
    },
    _searchForLabelsAboveCell: function(e, n) {
        var r = window.getComputedStyle(n, null);
        if (!r || "table-cell" !== r.getPropertyValue("display")) return null;
        var t = cellVisuallyAbove(n);
        if (!t) return null;
        for (var i = 0, a = t.firstChild; a; a = a.traverseNextNode(t))
            if (a.nodeType == Node.TEXT_NODE && a.isVisible()) {
                var o = a.nodeValue,
                    l = e.searchReverse(o);
                if (l) return {
                    Distance: i,
                    Match: l[0],
                    Property: l[1],
                    Category: l[2],
                    ParentProperty: l[3]
                };
                i += o.length
            }
        return null
    },
    _collectStringFromNodeForPageScan: function(e, n, r) {
        var t = e.nodeValue,
            i = t.length;
        return r + i > 600 && (t = t.substr(-(500 - r)), i = 500 - r), (t = t.trim()).length && n.push(t), r
    },
    _dataForComputingMatchFromPageScanBeforeElement: function(e, n) {
        function shouldStopScan(e) {
            return e && e.nodeType == Node.ELEMENT_NODE && e.matches("nav")
        }
        var r, t = [],
            i = 0,
            a = this._logicalFormForControl(e).formElement,
            o = a && a.isVisible();
        n || (n = a);
        for (var l = e.traversePreviousNode(shouldStopScan); l && i < 500; l = l.traversePreviousNode(shouldStopScan)) {
            var s = l.localName;
            if (l === n) break;
            if (this._isRenderedFormControl(l)) {
                if (l.isVisible() || !o) break
            } else {
                if (this._isLabelElement(l) && l.isVisible()) break;
                if ("td" !== s || r) {
                    if ("tr" === s && r) break;
                    if ("ul" === s || "ol" === s || "dl" === s) break;
                    if ("li" === s) {
                        if (!l.parentNode.contains(e)) break
                    } else l.nodeType == Node.TEXT_NODE && l.isVisible() && (i += this._collectStringFromNodeForPageScan(l, t, i))
                } else r = l
            }
        }
        return [t, r]
    },
    _matchFromPageScanBeforeElement: function(e, n, r) {
        var t = this._pageScanContext ? this._pageScanContext.backwardScanCache : null,
            i = this._pageScanDataForElementWithCacheAndDataProducer(n, t, this._dataForComputingMatchFromPageScanBeforeElement.bind(this), r),
            a = i[0],
            o = this._matchFromPatternMatcherAndStringsFromPageScan(e, a);
        if (o) return o;
        var l = i[1];
        if (l) {
            var s = this._searchForLabelsAboveCell(e, l);
            if (s) return s.IsInCellAbove = !0, s
        }
        return null
    },
    _isElementFollowedByForgotPasswordLink: function(e) {
        let n = this._dataForComputingMatchFromPageScanAfterElement(e, "A");
        if (!n.length) {
            const r = e.traverseNextNode();
            if (r) {
                let e = r;
                r instanceof Node && (e = r.parentElement);
                const t = e.querySelector("a");
                t && (n = [t.innerText])
            }
        }
        this._forgotPasswordRegularExpressions || (this._forgotPasswordRegularExpressions = FormMetadataJSController.regularExpressionsForForgotPasswordLink);
        for (let e of this._forgotPasswordRegularExpressions) {
            let r = new RegExp(e);
            for (let e of n)
                if (r.test(e.toLowerCase())) return !0
        }
        return !1
    },
    _dataForComputingMatchFromPageScanAfterElement: function(e, n, r) {
        var t = [],
            i = 0,
            a = this._logicalFormForControl(e).formElement,
            o = a && a.isVisible();
        let l = void 0 !== n;
        r || (r = a);
        for (var s = e.traverseNextNode(); s && i < 500; s = s.traverseNextNode()) {
            var p = s.localName;
            if (s === r) {
                var c = this._pageScanContext;
                c && !i && (c.forwardScanIsFutile = !0);
                break
            }
            if (this._isRenderedFormControl(s)) {
                if (s.isVisible() || !o) break
            } else {
                if (this._isLabelElement(s) && s.isVisible()) break;
                if ("tr" === p) break;
                if ("ul" === p || "ol" === p || "dl" === p) break;
                if (s.nodeType == Node.TEXT_NODE && s.isVisible()) {
                    if (void 0 !== n && (!s.parentNode || s.parentNode.tagName !== n)) continue;
                    if (i += this._collectStringFromNodeForPageScan(s, t, i), l) break
                }
            }
        }
        return t
    },
    _matchFromPageScanAfterElement: function(e, n, r) {
        var t = this._pageScanContext ? this._pageScanContext.forwardScanCache : null,
            i = this._pageScanDataForElementWithCacheAndDataProducer(n, t, this._dataForComputingMatchFromPageScanAfterElement.bind(this), r);
        return this._matchFromPatternMatcherAndStringsFromPageScan(e, i)
    },
    _pageScanDataForElementWithCacheAndDataProducer: function(e, n, r, t) {
        if (!n) return r(e, t);
        if (i = n.get(e)) return i;
        var i = r(e, t);
        return n.set(e, i), i
    },
    _matchFromPatternMatcherAndStringsFromPageScan: function(e, n) {
        for (var r = n.length, t = 0, i = 0; i < r; ++i) {
            var a = n[i];
            t += a.length;
            var o = e.searchReverse(a);
            if (o) return {
                Distance: t,
                Match: o[0],
                Property: o[1],
                Category: o[2],
                ParentProperty: o[3]
            }
        }
        return null
    },
    _matchPatternAgainstString: function(e, n) {
        if (!n) return null;
        var r = n.replace(/[\d_.]/g, " ");
        return r = r.replace(/[a-z][A-Z]/g, (function(e) {
            return e[0] + " " + e[1]
        })), e.longestMatch(r)
    },
    _controlsAreAllButtons: function(e) {
        for (var n = e.length, r = 0; r < n; ++r) {
            if (!(e[r] instanceof HTMLButtonElement)) return !1
        }
        return !0
    },
    _createLogicalFormsForControls: function(e) {
        if (this._controlsAreAllButtons(e)) return [];
        for (var n = e.map((function(e) {
            return e.getBoundingClientRect()
        })), r = e.length, t = 0, i = 1, a = n[0].isZeroRect() ? null : n[0], o = 1; o < r; ++o) {
            if (!(d = n[o]).isZeroRect()) {
                if (a) {
                    var l = a.distanceToRect(d);
                    l && (++i, t += l)
                }
                a = d
            }
        }
        var s = t / i,
            p = [];
        for (o = 0; o < r; ++o) {
            for (var c = [e[o]], u = !1, f = (a = n[o].isZeroRect() ? null : n[o], o + 1); f < r; ++f) {
                var d, m = e[f];
                if (!(d = n[f]).isZeroRect()) {
                    if (u) {
                        if (a && a.distanceToRect(d) > s) break
                    } else u = couldBeFormSubmissionControl(m);
                    a = d
                }
                c.push(m)
            }
            p.push(new LogicalForm(c)), o += c.length - 1
        }
        return p
    },
    _formLooksLikeAspnetForm: function(e) {
        var n = 0;
        "aspnetForm" === e.getAttribute("id") && ++n, "aspnetForm" === e.getAttribute("name") && ++n;
        for (var r = e.querySelectorAll("input"), t = 0, i = r.length; t < i; ++t) {
            var a = r[t],
                o = a.getAttribute("id"),
                l = a.getAttribute("name");
            /ctl\d\d_/.test(o) && ++n, /ctl\d\d\$/.test(l) && ++n, "hidden" === a.getAttribute("type") && ("__VIEWSTATE" === l && "__VIEWSTATE" === o || "__EVENTTARGET" === l && "__EVENTTARGET" === o || "__EVENTARGUMENT" === l && "__EVENTARGUMENT" === o || "__LASTFOCUS" === l && "__LASTFOCUS" === o) && ++n
        }
        for (var s = document.querySelectorAll("script"), p = s.length, c = 0; c < p; ++c) {
            var u = anchorWithURLString(s[c].src);
            if (u.host === window.location.host) {
                var f = lastPathComponentFromAnchor(u);
                "WebResource.axd" !== f && "ScriptResource.axd" !== f || ++n
            }
        }
        return n >= 3
    },
    _anchorLooksLikeSubmitButton: function(e) {
        return /submit|button/i.test(e.getAttribute("id"))
    },
    _visibleInputAndSelectElementsInForm: function(e) {
        for (var n = e.querySelectorAll("input:not([type='hidden']), select"), r = [], t = 0, i = n.length; t < i; ++t) {
            var a = n[t];
            a.isVisible() && r.push(a)
        }
        return r
    },
    _elementsActingAsButtonsInForm: function(e) {
        for (var n = Array.prototype.slice.call(e.querySelectorAll("input[type='submit'], input[type='image']")), r = e.querySelectorAll("a"), t = 0, i = r.length; t < i; ++t) {
            var a = r[t];
            this._anchorLooksLikeSubmitButton(a) && a.isVisible() && n.push(a)
        }
        return n
    },
    _logicalFormsForAspnetForm: function(e) {
        for (var n = this._visibleInputAndSelectElementsInForm(e), r = n.length, t = this._elementsActingAsButtonsInForm(e), i = t.length, a = 0; a < i; ++a) {
            (l = t[a]).getAttribute("id") && (l._aspNetIDComponents = l.getAttribute("id").split("_"))
        }
        t.sort((function(e, n) {
            var r = e._aspNetIDComponents || [];
            return (n._aspNetIDComponents || []).length - r.length
        }));
        var o = [];

        function groupElementsIntoLogicalFormsBasedOnTableLayout(e) {
            var n = e.length;
            if (n <= 1) o.push(new LogicalForm(e, ForceNonFormElementAsLogicalBackingElement.Yes));
            else {
                var r = n - 1,
                    t = e[r];
                if (e[0].closestCommonAncestor(t) instanceof HTMLTableRowElement) {
                    for (var i = 0; i < r; ++i) {
                        if (!(e[i].closestCommonAncestor(t) instanceof HTMLTableRowElement)) return groupElementsIntoLogicalFormsBasedOnTableLayout(e.slice(0, i)), void groupElementsIntoLogicalFormsBasedOnTableLayout(e.slice(i))
                    }
                    o.push(new LogicalForm(e, ForceNonFormElementAsLogicalBackingElement.Yes))
                } else o.push(new LogicalForm(e, ForceNonFormElementAsLogicalBackingElement.Yes))
            }
        }
        for (a = 0; a < i; ++a) {
            var l, s = (l = t[a])._aspNetIDComponents;
            if (s) {
                var p = s.length;
                if (!(p < 2)) {
                    for (var c = s.joinFirstItems("_", p - 1) + "_", u = [], f = r - 1; f >= 0; --f) {
                        var d = n[f],
                            m = d.getAttribute("id");
                        m && (m.startsWith(c) && (u.push(d), n.splice(f, 1)))
                    }
                    if (u.length && groupElementsIntoLogicalFormsBasedOnTableLayout(u.reverse()), !(r = n.length)) break
                }
            }
        }
        return r && groupElementsIntoLogicalFormsBasedOnTableLayout(n), o
    },
    _logicalFormsInPage: function(e, n) {
        for (var r = [], t = {}, i = document.getElementsByTagName("form"), a = 0, o = i.length, l = 0; l < o; ++l) {
            var s = i[l];
            if (s.elements.length) {
                if (a++, e && a >= e) return r;
                if (n) {
                    var p = [s.method, s.name, s.action, s.className].join("|"),
                        c = t[p] || 0;
                    if (c > n) continue;
                    t[p] = c + 1
                }
                this._formLooksLikeAspnetForm(s) ? r = r.concat(this._logicalFormsForAspnetForm(s)) : r.push(new LogicalForm(s.elements))
            }
        }
        var u = [],
            f = document.querySelectorAll("input, select, textarea, button"),
            d = f.length;
        for (l = 0; l < d; ++l) {
            var m = f[l];
            if (m.form) {
                if (!u.length) continue;
                r = r.concat(this._createLogicalFormsForControls(u)), u = []
            } else(this._isRenderedFormControl(m) || autocompleteTokens(m)) && u.push(m)
        }
        return u.length && (r = r.concat(this._createLogicalFormsForControls(u))), r
    },
    _indexInCacheOfLogicalFormContainingControl: function(e) {
        for (var n = 0; n < this._forms.length; ++n)
            if (this._forms[n].containsControl(e)) return n;
        return -1
    },
    _logicalFormForControl: function(e) {
        var n = this._indexInCacheOfLogicalFormContainingControl(e);
        return -1 === n ? null : this._forms[n]
    },
    _matchPatternAgainstElement: function(e, n, r) {
        this._logicalFormForControl(r);
        var t = r._previousControlInLogicalForm,
            i = r._nextControlInLogicalForm;

        function attributeValueWithoutPrefixSharedWithSiblingElement(e, n) {
            if (!e) return null;
            var t = r[n],
                i = sharedPrefixLength(t, e[n]);
            return i ? t.substr(i) : null
        }
        const a = ["name", "id"],
            o = a.length;
        for (var l = new Array(o), s = new Array(o), p = 0; p < o; ++p) {
            var c = a[p];
            l[p] = attributeValueWithoutPrefixSharedWithSiblingElement(t, c), s[p] = attributeValueWithoutPrefixSharedWithSiblingElement(i, c)
        }
        var u = "select" === this._getTagName(r).toLowerCase(),
            f = u ? defaultOptionForSelectElement(r) : null;
        const d = n.length;
        for (var m = 0; m < d; ++m) {
            var v, y = n[m];
            for (p = 0; p < o && !(v = this._matchPatternAgainstString(y, l[p])) && !(v = this._matchPatternAgainstString(y, s[p])) && !(v = this._matchPatternAgainstString(y, r[a[p]])); ++p);
            if (!v && u && f) {
                var w = f.text;
                if (/^-.+-$/.test(w)) v = this._matchPatternAgainstString(y, w);
                else if (!f.value.length && w.length) {
                    for (var M = r.options, E = M.length, S = !0, h = 0; h < E; ++h) {
                        var g = M[h];
                        if (g !== f && !g.value.length) {
                            S = !1;
                            break
                        }
                    }
                    S && (v = this._matchPatternAgainstString(y, w))
                }
            }
            v && e.push({
                FoundByPageScan: !1,
                Match: v[0].toLowerCase(),
                Property: v[1],
                Category: v[2],
                ParentProperty: v[3],
                Priority: m
            })
        }
    },
    _labelsForElement: function(e) {
        if (e._cachedLabels) return e._cachedLabels;
        e._cachedLabels = [];
        let n = e.getAttribute("id");
        if (n) {
            let r = e.form;
            for (let t of this._labels) {
                r === t.closest("form") && t.getAttribute("for") === n && e._cachedLabels.push(t)
            }
        }
        if (e._cachedLabels.length) return e._cachedLabels;
        for (var r = this._logicalFormForControl(e).formElement, t = e.parentElement; t && t !== r; t = t.parentElement)
            if (this._isLabelElement(t)) {
                e._cachedLabels.push(t);
                break
            }
        return e._cachedLabels
    },
    _matchesForElement: function(e, n, r = !1) {
        var t = [],
            i = n.length;

        function addMatchesFromText(e, r) {
            for (var a = 0; a < i; ++a) {
                var o = n[a].searchReverse(e);
                if (o && (t.push({
                    FoundByPageScan: !1,
                    Match: o[0].toLowerCase(),
                    Property: o[1],
                    Category: o[2],
                    ParentProperty: o[3],
                    Priority: a
                }), r === ShouldStopAfterFirstMatch.StopAfterFirstMatch)) return
            }
        }
        this._matchPatternAgainstElement(t, n, e);
        for (var a = !1, o = this._labelsForElement(e), l = 0; l < o.length; ++l) {
            var s = o[l].innerText;
            s && (a = !0, addMatchesFromText(s, ShouldStopAfterFirstMatch.StopAfterFirstMatch))
        }
        var p = placeholderInfoForElement(e);
        p && !p.AttributeMatchedWasValue && addMatchesFromText(p.Text, ShouldStopAfterFirstMatch.StopAfterFirstMatch);
        var c = e.getAttribute("title");
        c && addMatchesFromText(c, ShouldStopAfterFirstMatch.StopAfterFirstMatch);
        var u = this._labelForElementIfElementAndLabelAreOnlyElementsOfTheirKindAmongSiblingElements(e);
        u && addMatchesFromText(u.innerText, ShouldStopAfterFirstMatch.CollectAllMatches);
        var f = this._pageScanContext,
            d = !0,
            m = !1;
        if (f && (f.shouldUsePageScan && (d = f.shouldUsePageScan()), f.reportPageScanUsedSuccessfully && (m = !0)), !d) return t;
        if (a) return m && f.reportPageScanUsedSuccessfully(!1), t;
        if (!0 === r) return t;
        var v, y = null,
            w = null;

        function betterMatchOfNewAndCurrentBestMatch(e, n) {
            return e && e.Match.length && (!n || !e.IsInCellAbove && n.IsInCellAbove || e.IsInCellAbove == n.IsInCellAbove && e.Distance < n.Distance) ? {
                FoundByPageScan: !0,
                Match: v.Match.toLowerCase(),
                Property: v.Property,
                Category: v.Category,
                ParentProperty: v.ParentProperty,
                Priority: M
            } : n
        }
        for (var M = 0; M < i; ++M) y = betterMatchOfNewAndCurrentBestMatch(v = this._matchFromPageScanBeforeElement(n[M], e), y), f && f.forwardScanIsFutile || (w = betterMatchOfNewAndCurrentBestMatch(v = this._matchFromPageScanAfterElement(n[M], e), w));
        var E = !1;
        if (y && (t.push(y), E = !0), w)
            for (var S = 0, h = t.length; S < h; ++S) {
                var g = t[S];
                if (w.Priority === g.Priority) {
                    t.push(w), E = !0;
                    break
                }
            }
        return m && f.reportPageScanUsedSuccessfully(E), t.length && p && p.AttributeMatchedWasValue && addMatchesFromText(p.Text, ShouldStopAfterFirstMatch.StopAfterFirstMatch), t
    },
    _bestMatchFromMatches: function(e, n, r) {
        function firstMatchOfMostFrequentlyOccurringStringFromMatches(e, n) {
            for (var r = e.length, t = {}, i = 0; i < r; ++i) {
                var a, o = e[i];
                switch (n) {
                    case MatchCriteria.Property:
                        a = o.Property || o.Match;
                        break;
                    case MatchCriteria.Category:
                        a = o.Category || o.Match;
                        break;
                    case MatchCriteria.Literal:
                        a = o.Match
                }
                t[a] ? t[a].Frequency += 1 : t[a] = {
                    Frequency: 1,
                    FirstMatchObject: o
                }
            }
            var l = [];
            for (var s in t) l.push(t[s]);
            var p = l.sort((function(e, n) {
                    return n.Frequency - e.Frequency
                })),
                c = p.length;
            if (c <= 1) return null;
            if (n === MatchCriteria.Property)
                for (i = 0; i < c; ++i) {
                    if (p[i].FirstMatchObject.ParentProperty in t) return p[i].FirstMatchObject
                }
            return p[0].Frequency > p[1].Frequency ? p[0].FirstMatchObject : void 0
        }
        var t = e.length;
        if (0 === t) return null;
        if (1 === t) return e[0];
        var i = firstMatchOfMostFrequentlyOccurringStringFromMatches(e, MatchCriteria.Property);
        return i || ((i = firstMatchOfMostFrequentlyOccurringStringFromMatches(e, MatchCriteria.Category)) ? i : e.sort((function(e, n) {
            return e.Priority - n.Priority
        }))[0])
    },
    _bestMatchForElement: function(e, n, r = !1) {
        if (!e) return null;
        var t = this._matchesForElement(e, n, r);
        return this._bestMatchFromMatches(t, e, n)
    },
    _labelForElementIfElementAndLabelAreOnlyElementsOfTheirKindAmongSiblingElements: function(e) {
        for (var n = null, r = e.tagName, t = e.parentElement.children, i = t.length, a = 0; a < i; ++a) {
            var o = t[a];
            if (e !== o) {
                if (r === o.tagName) return null;
                if (this._isLabelElement(o)) {
                    if (n) return null;
                    n = o
                }
            }
        }
        return n
    },
    _cachedOneTimeCodePatternMatcher: function() {
        return this._cachedPatternMatchers("oneTimeCodeFieldLabelPatternMatchers")[0]
    },
    _cachedPatternMatchers: function(e) {
        let n = "_" + e,
            r = this[n];
        return r || (this[n] = FormMetadataJSController[e], r = this[n]), r
    },
    _cachedElementPatternMatch: function(e, n, r) {
        var t = n + "_wasVisible",
            i = e[t];
        if (!0 === i) return e[n];
        var a = e.isVisible();
        if (i === a) return e[n];
        e[t] = a;
        let o = this._cachedPatternMatchers(r);
        return e[n] = this._bestMatchForElement(e, o), e[n]
    },
    _isLabeledUsernameField: function(e) {
        return !!this._isAutoFillableTextField(e) && null !== this._cachedElementPatternMatch(e, "_usernameFieldPatternMatch", "usernameFieldLabelPatternMatchers")
    },
    _isLabeledLoginField: function(e) {
        return !!this._isAutoFillableTextField(e) && null !== this._cachedElementPatternMatch(e, "_loginFieldPatternMatch", "loginFormTypePatternMatchers")
    },
    _isLabeledSignUpField: function(e) {
        return !!this._isAutoFillableTextField(e) && null !== this._cachedElementPatternMatch(e, "_signUpFieldPatternMatch", "newAccountFormTypePatternMatchers")
    },
    _isLabeledEmailField: function(e) {
        return !!this._isAutoFillableTextField(e) && null !== this._cachedElementPatternMatch(e, "_emailFieldPatternMatch", "emailFieldLabelPatternMatchers")
    },
    _addressBookLabelForElement: function(e) {
        if (!this._isAutoFillableTextField(e) && !this._isAutoFillableSelectElement(e) && !this._isAutoFillableTextAreaElement(e)) return null;
        var n = this._cachedElementPatternMatch(e, "_addressBookPatternMatch", "addressBookFieldLabelPatternMatchers");
        return n ? n.Match : null
    },
    _elementDisallowsAutocomplete: function(e) {
        var n = e.getAttribute("autocomplete");
        return n && "off" === n.toLowerCase()
    },
    _isTextArea: function(e) {
        return e instanceof HTMLTextAreaElement
    },
    _isSelectElement: function(e) {
        return e instanceof HTMLSelectElement
    },
    _isLabelElement: function(e) {
        return e instanceof HTMLLabelElement
    },
    _isRenderedFormControl: function(e) {
        var n = e.localName;
        if (!n) return !1;
        return n in {
            button: !0,
            isindex: !0,
            fieldset: !0,
            legend: !0,
            meter: !0,
            optgroup: !0,
            option: !0,
            progress: !0,
            select: !0,
            textarea: !0
        } || e instanceof HTMLInputElement && (!!this._isElementAHiddenUsername(e) || (!e.type || "hidden" !== e.type))
    },
    _isEditablePlainTextField: function(e) {
        return !!isInputElement(e) && (!e.disabled && !e.readOnly && (!e.type || "text" === e.type))
    },
    _isTextField: function(e) {
        if (this._isTextArea(e)) return !0;
        if (!isInputElement(e)) return !1;
        var n = e.type;
        return !n || n in {
            date: !0,
            "datetime-local": !0,
            email: !0,
            isindex: !0,
            month: !0,
            number: !0,
            password: !0,
            search: !0,
            tel: !0,
            telephone: !0,
            text: !0,
            time: !0,
            url: !0,
            week: !0
        }
    },
    _isAutofocusedTextField: function(e) {
        return !!this._isTextField(e) && !0 === e.autofocus
    },
    _isAutoFilledTextField: function(e) {
        return !!this._isTextField(e) && e.matches(":-webkit-autofill")
    },
    _isSecureTextField: function(e) {
        if (!isInputElement(e)) return !1;
        if (e._wasPreviouslySecureTextField) return !0;
        try {
            if (e.matches(":-webkit-autofill-strong-password")) return e._wasPreviouslySecureTextField = !0, !0
        } catch (e) {}
        const n = getComputedStyle(e, null).getPropertyValue("-webkit-text-security");
        if ("" === n) return "password" === e.type;
        if (n && "none" !== n) return e._wasPreviouslySecureTextField = !0, !0;
        const r = e.type;
        if (r && "text" !== r) return !1;
        const t = e._nextControlInLogicalForm;
        return !(!t || !this._looksLikeShowHidePasswordButton(t)) && (!!this._matchesPasswordFieldLabelPattern(e) && (e._wasPreviouslySecureTextField = !0, !0))
    },
    _looksLikePasswordCredentialField: function(e, n) {
        if (!this._isSecureTextField(e)) return !1;
        var r = e.getAttribute("maxlength");
        return !(r && parseInt(r) < 4) && null === this._cachedElementPatternMatch(e, "_nonAccountPasswordSecureTextEntryFieldPatternMatch", "nonAccountPasswordSecureTextEntryFieldLabelPatternMatchers")
    },
    _looksLikeShowHidePasswordButton: function(e) {
        return !(!this._isCustomFormButton(e) && !this._isCheckboxInputElement(e)) && !!this._cachedElementPatternMatch(e, "_showHideButtonPatternMatch", "showHideButtonLabelPatternMatchers")
    },
    _isAutoFillable: function(e) {
        return !e.disabled && !e.readOnly
    },
    _isAutoFillableSelectElement: function(e) {
        return this._isAutoFillable(e) && this._isSelectElement(e)
    },
    _isAutoFillableTextAreaElement: function(e) {
        return this._isAutoFillable(e) && this._isTextArea(e)
    },
    _isAutoFillableTextField: function(e) {
        return this._isAutoFillable(e) && this._isTextField(e)
    },
    _looksLikeCreditCardNumberField: function(e, n) {
        return !!this._isAutoFillableTextField(e) && (!this._cachedElementPatternMatch(e, "_nonCreditCardNumberPatternMatch", "nonCreditCardCardNumberFieldLabelPatternMatchers") && (!(!n || -1 === n.indexOf("cc-number")) || null !== this._cachedElementPatternMatch(e, "_creditCardNumberPatternMatch", "creditCardNumberFieldLabelPatternMatchers")))
    },
    _looksLikeCreditCardSecurityCodeField: function(e, n) {
        return !!this._isAutoFillableTextField(e) && (!(!n || -1 === n.indexOf("cc-csc")) || null !== this._cachedElementPatternMatch(e, "_creditCardSecurityCodePatternMatch", "creditCardSecurityCodeFieldLabelPatternMatchers"))
    },
    _looksLikeCreditCardCardholderField: function(e, n) {
        return !!this._isEditablePlainTextField(e) && (!(!n || -1 === n.indexOf("cc-name")) || null !== this._cachedElementPatternMatch(e, "_creditCardCardholderPatternMatch", "creditCardCardholderFieldLabelPatternMatchers"))
    },
    _looksLikeCreditCardCompositeExpirationDateField: function(e, n) {
        return !(!this._isAutoFillableTextField(e) || this._isSecureTextField(e)) && (!(!n || -1 === n.indexOf("cc-exp")) || null !== this._cachedElementPatternMatch(e, "_creditCardCompositeExpirationDateFieldPatternMatch", "creditCardCompositeExpirationDateFieldLabelPatternMatchers"))
    },
    _looksLikeCreditCardTypeField: function(e, n) {
        return !(!this._isSelectElement(e) && !isRadioButtonElement(e)) && (!(!n || -1 === n.indexOf("cc-type")) || null !== this._cachedElementPatternMatch(e, "_creditCardTypePatternMatch", "creditCardTypeFieldLabelPatternMatchers"))
    },
    _looksLikeDayField: function(e) {
        return !(!this._isAutoFillableTextField(e) && !this._isAutoFillableSelectElement(e)) && null !== this._cachedElementPatternMatch(e, "_dayFieldPatternMatch", "dayFieldLabelPatternMatchers")
    },
    _looksLikeMonthField: function(e, n) {
        if (!this._isAutoFillableTextField(e) && !this._isAutoFillableSelectElement(e)) return !1;
        if (n && -1 !== n.indexOf("cc-exp-month")) return !0;
        if (null !== this._cachedElementPatternMatch(e, "_monthFieldPatternMatch", "monthFieldLabelPatternMatchers")) return !0;
        if ("select" !== this._getTagName(e).toLowerCase()) return !1;
        var r = e.options.length;
        if (12 === r || 13 === r)
            for (var t = [selectElementOptionsSequenceAnalysis(e, "text"), selectElementOptionsSequenceAnalysis(e, "value")], i = t.length, a = 0; a < i; a++) {
                var o = t[a],
                    l = o.lengthOfLongestSequence,
                    s = o.lastNumberInSequence;
                if (l >= 11 && 12 === s) return !0
            }
        return !1
    },
    _looksLikeYearField: function(e, n) {
        if (!this._isAutoFillableTextField(e) && !this._isAutoFillableSelectElement(e)) return !1;
        if (n && -1 !== n.indexOf("cc-exp-year")) return !0;
        if (null !== this._cachedElementPatternMatch(e, "_yearFieldPatternMatch", "yearFieldLabelPatternMatchers")) return !0;
        if ("select" !== this._getTagName(e).toLowerCase()) return !1;
        var r = selectElementOptionsSequenceAnalysis(e, "text"),
            t = r.lengthOfLongestSequence,
            i = r.lastNumberInSequence;
        return t >= e.options.length - 3 && 1e3 < i && i < 3e3
    },
    _looksLikeOneTimeCodeField: function(e, n, r, t, i) {
        if (!this._isAutoFillableTextField(e) && !this._isAutoFillableSelectElement(e)) return !1;
        if (n && -1 !== n.indexOf("one-time-code")) return !0;
        const a = e.type;
        if ("password" === a) {
            if (/^(.+\.)?chase\.com\.?$/.test(document.location.hostname)) return !1;
            if (this._matchesPasswordFieldLabelPattern(e)) return !1
        }
        if (null !== this._cachedElementPatternMatch(e, "_oneTimeCodePatternMatch", "oneTimeCodeFieldLabelPatternMatchers")) return !0;
        var o = e.getAttribute("maxlength");
        if (o && parseInt(o) > 10) return !1;
        let l = e.pattern;
        if (l) {
            let e = new RegExp(l);
            if ((e.testMatchesEntireString("1234") || e.testMatchesEntireString("123456") || e.testMatchesEntireString("12345678")) && !e.testMatchesEntireString("a") && !e.testMatchesEntireString("A")) return !0
        }
        const s = "number" === a || "tel" === a,
            p = o ? parseInt(o) : void 0;
        if (1 === p && (s || r || t)) return !0;
        const c = null !== this._cachedElementPatternMatch(e, "_weakOneTimeCodePatternMatch", "weakOneTimeCodeFieldLabelPatternMatchers");
        if (s && c) return !0;
        const u = e.placeholder;
        if (u && c && /^[#]+$/.test(u.replace(/ /g, ""))) return !0;
        if ((4 === p || 6 === p) && c) return !0;
        if (7 === p && u && /\d{3} \d{3}/.test(u)) return !0;
        if (this._isAutofocusedTextField(e)) {
            if (c) return !0;
            if ("0" === e.min && "9" === e.max) return !0
        }
        if (i) {
            let n = 0;
            c && n++, r && n++, t && n++;
            const i = this._cachedOneTimeCodePatternMatcher(),
                a = this._logicalFormForControl(e);
            if (a) {
                const e = a.backingElement;
                if (e) {
                    const r = e.querySelector("h1, h2, h3");
                    r && this._matchPatternAgainstString(i, r.innerText) && n++
                }
            }
            if (n >= 2) return !0;
            const o = function(e) {
                    if (this._matchPatternAgainstString(i, e)) return !0;
                    const n = e.replaceAll("-", " ");
                    return e !== n && this._matchPatternAgainstString(i, n)
                }.bind(this),
                l = window.location.protocol,
                s = "http:" === l || "https:" === l,
                p = lastPathComponentFromAnchor(window.location);
            if (s && p && o(p)) return !0; {
                const e = document.querySelector("link[rel=canonical]"),
                    n = e ? lastPathComponentForURLString(e.href) : null;
                if (n && o(n)) return !0
            }
            if (this._matchFromPageScanBeforeElement(i, e, document.body)) return !0
        }
        return !1
    },
    _looksLikeIgnoredDataTypeField: function(e) {
        return !!this._isAutoFillableTextField(e) && null !== this._cachedElementPatternMatch(e, "_ignoredDataTypePatternMatch", "ignoredDataTypeFieldLabelPatternMatchers")
    },
    _collectTextSample: function(e) {
        if (!e) return "";
        var n, r = "",
            t = e;
        do {
            n = (r = t.innerText.replace(/\s+/g, " ").trim()).length, t = t.parentElement
        } while (n < 300 && t);
        return n > 300 && (r = r.substr(0, 300)), r
    },
    _explicitMaxLength: function(e) {
        var n = e.getAttribute("maxlength");
        return n ? parseInt(n) : void 0
    },
    _explicitMinLength: function(e) {
        let n = e.getAttribute("minlength");
        return n ? parseInt(n) : void 0
    },
    _observedMaxLength: function(e) {
        if ("password" !== e.type) return null;
        const n = e.getAttribute("ng-pattern");
        if (!n) return null;
        if (!n.startsWith("/") || !n.endsWith("/")) return null;
        let r;
        try {
            r = new RegExp(n.substr(1, n.length - 2))
        } catch (e) {
            return null
        }
        if (!r || "/(?:)/" === r.toString()) return null;
        let t, i = "a1Abbb",
            a = !1;
        for (; i.length <= 20;) {
            let e = r.test(i);
            if (a && !e) return t;
            e && (a = !0, t = i.length), i += "b"
        }
        return null
    },
    _collectControlMetadata: function(e, n, r, t, i, a, o) {
        var l = {
            ControlTagName: this._getTagName(e),
            ControlFieldName: this._getNameOrId(e),
            ControlUniqueID: this.controlUniqueID(e)
        };
        e === document.activeElement && (l.ControlIsActiveElement = !0), this._isAutoFilledTextField(e) && (l.ControlIsAutoFilledTextField = !0), e.disabled && (l.ControlIsDisabled = !0), e.readOnly && (l.ControlIsReadOnly = !0), this._isTextField(e) && (l.ControlIsTextField = !0), this._isSecureTextField(e) && (l.ControlIsSecureTextField = !0), this._isLabeledUsernameField(e) && (l.ControlIsLabeledUsernameField = !0), this._elementDisallowsAutocomplete(e) && (l.DisallowsAutocomplete = !0), this._isAutofocusedTextField(e) && (l.ControlIsAutofocusedTextField = !0);
        const s = e.className;
        s && s.length && (l.ControlFieldClass = s);
        const p = e.id;
        p && p.length && (l.ControlFieldID = p);
        const c = e.value;
        c && (l.ControlValue = c);
        const u = this._associatedUsernameForControl(e);
        u && (l.ControlAssociatedUsername = u);
        const f = e.maxLength;
        if (-1 !== f) l.ControlMaxLength = f;
        else {
            const n = this._observedMaxLength(e);
            n && (l.ControlMaxLength = n)
        }
        const d = this._explicitMinLength(e);
        d && d > 0 && (l.ControlMinLength = d);
        const m = e.size;
        m > 0 && (l.ControlSize = m), e.isVisible() && (l.IsVisible = !0);
        const v = this.controlCategory(e);
        v && v.length && (l.ControlCategory = v), isDateTimeInputElement(e) && (l.ControlRequiredFormatForDateTimeInput = this._requiredFormatForDateTimeInput[e.type]);
        var y = autocompleteTokens(e);
        if (y && (l.AutocompleteTokens = y, -1 !== y.indexOf("username") ? l.ControlClaimsToBeUsernameViaAutocompleteAttribute = !0 : -1 !== y.indexOf("current-password") ? l.ControlClaimsToBeCurrentPasswordViaAutocompleteAttribute = !0 : -1 !== y.indexOf("new-password") && (l.ControlClaimsToBeNewPasswordViaAutocompleteAttribute = !0)), this._looksLikePasswordCredentialField(e) && (l.ControlLooksLikePasswordCredentialField = !0, "function" == typeof this._collectExtraControlMetadata && this._collectExtraControlMetadata(e, l), l.IsVisible && !r && (l.IsVisible = !isElementPositionedToBeEffectivelyInvisible(e))), l.ControlIsActiveElement || 1 !== n) {
            const n = this._collectSelectElementInfo(e);
            n && (l.SelectElementInfo = n);
            let r = e.placeholder;
            r && (l.ControlPlaceholder = r), this._looksLikeIgnoredDataTypeField(e) ? l.ControlLooksLikeIgnoredDataTypeField = !0 : this._looksLikeCreditCardNumberField(e, y) ? l.ControlLooksLikeCreditCardNumberField = !0 : this._looksLikeCreditCardSecurityCodeField(e, y) ? l.ControlLooksLikeCreditCardSecurityCodeField = !0 : this._looksLikeCreditCardCardholderField(e, y) ? l.ControlLooksLikeCreditCardCardholderField = !0 : this._looksLikeCreditCardTypeField(e, y) ? l.ControlLooksLikeCreditCardTypeField = !0 : this._looksLikeMonthField(e, y) ? l.ControlLooksLikeMonthField = !0 : this._looksLikeYearField(e, y) ? l.ControlLooksLikeYearField = !0 : this._looksLikeDayField(e) ? l.ControlLooksLikeDayField = !0 : this._looksLikeCreditCardCompositeExpirationDateField(e, y) && (l.ControlLooksLikeCreditCardCompositeExpirationDateField = !0)
        }
        if (l.ControlIsActiveElement || 2 === n || o) {
            let n = a && l.IsVisible;
            this._looksLikeOneTimeCodeField(e, y, t, i, n) && (l.ControlLooksLikeOneTimeCodeField = !0)
        }
        return 1 === n || l.ControlLooksLikeIgnoredDataTypeField || l.ControlIsSecureTextField || l.ControlLooksLikeCreditCardNumberField || l.ControlLooksLikeCreditCardSecurityCodeField || l.ControlLooksLikeCreditCardTypeField || (l.AddressBookLabel = this._addressBookLabelForElement(e)), l
    },
    _usesGeneratedPassword: function(e) {
        for (var n = !1, r = this._elementsWithGeneratedPasswords.length, t = 0; t < r; ++t) {
            var i = this._elementsWithGeneratedPasswords[t];
            if (e.containsControl(i)) {
                if (i.value !== this._generatedPasswords[t]) return !1;
                n = !0
            }
        }
        return n
    },
    _associatedUsernameForControl: function(e) {
        return this._isAutoFillableTextField(e) ? e.getAttribute("data-username") : null
    },
    _collectSelectElementInfo: function(e) {
        if (!this._isAutoFillableSelectElement(e)) return null;
        if (!e.options.length) return null;
        for (var n = [], r = e.options, t = r.length, i = 0; i < t; ++i) {
            var a = r[i];
            a.disabled || (a.label || a.text) && n.push([i, a.label ? a.label : a.text])
        }
        return n.length ? n : null
    },
    _stringsToInspectForDeterminingFormType: function(e) {
        let n = [],
            r = e.formElement,
            t = r.getAttribute("id"),
            i = r.getAttribute("name");
        t && n.push(t), i && n.push(i);
        let a = r.getElementsByTagName("legend");
        1 === a.length && n.push(a[0].innerText);
        let o = 0;
        for (let e of this._forms) e.formElement.isVisible() && o++;
        if (1 === o && r.isVisible() && !r.ownerDocument.defaultView.frameElement && r.getBoundingClientRect().top < .8 * document.documentElement.clientHeight) {
            let e = documentTitleWithoutHostNamePrefix();
            e && n.push(e);
            const r = lastPathComponentFromAnchor(window.location);
            r && r.length && n.push(r)
        }
        let l = [];
        if (r.isVisible()) {
            let e = r.getBoundingClientRect();
            for (let t = 0, i = r; t <= 2 && i; ++t, i = i.parentElement) {
                let r = Array.prototype.slice.call(i.querySelectorAll("h1, h2, h3")),
                    t = [
                        [],
                        [],
                        []
                    ];
                for (headerElement of r) {
                    let e = headerElement.tagName;
                    "H1" === e ? t[0].push(headerElement) : "H2" === e ? t[1].push(headerElement) : "H3" === e && t[2].push(headerElement)
                }
                let a = !0;
                for (headerElementsOfType of t) {
                    let r = headerElementsOfType.length;
                    if (0 === r) {
                        a = !1;
                        continue
                    }
                    if (r > 1) break;
                    let t = headerElementsOfType[0];
                    if (!t.isVisible()) break;
                    let i = t.getBoundingClientRect();
                    e.left <= i.left && i.right <= e.right && i.distanceToRect(e) < 100 && n.push(t.innerText);
                    break
                }
                if (a) break
            }
            for (let n = 0, t = r; n <= 2 && t; ++n, t = t.parentElement) {
                let n = Array.prototype.slice.call(t.querySelectorAll("button, input[type=submit]")).filter((function(n) {
                    if (!n.isVisible()) return !1;
                    let t = n.getBoundingClientRect();
                    return t.top > e.bottom && !r.contains(n) && e.left <= t.left && t.right <= e.right && t.distanceToRect(e) < 100
                }));
                if (n.length) {
                    l = n;
                    break
                }
            }
        }
        let s = !1,
            p = [],
            c = e.elements.concat(l);
        for (const e of c) {
            const r = e.type;
            "password" === r && (s = !0), "submit" !== r && "button" !== r || s && (e.isVisible() ? this._addInterestingStringsForButton(e, n) : p.push(e))
        }
        if (0 === n.length)
            for (control of p) this._addInterestingStringsForButton(control, n);
        return n
    },
    _addInterestingStringsForButton: function(e, n) {
        const r = e.getAttribute("id");
        r && n.push(r);
        const t = e.getAttribute("value");
        t && n.push(t);
        const i = e.innerText;
        i && i.length > 0 && n.push(i)
    },
    _autoFillFormTypeOfTypesUsingKeywordMatching: function(e, n, r) {
        for (var t = n.length, i = [], a = 0; a < t; ++a) {
            var o = (0, mapOfFormTypeToProducerOfAssociatedKeywords[n[a]])();
            i.push(o)
        }
        var l = this._stringsToInspectForDeterminingFormType(e),
            s = this._keywordsIndicatingNonAutoFillableFormType;
        s || (s = FormMetadataJSController.keywordsIndicatingNonAutoFillableFormType, this._keywordsIndicatingNonAutoFillableFormType = s);
        var p = s.length,
            c = [];
        for (a = 0; a < t; ++a) c.push(0);
        for (var u = l.length, f = 0; f < u; ++f) {
            for (var d = l[f].toLowerCase(), m = 0; m < p; ++m)
                if (-1 !== d.indexOf(s[m])) return 2;
            for (a = 0; a < t; ++a) {
                o = i[a];
                for (var v in o) - 1 !== d.indexOf(v) && (c[a] += o[v])
            }
        }
        for (let r = 0; r < t; ++r) {
            const t = this._mapOfFormTypeToExtraScoreProducer[n[r]];
            c[r] += t(e)
        }
        for (a = 0; a < t; ++a) 0 !== c[a] && 0;
        var y = formActionAsAnchorElement(e.formElement, !0);
        if (y) {
            var w = y.pathname.toLowerCase() + y.search.toLowerCase();
            for (a = 0; a < t; ++a) {
                o = i[a];
                for (var v in o) - 1 !== w.indexOf(v) && (c[a] += o[v])
            }
        }
        var M = [],
            E = 0;
        for (a = 0; a < t; ++a) {
            var S = c[a];
            S > 0 && (S >= E ? (E = S, M.unshift(a)) : M.push(a))
        }
        if (1 === M.length) return n[M[0]];
        if (M.length > 1) {
            var h = M[0];
            if (c[h] > c[M[1]]) return n[h]
        }
        return r
    },
    _matchesNonUsernameFieldLabelPattern: function(e) {
        if (this._nonUsernameFieldPatternMatchers || (this._nonUsernameFieldPatternMatchers = FormMetadataJSController.nonUsernameFieldLabelPatternMatchers), this._bestMatchForElement(e, this._nonUsernameFieldPatternMatchers)) return !0;
        const n = e.value;
        if (!e.id && !e.name && n && e.disabled)
            for (const e of this._nonUsernameFieldPatternMatchers)
                if (this._matchPatternAgainstString(e, n)) return !0;
        return !1
    },
    _matchSearchFieldLabelPattern: function(e) {
        if (this._searchFieldLabelPatternMatchers || (this._searchFieldLabelPatternMatchers = FormMetadataJSController.searchFieldLabelPatternMatchers), this._bestMatchForElement(e, this._searchFieldLabelPatternMatchers)) return !0;
        const n = e.value;
        if (!e.id && !e.name && n && e.disabled)
            for (const e of this._searchFieldLabelPatternMatchers)
                if (this._matchPatternAgainstString(e, n)) return !0;
        return !1
    },
    _matchesNonEmailFieldLabelPattern: function(e) {
        return this._nonEmailFieldPatternMatchers || (this._nonEmailFieldPatternMatchers = FormMetadataJSController.nonEmailFieldLabelPatternMatchers), !!this._bestMatchForElement(e, this._nonEmailFieldPatternMatchers)
    },
    _scoreForUsernameFieldCandidateFromLabelingAndPositionOfField: function(e, n, r) {
        return this._isLabeledUsernameField(e) ? n ? 4 : 6 : this._isLabeledEmailField(e) && !this._matchesNonEmailFieldLabelPattern(e) ? n ? 3 : 5 : r ? 2 : 1
    },
    _scoreForUsernameFieldCandidate: function(e, n, r) {
        var t = this._scoreForUsernameFieldCandidateFromLabelingAndPositionOfField(e, n, r);
        return e.isVisible() && (t += .5), this._matchesNonUsernameFieldLabelPattern(e) && (t -= 2), this._matchSearchFieldLabelPattern(e) && (t -= 1.5), e.readOnly && (t -= .5), e.id || e.name || (t -= 1), t
    },
    _matchesPasswordFieldLabelPattern: function(e) {
        return this._passwordFieldPatternMatchers || (this._passwordFieldPatternMatchers = FormMetadataJSController.passwordFieldLabelPatternMatchers), !!this._bestMatchForElement(e, this._passwordFieldPatternMatchers)
    },
    _matchesConfirmPasswordFieldLabelPattern: function(e, n = !1) {
        return this._confirmPasswordFieldPatternMatchers || (this._confirmPasswordFieldPatternMatchers = FormMetadataJSController.confirmPasswordFieldLabelPatternMatchers), !!this._bestMatchForElement(e, this._confirmPasswordFieldPatternMatchers, n)
    },
    _matchesConfirmEmailFieldLabelPattern: function(e) {
        return !!this._isLabeledEmailField(e) && (this._confirmEmailFieldPatternMatchers || (this._confirmEmailFieldPatternMatchers = FormMetadataJSController.confirmEmailFieldLabelPatternMatchers), !!this._bestMatchForElement(e, this._confirmEmailFieldPatternMatchers))
    },
    _collectRadioButtonInfo: function(e, n) {
        var r = e.radioButtonsWithName(n),
            t = r.length;

        function addTrimmedStringToArray(e, n) {
            var r = e.trim();
            r && n.push(r)
        }

        function addImageInfoToRadioButtonInfo(e, n) {
            addTrimmedStringToArray(e.alt, n), addTrimmedStringToArray(e.title, n), addTrimmedStringToArray(lastPathComponentForURLString(e.src), n)
        }

        function radioButtonInfoFromLabelElement(e) {
            var n = [];
            addTrimmedStringToArray(e.innerText, n);
            for (var r = e.querySelectorAll("img"), t = r.length, i = 0; i < t; ++i) addImageInfoToRadioButtonInfo(r[i], n);
            return n.length ? n : null
        }
        for (var i = !1, a = {}, o = 0; o < t; ++o) {
            a[(u = r[o]).value] = [u.value];
            for (var l = this._labelsForElement(u), s = l.length, p = 0; p < s; ++p) {
                i = !0;
                var c = radioButtonInfoFromLabelElement(l[p]);
                c && (a[u.value] = a[u.value].concat(c))
            }
        }
        if (i) return a;
        for (o = 0; o < t; ++o) {
            for (var u, f = "", d = (u = r[o]).traverseNextNode(); d && !this._isRenderedFormControl(d); d = d.traverseNextNode()) {
                var m = d.localName;
                if ("td" === m || "tr" === m || "ul" === m || "ol" === m || "dl" === m) break;
                if (d instanceof HTMLImageElement) addImageInfoToRadioButtonInfo(d, a[u.value]);
                else if (d.nodeType === Node.TEXT_NODE) {
                    var v = d.nodeValue.trim();
                    if (v && (f += v.substr(0, 64 - f.length)), f.length >= 64) break
                }
            }
            f && a[u.value].push(f)
        }
        return a
    },
    _bestUsernameFieldCandidate: function(e, n, r) {
        var t = n.FormControls,
            i = t.filter((function(e) {
                return e.ControlClaimsToBeUsernameViaAutocompleteAttribute
            }));
        if (1 === i.length) return i[0];
        for (var a = 0, o = [], l = !1, s = t.indexOf(r), p = t.length, c = 0; c < p; ++c) {
            var u = t[c];
            if (u === r) {
                l = !0;
                continue
            }
            if (!u.ControlIsTextField || u.ControlIsSecureTextField) continue;
            if (n.IsVisible && !t[c].IsVisible && !u.ControlValue) continue;
            const i = 100;
            let m = e[c];
            if (!(m.value.length > i)) {
                var f = c + 1 < p && c + 1 === s,
                    d = this._scoreForUsernameFieldCandidate(m, l, f);
                d > a ? (o = [c], a = d) : d === a && o.push(c)
            }
        }
        var m = o.length;
        if (a < 3 && m > 1) return null;
        if (a < 1) return null;
        switch (m) {
            case 0:
                return null;
            case 1:
                return t[o[0]];
            default:
                var v = e[s].getBoundingClientRect(),
                    y = {};
                return o.forEach((function(n) {
                    y[n] = v.distanceToRect(e[n].getBoundingClientRect())
                })), t[o.sort((function(e, n) {
                    return y[e] - y[n]
                }))[0]]
        }
    },
    _autoFillFormTypeFromCandidateFormTypes: function(e, n, r) {
        switch (n.length) {
            case 1:
                return n[0];
            case 2:
                return this._autoFillFormTypeOfTypesUsingKeywordMatching(e, [n[0], n[1]], r);
            default:
                return 1
        }
    },
    _shouldTrustElementThatClaimsToBeCurrentPasswordViaAutocompleteAttribute: function(e) {
        return !e.dataset.valRegexPattern
    },
    _identifyFormTypeAndPasswordFieldIndicesFromAutocompleteAttributes: function(e, n) {
        const r = [null, null];
        var t = n.length;
        if (t > 3) return r;
        for (var i = [], a = [], o = 0; o < t; ++o) {
            var l = n[o];
            l.ControlClaimsToBeCurrentPasswordViaAutocompleteAttribute && this._shouldTrustElementThatClaimsToBeCurrentPasswordViaAutocompleteAttribute(e[o]) ? i.push(o) : l.ControlClaimsToBeNewPasswordViaAutocompleteAttribute && a.push(o)
        }
        var s = i.length,
            p = a.length;
        if (s + p !== t) return r;
        switch (t) {
            case 0:
                return r;
            case 1:
                if (s) return [
                    [3], {
                        PasswordFieldIndex: i[0]
                    }
                ];
                if (p) return [null, null, 4];
            case 2:
                if (1 === s && 1 === p) return [
                    [5], {
                        OldPasswordFieldIndex: i[0],
                        PasswordFieldIndex: a[0]
                    }
                ];
                if (0 === s && 2 === p) return [
                    [4, 5], {
                        PasswordFieldIndex: a[0],
                        ConfirmationFieldIndex: a[1]
                    }
                ];
                break;
            case 3:
                if (1 === s && 2 === p) return [
                    [5], {
                        OldPasswordFieldIndex: i[0],
                        PasswordFieldIndex: a[0],
                        ConfirmationFieldIndex: a[1]
                    }
                ]
        }
        return r
    },
    _identifyPasswordFieldIndices: function(e, n) {
        var r = e.length;
        if (0 === r) return {};
        if (1 === r) return {
            PasswordFieldIndex: 0
        };
        if (this._oldPasswordPatternMatchers || (this._oldPasswordPatternMatchers = FormMetadataJSController.oldPasswordFieldLabelPatternMatchers), 2 === r) {
            return this._bestMatchForElement(n[0], this._oldPasswordPatternMatchers) ? {
                OldPasswordFieldIndex: 0,
                PasswordFieldIndex: 1
            } : this._bestMatchForElement(n[1], this._oldPasswordPatternMatchers) ? {
                OldPasswordFieldIndex: 1,
                PasswordFieldIndex: 0
            } : {
                PasswordFieldIndex: 0,
                ConfirmationFieldIndex: 1
            }
        }
        return this._bestMatchForElement(n[r - 1], this._oldPasswordPatternMatchers) ? {
            PasswordFieldIndex: r - 3,
            ConfirmationFieldIndex: r - 2,
            OldPasswordFieldIndex: r - 1
        } : {
            PasswordFieldIndex: r - 2,
            ConfirmationFieldIndex: r - 1,
            OldPasswordFieldIndex: r - 3
        }
    },
    _removePlaceholderTextForFormMetadata: function(e, n) {
        for (var r = e.length, t = 0; t < r; ++t) {
            var i = n.FormControls[t];
            if (i.ControlValue && i.ControlIsTextField && !i.ControlIsSecureTextField && !i.ControlIsReadOnly) {
                var a = legacyPlaceholderInfoForInputElement(e[t]);
                a && (a.AttributeMatchedWasValue && i.ControlUniqueID === n.UsernameElementUniqueID || (i.ControlValue = ""))
            }
        }
    },
    _isPasswordConfirmPair: function(e, n) {
        var r = this._matchesPasswordFieldLabelPattern(e),
            t = this._matchesConfirmPasswordFieldLabelPattern(n);
        return r && t
    },
    _trailingArgumentsForCollectControlMetadataFunction: function(e, n, r) {
        let t = isElementPositionedToBeEffectivelyInvisible(e.backingElement),
            i = !1,
            a = !1;
        if (document.activeElement || 2 === n) {
            let e = this._cachedOneTimeCodePatternMatcher();
            i = !!this._matchPatternAgainstString(e, documentTitleWithoutHostNamePrefix()), a = r && !!this._matchPatternAgainstString(e, r.pathname)
        }
        let o = !1;
        for (let n of e.elements)
            if (this._isTextField(n) && n.isVisible()) {
                if (o) {
                    o = !1;
                    break
                }
                o = !0
            }
        return [t, a, i, o]
    },
    _collectFormMetadata: function(e, n) {
        var r, t, i = (t = 0, {
            backwardScanCache: new WeakMap,
            forwardScanCache: new WeakMap,
            shouldUsePageScan: function() {
                return t < 40
            },
            willStartCollectingMetadataForControl: function() {
                r = null
            },
            reportPageScanUsedSuccessfully: function(e) {
                r = !(!e && !r)
            },
            didFinishCollectingMetadataForControl: function() {
                !0 === r ? t = 0 : !1 === r && t++
            }
        });
        this._pageScanContext = i;
        var a = e.formElement,
            o = {
                FormID: e.formUniqueID,
                ContainsActiveElement: !1,
                FormControls: [],
                AutoFillFormType: 1,
                UsernameElementUniqueID: void 0,
                OldPasswordElementUniqueID: void 0,
                PasswordElementUniqueID: void 0,
                ConfirmPasswordElementUniqueID: void 0,
                UsesGeneratedPassword: this._usesGeneratedPassword(e),
                FirstCreditCardCardholderFieldOrCreditCardNumberFieldUniqueID: void 0,
                IsVisible: a.isVisible(),
                TextSample: void 0,
                RequestType: n
            };
        this._elementDisallowsAutocomplete(a) && (o.DisallowsAutocomplete = !0), a instanceof HTMLFormElement && (o.FormIsSearchForm = this._isSearchForm(a, !0)), e.isAnnotated && (o.Annotations = e.annotations);
        var l = a.getAttribute("rel");
        l && "async" === l.toLowerCase() && (o.FormUsesRelAsync = !0);
        let s = formActionAsAnchorElement(a);
        s && s.href && (o.FormAction = s.href);
        var p = e.elements,
            c = !p.some(this._isSecureTextField.bind(this));
        let [u, f, d, m] = this._trailingArgumentsForCollectControlMetadataFunction(e, n, s);
        var v = 0,
            y = !1,
            w = [],
            M = [],
            E = [],
            S = [],
            h = void 0,
            g = void 0,
            F = void 0,
            b = void 0,
            C = !1,
            _ = !1,
            k = {},
            P = [];
        let I = !1;
        for (var L = p.length, T = 0; T < L; ++T) {
            var A = p[T];
            if (c && !A.isVisible() && !A._relatesToCredentials) continue;
            var x = isRadioButtonElement(A),
                U = A.name;
            if (x && k[U]) continue;
            i.willStartCollectingMetadataForControl();
            const r = !I;
            var D = this._collectControlMetadata(A, n, u, f, d, m, r);
            if (i.didFinishCollectingMetadataForControl(), I = !0, T + 1 < L && (D.ControlNextFieldUniqueID = this.controlUniqueID(p[T + 1])), o.FormControls.push(D), P.push(A), D.IsVisible || !o.IsVisible || A._relatesToCredentials)
                if (D.ControlIsActiveElement && (o.ContainsActiveElement = !0), U && x) k[U] = 1, D.ControlValue = "", D.RadioButtonInfo = this._collectRadioButtonInfo(e, U);
                else if (D.ControlIsTextField || D.SelectElementInfo)
                if (!_ && D.ControlLooksLikeCreditCardSecurityCodeField && (_ = !0), C || !D.ControlLooksLikeCreditCardCardholderField && !D.ControlLooksLikeCreditCardNumberField) {
                    if (!(D.ControlLooksLikeDayField || D.ControlLooksLikeMonthField || D.ControlLooksLikeYearField || D.ControlLooksLikeCreditCardCompositeExpirationDateField)) {
                        if (D.ControlLooksLikePasswordCredentialField) {
                            if (D.ControlLooksLikeCreditCardSecurityCodeField || D.ControlLooksLikeIgnoredDataTypeField) continue;
                            var N = A.getAttribute("aria-hidden");
                            N && "true" === N.toLowerCase() ? (E.push(A), S.push(D)) : (w.push(A), M.push(D))
                        }
                        if (this._isLabeledEmailField(A)) {
                            if (++v > 2) {
                                y = !1;
                                continue
                            }
                            if (!(T + 1 < L && this._matchesConfirmEmailFieldLabelPattern(p[T + 1]))) continue;
                            y = !0
                        }
                    }
                } else C = !0, o.FirstCreditCardCardholderFieldOrCreditCardNumberFieldUniqueID = D.ControlUniqueID
        }!w.length && E.length && (w = E, M = S);
        var O, q, B = this._identifyFormTypeAndPasswordFieldIndicesFromAutocompleteAttributes(w, M),
            z = B[0],
            V = B[1],
            j = B[2],
            R = V || this._identifyPasswordFieldIndices(M, w);
        if (void 0 !== R.PasswordFieldIndex && (h = M[R.PasswordFieldIndex], o.PasswordElementUniqueID = h.ControlUniqueID, g = this._explicitMaxLength(w[R.PasswordFieldIndex])), void 0 !== R.ConfirmationFieldIndex && (F = M[R.ConfirmationFieldIndex], o.ConfirmPasswordElementUniqueID = F.ControlUniqueID, b = this._explicitMaxLength(w[R.ConfirmationFieldIndex])), void 0 !== R.OldPasswordFieldIndex) {
            var W = M[R.OldPasswordFieldIndex];
            o.OldPasswordElementUniqueID = W.ControlUniqueID
        }
        if (h && (O = this._bestUsernameFieldCandidate(P, o, h)), O ? o.UsernameElementUniqueID = O.ControlUniqueID : q = this._findHiddenUsernameElement(e, o, P), z) o.AutoFillFormType = this._autoFillFormTypeFromCandidateFormTypes(e, z, z[0]);
        else if (1 === w.length && y) o.AutoFillFormType = this._autoFillFormTypeOfTypesUsingKeywordMatching(e, [4, 5], 4);
        else if (o.UsernameElementUniqueID) switch (w.length) {
                case 0:
                    break;
                case 1:
                    if (_ && o.UsernameElementUniqueID === o.FirstCreditCardCardholderFieldOrCreditCardNumberFieldUniqueID && M[0].ControlLooksLikeCreditCardNumberField) break;
                    this._matchesConfirmPasswordFieldLabelPattern(w[0]) ? o.AutoFillFormType = this._autoFillFormTypeOfTypesUsingKeywordMatching(e, [4, 5], j || 3) : o.AutoFillFormType = this._autoFillFormTypeOfTypesUsingKeywordMatching(e, [4, 3], j || 3);
                    break;
                case 2:
                    g === b ? o.AutoFillFormType = this._autoFillFormTypeOfTypesUsingKeywordMatching(e, [4, 5], 4) : b ? this._isPasswordConfirmPair(w[0], w[1]) ? o.AutoFillFormType = this._autoFillFormTypeOfTypesUsingKeywordMatching(e, [4, 5], 2) : o.AutoFillFormType = 2 : o.AutoFillFormType = this._autoFillFormTypeOfTypesUsingKeywordMatching(e, [4, 5], 2);
                    break;
                case 3:
                    g === b || !b || this._isPasswordConfirmPair(w[R.PasswordFieldIndex], w[R.ConfirmationFieldIndex]) ? o.AutoFillFormType = 5 : o.AutoFillFormType = 2;
                    break;
                default:
                    o.AutoFillFormType = 2
            } else if (2 === w.length || 3 === w.length) g !== b && b ? 2 === w.length ? this._isPasswordConfirmPair(w[0], w[1]) ? o.AutoFillFormType = this._autoFillFormTypeOfTypesUsingKeywordMatching(e, [4, 5], 2) : o.AutoFillFormType = 2 : this._isPasswordConfirmPair(w[R.PasswordFieldIndex], w[R.ConfirmationFieldIndex]) ? o.AutoFillFormType = 5 : o.AutoFillFormType = 2 : o.AutoFillFormType = this._autoFillFormTypeOfTypesUsingKeywordMatching(e, [4, 5], 5);
            else if (1 === w.length) {
            var H = w[0];
            if (this._matchesConfirmPasswordFieldLabelPattern(H, !0)) o.AutoFillFormType = this._autoFillFormTypeOfTypesUsingKeywordMatching(e, [3, 5], 5);
            else if (this._matchesPasswordFieldLabelPattern(H))
                if (this._isElementFollowedByForgotPasswordLink(H)) o.AutoFillFormType = 3;
                else {
                    var J = [4, 3, 5];
                    o.AutoFillFormType = this._autoFillFormTypeOfTypesUsingKeywordMatching(e, J, 2), 2 === o.AutoFillFormType && q && (o.AutoFillFormType = 4)
                } else o.AutoFillFormType = 2
        } else 0 !== w.length && (o.AutoFillFormType = 2); if (1 === o.AutoFillFormType) {
            var G = null,
                K = null,
                $ = 0,
                Y = P.length;
            for (T = 0; T < Y; ++T) {
                A = P[T];
                var Z = o.FormControls[T],
                    X = Z.IsVisible;
                if (X && Z.ControlIsTextField && $++, $ > 1) break;
                var Q = this._isLabeledEmailField(A);
                if (X && (Z.ControlClaimsToBeUsernameViaAutocompleteAttribute || Z.ControlIsLabeledUsernameField || Q || this._isLabeledLoginField(A)) && !this._matchesNonUsernameFieldLabelPattern(A) && !A.readOnly && "INPUT" === A.tagName && !this._isLabeledSignUpField(A)) 3 === this._autoFillFormTypeOfTypesUsingKeywordMatching(e, [4, 3], Q ? 4 : 3) && (G = A, K = Z)
            }
            1 === $ && K && !controlAppearsToBePartOfPhotoTaggingInterface(G) && (o.AutoFillFormType = 3, o.UsernameElementUniqueID = K.ControlUniqueID)
        }
        4 === o.AutoFillFormType && o.FirstCreditCardCardholderFieldOrCreditCardNumberFieldUniqueID === o.UsernameElementUniqueID && (o.UsernameElementUniqueID = void 0), !o.UsernameElementUniqueID && q && this._extractMetadataForHiddenUsernameElement(q, o, P), 3 != o.AutoFillFormType && 4 != o.AutoFillFormType && 5 != o.AutoFillFormType && (o.UsernameElementUniqueID = void 0, o.OldPasswordElementUniqueID = void 0, o.PasswordElementUniqueID = void 0, o.ConfirmPasswordElementUniqueID = void 0), o.IsVisible || 3 == o.AutoFillFormType || 4 == o.AutoFillFormType || 5 == o.AutoFillFormType || (o.AutoFillFormType = 2), 1 !== n && (o.TextSample = this._collectTextSample(e._formElement)), o.FormIsEligibleForAutomaticLogin = this._formIsEligibleForAutomaticLogin(o, e.backingElement);
        for (let e of o.FormControls)
            if (e.ControlLooksLikeOneTimeCodeField && this._oneTimeCodeIsEligibleForAutomaticLogin(e, o)) {
                e.OneTimeCodeIsEligibleForAutomaticLogin = !0;
                break
            }
        var ee = FormMetadataJSController.shouldIncludeNonEmptyFields;
        if (o.IsVisible)
            for (T = (Y = P.length) - 1; T >= 0; --T) this._shouldIncludeControlMetadata(ee, o, P[T], o.FormControls[T]) || (4 !== n ? (o.FormControls.splice(T, 1), P.splice(T, 1)) : o.FormControls[T].WOULD_NORMALLY_NOT_BE_SENT_TO_UI_PROCESS = !0);
        return this._removePlaceholderTextForFormMetadata(P, o), delete this._pageScanContext, o
    },
    _formIsEligibleForAutomaticLogin: function(e, n) {
        if (3 !== e.AutoFillFormType) return !1;
        let r = !1;
        for (const n of e.FormControls) {
            const t = n.ControlUniqueID;
            if (t === e.UsernameElementUniqueID || t === e.PasswordElementUniqueID) continue;
            if (n.ControlIsDisabled) continue;
            if (n.ControlIsReadOnly) continue;
            if (!n.IsVisible) continue;
            const i = this.formControlWithUniqueID(t);
            if (!i) continue;
            if (this._isTextArea(i)) return !1;
            if (this._isSelectElement(i)) return !1;
            if (this._isSubmitButton(i)) continue;
            if (this._looksLikeShowHidePasswordButton(i)) continue;
            if (!isInputElement(i)) continue;
            const a = i.type;
            if ("button" !== a && "reset" !== a && "submit" !== a) {
                if (!this._isCheckboxInputElement(i)) return !1;
                if (r) return !1;
                r = !0
            }
        }
        return !n || !n.querySelector("iframe[title*=captcha i]")
    },
    _oneTimeCodeIsEligibleForAutomaticLogin: function(e, n) {
        for (const e of n.FormControls) {
            if (e.ControlLooksLikeOneTimeCodeField) continue;
            if (e.ControlIsDisabled) continue;
            if (e.ControlIsReadOnly) continue;
            if (!e.IsVisible) continue;
            const n = this.formControlWithUniqueID(e.ControlUniqueID);
            if (!n) continue;
            if (this._isTextArea(n)) return !1;
            if (this._isSelectElement(n)) return !1;
            if (this._isSubmitButton(n)) continue;
            if (this._looksLikeShowHidePasswordButton(n)) continue;
            if (!isInputElement(n)) continue;
            const r = n.type;
            if ("button" !== r && "reset" !== r && "submit" !== r) return !1
        }
        return !0
    },
    _shouldIncludeControlMetadata: function(e, n, r, t) {
        if (r._relatesToCredentials) return !0;
        if (t.IsVisible) {
            if (formControlHasBeenClassifiedInAnInterestingWay(t)) return !0;
            if (e && t.ControlValue) return !0
        }
        return !(!n.UsernameElementUniqueID || t.ControlUniqueID !== n.UsernameElementUniqueID)
    },
    _isElementAHiddenUsername: function(e) {
        const n = /user|email/i;
        return "hidden" === e.type && (!(!n.test(e.getAttribute("id")) && !n.test(e.getAttribute("name"))) && !!isValidUsernameOrEmail(e.value))
    },
    _findHiddenUsernameElement: function(e, n, r) {
        var t = e.formElement;
        if (t instanceof HTMLElement) {
            for (var i = t.querySelectorAll("input"), a = i.length, o = 0; o < a; ++o) {
                var l = i[o];
                if (this._isElementAHiddenUsername(l)) return l
            }
            return null
        }
    },
    _extractMetadataForHiddenUsernameElement: function(e, n, r) {
        var t = {
            ControlTagName: this._getTagName(e),
            ControlFieldName: this._getNameOrId(e),
            ControlUniqueID: this.controlUniqueID(e),
            ControlIsReadOnly: !0,
            ControlValue: e.value
        };
        n.UsernameElementUniqueID = t.ControlUniqueID, n.FormControls.push(t), r.push(e)
    },
    _usernameFieldForPasswordField: function(e) {
        var n = FormMetadataJS._cachedMetadataForLogicalForm(this._logicalFormForControl(e));
        return n && n.UsernameElementUniqueID ? FormMetadataJS.formControlWithUniqueID(n.UsernameElementUniqueID) : null
    },
    _cachedMetadataForLogicalForm: function(e) {
        for (var n = -1, r = 0; r < this._forms.length; ++r)
            if (this._forms[r].formUniqueID === e.formUniqueID) {
                n = r;
                break
            }
        if (-1 === n) return null;
        var t = this._formMetadata[n],
            i = t.FormControls,
            a = i.length;
        for (r = 0; r < a; ++r) {
            var o = i[r],
                l = this.formControlWithUniqueID(o.ControlUniqueID);
            l && (o.ControlValue = l.value, o.ControlIsAutoFilledTextField = this._isAutoFilledTextField(l))
        }
        return t.UsesGeneratedPassword = this._usesGeneratedPassword(e), t.Annotations = e.annotations, t
    },
    _markFormIsBestForPageLevelAutoFill: function() {
        var e = this._indexOfFormWithHighestScoreIfGreaterThanZero((function(e) {
            var n = e.PasswordElementUniqueID ? 0 : -1;
            return function scoreForFormType(e) {
                switch (e) {
                    case 3:
                        return 30;
                    case 4:
                    case 5:
                        return 20;
                    case 1:
                        return 10;
                    case 0:
                    case 2:
                        return 0
                }
                return -100
            }(e.AutoFillFormType) + function scoreForVisibility(e) {
                return e ? 50 : 0
            }(e.IsVisible) + n
        }));
        null !== e && (this._formMetadata[e].FormIsBestForPageLevelAutoFill = !0)
    },
    _markFormIsBestForStreamlinedLogin: function() {
        let e = this._indexOfFormWithHighestScoreIfGreaterThanZero((function(e, n) {
            if (!e.IsVisible) return 0;
            let r = n.getBoundingClientRect();
            if (!(r.right >= 0 && r.bottom >= 0 && r.left <= window.innerWidth && r.top <= window.innerHeight)) return 0;
            if (r.bottom + window.scrollY < 80) {
                let e = !(location.hash || location.pathname && "/" !== location.pathname || location.search),
                    n = r.width / r.height;
                if (!e && n > 4) return 0
            }
            let t = 3 === e.AutoFillFormType,
                i = 0,
                a = e.FormControls,
                o = a.length;
            for (var l = 0; l < o; ++l) {
                let n = a[l];
                if (t) {
                    n.ControlIsAutofocusedTextField && (i += 1);
                    let r = n.ControlUniqueID;
                    if (r === e.UsernameElementUniqueID || r === e.PasswordElementUniqueID) {
                        i += 10;
                        continue
                    }
                }
                n.OneTimeCodeIsEligibleForAutomaticLogin && (i += 5)
            }
            return i
        }));
        null !== e && (this._formMetadata[e].FormIsBestForStreamlinedLogin = !0)
    },
    _indexOfFormWithHighestScoreIfGreaterThanZero: function(e) {
        for (var n = null, r = null, t = this._formMetadata.length, i = 0; i < t; ++i) {
            var a = e(this._formMetadata[i], this._forms[i].backingElement);
            (null === r || a > r) && (n = i, r = a)
        }
        return r > 0 ? n : null
    },
    isAnyFormAnnotated: function() {
        var e = this._forms;
        if (!e) return !1;
        for (var n = e.length, r = 0; r < n; ++r)
            if (e[r].isAnnotated) return !0;
        return !1
    },
    _logicalFormWithID: function(e) {
        for (var n = this._forms, r = n.length, t = 0; t < r; ++t) {
            var i = n[t];
            if (i.formUniqueID === e) return i
        }
        return null
    },
    _indexOfLogicalFormWithID: function(e) {
        return this._forms.findIndex((function(n) {
            return n.formUniqueID === e
        }))
    },
    clearAnnotationsForFormWithID: function(e) {
        var n = this._logicalFormWithID(e);
        n && n.clearAnnotations()
    },
    annotateFormWithID: function(e, n) {
        var r = this._logicalFormWithID(e);
        r && r.annotate(n)
    },
    _collectMetadata: function(e) {
        var n = this._logicalFormsInPage(100, 10);
        this._forms = n, this._formMetadata = [];
        for (var r = n.length, t = 0; t < r; ++t) {
            2 === e && "function" == typeof willCollectFormMetadata && willCollectFormMetadata();
            let r = this._collectFormMetadata(n[t], e);
            2 === e && "function" == typeof evaluateCustomJavaScript && (r.ResultFromEvaluatingCustomJavaScript = evaluateCustomJavaScript(n[t], r)), this._formMetadata.push(r)
        }
        this._markFormIsBestForPageLevelAutoFill(), 0 !== e && this._markFormIsBestForStreamlinedLogin()
    },
    _collectAndCacheFormMetadata: function(e, n) {
        for (var r = this._collectFormMetadata(e, n), t = -1, i = this._forms.length, a = 0; a < i; ++a)
            if (this._forms[a].formUniqueID === e.formUniqueID) {
                t = a;
                break
            }
        return -1 === t ? (this._forms.push(e), this._formMetadata.push(r)) : this._formMetadata[t] = r, r
    },
    _metadataForFormWithID: function(e) {
        for (var n = 0; n < this._formMetadata.length; ++n) {
            var r = this._formMetadata[n];
            if (r.FormID == e) return r
        }
        return null
    },
    _recollectMetadataForFormWithID: function(e) {
        const n = this._logicalFormWithID(e);
        return n ? this._collectAndCacheFormMetadata(n, 0) : null
    },
    _fillControlWithGeneratedPassword: function(e, n) {
        var r = this._elementsWithGeneratedPasswords.indexOf(e); - 1 === r && (this._elementsWithGeneratedPasswords.push(e), r = this._elementsWithGeneratedPasswords.length - 1), this._generatedPasswords[r] = n, this._autoFillControlWithValue(e, n, !0)
    },
    fillFormWithPassword: function(e, n, r) {
        var t = this._metadataForFormWithID(e);
        if (null === t) return null;
        const i = t.PasswordElementUniqueID,
            a = i ? this.formControlWithUniqueID(i) : void 0,
            o = r ? this.formControlWithUniqueID(r) : void 0;
        var l = a || o;
        const s = i || r;
        if (!l) return null;
        this._fillControlWithGeneratedPassword(l, n);
        let p = t.ConfirmPasswordElementUniqueID;
        p || 5 !== t.AutoFillFormType && 4 !== t.AutoFillFormType || (p = (t = this._recollectMetadataForFormWithID(e) || t).ConfirmPasswordElementUniqueID);
        let c = p ? this.formControlWithUniqueID(p) : null;
        return c ? (this._fillControlWithGeneratedPassword(c, n), [s, p]) : [s]
    },
    fillFieldWithGeneratedPassword: function(e, n) {
        var r = this.formControlWithUniqueID(e);
        r && this._isTextField(r) && this._fillControlWithGeneratedPassword(r, n)
    },
    clearField: function(e) {
        var n = this.formControlWithUniqueID(e);
        this._clearFormField(n)
    },
    _clearFormField: function(e) {
        if (e && this._isTextField(e) && e.value.length) {
            var n = e.matches(":focus");
            n || e.dispatchEvent(new Event("focus")), e.dispatchEvent(eventThatBubbles("keydown")), e.value = "", e.dispatchEvent(eventThatBubbles("input")), e.dispatchEvent(eventThatBubbles("keyup")), e.dispatchEvent(eventThatBubbles("change")), n || e.dispatchEvent(new Event("blur"))
        }
    },
    focusFormForStreamlinedLogin: function(e) {
        var n = this._metadataForFormWithID(e);
        if (null !== n) {
            var r = function uniqueControlIDToFocus(e) {
                for (const n of e.FormControls) {
                    const r = n.ControlUniqueID;
                    if (r === e.UsernameElementUniqueID || r === e.PasswordElementUniqueID || n.ControlLooksLikeOneTimeCodeField) return r
                }
            }(n);
            if (r) this.formControlWithUniqueID(r).focus()
        }
    },
    formsAndMetadata: function(e) {
        return visibilityCacheGeneration++, this._collectMetadata(e), [this._forms.map((function(e) {
            return e.formElement
        })), this._formMetadata]
    },
    formControlWithUniqueID: function(e) {
        return this._controlUniqueIDToControlMap[e]
    },
    formElementWithFormID: function(e) {
        for (var n = 0; n < this._formMetadata.length; ++n) {
            if (this._formMetadata[n].FormID === e) return this._forms[n].formElement
        }
        return null
    },
    selectIfTextField: function(e) {
        this._isTextField(e) && e.select()
    },
    _getOrCreateCachedMetadataForLogicalForm: function(e, n) {
        var r = this._cachedMetadataForLogicalForm(e);
        return !r || null != n && 1 === r.RequestType && 1 !== n ? this._collectAndCacheFormMetadata(e, n) : r
    },
    _getOrCreateLogicalFormForTextFieldOrSelectElement: function(e) {
        var n = this._indexInCacheOfLogicalFormContainingControl(e);
        if (-1 === n) n = this._forms.length;
        else
            for (var r = this._formMetadata[n].FormControls, t = r.length, i = e._controlUniqueID, a = 0; a < t; ++a)
                if (r[a].ControlUniqueID === i) return this._forms[n]; var o = this._logicalFormsInPage(),
            l = o.length;
        for (a = 0; a < l; ++a) {
            var s = o[a];
            if (s.containsControl(e)) {
                var p = this._indexOfLogicalFormWithID(s.formUniqueID);
                return -1 !== p && (n = p), this._forms[n] = s, this._formMetadata[n] = this._collectFormMetadata(s, 0), this._forms[n]
            }
        }
        return null
    },
    _cachedMetadataForFormWithTextFieldOrSelectElement: function(e, n) {
        if (!this._isTextField(e) && !this._isSelectElement(e)) return null;
        var r = this._getOrCreateLogicalFormForTextFieldOrSelectElement(e);
        return r ? this._getOrCreateCachedMetadataForLogicalForm(r, n) : null
    },
    _isAnyPasswordElementUniqueID: function(e, n) {
        return e.PasswordElementUniqueID === n || e.ConfirmPasswordElementUniqueID === n || e.OldPasswordElementUniqueID === n
    },
    _isCurrentPasswordElementUniqueID: function(e, n) {
        switch (e.AutoFillFormType) {
            case 4:
            case 5:
                return e.OldPasswordElementUniqueID === n;
            default:
                return e.PasswordElementUniqueID === n
        }
    },
    _isNewPasswordElementUniqueID: function(e, n) {
        switch (e.AutoFillFormType) {
            case 4:
            case 5:
                return e.PasswordElementUniqueID === n || e.ConfirmPasswordElementUniqueID === n;
            default:
                return !1
        }
    },
    _updateAnnotationsForField: function(e) {
        var n = this._getOrCreateLogicalFormForTextFieldOrSelectElement(e);
        if (n) {
            var r = this._getOrCreateCachedMetadataForLogicalForm(n);
            if (r) {
                var t = e._controlUniqueID;
                this._isCurrentPasswordElementUniqueID(r, t) ? n.annotate({
                    CurrentPassword: e.value
                }) : this._isNewPasswordElementUniqueID(r, t) ? n.annotate({
                    NewPassword: e.value
                }) : r.UsernameElementUniqueID === t && n.annotate({
                    Username: e.value
                }), isCredentialElementUniqueID(r, t) && (e._relatesToCredentials = "" !== e.value)
            }
        }
    },
    _removeUnparentedLogicalFormsFromCache() {
        for (let e = this._forms.length - 1; e >= 0; --e) this._forms[e].formElement.isConnected || (this._forms.splice(e, 1), this._formMetadata.splice(e, 1))
    },
    textFieldOrSelectElementMetadata: function(e, n) {
        visibilityCacheGeneration++, this._removeUnparentedLogicalFormsFromCache();
        var r = [null, null],
            t = this._cachedMetadataForFormWithTextFieldOrSelectElement(e, n);
        if (!t) return r;
        this._pageScanContext = {
            backwardScanCache: new WeakMap,
            forwardScanCache: new WeakMap
        };
        let i = this._logicalFormWithID(t.FormID),
            a = formActionAsAnchorElement(i.formElement),
            [o, l, s, p] = this._trailingArgumentsForCollectControlMetadataFunction(i, n, a);
        var c = this._collectControlMetadata(e, 0, o, l, s, p, !0);
        return delete this._pageScanContext, c.ControlLooksLikeOneTimeCodeField && this._oneTimeCodeIsEligibleForAutomaticLogin(c, t) && (c.OneTimeCodeIsEligibleForAutomaticLogin = !0), c.SelectionStart = e.selectionStart, c.SelectionLength = e.selectionEnd - e.selectionStart, 3 === n && (!t.UsernameElementUniqueID && this._isAnyPasswordElementUniqueID(t, c.ControlUniqueID) && i.isAnnotated && i.annotate({
            Username: null
        }), this._updateAnnotationsForField(e)), r[0] = c, r[1] = t, r
    },
    disableSpellCheckInFieldIfNeeded: function(e) {
        if (e) {
            var n = this.formControlWithUniqueID(e);
            n && this._isAutoFillableTextField(n) && FormMetadataJSController.setInputElementSpellCheckEnabled(n, !1)
        }
    },
    selectionRangeInField: function(e) {
        var n = this.formControlWithUniqueID(e);
        return n && this._isTextField(n) ? [n.selectionStart, n.selectionEnd - n.selectionStart] : null
    },
    setFormFieldSelection: function(e, n, r) {
        var t = this.formControlWithUniqueID(e);
        t && this._isTextField(t) && (t.selectionStart = n, t.selectionEnd = n + r)
    },
    replaceFormFieldRangeAndSelectTail: function(e, n, r, t, i) {
        var a = this.formControlWithUniqueID(e);
        if (a && this._isTextField(a)) {
            var o = a.value,
                l = o.substr(0, n) + t + o.substr(n + r);
            a.value = l, a.selectionStart = i, a.selectionEnd = l.length, a.dispatchEvent(eventThatBubbles("input")), a.dispatchEvent(eventThatBubbles("change"))
        }
    },
    _collectVisibleNonEmptyTextFieldsAndTextAreasInForm: function(e, n, r) {
        visibilityCacheGeneration++;
        for (var t = e.elements, i = t.length, a = 0; a < i; ++a) {
            var o = t[a];
            o.isVisible() && (null != o.value && o.value.length && (this._isTextField(o) ? n.push(o) : this._isTextArea(o) && r.push(o)))
        }
    },
    visibleNonEmptyFormTextControls: function() {
        for (var e = [], n = [], r = document.getElementsByTagName("form"), t = 0; t < r.length; ++t) this._collectVisibleNonEmptyTextFieldsAndTextAreasInForm(r[t], e, n);
        return [e, n]
    },
    visibleNonEmptyFormTextControlsInForm: function(e) {
        var n = [],
            r = [];
        return this._collectVisibleNonEmptyTextFieldsAndTextAreasInForm(e, n, r), [n, r]
    },
    _autoFillRadioButton: function(e, n, r) {
        for (var t = this._logicalFormForControl(e).radioButtonsWithName(e.name), i = t.length, a = 0; a < i; ++a) {
            var o = t[a];
            if (o.value === n) return o.dispatchEvent(eventThatBubbles("click")), o.checked = !0, void FormMetadataJSController.setInputElementAutofilled(o, r)
        }
    },
    _autoFillControlWithValueAndOptions: function(e, n, r, t, i) {
        isRadioButtonElement(e) ? this._autoFillRadioButton(e, n, t) : this._isSelectElement(e) ? this._autoFillSelectWithOptionIndex(e, n, t) : (r == ShouldFocusAndBlur.Yes && e.dispatchEvent(new Event("focus")), e.dispatchEvent(eventThatBubbles("keydown")), e.value = n, this._updateAnnotationsForField(e), e.dispatchEvent(eventThatBubbles("input")), e.dispatchEvent(eventThatBubbles("keyup")), e.dispatchEvent(eventThatBubbles("change")), r == ShouldFocusAndBlur.Yes && e.dispatchEvent(new Event("blur")), i ? FormMetadataJSController.setInputElementAutofilledAndObscured(e, n.length && t) : FormMetadataJSController.setInputElementAutofilled(e, n.length && t))
    },
    _autoFillControlWithValue: function(e, n, r, t) {
        this._autoFillControlWithValueAndOptions(e, n, ShouldFocusAndBlur.Yes, r, t)
    },
    _autoFillSelectWithOptionIndex: function(e, n, r) {
        e.dispatchEvent(eventThatBubbles("mousedown")), e.dispatchEvent(new Event("focus")), e.selectedIndex !== n && (e.selectedIndex = n, e.dispatchEvent(eventThatBubbles("input")), e.dispatchEvent(eventThatBubbles("change"))), e.dispatchEvent(eventThatBubbles("mouseup")), e.dispatchEvent(eventThatBubbles("click")), e.dispatchEvent(new Event("blur")), FormMetadataJSController.setInputElementAutofilled(e, r)
    },
    autoFillOneTimeCodeFieldsWithValue: function(e, n) {
        var r = document.activeElement;
        this._clearFormField(r);
        var t = e.split(""),
            i = t.length,
            a = function(e) {
                if (e >= i) FormMetadataJSController.finishedAutoFillingOneTimeCode(n);
                else {
                    var r = document.activeElement,
                        o = r.value + t[e];
                    this._autoFillControlWithValueAndOptions(r, o, ShouldFocusAndBlur.No, !0, !1), setTimeout(a, 0, e + 1)
                }
            }.bind(this);
        a(0)
    },
    _removeGeneratedPasswordForElement: function(e) {
        let n = this._elementsWithGeneratedPasswords.indexOf(e); - 1 !== n && (this._elementsWithGeneratedPasswords.splice(n, 1), this._generatedPasswords.splice(n, 1))
    },
    _shouldSelectElementAfterFillingForm: function(e) {
        if (!/(^|\.)etrade\.com/.test(document.location.hostname)) return !0;
        var n = this._cachedMetadataForLogicalForm(e);
        return !n || 3 !== n.AutoFillFormType
    },
    autoFillControlsByID: function(e, n, r, t, i, a) {
        const o = arguments[arguments.length - 1];
        var l = t || document.activeElement,
            s = null;
        for (controlUniqueID in e) {
            s = this.formControlWithUniqueID(controlUniqueID)._logicalForm;
            break
        }
        var p = function() {
            i ? document.activeElement.blur() : this._shouldSelectElementAfterFillingForm(s) && this.selectIfTextField(l), FormMetadataJSController.finishedAutoFillingControlsInForm(this._getOrCreateCachedMetadataForLogicalForm(s), o)
        }.bind(this);
        if (n) {
            var c = [];
            for (var u in e) e.hasOwnProperty(u) && c.push([this.formControlWithUniqueID(u), e[u]]);
            this._synchronouslyAutoFillControls(c, r, p)
        } else this._asynchronouslyAutoFillControls(e, s, r, a, p)
    },
    _synchronouslyAutoFillControls: function(e, n, r) {
        for (var t = e.length, i = 0; i < t; ++i) {
            var a = e[i][0],
                o = e[i][1];
            this._autoFillControlWithValue(a, o, n)
        }
        r()
    },
    _asynchronouslyAutoFillControls: function(e, n, r, t, i) {
        var a = n.elements,
            o = a.length,
            l = function(n) {
                if (n >= o) return void i();
                var s = a[n],
                    p = e[s._controlUniqueID];
                let c = t.some((e => s._controlUniqueID.includes(e)));
                void 0 !== p && this._autoFillControlWithValue(s, p, r, c), setTimeout(l, 0, n + 1)
            }.bind(this);
        l(0)
    },
    _isInputAllowedInSearchForm: function(e, n) {
        var r = this._getTagName(e).toLowerCase();
        if ("button" === r || "fieldset" === r) return !0;
        if ("select" === r) return !n || isSelectInDefaultState(e);
        if ("input" !== r) return !1;
        var t = e.type;
        return "radio" === t || "checkbox" === t ? !n || isCheckboxOrRadioButtonInDefaultState(e) : "hidden" === t || "reset" === t || "submit" === t || "button" === t || this._isTextField(e) && !this._isSecureTextField(e)
    },
    _isSearchForm: function(e, n) {
        if ("get" !== e.method) return !1;
        for (var r = e.elements, t = r.length, i = 0; i < t; ++i)
            if (!this._isInputAllowedInSearchForm(r[i], n)) return !1;
        return !0
    },
    _shouldInputBeIncludedInSearchURLQuery: function(e) {
        if (e.disabled) return !1;
        if (!e.name.length) return !1;
        if (!e.value.length) return !1;
        if (this._isSelectElement(e)) return !0;
        var n = this._getTagName(e).toLowerCase(),
            r = e.type;
        return "button" === n ? "submit" === r : "input" === n && ("submit" === r || ("checkbox" === r || "radio" === r ? e.checked : "hidden" === r || this._isTextField(e)))
    },
    _isSubmitButton: function(e) {
        return (e instanceof HTMLButtonElement || e instanceof HTMLInputElement) && (e.type && "submit" === e.type)
    },
    _isCustomFormButton: function(e) {
        return "button" === e.type && (e instanceof HTMLButtonElement || e instanceof HTMLInputElement)
    },
    _isCheckboxInputElement: function(e) {
        return "checkbox" === e.type && e instanceof HTMLInputElement
    },
    _setQueryString: function(e, n) {
        var r = document.createElement("a");
        return r.href = e, r.search = n, r.href
    },
    searchTextFieldFormSubmissionURLString: function(e, n) {
        if (visibilityCacheGeneration++, !this._isTextField(e) || this._isSecureTextField(e) || !e.isVisible()) return null;
        var r = e.form;
        if (!r) return null;
        var t = r.getAttribute("action");
        if (!t || !t.length) return null;
        if (!/^https?:/i.test(r.action)) return null;
        if (!this._isSearchForm(r, n)) return null;
        for (var i = null, a = "", o = r.elements, l = o.length, s = 0; s < l; ++s) {
            var p = o[s];
            if ((p === e || this._shouldInputBeIncludedInSearchURLQuery(p)) && (!this._isSubmitButton(p) || (i || (i = p), p === i))) {
                a.length && (a += "&");
                var c = p === e ? "{searchTerms}" : urlEncode(p.value);
                a += urlEncode(p.name) + "=" + c
            }
        }
        return this._setQueryString(r.action, a)
    }
};
var FormMetadataJS = new FormMetadata;
const ContextState = {
        IncompatibleOS: "IncompatibleOS",
        NotInSession: "NotInSession",
        NativeSupportNotInstalled: "NativeSupportNotInstalled",
        CheckEngine: "CheckEngine",
        ChallengeSent: "ChallengeSent",
        MSG1Set: "MSG1Set",
        SessionKeySet: "SessionKeySet"
    },
    DataState = {
        Initial: "Initial",
        Frame0Processed: "Frame0Processed",
        DataProcessed: "DataProcessed"
    },
    RememberIC = {
        NoValueSet: "NoValueSet",
        UnknownPage: "UnknownPage",
        DoNotRemember: "DoNotRemember",
        RememberLoginAndPassword: "RememberLoginAndPassword"
    };
var pwlog = void 0,
    pwerror = void 0;

function isStringEmpty(e) {
    return !e || 0 === e.length
}

function humanReadableFormType(e) {
    switch (e) {
        case 0:
            return "Undetermined";
        case 1:
            return "AutoFillable:Standard";
        case 2:
            return "NonAutoFillable";
        case 3:
            return "AutoFillable:Login";
        case 4:
            return "NewAccount";
        case 5:
            return "ChangePassword"
    }
    return "Unrecognized"
}

function domainsForDisplayFromUsernamesAndDomains(e, n) {
    const r = e.length;
    let t = n.map((function(e) {
            return e.replace(/^(www|m)\./, "")
        })),
        i = [];
    for (var a = 0; a < r; a++) i.push([e[a], t[a]]);
    for (a = 0; a < r; a++) {
        let e = [];
        for (var o = a + 1; o < r; o++) i[a].join("\n") === i[o].join("\n") && (e.length || e.push(a), e.push(o));
        for (identicalIndex of e) t[identicalIndex] = n[identicalIndex]
    }
    return t
}
var g_selectedUserName = "",
    g_selectedPassword = "",
    g_selectedURL = "",
    g_currentUserName = "",
    g_currentPassword = "",
    g_focusedControl = null,
    g_lastSenderOfInformationToFill = null;
const ForCompletionList = "ForCompletionList",
    ForPageWideFill = "ForPageWideFill";
var g_usernameControls = {},
    g_passwordControls = {},
    g_oldPasswordControls = {},
    g_confirmPasswordControls = {},
    g_usernameElementUniqueIDs = {},
    g_passwordElementUniqueIDs = {},
    g_formTypeOfFormBestForPageWideAutoFill = 0,
    g_isPresetUserNamePresent = !1,
    g_theURL = null,
    g_completionListContainer = null,
    g_completionListIFrame = null,
    g_completionListAnchoringField = null,
    g_completionListAnchoringFieldPriorToBlur = null,
    g_completionListAnchoringFieldBeforeOneTimeCodeRefresh = null,
    g_oneTimeCodeToFillAfterUpdate = null;
const AmountOfTimeToDisallowCompletionListInFieldAfterFilling = 100;
var g_lastFilledField = null,
    g_dateOfLastAutoFill = null,
    g_dateOfCompletionListAnchoringFieldFocusOrMovementOfThatField = null,
    g_completionListAnchoringFieldMovementSetIntervalID = null;
const AmountOfTimeToPollPageForFieldMovementAfterFocus = 5e3,
    IntervalToPollPageForFieldMovementAfterFocus = 100,
    ExtraClearanceForCompletionListToAccountForShadow = 24,
    DoNotDismissCompletionListUponLosingFocus = !1;

function fillControlsByID(e, n) {
    let r = n ? FormMetadataJS.formControlWithUniqueID(n) : null;
    g_dateOfLastAutoFill = (g_lastFilledField = r) ? Date.now() : null, FormMetadataJS.autoFillControlsByID(e, !1, !1, r, !1, [])
}

function confirmPasswordFieldChangeHandler(e) {
    e.target;
    g_passwordControls.ForPageWideFill && g_passwordControls.ForPageWideFill.value === g_confirmPasswordControls.ForPageWideFill.value && (newPassword = g_confirmPasswordControls.ForPageWideFill.value)
}

function userNameFieldChangeHandler(e) {
    let n = e.target;
    g_currentUserName = n.value, g_passwordControls.ForPageWideFill || chrome.runtime.sendMessage({
        from: "content",
        subject: "SaveStage1LoginName",
        theLogin: g_currentUserName
    })
}

function passwordFieldChangeHandler(e) {
    let n = e.target;
    g_currentPassword = n.value
}

function fillLoginIntoForm(e, n, r, t, i, a) {
    if (e !== RememberIC.RememberLoginAndPassword) return;
    const o = "completionList" === a,
        l = o ? g_usernameElementUniqueIDs.ForCompletionList : g_usernameElementUniqueIDs.ForPageWideFill;
    if (l) try {
        fillControlsByID({
            [l]: t
        }, l)
    } catch (e) {
        e.message
    }
    g_lastSenderOfInformationToFill = "completionList" === a ? ForCompletionList : ForPageWideFill;
    const s = o ? g_passwordControls.ForCompletionList : g_passwordControls.ForPageWideFill,
        p = o ? g_oldPasswordControls.ForCompletionList : g_oldPasswordControls.ForPageWideFill;
    (s || p) && chrome.runtime.sendMessage({
        from: "content",
        subject: "CmdGetPassword4LoginName",
        tabId: n,
        frameId: r,
        theLogin: t,
        theURL: i
    })
}

function detectPresetUserName(e, n, r) {
    e.FormControls.forEach((function(n, r, t) {
        n.ControlUniqueID !== e.UsernameElementUniqueID || isStringEmpty(n.ControlValue) || (g_currentUserName = n.ControlValue, g_isPresetUserNamePresent = !0, n.ControlUniqueID)
    }))
}

function mydump(e, n) {
    var r = "";
    n || (n = 0);
    for (var t = "", i = 0; i < n + 1; i++) t += "    ";
    if ("object" == typeof e)
        for (var a in e) {
            var o = e[a];
            "object" == typeof o ? (r += t + "'" + a + "' ,", r += mydump(o, n + 1)) : r += t + "'" + a + "'\"" + o + '",'
        } else r = e + "(" + typeof e + ")";
    return r
}

function assignFieldsForMetadataAndPurpose(e, n, r, t) {
    const i = e.AutoFillFormType;
    switch (n === ForPageWideFill && (humanReadableFormType(g_formTypeOfFormBestForPageWideAutoFill = i), humanReadableFormType(g_formTypeOfFormBestForPageWideAutoFill)), i) {
        case 0:
        case 1:
        case 2:
            for (const r of e.FormControls)
                if (r.ControlIsSecureTextField && r.ControlIsActiveElement) {
                    g_passwordControls[n] = FormMetadataJS.formControlWithUniqueID(r.ControlUniqueID), g_passwordElementUniqueIDs[n] = r.ControlUniqueID, n === ForPageWideFill && (g_formTypeOfFormBestForPageWideAutoFill = 3);
                    break
                }
            break;
        case 3:
        case 4:
        case 5:
            e.UsernameElementUniqueID ? (g_usernameControls[n] = FormMetadataJS.formControlWithUniqueID(e.UsernameElementUniqueID), g_usernameElementUniqueIDs[n] = e.UsernameElementUniqueID, e.UsernameElementUniqueID, detectPresetUserName(e, r, t)) : (g_usernameControls[n] = null, g_usernameElementUniqueIDs[n] = 0), e.PasswordElementUniqueID ? (g_passwordControls[n] = FormMetadataJS.formControlWithUniqueID(e.PasswordElementUniqueID), g_passwordElementUniqueIDs[n] = e.PasswordElementUniqueID, e.PasswordElementUniqueID) : (g_passwordControls[n] = null, g_passwordElementUniqueIDs[n] = 0), e.ConfirmPasswordElementUniqueID ? (g_confirmPasswordControls[n] = FormMetadataJS.formControlWithUniqueID(e.ConfirmPasswordElementUniqueID), e.ConfirmPasswordElementUniqueID) : g_confirmPasswordControls[n] = null, e.OldPasswordElementUniqueID ? (g_oldPasswordControls[n] = FormMetadataJS.formControlWithUniqueID(e.OldPasswordElementUniqueID), e.OldPasswordElementUniqueID) : g_oldPasswordControls[n] = null
    }
}

function runFormMetadataHeuristics(e, n) {
    var r = g_formTypeOfFormBestForPageWideAutoFill;
    g_formTypeOfFormBestForPageWideAutoFill = 0;
    let t = FormMetadataJS.formsAndMetadata(1);
    if (t) {
        t[0];
        t[1].forEach(((r, t, i) => {
            r && r.FormIsBestForPageLevelAutoFill && assignFieldsForMetadataAndPurpose(r, ForPageWideFill, e, n)
        }))
    } else humanReadableFormType(g_formTypeOfFormBestForPageWideAutoFill = 0);
    return r !== g_formTypeOfFormBestForPageWideAutoFill ? (humanReadableFormType(r), humanReadableFormType(g_formTypeOfFormBestForPageWideAutoFill), humanReadableFormType(r), pageNavigationHandler(r)) : (humanReadableFormType(r), humanReadableFormType(g_formTypeOfFormBestForPageWideAutoFill)), chrome.runtime.sendMessage({
        from: "content",
        subject: "CmdSetIconNTitle",
        hostPageType: g_formTypeOfFormBestForPageWideAutoFill
    }), t
}

function pageNavigationHandler(e) {
    switch (humanReadableFormType(e), e) {
        case 0:
        case 1:
        case 2:
            break;
        case 3:
            if (!g_passwordControls.ForPageWideFill) break;
            if (g_currentUserName !== g_selectedUserName || g_currentPassword !== g_selectedPassword) try {
                chrome.runtime.sendMessage({
                    from: "content",
                    subject: "CmdSetPassword4LoginName_URL",
                    theLogin: "",
                    thePassword: "",
                    theURL: "",
                    theNLogin: g_currentUserName,
                    theNPassword: g_currentPassword,
                    theNURL: g_theURL
                })
            } catch (e) {
                e.message
            }
            break;
        case 4:
        case 5:
            if (g_passwordControls.ForPageWideFill && (!g_confirmPasswordControls.ForPageWideFill || g_passwordControls.ForPageWideFill.value === g_confirmPasswordControls.ForPageWideFill.value) && (g_currentUserName !== g_selectedUserName || g_currentPassword !== g_selectedPassword)) try {
                chrome.runtime.sendMessage({
                    from: "content",
                    subject: "CmdNewAccount4URL",
                    theLogin: "",
                    thePassword: "",
                    theURL: "",
                    theNLogin: g_currentUserName,
                    theNPassword: g_currentPassword,
                    theNURL: g_theURL
                })
            } catch (e) {
                e.message
            }
    }
}

function completionListBackgroundColor() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "rgba(35, 35, 35, 0.8)" : "rgba(230, 230, 230, 0.8)"
}

function completionListBackgroundColorWithoutBackdropBlur() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "rgb(35, 35, 35)" : "rgb(230, 230, 230)"
}

function completionListContainerBorderColor() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0.2)"
}

function isCompletionListVisible() {
    return !!g_completionListContainer && "visible" === g_completionListContainer.style.visibility
}

function fillElementWithOneTimeCode(e, n) {
    hideCompletionListIfNecessary(), e.focus(), FormMetadataJS.autoFillOneTimeCodeFieldsWithValue(n.code, !1)
}

function hideCompletionListIfNecessary() {
    g_completionListContainer && (g_completionListContainer.style.setProperty("visibility", "hidden", "important"), g_completionListContainer.style.setProperty("opacity", "0", "important"), g_completionListContainer.style.setProperty("left", "-999999px", "important")), g_completionListAnchoringField = null, stopMonitoringForFocusedFieldMovement()
}

function destroyCompletionListIfNecessary() {
    if (hideCompletionListIfNecessary(), g_completionListContainer) {
        let e = g_completionListContainer,
            n = g_completionListIFrame;
        setTimeout((function() {
            e.remove(), e = null, n.remove(), n = null
        }), 100), g_completionListContainer = null
    }
    g_completionListIFrame && (g_completionListIFrame = null), g_completionListAnchoringField = null, g_completionListAnchoringFieldPriorToBlur = null, stopMonitoringForFocusedFieldMovement()
}

function stopMonitoringForFocusedFieldMovement() {
    clearInterval(g_completionListAnchoringFieldMovementSetIntervalID), g_completionListAnchoringFieldMovementSetIntervalID = null
}

function showCompletionList(e, n, r) {
    destroyCompletionListIfNecessary(), g_passwordControls.ForCompletionList = null, g_passwordElementUniqueIDs.ForCompletionList = 0, g_usernameControls.ForCompletionList = null, g_usernameElementUniqueIDs.ForCompletionList = 0;
    let t = e.getBoundingClientRect(),
        i = parseInt(getComputedStyle(e).borderBottomWidth);
    g_completionListIFrame = document.createElement("iframe");
    e.value;
    let a = "";
    if ("password" === e.type || !n.ControlLooksLikeOneTimeCodeField) {
        assignFieldsForMetadataAndPurpose(r, ForCompletionList, null, null);
        const e = g_usernameControls.ForCompletionList;
        e && (a = e.value)
    }
    g_completionListIFrame.setAttribute("src", chrome.runtime.getURL(`completion_list.html?username=${a}`)), g_completionListIFrame.style.setProperty("width", "9001px", "important"), g_completionListIFrame.style.setProperty("height", "100%", "important"), g_completionListIFrame.style.setProperty("display", "block", "important"), g_completionListIFrame.frameBorder = 0, (g_completionListContainer = document.createElement("div")).id = "apple-password-autofill-list", g_completionListContainer.style.setProperty("z-index", "2147483647", "important"), g_completionListContainer.style.setProperty("padding", "0px", "important"), g_completionListContainer.style.setProperty("margin", "0px", "important"), g_completionListContainer.style.setProperty("border-radius", "8px", "important"), g_completionListContainer.style.setProperty("position", "fixed", "important"), g_completionListContainer.style.setProperty("color-scheme", "normal", "important"), g_completionListContainer.style.setProperty("box-shadow", "0 2px 4px 0 rgba(0, 0, 0, 0.15), 0 8px 15px 6px rgba(0, 0, 0, 0.18)", "important"), g_completionListContainer.style.setProperty("border", `1px solid ${completionListContainerBorderColor()}`, "important"), g_completionListContainer.style.setProperty("overflow", "hidden", "important"), CSS.supports("backdrop-filter", "none") ? (g_completionListContainer.style.setProperty("backdrop-filter", "blur(20px)", "important"), g_completionListContainer.style.setProperty("background-color", completionListBackgroundColor(), "important")) : g_completionListContainer.style.setProperty("background-color", completionListBackgroundColorWithoutBackdropBlur(), "important");
    let o = Math.round(t.y + t.height) + i + "px",
        l = Math.round(t.x) + "px";
    g_completionListContainer.style.setProperty("top", o, "important"), g_completionListContainer.style.setProperty("left", l, "important"), g_completionListContainer.attachShadow({
        mode: "open"
    }).appendChild(g_completionListIFrame), g_completionListContainer.style.setProperty("opacity", "0", "important"), g_completionListContainer.style.setProperty("visibility", "hidden", "important"), document.body.appendChild(g_completionListContainer), g_completionListAnchoringField = e, g_dateOfCompletionListAnchoringFieldFocusOrMovementOfThatField = new Date, g_completionListAnchoringFieldMovementSetIntervalID = setInterval((function() {
        Date.now() - g_dateOfCompletionListAnchoringFieldFocusOrMovementOfThatField >= 5e3 && stopMonitoringForFocusedFieldMovement();
        let n = e.getBoundingClientRect(),
            r = Math.round(n.y + n.height) + i + "px",
            t = Math.round(n.x) + "px";
        r === o && t === l || (g_dateOfCompletionListAnchoringFieldFocusOrMovementOfThatField = new Date, g_completionListContainer.style.setProperty("top", r, "important"), g_completionListContainer.style.setProperty("left", t, "important"), o = r, l = t)
    }), 100)
}

function shouldOfferCompletionListForField(e, n, r) {
    return !(g_lastFilledField === e && Date.now() - g_dateOfLastAutoFill < 100) && (("password" !== e.type || !e.value.length) && (!!n.ControlLooksLikePasswordCredentialField || (!!n.ControlClaimsToBeUsernameViaAutocompleteAttribute || (n.ControlLooksLikeOneTimeCodeField ? !e.value.length : !(!r.UsernameElementUniqueID || r.UsernameElementUniqueID !== n.ControlUniqueID) || (!(!r.PasswordElementUniqueID || r.PasswordElementUniqueID !== n.ControlUniqueID) || (e === g_usernameControls.ForCompletionList || e === g_passwordControls.ForCompletionList))))))
}

function focusInHandler(e) {
    JSON.stringify(e), chrome.runtime.sendMessage({
        from: "content",
        subject: "CmdDidFocusIntoPage"
    }), elementWasFocused(e.target)
}

function elementWasFocused(e) {
    if (!e || !FormMetadataJS._isAutoFillableTextField(e)) return void(g_focusedControl = null);
    g_focusedControl = e, destroyCompletionListIfNecessary();
    let [n, r] = FormMetadataJS.textFieldOrSelectElementMetadata(e, 0);
    shouldOfferCompletionListForField(e, n, r) && showCompletionList(e, n, r)
}

function clearOneTimeCodeState() {
    g_completionListAnchoringFieldBeforeOneTimeCodeRefresh = null, g_oneTimeCodeToFillAfterUpdate = null
}

function documentLoadHandler() {
    window, window.top, window.location.href;
    try {
        chrome.runtime.sendMessage({
            from: "content",
            subject: "CmdClearCache"
        })
    } catch (e) {
        e.message
    }
    const e = document.activeElement,
        n = runFormMetadataHeuristics();
    if (e && FormMetadataJS._isAutoFillableTextField(e)) {
        if (e === g_completionListAnchoringField) return;
        elementWasFocused(e)
    } else if (n)
        for (const e of n[1]) e && e.FormIsBestForStreamlinedLogin && FormMetadataJS.focusFormForStreamlinedLogin(e.FormID)
}
chrome.runtime.onMessage.addListener(((e, n, r) => {
    switch (e.from, e.tabId, e.frameId, e.subject) {
        case "password":
            switch (humanReadableFormType(g_formTypeOfFormBestForPageWideAutoFill), g_formTypeOfFormBestForPageWideAutoFill) {
                case 0:
                case 1:
                case 2:
                case 4:
                    if (!g_passwordControls.ForPageWideFill) break;
                case 3:
                    g_selectedUserName = e.theLoginName, g_selectedPassword = e.thePassword, g_selectedURL = e.theURL, e.tabId, e.frameId;
                    try {
                        const n = g_passwordElementUniqueIDs[g_lastSenderOfInformationToFill];
                        e.tabId, e.frameId, fillControlsByID({
                            [n]: e.thePassword
                        }, n)
                    } catch (n) {
                        e.tabId, e.frameId, n.message
                    }
                    break;
                case 5:
                    g_selectedUserName = e.theLoginName, g_selectedPassword = e.thePassword, g_selectedURL = e.theURL, e.tabId, e.frameId;
                    try {
                        const n = g_oldPasswordControls[g_lastSenderOfInformationToFill];
                        e.tabId, e.frameId, FormMetadataJS._autoFillControlWithValueAndOptions(n, e.thePassword, ShouldFocusAndBlur.Yes, !1)
                    } catch (n) {
                        e.tabId, e.frameId, n.message
                    }
            }
            break;
        case "runFormMetadataHeuristics":
            e.tabId, e.frameId, e.tabId, e.frameId, runFormMetadataHeuristics(e.tabId, e.frameId);
            break;
        case "historyStateDidUpdateInTab":
            e.tabId, e.frameId, e.tabId, e.frameId, e.tabId, e.frameId, runFormMetadataHeuristics(e.tabId, e.frameId), e.tabId, e.frameId, e.tabId, e.frameId, humanReadableFormType(g_formTypeOfFormBestForPageWideAutoFill), pageNavigationHandler(g_formTypeOfFormBestForPageWideAutoFill);
            break;
        case "RememberICSelection":
            switch (e.tabId, e.frameId, e.tabId, e.frameId, e.theRememberICSelection, e.theRememberICSelection) {
                case RememberIC.NoValueSet:
                case RememberIC.DoNotRemember:
                    break;
                case RememberIC.UnknownPage:
                case RememberIC.RememberLoginAndPassword:
                    g_usernameControls.ForPageWideFill && (g_usernameControls.ForPageWideFill.addEventListener("change", userNameFieldChangeHandler), e.tabId, e.frameId), g_passwordControls.ForPageWideFill && (g_passwordControls.ForPageWideFill.addEventListener("change", passwordFieldChangeHandler), e.tabId, e.frameId), g_confirmPasswordControls.ForPageWideFill && (g_confirmPasswordControls.ForPageWideFill.addEventListener("change", confirmPasswordFieldChangeHandler), e.tabId, e.frameId)
            }
            break;
        case "fillLoginIntoForm":
            g_selectedUserName = e.theLogin, g_selectedURL = e.theURL, e.tabId, e.frameId, e.tabId, e.frameId, fillLoginIntoForm(e.theRememberICSelection, e.tabId, e.frameId, e.theLogin, e.theURL, e.from), hideCompletionListIfNecessary();
            break;
        case "resizeCompletionList":
            {
                if (e.width, e.height, 0 === e.width || 0 === e.height) return void hideCompletionListIfNecessary();
                const n = g_completionListAnchoringField.getBoundingClientRect().bottom,
                    r = Math.floor(window.innerHeight - n - 24),
                    t = Math.min(e.height, r) + "px",
                    i = e.width + "px",
                    a = CSS.supports("backdrop-filter", "none") ? e.width + 1 + "px" : i;
                e.width, e.height, g_completionListContainer.style.setProperty("height", t, "important"), g_completionListIFrame.style.setProperty("height", t, "important"), g_completionListContainer.style.setProperty("width", a, "important"), g_completionListIFrame.style.setProperty("width", i, "important"), g_completionListContainer.style.setProperty("opacity", "1", "important"), g_completionListContainer.style.setProperty("visibility", "visible", "important");
                break
            }
        case "dismissCompletionList":
            hideCompletionListIfNecessary();
            break;
        case "getTextFieldAndFormMetadataOfActiveTextFieldAndPresetUserNameAndHostname":
            {
                if (!g_focusedControl) return void e.subject;
                let [n, t] = FormMetadataJS.textFieldOrSelectElementMetadata(g_focusedControl, 0);
                r({
                    textFieldMetadata: n,
                    formMetadata: t,
                    presetUserName: g_currentUserName,
                    hostname: document.location.hostname
                });
                break
            }
        case "fillOneTimeCodeIntoForm":
            let n = e.oneTimeCode;
            switch (n.source) {
                case "totp":
                    g_completionListAnchoringFieldBeforeOneTimeCodeRefresh = g_completionListAnchoringField || g_completionListAnchoringFieldPriorToBlur, g_oneTimeCodeToFillAfterUpdate = n
            }
            chrome.runtime.sendMessage({
                from: "content",
                subject: "fillOneTimeCodeIntoForm",
                tab: e.tab,
                frame: e.frame,
                oneTimeCode: n
            });
            break;
        case "fillCurrentTOTPCodeIntoForm":
            const t = e.oneTimeCodes;
            if (!t || !g_oneTimeCodeToFillAfterUpdate) {
                clearOneTimeCodeState();
                break
            }
            const i = t.find((e => "totp" === e.source && e.username === g_oneTimeCodeToFillAfterUpdate.username && e.domain === g_oneTimeCodeToFillAfterUpdate.domain));
            if (!i) {
                clearOneTimeCodeState();
                break
            }
            const a = g_completionListAnchoringField || g_completionListAnchoringFieldBeforeOneTimeCodeRefresh;
            if (!a) {
                clearOneTimeCodeState();
                break
            }
            fillElementWithOneTimeCode(a, i), clearOneTimeCodeState();
            break;
        case "getTextFieldAndFormMetadataOfActiveTextField":
            let [o, l] = FormMetadataJS.textFieldOrSelectElementMetadata(g_focusedControl, 0);
            r({
                textFieldMetadata: o,
                formMetadata: l
            });
            break;
        case "getPageType":
            e.tabId, e.frameId, e.tabId, e.frameId, e.tabId, e.frameId, runFormMetadataHeuristics(e.tabId, e.frameId), r(g_formTypeOfFormBestForPageWideAutoFill);
            break;
        case "getPresetUserName":
            r({
                isPresetUserNamePresent: g_isPresetUserNamePresent,
                presetUserName: g_currentUserName
            })
    }
    return !0
})), window.addEventListener("pushstate", (function(e) {
    humanReadableFormType(g_formTypeOfFormBestForPageWideAutoFill), pageNavigationHandler(g_formTypeOfFormBestForPageWideAutoFill)
})), window.addEventListener("popstate", (function(e) {
    humanReadableFormType(g_formTypeOfFormBestForPageWideAutoFill), pageNavigationHandler(g_formTypeOfFormBestForPageWideAutoFill)
})), document.addEventListener("focusin", focusInHandler), document.addEventListener("focusout", (function(e) {
    JSON.stringify(e);
    let n = e.target;
    g_focusedControl = null, setTimeout((function() {
        n === g_completionListAnchoringField && hideCompletionListIfNecessary()
    }), 100)
})), window.addEventListener("blur", (function(e) {
    g_completionListAnchoringField && (g_completionListAnchoringFieldPriorToBlur = g_completionListAnchoringField), setTimeout((() => {
        hideCompletionListIfNecessary()
    }), 100)
})), document.addEventListener("keydown", (function(e) {
    let n = e.target;
    if (!isCompletionListVisible()) {
        let [r, t] = FormMetadataJS.textFieldOrSelectElementMetadata(n, 0);
        return void("ArrowDown" === e.key && shouldOfferCompletionListForField(n, r, t) && showCompletionList(e.target, r, t))
    }
    let r = {};
    switch (e.key) {
        case "Escape":
            return hideCompletionListIfNecessary(), e.preventDefault(), !1;
        case "ArrowDown":
        case "ArrowUp":
        case "Enter":
            r.key = e.key, e.preventDefault()
    }
    r.key && chrome.runtime.sendMessage({
        from: "content",
        subject: "keydown",
        event: r
    })
})), document.addEventListener("input", (function(e) {
    let n = e.target;
    if (!FormMetadataJS._isAutoFillableTextField(n)) return;
    let [r, t] = FormMetadataJS.textFieldOrSelectElementMetadata(n, 3), i = n.value;
    r.ControlLooksLikePasswordCredentialField || r.ControlLooksLikeOneTimeCodeField ? i.length && hideCompletionListIfNecessary() : isCompletionListVisible() || !shouldOfferCompletionListForField(n, r, t) ? n === g_completionListAnchoringField && isCompletionListVisible() && chrome.runtime.sendMessage({
        from: "content",
        subject: "typedUserNameChanged",
        username: i
    }) : showCompletionList(n, r, t)
})), window.addEventListener("scroll", (function(e) {
    e.target.contains(g_completionListAnchoringField) && hideCompletionListIfNecessary()
}), {
    passive: !0,
    capture: !0
}), window.addEventListener("resize", (function(e) {
    hideCompletionListIfNecessary()
})), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (function(e) {
    e.matches, chrome.runtime.sendMessage({
        from: "content",
        subject: "ThemeChanged"
    }), g_completionListContainer && (g_completionListContainer.style.setProperty("border", `1px solid ${completionListContainerBorderColor()}`, "important"), g_completionListContainer.style.setProperty("background-color", CSS.supports("backdrop-filter", "none") ? completionListBackgroundColor() : completionListBackgroundColorWithoutBackdropBlur(), "important"))
})), window.addEventListener("load", documentLoadHandler), "complete" === document.readyState && documentLoadHandler(), window.addEventListener("unload", (function() {
    humanReadableFormType(g_formTypeOfFormBestForPageWideAutoFill), pageNavigationHandler(g_formTypeOfFormBestForPageWideAutoFill), destroyCompletionListIfNecessary()
}));
const url = new URL(document.URL);
g_theURL = url.hostname;