function lookUpSpecifier(e, r) {
  return r ? (mapEntry = e[r], mapEntry ? mapEntry.valueSpecifier : null) : null
}

function specifierForAutocompleteToken(e) {
  return e ? lookUpSpecifier(autocompleteTokenMap, e) : null
}

function specifierForFieldLabel(e) {
  return e ? lookUpSpecifier(fieldLabelMap, e) : null
}

function findValueSpecifierForKey(e) {
  let r = specifierForAutocompleteToken(e);
  return r || specifierForFieldLabel(e)
}
var PatternMatcherClass = function (e) {
  this._words = e
};
PatternMatcherClass.prototype = {
  _resultFromMatch: function (e) {
    if (!e) return null;
    if (specifier = findValueSpecifierForKey(e), !specifier) return [e, "", "", ""];
    return [e, specifier.property || "", specifier.category || "", specifier.parentCategory || ""]
  },
  longestMatch: function (e) {
    let r = null,
      t = 0;
    for (let n of this._words) {
      let a = n.length;
      a < t || (regex = RegExp("\\b" + n + "\\b", "i"), regex.test(e) && (r = n, t = a))
    }
    return r ? this._resultFromMatch(r) : null
  },
  searchReverse: function (e) {
    let r = null;
    for (let t = this._words.length - 1; t >= 0; --t) {
      let n = this._words[t];
      if (regex = RegExp("\\b" + n + "\\b", "i"), regex.test(e)) {
        r = n;
        break
      }
    }
    return r ? this._resultFromMatch(r) : null
  }
};
var ValueSpecifier = function (e, r, t, n, a) {
  this.property = e, this.component = r, this.label = t, this.category = n, this.parentProperty = a
},
  MapEntry = function (e, r, t) {
    this.keyLength = e, this.key = r, this.valueSpecifier = t
  },
  Map = function (e) {
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
  FormMetadataJSControllerObject = function () {
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
    }, this.keywordsIndicatingNonAutoFillableFormType = ["import"], this.regularExpressionsForForgotPasswordAffordance = ["^forgot.*password"], this.regularExpressionsForForgotUserNameAffordance = ["^forgot.*user.*name"], this.regularExpressionsForForgotEmailAffordance = ["^forgot.*email", "email?$"], this.shouldShowAdditionalUI = !0, this.nonUsernameFieldLabelPatternMatchers = function nonUsernameFieldLabelPatternMatchers() {
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
      return [new PatternMatcherClass(["debit", "answer", "account number", "routing number"])]
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
      return [new PatternMatcherClass(["security code", "login code", "enter the code", "enter code", "otp", "onetimecode", "onetimepasscode", "one time password", "one time passcode", "verification code", "verificationCode", "confirmation code", "identification code", "identificationCode", "activation code", "access code", "SMS", "digit code", "2fa", "twofactor token", "two factor auth", "two factor authentication", "two-factor authentication", "6-digit authentication code", "two step sign in", "two-step sign in", "MFA code", "验证码", "校验码", "驗證碼", "驗証碼", "確認碼", "認證碼", "確認コード", "認証コード", "인증번호", "확인코드", "code de sécurité", "code de vérification", "code de validation", "code d'identification", "code d'authentification", "code d'autorisation", "code de confirmation", "code SMS de vérification", "Authorisierungscode", "Sicherheitscode", "Überprüfungscode", "Bestätigungscode", "Bestatigungscode", "Verifizierungscode", "Aktivierungscode", "Codice di sicurezza", "Codice attivazione", "codice di attivazione", "codice di conferma", "codice di verifica", "Kod bezpieczeństwa", "Kod autoryzacyjny", "Kod weryfikacyjny", "código de seguridad", "código de confirmación", "código de seguranca", "digite o codigo", "código de verificación", "código de verificação", "código de confirmacao", "Код проверки", "код безопасности", "код подтверждения", "Код аутентификации", "код підтвердження", "dogrulama kodu", "mã bảo mật", "Mã Xác Minh", "mã kích hoạt", "รหัสความปลอดภัย", "รหัสยืนยัน", "รหัสOTP", "รหัสการตรวจสอบยืนยัน", "รหัสการยืนยัน", "Kode keamanan", "Kode konfirmasi", "Kode verifikasi", "सत्यापन कोड", "Kod pengesahan", "Masukkan Kod", "Codul de confirmare"])]
    }(), this.weakOneTimeCodeFieldLabelPatternMatchers = function weakOneTimeCodeFieldLabelPatternMatchers() {
      return [new PatternMatcherClass(["code", "passcode", "PIN", "código", "코드", "コード", "код"])]
    }(), this.ignoredDataTypeFieldLabelPatternMatchers = function ignoredDataTypeFieldLabelPatternMatchers() {
      return [new PatternMatcherClass(["search", "social security", "socialsecurity", "ssn", "ssno", "ssnum", "airport", "gate code", "relationship"])]
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
  setInputElementSpellCheckEnabled: function (e, r) { },
  setInputElementAutofilled: function (e, r) { },
  finishedAutoFillingControlsInForm: function (e, r) { },
  finishedAutoFillingOneTimeCode: function (e) { },
  categorySpecifierForFormControl: function (e) {
    if (!e) return null;
    let r = e.AutocompleteTokens;
    if (r && Array.isArray(r))
      for (let e of r) {
        let r = specifierForAutocompleteToken(e);
        if (r) return r.category
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
var mapOfFormTypeToProducerOfAssociatedKeywords = function () {
  var e = {
    4: function () {
      return FormMetadataJSController.mapOfKeywordsIndicatingNewAccountFormTypeToScoreForMatching
    },
    3: function () {
      return FormMetadataJSController.mapOfKeywordsIndicatingLoginFormTypeToScoreForMatching
    },
    5: function () {
      return FormMetadataJSController.mapOfKeywordsIndicatingChangePasswordFormTypeToScoreForMatching
    }
  };
  return e
}(),
  visibilityCacheGeneration = 0;

function legacyPlaceholderInfoForInputElement(e) {
  if ("text" !== e.type) return null;
  var r = e.value.trim();
  if (!r) return null;
  for (var t = !1, n = !0, a = e.attributes, i = a.length, o = 0; o < i; ++o) {
    var l = a[o];
    if (r === l.value.trim() && (t = !0, "value" !== l.name.toLowerCase())) {
      n = !1;
      break
    }
  }
  return t ? {
    Text: r,
    AttributeMatchedWasValue: n
  } : null
}

function placeholderInfoForElement(e) {
  var r = e.getAttribute("placeholder");
  if (r) return {
    Text: r,
    AttributeMatchedWasValue: !1
  };
  var t = e.getAttribute("data-placeholder");
  return t && t.length ? {
    Text: t,
    AttributeMatchedWasValue: !1
  } : isInputElement(e) ? legacyPlaceholderInfoForInputElement(e) : null
}

function sharedPrefixLength(e, r) {
  for (var t = 0, n = 0, a = e.length; n < a && e[n] === r[n]; ++n) t++;
  return t
}

function rowContainingLabelAboveRow(e) {
  for (var r = e.getBoundingClientRect(), t = e.previousElementSibling; t instanceof HTMLTableRowElement; t = t.previousElementSibling) {
    if (t.querySelector("input, select, textarea")) return null;
    var n = t.getBoundingClientRect();
    if (r.top - n.bottom > r.height / 2) return null;
    if (t.innerText.match(/\S/)) return t
  }
  return null
}

function cellVisuallyAbove(e) {
  var r = e.parentElement;
  if (!(r && r instanceof HTMLTableRowElement)) return null;
  var t = rowContainingLabelAboveRow(r);
  if (!t) return null;
  for (var n = e.getBoundingClientRect(), a = t.children, i = a.length, o = null, l = 0, s = 0; s < i; ++s) {
    var c = a[s],
      u = c.getBoundingClientRect(),
      p = Math.min(u.right, n.right) - Math.max(u.left, n.left);
    (!o || p > l) && (l = p, o = c)
  }
  return o
}

function couldBeFormSubmissionControl(e) {
  if (e instanceof HTMLButtonElement) return !0;
  if (e instanceof HTMLInputElement) {
    var r = e.type;
    return "submit" === r || "image" === r
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
  var r = document.createElement("a");
  return r.href = e, r
}

function pathComponentsForLocation(e) {
  var r = e.pathname.substring(1).split("/");
  return r[r.length - 1] || r.pop(), r
}

function lastPathComponentFromAnchor(e) {
  var r = pathComponentsForLocation(e);
  return r.length ? r[r.length - 1] : null
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
  for (var r = e.options, t = r.length, n = 0; n < t; ++n) {
    var a = r[n];
    if (a.selected !== a.defaultSelected) {
      if (a.defaultSelected) return !1;
      if (e.multiple || n) return !1
    }
  }
  return !0
}

function formActionAsAnchorElement(e, r) {
  if (!(e instanceof HTMLFormElement)) return null;
  let t = e.getAttribute("action");
  if (!t && r) return null;
  var n = document.createElement("a");
  return n.href = t || "", n
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

function selectorForElement(e) {
  let r = e.localName,
    t = e.getAttribute("id");
  t && (r += `#${t}`);
  let n = e.classList,
    a = n.length;
  for (let e = 0; e < a; e++) r += "." + n[e];
  return r
}

function hasOwnProperties(e) {
  return Object.getOwnPropertyNames(e).length > 0
}

function defaultOptionForSelectElement(e) {
  for (var r = e.options, t = r.length, n = 0; n < t; ++n) {
    var a = r[n];
    if (a.defaultSelected) return a
  }
  return r[0]
}

function selectElementOptionsSequenceAnalysis(e, r) {
  for (var t = e.options, n = t.length, a = 0, i = -1, o = -1, l = 0, s = 0; s < n; ++s) {
    var c = t[s],
      u = parseInt(c[r]);
    isNaN(u) ? (l >= a && (a = l, i = o), o = -1, l = 0) : -1 === o ? (o = u, l = 1) : u === o + 1 && (o = u, l++)
  }
  return l >= a && (a = l, i = o), {
    lengthOfLongestSequence: a,
    lastNumberInSequence: i
  }
}

function isElementPositionedToBeEffectivelyInvisible(e) {
  for (var r = !1, t = e; t; t = t.parentElement)
    if ("fixed" === getComputedStyle(t).position) {
      r = !0;
      break
    }
  var n, a, i, o = e.getBoundingClientRect();
  if (r) n = o, a = window.innerWidth, i = window.innerHeight;
  else {
    var l = window.scrollY,
      s = window.scrollX;
    n = {
      top: o.top + l,
      right: o.right + s,
      bottom: o.bottom + l,
      left: o.left + s,
      width: o.width,
      height: o.height
    }, a = document.documentElement.scrollWidth, i = Math.max(document.documentElement.scrollHeight, window.innerHeight)
  }
  return n.top >= i || n.right <= 0 || n.bottom <= 0 || n.left >= a
}

function rectIsWithinDocumentViewport(e) {
  return e.right >= 0 && e.bottom >= 0 && e.left <= window.innerWidth && e.top <= window.innerHeight
}

function isCredentialElementUniqueID(e, r) {
  return r === e.UsernameElementUniqueID || r === e.PasswordElementUniqueID || r === e.ConfirmPasswordElementUniqueID || r === e.OldPasswordElementUniqueID
}

function autocompleteTokens(e) {
  const r = ["autocomplete", "autocompletetype", "x-autocompletetype"];
  let t = [];
  for (const n of r) e.hasAttribute(n) && t.push(e.getAttribute(n).trim().toLowerCase());
  if (!t.length) return null;
  let n = t.join(" ").split(/\s+/).filter((function (e) {
    return e.length && "off" !== e && "on" !== e
  }));
  return n.length ? n : null
}

function controlAppearsToBePartOfPhotoTaggingInterface(e) {
  const r = /photo.*tag/i;
  for (var t = e.parentElement; t; t = t.parentElement)
    if (r.test(t.className)) return !0;
  return !1
}

function levenshteinDistance(e, r) {
  for (var t = e.length, n = r.length, a = new Array(t + 1), i = 0; i < t + 1; ++i) a[i] = new Array(n + 1), a[i][0] = i;
  for (var o = 0; o < n + 1; ++o) a[0][o] = o;
  for (o = 1; o < n + 1; ++o)
    for (i = 1; i < t + 1; ++i)
      if (e[i - 1] === r[o - 1]) a[i][o] = a[i - 1][o - 1];
      else {
        var l = a[i - 1][o] + 1,
          s = a[i][o - 1] + 1,
          c = a[i - 1][o - 1] + 1;
        a[i][o] = Math.min(l, s, c)
      }
  return a[t][n]
}

function stringSimilarity(e, r) {
  var t = Math.max(e.length, r.length);
  return t ? (t - levenshteinDistance(e, r)) / t : 0
}

function articleTitleAndSiteNameFromTitleString(e, r) {
  const t = [" - ", " – ", " — ", ": ", " | ", " » "],
    n = t.length;
  for (var a, i, o = e.replace(/^(www|m|secure)\./, ""), l = o.replace(/\.(com|info|net|org|edu|gov)$/, "").toLowerCase(), s = 0; s < n; ++s) {
    var c = r.split(t[s]);
    if (2 === c.length) {
      var u = c[0].trim(),
        p = c[1].trim(),
        d = u.toLowerCase(),
        f = p.toLowerCase(),
        m = Math.max(stringSimilarity(d, o), stringSimilarity(d, l)),
        v = Math.max(stringSimilarity(f, o), stringSimilarity(f, l)),
        w = Math.max(m, v);
      (!i || w > i) && (i = w, a = m > v ? {
        siteName: u,
        articleTitle: p
      } : {
        siteName: p,
        articleTitle: u
      })
    }
  }
  return a && i >= .6 ? a : null
}

function documentTitleWithoutHostNamePrefix() {
  const e = document.title,
    r = articleTitleAndSiteNameFromTitleString(window.location.host, e);
  return r ? r.articleTitle : e
}

function queryElementBySelector(e, r) {
  return window.collectMatchingElementsInFlatTree ? window.collectMatchingElementsInFlatTree(e, r) : e.querySelectorAll(r)
}

function siblingsIncludingSelfForElement(e) {
  let r = e.parentElement;
  if (r) return r.children;
  let t = e;
  for (; t.previousElementSibling;) t = t.previousElementSibling;
  let n = [],
    a = t;
  for (; a;) n.push(a), a = a.nextElementSibling;
  return n
}

function regularExpressionsFromStrings(e) {
  return e.map((e => new RegExp(e)))
}

function stringsMatchAnyRegularExpressions(e, r) {
  for (let t of r)
    for (let r of e)
      if (t.test(r.toLowerCase())) return !0;
  return !1
}

function pathFromAnchorWithoutLeadingSlash(e) {
  let r = /\/(.*)/.exec(e.pathname);
  return r && 2 === r.length ? r[1] : null
}
console.autofillDebugLog = function (e, ...r) {
  FormMetadataJSController.isDebugConsoleLoggingEnabled
}, Node.prototype.traversePreviousNode = function (e) {
  if (this) {
    var r = this.previousSibling;
    if (e(r)) return null;
    for (; r && r.lastChild;)
      if (e(r = r.lastChild)) return null;
    return r || this.parentNode
  }
}, Node.prototype.traverseNextNode = function (e) {
  if (this) {
    var r = this.firstChild;
    if (r) return r;
    if (e && this === e) return null;
    if (r = this.nextSibling) return r;
    for (r = this; r && !r.nextSibling && (!e || !r.parentNode || r.parentNode !== e);) r = r.parentNode;
    return r ? r.nextSibling : null
  }
}, Node.prototype.isVisible = function () {
  var e = this;
  if (e._isVisible === visibilityCacheGeneration) return !0;
  if (e._isVisible === -visibilityCacheGeneration) return !1;
  var r = e.nodeType == Node.TEXT_NODE ? e.parentNode : e,
    t = getComputedStyle(r, null);
  return e._isVisible = -visibilityCacheGeneration, "none" !== t.display && "visible" === t.visibility && (!(r.offsetWidth < 2) && (!(r.offsetHeight < 2) && (e._isVisible = visibilityCacheGeneration, !0)))
}, Object.defineProperty(Array.prototype, "joinFirstItems", {
  value: function (e, r) {
    r > this.length && (r = this.length);
    for (var t = "", n = 0; n < r; ++n) n > 0 && (t += e), t += this[n];
    return t
  }
}), DOMRect.prototype.isZeroRect = function () {
  return !(this.top || this.right || this.bottom || this.left)
}, DOMRect.prototype.distanceToRect = function (e) {
  var r = [{
    x: this.left,
    y: this.top
  }, {
    x: this.right,
    y: this.top
  }],
    t = [{
      x: this.right,
      y: this.top
    }, {
      x: this.right,
      y: this.bottom
    }],
    n = [{
      x: this.left,
      y: this.bottom
    }, {
      x: this.right,
      y: this.bottom
    }],
    a = [{
      x: this.left,
      y: this.top
    }, {
      x: this.left,
      y: this.bottom
    }],
    i = [{
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
    c = [
      [a, s],
      [a, o],
      [r, i],
      [r, l],
      [t, s],
      [t, o],
      [n, i],
      [n, l]
    ].map((function distanceBetweenTwoParallelLineSegments(e) {
      var r = e[0],
        t = e[1];
      if (r[0].x >= t[0].x && r[0].x < t[1].x || t[0].x >= r[0].x && t[0].x < r[1].x) return Math.abs(r[0].y - t[0].y);
      if (r[0].y >= t[0].y && r[0].y < t[1].y || t[0].y >= r[0].y && t[0].y < r[1].y) return Math.abs(r[0].x - t[0].x);

      function distanceBetweenTwoPointsSquared(e, r) {
        return Math.pow(e.x - r.x, 2) + Math.pow(e.y - r.y, 2)
      }
      return Math.sqrt(Math.min(distanceBetweenTwoPointsSquared(r[0], t[1]), distanceBetweenTwoPointsSquared(r[1], t[0])))
    }));
  return Math.min.apply(Math, c)
}, HTMLElement.prototype.parentElementIncludingShadowDOMHost = function () {
  let e = this.parentElement;
  if (e) return e;
  let r = this.getRootNode();
  return r && r.host ? r.host : null
}, HTMLElement.prototype.allAncestorsAndSelfIncludingShadowDOMHosts = function () {
  let e = [],
    r = this;
  for (; r;) e.push(r), r = r.parentElementIncludingShadowDOMHost();
  return e
}, HTMLElement.prototype.closestCommonAncestor = function (e) {
  let r = this.parentElement;
  for (; r;) {
    if (r.contains(e)) return r;
    r = r.parentElement
  }
  let t = this.allAncestorsAndSelfIncludingShadowDOMHosts().reverse(),
    n = e.allAncestorsAndSelfIncludingShadowDOMHosts().reverse(),
    a = Math.min(t.length, n.length),
    i = null;
  for (let e = 0; e < a; ++e) {
    if (!(t[e] === n[e])) break;
    i = t[e]
  }
  return i || null
}, HTMLElement.prototype.isHiddenFromAccessibilityTree = function () {
  for (let r = 0, t = this; r <= 2 && t; ++r, t = t.parentElement) {
    var e = t.getAttribute("aria-hidden");
    if (e && "true" === e.toLowerCase()) return !0
  }
  return !1
}, HTMLFormElement.prototype.isVisible = function () {
  if (Node.prototype.isVisible.call(this)) return !0;
  for (var e = this.elements, r = e.length, t = 0; t < r; ++t)
    if (e[t].isVisible()) return !0;
  return !1
}, RegExp.prototype.testMatchesEntireString = function (e) {
  if (!e) return !1;
  let r = this.exec(e);
  return !(!r || r[0] !== e)
}, LogicalForm = function (e, r) {
  var t = e.length;
  this._formElement = e[0].form, this._backingElement = this._formElement, !r && this._backingElement || (this._backingElement = 1 === t ? e[0] : e[0].closestCommonAncestor(e[t - 1])), this._formElement || (this._formElement = this._backingElement);
  for (var n = 0; n < t; n++) e[n]._logicalForm = this, n + 1 < t && (e[n]._nextControlInLogicalForm = e[n + 1]), n > 0 && (e[n]._previousControlInLogicalForm = e[n - 1]);
  this._controls = Array.prototype.slice.call(e), this._backingElement._logicalFormUniqueID || (this._backingElement._logicalFormUniqueID = FormMetadataJSController.nextFormUniqueID)
}, LogicalForm.prototype = {
  get elements() {
    return this._controls
  },
  get formElement() {
    return this._formElement
  },
  get backingElement() {
    return this._backingElement
  },
  get formUniqueID() {
    return this._backingElement._logicalFormUniqueID
  },
  containsControl: function (e) {
    return e._logicalForm ? e._logicalForm === this : e.form === this._formElement
  },
  radioButtonsWithName: function (e) {
    let r = queryElementBySelector(document.documentElement, `*[name="${e}"]`);
    return Array.prototype.filter.call(r, (function (e) {
      return (e.form === this._formElement || this._formElement.contains(e)) && isRadioButtonElement(e)
    }), this)
  },
  annotate: function (e) {
    var r = this._formElement,
      t = r._annotations;
    if (t) {
      for (var n in e) {
        var a = e[n];
        a ? t[n] = a : delete t[n]
      }
      hasOwnProperties(t) || delete r._annotations
    } else r._annotations = e
  },
  get annotations() {
    return this._formElement._annotations
  },
  get isAnnotated() {
    return !!this._formElement._annotations
  }
}, FormMetadata = function () {
  this._forms = [], this._formMetadata = [], this._elementsWithGeneratedPasswords = [], this._generatedPasswords = [], this._labels = queryElementBySelector(document, "label"), this._controlUniqueIDToControlMap = [], this._mapOfFormTypeToExtraScoreProducer = function () {
    let e = {
      4: function (e) {
        return 0
      }
    };
    return e[3] = function (e) {
      return 1 === e._controls.filter((e => function (e) {
        return "checkbox" === e.type && FormMetadataJS._labelsForElement(e).some((e => /(remember|keep) me/i.test(e.innerText.trim()) && e.isVisible()))
      }(e))).length ? 2 : 0
    }, e[5] = function (e) {
      return 0
    }, e
  }(), this._requiredFormatForDateTimeInput = DateTimeInputTypes.reduce((function (e, r) {
    let t = document.createElement("input");
    t.type = r;
    return t.value = "a", e[r] = "" === t.value ? DateTimeInputTypeFormats[r] : "", e
  }), {})
}, FormMetadata.prototype = {
  _getTagName: function (e) {
    var r = e.tagName;
    return "string" == typeof r || "string" == typeof (r = e.nodeName) ? r : void 0
  },
  _getNameOrId: function (e) {
    return e.name && e.name.length ? e.name : e.id
  },
  controlUniqueID: function (e) {
    if (e._controlUniqueID) return e._controlUniqueID;
    var r = "ControlID-" + FormMetadataJSController.nextControlUniqueID;
    return e._controlUniqueID = r, this._controlUniqueIDToControlMap[r] = e, FormMetadataJSController.shouldShowAdditionalUI && e.setAttribute("control-id", r), e._controlUniqueID
  },
  controlCategory: function (e) {
    return e._controlCategory || (e._controlCategory = e.getAttribute("category")), e._controlCategory
  },
  _searchForLabelsAboveCell: function (e, r) {
    var t = window.getComputedStyle(r, null);
    if (!t || "table-cell" !== t.getPropertyValue("display")) return null;
    var n = cellVisuallyAbove(r);
    if (!n) return null;
    for (var a = 0, i = n.firstChild; i; i = i.traverseNextNode(n))
      if (i.nodeType == Node.TEXT_NODE && i.isVisible()) {
        var o = i.nodeValue,
          l = e.searchReverse(o);
        if (l) return {
          Distance: a,
          Match: l[0],
          Property: l[1],
          Category: l[2],
          ParentProperty: l[3]
        };
        a += o.length
      }
    return null
  },
  _collectStringFromNodeForPageScan: function (e, r, t) {
    var n = e.nodeValue,
      a = n.length;
    return t + a > 600 && (n = n.substr(-(500 - t)), a = 500 - t), (n = n.trim()).length && r.push(n), t
  },
  _dataForComputingMatchFromPageScanBeforeElement: function (e, r) {
    function shouldStopScan(e) {
      return e && e.nodeType == Node.ELEMENT_NODE && e.matches("nav")
    }
    var t, n = [],
      a = 0,
      i = this._logicalFormForControl(e).formElement,
      o = i && i.isVisible();
    r || (r = i);
    for (var l = e.traversePreviousNode(shouldStopScan); l && a < 500; l = l.traversePreviousNode(shouldStopScan)) {
      var s = l.localName;
      if (l === r) break;
      if (this._isRenderedFormControl(l)) {
        if (l.isVisible() || !o) break
      } else {
        if (this._isLabelElement(l) && l.isVisible()) break;
        if ("td" !== s || t) {
          if ("tr" === s && t) break;
          if ("ul" === s || "ol" === s || "dl" === s) break;
          if ("li" === s) {
            if (!l.parentNode.contains(e)) break
          } else l.nodeType == Node.TEXT_NODE && l.isVisible() && (a += this._collectStringFromNodeForPageScan(l, n, a))
        } else t = l
      }
    }
    return [n, t]
  },
  _matchFromPageScanBeforeElement: function (e, r, t) {
    var n = this._pageScanContext ? this._pageScanContext.backwardScanCache : null,
      a = this._pageScanDataForElementWithCacheAndDataProducer(r, n, this._dataForComputingMatchFromPageScanBeforeElement.bind(this), t),
      i = a[0],
      o = this._matchFromPatternMatcherAndStringsFromPageScan(e, i);
    if (o) return o;
    var l = a[1];
    if (l) {
      var s = this._searchForLabelsAboveCell(e, l);
      if (s) return s.IsInCellAbove = !0, s
    }
    return null
  },
  _isElementFollowedByForgotUserNameOrEmailAffordance: function (e, r) {
    this._forgotUserNameRegularExpressions || (this._forgotUserNameRegularExpressions = regularExpressionsFromStrings(FormMetadataJSController.regularExpressionsForForgotUserNameAffordance)), this._forgotEmailRegularExpressions || (this._forgotEmailRegularExpressions = regularExpressionsFromStrings(FormMetadataJSController.regularExpressionsForForgotEmailAffordance));
    let t = this._stringsToEvaluateToDetermineIfElementIsFollowedByAffordance(e, r);
    return !!stringsMatchAnyRegularExpressions(t, this._forgotUserNameRegularExpressions) || !!stringsMatchAnyRegularExpressions(t, this._forgotEmailRegularExpressions)
  },
  _isElementFollowedByForgotPasswordAffordance: function (e, r) {
    return this._forgotPasswordRegularExpressions || (this._forgotPasswordRegularExpressions = regularExpressionsFromStrings(FormMetadataJSController.regularExpressionsForForgotPasswordAffordance)), stringsMatchAnyRegularExpressions(this._stringsToEvaluateToDetermineIfElementIsFollowedByAffordance(e, r), this._forgotPasswordRegularExpressions)
  },
  _numberOfForgotUserNameEmailOrPasswordAffordancesFollowingElement: function (e, r) {
    this._forgotEmailRegularExpressions || (this._forgotEmailRegularExpressions = regularExpressionsFromStrings(FormMetadataJSController.regularExpressionsForForgotEmailAffordance)), this._forgotPasswordRegularExpressions || (this._forgotPasswordRegularExpressions = regularExpressionsFromStrings(FormMetadataJSController.regularExpressionsForForgotPasswordAffordance)), this._forgotUserNameRegularExpressions || (this._forgotUserNameRegularExpressions = regularExpressionsFromStrings(FormMetadataJSController.regularExpressionsForForgotUserNameAffordance));
    let t = this._stringsToEvaluateToDetermineIfElementIsFollowedByAffordance(e, r),
      n = 0;
    return stringsMatchAnyRegularExpressions(t, this._forgotUserNameRegularExpressions) && n++, stringsMatchAnyRegularExpressions(t, this._forgotEmailRegularExpressions) && n++, stringsMatchAnyRegularExpressions(t, this._forgotPasswordRegularExpressions) && n++, n
  },
  _stringsToEvaluateToDetermineIfElementIsFollowedByAffordance: function (e, r) {
    let t = this._dataForComputingMatchFromPageScanAfterElement(e, "A");
    if (!t.length) {
      const r = e.traverseNextNode();
      if (r) {
        let e = r;
        r instanceof Node && (e = r.parentElement);
        const n = e.querySelector("a");
        if (n) {
          t.push(n.innerText);
          const e = pathFromAnchorWithoutLeadingSlash(n);
          e && t.push(e)
        }
      }
    }
    if (!t.length)
      for (let n of queryElementBySelector(r, "a")) {
        if (e.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) {
          t.push(n.innerText);
          const e = pathFromAnchorWithoutLeadingSlash(n);
          e && t.push(e)
        }
      }
    const n = e._nextControlInLogicalForm;
    return n && "button" === n.type && t.push(n.innerText), t
  },
  _dataForComputingMatchFromPageScanAfterElement: function (e, r, t) {
    var n = [],
      a = 0,
      i = this._logicalFormForControl(e).formElement,
      o = i && i.isVisible();
    let l = void 0 !== r;
    t || (t = i);
    for (var s = e.traverseNextNode(); s && a < 500; s = s.traverseNextNode()) {
      var c = s.localName;
      if (s === t) {
        var u = this._pageScanContext;
        u && !a && (u.forwardScanIsFutile = !0);
        break
      }
      if (this._isRenderedFormControl(s)) {
        if (s.isVisible() || !o) break
      } else {
        if (this._isLabelElement(s) && s.isVisible()) break;
        if ("tr" === c) break;
        if ("ul" === c || "ol" === c || "dl" === c) break;
        if (s.nodeType == Node.TEXT_NODE && s.isVisible()) {
          if (void 0 !== r && (!s.parentNode || s.parentNode.tagName !== r)) continue;
          if (a += this._collectStringFromNodeForPageScan(s, n, a), l) break
        }
      }
    }
    return n
  },
  _matchFromPageScanAfterElement: function (e, r, t) {
    var n = this._pageScanContext ? this._pageScanContext.forwardScanCache : null,
      a = this._pageScanDataForElementWithCacheAndDataProducer(r, n, this._dataForComputingMatchFromPageScanAfterElement.bind(this), t);
    return this._matchFromPatternMatcherAndStringsFromPageScan(e, a)
  },
  _pageScanDataForElementWithCacheAndDataProducer: function (e, r, t, n) {
    if (!r) return t(e, n);
    if (a = r.get(e)) return a;
    var a = t(e, n);
    return r.set(e, a), a
  },
  _matchFromPatternMatcherAndStringsFromPageScan: function (e, r) {
    for (var t = r.length, n = 0, a = 0; a < t; ++a) {
      var i = r[a];
      n += i.length;
      var o = e.searchReverse(i);
      if (o) return {
        Distance: n,
        Match: o[0],
        Property: o[1],
        Category: o[2],
        ParentProperty: o[3]
      }
    }
    return null
  },
  _matchPatternAgainstString: function (e, r) {
    if (!r) return null;
    var t = r.replace(/[\d_.-]/g, " ");
    return t = t.replace(/[a-z][A-Z]/g, (function (e) {
      return e[0] + " " + e[1]
    })), e.longestMatch(t)
  },
  _controlsAreAllButtons: function (e) {
    for (var r = e.length, t = 0; t < r; ++t) {
      if (!(e[t] instanceof HTMLButtonElement)) return !1
    }
    return !0
  },
  _createLogicalFormsForControls: function (e) {
    if (this._controlsAreAllButtons(e)) return [];
    let r, t, n = e.map((function (e) {
      return e.getBoundingClientRect()
    })),
      a = e.length,
      i = 0;
    n[0].isZeroRect() ? (r = 0, t = null) : (r = 1, t = n[0]);
    for (let c = 1; c < a; ++c) {
      let u = n[c];
      if (!u.isZeroRect()) {
        if (t) {
          let p = t.distanceToRect(u);
          p && (++r, i += p)
        }
        t = u
      }
    }
    if (1 === r) {
      function closestSectioningElementForControl(e) {
        return e.closest("header, footer, aside")
      }
      let d = [],
        f = 0;
      for (; f < a;) {
        let m = [e[f]],
          v = closestSectioningElementForControl(e[f]);
        for (let w = f + 1; w < a; ++w) {
          let y = e[w];
          if (v !== closestSectioningElementForControl(e[w])) break;
          m.push(y)
        }
        d.push(new LogicalForm(m)), f += m.length
      }
      return d
    }
    let o = r ? i / r : 0,
      l = [],
      s = 0;
    for (; s < a;) {
      let h = [e[s]],
        M = !1,
        E = n[s].isZeroRect() ? null : n[s];
      for (let S = s + 1; S < a; ++S) {
        let g = e[S],
          k = n[S];
        if (!k.isZeroRect()) {
          if (M) {
            if (E && E.distanceToRect(k) > o) break
          } else M = couldBeFormSubmissionControl(g);
          E = k
        }
        h.push(g)
      }
      l.push(new LogicalForm(h)), s += h.length
    }
    return l
  },
  _formLooksLikeAspnetForm: function (e) {
    var r = 0;
    "aspnetForm" === e.getAttribute("id") && ++r, "aspnetForm" === e.getAttribute("name") && ++r;
    for (var t = queryElementBySelector(e, "input"), n = 0, a = t.length; n < a; ++n) {
      var i = t[n],
        o = i.getAttribute("id"),
        l = i.getAttribute("name");
      /ctl\d\d_/.test(o) && ++r, /ctl\d\d\$/.test(l) && ++r, "hidden" === i.getAttribute("type") && ("__VIEWSTATE" === l && "__VIEWSTATE" === o || "__EVENTTARGET" === l && "__EVENTTARGET" === o || "__EVENTARGUMENT" === l && "__EVENTARGUMENT" === o || "__LASTFOCUS" === l && "__LASTFOCUS" === o) && ++r
    }
    for (var s = queryElementBySelector(document, "script"), c = s.length, u = 0; u < c; ++u) {
      var p = anchorWithURLString(s[u].src);
      if (p.host === window.location.host) {
        var d = lastPathComponentFromAnchor(p);
        "WebResource.axd" !== d && "ScriptResource.axd" !== d || ++r
      }
    }
    return r >= 3
  },
  _anchorLooksLikeSubmitButton: function (e) {
    return /submit|button/i.test(e.getAttribute("id"))
  },
  _visibleInputAndSelectElementsInForm: function (e) {
    let r = queryElementBySelector(e, "input:not([type='hidden']), select"),
      t = [];
    for (var n = 0, a = r.length; n < a; ++n) {
      let e = r[n];
      e.isVisible() && t.push(e)
    }
    return t
  },
  _elementsActingAsButtonsInForm: function (e) {
    let r = Array.prototype.slice.call(queryElementBySelector(e, "input[type='submit'], input[type='image']")),
      t = queryElementBySelector(e, "a");
    for (var n = 0, a = t.length; n < a; ++n) {
      let e = t[n];
      this._anchorLooksLikeSubmitButton(e) && e.isVisible() && r.push(e)
    }
    return r
  },
  _logicalFormsForAspnetForm: function (e) {
    for (var r = this._visibleInputAndSelectElementsInForm(e), t = r.length, n = this._elementsActingAsButtonsInForm(e), a = n.length, i = 0; i < a; ++i) {
      (l = n[i]).getAttribute("id") && (l._aspNetIDComponents = l.getAttribute("id").split("_"))
    }
    n.sort((function (e, r) {
      var t = e._aspNetIDComponents || [];
      return (r._aspNetIDComponents || []).length - t.length
    }));
    var o = [];

    function groupElementsIntoLogicalFormsBasedOnTableLayout(e) {
      var r = e.length;
      if (r <= 1) o.push(new LogicalForm(e, ForceNonFormElementAsLogicalBackingElement.Yes));
      else {
        var t = r - 1,
          n = e[t];
        if (e[0].closestCommonAncestor(n) instanceof HTMLTableRowElement) {
          for (var a = 0; a < t; ++a) {
            if (!(e[a].closestCommonAncestor(n) instanceof HTMLTableRowElement)) return groupElementsIntoLogicalFormsBasedOnTableLayout(e.slice(0, a)), void groupElementsIntoLogicalFormsBasedOnTableLayout(e.slice(a))
          }
          o.push(new LogicalForm(e, ForceNonFormElementAsLogicalBackingElement.Yes))
        } else o.push(new LogicalForm(e, ForceNonFormElementAsLogicalBackingElement.Yes))
      }
    }
    for (i = 0; i < a; ++i) {
      var l, s = (l = n[i])._aspNetIDComponents;
      if (s) {
        var c = s.length;
        if (!(c < 2)) {
          for (var u = s.joinFirstItems("_", c - 1) + "_", p = [], d = t - 1; d >= 0; --d) {
            var f = r[d],
              m = f.getAttribute("id");
            m && (m.startsWith(u) && (p.push(f), r.splice(d, 1)))
          }
          if (p.length && groupElementsIntoLogicalFormsBasedOnTableLayout(p.reverse()), !(t = r.length)) break
        }
      }
    }
    return t && groupElementsIntoLogicalFormsBasedOnTableLayout(r), o
  },
  _logicalFormsInPage: function (e, r) {
    let t = [],
      n = {},
      a = queryElementBySelector(document, "form"),
      i = 0,
      o = a.length,
      l = new Set;
    for (var s = 0; s < o; ++s) {
      let o = a[s],
        c = o.elements;
      if (!c.length) {
        c = queryElementBySelector(o, "input, select, textarea, button");
        for (let e of c) l.add(e)
      }
      if (c.length) {
        if (i++, e && i >= e) return t;
        if (r) {
          let e = [o.method, o.name, o.action, o.className].join("|"),
            t = n[e] || 0;
          if (t > r) continue;
          n[e] = t + 1
        }
        this._formLooksLikeAspnetForm(o) ? t = t.concat(this._logicalFormsForAspnetForm(o)) : t.push(new LogicalForm(c))
      }
    }
    let c = [],
      u = queryElementBySelector(document, "input, select, textarea, button"),
      p = u.length;
    for (let e = 0; e < p; ++e) {
      let r = u[e];
      if (r.form || l.has(r)) {
        if (!c.length) continue;
        t = t.concat(this._createLogicalFormsForControls(c)), c = []
      } else (this._isRenderedFormControl(r) || autocompleteTokens(r)) && c.push(r)
    }
    return c.length && (t = t.concat(this._createLogicalFormsForControls(c))), t
  },
  _indexInCacheOfLogicalFormContainingControl: function (e) {
    for (var r = 0; r < this._forms.length; ++r)
      if (this._forms[r].containsControl(e)) return r;
    return -1
  },
  _logicalFormForControl: function (e) {
    var r = this._indexInCacheOfLogicalFormContainingControl(e);
    return -1 === r ? null : this._forms[r]
  },
  _matchPatternAgainstElement: function (e, r, t) {
    this._logicalFormForControl(t);
    var n = t._previousControlInLogicalForm,
      a = t._nextControlInLogicalForm;

    function attributeValueWithoutPrefixSharedWithSiblingElement(e, r) {
      if (!e) return null;
      var n = t[r],
        a = sharedPrefixLength(n, e[r]);
      return a ? n.substr(a) : null
    }
    const i = ["name", "id"],
      o = i.length;
    for (var l = new Array(o), s = new Array(o), c = 0; c < o; ++c) {
      var u = i[c];
      l[c] = attributeValueWithoutPrefixSharedWithSiblingElement(n, u), s[c] = attributeValueWithoutPrefixSharedWithSiblingElement(a, u)
    }
    var p = "select" === this._getTagName(t).toLowerCase(),
      d = p ? defaultOptionForSelectElement(t) : null;
    const f = r.length;
    for (var m = 0; m < f; ++m) {
      var v, w = r[m];
      for (c = 0; c < o && !(v = this._matchPatternAgainstString(w, l[c])) && !(v = this._matchPatternAgainstString(w, s[c])) && !(v = this._matchPatternAgainstString(w, t[i[c]])); ++c);
      if (!v && p && d) {
        var y = d.text;
        if (/^-.+-$/.test(y)) v = this._matchPatternAgainstString(w, y);
        else if (!d.value.length && y.length) {
          for (var h = t.options, M = h.length, E = !0, S = 0; S < M; ++S) {
            var g = h[S];
            if (g !== d && !g.value.length) {
              E = !1;
              break
            }
          }
          E && (v = this._matchPatternAgainstString(w, y))
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
  _labelsForElement: function (e) {
    if (e._cachedLabels) return e._cachedLabels;
    e._cachedLabels = [];
    let r = e.getAttribute("aria-labelledby");
    if (r && r.length) {
      let n = r.split(" ");
      for (var t = 0; t < n.length; t++) {
        let r = queryElementBySelector(document, "#" + n[t]),
          a = r.length ? r[0] : null;
        a && e._cachedLabels.push(a)
      }
    }
    if (e._cachedLabels.length) return e._cachedLabels;
    let n = e.getAttribute("id");
    if (n) {
      let r = e.form;
      for (let t of this._labels) {
        r === t.closest("form") && t.getAttribute("for") === n && e._cachedLabels.push(t)
      }
    }
    if (e._cachedLabels.length) return e._cachedLabels;
    for (var a = this._logicalFormForControl(e).formElement, i = e.parentElement; i && i !== a; i = i.parentElement)
      if (this._isLabelElement(i)) {
        e._cachedLabels.push(i);
        break
      }
    return e._cachedLabels
  },
  _matchesForElement: function (e, r, t = !1) {
    var n = [],
      a = r.length;

    function addMatchesFromText(e, t) {
      for (var i = 0; i < a; ++i) {
        var o = r[i].searchReverse(e);
        if (o && (n.push({
          FoundByPageScan: !1,
          Match: o[0].toLowerCase(),
          Property: o[1],
          Category: o[2],
          ParentProperty: o[3],
          Priority: i
        }), t === ShouldStopAfterFirstMatch.StopAfterFirstMatch)) return
      }
    }
    this._matchPatternAgainstElement(n, r, e);
    for (var i = !1, o = this._labelsForElement(e), l = 0; l < o.length; ++l) {
      var s = o[l].innerText;
      s && (i = !0, addMatchesFromText(s, ShouldStopAfterFirstMatch.StopAfterFirstMatch))
    }
    let c = placeholderInfoForElement(e);
    c && !c.AttributeMatchedWasValue && addMatchesFromText(c.Text, ShouldStopAfterFirstMatch.StopAfterFirstMatch);
    var u = e.getAttribute("title");
    u && addMatchesFromText(u, ShouldStopAfterFirstMatch.StopAfterFirstMatch);
    var p = this._labelForElementIfElementAndLabelAreOnlyElementsOfTheirKindAmongSiblingElements(e);
    p && addMatchesFromText(p.innerText, ShouldStopAfterFirstMatch.CollectAllMatches);
    let d = this._ariaLabelForElementOrParentOfElement(e);
    d && addMatchesFromText(d, ShouldStopAfterFirstMatch.StopAfterFirstMatch);
    var f = e.getAttribute("formcontrolname");
    f && f.length && addMatchesFromText(f, ShouldStopAfterFirstMatch.StopAfterFirstMatch);
    var m = this._pageScanContext,
      v = !0,
      w = !1;
    if (m && (m.shouldUsePageScan && (v = m.shouldUsePageScan()), m.reportPageScanUsedSuccessfully && (w = !0)), !v) return n;
    if (i) return w && m.reportPageScanUsedSuccessfully(!1), n;
    if (!0 === t) return n;
    var y, h = null,
      M = null;

    function betterMatchOfNewAndCurrentBestMatch(e, r) {
      return e && e.Match.length && (!r || !e.IsInCellAbove && r.IsInCellAbove || e.IsInCellAbove == r.IsInCellAbove && e.Distance < r.Distance) ? {
        FoundByPageScan: !0,
        Match: y.Match.toLowerCase(),
        Property: y.Property,
        Category: y.Category,
        ParentProperty: y.ParentProperty,
        Priority: E
      } : r
    }
    for (var E = 0; E < a; ++E) h = betterMatchOfNewAndCurrentBestMatch(y = this._matchFromPageScanBeforeElement(r[E], e), h), m && m.forwardScanIsFutile || (M = betterMatchOfNewAndCurrentBestMatch(y = this._matchFromPageScanAfterElement(r[E], e), M));
    var S = !1;
    if (h && (n.push(h), S = !0), M)
      for (var g = 0, k = n.length; g < k; ++g) {
        var C = n[g];
        if (M.Priority === C.Priority) {
          n.push(M), S = !0;
          break
        }
      }
    return w && m.reportPageScanUsedSuccessfully(S), n.length && c && c.AttributeMatchedWasValue && addMatchesFromText(c.Text, ShouldStopAfterFirstMatch.StopAfterFirstMatch), n
  },
  _bestMatchFromMatches: function (e, r, t) {
    function firstMatchOfMostFrequentlyOccurringStringFromMatches(e, r) {
      for (var t = e.length, n = {}, a = 0; a < t; ++a) {
        var i, o = e[a];
        switch (r) {
          case MatchCriteria.Property:
            i = o.Property || o.Match;
            break;
          case MatchCriteria.Category:
            i = o.Category || o.Match;
            break;
          case MatchCriteria.Literal:
            i = o.Match
        }
        n[i] ? n[i].Frequency += 1 : n[i] = {
          Frequency: 1,
          FirstMatchObject: o
        }
      }
      var l = [];
      for (var s in n) l.push(n[s]);
      var c = l.sort((function (e, r) {
        return r.Frequency - e.Frequency
      })),
        u = c.length;
      if (u <= 1) return null;
      if (r === MatchCriteria.Property)
        for (a = 0; a < u; ++a) {
          if (c[a].FirstMatchObject.ParentProperty in n) return c[a].FirstMatchObject
        }
      return c[0].Frequency > c[1].Frequency ? c[0].FirstMatchObject : void 0
    }
    var n = e.length;
    if (0 === n) return null;
    if (1 === n) return e[0];
    var a = firstMatchOfMostFrequentlyOccurringStringFromMatches(e, MatchCriteria.Property);
    return a || ((a = firstMatchOfMostFrequentlyOccurringStringFromMatches(e, MatchCriteria.Category)) ? a : e.sort((function (e, r) {
      return e.Priority - r.Priority
    }))[0])
  },
  _bestMatchForElement: function (e, r, t = !1) {
    if (!e) return null;
    var n = this._matchesForElement(e, r, t);
    return this._bestMatchFromMatches(n, e, r)
  },
  _labelForElementIfElementAndLabelAreOnlyElementsOfTheirKindAmongSiblingElements: function (e) {
    for (var r = null, t = e.tagName, n = siblingsIncludingSelfForElement(e), a = n.length, i = 0; i < a; ++i) {
      var o = n[i];
      if (e !== o) {
        if (t === o.tagName) return null;
        if (this._isLabelElement(o)) {
          if (r) return null;
          r = o
        }
      }
    }
    return r
  },
  _ariaLabelForElementOrParentOfElement: function (e) {
    var r = e;
    for (var t = 0; t < 3 && r; ++t) {
      let e = r.getAttribute("aria-label");
      if (e && !r.isHiddenFromAccessibilityTree()) return e;
      r = r.parentElement
    }
    return null
  },
  _cachedOneTimeCodePatternMatcher: function () {
    return this._cachedPatternMatchers("oneTimeCodeFieldLabelPatternMatchers")[0]
  },
  _cachedPatternMatchers: function (e) {
    let r = "_" + e,
      t = this[r];
    return t || (this[r] = FormMetadataJSController[e], t = this[r]), t
  },
  _cachedElementPatternMatch: function (e, r, t) {
    var n = r + "_wasVisible",
      a = e[n];
    if (!0 === a) return e[r];
    var i = e.isVisible();
    if (a === i) return e[r];
    e[n] = i;
    let o = this._cachedPatternMatchers(t);
    return e[r] = this._bestMatchForElement(e, o), e[r]
  },
  _isLabeledUsernameField: function (e) {
    return !!this._isAutoFillableTextField(e) && null !== this._cachedElementPatternMatch(e, "_usernameFieldPatternMatch", "usernameFieldLabelPatternMatchers")
  },
  _isLabeledLoginField: function (e) {
    return !!this._isAutoFillableTextField(e) && null !== this._cachedElementPatternMatch(e, "_loginFieldPatternMatch", "loginFormTypePatternMatchers")
  },
  _isLabeledSignUpField: function (e) {
    return !!this._isAutoFillableTextField(e) && null !== this._cachedElementPatternMatch(e, "_signUpFieldPatternMatch", "newAccountFormTypePatternMatchers")
  },
  _isLabeledEmailField: function (e) {
    return !!this._isAutoFillableTextField(e) && ("email" === e.type || null !== this._cachedElementPatternMatch(e, "_emailFieldPatternMatch", "emailFieldLabelPatternMatchers"))
  },
  _addressBookLabelForElement: function (e) {
    if (!this._isAutoFillableTextField(e) && !this._isAutoFillableSelectElement(e) && !this._isAutoFillableTextAreaElement(e)) return null;
    var r = this._cachedElementPatternMatch(e, "_addressBookPatternMatch", "addressBookFieldLabelPatternMatchers");
    return r ? r.Match : null
  },
  _elementDisallowsAutocomplete: function (e) {
    var r = e.getAttribute("autocomplete");
    return r && "off" === r.toLowerCase()
  },
  _isTextArea: function (e) {
    return e instanceof HTMLTextAreaElement
  },
  _isSelectElement: function (e) {
    return e instanceof HTMLSelectElement
  },
  _isLabelElement: function (e) {
    return e instanceof HTMLLabelElement
  },
  _isRenderedFormControl: function (e) {
    var r = e.localName;
    if (!r) return !1;
    return r in {
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
  _isEditablePlainTextField: function (e) {
    return !!isInputElement(e) && (!e.disabled && !e.readOnly && (!e.type || "text" === e.type))
  },
  _isTextField: function (e) {
    if (this._isTextArea(e)) return !0;
    if (!isInputElement(e)) return !1;
    var r = e.type;
    return !r || r in {
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
  _isAutofocusedTextField: function (e) {
    return !!this._isTextField(e) && !0 === e.autofocus
  },
  _isAutoFilledTextField: function (e) {
    return !!this._isTextField(e) && e.matches(":-webkit-autofill")
  },
  _isSecureTextField: function (e) {
    if (!isInputElement(e)) return false;

    if (e._wasPreviouslySecureTextField) return true;
    try {
      if (e.matches(":-webkit-autofill-strong-password"))  {
          e._wasPreviouslySecureTextField = true;
          return true;
        }
    } catch (e) { }

    if (e.type === "password") return true;

    const style = getComputedStyle(e, null); 
    const webkitTextSecurity = style.getPropertyValue("-webkit-text-security");

    if (webkitTextSecurity && "none" !== webkitTextSecurity) return e._wasPreviouslySecureTextField = !0, !0;

    if (e.ytpe && (e.type !== "text")) return false;

    const n = e._nextControlInLogicalForm;
    return !(!n || !this._looksLikeShowHidePasswordButton(n)) && (!!this._matchesPasswordFieldLabelPattern(e) && (e._wasPreviouslySecureTextField = !0, !0))
  },
  _looksLikePasswordCredentialField: function (e, r) {
    if (!this._isSecureTextField(e)) return !1;
    var t = e.getAttribute("maxlength");
    return !(t && parseInt(t) < 4) && null === this._cachedElementPatternMatch(e, "_nonAccountPasswordSecureTextEntryFieldPatternMatch", "nonAccountPasswordSecureTextEntryFieldLabelPatternMatchers")
  },
  _looksLikeShowHidePasswordButton: function (e) {
    return !(!this._isCustomFormButton(e) && !this._isCheckboxInputElement(e)) && !!this._cachedElementPatternMatch(e, "_showHideButtonPatternMatch", "showHideButtonLabelPatternMatchers")
  },
  _isAutoFillable: function (e) {
    return !e.disabled && !e.readOnly
  },
  _isAutoFillableSelectElement: function (e) {
    return this._isAutoFillable(e) && this._isSelectElement(e)
  },
  _isAutoFillableTextAreaElement: function (e) {
    return this._isAutoFillable(e) && this._isTextArea(e)
  },
  _isAutoFillableTextField: function (e) {
    return this._isAutoFillable(e) && this._isTextField(e)
  },
  _looksLikeCreditCardNumberField: function (e, r) {
    if (!this._isAutoFillableTextField(e)) return !1;
    if (this._cachedElementPatternMatch(e, "_nonCreditCardNumberPatternMatch", "nonCreditCardCardNumberFieldLabelPatternMatchers")) return !1;
    if (r && -1 !== r.indexOf("cc-number")) return !0;
    const t = e.placeholder;
    let n = new RegExp("[0-9]{4}[ -][0-9]{4}[ -][0-9]{4}[ -][0-9]{4}");
    if (t && n.test(t)) return !0;
    let a = e.getAttribute("data-val-regex-pattern");
    if (a) {
      if (!new RegExp(a).test("12345")) return !1
    }
    return null !== this._cachedElementPatternMatch(e, "_creditCardNumberPatternMatch", "creditCardNumberFieldLabelPatternMatchers")
  },
  _looksLikeCreditCardSecurityCodeField: function (e, r) {
    return !!this._isAutoFillableTextField(e) && (!(!r || -1 === r.indexOf("cc-csc")) || null !== this._cachedElementPatternMatch(e, "_creditCardSecurityCodePatternMatch", "creditCardSecurityCodeFieldLabelPatternMatchers"))
  },
  _looksLikeCreditCardCardholderField: function (e, r) {
    return !!this._isEditablePlainTextField(e) && (!(!r || -1 === r.indexOf("cc-name")) || null !== this._cachedElementPatternMatch(e, "_creditCardCardholderPatternMatch", "creditCardCardholderFieldLabelPatternMatchers"))
  },
  _looksLikeCreditCardCompositeExpirationDateField: function (e, r) {
    return !(!this._isAutoFillableTextField(e) || this._isSecureTextField(e)) && (!(!r || -1 === r.indexOf("cc-exp")) || null !== this._cachedElementPatternMatch(e, "_creditCardCompositeExpirationDateFieldPatternMatch", "creditCardCompositeExpirationDateFieldLabelPatternMatchers"))
  },
  _looksLikeCreditCardTypeField: function (e, r) {
    return !(!this._isSelectElement(e) && !isRadioButtonElement(e)) && (!(!r || -1 === r.indexOf("cc-type")) || null !== this._cachedElementPatternMatch(e, "_creditCardTypePatternMatch", "creditCardTypeFieldLabelPatternMatchers"))
  },
  _looksLikeDayField: function (e) {
    return !(!this._isAutoFillableTextField(e) && !this._isAutoFillableSelectElement(e)) && null !== this._cachedElementPatternMatch(e, "_dayFieldPatternMatch", "dayFieldLabelPatternMatchers")
  },
  _looksLikeMonthField: function (e, r) {
    if (!this._isAutoFillableTextField(e) && !this._isAutoFillableSelectElement(e)) return !1;
    if (r && -1 !== r.indexOf("cc-exp-month")) return !0;
    if (null !== this._cachedElementPatternMatch(e, "_monthFieldPatternMatch", "monthFieldLabelPatternMatchers")) return !0;
    if ("select" !== this._getTagName(e).toLowerCase()) return !1;
    var t = e.options.length;
    if (12 === t || 13 === t)
      for (var n = [selectElementOptionsSequenceAnalysis(e, "text"), selectElementOptionsSequenceAnalysis(e, "value")], a = n.length, i = 0; i < a; i++) {
        var o = n[i],
          l = o.lengthOfLongestSequence,
          s = o.lastNumberInSequence;
        if (l >= 11 && 12 === s) return !0
      }
    return !1
  },
  _looksLikeYearField: function (e, r) {
    if (!this._isAutoFillableTextField(e) && !this._isAutoFillableSelectElement(e)) return !1;
    if (r && -1 !== r.indexOf("cc-exp-year")) return !0;
    if (null !== this._cachedElementPatternMatch(e, "_yearFieldPatternMatch", "yearFieldLabelPatternMatchers")) return !0;
    if ("select" !== this._getTagName(e).toLowerCase()) return !1;
    var t = selectElementOptionsSequenceAnalysis(e, "text"),
      n = t.lengthOfLongestSequence,
      a = t.lastNumberInSequence;
    return n >= e.options.length - 3 && 1e3 < a && a < 3e3
  },
  _looksLikeOneTimeCodeField: function (e, r, t, n, a) {
    if (!this._isAutoFillableTextField(e) && !this._isAutoFillableSelectElement(e)) return !1;
    if (r && -1 !== r.indexOf("one-time-code")) return !0;
    const i = e.type;
    if ("password" === i) {
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
    const s = "number" === i || "tel" === i,
      c = o ? parseInt(o) : void 0;
    if (1 === c && (s || t || n)) return !0;
    const u = null !== this._cachedElementPatternMatch(e, "_weakOneTimeCodePatternMatch", "weakOneTimeCodeFieldLabelPatternMatchers");
    if (s && u) return !0;
    const p = e.placeholder;
    if (p && u && /^[#]+$/.test(p.replace(/ /g, ""))) return !0;
    if ((4 === c || 6 === c) && u) return !0;
    if (7 === c && p && /\d{3} \d{3}/.test(p)) return !0;
    if (this._isAutofocusedTextField(e)) {
      if (u) return !0;
      if ("0" === e.min && "9" === e.max) return !0
    }
    if (a) {
      let r = 0;
      u && r++, t && r++, n && r++;
      const a = this._cachedOneTimeCodePatternMatcher(),
        i = this._logicalFormForControl(e);
      if (i) {
        const e = i.backingElement;
        if (e) {
          const t = e.querySelector("h1, h2, h3");
          t && this._matchPatternAgainstString(a, t.innerText) && r++
        }
      }
      if (r >= 2) return !0;
      const o = function (e) {
        if (this._matchPatternAgainstString(a, e)) return !0;
        const r = e.replaceAll("-", " ");
        return e !== r && this._matchPatternAgainstString(a, r)
      }.bind(this),
        l = window.location.protocol,
        s = "http:" === l || "https:" === l,
        c = lastPathComponentFromAnchor(window.location);
      if (s && c && o(c)) return !0;
      {
        const e = document.querySelector("link[rel=canonical]"),
          r = e ? lastPathComponentForURLString(e.href) : null;
        if (r && o(r)) return !0
      }
      if (this._matchFromPageScanBeforeElement(a, e, document.body)) return !0
    }
    return !1
  },
  _looksLikeIgnoredDataTypeField: function (e) {
    return !!this._isAutoFillableTextField(e) && null !== this._cachedElementPatternMatch(e, "_ignoredDataTypePatternMatch", "ignoredDataTypeFieldLabelPatternMatchers")
  },
  _collectTextSample: function (e) {
    if (!e) return "";
    var r, t = "",
      n = e;
    do {
      r = (t = n.innerText.replace(/\s+/g, " ").trim()).length, n = n.parentElement
    } while (r < 300 && n);
    return r > 300 && (t = t.substr(0, 300)), t
  },
  _explicitMaxLength: function (e) {
    var r = e.getAttribute("maxlength");
    return r ? parseInt(r) : void 0
  },
  _explicitMinLength: function (e) {
    let r = e.getAttribute("minlength");
    return r ? parseInt(r) : void 0
  },
  _observedMaxLength: function (e) {
    if ("password" !== e.type) return null;
    const r = e.getAttribute("ng-pattern");
    if (!r) return null;
    if (!r.startsWith("/") || !r.endsWith("/")) return null;
    let t;
    try {
      t = new RegExp(r.substr(1, r.length - 2))
    } catch (e) {
      return null
    }
    if (!t || "/(?:)/" === t.toString()) return null;
    let n, a = "a1Abbb",
      i = !1;
    for (; a.length <= 20;) {
      let e = t.test(a);
      if (i && !e) return n;
      e && (i = !0, n = a.length), a += "b"
    }
    return null
  },
  _collectControlMetadata: function (e, r, t, n, a, i, o) {
    var l = {
      ControlTagName: this._getTagName(e),
      ControlFieldName: this._getNameOrId(e),
      ControlUniqueID: this.controlUniqueID(e)
    };
    e === document.activeElement && (l.ControlIsActiveElement = !0), this._isAutoFilledTextField(e) && (l.ControlIsAutoFilledTextField = !0), e.disabled && (l.ControlIsDisabled = !0), e.readOnly && (l.ControlIsReadOnly = !0), this._isTextField(e) && (l.ControlIsTextField = !0), this._isSecureTextField(e) && (l.ControlIsSecureTextField = !0), this._isLabeledUsernameField(e) && (l.ControlIsLabeledUsernameField = !0), this._elementDisallowsAutocomplete(e) && (l.DisallowsAutocomplete = !0), this._isAutofocusedTextField(e) && (l.ControlIsAutofocusedTextField = !0);
    const s = e.className;
    s && s.length && (l.ControlFieldClass = s);
    const c = e.id;
    c && c.length && (l.ControlFieldID = c);
    const u = e.value;
    u && (l.ControlValue = u);
    const p = this._associatedUsernameForControl(e);
    p && (l.ControlAssociatedUsername = p);
    const d = e.maxLength;
    if (-1 !== d) l.ControlMaxLength = d;
    else {
      const r = this._observedMaxLength(e);
      r && (l.ControlMaxLength = r)
    }
    const f = this._explicitMinLength(e);
    f && f > 0 && (l.ControlMinLength = f);
    const m = e.size;
    m > 0 && (l.ControlSize = m), e.isVisible() && (l.IsVisible = !0);
    const v = this.controlCategory(e);
    v && v.length && (l.ControlCategory = v), isDateTimeInputElement(e) && (l.ControlRequiredFormatForDateTimeInput = this._requiredFormatForDateTimeInput[e.type]);
    var w = autocompleteTokens(e);
    if (w && (l.AutocompleteTokens = w, -1 !== w.indexOf("username") ? l.ControlClaimsToBeUsernameViaAutocompleteAttribute = !0 : -1 !== w.indexOf("current-password") ? l.ControlClaimsToBeCurrentPasswordViaAutocompleteAttribute = !0 : -1 !== w.indexOf("new-password") && (l.ControlClaimsToBeNewPasswordViaAutocompleteAttribute = !0)), this._looksLikePasswordCredentialField(e) && (l.ControlLooksLikePasswordCredentialField = !0, "function" == typeof this._collectExtraControlMetadata && this._collectExtraControlMetadata(e, l), l.IsVisible && !t && (l.IsVisible = !isElementPositionedToBeEffectivelyInvisible(e))), l.ControlIsActiveElement || 1 !== r) {
      const r = this._collectSelectElementInfo(e);
      r && (l.SelectElementInfo = r);
      var y = placeholderInfoForElement(e);
      y && !y.AttributeMatchedWasValue && (l.ControlPlaceholder = y.Text), this._looksLikeIgnoredDataTypeField(e) ? l.ControlLooksLikeIgnoredDataTypeField = !0 : this._looksLikeCreditCardCardholderField(e, w) ? l.ControlLooksLikeCreditCardCardholderField = !0 : this._looksLikeCreditCardNumberField(e, w) ? l.ControlLooksLikeCreditCardNumberField = !0 : this._looksLikeCreditCardSecurityCodeField(e, w) ? l.ControlLooksLikeCreditCardSecurityCodeField = !0 : this._looksLikeCreditCardTypeField(e, w) ? l.ControlLooksLikeCreditCardTypeField = !0 : this._looksLikeMonthField(e, w) ? l.ControlLooksLikeMonthField = !0 : this._looksLikeYearField(e, w) ? l.ControlLooksLikeYearField = !0 : this._looksLikeDayField(e) ? l.ControlLooksLikeDayField = !0 : this._looksLikeCreditCardCompositeExpirationDateField(e, w) && (l.ControlLooksLikeCreditCardCompositeExpirationDateField = !0)
    }
    if (l.ControlIsActiveElement || 2 === r || o) {
      let r = i && l.IsVisible;
      this._looksLikeOneTimeCodeField(e, w, n, a, r) && (l.ControlLooksLikeOneTimeCodeField = !0)
    }
    return 1 === r || l.ControlLooksLikeIgnoredDataTypeField || l.ControlIsSecureTextField || l.ControlLooksLikeCreditCardNumberField || l.ControlLooksLikeCreditCardSecurityCodeField || l.ControlLooksLikeCreditCardTypeField || (l.AddressBookLabel = this._addressBookLabelForElement(e)), l
  },
  _usesGeneratedPassword: function (e) {
    for (var r = !1, t = this._elementsWithGeneratedPasswords.length, n = 0; n < t; ++n) {
      var a = this._elementsWithGeneratedPasswords[n];
      if (e.containsControl(a)) {
        if (a.value !== this._generatedPasswords[n]) return !1;
        r = !0
      }
    }
    return r
  },
  _associatedUsernameForControl: function (e) {
    return this._isAutoFillableTextField(e) ? e.getAttribute("data-username") : null
  },
  _collectSelectElementInfo: function (e) {
    if (!this._isAutoFillableSelectElement(e)) return null;
    if (!e.options.length) return null;
    for (var r = [], t = e.options, n = t.length, a = 0; a < n; ++a) {
      var i = t[a];
      i.disabled || (i.label || i.text) && r.push([a, i.label ? i.label : i.text])
    }
    return r.length ? r : null
  },
  _stringsToInspectForDeterminingFormType: function (e) {
    let r = [],
      t = e.formElement,
      n = t.getAttribute("id"),
      a = t.getAttribute("name");
    n && r.push(n), a && r.push(a);
    let i = queryElementBySelector(t, "legend");
    1 === i.length && r.push(i[0].innerText);
    let o = 0;
    for (let e of this._forms) e.formElement.isVisible() && o++;
    if (1 === o && t.isVisible() && !t.ownerDocument.defaultView.frameElement && t.getBoundingClientRect().top < .8 * document.documentElement.clientHeight) {
      let e = documentTitleWithoutHostNamePrefix();
      e && r.push(e);
      const t = lastPathComponentFromAnchor(window.location);
      t && t.length && r.push(t)
    }
    let l = [];
    if (t.isVisible()) {
      let e = t.getBoundingClientRect(),
        n = !1;
      for (let a = 0, i = t; a <= 2 && i; ++a, i = i.parentElement) {
        let t = Array.prototype.slice.call(queryElementBySelector(i, "h1, h2, h3, [class*='header' i]")),
          a = [
            [],
            [],
            [],
            []
          ];
        for (headerElement of t) {
          let e = headerElement.tagName;
          "H1" === e ? a[0].push(headerElement) : "H2" === e ? a[1].push(headerElement) : "H3" === e ? a[2].push(headerElement) : a[3].push(headerElement)
        }
        let o = !0;
        for (headerElementsOfType of a) {
          let t = headerElementsOfType.length;
          if (0 === t) {
            o = !1;
            continue
          }
          if (t > 1) break;
          let a = headerElementsOfType[0];
          if (!a.isVisible()) break;
          let i = a.getBoundingClientRect();
          e.left <= i.left && i.right <= e.right && i.distanceToRect(e) < 100 && (r.push(a.innerText), n = !0);
          break
        }
        if (o) break
      }
      if (!n) {
        let t = queryElementBySelector(document.documentElement, "h1");
        if (1 === t.length) {
          let n = t[0],
            a = n.getBoundingClientRect();
          e.left <= a.left && a.right <= e.right && a.distanceToRect(e) < 100 && r.push(n.innerText)
        }
      }
      for (let r = 0, n = t; r <= 2 && n; ++r, n = n.parentElement) {
        let r = Array.prototype.slice.call(queryElementBySelector(n, "button, input[type=submit]")).filter((function (r) {
          if (!r.isVisible()) return !1;
          let n = r.getBoundingClientRect();
          return n.top > e.bottom && !t.contains(r) && e.left <= n.left && n.right <= e.right && n.distanceToRect(e) < 100
        }));
        if (r.length) {
          l = r;
          break
        }
      }
    }
    let s = !1,
      c = [],
      u = e.elements.concat(l);
    for (const e of u) {
      const t = e.type;
      "password" === t && (s = !0), "submit" !== t && "button" !== t || s && (e.isVisible() ? this._addInterestingStringsForButton(e, r) : c.push(e))
    }
    if (0 === r.length)
      for (control of c) this._addInterestingStringsForButton(control, r);
    return r
  },
  _addInterestingStringsForButton: function (e, r) {
    const t = e.getAttribute("id");
    t && r.push(t);
    const n = e.getAttribute("value");
    n && r.push(n);
    const a = e.innerText;
    a && a.length > 0 && r.push(a)
  },
  _autoFillFormTypeOfTypesUsingKeywordMatching: function (e, r, t, n) {
    for (var a = r.length, i = [], o = 0; o < a; ++o) {
      var l = (0, mapOfFormTypeToProducerOfAssociatedKeywords[r[o]])();
      i.push(l)
    }
    var s = this._stringsToInspectForDeterminingFormType(e),
      c = this._keywordsIndicatingNonAutoFillableFormType;
    c || (c = FormMetadataJSController.keywordsIndicatingNonAutoFillableFormType, this._keywordsIndicatingNonAutoFillableFormType = c);
    var u = c.length,
      p = [];
    for (o = 0; o < a; ++o) p.push(0);
    if (n)
      for (const [e, t] of Object.entries(n)) p[r.indexOf(parseInt(e))] += t;
    for (var d = s.length, f = 0; f < d; ++f) {
      for (var m = s[f].toLowerCase(), v = 0; v < u; ++v)
        if (-1 !== m.indexOf(c[v])) return 2;
      for (o = 0; o < a; ++o) {
        l = i[o];
        for (var w in l) - 1 !== m.indexOf(w) && (p[o] += l[w])
      }
    }
    for (let t = 0; t < a; ++t) {
      const n = this._mapOfFormTypeToExtraScoreProducer[r[t]];
      p[t] += n(e)
    }
    for (o = 0; o < a; ++o) 0 !== p[o] && 0;
    var y = formActionAsAnchorElement(e.formElement, !0);
    if (y) {
      var h = y.pathname.toLowerCase() + y.search.toLowerCase();
      for (o = 0; o < a; ++o) {
        l = i[o];
        for (var w in l) - 1 !== h.indexOf(w) && (p[o] += l[w])
      }
    }
    var M = [],
      E = 0;
    for (o = 0; o < a; ++o) {
      var S = p[o];
      S > 0 && (S >= E ? (E = S, M.unshift(o)) : M.push(o))
    }
    if (1 === M.length) return r[M[0]];
    if (M.length > 1) {
      var g = M[0];
      if (p[g] > p[M[1]]) return r[g]
    }
    return t
  },
  _matchesNonUsernameFieldLabelPattern: function (e) {
    if (this._nonUsernameFieldPatternMatchers || (this._nonUsernameFieldPatternMatchers = FormMetadataJSController.nonUsernameFieldLabelPatternMatchers), this._bestMatchForElement(e, this._nonUsernameFieldPatternMatchers)) return !0;
    const r = e.value;
    if (!e.id && !e.name && r && e.disabled)
      for (const e of this._nonUsernameFieldPatternMatchers)
        if (this._matchPatternAgainstString(e, r)) return !0;
    return !1
  },
  _matchSearchFieldLabelPattern: function (e) {
    if (this._searchFieldLabelPatternMatchers || (this._searchFieldLabelPatternMatchers = FormMetadataJSController.searchFieldLabelPatternMatchers), this._bestMatchForElement(e, this._searchFieldLabelPatternMatchers, !0)) return !0;
    const r = e.value;
    if (!e.id && !e.name && r && e.disabled)
      for (const e of this._searchFieldLabelPatternMatchers)
        if (this._matchPatternAgainstString(e, r)) return !0;
    return !1
  },
  _matchesNonEmailFieldLabelPattern: function (e) {
    return this._nonEmailFieldPatternMatchers || (this._nonEmailFieldPatternMatchers = FormMetadataJSController.nonEmailFieldLabelPatternMatchers), !!this._bestMatchForElement(e, this._nonEmailFieldPatternMatchers)
  },
  _scoreForUsernameFieldCandidateFromLabelingAndPositionOfField: function (e, r, t) {
    return this._isLabeledUsernameField(e) ? r ? 4 : 6 : this._isLabeledEmailField(e) && !this._matchesNonEmailFieldLabelPattern(e) ? r ? 3 : 5 : t ? 2 : 1
  },
  _scoreForUsernameFieldCandidate: function (e, r, t) {
    var n = this._scoreForUsernameFieldCandidateFromLabelingAndPositionOfField(e, r, t);
    return e.isVisible() && (n += .5), this._matchesNonUsernameFieldLabelPattern(e) && (n -= 2), this._matchSearchFieldLabelPattern(e) && (n -= 1.5), e.readOnly && (n -= .5), e.id || e.name || (n -= 1), n
  },
  _matchesPasswordFieldLabelPattern: function (e) {
    return this._passwordFieldPatternMatchers || (this._passwordFieldPatternMatchers = FormMetadataJSController.passwordFieldLabelPatternMatchers), !!this._bestMatchForElement(e, this._passwordFieldPatternMatchers)
  },
  _matchesConfirmPasswordFieldLabelPattern: function (e, r = !1) {
    return this._confirmPasswordFieldPatternMatchers || (this._confirmPasswordFieldPatternMatchers = FormMetadataJSController.confirmPasswordFieldLabelPatternMatchers), !!this._bestMatchForElement(e, this._confirmPasswordFieldPatternMatchers, r)
  },
  _matchesConfirmEmailFieldLabelPattern: function (e) {
    return !!this._isLabeledEmailField(e) && (this._confirmEmailFieldPatternMatchers || (this._confirmEmailFieldPatternMatchers = FormMetadataJSController.confirmEmailFieldLabelPatternMatchers), !!this._bestMatchForElement(e, this._confirmEmailFieldPatternMatchers))
  },
  _collectRadioButtonInfo: function (e, r) {
    var t = e.radioButtonsWithName(r),
      n = t.length;

    function addTrimmedStringToArray(e, r) {
      var t = e.trim();
      t && r.push(t)
    }

    function addImageInfoToRadioButtonInfo(e, r) {
      addTrimmedStringToArray(e.alt, r), addTrimmedStringToArray(e.title, r), addTrimmedStringToArray(lastPathComponentForURLString(e.src), r)
    }

    function radioButtonInfoFromLabelElement(e) {
      let r = [];
      addTrimmedStringToArray(e.innerText, r);
      let t = queryElementBySelector(e, "img"),
        n = t.length;
      for (let e = 0; e < n; ++e) addImageInfoToRadioButtonInfo(t[e], r);
      return r.length ? r : null
    }
    for (var a = !1, i = {}, o = 0; o < n; ++o) {
      i[(p = t[o]).value] = [p.value];
      for (var l = this._labelsForElement(p), s = l.length, c = 0; c < s; ++c) {
        a = !0;
        var u = radioButtonInfoFromLabelElement(l[c]);
        u && (i[p.value] = i[p.value].concat(u))
      }
    }
    if (a) return i;
    for (o = 0; o < n; ++o) {
      for (var p, d = "", f = (p = t[o]).traverseNextNode(); f && !this._isRenderedFormControl(f); f = f.traverseNextNode()) {
        var m = f.localName;
        if ("td" === m || "tr" === m || "ul" === m || "ol" === m || "dl" === m) break;
        if (f instanceof HTMLImageElement) addImageInfoToRadioButtonInfo(f, i[p.value]);
        else if (f.nodeType === Node.TEXT_NODE) {
          var v = f.nodeValue.trim();
          if (v && (d += v.substr(0, 64 - d.length)), d.length >= 64) break
        }
      }
      d && i[p.value].push(d)
    }
    return i
  },
  _bestUsernameFieldCandidate: function (e, r, t) {
    var n = r.FormControls,
      a = n.filter((function (e) {
        return e.ControlClaimsToBeUsernameViaAutocompleteAttribute
      }));
    if (1 === a.length) return a[0];
    for (var i = 0, o = [], l = !1, s = n.indexOf(t), c = n.length, u = 0; u < c; ++u) {
      var p = n[u];
      if (p === t) {
        l = !0;
        continue
      }
      if (!p.ControlIsTextField || p.ControlIsSecureTextField) continue;
      if (r.IsVisible && !n[u].IsVisible && !p.ControlValue) continue;
      const a = 100;
      let m = e[u];
      if (!(m.value.length > a)) {
        var d = u + 1 < c && u + 1 === s,
          f = this._scoreForUsernameFieldCandidate(m, l, d);
        f > i ? (o = [u], i = f) : f === i && o.push(u)
      }
    }
    var m = o.length;
    if (i < 3 && m > 1) return null;
    if (i < 1) return null;
    switch (m) {
      case 0:
        return null;
      case 1:
        return n[o[0]];
      default:
        var v = e[s].getBoundingClientRect(),
          w = {};
        return o.forEach((function (r) {
          w[r] = v.distanceToRect(e[r].getBoundingClientRect())
        })), n[o.sort((function (e, r) {
          return w[e] - w[r]
        }))[0]]
    }
  },
  _autoFillFormTypeFromCandidateFormTypes: function (e, r, t) {
    switch (r.length) {
      case 1:
        return r[0];
      case 2:
        return this._autoFillFormTypeOfTypesUsingKeywordMatching(e, [r[0], r[1]], t);
      default:
        return 1
    }
  },
  _shouldTrustElementThatClaimsToBeCurrentPasswordViaAutocompleteAttribute: function (e) {
    return !e.dataset.valRegexPattern
  },
  _identifyFormTypeAndPasswordFieldIndicesFromAutocompleteAttributes: function (e, r) {
    const t = [null, null];
    var n = r.length;
    if (n > 3) return t;
    for (var a = [], i = [], o = 0; o < n; ++o) {
      var l = r[o];
      l.ControlClaimsToBeCurrentPasswordViaAutocompleteAttribute && this._shouldTrustElementThatClaimsToBeCurrentPasswordViaAutocompleteAttribute(e[o]) ? a.push(o) : l.ControlClaimsToBeNewPasswordViaAutocompleteAttribute && i.push(o)
    }
    var s = a.length,
      c = i.length;
    if (s + c !== n) return t;
    switch (n) {
      case 0:
        return t;
      case 1:
        if (s) return [
          [3], {
            PasswordFieldIndex: a[0]
          }
        ];
        if (c) return [null, null, 4];
      case 2:
        if (1 === s && 1 === c) return [
          [5], {
            OldPasswordFieldIndex: a[0],
            PasswordFieldIndex: i[0]
          }
        ];
        if (0 === s && 2 === c) return [
          [4, 5], {
            PasswordFieldIndex: i[0],
            ConfirmationFieldIndex: i[1]
          }
        ];
        break;
      case 3:
        if (1 === s && 2 === c) return [
          [5], {
            OldPasswordFieldIndex: a[0],
            PasswordFieldIndex: i[0],
            ConfirmationFieldIndex: i[1]
          }
        ]
    }
    return t
  },
  _identifyPasswordFieldIndices: function (e, r) {
    var t = e.length;
    if (0 === t) return {};
    if (1 === t) return {
      PasswordFieldIndex: 0
    };
    if (this._oldPasswordPatternMatchers || (this._oldPasswordPatternMatchers = FormMetadataJSController.oldPasswordFieldLabelPatternMatchers), 2 === t) {
      return this._bestMatchForElement(r[0], this._oldPasswordPatternMatchers) ? {
        OldPasswordFieldIndex: 0,
        PasswordFieldIndex: 1
      } : this._bestMatchForElement(r[1], this._oldPasswordPatternMatchers) ? {
        OldPasswordFieldIndex: 1,
        PasswordFieldIndex: 0
      } : {
        PasswordFieldIndex: 0,
        ConfirmationFieldIndex: 1
      }
    }
    return this._bestMatchForElement(r[t - 1], this._oldPasswordPatternMatchers) ? {
      PasswordFieldIndex: t - 3,
      ConfirmationFieldIndex: t - 2,
      OldPasswordFieldIndex: t - 1
    } : {
      PasswordFieldIndex: t - 2,
      ConfirmationFieldIndex: t - 1,
      OldPasswordFieldIndex: t - 3
    }
  },
  _removePlaceholderTextForFormMetadata: function (e, r) {
    for (var t = e.length, n = 0; n < t; ++n) {
      var a = r.FormControls[n];
      if (a.ControlValue && a.ControlIsTextField && !a.ControlIsSecureTextField && !a.ControlIsReadOnly) {
        var i = legacyPlaceholderInfoForInputElement(e[n]);
        i && (i.AttributeMatchedWasValue && a.ControlUniqueID === r.UsernameElementUniqueID || (a.ControlValue = ""))
      }
    }
  },
  _isPasswordConfirmPair: function (e, r) {
    var t = this._matchesPasswordFieldLabelPattern(e),
      n = this._matchesConfirmPasswordFieldLabelPattern(r);
    return t && n
  },
  _trailingArgumentsForCollectControlMetadataFunction: function (e, r, t) {
    let n = isElementPositionedToBeEffectivelyInvisible(e.backingElement),
      a = !1,
      i = !1;
    if (document.activeElement || 2 === r) {
      let e = this._cachedOneTimeCodePatternMatcher();
      a = !!this._matchPatternAgainstString(e, documentTitleWithoutHostNamePrefix()), i = t && !!this._matchPatternAgainstString(e, t.pathname)
    }
    let o = !1;
    for (let r of e.elements)
      if (this._isTextField(r) && r.isVisible()) {
        if (o) {
          o = !1;
          break
        }
        o = !0
      }
    return [n, i, a, o]
  },
  _collectFormMetadata: function (e, r) {
    var t, n, a = (n = 0, {
      backwardScanCache: new WeakMap,
      forwardScanCache: new WeakMap,
      shouldUsePageScan: function () {
        return n < 40
      },
      willStartCollectingMetadataForControl: function () {
        t = null
      },
      reportPageScanUsedSuccessfully: function (e) {
        t = !(!e && !t)
      },
      didFinishCollectingMetadataForControl: function () {
        !0 === t ? n = 0 : !1 === t && n++
      }
    });
    this._pageScanContext = a;
    var i = e.formElement,
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
        IsVisible: i.isVisible(),
        TextSample: void 0,
        RequestType: r
      };
    this._elementDisallowsAutocomplete(i) && (o.DisallowsAutocomplete = !0), i instanceof HTMLFormElement && (o.FormIsSearchForm = this._isSearchForm(i, !0)), e.isAnnotated && (o.Annotations = e.annotations);
    var l = i.getAttribute("rel");
    l && "async" === l.toLowerCase() && (o.FormUsesRelAsync = !0);
    let s = formActionAsAnchorElement(i);
    if (s && s.href && (o.FormAction = s.href), 4 == r || 2 == r) {
      let e = selectorForElement(i);
      e && e.length && (o.LogicalFormElementSelector = e)
    }
    var c = e.elements,
      u = !c.some(this._isSecureTextField.bind(this));
    let [p, d, f, m] = this._trailingArgumentsForCollectControlMetadataFunction(e, r, s);
    var v = 0,
      w = !1,
      y = [],
      h = [],
      M = [],
      E = [],
      S = void 0,
      g = void 0,
      k = void 0,
      C = void 0,
      b = !1,
      F = !1,
      P = {},
      B = [];
    let _ = !1;
    for (var I = c.length, L = 0; L < I; ++L) {
      var T = c[L];
      if (u && !T.isVisible() && !T._relatesToCredentials) continue;
      var A = isRadioButtonElement(T),
        x = T.name;
      if (A && P[x]) continue;
      a.willStartCollectingMetadataForControl();
      const t = !_;
      var U = this._collectControlMetadata(T, r, p, d, f, m, t);
      if (a.didFinishCollectingMetadataForControl(), _ = !0, L + 1 < I && (U.ControlNextFieldUniqueID = this.controlUniqueID(c[L + 1])), o.FormControls.push(U), B.push(T), U.IsVisible || !o.IsVisible || T._relatesToCredentials)
        if (U.ControlIsActiveElement && (o.ContainsActiveElement = !0), x && A) P[x] = 1, U.ControlValue = "", U.RadioButtonInfo = this._collectRadioButtonInfo(e, x);
        else if (U.ControlIsTextField || U.SelectElementInfo)
          if (!F && U.ControlLooksLikeCreditCardSecurityCodeField && (F = !0), b || !U.ControlLooksLikeCreditCardCardholderField && !U.ControlLooksLikeCreditCardNumberField) {
            if (!(U.ControlLooksLikeDayField || U.ControlLooksLikeMonthField || U.ControlLooksLikeYearField || U.ControlLooksLikeCreditCardCompositeExpirationDateField)) {
              if (U.ControlLooksLikePasswordCredentialField) {
                if (U.ControlLooksLikeCreditCardSecurityCodeField || U.ControlLooksLikeIgnoredDataTypeField) continue;
                T.isHiddenFromAccessibilityTree() ? (M.push(T), E.push(U)) : (y.push(T), h.push(U))
              }
              if (this._isLabeledEmailField(T)) {
                if (++v > 2) {
                  w = !1;
                  continue
                }
                if (!(L + 1 < I && this._matchesConfirmEmailFieldLabelPattern(c[L + 1]))) continue;
                w = !0
              }
            }
          } else b = !0, o.FirstCreditCardCardholderFieldOrCreditCardNumberFieldUniqueID = U.ControlUniqueID
    } !y.length && M.length && (y = M, h = E);
    var O, N, D = this._identifyFormTypeAndPasswordFieldIndicesFromAutocompleteAttributes(y, h),
      R = D[0],
      q = D[1],
      z = D[2],
      j = q || this._identifyPasswordFieldIndices(h, y);
    if (void 0 !== j.PasswordFieldIndex && (S = h[j.PasswordFieldIndex], o.PasswordElementUniqueID = S.ControlUniqueID, g = this._explicitMaxLength(y[j.PasswordFieldIndex])), void 0 !== j.ConfirmationFieldIndex && (k = h[j.ConfirmationFieldIndex], o.ConfirmPasswordElementUniqueID = k.ControlUniqueID, C = this._explicitMaxLength(y[j.ConfirmationFieldIndex])), void 0 !== j.OldPasswordFieldIndex) {
      var V = h[j.OldPasswordFieldIndex];
      o.OldPasswordElementUniqueID = V.ControlUniqueID
    }
    if (S && (O = this._bestUsernameFieldCandidate(B, o, S)), O ? o.UsernameElementUniqueID = O.ControlUniqueID : N = this._findHiddenUsernameElement(e, o, B), R) o.AutoFillFormType = this._autoFillFormTypeFromCandidateFormTypes(e, R, R[0]);
    else if (1 === y.length && w) o.AutoFillFormType = this._autoFillFormTypeOfTypesUsingKeywordMatching(e, [4, 5], 4);
    else if (o.UsernameElementUniqueID) switch (y.length) {
      case 0:
        break;
      case 1:
        if (F && o.UsernameElementUniqueID === o.FirstCreditCardCardholderFieldOrCreditCardNumberFieldUniqueID && h[0].ControlLooksLikeCreditCardNumberField) break;
        if (this._matchesConfirmPasswordFieldLabelPattern(y[0])) o.AutoFillFormType = this._autoFillFormTypeOfTypesUsingKeywordMatching(e, [4, 5], z || 3);
        else {
          let r = y[0],
            t = {},
            n = 2 * this._numberOfForgotUserNameEmailOrPasswordAffordancesFollowingElement(r, i);
          n && (t[3] = n), o.AutoFillFormType = this._autoFillFormTypeOfTypesUsingKeywordMatching(e, [4, 3], z || 3, t)
        }
        break;
      case 2:
        g === C ? o.AutoFillFormType = this._autoFillFormTypeOfTypesUsingKeywordMatching(e, [4, 5], 4) : C ? this._isPasswordConfirmPair(y[0], y[1]) ? o.AutoFillFormType = this._autoFillFormTypeOfTypesUsingKeywordMatching(e, [4, 5], 2) : o.AutoFillFormType = 2 : o.AutoFillFormType = this._autoFillFormTypeOfTypesUsingKeywordMatching(e, [4, 5], 2);
        break;
      case 3:
        g === C || !C || this._isPasswordConfirmPair(y[j.PasswordFieldIndex], y[j.ConfirmationFieldIndex]) ? o.AutoFillFormType = 5 : o.AutoFillFormType = 2;
        break;
      default:
        o.AutoFillFormType = 2
    } else if (2 === y.length || 3 === y.length) g !== C && C ? 2 === y.length ? this._isPasswordConfirmPair(y[0], y[1]) ? o.AutoFillFormType = this._autoFillFormTypeOfTypesUsingKeywordMatching(e, [4, 5], 2) : o.AutoFillFormType = 2 : this._isPasswordConfirmPair(y[j.PasswordFieldIndex], y[j.ConfirmationFieldIndex]) ? o.AutoFillFormType = 5 : o.AutoFillFormType = 2 : o.AutoFillFormType = this._autoFillFormTypeOfTypesUsingKeywordMatching(e, [4, 5], 5);
    else if (1 === y.length) {
      var W = y[0];
      if (this._matchesConfirmPasswordFieldLabelPattern(W, !0)) o.AutoFillFormType = this._autoFillFormTypeOfTypesUsingKeywordMatching(e, [3, 5], 5);
      else if (this._matchesPasswordFieldLabelPattern(W))
        if (this._isElementFollowedByForgotPasswordAffordance(W, i)) o.AutoFillFormType = 3;
        else {
          var G = [4, 3, 5];
          o.AutoFillFormType = this._autoFillFormTypeOfTypesUsingKeywordMatching(e, G, 2), 2 === o.AutoFillFormType && N && (o.AutoFillFormType = 4)
        }
      else o.AutoFillFormType = 2
    } else 0 !== y.length && (o.AutoFillFormType = 2);
    if (1 === o.AutoFillFormType) {
      var H = null,
        J = null,
        X = 0,
        K = B.length;
      for (L = 0; L < K; ++L) {
        T = B[L];
        var Q = o.FormControls[L],
          $ = Q.IsVisible;
        if ($ && Q.ControlIsTextField && X++, X > 1) break;
        var Z = this._isLabeledEmailField(T);
        if ($ && (Q.ControlClaimsToBeUsernameViaAutocompleteAttribute || Q.ControlIsLabeledUsernameField || Z || this._isLabeledLoginField(T)) && !this._matchesNonUsernameFieldLabelPattern(T) && !this._matchSearchFieldLabelPattern(T) && !T.readOnly && "INPUT" === T.tagName && !this._isLabeledSignUpField(T)) {
          let r = {};
          this._isElementFollowedByForgotUserNameOrEmailAffordance(T, i) && (r[3] = 2), 3 === this._autoFillFormTypeOfTypesUsingKeywordMatching(e, [4, 3], Z ? 4 : 3, r) && (H = T, J = Q)
        }
        const r = Q.AutocompleteTokens;
        if (r) {
          const e = r.includes("username"),
            t = r.includes("webauthn");
          (e && t || (e || Z)) && (H = T, J = Q)
        }
      }
      1 === X && J && !controlAppearsToBePartOfPhotoTaggingInterface(H) && (o.AutoFillFormType = 3, o.UsernameElementUniqueID = J.ControlUniqueID)
    }
    4 === o.AutoFillFormType && o.FirstCreditCardCardholderFieldOrCreditCardNumberFieldUniqueID === o.UsernameElementUniqueID && (o.UsernameElementUniqueID = void 0), !o.UsernameElementUniqueID && N && this._extractMetadataForHiddenUsernameElement(N, o, B), 3 != o.AutoFillFormType && 4 != o.AutoFillFormType && 5 != o.AutoFillFormType && (o.UsernameElementUniqueID = void 0, o.OldPasswordElementUniqueID = void 0, o.PasswordElementUniqueID = void 0, o.ConfirmPasswordElementUniqueID = void 0), o.IsVisible || 3 == o.AutoFillFormType || 4 == o.AutoFillFormType || 5 == o.AutoFillFormType || (o.AutoFillFormType = 2), 1 !== r && (o.TextSample = this._collectTextSample(e._formElement)), o.FormIsEligibleForAutomaticLogin = this._formIsEligibleForAutomaticLogin(o, e.backingElement);
    for (let e of o.FormControls)
      if (e.ControlLooksLikeOneTimeCodeField && this._oneTimeCodeIsEligibleForAutomaticLogin(e, o)) {
        e.OneTimeCodeIsEligibleForAutomaticLogin = !0;
        break
      }
    var Y = FormMetadataJSController.shouldIncludeNonEmptyFields;
    if (o.IsVisible)
      for (L = (K = B.length) - 1; L >= 0; --L) this._shouldIncludeControlMetadata(Y, o, B[L], o.FormControls[L]) || (4 !== r ? (o.FormControls.splice(L, 1), B.splice(L, 1)) : o.FormControls[L].WOULD_NORMALLY_NOT_BE_SENT_TO_UI_PROCESS = !0);
    return this._removePlaceholderTextForFormMetadata(B, o), delete this._pageScanContext, o
  },
  _formIsEligibleForAutomaticLogin: function (e, r) {
    if (3 !== e.AutoFillFormType) return !1;
    let t = !1;
    for (const r of e.FormControls) {
      const n = r.ControlUniqueID;
      if (n === e.UsernameElementUniqueID || n === e.PasswordElementUniqueID) continue;
      if (r.ControlIsDisabled) continue;
      if (r.ControlIsReadOnly) continue;
      if (!r.IsVisible) continue;
      const a = this.formControlWithUniqueID(n);
      if (!a) continue;
      if (this._isTextArea(a)) return !1;
      if (this._isSelectElement(a)) return !1;
      if (this._isSubmitButton(a)) continue;
      if (this._looksLikeShowHidePasswordButton(a)) continue;
      if (!isInputElement(a)) continue;
      const i = a.type;
      if ("button" !== i && "reset" !== i && "submit" !== i) {
        if (!this._isCheckboxInputElement(a)) return !1;
        if (t) return !1;
        t = !0
      }
    }
    return !r || !r.querySelector("iframe[title*=captcha i]")
  },
  _oneTimeCodeIsEligibleForAutomaticLogin: function (e, r) {
    for (const e of r.FormControls) {
      if (e.ControlLooksLikeOneTimeCodeField) continue;
      if (e.ControlIsDisabled) continue;
      if (e.ControlIsReadOnly) continue;
      if (!e.IsVisible) continue;
      const r = this.formControlWithUniqueID(e.ControlUniqueID);
      if (!r) continue;
      if (this._isTextArea(r)) return !1;
      if (this._isSelectElement(r)) return !1;
      if (this._isSubmitButton(r)) continue;
      if (this._looksLikeShowHidePasswordButton(r)) continue;
      if (!isInputElement(r)) continue;
      const t = r.type;
      if ("button" !== t && "reset" !== t && "submit" !== t) return !1
    }
    return !0
  },
  _shouldIncludeControlMetadata: function (e, r, t, n) {
    if (t._relatesToCredentials) return !0;
    if (n.IsVisible) {
      if (formControlHasBeenClassifiedInAnInterestingWay(n)) return !0;
      if (e && n.ControlValue) return !0
    }
    return !(!r.UsernameElementUniqueID || n.ControlUniqueID !== r.UsernameElementUniqueID)
  },
  _isElementAHiddenUsername: function (e) {
    const r = /user|email/i;
    return "hidden" === e.type && (!(!r.test(e.getAttribute("id")) && !r.test(e.getAttribute("name"))) && !!isValidUsernameOrEmail(e.value))
  },
  _findHiddenUsernameElement: function (e, r, t) {
    var n = e.formElement;
    if (!(n instanceof HTMLElement)) return;
    let a = queryElementBySelector(n, "input"),
      i = a.length;
    for (let e = 0; e < i; ++e) {
      let r = a[e];
      if (this._isElementAHiddenUsername(r)) return r
    }
    return null
  },
  _extractMetadataForHiddenUsernameElement: function (e, r, t) {
    var n = {
      ControlTagName: this._getTagName(e),
      ControlFieldName: this._getNameOrId(e),
      ControlUniqueID: this.controlUniqueID(e),
      ControlIsReadOnly: !0,
      ControlValue: e.value
    };
    r.UsernameElementUniqueID = n.ControlUniqueID, r.FormControls.push(n), t.push(e)
  },
  _usernameFieldForPasswordField: function (e) {
    var r = FormMetadataJS._cachedMetadataForLogicalForm(this._logicalFormForControl(e));
    return r && r.UsernameElementUniqueID ? FormMetadataJS.formControlWithUniqueID(r.UsernameElementUniqueID) : null
  },
  _cachedMetadataForLogicalForm: function (e) {
    for (var r = -1, t = 0; t < this._forms.length; ++t)
      if (this._forms[t].formUniqueID === e.formUniqueID) {
        r = t;
        break
      }
    if (-1 === r) return null;
    var n = this._formMetadata[r],
      a = n.FormControls,
      i = a.length;
    for (t = 0; t < i; ++t) {
      var o = a[t],
        l = this.formControlWithUniqueID(o.ControlUniqueID);
      l && (o.ControlValue = l.value, o.ControlIsAutoFilledTextField = this._isAutoFilledTextField(l))
    }
    return n.UsesGeneratedPassword = this._usesGeneratedPassword(e), n.Annotations = e.annotations, n
  },
  _markFormIsBestForPageLevelAutoFill: function () {
    var e = this._indexOfFormWithHighestScoreIfGreaterThanZero((function (e) {
      var r = e.PasswordElementUniqueID ? 0 : -1;
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
      }(e.IsVisible) + r
    }));
    null !== e && (this._formMetadata[e].FormIsBestForPageLevelAutoFill = !0)
  },
  _markFormIsBestForStreamlinedLogin: function () {
    let e = this._indexOfFormWithHighestScoreIfGreaterThanZero((function (e, r) {
      if (!e.IsVisible) return 0;
      let t = r.getBoundingClientRect();
      if (!rectIsWithinDocumentViewport(t)) return 0;
      if (t.bottom + window.scrollY < 80) {
        let e = !(location.hash || location.pathname && "/" !== location.pathname || location.search),
          r = t.width / t.height;
        if (!e && r > 4) return 0
      }
      if (r.closest("footer")) return 0;
      let n = 3 === e.AutoFillFormType,
        a = 0,
        i = e.FormControls,
        o = i.length;
      for (var l = 0; l < o; ++l) {
        let r = i[l];
        if (n) {
          r.ControlIsAutofocusedTextField && (a += 1);
          let t = r.ControlUniqueID;
          if (t === e.UsernameElementUniqueID || t === e.PasswordElementUniqueID) {
            a += 10;
            continue
          }
        }
        r.OneTimeCodeIsEligibleForAutomaticLogin && (a += 5)
      }
      return a
    }));
    null !== e && (this._formMetadata[e].FormIsBestForStreamlinedLogin = !0)
  },
  _indexOfFormWithHighestScoreIfGreaterThanZero: function (e) {
    for (var r = null, t = null, n = this._formMetadata.length, a = 0; a < n; ++a) {
      var i = e(this._formMetadata[a], this._forms[a].backingElement);
      (null === t || i > t) && (r = a, t = i)
    }
    return t > 0 ? r : null
  },
  isAnyFormAnnotated: function () {
    var e = this._forms;
    if (!e) return !1;
    for (var r = e.length, t = 0; t < r; ++t)
      if (e[t].isAnnotated) return !0;
    return !1
  },
  _logicalFormWithID: function (e) {
    for (var r = this._forms, t = r.length, n = 0; n < t; ++n) {
      var a = r[n];
      if (a.formUniqueID === e) return a
    }
    return null
  },
  _indexOfLogicalFormWithID: function (e) {
    return this._forms.findIndex((function (r) {
      return r.formUniqueID === e
    }))
  },
  clearAnnotationsForFormWithID: function (e) {
    var r = this._logicalFormWithID(e);
    r && r.clearAnnotations()
  },
  annotateFormWithID: function (e, r) {
    var t = this._logicalFormWithID(e);
    t && t.annotate(r)
  },
  _collectMetadata: function (e) {
    var r = this._logicalFormsInPage(100, 10);
    this._forms = r, this._formMetadata = [];
    for (var t = r.length, n = 0; n < t; ++n) {
      2 === e && "function" == typeof willCollectFormMetadata && willCollectFormMetadata();
      let t = this._collectFormMetadata(r[n], e);
      2 === e && "function" == typeof evaluateCustomJavaScript && (t.ResultFromEvaluatingCustomJavaScript = evaluateCustomJavaScript(r[n], t)), this._formMetadata.push(t)
    }
    this._markFormIsBestForPageLevelAutoFill(), 0 !== e && this._markFormIsBestForStreamlinedLogin()
  },
  _collectAndCacheFormMetadata: function (e, r) {
    for (var t = this._collectFormMetadata(e, r), n = -1, a = this._forms.length, i = 0; i < a; ++i)
      if (this._forms[i].formUniqueID === e.formUniqueID) {
        n = i;
        break
      }
    return -1 === n ? (this._forms.push(e), this._formMetadata.push(t)) : this._formMetadata[n] = t, t
  },
  _metadataForFormWithID: function (e) {
    for (var r = 0; r < this._formMetadata.length; ++r) {
      var t = this._formMetadata[r];
      if (t.FormID == e) return t
    }
    return null
  },
  _recollectMetadataForFormWithID: function (e) {
    const r = this._logicalFormWithID(e);
    return r ? this._collectAndCacheFormMetadata(r, 0) : null
  },
  _fillControlWithGeneratedPassword: function (e, r) {
    var t = this._elementsWithGeneratedPasswords.indexOf(e); - 1 === t && (this._elementsWithGeneratedPasswords.push(e), t = this._elementsWithGeneratedPasswords.length - 1), this._generatedPasswords[t] = r, this._autoFillControlWithValue(e, r, !0)
  },
  fillFormWithPassword: function (e, r, t) {
    var n = this._metadataForFormWithID(e);
    if (null === n) return null;
    const a = n.PasswordElementUniqueID,
      i = a ? this.formControlWithUniqueID(a) : void 0,
      o = t ? this.formControlWithUniqueID(t) : void 0;
    var l = i || o;
    const s = a || t;
    if (!l) return null;
    this._fillControlWithGeneratedPassword(l, r);
    let c = n.ConfirmPasswordElementUniqueID;
    c || 5 !== n.AutoFillFormType && 4 !== n.AutoFillFormType || (c = (n = this._recollectMetadataForFormWithID(e) || n).ConfirmPasswordElementUniqueID);
    let u = c ? this.formControlWithUniqueID(c) : null;
    return u ? (this._fillControlWithGeneratedPassword(u, r), [s, c]) : [s]
  },
  fillFieldWithGeneratedPassword: function (e, r) {
    var t = this.formControlWithUniqueID(e);
    t && this._isTextField(t) && this._fillControlWithGeneratedPassword(t, r)
  },
  clearField: function (e) {
    var r = this.formControlWithUniqueID(e);
    this._clearFormField(r)
  },
  _clearFormField: function (e) {
    if (e)
      if (this._isSelectElement(e)) e.selectedIndex = 0;
      else if (isDateTimeInputElement(e)) e.value = "";
      else if (isRadioButtonElement(e)) {
        let r = this._logicalFormForControl(e).radioButtonsWithName(e.name),
          t = r.length;
        for (let e = 0; e < t; ++e) r[e].checked = !1
      } else if (this._isTextField(e) && e.value.length) {
        var r = e.matches(":focus");
        r || e.dispatchEvent(new Event("focus")), e.dispatchEvent(eventThatBubbles("keydown")), e.value = "", e.dispatchEvent(eventThatBubbles("input")), e.dispatchEvent(eventThatBubbles("keyup")), e.dispatchEvent(eventThatBubbles("change")), r || e.dispatchEvent(new Event("blur"))
      }
  },
  focusFormForStreamlinedLogin: function (e) {
    var r = this._metadataForFormWithID(e);
    if (null !== r) {
      var t = function uniqueControlIDToFocus(e) {
        for (const r of e.FormControls) {
          const t = r.ControlUniqueID;
          if (t === e.UsernameElementUniqueID || t === e.PasswordElementUniqueID || r.ControlLooksLikeOneTimeCodeField) return t
        }
      }(r);
      if (t) {
        var n = this.formControlWithUniqueID(t);
        rectIsWithinDocumentViewport(n.getBoundingClientRect()) && n.focus()
      }
    }
  },
  formsAndMetadata: function (e) {
    return visibilityCacheGeneration++, this._collectMetadata(e), [this._forms.map((function (e) {
      return e.formElement
    })), this._formMetadata]
  },
  formControlWithUniqueID: function (e) {
    return this._controlUniqueIDToControlMap[e]
  },
  formElementWithFormID: function (e) {
    for (var r = 0; r < this._formMetadata.length; ++r) {
      if (this._formMetadata[r].FormID === e) return this._forms[r].formElement
    }
    return null
  },
  selectIfTextField: function (e) {
    this._isTextField(e) && e.select()
  },
  _getOrCreateCachedMetadataForLogicalForm: function (e, r) {
    var t = this._cachedMetadataForLogicalForm(e);
    return !t || null != r && 1 === t.RequestType && 1 !== r ? this._collectAndCacheFormMetadata(e, r) : t
  },
  _getOrCreateLogicalFormForTextFieldOrSelectElement: function (e) {
    var r = this._indexInCacheOfLogicalFormContainingControl(e);
    if (-1 === r) r = this._forms.length;
    else
      for (var t = this._formMetadata[r].FormControls, n = t.length, a = e._controlUniqueID, i = 0; i < n; ++i)
        if (t[i].ControlUniqueID === a) return this._forms[r];
    var o = this._logicalFormsInPage(),
      l = o.length;
    for (i = 0; i < l; ++i) {
      var s = o[i];
      if (s.containsControl(e)) {
        var c = this._indexOfLogicalFormWithID(s.formUniqueID);
        return -1 !== c && (r = c), this._forms[r] = s, this._formMetadata[r] = this._collectFormMetadata(s, 0), this._forms[r]
      }
    }
    return null
  },
  _cachedMetadataForFormWithTextFieldOrSelectElement: function (e, r) {
    if (!this._isTextField(e) && !this._isSelectElement(e)) return null;
    var t = this._getOrCreateLogicalFormForTextFieldOrSelectElement(e);
    return t ? this._getOrCreateCachedMetadataForLogicalForm(t, r) : null
  },
  _isAnyPasswordElementUniqueID: function (e, r) {
    return e.PasswordElementUniqueID === r || e.ConfirmPasswordElementUniqueID === r || e.OldPasswordElementUniqueID === r
  },
  _isCurrentPasswordElementUniqueID: function (e, r) {
    switch (e.AutoFillFormType) {
      case 4:
      case 5:
        return e.OldPasswordElementUniqueID === r;
      default:
        return e.PasswordElementUniqueID === r
    }
  },
  _isNewPasswordElementUniqueID: function (e, r) {
    switch (e.AutoFillFormType) {
      case 4:
      case 5:
        return e.PasswordElementUniqueID === r || e.ConfirmPasswordElementUniqueID === r;
      default:
        return !1
    }
  },
  _updateAnnotationsForField: function (e) {
    var r = this._getOrCreateLogicalFormForTextFieldOrSelectElement(e);
    if (r) {
      var t = this._getOrCreateCachedMetadataForLogicalForm(r);
      if (t) {
        var n = e._controlUniqueID;
        this._isCurrentPasswordElementUniqueID(t, n) ? r.annotate({
          CurrentPassword: e.value
        }) : this._isNewPasswordElementUniqueID(t, n) ? r.annotate({
          NewPassword: e.value
        }) : t.UsernameElementUniqueID === n && r.annotate({
          Username: e.value
        }), isCredentialElementUniqueID(t, n) && (e._relatesToCredentials = "" !== e.value)
      }
    }
  },
  _removeUnparentedLogicalFormsFromCache() {
    for (let e = this._forms.length - 1; e >= 0; --e) this._forms[e].formElement.isConnected || (this._forms.splice(e, 1), this._formMetadata.splice(e, 1))
  },
  textFieldOrSelectElementMetadata: function (e, r) {
    visibilityCacheGeneration++, this._removeUnparentedLogicalFormsFromCache();
    var t = [null, null],
      n = this._cachedMetadataForFormWithTextFieldOrSelectElement(e, r);
    if (!n) return t;
    this._pageScanContext = {
      backwardScanCache: new WeakMap,
      forwardScanCache: new WeakMap
    };
    let a = this._logicalFormWithID(n.FormID),
      i = formActionAsAnchorElement(a.formElement),
      [o, l, s, c] = this._trailingArgumentsForCollectControlMetadataFunction(a, r, i);
    var u = this._collectControlMetadata(e, 0, o, l, s, c, !0);
    return delete this._pageScanContext, u.ControlLooksLikeOneTimeCodeField && this._oneTimeCodeIsEligibleForAutomaticLogin(u, n) && (u.OneTimeCodeIsEligibleForAutomaticLogin = !0), u.SelectionStart = e.selectionStart, u.SelectionLength = e.selectionEnd - e.selectionStart, 3 === r && (!n.UsernameElementUniqueID && this._isAnyPasswordElementUniqueID(n, u.ControlUniqueID) && a.isAnnotated && a.annotate({
      Username: null
    }), this._updateAnnotationsForField(e)), t[0] = u, t[1] = n, t
  },
  disableSpellCheckInFieldIfNeeded: function (e) {
    if (e) {
      var r = this.formControlWithUniqueID(e);
      r && this._isAutoFillableTextField(r) && FormMetadataJSController.setInputElementSpellCheckEnabled(r, !1)
    }
  },
  selectionRangeInField: function (e) {
    var r = this.formControlWithUniqueID(e);
    return r && this._isTextField(r) ? [r.selectionStart, r.selectionEnd - r.selectionStart] : null
  },
  setFormFieldSelection: function (e, r, t) {
    var n = this.formControlWithUniqueID(e);
    n && this._isTextField(n) && (n.selectionStart = r, n.selectionEnd = r + t)
  },
  replaceFormFieldRangeAndSelectTail: function (e, r, t, n, a) {
    var i = this.formControlWithUniqueID(e);
    if (i && this._isTextField(i)) {
      var o = i.value,
        l = o.substr(0, r) + n + o.substr(r + t);
      i.value = l, i.selectionStart = a, i.selectionEnd = l.length, i.dispatchEvent(eventThatBubbles("input")), i.dispatchEvent(eventThatBubbles("change"))
    }
  },
  _collectVisibleNonEmptyTextFieldsAndTextAreasInForm: function (e, r, t) {
    visibilityCacheGeneration++;
    for (var n = e.elements, a = n.length, i = 0; i < a; ++i) {
      var o = n[i];
      o.isVisible() && (null != o.value && o.value.length && (this._isTextField(o) ? r.push(o) : this._isTextArea(o) && t.push(o)))
    }
  },
  visibleNonEmptyFormTextControls: function () {
    var e = [],
      r = [];
    let t = queryElementBySelector(document, "form");
    for (let n = 0; n < t.length; ++n) this._collectVisibleNonEmptyTextFieldsAndTextAreasInForm(t[n], e, r);
    return [e, r]
  },
  visibleNonEmptyFormTextControlsInForm: function (e) {
    var r = [],
      t = [];
    return this._collectVisibleNonEmptyTextFieldsAndTextAreasInForm(e, r, t), [r, t]
  },
  _autoFillRadioButton: function (e, r, t) {
    for (var n = this._logicalFormForControl(e).radioButtonsWithName(e.name), a = n.length, i = 0; i < a; ++i) {
      var o = n[i];
      if (o.value === r) return o.dispatchEvent(eventThatBubbles("click")), o.checked = !0, void FormMetadataJSController.setInputElementAutofilled(o, t)
    }
  },
  _autoFillControlWithValueAndOptions: function (e, r, t, n, a) {
    isRadioButtonElement(e) ? this._autoFillRadioButton(e, r, n) : this._isSelectElement(e) ? this._autoFillSelectWithOptionIndex(e, r, n) : (t == ShouldFocusAndBlur.Yes && e.dispatchEvent(new Event("focus")), e.dispatchEvent(eventThatBubbles("keydown")), e.value = r, this._updateAnnotationsForField(e), e.dispatchEvent(eventThatBubbles("input")), e.dispatchEvent(eventThatBubbles("keyup")), e.dispatchEvent(eventThatBubbles("change")), t == ShouldFocusAndBlur.Yes && e.dispatchEvent(new Event("blur")), a ? FormMetadataJSController.setInputElementAutofilledAndObscured(e, r.length && n) : FormMetadataJSController.setInputElementAutofilled(e, r.length && n))
  },
  _autoFillControlWithValue: function (e, r, t, n) {
    this._autoFillControlWithValueAndOptions(e, r, ShouldFocusAndBlur.Yes, t, n)
  },
  _autoFillSelectWithOptionIndex: function (e, r, t) {
    e.dispatchEvent(eventThatBubbles("mousedown")), e.dispatchEvent(new Event("focus")), e.selectedIndex !== r && (e.selectedIndex = r, e.dispatchEvent(eventThatBubbles("input")), e.dispatchEvent(eventThatBubbles("change"))), e.dispatchEvent(eventThatBubbles("mouseup")), e.dispatchEvent(eventThatBubbles("click")), e.dispatchEvent(new Event("blur")), FormMetadataJSController.setInputElementAutofilled(e, t)
  },
  autoFillOneTimeCodeFieldsWithValue: function (e, r) {
    var t = document.activeElement;
    this._clearFormField(t);
    var n = e.split(""),
      a = n.length,
      i = function (e) {
        if (e >= a) FormMetadataJSController.finishedAutoFillingOneTimeCode(r);
        else {
          var t = document.activeElement,
            o = t.value + n[e];
          this._autoFillControlWithValueAndOptions(t, o, ShouldFocusAndBlur.No, !0, !1), setTimeout(i, 0, e + 1)
        }
      }.bind(this);
    i(0)
  },
  _removeGeneratedPasswordForElement: function (e) {
    let r = this._elementsWithGeneratedPasswords.indexOf(e); - 1 !== r && (this._elementsWithGeneratedPasswords.splice(r, 1), this._generatedPasswords.splice(r, 1))
  },
  _shouldSelectElementAfterFillingForm: function (e) {
    if (!/(^|\.)etrade\.com/.test(document.location.hostname)) return !0;
    var r = this._cachedMetadataForLogicalForm(e);
    return !r || 3 !== r.AutoFillFormType
  },
  autoFillControlsByID: function (e, r, t, n, a, i) {
    const o = arguments[arguments.length - 1];
    var l = n || document.activeElement,
      s = null;
    for (controlUniqueID in e) {
      s = this.formControlWithUniqueID(controlUniqueID)._logicalForm;
      break
    }
    var c = function () {
      a ? document.activeElement.blur() : this._shouldSelectElementAfterFillingForm(s) && this.selectIfTextField(l), FormMetadataJSController.finishedAutoFillingControlsInForm(this._getOrCreateCachedMetadataForLogicalForm(s), o)
    }.bind(this);
    if (r) {
      var u = [];
      for (var p in e) e.hasOwnProperty(p) && u.push([this.formControlWithUniqueID(p), e[p]]);
      this._synchronouslyAutoFillControls(u, t, c)
    } else this._asynchronouslyAutoFillControls(e, s, t, i, c)
  },
  _synchronouslyAutoFillControls: function (e, r, t) {
    for (var n = e.length, a = 0; a < n; ++a) {
      var i = e[a][0],
        o = e[a][1];
      this._autoFillControlWithValue(i, o, r)
    }
    t()
  },
  _asynchronouslyAutoFillControls: function (e, r, t, n, a) {
    var i = r.elements,
      o = i.length,
      l = function (r) {
        if (r >= o) a();
        else {
          var s = i[r],
            c = e[s._controlUniqueID];
          if (void 0 !== c) {
            let e = n.some((e => s._controlUniqueID.includes(e)));
            this._autoFillControlWithValue(s, c, t, e)
          }
          setTimeout(l, 0, r + 1)
        }
      }.bind(this);
    l(0)
  },
  _isInputAllowedInSearchForm: function (e, r) {
    var t = this._getTagName(e).toLowerCase();
    if ("button" === t || "fieldset" === t) return !0;
    if ("select" === t) return !r || isSelectInDefaultState(e);
    if ("input" !== t) return !1;
    var n = e.type;
    return "radio" === n || "checkbox" === n ? !r || isCheckboxOrRadioButtonInDefaultState(e) : "hidden" === n || "reset" === n || "submit" === n || "button" === n || this._isTextField(e) && !this._isSecureTextField(e)
  },
  _isSearchForm: function (e, r) {
    if ("get" !== e.method) return !1;
    for (var t = e.elements, n = t.length, a = 0; a < n; ++a)
      if (!this._isInputAllowedInSearchForm(t[a], r)) return !1;
    return !0
  },
  _shouldInputBeIncludedInSearchURLQuery: function (e) {
    if (e.disabled) return !1;
    if (!e.name.length) return !1;
    if (!e.value.length) return !1;
    if (this._isSelectElement(e)) return !0;
    var r = this._getTagName(e).toLowerCase(),
      t = e.type;
    return "button" === r ? "submit" === t : "input" === r && ("submit" === t || ("checkbox" === t || "radio" === t ? e.checked : "hidden" === t || this._isTextField(e)))
  },
  _isSubmitButton: function (e) {
    return (e instanceof HTMLButtonElement || e instanceof HTMLInputElement) && (e.type && "submit" === e.type)
  },
  _isCustomFormButton: function (e) {
    return "button" === e.type && (e instanceof HTMLButtonElement || e instanceof HTMLInputElement)
  },
  _isCheckboxInputElement: function (e) {
    return "checkbox" === e.type && e instanceof HTMLInputElement
  },
  _setQueryString: function (e, r) {
    var t = document.createElement("a");
    return t.href = e, t.search = r, t.href
  },
  searchTextFieldFormSubmissionURLString: function (e, r) {
    if (visibilityCacheGeneration++, !this._isTextField(e) || this._isSecureTextField(e) || !e.isVisible()) return null;
    var t = e.form;
    if (!t) return null;
    var n = t.getAttribute("action");
    if (!n || !n.length) return null;
    if (!/^https?:/i.test(t.action)) return null;
    if (!this._isSearchForm(t, r)) return null;
    for (var a = null, i = "", o = t.elements, l = o.length, s = 0; s < l; ++s) {
      var c = o[s];
      if ((c === e || this._shouldInputBeIncludedInSearchURLQuery(c)) && (!this._isSubmitButton(c) || (a || (a = c), c === a))) {
        i.length && (i += "&");
        var u = c === e ? "{searchTerms}" : urlEncode(c.value);
        i += urlEncode(c.name) + "=" + u
      }
    }
    return this._setQueryString(t.action, i)
  }
};
var FormMetadataJS = new FormMetadata;
! function webpackUniversalModuleDefinition(e, r) {
  "object" == typeof exports && "object" == typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define([], r) : "object" == typeof exports ? exports.jsQR = r() : e.jsQR = r()
}("undefined" != typeof self ? self : this, (function () {
  return function (e) {
    var r = {};

    function __webpack_require__(t) {
      if (r[t]) return r[t].exports;
      var n = r[t] = {
        i: t,
        l: !1,
        exports: {}
      };
      return e[t].call(n.exports, n, n.exports, __webpack_require__), n.l = !0, n.exports
    }
    return __webpack_require__.m = e, __webpack_require__.c = r, __webpack_require__.d = function (e, r, t) {
      __webpack_require__.o(e, r) || Object.defineProperty(e, r, {
        configurable: !1,
        enumerable: !0,
        get: t
      })
    }, __webpack_require__.n = function (e) {
      var r = e && e.__esModule ? function getDefault() {
        return e.default
      } : function getModuleExports() {
        return e
      };
      return __webpack_require__.d(r, "a", r), r
    }, __webpack_require__.o = function (e, r) {
      return Object.prototype.hasOwnProperty.call(e, r)
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 3)
  }([
    function (e, r, t) {
      "use strict";
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var n = function () {
        function BitMatrix(e, r) {
          this.width = r, this.height = e.length / r, this.data = e
        }
        return BitMatrix.createEmpty = function (e, r) {
          return new BitMatrix(new Uint8ClampedArray(e * r), e)
        }, BitMatrix.prototype.get = function (e, r) {
          return !(e < 0 || e >= this.width || r < 0 || r >= this.height) && !!this.data[r * this.width + e]
        }, BitMatrix.prototype.set = function (e, r, t) {
          this.data[r * this.width + e] = t ? 1 : 0
        }, BitMatrix.prototype.setRegion = function (e, r, t, n, a) {
          for (var i = r; i < r + n; i++)
            for (var o = e; o < e + t; o++) this.set(o, i, !!a)
        }, BitMatrix
      }();
      r.BitMatrix = n
    },
    function (e, r, t) {
      "use strict";
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var n = t(2);
      r.addOrSubtractGF = function addOrSubtractGF(e, r) {
        return e ^ r
      };
      var a = function () {
        function GenericGF(e, r, t) {
          this.primitive = e, this.size = r, this.generatorBase = t, this.expTable = new Array(this.size), this.logTable = new Array(this.size);
          for (var a = 1, i = 0; i < this.size; i++) this.expTable[i] = a, (a *= 2) >= this.size && (a = (a ^ this.primitive) & this.size - 1);
          for (i = 0; i < this.size - 1; i++) this.logTable[this.expTable[i]] = i;
          this.zero = new n.default(this, Uint8ClampedArray.from([0])), this.one = new n.default(this, Uint8ClampedArray.from([1]))
        }
        return GenericGF.prototype.multiply = function (e, r) {
          return 0 === e || 0 === r ? 0 : this.expTable[(this.logTable[e] + this.logTable[r]) % (this.size - 1)]
        }, GenericGF.prototype.inverse = function (e) {
          if (0 === e) throw new Error("Can't invert 0");
          return this.expTable[this.size - this.logTable[e] - 1]
        }, GenericGF.prototype.buildMonomial = function (e, r) {
          if (e < 0) throw new Error("Invalid monomial degree less than 0");
          if (0 === r) return this.zero;
          var t = new Uint8ClampedArray(e + 1);
          return t[0] = r, new n.default(this, t)
        }, GenericGF.prototype.log = function (e) {
          if (0 === e) throw new Error("Can't take log(0)");
          return this.logTable[e]
        }, GenericGF.prototype.exp = function (e) {
          return this.expTable[e]
        }, GenericGF
      }();
      r.default = a
    },
    function (e, r, t) {
      "use strict";
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var n = t(1),
        a = function () {
          function GenericGFPoly(e, r) {
            if (0 === r.length) throw new Error("No coefficients.");
            this.field = e;
            var t = r.length;
            if (t > 1 && 0 === r[0]) {
              for (var n = 1; n < t && 0 === r[n];) n++;
              if (n === t) this.coefficients = e.zero.coefficients;
              else {
                this.coefficients = new Uint8ClampedArray(t - n);
                for (var a = 0; a < this.coefficients.length; a++) this.coefficients[a] = r[n + a]
              }
            } else this.coefficients = r
          }
          return GenericGFPoly.prototype.degree = function () {
            return this.coefficients.length - 1
          }, GenericGFPoly.prototype.isZero = function () {
            return 0 === this.coefficients[0]
          }, GenericGFPoly.prototype.getCoefficient = function (e) {
            return this.coefficients[this.coefficients.length - 1 - e]
          }, GenericGFPoly.prototype.addOrSubtract = function (e) {
            var r;
            if (this.isZero()) return e;
            if (e.isZero()) return this;
            var t = this.coefficients,
              a = e.coefficients;
            t.length > a.length && (t = (r = [a, t])[0], a = r[1]);
            for (var i = new Uint8ClampedArray(a.length), o = a.length - t.length, l = 0; l < o; l++) i[l] = a[l];
            for (l = o; l < a.length; l++) i[l] = n.addOrSubtractGF(t[l - o], a[l]);
            return new GenericGFPoly(this.field, i)
          }, GenericGFPoly.prototype.multiply = function (e) {
            if (0 === e) return this.field.zero;
            if (1 === e) return this;
            for (var r = this.coefficients.length, t = new Uint8ClampedArray(r), n = 0; n < r; n++) t[n] = this.field.multiply(this.coefficients[n], e);
            return new GenericGFPoly(this.field, t)
          }, GenericGFPoly.prototype.multiplyPoly = function (e) {
            if (this.isZero() || e.isZero()) return this.field.zero;
            for (var r = this.coefficients, t = r.length, a = e.coefficients, i = a.length, o = new Uint8ClampedArray(t + i - 1), l = 0; l < t; l++)
              for (var s = r[l], c = 0; c < i; c++) o[l + c] = n.addOrSubtractGF(o[l + c], this.field.multiply(s, a[c]));
            return new GenericGFPoly(this.field, o)
          }, GenericGFPoly.prototype.multiplyByMonomial = function (e, r) {
            if (e < 0) throw new Error("Invalid degree less than 0");
            if (0 === r) return this.field.zero;
            for (var t = this.coefficients.length, n = new Uint8ClampedArray(t + e), a = 0; a < t; a++) n[a] = this.field.multiply(this.coefficients[a], r);
            return new GenericGFPoly(this.field, n)
          }, GenericGFPoly.prototype.evaluateAt = function (e) {
            var r = 0;
            if (0 === e) return this.getCoefficient(0);
            var t = this.coefficients.length;
            if (1 === e) return this.coefficients.forEach((function (e) {
              r = n.addOrSubtractGF(r, e)
            })), r;
            r = this.coefficients[0];
            for (var a = 1; a < t; a++) r = n.addOrSubtractGF(this.field.multiply(e, r), this.coefficients[a]);
            return r
          }, GenericGFPoly
        }();
      r.default = a
    },
    function (e, r, t) {
      "use strict";
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var n = t(4),
        a = t(5),
        i = t(11),
        o = t(12);

      function scan(e) {
        var r = o.locate(e);
        if (!r) return null;
        for (var t = 0, n = r; t < n.length; t++) {
          var l = n[t],
            s = i.extract(e, l),
            c = a.decode(s.matrix);
          if (c) return {
            binaryData: c.bytes,
            data: c.text,
            chunks: c.chunks,
            version: c.version,
            location: {
              topRightCorner: s.mappingFunction(l.dimension, 0),
              topLeftCorner: s.mappingFunction(0, 0),
              bottomRightCorner: s.mappingFunction(l.dimension, l.dimension),
              bottomLeftCorner: s.mappingFunction(0, l.dimension),
              topRightFinderPattern: l.topRight,
              topLeftFinderPattern: l.topLeft,
              bottomLeftFinderPattern: l.bottomLeft,
              bottomRightAlignmentPattern: l.alignmentPattern
            }
          }
        }
        return null
      }
      var l = {
        inversionAttempts: "attemptBoth"
      };

      function jsQR(e, r, t, a) {
        void 0 === a && (a = {});
        var i = l;
        Object.keys(i || {}).forEach((function (e) {
          i[e] = a[e] || i[e]
        }));
        var o = "attemptBoth" === i.inversionAttempts || "invertFirst" === i.inversionAttempts,
          s = "onlyInvert" === i.inversionAttempts || "invertFirst" === i.inversionAttempts,
          c = n.binarize(e, r, t, o),
          u = c.binarized,
          p = c.inverted,
          d = scan(s ? p : u);
        return d || "attemptBoth" !== i.inversionAttempts && "invertFirst" !== i.inversionAttempts || (d = scan(s ? u : p)), d
      }
      jsQR.default = jsQR, r.default = jsQR
    },
    function (e, r, t) {
      "use strict";
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var n = t(0);

      function numBetween(e, r, t) {
        return e < r ? r : e > t ? t : e
      }
      var a = function () {
        function Matrix(e, r) {
          this.width = e, this.data = new Uint8ClampedArray(e * r)
        }
        return Matrix.prototype.get = function (e, r) {
          return this.data[r * this.width + e]
        }, Matrix.prototype.set = function (e, r, t) {
          this.data[r * this.width + e] = t
        }, Matrix
      }();
      r.binarize = function binarize(e, r, t, i) {
        if (e.length !== r * t * 4) throw new Error("Malformed data passed to binarizer.");
        for (var o = new a(r, t), l = 0; l < r; l++)
          for (var s = 0; s < t; s++) {
            var c = e[4 * (s * r + l) + 0],
              u = e[4 * (s * r + l) + 1],
              p = e[4 * (s * r + l) + 2];
            o.set(l, s, .2126 * c + .7152 * u + .0722 * p)
          }
        for (var d = Math.ceil(r / 8), f = Math.ceil(t / 8), m = new a(d, f), v = 0; v < f; v++)
          for (var w = 0; w < d; w++) {
            var y = 0,
              h = 1 / 0,
              M = 0;
            for (s = 0; s < 8; s++)
              for (l = 0; l < 8; l++) {
                var E = o.get(8 * w + l, 8 * v + s);
                y += E, h = Math.min(h, E), M = Math.max(M, E)
              }
            var S = y / Math.pow(8, 2);
            if (M - h <= 24 && (S = h / 2, v > 0 && w > 0)) {
              var g = (m.get(w, v - 1) + 2 * m.get(w - 1, v) + m.get(w - 1, v - 1)) / 4;
              h < g && (S = g)
            }
            m.set(w, v, S)
          }
        var k = n.BitMatrix.createEmpty(r, t),
          C = null;
        for (i && (C = n.BitMatrix.createEmpty(r, t)), v = 0; v < f; v++)
          for (w = 0; w < d; w++) {
            for (var b = numBetween(w, 2, d - 3), F = numBetween(v, 2, f - 3), P = (y = 0, -2); P <= 2; P++)
              for (var B = -2; B <= 2; B++) y += m.get(b + P, F + B);
            var _ = y / 25;
            for (P = 0; P < 8; P++)
              for (B = 0; B < 8; B++) {
                l = 8 * w + P, s = 8 * v + B;
                var I = o.get(l, s);
                k.set(l, s, I <= _), i && C.set(l, s, !(I <= _))
              }
          }
        return i ? {
          binarized: k,
          inverted: C
        } : {
          binarized: k
        }
      }
    },
    function (e, r, t) {
      "use strict";
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var n = t(0),
        a = t(6),
        i = t(9),
        o = t(10);

      function numBitsDiffering(e, r) {
        for (var t = e ^ r, n = 0; t;) n++, t &= t - 1;
        return n
      }

      function pushBit(e, r) {
        return r << 1 | e
      }
      var l = [{
        bits: 21522,
        formatInfo: {
          errorCorrectionLevel: 1,
          dataMask: 0
        }
      }, {
        bits: 20773,
        formatInfo: {
          errorCorrectionLevel: 1,
          dataMask: 1
        }
      }, {
        bits: 24188,
        formatInfo: {
          errorCorrectionLevel: 1,
          dataMask: 2
        }
      }, {
        bits: 23371,
        formatInfo: {
          errorCorrectionLevel: 1,
          dataMask: 3
        }
      }, {
        bits: 17913,
        formatInfo: {
          errorCorrectionLevel: 1,
          dataMask: 4
        }
      }, {
        bits: 16590,
        formatInfo: {
          errorCorrectionLevel: 1,
          dataMask: 5
        }
      }, {
        bits: 20375,
        formatInfo: {
          errorCorrectionLevel: 1,
          dataMask: 6
        }
      }, {
        bits: 19104,
        formatInfo: {
          errorCorrectionLevel: 1,
          dataMask: 7
        }
      }, {
        bits: 30660,
        formatInfo: {
          errorCorrectionLevel: 0,
          dataMask: 0
        }
      }, {
        bits: 29427,
        formatInfo: {
          errorCorrectionLevel: 0,
          dataMask: 1
        }
      }, {
        bits: 32170,
        formatInfo: {
          errorCorrectionLevel: 0,
          dataMask: 2
        }
      }, {
        bits: 30877,
        formatInfo: {
          errorCorrectionLevel: 0,
          dataMask: 3
        }
      }, {
        bits: 26159,
        formatInfo: {
          errorCorrectionLevel: 0,
          dataMask: 4
        }
      }, {
        bits: 25368,
        formatInfo: {
          errorCorrectionLevel: 0,
          dataMask: 5
        }
      }, {
        bits: 27713,
        formatInfo: {
          errorCorrectionLevel: 0,
          dataMask: 6
        }
      }, {
        bits: 26998,
        formatInfo: {
          errorCorrectionLevel: 0,
          dataMask: 7
        }
      }, {
        bits: 5769,
        formatInfo: {
          errorCorrectionLevel: 3,
          dataMask: 0
        }
      }, {
        bits: 5054,
        formatInfo: {
          errorCorrectionLevel: 3,
          dataMask: 1
        }
      }, {
        bits: 7399,
        formatInfo: {
          errorCorrectionLevel: 3,
          dataMask: 2
        }
      }, {
        bits: 6608,
        formatInfo: {
          errorCorrectionLevel: 3,
          dataMask: 3
        }
      }, {
        bits: 1890,
        formatInfo: {
          errorCorrectionLevel: 3,
          dataMask: 4
        }
      }, {
        bits: 597,
        formatInfo: {
          errorCorrectionLevel: 3,
          dataMask: 5
        }
      }, {
        bits: 3340,
        formatInfo: {
          errorCorrectionLevel: 3,
          dataMask: 6
        }
      }, {
        bits: 2107,
        formatInfo: {
          errorCorrectionLevel: 3,
          dataMask: 7
        }
      }, {
        bits: 13663,
        formatInfo: {
          errorCorrectionLevel: 2,
          dataMask: 0
        }
      }, {
        bits: 12392,
        formatInfo: {
          errorCorrectionLevel: 2,
          dataMask: 1
        }
      }, {
        bits: 16177,
        formatInfo: {
          errorCorrectionLevel: 2,
          dataMask: 2
        }
      }, {
        bits: 14854,
        formatInfo: {
          errorCorrectionLevel: 2,
          dataMask: 3
        }
      }, {
        bits: 9396,
        formatInfo: {
          errorCorrectionLevel: 2,
          dataMask: 4
        }
      }, {
        bits: 8579,
        formatInfo: {
          errorCorrectionLevel: 2,
          dataMask: 5
        }
      }, {
        bits: 11994,
        formatInfo: {
          errorCorrectionLevel: 2,
          dataMask: 6
        }
      }, {
        bits: 11245,
        formatInfo: {
          errorCorrectionLevel: 2,
          dataMask: 7
        }
      }],
        s = [
          function (e) {
            return (e.y + e.x) % 2 == 0
          },
          function (e) {
            return e.y % 2 == 0
          },
          function (e) {
            return e.x % 3 == 0
          },
          function (e) {
            return (e.y + e.x) % 3 == 0
          },
          function (e) {
            return (Math.floor(e.y / 2) + Math.floor(e.x / 3)) % 2 == 0
          },
          function (e) {
            return e.x * e.y % 2 + e.x * e.y % 3 == 0
          },
          function (e) {
            return (e.y * e.x % 2 + e.y * e.x % 3) % 2 == 0
          },
          function (e) {
            return ((e.y + e.x) % 2 + e.y * e.x % 3) % 2 == 0
          }
        ];

      function readCodewords(e, r, t) {
        for (var a = s[t.dataMask], i = e.height, o = function buildFunctionPatternMask(e) {
          var r = 17 + 4 * e.versionNumber,
            t = n.BitMatrix.createEmpty(r, r);
          t.setRegion(0, 0, 9, 9, !0), t.setRegion(r - 8, 0, 8, 9, !0), t.setRegion(0, r - 8, 9, 8, !0);
          for (var a = 0, i = e.alignmentPatternCenters; a < i.length; a++)
            for (var o = i[a], l = 0, s = e.alignmentPatternCenters; l < s.length; l++) {
              var c = s[l];
              6 === o && 6 === c || 6 === o && c === r - 7 || o === r - 7 && 6 === c || t.setRegion(o - 2, c - 2, 5, 5, !0)
            }
          return t.setRegion(6, 9, 1, r - 17, !0), t.setRegion(9, 6, r - 17, 1, !0), e.versionNumber > 6 && (t.setRegion(r - 11, 0, 3, 6, !0), t.setRegion(0, r - 11, 6, 3, !0)), t
        }(r), l = [], c = 0, u = 0, p = !0, d = i - 1; d > 0; d -= 2) {
          6 === d && d--;
          for (var f = 0; f < i; f++)
            for (var m = p ? i - 1 - f : f, v = 0; v < 2; v++) {
              var w = d - v;
              if (!o.get(w, m)) {
                u++;
                var y = e.get(w, m);
                a({
                  y: m,
                  x: w
                }) && (y = !y), c = pushBit(y, c), 8 === u && (l.push(c), u = 0, c = 0)
              }
            }
          p = !p
        }
        return l
      }

      function decodeMatrix(e) {
        var r = function readVersion(e) {
          var r = e.height,
            t = Math.floor((r - 17) / 4);
          if (t <= 6) return o.VERSIONS[t - 1];
          for (var n = 0, a = 5; a >= 0; a--)
            for (var i = r - 9; i >= r - 11; i--) n = pushBit(e.get(i, a), n);
          var l = 0;
          for (i = 5; i >= 0; i--)
            for (a = r - 9; a >= r - 11; a--) l = pushBit(e.get(i, a), l);
          for (var s, c = 1 / 0, u = 0, p = o.VERSIONS; u < p.length; u++) {
            var d = p[u];
            if (d.infoBits === n || d.infoBits === l) return d;
            var f = numBitsDiffering(n, d.infoBits);
            f < c && (s = d, c = f), (f = numBitsDiffering(l, d.infoBits)) < c && (s = d, c = f)
          }
          return c <= 3 ? s : void 0
        }(e);
        if (!r) return null;
        var t = function readFormatInformation(e) {
          for (var r = 0, t = 0; t <= 8; t++) 6 !== t && (r = pushBit(e.get(t, 8), r));
          for (var n = 7; n >= 0; n--) 6 !== n && (r = pushBit(e.get(8, n), r));
          var a = e.height,
            i = 0;
          for (n = a - 1; n >= a - 7; n--) i = pushBit(e.get(8, n), i);
          for (t = a - 8; t < a; t++) i = pushBit(e.get(t, 8), i);
          for (var o = 1 / 0, s = null, c = 0, u = l; c < u.length; c++) {
            var p = u[c],
              d = p.bits,
              f = p.formatInfo;
            if (d === r || d === i) return f;
            var m = numBitsDiffering(r, d);
            m < o && (s = f, o = m), r !== i && (m = numBitsDiffering(i, d)) < o && (s = f, o = m)
          }
          return o <= 3 ? s : null
        }(e);
        if (!t) return null;
        var n = function getDataBlocks(e, r, t) {
          var n = r.errorCorrectionLevels[t],
            a = [],
            i = 0;
          if (n.ecBlocks.forEach((function (e) {
            for (var r = 0; r < e.numBlocks; r++) a.push({
              numDataCodewords: e.dataCodewordsPerBlock,
              codewords: []
            }), i += e.dataCodewordsPerBlock + n.ecCodewordsPerBlock
          })), e.length < i) return null;
          e = e.slice(0, i);
          for (var o = n.ecBlocks[0].dataCodewordsPerBlock, l = 0; l < o; l++)
            for (var s = 0, c = a; s < c.length; s++) c[s].codewords.push(e.shift());
          if (n.ecBlocks.length > 1) {
            var u = n.ecBlocks[0].numBlocks,
              p = n.ecBlocks[1].numBlocks;
            for (l = 0; l < p; l++) a[u + l].codewords.push(e.shift())
          }
          for (; e.length > 0;)
            for (var d = 0, f = a; d < f.length; d++) f[d].codewords.push(e.shift());
          return a
        }(readCodewords(e, r, t), r, t.errorCorrectionLevel);
        if (!n) return null;
        for (var s = n.reduce((function (e, r) {
          return e + r.numDataCodewords
        }), 0), c = new Uint8ClampedArray(s), u = 0, p = 0, d = n; p < d.length; p++) {
          var f = d[p],
            m = i.decode(f.codewords, f.codewords.length - f.numDataCodewords);
          if (!m) return null;
          for (var v = 0; v < f.numDataCodewords; v++) c[u++] = m[v]
        }
        try {
          return a.decode(c, r.versionNumber)
        } catch (e) {
          return null
        }
      }
      r.decode = function decode(e) {
        if (null == e) return null;
        var r = decodeMatrix(e);
        if (r) return r;
        for (var t = 0; t < e.width; t++)
          for (var n = t + 1; n < e.height; n++) e.get(t, n) !== e.get(n, t) && (e.set(t, n, !e.get(t, n)), e.set(n, t, !e.get(n, t)));
        return decodeMatrix(e)
      }
    },
    function (e, r, t) {
      "use strict";
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var n, a, i = t(7),
        o = t(8);

      function decodeNumeric(e, r) {
        for (var t = [], n = "", a = [10, 12, 14][r], i = e.readBits(a); i >= 3;) {
          if ((c = e.readBits(10)) >= 1e3) throw new Error("Invalid numeric value above 999");
          var o = Math.floor(c / 100),
            l = Math.floor(c / 10) % 10,
            s = c % 10;
          t.push(48 + o, 48 + l, 48 + s), n += o.toString() + l.toString() + s.toString(), i -= 3
        }
        if (2 === i) {
          if ((c = e.readBits(7)) >= 100) throw new Error("Invalid numeric value above 99");
          o = Math.floor(c / 10), l = c % 10;
          t.push(48 + o, 48 + l), n += o.toString() + l.toString()
        } else if (1 === i) {
          var c;
          if ((c = e.readBits(4)) >= 10) throw new Error("Invalid numeric value above 9");
          t.push(48 + c), n += c.toString()
        }
        return {
          bytes: t,
          text: n
        }
      } ! function (e) {
        e.Numeric = "numeric", e.Alphanumeric = "alphanumeric", e.Byte = "byte", e.Kanji = "kanji", e.ECI = "eci"
      }(n = r.Mode || (r.Mode = {})),
        function (e) {
          e[e.Terminator = 0] = "Terminator", e[e.Numeric = 1] = "Numeric", e[e.Alphanumeric = 2] = "Alphanumeric", e[e.Byte = 4] = "Byte", e[e.Kanji = 8] = "Kanji", e[e.ECI = 7] = "ECI"
        }(a || (a = {}));
      var l = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", "$", "%", "*", "+", "-", ".", "/", ":"];

      function decodeAlphanumeric(e, r) {
        for (var t = [], n = "", a = [9, 11, 13][r], i = e.readBits(a); i >= 2;) {
          var o = e.readBits(11),
            s = Math.floor(o / 45),
            c = o % 45;
          t.push(l[s].charCodeAt(0), l[c].charCodeAt(0)), n += l[s] + l[c], i -= 2
        }
        if (1 === i) {
          s = e.readBits(6);
          t.push(l[s].charCodeAt(0)), n += l[s]
        }
        return {
          bytes: t,
          text: n
        }
      }

      function decodeByte(e, r) {
        for (var t = [], n = "", a = [8, 16, 16][r], i = e.readBits(a), o = 0; o < i; o++) {
          var l = e.readBits(8);
          t.push(l)
        }
        try {
          n += decodeURIComponent(t.map((function (e) {
            return "%" + ("0" + e.toString(16)).substr(-2)
          })).join(""))
        } catch (e) { }
        return {
          bytes: t,
          text: n
        }
      }

      function decodeKanji(e, r) {
        for (var t = [], n = "", a = [8, 10, 12][r], i = e.readBits(a), l = 0; l < i; l++) {
          var s = e.readBits(13),
            c = Math.floor(s / 192) << 8 | s % 192;
          c += c < 7936 ? 33088 : 49472, t.push(c >> 8, 255 & c), n += String.fromCharCode(o.shiftJISTable[c])
        }
        return {
          bytes: t,
          text: n
        }
      }
      r.decode = function decode(e, r) {
        for (var t, o, l, s, c = new i.BitStream(e), u = r <= 9 ? 0 : r <= 26 ? 1 : 2, p = {
          text: "",
          bytes: [],
          chunks: [],
          version: r
        }; c.available() >= 4;) {
          var d = c.readBits(4);
          if (d === a.Terminator) return p;
          if (d === a.ECI) 0 === c.readBits(1) ? p.chunks.push({
            type: n.ECI,
            assignmentNumber: c.readBits(7)
          }) : 0 === c.readBits(1) ? p.chunks.push({
            type: n.ECI,
            assignmentNumber: c.readBits(14)
          }) : 0 === c.readBits(1) ? p.chunks.push({
            type: n.ECI,
            assignmentNumber: c.readBits(21)
          }) : p.chunks.push({
            type: n.ECI,
            assignmentNumber: -1
          });
          else if (d === a.Numeric) {
            var f = decodeNumeric(c, u);
            p.text += f.text, (t = p.bytes).push.apply(t, f.bytes), p.chunks.push({
              type: n.Numeric,
              text: f.text
            })
          } else if (d === a.Alphanumeric) {
            var m = decodeAlphanumeric(c, u);
            p.text += m.text, (o = p.bytes).push.apply(o, m.bytes), p.chunks.push({
              type: n.Alphanumeric,
              text: m.text
            })
          } else if (d === a.Byte) {
            var v = decodeByte(c, u);
            p.text += v.text, (l = p.bytes).push.apply(l, v.bytes), p.chunks.push({
              type: n.Byte,
              bytes: v.bytes,
              text: v.text
            })
          } else if (d === a.Kanji) {
            var w = decodeKanji(c, u);
            p.text += w.text, (s = p.bytes).push.apply(s, w.bytes), p.chunks.push({
              type: n.Kanji,
              bytes: w.bytes,
              text: w.text
            })
          }
        }
        if (0 === c.available() || 0 === c.readBits(c.available())) return p
      }
    },
    function (e, r, t) {
      "use strict";
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var n = function () {
        function BitStream(e) {
          this.byteOffset = 0, this.bitOffset = 0, this.bytes = e
        }
        return BitStream.prototype.readBits = function (e) {
          if (e < 1 || e > 32 || e > this.available()) throw new Error("Cannot read " + e.toString() + " bits");
          var r = 0;
          if (this.bitOffset > 0) {
            var t = 8 - this.bitOffset,
              n = e < t ? e : t,
              a = 255 >> 8 - n << (i = t - n);
            r = (this.bytes[this.byteOffset] & a) >> i, e -= n, this.bitOffset += n, 8 === this.bitOffset && (this.bitOffset = 0, this.byteOffset++)
          }
          if (e > 0) {
            for (; e >= 8;) r = r << 8 | 255 & this.bytes[this.byteOffset], this.byteOffset++, e -= 8;
            if (e > 0) {
              var i;
              a = 255 >> (i = 8 - e) << i;
              r = r << e | (this.bytes[this.byteOffset] & a) >> i, this.bitOffset += e
            }
          }
          return r
        }, BitStream.prototype.available = function () {
          return 8 * (this.bytes.length - this.byteOffset) - this.bitOffset
        }, BitStream
      }();
      r.BitStream = n
    },
    function (e, r, t) {
      "use strict";
      Object.defineProperty(r, "__esModule", {
        value: !0
      }), r.shiftJISTable = {
        32: 32,
        33: 33,
        34: 34,
        35: 35,
        36: 36,
        37: 37,
        38: 38,
        39: 39,
        40: 40,
        41: 41,
        42: 42,
        43: 43,
        44: 44,
        45: 45,
        46: 46,
        47: 47,
        48: 48,
        49: 49,
        50: 50,
        51: 51,
        52: 52,
        53: 53,
        54: 54,
        55: 55,
        56: 56,
        57: 57,
        58: 58,
        59: 59,
        60: 60,
        61: 61,
        62: 62,
        63: 63,
        64: 64,
        65: 65,
        66: 66,
        67: 67,
        68: 68,
        69: 69,
        70: 70,
        71: 71,
        72: 72,
        73: 73,
        74: 74,
        75: 75,
        76: 76,
        77: 77,
        78: 78,
        79: 79,
        80: 80,
        81: 81,
        82: 82,
        83: 83,
        84: 84,
        85: 85,
        86: 86,
        87: 87,
        88: 88,
        89: 89,
        90: 90,
        91: 91,
        92: 165,
        93: 93,
        94: 94,
        95: 95,
        96: 96,
        97: 97,
        98: 98,
        99: 99,
        100: 100,
        101: 101,
        102: 102,
        103: 103,
        104: 104,
        105: 105,
        106: 106,
        107: 107,
        108: 108,
        109: 109,
        110: 110,
        111: 111,
        112: 112,
        113: 113,
        114: 114,
        115: 115,
        116: 116,
        117: 117,
        118: 118,
        119: 119,
        120: 120,
        121: 121,
        122: 122,
        123: 123,
        124: 124,
        125: 125,
        126: 8254,
        33088: 12288,
        33089: 12289,
        33090: 12290,
        33091: 65292,
        33092: 65294,
        33093: 12539,
        33094: 65306,
        33095: 65307,
        33096: 65311,
        33097: 65281,
        33098: 12443,
        33099: 12444,
        33100: 180,
        33101: 65344,
        33102: 168,
        33103: 65342,
        33104: 65507,
        33105: 65343,
        33106: 12541,
        33107: 12542,
        33108: 12445,
        33109: 12446,
        33110: 12291,
        33111: 20189,
        33112: 12293,
        33113: 12294,
        33114: 12295,
        33115: 12540,
        33116: 8213,
        33117: 8208,
        33118: 65295,
        33119: 92,
        33120: 12316,
        33121: 8214,
        33122: 65372,
        33123: 8230,
        33124: 8229,
        33125: 8216,
        33126: 8217,
        33127: 8220,
        33128: 8221,
        33129: 65288,
        33130: 65289,
        33131: 12308,
        33132: 12309,
        33133: 65339,
        33134: 65341,
        33135: 65371,
        33136: 65373,
        33137: 12296,
        33138: 12297,
        33139: 12298,
        33140: 12299,
        33141: 12300,
        33142: 12301,
        33143: 12302,
        33144: 12303,
        33145: 12304,
        33146: 12305,
        33147: 65291,
        33148: 8722,
        33149: 177,
        33150: 215,
        33152: 247,
        33153: 65309,
        33154: 8800,
        33155: 65308,
        33156: 65310,
        33157: 8806,
        33158: 8807,
        33159: 8734,
        33160: 8756,
        33161: 9794,
        33162: 9792,
        33163: 176,
        33164: 8242,
        33165: 8243,
        33166: 8451,
        33167: 65509,
        33168: 65284,
        33169: 162,
        33170: 163,
        33171: 65285,
        33172: 65283,
        33173: 65286,
        33174: 65290,
        33175: 65312,
        33176: 167,
        33177: 9734,
        33178: 9733,
        33179: 9675,
        33180: 9679,
        33181: 9678,
        33182: 9671,
        33183: 9670,
        33184: 9633,
        33185: 9632,
        33186: 9651,
        33187: 9650,
        33188: 9661,
        33189: 9660,
        33190: 8251,
        33191: 12306,
        33192: 8594,
        33193: 8592,
        33194: 8593,
        33195: 8595,
        33196: 12307,
        33208: 8712,
        33209: 8715,
        33210: 8838,
        33211: 8839,
        33212: 8834,
        33213: 8835,
        33214: 8746,
        33215: 8745,
        33224: 8743,
        33225: 8744,
        33226: 172,
        33227: 8658,
        33228: 8660,
        33229: 8704,
        33230: 8707,
        33242: 8736,
        33243: 8869,
        33244: 8978,
        33245: 8706,
        33246: 8711,
        33247: 8801,
        33248: 8786,
        33249: 8810,
        33250: 8811,
        33251: 8730,
        33252: 8765,
        33253: 8733,
        33254: 8757,
        33255: 8747,
        33256: 8748,
        33264: 8491,
        33265: 8240,
        33266: 9839,
        33267: 9837,
        33268: 9834,
        33269: 8224,
        33270: 8225,
        33271: 182,
        33276: 9711,
        33359: 65296,
        33360: 65297,
        33361: 65298,
        33362: 65299,
        33363: 65300,
        33364: 65301,
        33365: 65302,
        33366: 65303,
        33367: 65304,
        33368: 65305,
        33376: 65313,
        33377: 65314,
        33378: 65315,
        33379: 65316,
        33380: 65317,
        33381: 65318,
        33382: 65319,
        33383: 65320,
        33384: 65321,
        33385: 65322,
        33386: 65323,
        33387: 65324,
        33388: 65325,
        33389: 65326,
        33390: 65327,
        33391: 65328,
        33392: 65329,
        33393: 65330,
        33394: 65331,
        33395: 65332,
        33396: 65333,
        33397: 65334,
        33398: 65335,
        33399: 65336,
        33400: 65337,
        33401: 65338,
        33409: 65345,
        33410: 65346,
        33411: 65347,
        33412: 65348,
        33413: 65349,
        33414: 65350,
        33415: 65351,
        33416: 65352,
        33417: 65353,
        33418: 65354,
        33419: 65355,
        33420: 65356,
        33421: 65357,
        33422: 65358,
        33423: 65359,
        33424: 65360,
        33425: 65361,
        33426: 65362,
        33427: 65363,
        33428: 65364,
        33429: 65365,
        33430: 65366,
        33431: 65367,
        33432: 65368,
        33433: 65369,
        33434: 65370,
        33439: 12353,
        33440: 12354,
        33441: 12355,
        33442: 12356,
        33443: 12357,
        33444: 12358,
        33445: 12359,
        33446: 12360,
        33447: 12361,
        33448: 12362,
        33449: 12363,
        33450: 12364,
        33451: 12365,
        33452: 12366,
        33453: 12367,
        33454: 12368,
        33455: 12369,
        33456: 12370,
        33457: 12371,
        33458: 12372,
        33459: 12373,
        33460: 12374,
        33461: 12375,
        33462: 12376,
        33463: 12377,
        33464: 12378,
        33465: 12379,
        33466: 12380,
        33467: 12381,
        33468: 12382,
        33469: 12383,
        33470: 12384,
        33471: 12385,
        33472: 12386,
        33473: 12387,
        33474: 12388,
        33475: 12389,
        33476: 12390,
        33477: 12391,
        33478: 12392,
        33479: 12393,
        33480: 12394,
        33481: 12395,
        33482: 12396,
        33483: 12397,
        33484: 12398,
        33485: 12399,
        33486: 12400,
        33487: 12401,
        33488: 12402,
        33489: 12403,
        33490: 12404,
        33491: 12405,
        33492: 12406,
        33493: 12407,
        33494: 12408,
        33495: 12409,
        33496: 12410,
        33497: 12411,
        33498: 12412,
        33499: 12413,
        33500: 12414,
        33501: 12415,
        33502: 12416,
        33503: 12417,
        33504: 12418,
        33505: 12419,
        33506: 12420,
        33507: 12421,
        33508: 12422,
        33509: 12423,
        33510: 12424,
        33511: 12425,
        33512: 12426,
        33513: 12427,
        33514: 12428,
        33515: 12429,
        33516: 12430,
        33517: 12431,
        33518: 12432,
        33519: 12433,
        33520: 12434,
        33521: 12435,
        33600: 12449,
        33601: 12450,
        33602: 12451,
        33603: 12452,
        33604: 12453,
        33605: 12454,
        33606: 12455,
        33607: 12456,
        33608: 12457,
        33609: 12458,
        33610: 12459,
        33611: 12460,
        33612: 12461,
        33613: 12462,
        33614: 12463,
        33615: 12464,
        33616: 12465,
        33617: 12466,
        33618: 12467,
        33619: 12468,
        33620: 12469,
        33621: 12470,
        33622: 12471,
        33623: 12472,
        33624: 12473,
        33625: 12474,
        33626: 12475,
        33627: 12476,
        33628: 12477,
        33629: 12478,
        33630: 12479,
        33631: 12480,
        33632: 12481,
        33633: 12482,
        33634: 12483,
        33635: 12484,
        33636: 12485,
        33637: 12486,
        33638: 12487,
        33639: 12488,
        33640: 12489,
        33641: 12490,
        33642: 12491,
        33643: 12492,
        33644: 12493,
        33645: 12494,
        33646: 12495,
        33647: 12496,
        33648: 12497,
        33649: 12498,
        33650: 12499,
        33651: 12500,
        33652: 12501,
        33653: 12502,
        33654: 12503,
        33655: 12504,
        33656: 12505,
        33657: 12506,
        33658: 12507,
        33659: 12508,
        33660: 12509,
        33661: 12510,
        33662: 12511,
        33664: 12512,
        33665: 12513,
        33666: 12514,
        33667: 12515,
        33668: 12516,
        33669: 12517,
        33670: 12518,
        33671: 12519,
        33672: 12520,
        33673: 12521,
        33674: 12522,
        33675: 12523,
        33676: 12524,
        33677: 12525,
        33678: 12526,
        33679: 12527,
        33680: 12528,
        33681: 12529,
        33682: 12530,
        33683: 12531,
        33684: 12532,
        33685: 12533,
        33686: 12534,
        33695: 913,
        33696: 914,
        33697: 915,
        33698: 916,
        33699: 917,
        33700: 918,
        33701: 919,
        33702: 920,
        33703: 921,
        33704: 922,
        33705: 923,
        33706: 924,
        33707: 925,
        33708: 926,
        33709: 927,
        33710: 928,
        33711: 929,
        33712: 931,
        33713: 932,
        33714: 933,
        33715: 934,
        33716: 935,
        33717: 936,
        33718: 937,
        33727: 945,
        33728: 946,
        33729: 947,
        33730: 948,
        33731: 949,
        33732: 950,
        33733: 951,
        33734: 952,
        33735: 953,
        33736: 954,
        33737: 955,
        33738: 956,
        33739: 957,
        33740: 958,
        33741: 959,
        33742: 960,
        33743: 961,
        33744: 963,
        33745: 964,
        33746: 965,
        33747: 966,
        33748: 967,
        33749: 968,
        33750: 969,
        33856: 1040,
        33857: 1041,
        33858: 1042,
        33859: 1043,
        33860: 1044,
        33861: 1045,
        33862: 1025,
        33863: 1046,
        33864: 1047,
        33865: 1048,
        33866: 1049,
        33867: 1050,
        33868: 1051,
        33869: 1052,
        33870: 1053,
        33871: 1054,
        33872: 1055,
        33873: 1056,
        33874: 1057,
        33875: 1058,
        33876: 1059,
        33877: 1060,
        33878: 1061,
        33879: 1062,
        33880: 1063,
        33881: 1064,
        33882: 1065,
        33883: 1066,
        33884: 1067,
        33885: 1068,
        33886: 1069,
        33887: 1070,
        33888: 1071,
        33904: 1072,
        33905: 1073,
        33906: 1074,
        33907: 1075,
        33908: 1076,
        33909: 1077,
        33910: 1105,
        33911: 1078,
        33912: 1079,
        33913: 1080,
        33914: 1081,
        33915: 1082,
        33916: 1083,
        33917: 1084,
        33918: 1085,
        33920: 1086,
        33921: 1087,
        33922: 1088,
        33923: 1089,
        33924: 1090,
        33925: 1091,
        33926: 1092,
        33927: 1093,
        33928: 1094,
        33929: 1095,
        33930: 1096,
        33931: 1097,
        33932: 1098,
        33933: 1099,
        33934: 1100,
        33935: 1101,
        33936: 1102,
        33937: 1103,
        33951: 9472,
        33952: 9474,
        33953: 9484,
        33954: 9488,
        33955: 9496,
        33956: 9492,
        33957: 9500,
        33958: 9516,
        33959: 9508,
        33960: 9524,
        33961: 9532,
        33962: 9473,
        33963: 9475,
        33964: 9487,
        33965: 9491,
        33966: 9499,
        33967: 9495,
        33968: 9507,
        33969: 9523,
        33970: 9515,
        33971: 9531,
        33972: 9547,
        33973: 9504,
        33974: 9519,
        33975: 9512,
        33976: 9527,
        33977: 9535,
        33978: 9501,
        33979: 9520,
        33980: 9509,
        33981: 9528,
        33982: 9538,
        34975: 20124,
        34976: 21782,
        34977: 23043,
        34978: 38463,
        34979: 21696,
        34980: 24859,
        34981: 25384,
        34982: 23030,
        34983: 36898,
        34984: 33909,
        34985: 33564,
        34986: 31312,
        34987: 24746,
        34988: 25569,
        34989: 28197,
        34990: 26093,
        34991: 33894,
        34992: 33446,
        34993: 39925,
        34994: 26771,
        34995: 22311,
        34996: 26017,
        34997: 25201,
        34998: 23451,
        34999: 22992,
        35e3: 34427,
        35001: 39156,
        35002: 32098,
        35003: 32190,
        35004: 39822,
        35005: 25110,
        35006: 31903,
        35007: 34999,
        35008: 23433,
        35009: 24245,
        35010: 25353,
        35011: 26263,
        35012: 26696,
        35013: 38343,
        35014: 38797,
        35015: 26447,
        35016: 20197,
        35017: 20234,
        35018: 20301,
        35019: 20381,
        35020: 20553,
        35021: 22258,
        35022: 22839,
        35023: 22996,
        35024: 23041,
        35025: 23561,
        35026: 24799,
        35027: 24847,
        35028: 24944,
        35029: 26131,
        35030: 26885,
        35031: 28858,
        35032: 30031,
        35033: 30064,
        35034: 31227,
        35035: 32173,
        35036: 32239,
        35037: 32963,
        35038: 33806,
        35039: 34915,
        35040: 35586,
        35041: 36949,
        35042: 36986,
        35043: 21307,
        35044: 20117,
        35045: 20133,
        35046: 22495,
        35047: 32946,
        35048: 37057,
        35049: 30959,
        35050: 19968,
        35051: 22769,
        35052: 28322,
        35053: 36920,
        35054: 31282,
        35055: 33576,
        35056: 33419,
        35057: 39983,
        35058: 20801,
        35059: 21360,
        35060: 21693,
        35061: 21729,
        35062: 22240,
        35063: 23035,
        35064: 24341,
        35065: 39154,
        35066: 28139,
        35067: 32996,
        35068: 34093,
        35136: 38498,
        35137: 38512,
        35138: 38560,
        35139: 38907,
        35140: 21515,
        35141: 21491,
        35142: 23431,
        35143: 28879,
        35144: 32701,
        35145: 36802,
        35146: 38632,
        35147: 21359,
        35148: 40284,
        35149: 31418,
        35150: 19985,
        35151: 30867,
        35152: 33276,
        35153: 28198,
        35154: 22040,
        35155: 21764,
        35156: 27421,
        35157: 34074,
        35158: 39995,
        35159: 23013,
        35160: 21417,
        35161: 28006,
        35162: 29916,
        35163: 38287,
        35164: 22082,
        35165: 20113,
        35166: 36939,
        35167: 38642,
        35168: 33615,
        35169: 39180,
        35170: 21473,
        35171: 21942,
        35172: 23344,
        35173: 24433,
        35174: 26144,
        35175: 26355,
        35176: 26628,
        35177: 27704,
        35178: 27891,
        35179: 27945,
        35180: 29787,
        35181: 30408,
        35182: 31310,
        35183: 38964,
        35184: 33521,
        35185: 34907,
        35186: 35424,
        35187: 37613,
        35188: 28082,
        35189: 30123,
        35190: 30410,
        35191: 39365,
        35192: 24742,
        35193: 35585,
        35194: 36234,
        35195: 38322,
        35196: 27022,
        35197: 21421,
        35198: 20870,
        35200: 22290,
        35201: 22576,
        35202: 22852,
        35203: 23476,
        35204: 24310,
        35205: 24616,
        35206: 25513,
        35207: 25588,
        35208: 27839,
        35209: 28436,
        35210: 28814,
        35211: 28948,
        35212: 29017,
        35213: 29141,
        35214: 29503,
        35215: 32257,
        35216: 33398,
        35217: 33489,
        35218: 34199,
        35219: 36960,
        35220: 37467,
        35221: 40219,
        35222: 22633,
        35223: 26044,
        35224: 27738,
        35225: 29989,
        35226: 20985,
        35227: 22830,
        35228: 22885,
        35229: 24448,
        35230: 24540,
        35231: 25276,
        35232: 26106,
        35233: 27178,
        35234: 27431,
        35235: 27572,
        35236: 29579,
        35237: 32705,
        35238: 35158,
        35239: 40236,
        35240: 40206,
        35241: 40644,
        35242: 23713,
        35243: 27798,
        35244: 33659,
        35245: 20740,
        35246: 23627,
        35247: 25014,
        35248: 33222,
        35249: 26742,
        35250: 29281,
        35251: 20057,
        35252: 20474,
        35253: 21368,
        35254: 24681,
        35255: 28201,
        35256: 31311,
        35257: 38899,
        35258: 19979,
        35259: 21270,
        35260: 20206,
        35261: 20309,
        35262: 20285,
        35263: 20385,
        35264: 20339,
        35265: 21152,
        35266: 21487,
        35267: 22025,
        35268: 22799,
        35269: 23233,
        35270: 23478,
        35271: 23521,
        35272: 31185,
        35273: 26247,
        35274: 26524,
        35275: 26550,
        35276: 27468,
        35277: 27827,
        35278: 28779,
        35279: 29634,
        35280: 31117,
        35281: 31166,
        35282: 31292,
        35283: 31623,
        35284: 33457,
        35285: 33499,
        35286: 33540,
        35287: 33655,
        35288: 33775,
        35289: 33747,
        35290: 34662,
        35291: 35506,
        35292: 22057,
        35293: 36008,
        35294: 36838,
        35295: 36942,
        35296: 38686,
        35297: 34442,
        35298: 20420,
        35299: 23784,
        35300: 25105,
        35301: 29273,
        35302: 30011,
        35303: 33253,
        35304: 33469,
        35305: 34558,
        35306: 36032,
        35307: 38597,
        35308: 39187,
        35309: 39381,
        35310: 20171,
        35311: 20250,
        35312: 35299,
        35313: 22238,
        35314: 22602,
        35315: 22730,
        35316: 24315,
        35317: 24555,
        35318: 24618,
        35319: 24724,
        35320: 24674,
        35321: 25040,
        35322: 25106,
        35323: 25296,
        35324: 25913,
        35392: 39745,
        35393: 26214,
        35394: 26800,
        35395: 28023,
        35396: 28784,
        35397: 30028,
        35398: 30342,
        35399: 32117,
        35400: 33445,
        35401: 34809,
        35402: 38283,
        35403: 38542,
        35404: 35997,
        35405: 20977,
        35406: 21182,
        35407: 22806,
        35408: 21683,
        35409: 23475,
        35410: 23830,
        35411: 24936,
        35412: 27010,
        35413: 28079,
        35414: 30861,
        35415: 33995,
        35416: 34903,
        35417: 35442,
        35418: 37799,
        35419: 39608,
        35420: 28012,
        35421: 39336,
        35422: 34521,
        35423: 22435,
        35424: 26623,
        35425: 34510,
        35426: 37390,
        35427: 21123,
        35428: 22151,
        35429: 21508,
        35430: 24275,
        35431: 25313,
        35432: 25785,
        35433: 26684,
        35434: 26680,
        35435: 27579,
        35436: 29554,
        35437: 30906,
        35438: 31339,
        35439: 35226,
        35440: 35282,
        35441: 36203,
        35442: 36611,
        35443: 37101,
        35444: 38307,
        35445: 38548,
        35446: 38761,
        35447: 23398,
        35448: 23731,
        35449: 27005,
        35450: 38989,
        35451: 38990,
        35452: 25499,
        35453: 31520,
        35454: 27179,
        35456: 27263,
        35457: 26806,
        35458: 39949,
        35459: 28511,
        35460: 21106,
        35461: 21917,
        35462: 24688,
        35463: 25324,
        35464: 27963,
        35465: 28167,
        35466: 28369,
        35467: 33883,
        35468: 35088,
        35469: 36676,
        35470: 19988,
        35471: 39993,
        35472: 21494,
        35473: 26907,
        35474: 27194,
        35475: 38788,
        35476: 26666,
        35477: 20828,
        35478: 31427,
        35479: 33970,
        35480: 37340,
        35481: 37772,
        35482: 22107,
        35483: 40232,
        35484: 26658,
        35485: 33541,
        35486: 33841,
        35487: 31909,
        35488: 21e3,
        35489: 33477,
        35490: 29926,
        35491: 20094,
        35492: 20355,
        35493: 20896,
        35494: 23506,
        35495: 21002,
        35496: 21208,
        35497: 21223,
        35498: 24059,
        35499: 21914,
        35500: 22570,
        35501: 23014,
        35502: 23436,
        35503: 23448,
        35504: 23515,
        35505: 24178,
        35506: 24185,
        35507: 24739,
        35508: 24863,
        35509: 24931,
        35510: 25022,
        35511: 25563,
        35512: 25954,
        35513: 26577,
        35514: 26707,
        35515: 26874,
        35516: 27454,
        35517: 27475,
        35518: 27735,
        35519: 28450,
        35520: 28567,
        35521: 28485,
        35522: 29872,
        35523: 29976,
        35524: 30435,
        35525: 30475,
        35526: 31487,
        35527: 31649,
        35528: 31777,
        35529: 32233,
        35530: 32566,
        35531: 32752,
        35532: 32925,
        35533: 33382,
        35534: 33694,
        35535: 35251,
        35536: 35532,
        35537: 36011,
        35538: 36996,
        35539: 37969,
        35540: 38291,
        35541: 38289,
        35542: 38306,
        35543: 38501,
        35544: 38867,
        35545: 39208,
        35546: 33304,
        35547: 20024,
        35548: 21547,
        35549: 23736,
        35550: 24012,
        35551: 29609,
        35552: 30284,
        35553: 30524,
        35554: 23721,
        35555: 32747,
        35556: 36107,
        35557: 38593,
        35558: 38929,
        35559: 38996,
        35560: 39e3,
        35561: 20225,
        35562: 20238,
        35563: 21361,
        35564: 21916,
        35565: 22120,
        35566: 22522,
        35567: 22855,
        35568: 23305,
        35569: 23492,
        35570: 23696,
        35571: 24076,
        35572: 24190,
        35573: 24524,
        35574: 25582,
        35575: 26426,
        35576: 26071,
        35577: 26082,
        35578: 26399,
        35579: 26827,
        35580: 26820,
        35648: 27231,
        35649: 24112,
        35650: 27589,
        35651: 27671,
        35652: 27773,
        35653: 30079,
        35654: 31048,
        35655: 23395,
        35656: 31232,
        35657: 32e3,
        35658: 24509,
        35659: 35215,
        35660: 35352,
        35661: 36020,
        35662: 36215,
        35663: 36556,
        35664: 36637,
        35665: 39138,
        35666: 39438,
        35667: 39740,
        35668: 20096,
        35669: 20605,
        35670: 20736,
        35671: 22931,
        35672: 23452,
        35673: 25135,
        35674: 25216,
        35675: 25836,
        35676: 27450,
        35677: 29344,
        35678: 30097,
        35679: 31047,
        35680: 32681,
        35681: 34811,
        35682: 35516,
        35683: 35696,
        35684: 25516,
        35685: 33738,
        35686: 38816,
        35687: 21513,
        35688: 21507,
        35689: 21931,
        35690: 26708,
        35691: 27224,
        35692: 35440,
        35693: 30759,
        35694: 26485,
        35695: 40653,
        35696: 21364,
        35697: 23458,
        35698: 33050,
        35699: 34384,
        35700: 36870,
        35701: 19992,
        35702: 20037,
        35703: 20167,
        35704: 20241,
        35705: 21450,
        35706: 21560,
        35707: 23470,
        35708: 24339,
        35709: 24613,
        35710: 25937,
        35712: 26429,
        35713: 27714,
        35714: 27762,
        35715: 27875,
        35716: 28792,
        35717: 29699,
        35718: 31350,
        35719: 31406,
        35720: 31496,
        35721: 32026,
        35722: 31998,
        35723: 32102,
        35724: 26087,
        35725: 29275,
        35726: 21435,
        35727: 23621,
        35728: 24040,
        35729: 25298,
        35730: 25312,
        35731: 25369,
        35732: 28192,
        35733: 34394,
        35734: 35377,
        35735: 36317,
        35736: 37624,
        35737: 28417,
        35738: 31142,
        35739: 39770,
        35740: 20136,
        35741: 20139,
        35742: 20140,
        35743: 20379,
        35744: 20384,
        35745: 20689,
        35746: 20807,
        35747: 31478,
        35748: 20849,
        35749: 20982,
        35750: 21332,
        35751: 21281,
        35752: 21375,
        35753: 21483,
        35754: 21932,
        35755: 22659,
        35756: 23777,
        35757: 24375,
        35758: 24394,
        35759: 24623,
        35760: 24656,
        35761: 24685,
        35762: 25375,
        35763: 25945,
        35764: 27211,
        35765: 27841,
        35766: 29378,
        35767: 29421,
        35768: 30703,
        35769: 33016,
        35770: 33029,
        35771: 33288,
        35772: 34126,
        35773: 37111,
        35774: 37857,
        35775: 38911,
        35776: 39255,
        35777: 39514,
        35778: 20208,
        35779: 20957,
        35780: 23597,
        35781: 26241,
        35782: 26989,
        35783: 23616,
        35784: 26354,
        35785: 26997,
        35786: 29577,
        35787: 26704,
        35788: 31873,
        35789: 20677,
        35790: 21220,
        35791: 22343,
        35792: 24062,
        35793: 37670,
        35794: 26020,
        35795: 27427,
        35796: 27453,
        35797: 29748,
        35798: 31105,
        35799: 31165,
        35800: 31563,
        35801: 32202,
        35802: 33465,
        35803: 33740,
        35804: 34943,
        35805: 35167,
        35806: 35641,
        35807: 36817,
        35808: 37329,
        35809: 21535,
        35810: 37504,
        35811: 20061,
        35812: 20534,
        35813: 21477,
        35814: 21306,
        35815: 29399,
        35816: 29590,
        35817: 30697,
        35818: 33510,
        35819: 36527,
        35820: 39366,
        35821: 39368,
        35822: 39378,
        35823: 20855,
        35824: 24858,
        35825: 34398,
        35826: 21936,
        35827: 31354,
        35828: 20598,
        35829: 23507,
        35830: 36935,
        35831: 38533,
        35832: 20018,
        35833: 27355,
        35834: 37351,
        35835: 23633,
        35836: 23624,
        35904: 25496,
        35905: 31391,
        35906: 27795,
        35907: 38772,
        35908: 36705,
        35909: 31402,
        35910: 29066,
        35911: 38536,
        35912: 31874,
        35913: 26647,
        35914: 32368,
        35915: 26705,
        35916: 37740,
        35917: 21234,
        35918: 21531,
        35919: 34219,
        35920: 35347,
        35921: 32676,
        35922: 36557,
        35923: 37089,
        35924: 21350,
        35925: 34952,
        35926: 31041,
        35927: 20418,
        35928: 20670,
        35929: 21009,
        35930: 20804,
        35931: 21843,
        35932: 22317,
        35933: 29674,
        35934: 22411,
        35935: 22865,
        35936: 24418,
        35937: 24452,
        35938: 24693,
        35939: 24950,
        35940: 24935,
        35941: 25001,
        35942: 25522,
        35943: 25658,
        35944: 25964,
        35945: 26223,
        35946: 26690,
        35947: 28179,
        35948: 30054,
        35949: 31293,
        35950: 31995,
        35951: 32076,
        35952: 32153,
        35953: 32331,
        35954: 32619,
        35955: 33550,
        35956: 33610,
        35957: 34509,
        35958: 35336,
        35959: 35427,
        35960: 35686,
        35961: 36605,
        35962: 38938,
        35963: 40335,
        35964: 33464,
        35965: 36814,
        35966: 39912,
        35968: 21127,
        35969: 25119,
        35970: 25731,
        35971: 28608,
        35972: 38553,
        35973: 26689,
        35974: 20625,
        35975: 27424,
        35976: 27770,
        35977: 28500,
        35978: 31348,
        35979: 32080,
        35980: 34880,
        35981: 35363,
        35982: 26376,
        35983: 20214,
        35984: 20537,
        35985: 20518,
        35986: 20581,
        35987: 20860,
        35988: 21048,
        35989: 21091,
        35990: 21927,
        35991: 22287,
        35992: 22533,
        35993: 23244,
        35994: 24314,
        35995: 25010,
        35996: 25080,
        35997: 25331,
        35998: 25458,
        35999: 26908,
        36e3: 27177,
        36001: 29309,
        36002: 29356,
        36003: 29486,
        36004: 30740,
        36005: 30831,
        36006: 32121,
        36007: 30476,
        36008: 32937,
        36009: 35211,
        36010: 35609,
        36011: 36066,
        36012: 36562,
        36013: 36963,
        36014: 37749,
        36015: 38522,
        36016: 38997,
        36017: 39443,
        36018: 40568,
        36019: 20803,
        36020: 21407,
        36021: 21427,
        36022: 24187,
        36023: 24358,
        36024: 28187,
        36025: 28304,
        36026: 29572,
        36027: 29694,
        36028: 32067,
        36029: 33335,
        36030: 35328,
        36031: 35578,
        36032: 38480,
        36033: 20046,
        36034: 20491,
        36035: 21476,
        36036: 21628,
        36037: 22266,
        36038: 22993,
        36039: 23396,
        36040: 24049,
        36041: 24235,
        36042: 24359,
        36043: 25144,
        36044: 25925,
        36045: 26543,
        36046: 28246,
        36047: 29392,
        36048: 31946,
        36049: 34996,
        36050: 32929,
        36051: 32993,
        36052: 33776,
        36053: 34382,
        36054: 35463,
        36055: 36328,
        36056: 37431,
        36057: 38599,
        36058: 39015,
        36059: 40723,
        36060: 20116,
        36061: 20114,
        36062: 20237,
        36063: 21320,
        36064: 21577,
        36065: 21566,
        36066: 23087,
        36067: 24460,
        36068: 24481,
        36069: 24735,
        36070: 26791,
        36071: 27278,
        36072: 29786,
        36073: 30849,
        36074: 35486,
        36075: 35492,
        36076: 35703,
        36077: 37264,
        36078: 20062,
        36079: 39881,
        36080: 20132,
        36081: 20348,
        36082: 20399,
        36083: 20505,
        36084: 20502,
        36085: 20809,
        36086: 20844,
        36087: 21151,
        36088: 21177,
        36089: 21246,
        36090: 21402,
        36091: 21475,
        36092: 21521,
        36160: 21518,
        36161: 21897,
        36162: 22353,
        36163: 22434,
        36164: 22909,
        36165: 23380,
        36166: 23389,
        36167: 23439,
        36168: 24037,
        36169: 24039,
        36170: 24055,
        36171: 24184,
        36172: 24195,
        36173: 24218,
        36174: 24247,
        36175: 24344,
        36176: 24658,
        36177: 24908,
        36178: 25239,
        36179: 25304,
        36180: 25511,
        36181: 25915,
        36182: 26114,
        36183: 26179,
        36184: 26356,
        36185: 26477,
        36186: 26657,
        36187: 26775,
        36188: 27083,
        36189: 27743,
        36190: 27946,
        36191: 28009,
        36192: 28207,
        36193: 28317,
        36194: 30002,
        36195: 30343,
        36196: 30828,
        36197: 31295,
        36198: 31968,
        36199: 32005,
        36200: 32024,
        36201: 32094,
        36202: 32177,
        36203: 32789,
        36204: 32771,
        36205: 32943,
        36206: 32945,
        36207: 33108,
        36208: 33167,
        36209: 33322,
        36210: 33618,
        36211: 34892,
        36212: 34913,
        36213: 35611,
        36214: 36002,
        36215: 36092,
        36216: 37066,
        36217: 37237,
        36218: 37489,
        36219: 30783,
        36220: 37628,
        36221: 38308,
        36222: 38477,
        36224: 38917,
        36225: 39321,
        36226: 39640,
        36227: 40251,
        36228: 21083,
        36229: 21163,
        36230: 21495,
        36231: 21512,
        36232: 22741,
        36233: 25335,
        36234: 28640,
        36235: 35946,
        36236: 36703,
        36237: 40633,
        36238: 20811,
        36239: 21051,
        36240: 21578,
        36241: 22269,
        36242: 31296,
        36243: 37239,
        36244: 40288,
        36245: 40658,
        36246: 29508,
        36247: 28425,
        36248: 33136,
        36249: 29969,
        36250: 24573,
        36251: 24794,
        36252: 39592,
        36253: 29403,
        36254: 36796,
        36255: 27492,
        36256: 38915,
        36257: 20170,
        36258: 22256,
        36259: 22372,
        36260: 22718,
        36261: 23130,
        36262: 24680,
        36263: 25031,
        36264: 26127,
        36265: 26118,
        36266: 26681,
        36267: 26801,
        36268: 28151,
        36269: 30165,
        36270: 32058,
        36271: 33390,
        36272: 39746,
        36273: 20123,
        36274: 20304,
        36275: 21449,
        36276: 21766,
        36277: 23919,
        36278: 24038,
        36279: 24046,
        36280: 26619,
        36281: 27801,
        36282: 29811,
        36283: 30722,
        36284: 35408,
        36285: 37782,
        36286: 35039,
        36287: 22352,
        36288: 24231,
        36289: 25387,
        36290: 20661,
        36291: 20652,
        36292: 20877,
        36293: 26368,
        36294: 21705,
        36295: 22622,
        36296: 22971,
        36297: 23472,
        36298: 24425,
        36299: 25165,
        36300: 25505,
        36301: 26685,
        36302: 27507,
        36303: 28168,
        36304: 28797,
        36305: 37319,
        36306: 29312,
        36307: 30741,
        36308: 30758,
        36309: 31085,
        36310: 25998,
        36311: 32048,
        36312: 33756,
        36313: 35009,
        36314: 36617,
        36315: 38555,
        36316: 21092,
        36317: 22312,
        36318: 26448,
        36319: 32618,
        36320: 36001,
        36321: 20916,
        36322: 22338,
        36323: 38442,
        36324: 22586,
        36325: 27018,
        36326: 32948,
        36327: 21682,
        36328: 23822,
        36329: 22524,
        36330: 30869,
        36331: 40442,
        36332: 20316,
        36333: 21066,
        36334: 21643,
        36335: 25662,
        36336: 26152,
        36337: 26388,
        36338: 26613,
        36339: 31364,
        36340: 31574,
        36341: 32034,
        36342: 37679,
        36343: 26716,
        36344: 39853,
        36345: 31545,
        36346: 21273,
        36347: 20874,
        36348: 21047,
        36416: 23519,
        36417: 25334,
        36418: 25774,
        36419: 25830,
        36420: 26413,
        36421: 27578,
        36422: 34217,
        36423: 38609,
        36424: 30352,
        36425: 39894,
        36426: 25420,
        36427: 37638,
        36428: 39851,
        36429: 30399,
        36430: 26194,
        36431: 19977,
        36432: 20632,
        36433: 21442,
        36434: 23665,
        36435: 24808,
        36436: 25746,
        36437: 25955,
        36438: 26719,
        36439: 29158,
        36440: 29642,
        36441: 29987,
        36442: 31639,
        36443: 32386,
        36444: 34453,
        36445: 35715,
        36446: 36059,
        36447: 37240,
        36448: 39184,
        36449: 26028,
        36450: 26283,
        36451: 27531,
        36452: 20181,
        36453: 20180,
        36454: 20282,
        36455: 20351,
        36456: 21050,
        36457: 21496,
        36458: 21490,
        36459: 21987,
        36460: 22235,
        36461: 22763,
        36462: 22987,
        36463: 22985,
        36464: 23039,
        36465: 23376,
        36466: 23629,
        36467: 24066,
        36468: 24107,
        36469: 24535,
        36470: 24605,
        36471: 25351,
        36472: 25903,
        36473: 23388,
        36474: 26031,
        36475: 26045,
        36476: 26088,
        36477: 26525,
        36478: 27490,
        36480: 27515,
        36481: 27663,
        36482: 29509,
        36483: 31049,
        36484: 31169,
        36485: 31992,
        36486: 32025,
        36487: 32043,
        36488: 32930,
        36489: 33026,
        36490: 33267,
        36491: 35222,
        36492: 35422,
        36493: 35433,
        36494: 35430,
        36495: 35468,
        36496: 35566,
        36497: 36039,
        36498: 36060,
        36499: 38604,
        36500: 39164,
        36501: 27503,
        36502: 20107,
        36503: 20284,
        36504: 20365,
        36505: 20816,
        36506: 23383,
        36507: 23546,
        36508: 24904,
        36509: 25345,
        36510: 26178,
        36511: 27425,
        36512: 28363,
        36513: 27835,
        36514: 29246,
        36515: 29885,
        36516: 30164,
        36517: 30913,
        36518: 31034,
        36519: 32780,
        36520: 32819,
        36521: 33258,
        36522: 33940,
        36523: 36766,
        36524: 27728,
        36525: 40575,
        36526: 24335,
        36527: 35672,
        36528: 40235,
        36529: 31482,
        36530: 36600,
        36531: 23437,
        36532: 38635,
        36533: 19971,
        36534: 21489,
        36535: 22519,
        36536: 22833,
        36537: 23241,
        36538: 23460,
        36539: 24713,
        36540: 28287,
        36541: 28422,
        36542: 30142,
        36543: 36074,
        36544: 23455,
        36545: 34048,
        36546: 31712,
        36547: 20594,
        36548: 26612,
        36549: 33437,
        36550: 23649,
        36551: 34122,
        36552: 32286,
        36553: 33294,
        36554: 20889,
        36555: 23556,
        36556: 25448,
        36557: 36198,
        36558: 26012,
        36559: 29038,
        36560: 31038,
        36561: 32023,
        36562: 32773,
        36563: 35613,
        36564: 36554,
        36565: 36974,
        36566: 34503,
        36567: 37034,
        36568: 20511,
        36569: 21242,
        36570: 23610,
        36571: 26451,
        36572: 28796,
        36573: 29237,
        36574: 37196,
        36575: 37320,
        36576: 37675,
        36577: 33509,
        36578: 23490,
        36579: 24369,
        36580: 24825,
        36581: 20027,
        36582: 21462,
        36583: 23432,
        36584: 25163,
        36585: 26417,
        36586: 27530,
        36587: 29417,
        36588: 29664,
        36589: 31278,
        36590: 33131,
        36591: 36259,
        36592: 37202,
        36593: 39318,
        36594: 20754,
        36595: 21463,
        36596: 21610,
        36597: 23551,
        36598: 25480,
        36599: 27193,
        36600: 32172,
        36601: 38656,
        36602: 22234,
        36603: 21454,
        36604: 21608,
        36672: 23447,
        36673: 23601,
        36674: 24030,
        36675: 20462,
        36676: 24833,
        36677: 25342,
        36678: 27954,
        36679: 31168,
        36680: 31179,
        36681: 32066,
        36682: 32333,
        36683: 32722,
        36684: 33261,
        36685: 33311,
        36686: 33936,
        36687: 34886,
        36688: 35186,
        36689: 35728,
        36690: 36468,
        36691: 36655,
        36692: 36913,
        36693: 37195,
        36694: 37228,
        36695: 38598,
        36696: 37276,
        36697: 20160,
        36698: 20303,
        36699: 20805,
        36700: 21313,
        36701: 24467,
        36702: 25102,
        36703: 26580,
        36704: 27713,
        36705: 28171,
        36706: 29539,
        36707: 32294,
        36708: 37325,
        36709: 37507,
        36710: 21460,
        36711: 22809,
        36712: 23487,
        36713: 28113,
        36714: 31069,
        36715: 32302,
        36716: 31899,
        36717: 22654,
        36718: 29087,
        36719: 20986,
        36720: 34899,
        36721: 36848,
        36722: 20426,
        36723: 23803,
        36724: 26149,
        36725: 30636,
        36726: 31459,
        36727: 33308,
        36728: 39423,
        36729: 20934,
        36730: 24490,
        36731: 26092,
        36732: 26991,
        36733: 27529,
        36734: 28147,
        36736: 28310,
        36737: 28516,
        36738: 30462,
        36739: 32020,
        36740: 24033,
        36741: 36981,
        36742: 37255,
        36743: 38918,
        36744: 20966,
        36745: 21021,
        36746: 25152,
        36747: 26257,
        36748: 26329,
        36749: 28186,
        36750: 24246,
        36751: 32210,
        36752: 32626,
        36753: 26360,
        36754: 34223,
        36755: 34295,
        36756: 35576,
        36757: 21161,
        36758: 21465,
        36759: 22899,
        36760: 24207,
        36761: 24464,
        36762: 24661,
        36763: 37604,
        36764: 38500,
        36765: 20663,
        36766: 20767,
        36767: 21213,
        36768: 21280,
        36769: 21319,
        36770: 21484,
        36771: 21736,
        36772: 21830,
        36773: 21809,
        36774: 22039,
        36775: 22888,
        36776: 22974,
        36777: 23100,
        36778: 23477,
        36779: 23558,
        36780: 23567,
        36781: 23569,
        36782: 23578,
        36783: 24196,
        36784: 24202,
        36785: 24288,
        36786: 24432,
        36787: 25215,
        36788: 25220,
        36789: 25307,
        36790: 25484,
        36791: 25463,
        36792: 26119,
        36793: 26124,
        36794: 26157,
        36795: 26230,
        36796: 26494,
        36797: 26786,
        36798: 27167,
        36799: 27189,
        36800: 27836,
        36801: 28040,
        36802: 28169,
        36803: 28248,
        36804: 28988,
        36805: 28966,
        36806: 29031,
        36807: 30151,
        36808: 30465,
        36809: 30813,
        36810: 30977,
        36811: 31077,
        36812: 31216,
        36813: 31456,
        36814: 31505,
        36815: 31911,
        36816: 32057,
        36817: 32918,
        36818: 33750,
        36819: 33931,
        36820: 34121,
        36821: 34909,
        36822: 35059,
        36823: 35359,
        36824: 35388,
        36825: 35412,
        36826: 35443,
        36827: 35937,
        36828: 36062,
        36829: 37284,
        36830: 37478,
        36831: 37758,
        36832: 37912,
        36833: 38556,
        36834: 38808,
        36835: 19978,
        36836: 19976,
        36837: 19998,
        36838: 20055,
        36839: 20887,
        36840: 21104,
        36841: 22478,
        36842: 22580,
        36843: 22732,
        36844: 23330,
        36845: 24120,
        36846: 24773,
        36847: 25854,
        36848: 26465,
        36849: 26454,
        36850: 27972,
        36851: 29366,
        36852: 30067,
        36853: 31331,
        36854: 33976,
        36855: 35698,
        36856: 37304,
        36857: 37664,
        36858: 22065,
        36859: 22516,
        36860: 39166,
        36928: 25325,
        36929: 26893,
        36930: 27542,
        36931: 29165,
        36932: 32340,
        36933: 32887,
        36934: 33394,
        36935: 35302,
        36936: 39135,
        36937: 34645,
        36938: 36785,
        36939: 23611,
        36940: 20280,
        36941: 20449,
        36942: 20405,
        36943: 21767,
        36944: 23072,
        36945: 23517,
        36946: 23529,
        36947: 24515,
        36948: 24910,
        36949: 25391,
        36950: 26032,
        36951: 26187,
        36952: 26862,
        36953: 27035,
        36954: 28024,
        36955: 28145,
        36956: 30003,
        36957: 30137,
        36958: 30495,
        36959: 31070,
        36960: 31206,
        36961: 32051,
        36962: 33251,
        36963: 33455,
        36964: 34218,
        36965: 35242,
        36966: 35386,
        36967: 36523,
        36968: 36763,
        36969: 36914,
        36970: 37341,
        36971: 38663,
        36972: 20154,
        36973: 20161,
        36974: 20995,
        36975: 22645,
        36976: 22764,
        36977: 23563,
        36978: 29978,
        36979: 23613,
        36980: 33102,
        36981: 35338,
        36982: 36805,
        36983: 38499,
        36984: 38765,
        36985: 31525,
        36986: 35535,
        36987: 38920,
        36988: 37218,
        36989: 22259,
        36990: 21416,
        36992: 36887,
        36993: 21561,
        36994: 22402,
        36995: 24101,
        36996: 25512,
        36997: 27700,
        36998: 28810,
        36999: 30561,
        37e3: 31883,
        37001: 32736,
        37002: 34928,
        37003: 36930,
        37004: 37204,
        37005: 37648,
        37006: 37656,
        37007: 38543,
        37008: 29790,
        37009: 39620,
        37010: 23815,
        37011: 23913,
        37012: 25968,
        37013: 26530,
        37014: 36264,
        37015: 38619,
        37016: 25454,
        37017: 26441,
        37018: 26905,
        37019: 33733,
        37020: 38935,
        37021: 38592,
        37022: 35070,
        37023: 28548,
        37024: 25722,
        37025: 23544,
        37026: 19990,
        37027: 28716,
        37028: 30045,
        37029: 26159,
        37030: 20932,
        37031: 21046,
        37032: 21218,
        37033: 22995,
        37034: 24449,
        37035: 24615,
        37036: 25104,
        37037: 25919,
        37038: 25972,
        37039: 26143,
        37040: 26228,
        37041: 26866,
        37042: 26646,
        37043: 27491,
        37044: 28165,
        37045: 29298,
        37046: 29983,
        37047: 30427,
        37048: 31934,
        37049: 32854,
        37050: 22768,
        37051: 35069,
        37052: 35199,
        37053: 35488,
        37054: 35475,
        37055: 35531,
        37056: 36893,
        37057: 37266,
        37058: 38738,
        37059: 38745,
        37060: 25993,
        37061: 31246,
        37062: 33030,
        37063: 38587,
        37064: 24109,
        37065: 24796,
        37066: 25114,
        37067: 26021,
        37068: 26132,
        37069: 26512,
        37070: 30707,
        37071: 31309,
        37072: 31821,
        37073: 32318,
        37074: 33034,
        37075: 36012,
        37076: 36196,
        37077: 36321,
        37078: 36447,
        37079: 30889,
        37080: 20999,
        37081: 25305,
        37082: 25509,
        37083: 25666,
        37084: 25240,
        37085: 35373,
        37086: 31363,
        37087: 31680,
        37088: 35500,
        37089: 38634,
        37090: 32118,
        37091: 33292,
        37092: 34633,
        37093: 20185,
        37094: 20808,
        37095: 21315,
        37096: 21344,
        37097: 23459,
        37098: 23554,
        37099: 23574,
        37100: 24029,
        37101: 25126,
        37102: 25159,
        37103: 25776,
        37104: 26643,
        37105: 26676,
        37106: 27849,
        37107: 27973,
        37108: 27927,
        37109: 26579,
        37110: 28508,
        37111: 29006,
        37112: 29053,
        37113: 26059,
        37114: 31359,
        37115: 31661,
        37116: 32218,
        37184: 32330,
        37185: 32680,
        37186: 33146,
        37187: 33307,
        37188: 33337,
        37189: 34214,
        37190: 35438,
        37191: 36046,
        37192: 36341,
        37193: 36984,
        37194: 36983,
        37195: 37549,
        37196: 37521,
        37197: 38275,
        37198: 39854,
        37199: 21069,
        37200: 21892,
        37201: 28472,
        37202: 28982,
        37203: 20840,
        37204: 31109,
        37205: 32341,
        37206: 33203,
        37207: 31950,
        37208: 22092,
        37209: 22609,
        37210: 23720,
        37211: 25514,
        37212: 26366,
        37213: 26365,
        37214: 26970,
        37215: 29401,
        37216: 30095,
        37217: 30094,
        37218: 30990,
        37219: 31062,
        37220: 31199,
        37221: 31895,
        37222: 32032,
        37223: 32068,
        37224: 34311,
        37225: 35380,
        37226: 38459,
        37227: 36961,
        37228: 40736,
        37229: 20711,
        37230: 21109,
        37231: 21452,
        37232: 21474,
        37233: 20489,
        37234: 21930,
        37235: 22766,
        37236: 22863,
        37237: 29245,
        37238: 23435,
        37239: 23652,
        37240: 21277,
        37241: 24803,
        37242: 24819,
        37243: 25436,
        37244: 25475,
        37245: 25407,
        37246: 25531,
        37248: 25805,
        37249: 26089,
        37250: 26361,
        37251: 24035,
        37252: 27085,
        37253: 27133,
        37254: 28437,
        37255: 29157,
        37256: 20105,
        37257: 30185,
        37258: 30456,
        37259: 31379,
        37260: 31967,
        37261: 32207,
        37262: 32156,
        37263: 32865,
        37264: 33609,
        37265: 33624,
        37266: 33900,
        37267: 33980,
        37268: 34299,
        37269: 35013,
        37270: 36208,
        37271: 36865,
        37272: 36973,
        37273: 37783,
        37274: 38684,
        37275: 39442,
        37276: 20687,
        37277: 22679,
        37278: 24974,
        37279: 33235,
        37280: 34101,
        37281: 36104,
        37282: 36896,
        37283: 20419,
        37284: 20596,
        37285: 21063,
        37286: 21363,
        37287: 24687,
        37288: 25417,
        37289: 26463,
        37290: 28204,
        37291: 36275,
        37292: 36895,
        37293: 20439,
        37294: 23646,
        37295: 36042,
        37296: 26063,
        37297: 32154,
        37298: 21330,
        37299: 34966,
        37300: 20854,
        37301: 25539,
        37302: 23384,
        37303: 23403,
        37304: 23562,
        37305: 25613,
        37306: 26449,
        37307: 36956,
        37308: 20182,
        37309: 22810,
        37310: 22826,
        37311: 27760,
        37312: 35409,
        37313: 21822,
        37314: 22549,
        37315: 22949,
        37316: 24816,
        37317: 25171,
        37318: 26561,
        37319: 33333,
        37320: 26965,
        37321: 38464,
        37322: 39364,
        37323: 39464,
        37324: 20307,
        37325: 22534,
        37326: 23550,
        37327: 32784,
        37328: 23729,
        37329: 24111,
        37330: 24453,
        37331: 24608,
        37332: 24907,
        37333: 25140,
        37334: 26367,
        37335: 27888,
        37336: 28382,
        37337: 32974,
        37338: 33151,
        37339: 33492,
        37340: 34955,
        37341: 36024,
        37342: 36864,
        37343: 36910,
        37344: 38538,
        37345: 40667,
        37346: 39899,
        37347: 20195,
        37348: 21488,
        37349: 22823,
        37350: 31532,
        37351: 37261,
        37352: 38988,
        37353: 40441,
        37354: 28381,
        37355: 28711,
        37356: 21331,
        37357: 21828,
        37358: 23429,
        37359: 25176,
        37360: 25246,
        37361: 25299,
        37362: 27810,
        37363: 28655,
        37364: 29730,
        37365: 35351,
        37366: 37944,
        37367: 28609,
        37368: 35582,
        37369: 33592,
        37370: 20967,
        37371: 34552,
        37372: 21482,
        37440: 21481,
        37441: 20294,
        37442: 36948,
        37443: 36784,
        37444: 22890,
        37445: 33073,
        37446: 24061,
        37447: 31466,
        37448: 36799,
        37449: 26842,
        37450: 35895,
        37451: 29432,
        37452: 40008,
        37453: 27197,
        37454: 35504,
        37455: 20025,
        37456: 21336,
        37457: 22022,
        37458: 22374,
        37459: 25285,
        37460: 25506,
        37461: 26086,
        37462: 27470,
        37463: 28129,
        37464: 28251,
        37465: 28845,
        37466: 30701,
        37467: 31471,
        37468: 31658,
        37469: 32187,
        37470: 32829,
        37471: 32966,
        37472: 34507,
        37473: 35477,
        37474: 37723,
        37475: 22243,
        37476: 22727,
        37477: 24382,
        37478: 26029,
        37479: 26262,
        37480: 27264,
        37481: 27573,
        37482: 30007,
        37483: 35527,
        37484: 20516,
        37485: 30693,
        37486: 22320,
        37487: 24347,
        37488: 24677,
        37489: 26234,
        37490: 27744,
        37491: 30196,
        37492: 31258,
        37493: 32622,
        37494: 33268,
        37495: 34584,
        37496: 36933,
        37497: 39347,
        37498: 31689,
        37499: 30044,
        37500: 31481,
        37501: 31569,
        37502: 33988,
        37504: 36880,
        37505: 31209,
        37506: 31378,
        37507: 33590,
        37508: 23265,
        37509: 30528,
        37510: 20013,
        37511: 20210,
        37512: 23449,
        37513: 24544,
        37514: 25277,
        37515: 26172,
        37516: 26609,
        37517: 27880,
        37518: 34411,
        37519: 34935,
        37520: 35387,
        37521: 37198,
        37522: 37619,
        37523: 39376,
        37524: 27159,
        37525: 28710,
        37526: 29482,
        37527: 33511,
        37528: 33879,
        37529: 36015,
        37530: 19969,
        37531: 20806,
        37532: 20939,
        37533: 21899,
        37534: 23541,
        37535: 24086,
        37536: 24115,
        37537: 24193,
        37538: 24340,
        37539: 24373,
        37540: 24427,
        37541: 24500,
        37542: 25074,
        37543: 25361,
        37544: 26274,
        37545: 26397,
        37546: 28526,
        37547: 29266,
        37548: 30010,
        37549: 30522,
        37550: 32884,
        37551: 33081,
        37552: 33144,
        37553: 34678,
        37554: 35519,
        37555: 35548,
        37556: 36229,
        37557: 36339,
        37558: 37530,
        37559: 38263,
        37560: 38914,
        37561: 40165,
        37562: 21189,
        37563: 25431,
        37564: 30452,
        37565: 26389,
        37566: 27784,
        37567: 29645,
        37568: 36035,
        37569: 37806,
        37570: 38515,
        37571: 27941,
        37572: 22684,
        37573: 26894,
        37574: 27084,
        37575: 36861,
        37576: 37786,
        37577: 30171,
        37578: 36890,
        37579: 22618,
        37580: 26626,
        37581: 25524,
        37582: 27131,
        37583: 20291,
        37584: 28460,
        37585: 26584,
        37586: 36795,
        37587: 34086,
        37588: 32180,
        37589: 37716,
        37590: 26943,
        37591: 28528,
        37592: 22378,
        37593: 22775,
        37594: 23340,
        37595: 32044,
        37596: 29226,
        37597: 21514,
        37598: 37347,
        37599: 40372,
        37600: 20141,
        37601: 20302,
        37602: 20572,
        37603: 20597,
        37604: 21059,
        37605: 35998,
        37606: 21576,
        37607: 22564,
        37608: 23450,
        37609: 24093,
        37610: 24213,
        37611: 24237,
        37612: 24311,
        37613: 24351,
        37614: 24716,
        37615: 25269,
        37616: 25402,
        37617: 25552,
        37618: 26799,
        37619: 27712,
        37620: 30855,
        37621: 31118,
        37622: 31243,
        37623: 32224,
        37624: 33351,
        37625: 35330,
        37626: 35558,
        37627: 36420,
        37628: 36883,
        37696: 37048,
        37697: 37165,
        37698: 37336,
        37699: 40718,
        37700: 27877,
        37701: 25688,
        37702: 25826,
        37703: 25973,
        37704: 28404,
        37705: 30340,
        37706: 31515,
        37707: 36969,
        37708: 37841,
        37709: 28346,
        37710: 21746,
        37711: 24505,
        37712: 25764,
        37713: 36685,
        37714: 36845,
        37715: 37444,
        37716: 20856,
        37717: 22635,
        37718: 22825,
        37719: 23637,
        37720: 24215,
        37721: 28155,
        37722: 32399,
        37723: 29980,
        37724: 36028,
        37725: 36578,
        37726: 39003,
        37727: 28857,
        37728: 20253,
        37729: 27583,
        37730: 28593,
        37731: 3e4,
        37732: 38651,
        37733: 20814,
        37734: 21520,
        37735: 22581,
        37736: 22615,
        37737: 22956,
        37738: 23648,
        37739: 24466,
        37740: 26007,
        37741: 26460,
        37742: 28193,
        37743: 30331,
        37744: 33759,
        37745: 36077,
        37746: 36884,
        37747: 37117,
        37748: 37709,
        37749: 30757,
        37750: 30778,
        37751: 21162,
        37752: 24230,
        37753: 22303,
        37754: 22900,
        37755: 24594,
        37756: 20498,
        37757: 20826,
        37758: 20908,
        37760: 20941,
        37761: 20992,
        37762: 21776,
        37763: 22612,
        37764: 22616,
        37765: 22871,
        37766: 23445,
        37767: 23798,
        37768: 23947,
        37769: 24764,
        37770: 25237,
        37771: 25645,
        37772: 26481,
        37773: 26691,
        37774: 26812,
        37775: 26847,
        37776: 30423,
        37777: 28120,
        37778: 28271,
        37779: 28059,
        37780: 28783,
        37781: 29128,
        37782: 24403,
        37783: 30168,
        37784: 31095,
        37785: 31561,
        37786: 31572,
        37787: 31570,
        37788: 31958,
        37789: 32113,
        37790: 21040,
        37791: 33891,
        37792: 34153,
        37793: 34276,
        37794: 35342,
        37795: 35588,
        37796: 35910,
        37797: 36367,
        37798: 36867,
        37799: 36879,
        37800: 37913,
        37801: 38518,
        37802: 38957,
        37803: 39472,
        37804: 38360,
        37805: 20685,
        37806: 21205,
        37807: 21516,
        37808: 22530,
        37809: 23566,
        37810: 24999,
        37811: 25758,
        37812: 27934,
        37813: 30643,
        37814: 31461,
        37815: 33012,
        37816: 33796,
        37817: 36947,
        37818: 37509,
        37819: 23776,
        37820: 40199,
        37821: 21311,
        37822: 24471,
        37823: 24499,
        37824: 28060,
        37825: 29305,
        37826: 30563,
        37827: 31167,
        37828: 31716,
        37829: 27602,
        37830: 29420,
        37831: 35501,
        37832: 26627,
        37833: 27233,
        37834: 20984,
        37835: 31361,
        37836: 26932,
        37837: 23626,
        37838: 40182,
        37839: 33515,
        37840: 23493,
        37841: 37193,
        37842: 28702,
        37843: 22136,
        37844: 23663,
        37845: 24775,
        37846: 25958,
        37847: 27788,
        37848: 35930,
        37849: 36929,
        37850: 38931,
        37851: 21585,
        37852: 26311,
        37853: 37389,
        37854: 22856,
        37855: 37027,
        37856: 20869,
        37857: 20045,
        37858: 20970,
        37859: 34201,
        37860: 35598,
        37861: 28760,
        37862: 25466,
        37863: 37707,
        37864: 26978,
        37865: 39348,
        37866: 32260,
        37867: 30071,
        37868: 21335,
        37869: 26976,
        37870: 36575,
        37871: 38627,
        37872: 27741,
        37873: 20108,
        37874: 23612,
        37875: 24336,
        37876: 36841,
        37877: 21250,
        37878: 36049,
        37879: 32905,
        37880: 34425,
        37881: 24319,
        37882: 26085,
        37883: 20083,
        37884: 20837,
        37952: 22914,
        37953: 23615,
        37954: 38894,
        37955: 20219,
        37956: 22922,
        37957: 24525,
        37958: 35469,
        37959: 28641,
        37960: 31152,
        37961: 31074,
        37962: 23527,
        37963: 33905,
        37964: 29483,
        37965: 29105,
        37966: 24180,
        37967: 24565,
        37968: 25467,
        37969: 25754,
        37970: 29123,
        37971: 31896,
        37972: 20035,
        37973: 24316,
        37974: 20043,
        37975: 22492,
        37976: 22178,
        37977: 24745,
        37978: 28611,
        37979: 32013,
        37980: 33021,
        37981: 33075,
        37982: 33215,
        37983: 36786,
        37984: 35223,
        37985: 34468,
        37986: 24052,
        37987: 25226,
        37988: 25773,
        37989: 35207,
        37990: 26487,
        37991: 27874,
        37992: 27966,
        37993: 29750,
        37994: 30772,
        37995: 23110,
        37996: 32629,
        37997: 33453,
        37998: 39340,
        37999: 20467,
        38e3: 24259,
        38001: 25309,
        38002: 25490,
        38003: 25943,
        38004: 26479,
        38005: 30403,
        38006: 29260,
        38007: 32972,
        38008: 32954,
        38009: 36649,
        38010: 37197,
        38011: 20493,
        38012: 22521,
        38013: 23186,
        38014: 26757,
        38016: 26995,
        38017: 29028,
        38018: 29437,
        38019: 36023,
        38020: 22770,
        38021: 36064,
        38022: 38506,
        38023: 36889,
        38024: 34687,
        38025: 31204,
        38026: 30695,
        38027: 33833,
        38028: 20271,
        38029: 21093,
        38030: 21338,
        38031: 25293,
        38032: 26575,
        38033: 27850,
        38034: 30333,
        38035: 31636,
        38036: 31893,
        38037: 33334,
        38038: 34180,
        38039: 36843,
        38040: 26333,
        38041: 28448,
        38042: 29190,
        38043: 32283,
        38044: 33707,
        38045: 39361,
        38046: 40614,
        38047: 20989,
        38048: 31665,
        38049: 30834,
        38050: 31672,
        38051: 32903,
        38052: 31560,
        38053: 27368,
        38054: 24161,
        38055: 32908,
        38056: 30033,
        38057: 30048,
        38058: 20843,
        38059: 37474,
        38060: 28300,
        38061: 30330,
        38062: 37271,
        38063: 39658,
        38064: 20240,
        38065: 32624,
        38066: 25244,
        38067: 31567,
        38068: 38309,
        38069: 40169,
        38070: 22138,
        38071: 22617,
        38072: 34532,
        38073: 38588,
        38074: 20276,
        38075: 21028,
        38076: 21322,
        38077: 21453,
        38078: 21467,
        38079: 24070,
        38080: 25644,
        38081: 26001,
        38082: 26495,
        38083: 27710,
        38084: 27726,
        38085: 29256,
        38086: 29359,
        38087: 29677,
        38088: 30036,
        38089: 32321,
        38090: 33324,
        38091: 34281,
        38092: 36009,
        38093: 31684,
        38094: 37318,
        38095: 29033,
        38096: 38930,
        38097: 39151,
        38098: 25405,
        38099: 26217,
        38100: 30058,
        38101: 30436,
        38102: 30928,
        38103: 34115,
        38104: 34542,
        38105: 21290,
        38106: 21329,
        38107: 21542,
        38108: 22915,
        38109: 24199,
        38110: 24444,
        38111: 24754,
        38112: 25161,
        38113: 25209,
        38114: 25259,
        38115: 26e3,
        38116: 27604,
        38117: 27852,
        38118: 30130,
        38119: 30382,
        38120: 30865,
        38121: 31192,
        38122: 32203,
        38123: 32631,
        38124: 32933,
        38125: 34987,
        38126: 35513,
        38127: 36027,
        38128: 36991,
        38129: 38750,
        38130: 39131,
        38131: 27147,
        38132: 31800,
        38133: 20633,
        38134: 23614,
        38135: 24494,
        38136: 26503,
        38137: 27608,
        38138: 29749,
        38139: 30473,
        38140: 32654,
        38208: 40763,
        38209: 26570,
        38210: 31255,
        38211: 21305,
        38212: 30091,
        38213: 39661,
        38214: 24422,
        38215: 33181,
        38216: 33777,
        38217: 32920,
        38218: 24380,
        38219: 24517,
        38220: 30050,
        38221: 31558,
        38222: 36924,
        38223: 26727,
        38224: 23019,
        38225: 23195,
        38226: 32016,
        38227: 30334,
        38228: 35628,
        38229: 20469,
        38230: 24426,
        38231: 27161,
        38232: 27703,
        38233: 28418,
        38234: 29922,
        38235: 31080,
        38236: 34920,
        38237: 35413,
        38238: 35961,
        38239: 24287,
        38240: 25551,
        38241: 30149,
        38242: 31186,
        38243: 33495,
        38244: 37672,
        38245: 37618,
        38246: 33948,
        38247: 34541,
        38248: 39981,
        38249: 21697,
        38250: 24428,
        38251: 25996,
        38252: 27996,
        38253: 28693,
        38254: 36007,
        38255: 36051,
        38256: 38971,
        38257: 25935,
        38258: 29942,
        38259: 19981,
        38260: 20184,
        38261: 22496,
        38262: 22827,
        38263: 23142,
        38264: 23500,
        38265: 20904,
        38266: 24067,
        38267: 24220,
        38268: 24598,
        38269: 25206,
        38270: 25975,
        38272: 26023,
        38273: 26222,
        38274: 28014,
        38275: 29238,
        38276: 31526,
        38277: 33104,
        38278: 33178,
        38279: 33433,
        38280: 35676,
        38281: 36e3,
        38282: 36070,
        38283: 36212,
        38284: 38428,
        38285: 38468,
        38286: 20398,
        38287: 25771,
        38288: 27494,
        38289: 33310,
        38290: 33889,
        38291: 34154,
        38292: 37096,
        38293: 23553,
        38294: 26963,
        38295: 39080,
        38296: 33914,
        38297: 34135,
        38298: 20239,
        38299: 21103,
        38300: 24489,
        38301: 24133,
        38302: 26381,
        38303: 31119,
        38304: 33145,
        38305: 35079,
        38306: 35206,
        38307: 28149,
        38308: 24343,
        38309: 25173,
        38310: 27832,
        38311: 20175,
        38312: 29289,
        38313: 39826,
        38314: 20998,
        38315: 21563,
        38316: 22132,
        38317: 22707,
        38318: 24996,
        38319: 25198,
        38320: 28954,
        38321: 22894,
        38322: 31881,
        38323: 31966,
        38324: 32027,
        38325: 38640,
        38326: 25991,
        38327: 32862,
        38328: 19993,
        38329: 20341,
        38330: 20853,
        38331: 22592,
        38332: 24163,
        38333: 24179,
        38334: 24330,
        38335: 26564,
        38336: 20006,
        38337: 34109,
        38338: 38281,
        38339: 38491,
        38340: 31859,
        38341: 38913,
        38342: 20731,
        38343: 22721,
        38344: 30294,
        38345: 30887,
        38346: 21029,
        38347: 30629,
        38348: 34065,
        38349: 31622,
        38350: 20559,
        38351: 22793,
        38352: 29255,
        38353: 31687,
        38354: 32232,
        38355: 36794,
        38356: 36820,
        38357: 36941,
        38358: 20415,
        38359: 21193,
        38360: 23081,
        38361: 24321,
        38362: 38829,
        38363: 20445,
        38364: 33303,
        38365: 37610,
        38366: 22275,
        38367: 25429,
        38368: 27497,
        38369: 29995,
        38370: 35036,
        38371: 36628,
        38372: 31298,
        38373: 21215,
        38374: 22675,
        38375: 24917,
        38376: 25098,
        38377: 26286,
        38378: 27597,
        38379: 31807,
        38380: 33769,
        38381: 20515,
        38382: 20472,
        38383: 21253,
        38384: 21574,
        38385: 22577,
        38386: 22857,
        38387: 23453,
        38388: 23792,
        38389: 23791,
        38390: 23849,
        38391: 24214,
        38392: 25265,
        38393: 25447,
        38394: 25918,
        38395: 26041,
        38396: 26379,
        38464: 27861,
        38465: 27873,
        38466: 28921,
        38467: 30770,
        38468: 32299,
        38469: 32990,
        38470: 33459,
        38471: 33804,
        38472: 34028,
        38473: 34562,
        38474: 35090,
        38475: 35370,
        38476: 35914,
        38477: 37030,
        38478: 37586,
        38479: 39165,
        38480: 40179,
        38481: 40300,
        38482: 20047,
        38483: 20129,
        38484: 20621,
        38485: 21078,
        38486: 22346,
        38487: 22952,
        38488: 24125,
        38489: 24536,
        38490: 24537,
        38491: 25151,
        38492: 26292,
        38493: 26395,
        38494: 26576,
        38495: 26834,
        38496: 20882,
        38497: 32033,
        38498: 32938,
        38499: 33192,
        38500: 35584,
        38501: 35980,
        38502: 36031,
        38503: 37502,
        38504: 38450,
        38505: 21536,
        38506: 38956,
        38507: 21271,
        38508: 20693,
        38509: 21340,
        38510: 22696,
        38511: 25778,
        38512: 26420,
        38513: 29287,
        38514: 30566,
        38515: 31302,
        38516: 37350,
        38517: 21187,
        38518: 27809,
        38519: 27526,
        38520: 22528,
        38521: 24140,
        38522: 22868,
        38523: 26412,
        38524: 32763,
        38525: 20961,
        38526: 30406,
        38528: 25705,
        38529: 30952,
        38530: 39764,
        38531: 40635,
        38532: 22475,
        38533: 22969,
        38534: 26151,
        38535: 26522,
        38536: 27598,
        38537: 21737,
        38538: 27097,
        38539: 24149,
        38540: 33180,
        38541: 26517,
        38542: 39850,
        38543: 26622,
        38544: 40018,
        38545: 26717,
        38546: 20134,
        38547: 20451,
        38548: 21448,
        38549: 25273,
        38550: 26411,
        38551: 27819,
        38552: 36804,
        38553: 20397,
        38554: 32365,
        38555: 40639,
        38556: 19975,
        38557: 24930,
        38558: 28288,
        38559: 28459,
        38560: 34067,
        38561: 21619,
        38562: 26410,
        38563: 39749,
        38564: 24051,
        38565: 31637,
        38566: 23724,
        38567: 23494,
        38568: 34588,
        38569: 28234,
        38570: 34001,
        38571: 31252,
        38572: 33032,
        38573: 22937,
        38574: 31885,
        38575: 27665,
        38576: 30496,
        38577: 21209,
        38578: 22818,
        38579: 28961,
        38580: 29279,
        38581: 30683,
        38582: 38695,
        38583: 40289,
        38584: 26891,
        38585: 23167,
        38586: 23064,
        38587: 20901,
        38588: 21517,
        38589: 21629,
        38590: 26126,
        38591: 30431,
        38592: 36855,
        38593: 37528,
        38594: 40180,
        38595: 23018,
        38596: 29277,
        38597: 28357,
        38598: 20813,
        38599: 26825,
        38600: 32191,
        38601: 32236,
        38602: 38754,
        38603: 40634,
        38604: 25720,
        38605: 27169,
        38606: 33538,
        38607: 22916,
        38608: 23391,
        38609: 27611,
        38610: 29467,
        38611: 30450,
        38612: 32178,
        38613: 32791,
        38614: 33945,
        38615: 20786,
        38616: 26408,
        38617: 40665,
        38618: 30446,
        38619: 26466,
        38620: 21247,
        38621: 39173,
        38622: 23588,
        38623: 25147,
        38624: 31870,
        38625: 36016,
        38626: 21839,
        38627: 24758,
        38628: 32011,
        38629: 38272,
        38630: 21249,
        38631: 20063,
        38632: 20918,
        38633: 22812,
        38634: 29242,
        38635: 32822,
        38636: 37326,
        38637: 24357,
        38638: 30690,
        38639: 21380,
        38640: 24441,
        38641: 32004,
        38642: 34220,
        38643: 35379,
        38644: 36493,
        38645: 38742,
        38646: 26611,
        38647: 34222,
        38648: 37971,
        38649: 24841,
        38650: 24840,
        38651: 27833,
        38652: 30290,
        38720: 35565,
        38721: 36664,
        38722: 21807,
        38723: 20305,
        38724: 20778,
        38725: 21191,
        38726: 21451,
        38727: 23461,
        38728: 24189,
        38729: 24736,
        38730: 24962,
        38731: 25558,
        38732: 26377,
        38733: 26586,
        38734: 28263,
        38735: 28044,
        38736: 29494,
        38737: 29495,
        38738: 30001,
        38739: 31056,
        38740: 35029,
        38741: 35480,
        38742: 36938,
        38743: 37009,
        38744: 37109,
        38745: 38596,
        38746: 34701,
        38747: 22805,
        38748: 20104,
        38749: 20313,
        38750: 19982,
        38751: 35465,
        38752: 36671,
        38753: 38928,
        38754: 20653,
        38755: 24188,
        38756: 22934,
        38757: 23481,
        38758: 24248,
        38759: 25562,
        38760: 25594,
        38761: 25793,
        38762: 26332,
        38763: 26954,
        38764: 27096,
        38765: 27915,
        38766: 28342,
        38767: 29076,
        38768: 29992,
        38769: 31407,
        38770: 32650,
        38771: 32768,
        38772: 33865,
        38773: 33993,
        38774: 35201,
        38775: 35617,
        38776: 36362,
        38777: 36965,
        38778: 38525,
        38779: 39178,
        38780: 24958,
        38781: 25233,
        38782: 27442,
        38784: 27779,
        38785: 28020,
        38786: 32716,
        38787: 32764,
        38788: 28096,
        38789: 32645,
        38790: 34746,
        38791: 35064,
        38792: 26469,
        38793: 33713,
        38794: 38972,
        38795: 38647,
        38796: 27931,
        38797: 32097,
        38798: 33853,
        38799: 37226,
        38800: 20081,
        38801: 21365,
        38802: 23888,
        38803: 27396,
        38804: 28651,
        38805: 34253,
        38806: 34349,
        38807: 35239,
        38808: 21033,
        38809: 21519,
        38810: 23653,
        38811: 26446,
        38812: 26792,
        38813: 29702,
        38814: 29827,
        38815: 30178,
        38816: 35023,
        38817: 35041,
        38818: 37324,
        38819: 38626,
        38820: 38520,
        38821: 24459,
        38822: 29575,
        38823: 31435,
        38824: 33870,
        38825: 25504,
        38826: 30053,
        38827: 21129,
        38828: 27969,
        38829: 28316,
        38830: 29705,
        38831: 30041,
        38832: 30827,
        38833: 31890,
        38834: 38534,
        38835: 31452,
        38836: 40845,
        38837: 20406,
        38838: 24942,
        38839: 26053,
        38840: 34396,
        38841: 20102,
        38842: 20142,
        38843: 20698,
        38844: 20001,
        38845: 20940,
        38846: 23534,
        38847: 26009,
        38848: 26753,
        38849: 28092,
        38850: 29471,
        38851: 30274,
        38852: 30637,
        38853: 31260,
        38854: 31975,
        38855: 33391,
        38856: 35538,
        38857: 36988,
        38858: 37327,
        38859: 38517,
        38860: 38936,
        38861: 21147,
        38862: 32209,
        38863: 20523,
        38864: 21400,
        38865: 26519,
        38866: 28107,
        38867: 29136,
        38868: 29747,
        38869: 33256,
        38870: 36650,
        38871: 38563,
        38872: 40023,
        38873: 40607,
        38874: 29792,
        38875: 22593,
        38876: 28057,
        38877: 32047,
        38878: 39006,
        38879: 20196,
        38880: 20278,
        38881: 20363,
        38882: 20919,
        38883: 21169,
        38884: 23994,
        38885: 24604,
        38886: 29618,
        38887: 31036,
        38888: 33491,
        38889: 37428,
        38890: 38583,
        38891: 38646,
        38892: 38666,
        38893: 40599,
        38894: 40802,
        38895: 26278,
        38896: 27508,
        38897: 21015,
        38898: 21155,
        38899: 28872,
        38900: 35010,
        38901: 24265,
        38902: 24651,
        38903: 24976,
        38904: 28451,
        38905: 29001,
        38906: 31806,
        38907: 32244,
        38908: 32879,
        38976: 34030,
        38977: 36899,
        38978: 37676,
        38979: 21570,
        38980: 39791,
        38981: 27347,
        38982: 28809,
        38983: 36034,
        38984: 36335,
        38985: 38706,
        38986: 21172,
        38987: 23105,
        38988: 24266,
        38989: 24324,
        38990: 26391,
        38991: 27004,
        38992: 27028,
        38993: 28010,
        38994: 28431,
        38995: 29282,
        38996: 29436,
        38997: 31725,
        38998: 32769,
        38999: 32894,
        39e3: 34635,
        39001: 37070,
        39002: 20845,
        39003: 40595,
        39004: 31108,
        39005: 32907,
        39006: 37682,
        39007: 35542,
        39008: 20525,
        39009: 21644,
        39010: 35441,
        39011: 27498,
        39012: 36036,
        39013: 33031,
        39014: 24785,
        39015: 26528,
        39016: 40434,
        39017: 20121,
        39018: 20120,
        39019: 39952,
        39020: 35435,
        39021: 34241,
        39022: 34152,
        39023: 26880,
        39024: 28286,
        39025: 30871,
        39026: 33109,
        39071: 24332,
        39072: 19984,
        39073: 19989,
        39074: 20010,
        39075: 20017,
        39076: 20022,
        39077: 20028,
        39078: 20031,
        39079: 20034,
        39080: 20054,
        39081: 20056,
        39082: 20098,
        39083: 20101,
        39084: 35947,
        39085: 20106,
        39086: 33298,
        39087: 24333,
        39088: 20110,
        39089: 20126,
        39090: 20127,
        39091: 20128,
        39092: 20130,
        39093: 20144,
        39094: 20147,
        39095: 20150,
        39096: 20174,
        39097: 20173,
        39098: 20164,
        39099: 20166,
        39100: 20162,
        39101: 20183,
        39102: 20190,
        39103: 20205,
        39104: 20191,
        39105: 20215,
        39106: 20233,
        39107: 20314,
        39108: 20272,
        39109: 20315,
        39110: 20317,
        39111: 20311,
        39112: 20295,
        39113: 20342,
        39114: 20360,
        39115: 20367,
        39116: 20376,
        39117: 20347,
        39118: 20329,
        39119: 20336,
        39120: 20369,
        39121: 20335,
        39122: 20358,
        39123: 20374,
        39124: 20760,
        39125: 20436,
        39126: 20447,
        39127: 20430,
        39128: 20440,
        39129: 20443,
        39130: 20433,
        39131: 20442,
        39132: 20432,
        39133: 20452,
        39134: 20453,
        39135: 20506,
        39136: 20520,
        39137: 20500,
        39138: 20522,
        39139: 20517,
        39140: 20485,
        39141: 20252,
        39142: 20470,
        39143: 20513,
        39144: 20521,
        39145: 20524,
        39146: 20478,
        39147: 20463,
        39148: 20497,
        39149: 20486,
        39150: 20547,
        39151: 20551,
        39152: 26371,
        39153: 20565,
        39154: 20560,
        39155: 20552,
        39156: 20570,
        39157: 20566,
        39158: 20588,
        39159: 20600,
        39160: 20608,
        39161: 20634,
        39162: 20613,
        39163: 20660,
        39164: 20658,
        39232: 20681,
        39233: 20682,
        39234: 20659,
        39235: 20674,
        39236: 20694,
        39237: 20702,
        39238: 20709,
        39239: 20717,
        39240: 20707,
        39241: 20718,
        39242: 20729,
        39243: 20725,
        39244: 20745,
        39245: 20737,
        39246: 20738,
        39247: 20758,
        39248: 20757,
        39249: 20756,
        39250: 20762,
        39251: 20769,
        39252: 20794,
        39253: 20791,
        39254: 20796,
        39255: 20795,
        39256: 20799,
        39257: 20800,
        39258: 20818,
        39259: 20812,
        39260: 20820,
        39261: 20834,
        39262: 31480,
        39263: 20841,
        39264: 20842,
        39265: 20846,
        39266: 20864,
        39267: 20866,
        39268: 22232,
        39269: 20876,
        39270: 20873,
        39271: 20879,
        39272: 20881,
        39273: 20883,
        39274: 20885,
        39275: 20886,
        39276: 20900,
        39277: 20902,
        39278: 20898,
        39279: 20905,
        39280: 20906,
        39281: 20907,
        39282: 20915,
        39283: 20913,
        39284: 20914,
        39285: 20912,
        39286: 20917,
        39287: 20925,
        39288: 20933,
        39289: 20937,
        39290: 20955,
        39291: 20960,
        39292: 34389,
        39293: 20969,
        39294: 20973,
        39296: 20976,
        39297: 20981,
        39298: 20990,
        39299: 20996,
        39300: 21003,
        39301: 21012,
        39302: 21006,
        39303: 21031,
        39304: 21034,
        39305: 21038,
        39306: 21043,
        39307: 21049,
        39308: 21071,
        39309: 21060,
        39310: 21067,
        39311: 21068,
        39312: 21086,
        39313: 21076,
        39314: 21098,
        39315: 21108,
        39316: 21097,
        39317: 21107,
        39318: 21119,
        39319: 21117,
        39320: 21133,
        39321: 21140,
        39322: 21138,
        39323: 21105,
        39324: 21128,
        39325: 21137,
        39326: 36776,
        39327: 36775,
        39328: 21164,
        39329: 21165,
        39330: 21180,
        39331: 21173,
        39332: 21185,
        39333: 21197,
        39334: 21207,
        39335: 21214,
        39336: 21219,
        39337: 21222,
        39338: 39149,
        39339: 21216,
        39340: 21235,
        39341: 21237,
        39342: 21240,
        39343: 21241,
        39344: 21254,
        39345: 21256,
        39346: 30008,
        39347: 21261,
        39348: 21264,
        39349: 21263,
        39350: 21269,
        39351: 21274,
        39352: 21283,
        39353: 21295,
        39354: 21297,
        39355: 21299,
        39356: 21304,
        39357: 21312,
        39358: 21318,
        39359: 21317,
        39360: 19991,
        39361: 21321,
        39362: 21325,
        39363: 20950,
        39364: 21342,
        39365: 21353,
        39366: 21358,
        39367: 22808,
        39368: 21371,
        39369: 21367,
        39370: 21378,
        39371: 21398,
        39372: 21408,
        39373: 21414,
        39374: 21413,
        39375: 21422,
        39376: 21424,
        39377: 21430,
        39378: 21443,
        39379: 31762,
        39380: 38617,
        39381: 21471,
        39382: 26364,
        39383: 29166,
        39384: 21486,
        39385: 21480,
        39386: 21485,
        39387: 21498,
        39388: 21505,
        39389: 21565,
        39390: 21568,
        39391: 21548,
        39392: 21549,
        39393: 21564,
        39394: 21550,
        39395: 21558,
        39396: 21545,
        39397: 21533,
        39398: 21582,
        39399: 21647,
        39400: 21621,
        39401: 21646,
        39402: 21599,
        39403: 21617,
        39404: 21623,
        39405: 21616,
        39406: 21650,
        39407: 21627,
        39408: 21632,
        39409: 21622,
        39410: 21636,
        39411: 21648,
        39412: 21638,
        39413: 21703,
        39414: 21666,
        39415: 21688,
        39416: 21669,
        39417: 21676,
        39418: 21700,
        39419: 21704,
        39420: 21672,
        39488: 21675,
        39489: 21698,
        39490: 21668,
        39491: 21694,
        39492: 21692,
        39493: 21720,
        39494: 21733,
        39495: 21734,
        39496: 21775,
        39497: 21780,
        39498: 21757,
        39499: 21742,
        39500: 21741,
        39501: 21754,
        39502: 21730,
        39503: 21817,
        39504: 21824,
        39505: 21859,
        39506: 21836,
        39507: 21806,
        39508: 21852,
        39509: 21829,
        39510: 21846,
        39511: 21847,
        39512: 21816,
        39513: 21811,
        39514: 21853,
        39515: 21913,
        39516: 21888,
        39517: 21679,
        39518: 21898,
        39519: 21919,
        39520: 21883,
        39521: 21886,
        39522: 21912,
        39523: 21918,
        39524: 21934,
        39525: 21884,
        39526: 21891,
        39527: 21929,
        39528: 21895,
        39529: 21928,
        39530: 21978,
        39531: 21957,
        39532: 21983,
        39533: 21956,
        39534: 21980,
        39535: 21988,
        39536: 21972,
        39537: 22036,
        39538: 22007,
        39539: 22038,
        39540: 22014,
        39541: 22013,
        39542: 22043,
        39543: 22009,
        39544: 22094,
        39545: 22096,
        39546: 29151,
        39547: 22068,
        39548: 22070,
        39549: 22066,
        39550: 22072,
        39552: 22123,
        39553: 22116,
        39554: 22063,
        39555: 22124,
        39556: 22122,
        39557: 22150,
        39558: 22144,
        39559: 22154,
        39560: 22176,
        39561: 22164,
        39562: 22159,
        39563: 22181,
        39564: 22190,
        39565: 22198,
        39566: 22196,
        39567: 22210,
        39568: 22204,
        39569: 22209,
        39570: 22211,
        39571: 22208,
        39572: 22216,
        39573: 22222,
        39574: 22225,
        39575: 22227,
        39576: 22231,
        39577: 22254,
        39578: 22265,
        39579: 22272,
        39580: 22271,
        39581: 22276,
        39582: 22281,
        39583: 22280,
        39584: 22283,
        39585: 22285,
        39586: 22291,
        39587: 22296,
        39588: 22294,
        39589: 21959,
        39590: 22300,
        39591: 22310,
        39592: 22327,
        39593: 22328,
        39594: 22350,
        39595: 22331,
        39596: 22336,
        39597: 22351,
        39598: 22377,
        39599: 22464,
        39600: 22408,
        39601: 22369,
        39602: 22399,
        39603: 22409,
        39604: 22419,
        39605: 22432,
        39606: 22451,
        39607: 22436,
        39608: 22442,
        39609: 22448,
        39610: 22467,
        39611: 22470,
        39612: 22484,
        39613: 22482,
        39614: 22483,
        39615: 22538,
        39616: 22486,
        39617: 22499,
        39618: 22539,
        39619: 22553,
        39620: 22557,
        39621: 22642,
        39622: 22561,
        39623: 22626,
        39624: 22603,
        39625: 22640,
        39626: 27584,
        39627: 22610,
        39628: 22589,
        39629: 22649,
        39630: 22661,
        39631: 22713,
        39632: 22687,
        39633: 22699,
        39634: 22714,
        39635: 22750,
        39636: 22715,
        39637: 22712,
        39638: 22702,
        39639: 22725,
        39640: 22739,
        39641: 22737,
        39642: 22743,
        39643: 22745,
        39644: 22744,
        39645: 22757,
        39646: 22748,
        39647: 22756,
        39648: 22751,
        39649: 22767,
        39650: 22778,
        39651: 22777,
        39652: 22779,
        39653: 22780,
        39654: 22781,
        39655: 22786,
        39656: 22794,
        39657: 22800,
        39658: 22811,
        39659: 26790,
        39660: 22821,
        39661: 22828,
        39662: 22829,
        39663: 22834,
        39664: 22840,
        39665: 22846,
        39666: 31442,
        39667: 22869,
        39668: 22864,
        39669: 22862,
        39670: 22874,
        39671: 22872,
        39672: 22882,
        39673: 22880,
        39674: 22887,
        39675: 22892,
        39676: 22889,
        39744: 22904,
        39745: 22913,
        39746: 22941,
        39747: 20318,
        39748: 20395,
        39749: 22947,
        39750: 22962,
        39751: 22982,
        39752: 23016,
        39753: 23004,
        39754: 22925,
        39755: 23001,
        39756: 23002,
        39757: 23077,
        39758: 23071,
        39759: 23057,
        39760: 23068,
        39761: 23049,
        39762: 23066,
        39763: 23104,
        39764: 23148,
        39765: 23113,
        39766: 23093,
        39767: 23094,
        39768: 23138,
        39769: 23146,
        39770: 23194,
        39771: 23228,
        39772: 23230,
        39773: 23243,
        39774: 23234,
        39775: 23229,
        39776: 23267,
        39777: 23255,
        39778: 23270,
        39779: 23273,
        39780: 23254,
        39781: 23290,
        39782: 23291,
        39783: 23308,
        39784: 23307,
        39785: 23318,
        39786: 23346,
        39787: 23248,
        39788: 23338,
        39789: 23350,
        39790: 23358,
        39791: 23363,
        39792: 23365,
        39793: 23360,
        39794: 23377,
        39795: 23381,
        39796: 23386,
        39797: 23387,
        39798: 23397,
        39799: 23401,
        39800: 23408,
        39801: 23411,
        39802: 23413,
        39803: 23416,
        39804: 25992,
        39805: 23418,
        39806: 23424,
        39808: 23427,
        39809: 23462,
        39810: 23480,
        39811: 23491,
        39812: 23495,
        39813: 23497,
        39814: 23508,
        39815: 23504,
        39816: 23524,
        39817: 23526,
        39818: 23522,
        39819: 23518,
        39820: 23525,
        39821: 23531,
        39822: 23536,
        39823: 23542,
        39824: 23539,
        39825: 23557,
        39826: 23559,
        39827: 23560,
        39828: 23565,
        39829: 23571,
        39830: 23584,
        39831: 23586,
        39832: 23592,
        39833: 23608,
        39834: 23609,
        39835: 23617,
        39836: 23622,
        39837: 23630,
        39838: 23635,
        39839: 23632,
        39840: 23631,
        39841: 23409,
        39842: 23660,
        39843: 23662,
        39844: 20066,
        39845: 23670,
        39846: 23673,
        39847: 23692,
        39848: 23697,
        39849: 23700,
        39850: 22939,
        39851: 23723,
        39852: 23739,
        39853: 23734,
        39854: 23740,
        39855: 23735,
        39856: 23749,
        39857: 23742,
        39858: 23751,
        39859: 23769,
        39860: 23785,
        39861: 23805,
        39862: 23802,
        39863: 23789,
        39864: 23948,
        39865: 23786,
        39866: 23819,
        39867: 23829,
        39868: 23831,
        39869: 23900,
        39870: 23839,
        39871: 23835,
        39872: 23825,
        39873: 23828,
        39874: 23842,
        39875: 23834,
        39876: 23833,
        39877: 23832,
        39878: 23884,
        39879: 23890,
        39880: 23886,
        39881: 23883,
        39882: 23916,
        39883: 23923,
        39884: 23926,
        39885: 23943,
        39886: 23940,
        39887: 23938,
        39888: 23970,
        39889: 23965,
        39890: 23980,
        39891: 23982,
        39892: 23997,
        39893: 23952,
        39894: 23991,
        39895: 23996,
        39896: 24009,
        39897: 24013,
        39898: 24019,
        39899: 24018,
        39900: 24022,
        39901: 24027,
        39902: 24043,
        39903: 24050,
        39904: 24053,
        39905: 24075,
        39906: 24090,
        39907: 24089,
        39908: 24081,
        39909: 24091,
        39910: 24118,
        39911: 24119,
        39912: 24132,
        39913: 24131,
        39914: 24128,
        39915: 24142,
        39916: 24151,
        39917: 24148,
        39918: 24159,
        39919: 24162,
        39920: 24164,
        39921: 24135,
        39922: 24181,
        39923: 24182,
        39924: 24186,
        39925: 40636,
        39926: 24191,
        39927: 24224,
        39928: 24257,
        39929: 24258,
        39930: 24264,
        39931: 24272,
        39932: 24271,
        4e4: 24278,
        40001: 24291,
        40002: 24285,
        40003: 24282,
        40004: 24283,
        40005: 24290,
        40006: 24289,
        40007: 24296,
        40008: 24297,
        40009: 24300,
        40010: 24305,
        40011: 24307,
        40012: 24304,
        40013: 24308,
        40014: 24312,
        40015: 24318,
        40016: 24323,
        40017: 24329,
        40018: 24413,
        40019: 24412,
        40020: 24331,
        40021: 24337,
        40022: 24342,
        40023: 24361,
        40024: 24365,
        40025: 24376,
        40026: 24385,
        40027: 24392,
        40028: 24396,
        40029: 24398,
        40030: 24367,
        40031: 24401,
        40032: 24406,
        40033: 24407,
        40034: 24409,
        40035: 24417,
        40036: 24429,
        40037: 24435,
        40038: 24439,
        40039: 24451,
        40040: 24450,
        40041: 24447,
        40042: 24458,
        40043: 24456,
        40044: 24465,
        40045: 24455,
        40046: 24478,
        40047: 24473,
        40048: 24472,
        40049: 24480,
        40050: 24488,
        40051: 24493,
        40052: 24508,
        40053: 24534,
        40054: 24571,
        40055: 24548,
        40056: 24568,
        40057: 24561,
        40058: 24541,
        40059: 24755,
        40060: 24575,
        40061: 24609,
        40062: 24672,
        40064: 24601,
        40065: 24592,
        40066: 24617,
        40067: 24590,
        40068: 24625,
        40069: 24603,
        40070: 24597,
        40071: 24619,
        40072: 24614,
        40073: 24591,
        40074: 24634,
        40075: 24666,
        40076: 24641,
        40077: 24682,
        40078: 24695,
        40079: 24671,
        40080: 24650,
        40081: 24646,
        40082: 24653,
        40083: 24675,
        40084: 24643,
        40085: 24676,
        40086: 24642,
        40087: 24684,
        40088: 24683,
        40089: 24665,
        40090: 24705,
        40091: 24717,
        40092: 24807,
        40093: 24707,
        40094: 24730,
        40095: 24708,
        40096: 24731,
        40097: 24726,
        40098: 24727,
        40099: 24722,
        40100: 24743,
        40101: 24715,
        40102: 24801,
        40103: 24760,
        40104: 24800,
        40105: 24787,
        40106: 24756,
        40107: 24560,
        40108: 24765,
        40109: 24774,
        40110: 24757,
        40111: 24792,
        40112: 24909,
        40113: 24853,
        40114: 24838,
        40115: 24822,
        40116: 24823,
        40117: 24832,
        40118: 24820,
        40119: 24826,
        40120: 24835,
        40121: 24865,
        40122: 24827,
        40123: 24817,
        40124: 24845,
        40125: 24846,
        40126: 24903,
        40127: 24894,
        40128: 24872,
        40129: 24871,
        40130: 24906,
        40131: 24895,
        40132: 24892,
        40133: 24876,
        40134: 24884,
        40135: 24893,
        40136: 24898,
        40137: 24900,
        40138: 24947,
        40139: 24951,
        40140: 24920,
        40141: 24921,
        40142: 24922,
        40143: 24939,
        40144: 24948,
        40145: 24943,
        40146: 24933,
        40147: 24945,
        40148: 24927,
        40149: 24925,
        40150: 24915,
        40151: 24949,
        40152: 24985,
        40153: 24982,
        40154: 24967,
        40155: 25004,
        40156: 24980,
        40157: 24986,
        40158: 24970,
        40159: 24977,
        40160: 25003,
        40161: 25006,
        40162: 25036,
        40163: 25034,
        40164: 25033,
        40165: 25079,
        40166: 25032,
        40167: 25027,
        40168: 25030,
        40169: 25018,
        40170: 25035,
        40171: 32633,
        40172: 25037,
        40173: 25062,
        40174: 25059,
        40175: 25078,
        40176: 25082,
        40177: 25076,
        40178: 25087,
        40179: 25085,
        40180: 25084,
        40181: 25086,
        40182: 25088,
        40183: 25096,
        40184: 25097,
        40185: 25101,
        40186: 25100,
        40187: 25108,
        40188: 25115,
        40256: 25118,
        40257: 25121,
        40258: 25130,
        40259: 25134,
        40260: 25136,
        40261: 25138,
        40262: 25139,
        40263: 25153,
        40264: 25166,
        40265: 25182,
        40266: 25187,
        40267: 25179,
        40268: 25184,
        40269: 25192,
        40270: 25212,
        40271: 25218,
        40272: 25225,
        40273: 25214,
        40274: 25234,
        40275: 25235,
        40276: 25238,
        40277: 25300,
        40278: 25219,
        40279: 25236,
        40280: 25303,
        40281: 25297,
        40282: 25275,
        40283: 25295,
        40284: 25343,
        40285: 25286,
        40286: 25812,
        40287: 25288,
        40288: 25308,
        40289: 25292,
        40290: 25290,
        40291: 25282,
        40292: 25287,
        40293: 25243,
        40294: 25289,
        40295: 25356,
        40296: 25326,
        40297: 25329,
        40298: 25383,
        40299: 25346,
        40300: 25352,
        40301: 25327,
        40302: 25333,
        40303: 25424,
        40304: 25406,
        40305: 25421,
        40306: 25628,
        40307: 25423,
        40308: 25494,
        40309: 25486,
        40310: 25472,
        40311: 25515,
        40312: 25462,
        40313: 25507,
        40314: 25487,
        40315: 25481,
        40316: 25503,
        40317: 25525,
        40318: 25451,
        40320: 25449,
        40321: 25534,
        40322: 25577,
        40323: 25536,
        40324: 25542,
        40325: 25571,
        40326: 25545,
        40327: 25554,
        40328: 25590,
        40329: 25540,
        40330: 25622,
        40331: 25652,
        40332: 25606,
        40333: 25619,
        40334: 25638,
        40335: 25654,
        40336: 25885,
        40337: 25623,
        40338: 25640,
        40339: 25615,
        40340: 25703,
        40341: 25711,
        40342: 25718,
        40343: 25678,
        40344: 25898,
        40345: 25749,
        40346: 25747,
        40347: 25765,
        40348: 25769,
        40349: 25736,
        40350: 25788,
        40351: 25818,
        40352: 25810,
        40353: 25797,
        40354: 25799,
        40355: 25787,
        40356: 25816,
        40357: 25794,
        40358: 25841,
        40359: 25831,
        40360: 33289,
        40361: 25824,
        40362: 25825,
        40363: 25260,
        40364: 25827,
        40365: 25839,
        40366: 25900,
        40367: 25846,
        40368: 25844,
        40369: 25842,
        40370: 25850,
        40371: 25856,
        40372: 25853,
        40373: 25880,
        40374: 25884,
        40375: 25861,
        40376: 25892,
        40377: 25891,
        40378: 25899,
        40379: 25908,
        40380: 25909,
        40381: 25911,
        40382: 25910,
        40383: 25912,
        40384: 30027,
        40385: 25928,
        40386: 25942,
        40387: 25941,
        40388: 25933,
        40389: 25944,
        40390: 25950,
        40391: 25949,
        40392: 25970,
        40393: 25976,
        40394: 25986,
        40395: 25987,
        40396: 35722,
        40397: 26011,
        40398: 26015,
        40399: 26027,
        40400: 26039,
        40401: 26051,
        40402: 26054,
        40403: 26049,
        40404: 26052,
        40405: 26060,
        40406: 26066,
        40407: 26075,
        40408: 26073,
        40409: 26080,
        40410: 26081,
        40411: 26097,
        40412: 26482,
        40413: 26122,
        40414: 26115,
        40415: 26107,
        40416: 26483,
        40417: 26165,
        40418: 26166,
        40419: 26164,
        40420: 26140,
        40421: 26191,
        40422: 26180,
        40423: 26185,
        40424: 26177,
        40425: 26206,
        40426: 26205,
        40427: 26212,
        40428: 26215,
        40429: 26216,
        40430: 26207,
        40431: 26210,
        40432: 26224,
        40433: 26243,
        40434: 26248,
        40435: 26254,
        40436: 26249,
        40437: 26244,
        40438: 26264,
        40439: 26269,
        40440: 26305,
        40441: 26297,
        40442: 26313,
        40443: 26302,
        40444: 26300,
        40512: 26308,
        40513: 26296,
        40514: 26326,
        40515: 26330,
        40516: 26336,
        40517: 26175,
        40518: 26342,
        40519: 26345,
        40520: 26352,
        40521: 26357,
        40522: 26359,
        40523: 26383,
        40524: 26390,
        40525: 26398,
        40526: 26406,
        40527: 26407,
        40528: 38712,
        40529: 26414,
        40530: 26431,
        40531: 26422,
        40532: 26433,
        40533: 26424,
        40534: 26423,
        40535: 26438,
        40536: 26462,
        40537: 26464,
        40538: 26457,
        40539: 26467,
        40540: 26468,
        40541: 26505,
        40542: 26480,
        40543: 26537,
        40544: 26492,
        40545: 26474,
        40546: 26508,
        40547: 26507,
        40548: 26534,
        40549: 26529,
        40550: 26501,
        40551: 26551,
        40552: 26607,
        40553: 26548,
        40554: 26604,
        40555: 26547,
        40556: 26601,
        40557: 26552,
        40558: 26596,
        40559: 26590,
        40560: 26589,
        40561: 26594,
        40562: 26606,
        40563: 26553,
        40564: 26574,
        40565: 26566,
        40566: 26599,
        40567: 27292,
        40568: 26654,
        40569: 26694,
        40570: 26665,
        40571: 26688,
        40572: 26701,
        40573: 26674,
        40574: 26702,
        40576: 26803,
        40577: 26667,
        40578: 26713,
        40579: 26723,
        40580: 26743,
        40581: 26751,
        40582: 26783,
        40583: 26767,
        40584: 26797,
        40585: 26772,
        40586: 26781,
        40587: 26779,
        40588: 26755,
        40589: 27310,
        40590: 26809,
        40591: 26740,
        40592: 26805,
        40593: 26784,
        40594: 26810,
        40595: 26895,
        40596: 26765,
        40597: 26750,
        40598: 26881,
        40599: 26826,
        40600: 26888,
        40601: 26840,
        40602: 26914,
        40603: 26918,
        40604: 26849,
        40605: 26892,
        40606: 26829,
        40607: 26836,
        40608: 26855,
        40609: 26837,
        40610: 26934,
        40611: 26898,
        40612: 26884,
        40613: 26839,
        40614: 26851,
        40615: 26917,
        40616: 26873,
        40617: 26848,
        40618: 26863,
        40619: 26920,
        40620: 26922,
        40621: 26906,
        40622: 26915,
        40623: 26913,
        40624: 26822,
        40625: 27001,
        40626: 26999,
        40627: 26972,
        40628: 27e3,
        40629: 26987,
        40630: 26964,
        40631: 27006,
        40632: 26990,
        40633: 26937,
        40634: 26996,
        40635: 26941,
        40636: 26969,
        40637: 26928,
        40638: 26977,
        40639: 26974,
        40640: 26973,
        40641: 27009,
        40642: 26986,
        40643: 27058,
        40644: 27054,
        40645: 27088,
        40646: 27071,
        40647: 27073,
        40648: 27091,
        40649: 27070,
        40650: 27086,
        40651: 23528,
        40652: 27082,
        40653: 27101,
        40654: 27067,
        40655: 27075,
        40656: 27047,
        40657: 27182,
        40658: 27025,
        40659: 27040,
        40660: 27036,
        40661: 27029,
        40662: 27060,
        40663: 27102,
        40664: 27112,
        40665: 27138,
        40666: 27163,
        40667: 27135,
        40668: 27402,
        40669: 27129,
        40670: 27122,
        40671: 27111,
        40672: 27141,
        40673: 27057,
        40674: 27166,
        40675: 27117,
        40676: 27156,
        40677: 27115,
        40678: 27146,
        40679: 27154,
        40680: 27329,
        40681: 27171,
        40682: 27155,
        40683: 27204,
        40684: 27148,
        40685: 27250,
        40686: 27190,
        40687: 27256,
        40688: 27207,
        40689: 27234,
        40690: 27225,
        40691: 27238,
        40692: 27208,
        40693: 27192,
        40694: 27170,
        40695: 27280,
        40696: 27277,
        40697: 27296,
        40698: 27268,
        40699: 27298,
        40700: 27299,
        40768: 27287,
        40769: 34327,
        40770: 27323,
        40771: 27331,
        40772: 27330,
        40773: 27320,
        40774: 27315,
        40775: 27308,
        40776: 27358,
        40777: 27345,
        40778: 27359,
        40779: 27306,
        40780: 27354,
        40781: 27370,
        40782: 27387,
        40783: 27397,
        40784: 34326,
        40785: 27386,
        40786: 27410,
        40787: 27414,
        40788: 39729,
        40789: 27423,
        40790: 27448,
        40791: 27447,
        40792: 30428,
        40793: 27449,
        40794: 39150,
        40795: 27463,
        40796: 27459,
        40797: 27465,
        40798: 27472,
        40799: 27481,
        40800: 27476,
        40801: 27483,
        40802: 27487,
        40803: 27489,
        40804: 27512,
        40805: 27513,
        40806: 27519,
        40807: 27520,
        40808: 27524,
        40809: 27523,
        40810: 27533,
        40811: 27544,
        40812: 27541,
        40813: 27550,
        40814: 27556,
        40815: 27562,
        40816: 27563,
        40817: 27567,
        40818: 27570,
        40819: 27569,
        40820: 27571,
        40821: 27575,
        40822: 27580,
        40823: 27590,
        40824: 27595,
        40825: 27603,
        40826: 27615,
        40827: 27628,
        40828: 27627,
        40829: 27635,
        40830: 27631,
        40832: 40638,
        40833: 27656,
        40834: 27667,
        40835: 27668,
        40836: 27675,
        40837: 27684,
        40838: 27683,
        40839: 27742,
        40840: 27733,
        40841: 27746,
        40842: 27754,
        40843: 27778,
        40844: 27789,
        40845: 27802,
        40846: 27777,
        40847: 27803,
        40848: 27774,
        40849: 27752,
        40850: 27763,
        40851: 27794,
        40852: 27792,
        40853: 27844,
        40854: 27889,
        40855: 27859,
        40856: 27837,
        40857: 27863,
        40858: 27845,
        40859: 27869,
        40860: 27822,
        40861: 27825,
        40862: 27838,
        40863: 27834,
        40864: 27867,
        40865: 27887,
        40866: 27865,
        40867: 27882,
        40868: 27935,
        40869: 34893,
        40870: 27958,
        40871: 27947,
        40872: 27965,
        40873: 27960,
        40874: 27929,
        40875: 27957,
        40876: 27955,
        40877: 27922,
        40878: 27916,
        40879: 28003,
        40880: 28051,
        40881: 28004,
        40882: 27994,
        40883: 28025,
        40884: 27993,
        40885: 28046,
        40886: 28053,
        40887: 28644,
        40888: 28037,
        40889: 28153,
        40890: 28181,
        40891: 28170,
        40892: 28085,
        40893: 28103,
        40894: 28134,
        40895: 28088,
        40896: 28102,
        40897: 28140,
        40898: 28126,
        40899: 28108,
        40900: 28136,
        40901: 28114,
        40902: 28101,
        40903: 28154,
        40904: 28121,
        40905: 28132,
        40906: 28117,
        40907: 28138,
        40908: 28142,
        40909: 28205,
        40910: 28270,
        40911: 28206,
        40912: 28185,
        40913: 28274,
        40914: 28255,
        40915: 28222,
        40916: 28195,
        40917: 28267,
        40918: 28203,
        40919: 28278,
        40920: 28237,
        40921: 28191,
        40922: 28227,
        40923: 28218,
        40924: 28238,
        40925: 28196,
        40926: 28415,
        40927: 28189,
        40928: 28216,
        40929: 28290,
        40930: 28330,
        40931: 28312,
        40932: 28361,
        40933: 28343,
        40934: 28371,
        40935: 28349,
        40936: 28335,
        40937: 28356,
        40938: 28338,
        40939: 28372,
        40940: 28373,
        40941: 28303,
        40942: 28325,
        40943: 28354,
        40944: 28319,
        40945: 28481,
        40946: 28433,
        40947: 28748,
        40948: 28396,
        40949: 28408,
        40950: 28414,
        40951: 28479,
        40952: 28402,
        40953: 28465,
        40954: 28399,
        40955: 28466,
        40956: 28364,
        161: 65377,
        162: 65378,
        163: 65379,
        164: 65380,
        165: 65381,
        166: 65382,
        167: 65383,
        168: 65384,
        169: 65385,
        170: 65386,
        171: 65387,
        172: 65388,
        173: 65389,
        174: 65390,
        175: 65391,
        176: 65392,
        177: 65393,
        178: 65394,
        179: 65395,
        180: 65396,
        181: 65397,
        182: 65398,
        183: 65399,
        184: 65400,
        185: 65401,
        186: 65402,
        187: 65403,
        188: 65404,
        189: 65405,
        190: 65406,
        191: 65407,
        192: 65408,
        193: 65409,
        194: 65410,
        195: 65411,
        196: 65412,
        197: 65413,
        198: 65414,
        199: 65415,
        200: 65416,
        201: 65417,
        202: 65418,
        203: 65419,
        204: 65420,
        205: 65421,
        206: 65422,
        207: 65423,
        208: 65424,
        209: 65425,
        210: 65426,
        211: 65427,
        212: 65428,
        213: 65429,
        214: 65430,
        215: 65431,
        216: 65432,
        217: 65433,
        218: 65434,
        219: 65435,
        220: 65436,
        221: 65437,
        222: 65438,
        223: 65439,
        57408: 28478,
        57409: 28435,
        57410: 28407,
        57411: 28550,
        57412: 28538,
        57413: 28536,
        57414: 28545,
        57415: 28544,
        57416: 28527,
        57417: 28507,
        57418: 28659,
        57419: 28525,
        57420: 28546,
        57421: 28540,
        57422: 28504,
        57423: 28558,
        57424: 28561,
        57425: 28610,
        57426: 28518,
        57427: 28595,
        57428: 28579,
        57429: 28577,
        57430: 28580,
        57431: 28601,
        57432: 28614,
        57433: 28586,
        57434: 28639,
        57435: 28629,
        57436: 28652,
        57437: 28628,
        57438: 28632,
        57439: 28657,
        57440: 28654,
        57441: 28635,
        57442: 28681,
        57443: 28683,
        57444: 28666,
        57445: 28689,
        57446: 28673,
        57447: 28687,
        57448: 28670,
        57449: 28699,
        57450: 28698,
        57451: 28532,
        57452: 28701,
        57453: 28696,
        57454: 28703,
        57455: 28720,
        57456: 28734,
        57457: 28722,
        57458: 28753,
        57459: 28771,
        57460: 28825,
        57461: 28818,
        57462: 28847,
        57463: 28913,
        57464: 28844,
        57465: 28856,
        57466: 28851,
        57467: 28846,
        57468: 28895,
        57469: 28875,
        57470: 28893,
        57472: 28889,
        57473: 28937,
        57474: 28925,
        57475: 28956,
        57476: 28953,
        57477: 29029,
        57478: 29013,
        57479: 29064,
        57480: 29030,
        57481: 29026,
        57482: 29004,
        57483: 29014,
        57484: 29036,
        57485: 29071,
        57486: 29179,
        57487: 29060,
        57488: 29077,
        57489: 29096,
        57490: 29100,
        57491: 29143,
        57492: 29113,
        57493: 29118,
        57494: 29138,
        57495: 29129,
        57496: 29140,
        57497: 29134,
        57498: 29152,
        57499: 29164,
        57500: 29159,
        57501: 29173,
        57502: 29180,
        57503: 29177,
        57504: 29183,
        57505: 29197,
        57506: 29200,
        57507: 29211,
        57508: 29224,
        57509: 29229,
        57510: 29228,
        57511: 29232,
        57512: 29234,
        57513: 29243,
        57514: 29244,
        57515: 29247,
        57516: 29248,
        57517: 29254,
        57518: 29259,
        57519: 29272,
        57520: 29300,
        57521: 29310,
        57522: 29314,
        57523: 29313,
        57524: 29319,
        57525: 29330,
        57526: 29334,
        57527: 29346,
        57528: 29351,
        57529: 29369,
        57530: 29362,
        57531: 29379,
        57532: 29382,
        57533: 29380,
        57534: 29390,
        57535: 29394,
        57536: 29410,
        57537: 29408,
        57538: 29409,
        57539: 29433,
        57540: 29431,
        57541: 20495,
        57542: 29463,
        57543: 29450,
        57544: 29468,
        57545: 29462,
        57546: 29469,
        57547: 29492,
        57548: 29487,
        57549: 29481,
        57550: 29477,
        57551: 29502,
        57552: 29518,
        57553: 29519,
        57554: 40664,
        57555: 29527,
        57556: 29546,
        57557: 29544,
        57558: 29552,
        57559: 29560,
        57560: 29557,
        57561: 29563,
        57562: 29562,
        57563: 29640,
        57564: 29619,
        57565: 29646,
        57566: 29627,
        57567: 29632,
        57568: 29669,
        57569: 29678,
        57570: 29662,
        57571: 29858,
        57572: 29701,
        57573: 29807,
        57574: 29733,
        57575: 29688,
        57576: 29746,
        57577: 29754,
        57578: 29781,
        57579: 29759,
        57580: 29791,
        57581: 29785,
        57582: 29761,
        57583: 29788,
        57584: 29801,
        57585: 29808,
        57586: 29795,
        57587: 29802,
        57588: 29814,
        57589: 29822,
        57590: 29835,
        57591: 29854,
        57592: 29863,
        57593: 29898,
        57594: 29903,
        57595: 29908,
        57596: 29681,
        57664: 29920,
        57665: 29923,
        57666: 29927,
        57667: 29929,
        57668: 29934,
        57669: 29938,
        57670: 29936,
        57671: 29937,
        57672: 29944,
        57673: 29943,
        57674: 29956,
        57675: 29955,
        57676: 29957,
        57677: 29964,
        57678: 29966,
        57679: 29965,
        57680: 29973,
        57681: 29971,
        57682: 29982,
        57683: 29990,
        57684: 29996,
        57685: 30012,
        57686: 30020,
        57687: 30029,
        57688: 30026,
        57689: 30025,
        57690: 30043,
        57691: 30022,
        57692: 30042,
        57693: 30057,
        57694: 30052,
        57695: 30055,
        57696: 30059,
        57697: 30061,
        57698: 30072,
        57699: 30070,
        57700: 30086,
        57701: 30087,
        57702: 30068,
        57703: 30090,
        57704: 30089,
        57705: 30082,
        57706: 30100,
        57707: 30106,
        57708: 30109,
        57709: 30117,
        57710: 30115,
        57711: 30146,
        57712: 30131,
        57713: 30147,
        57714: 30133,
        57715: 30141,
        57716: 30136,
        57717: 30140,
        57718: 30129,
        57719: 30157,
        57720: 30154,
        57721: 30162,
        57722: 30169,
        57723: 30179,
        57724: 30174,
        57725: 30206,
        57726: 30207,
        57728: 30204,
        57729: 30209,
        57730: 30192,
        57731: 30202,
        57732: 30194,
        57733: 30195,
        57734: 30219,
        57735: 30221,
        57736: 30217,
        57737: 30239,
        57738: 30247,
        57739: 30240,
        57740: 30241,
        57741: 30242,
        57742: 30244,
        57743: 30260,
        57744: 30256,
        57745: 30267,
        57746: 30279,
        57747: 30280,
        57748: 30278,
        57749: 30300,
        57750: 30296,
        57751: 30305,
        57752: 30306,
        57753: 30312,
        57754: 30313,
        57755: 30314,
        57756: 30311,
        57757: 30316,
        57758: 30320,
        57759: 30322,
        57760: 30326,
        57761: 30328,
        57762: 30332,
        57763: 30336,
        57764: 30339,
        57765: 30344,
        57766: 30347,
        57767: 30350,
        57768: 30358,
        57769: 30355,
        57770: 30361,
        57771: 30362,
        57772: 30384,
        57773: 30388,
        57774: 30392,
        57775: 30393,
        57776: 30394,
        57777: 30402,
        57778: 30413,
        57779: 30422,
        57780: 30418,
        57781: 30430,
        57782: 30433,
        57783: 30437,
        57784: 30439,
        57785: 30442,
        57786: 34351,
        57787: 30459,
        57788: 30472,
        57789: 30471,
        57790: 30468,
        57791: 30505,
        57792: 30500,
        57793: 30494,
        57794: 30501,
        57795: 30502,
        57796: 30491,
        57797: 30519,
        57798: 30520,
        57799: 30535,
        57800: 30554,
        57801: 30568,
        57802: 30571,
        57803: 30555,
        57804: 30565,
        57805: 30591,
        57806: 30590,
        57807: 30585,
        57808: 30606,
        57809: 30603,
        57810: 30609,
        57811: 30624,
        57812: 30622,
        57813: 30640,
        57814: 30646,
        57815: 30649,
        57816: 30655,
        57817: 30652,
        57818: 30653,
        57819: 30651,
        57820: 30663,
        57821: 30669,
        57822: 30679,
        57823: 30682,
        57824: 30684,
        57825: 30691,
        57826: 30702,
        57827: 30716,
        57828: 30732,
        57829: 30738,
        57830: 31014,
        57831: 30752,
        57832: 31018,
        57833: 30789,
        57834: 30862,
        57835: 30836,
        57836: 30854,
        57837: 30844,
        57838: 30874,
        57839: 30860,
        57840: 30883,
        57841: 30901,
        57842: 30890,
        57843: 30895,
        57844: 30929,
        57845: 30918,
        57846: 30923,
        57847: 30932,
        57848: 30910,
        57849: 30908,
        57850: 30917,
        57851: 30922,
        57852: 30956,
        57920: 30951,
        57921: 30938,
        57922: 30973,
        57923: 30964,
        57924: 30983,
        57925: 30994,
        57926: 30993,
        57927: 31001,
        57928: 31020,
        57929: 31019,
        57930: 31040,
        57931: 31072,
        57932: 31063,
        57933: 31071,
        57934: 31066,
        57935: 31061,
        57936: 31059,
        57937: 31098,
        57938: 31103,
        57939: 31114,
        57940: 31133,
        57941: 31143,
        57942: 40779,
        57943: 31146,
        57944: 31150,
        57945: 31155,
        57946: 31161,
        57947: 31162,
        57948: 31177,
        57949: 31189,
        57950: 31207,
        57951: 31212,
        57952: 31201,
        57953: 31203,
        57954: 31240,
        57955: 31245,
        57956: 31256,
        57957: 31257,
        57958: 31264,
        57959: 31263,
        57960: 31104,
        57961: 31281,
        57962: 31291,
        57963: 31294,
        57964: 31287,
        57965: 31299,
        57966: 31319,
        57967: 31305,
        57968: 31329,
        57969: 31330,
        57970: 31337,
        57971: 40861,
        57972: 31344,
        57973: 31353,
        57974: 31357,
        57975: 31368,
        57976: 31383,
        57977: 31381,
        57978: 31384,
        57979: 31382,
        57980: 31401,
        57981: 31432,
        57982: 31408,
        57984: 31414,
        57985: 31429,
        57986: 31428,
        57987: 31423,
        57988: 36995,
        57989: 31431,
        57990: 31434,
        57991: 31437,
        57992: 31439,
        57993: 31445,
        57994: 31443,
        57995: 31449,
        57996: 31450,
        57997: 31453,
        57998: 31457,
        57999: 31458,
        58e3: 31462,
        58001: 31469,
        58002: 31472,
        58003: 31490,
        58004: 31503,
        58005: 31498,
        58006: 31494,
        58007: 31539,
        58008: 31512,
        58009: 31513,
        58010: 31518,
        58011: 31541,
        58012: 31528,
        58013: 31542,
        58014: 31568,
        58015: 31610,
        58016: 31492,
        58017: 31565,
        58018: 31499,
        58019: 31564,
        58020: 31557,
        58021: 31605,
        58022: 31589,
        58023: 31604,
        58024: 31591,
        58025: 31600,
        58026: 31601,
        58027: 31596,
        58028: 31598,
        58029: 31645,
        58030: 31640,
        58031: 31647,
        58032: 31629,
        58033: 31644,
        58034: 31642,
        58035: 31627,
        58036: 31634,
        58037: 31631,
        58038: 31581,
        58039: 31641,
        58040: 31691,
        58041: 31681,
        58042: 31692,
        58043: 31695,
        58044: 31668,
        58045: 31686,
        58046: 31709,
        58047: 31721,
        58048: 31761,
        58049: 31764,
        58050: 31718,
        58051: 31717,
        58052: 31840,
        58053: 31744,
        58054: 31751,
        58055: 31763,
        58056: 31731,
        58057: 31735,
        58058: 31767,
        58059: 31757,
        58060: 31734,
        58061: 31779,
        58062: 31783,
        58063: 31786,
        58064: 31775,
        58065: 31799,
        58066: 31787,
        58067: 31805,
        58068: 31820,
        58069: 31811,
        58070: 31828,
        58071: 31823,
        58072: 31808,
        58073: 31824,
        58074: 31832,
        58075: 31839,
        58076: 31844,
        58077: 31830,
        58078: 31845,
        58079: 31852,
        58080: 31861,
        58081: 31875,
        58082: 31888,
        58083: 31908,
        58084: 31917,
        58085: 31906,
        58086: 31915,
        58087: 31905,
        58088: 31912,
        58089: 31923,
        58090: 31922,
        58091: 31921,
        58092: 31918,
        58093: 31929,
        58094: 31933,
        58095: 31936,
        58096: 31941,
        58097: 31938,
        58098: 31960,
        58099: 31954,
        58100: 31964,
        58101: 31970,
        58102: 39739,
        58103: 31983,
        58104: 31986,
        58105: 31988,
        58106: 31990,
        58107: 31994,
        58108: 32006,
        58176: 32002,
        58177: 32028,
        58178: 32021,
        58179: 32010,
        58180: 32069,
        58181: 32075,
        58182: 32046,
        58183: 32050,
        58184: 32063,
        58185: 32053,
        58186: 32070,
        58187: 32115,
        58188: 32086,
        58189: 32078,
        58190: 32114,
        58191: 32104,
        58192: 32110,
        58193: 32079,
        58194: 32099,
        58195: 32147,
        58196: 32137,
        58197: 32091,
        58198: 32143,
        58199: 32125,
        58200: 32155,
        58201: 32186,
        58202: 32174,
        58203: 32163,
        58204: 32181,
        58205: 32199,
        58206: 32189,
        58207: 32171,
        58208: 32317,
        58209: 32162,
        58210: 32175,
        58211: 32220,
        58212: 32184,
        58213: 32159,
        58214: 32176,
        58215: 32216,
        58216: 32221,
        58217: 32228,
        58218: 32222,
        58219: 32251,
        58220: 32242,
        58221: 32225,
        58222: 32261,
        58223: 32266,
        58224: 32291,
        58225: 32289,
        58226: 32274,
        58227: 32305,
        58228: 32287,
        58229: 32265,
        58230: 32267,
        58231: 32290,
        58232: 32326,
        58233: 32358,
        58234: 32315,
        58235: 32309,
        58236: 32313,
        58237: 32323,
        58238: 32311,
        58240: 32306,
        58241: 32314,
        58242: 32359,
        58243: 32349,
        58244: 32342,
        58245: 32350,
        58246: 32345,
        58247: 32346,
        58248: 32377,
        58249: 32362,
        58250: 32361,
        58251: 32380,
        58252: 32379,
        58253: 32387,
        58254: 32213,
        58255: 32381,
        58256: 36782,
        58257: 32383,
        58258: 32392,
        58259: 32393,
        58260: 32396,
        58261: 32402,
        58262: 32400,
        58263: 32403,
        58264: 32404,
        58265: 32406,
        58266: 32398,
        58267: 32411,
        58268: 32412,
        58269: 32568,
        58270: 32570,
        58271: 32581,
        58272: 32588,
        58273: 32589,
        58274: 32590,
        58275: 32592,
        58276: 32593,
        58277: 32597,
        58278: 32596,
        58279: 32600,
        58280: 32607,
        58281: 32608,
        58282: 32616,
        58283: 32617,
        58284: 32615,
        58285: 32632,
        58286: 32642,
        58287: 32646,
        58288: 32643,
        58289: 32648,
        58290: 32647,
        58291: 32652,
        58292: 32660,
        58293: 32670,
        58294: 32669,
        58295: 32666,
        58296: 32675,
        58297: 32687,
        58298: 32690,
        58299: 32697,
        58300: 32686,
        58301: 32694,
        58302: 32696,
        58303: 35697,
        58304: 32709,
        58305: 32710,
        58306: 32714,
        58307: 32725,
        58308: 32724,
        58309: 32737,
        58310: 32742,
        58311: 32745,
        58312: 32755,
        58313: 32761,
        58314: 39132,
        58315: 32774,
        58316: 32772,
        58317: 32779,
        58318: 32786,
        58319: 32792,
        58320: 32793,
        58321: 32796,
        58322: 32801,
        58323: 32808,
        58324: 32831,
        58325: 32827,
        58326: 32842,
        58327: 32838,
        58328: 32850,
        58329: 32856,
        58330: 32858,
        58331: 32863,
        58332: 32866,
        58333: 32872,
        58334: 32883,
        58335: 32882,
        58336: 32880,
        58337: 32886,
        58338: 32889,
        58339: 32893,
        58340: 32895,
        58341: 32900,
        58342: 32902,
        58343: 32901,
        58344: 32923,
        58345: 32915,
        58346: 32922,
        58347: 32941,
        58348: 20880,
        58349: 32940,
        58350: 32987,
        58351: 32997,
        58352: 32985,
        58353: 32989,
        58354: 32964,
        58355: 32986,
        58356: 32982,
        58357: 33033,
        58358: 33007,
        58359: 33009,
        58360: 33051,
        58361: 33065,
        58362: 33059,
        58363: 33071,
        58364: 33099,
        58432: 38539,
        58433: 33094,
        58434: 33086,
        58435: 33107,
        58436: 33105,
        58437: 33020,
        58438: 33137,
        58439: 33134,
        58440: 33125,
        58441: 33126,
        58442: 33140,
        58443: 33155,
        58444: 33160,
        58445: 33162,
        58446: 33152,
        58447: 33154,
        58448: 33184,
        58449: 33173,
        58450: 33188,
        58451: 33187,
        58452: 33119,
        58453: 33171,
        58454: 33193,
        58455: 33200,
        58456: 33205,
        58457: 33214,
        58458: 33208,
        58459: 33213,
        58460: 33216,
        58461: 33218,
        58462: 33210,
        58463: 33225,
        58464: 33229,
        58465: 33233,
        58466: 33241,
        58467: 33240,
        58468: 33224,
        58469: 33242,
        58470: 33247,
        58471: 33248,
        58472: 33255,
        58473: 33274,
        58474: 33275,
        58475: 33278,
        58476: 33281,
        58477: 33282,
        58478: 33285,
        58479: 33287,
        58480: 33290,
        58481: 33293,
        58482: 33296,
        58483: 33302,
        58484: 33321,
        58485: 33323,
        58486: 33336,
        58487: 33331,
        58488: 33344,
        58489: 33369,
        58490: 33368,
        58491: 33373,
        58492: 33370,
        58493: 33375,
        58494: 33380,
        58496: 33378,
        58497: 33384,
        58498: 33386,
        58499: 33387,
        58500: 33326,
        58501: 33393,
        58502: 33399,
        58503: 33400,
        58504: 33406,
        58505: 33421,
        58506: 33426,
        58507: 33451,
        58508: 33439,
        58509: 33467,
        58510: 33452,
        58511: 33505,
        58512: 33507,
        58513: 33503,
        58514: 33490,
        58515: 33524,
        58516: 33523,
        58517: 33530,
        58518: 33683,
        58519: 33539,
        58520: 33531,
        58521: 33529,
        58522: 33502,
        58523: 33542,
        58524: 33500,
        58525: 33545,
        58526: 33497,
        58527: 33589,
        58528: 33588,
        58529: 33558,
        58530: 33586,
        58531: 33585,
        58532: 33600,
        58533: 33593,
        58534: 33616,
        58535: 33605,
        58536: 33583,
        58537: 33579,
        58538: 33559,
        58539: 33560,
        58540: 33669,
        58541: 33690,
        58542: 33706,
        58543: 33695,
        58544: 33698,
        58545: 33686,
        58546: 33571,
        58547: 33678,
        58548: 33671,
        58549: 33674,
        58550: 33660,
        58551: 33717,
        58552: 33651,
        58553: 33653,
        58554: 33696,
        58555: 33673,
        58556: 33704,
        58557: 33780,
        58558: 33811,
        58559: 33771,
        58560: 33742,
        58561: 33789,
        58562: 33795,
        58563: 33752,
        58564: 33803,
        58565: 33729,
        58566: 33783,
        58567: 33799,
        58568: 33760,
        58569: 33778,
        58570: 33805,
        58571: 33826,
        58572: 33824,
        58573: 33725,
        58574: 33848,
        58575: 34054,
        58576: 33787,
        58577: 33901,
        58578: 33834,
        58579: 33852,
        58580: 34138,
        58581: 33924,
        58582: 33911,
        58583: 33899,
        58584: 33965,
        58585: 33902,
        58586: 33922,
        58587: 33897,
        58588: 33862,
        58589: 33836,
        58590: 33903,
        58591: 33913,
        58592: 33845,
        58593: 33994,
        58594: 33890,
        58595: 33977,
        58596: 33983,
        58597: 33951,
        58598: 34009,
        58599: 33997,
        58600: 33979,
        58601: 34010,
        58602: 34e3,
        58603: 33985,
        58604: 33990,
        58605: 34006,
        58606: 33953,
        58607: 34081,
        58608: 34047,
        58609: 34036,
        58610: 34071,
        58611: 34072,
        58612: 34092,
        58613: 34079,
        58614: 34069,
        58615: 34068,
        58616: 34044,
        58617: 34112,
        58618: 34147,
        58619: 34136,
        58620: 34120,
        58688: 34113,
        58689: 34306,
        58690: 34123,
        58691: 34133,
        58692: 34176,
        58693: 34212,
        58694: 34184,
        58695: 34193,
        58696: 34186,
        58697: 34216,
        58698: 34157,
        58699: 34196,
        58700: 34203,
        58701: 34282,
        58702: 34183,
        58703: 34204,
        58704: 34167,
        58705: 34174,
        58706: 34192,
        58707: 34249,
        58708: 34234,
        58709: 34255,
        58710: 34233,
        58711: 34256,
        58712: 34261,
        58713: 34269,
        58714: 34277,
        58715: 34268,
        58716: 34297,
        58717: 34314,
        58718: 34323,
        58719: 34315,
        58720: 34302,
        58721: 34298,
        58722: 34310,
        58723: 34338,
        58724: 34330,
        58725: 34352,
        58726: 34367,
        58727: 34381,
        58728: 20053,
        58729: 34388,
        58730: 34399,
        58731: 34407,
        58732: 34417,
        58733: 34451,
        58734: 34467,
        58735: 34473,
        58736: 34474,
        58737: 34443,
        58738: 34444,
        58739: 34486,
        58740: 34479,
        58741: 34500,
        58742: 34502,
        58743: 34480,
        58744: 34505,
        58745: 34851,
        58746: 34475,
        58747: 34516,
        58748: 34526,
        58749: 34537,
        58750: 34540,
        58752: 34527,
        58753: 34523,
        58754: 34543,
        58755: 34578,
        58756: 34566,
        58757: 34568,
        58758: 34560,
        58759: 34563,
        58760: 34555,
        58761: 34577,
        58762: 34569,
        58763: 34573,
        58764: 34553,
        58765: 34570,
        58766: 34612,
        58767: 34623,
        58768: 34615,
        58769: 34619,
        58770: 34597,
        58771: 34601,
        58772: 34586,
        58773: 34656,
        58774: 34655,
        58775: 34680,
        58776: 34636,
        58777: 34638,
        58778: 34676,
        58779: 34647,
        58780: 34664,
        58781: 34670,
        58782: 34649,
        58783: 34643,
        58784: 34659,
        58785: 34666,
        58786: 34821,
        58787: 34722,
        58788: 34719,
        58789: 34690,
        58790: 34735,
        58791: 34763,
        58792: 34749,
        58793: 34752,
        58794: 34768,
        58795: 38614,
        58796: 34731,
        58797: 34756,
        58798: 34739,
        58799: 34759,
        58800: 34758,
        58801: 34747,
        58802: 34799,
        58803: 34802,
        58804: 34784,
        58805: 34831,
        58806: 34829,
        58807: 34814,
        58808: 34806,
        58809: 34807,
        58810: 34830,
        58811: 34770,
        58812: 34833,
        58813: 34838,
        58814: 34837,
        58815: 34850,
        58816: 34849,
        58817: 34865,
        58818: 34870,
        58819: 34873,
        58820: 34855,
        58821: 34875,
        58822: 34884,
        58823: 34882,
        58824: 34898,
        58825: 34905,
        58826: 34910,
        58827: 34914,
        58828: 34923,
        58829: 34945,
        58830: 34942,
        58831: 34974,
        58832: 34933,
        58833: 34941,
        58834: 34997,
        58835: 34930,
        58836: 34946,
        58837: 34967,
        58838: 34962,
        58839: 34990,
        58840: 34969,
        58841: 34978,
        58842: 34957,
        58843: 34980,
        58844: 34992,
        58845: 35007,
        58846: 34993,
        58847: 35011,
        58848: 35012,
        58849: 35028,
        58850: 35032,
        58851: 35033,
        58852: 35037,
        58853: 35065,
        58854: 35074,
        58855: 35068,
        58856: 35060,
        58857: 35048,
        58858: 35058,
        58859: 35076,
        58860: 35084,
        58861: 35082,
        58862: 35091,
        58863: 35139,
        58864: 35102,
        58865: 35109,
        58866: 35114,
        58867: 35115,
        58868: 35137,
        58869: 35140,
        58870: 35131,
        58871: 35126,
        58872: 35128,
        58873: 35148,
        58874: 35101,
        58875: 35168,
        58876: 35166,
        58944: 35174,
        58945: 35172,
        58946: 35181,
        58947: 35178,
        58948: 35183,
        58949: 35188,
        58950: 35191,
        58951: 35198,
        58952: 35203,
        58953: 35208,
        58954: 35210,
        58955: 35219,
        58956: 35224,
        58957: 35233,
        58958: 35241,
        58959: 35238,
        58960: 35244,
        58961: 35247,
        58962: 35250,
        58963: 35258,
        58964: 35261,
        58965: 35263,
        58966: 35264,
        58967: 35290,
        58968: 35292,
        58969: 35293,
        58970: 35303,
        58971: 35316,
        58972: 35320,
        58973: 35331,
        58974: 35350,
        58975: 35344,
        58976: 35340,
        58977: 35355,
        58978: 35357,
        58979: 35365,
        58980: 35382,
        58981: 35393,
        58982: 35419,
        58983: 35410,
        58984: 35398,
        58985: 35400,
        58986: 35452,
        58987: 35437,
        58988: 35436,
        58989: 35426,
        58990: 35461,
        58991: 35458,
        58992: 35460,
        58993: 35496,
        58994: 35489,
        58995: 35473,
        58996: 35493,
        58997: 35494,
        58998: 35482,
        58999: 35491,
        59e3: 35524,
        59001: 35533,
        59002: 35522,
        59003: 35546,
        59004: 35563,
        59005: 35571,
        59006: 35559,
        59008: 35556,
        59009: 35569,
        59010: 35604,
        59011: 35552,
        59012: 35554,
        59013: 35575,
        59014: 35550,
        59015: 35547,
        59016: 35596,
        59017: 35591,
        59018: 35610,
        59019: 35553,
        59020: 35606,
        59021: 35600,
        59022: 35607,
        59023: 35616,
        59024: 35635,
        59025: 38827,
        59026: 35622,
        59027: 35627,
        59028: 35646,
        59029: 35624,
        59030: 35649,
        59031: 35660,
        59032: 35663,
        59033: 35662,
        59034: 35657,
        59035: 35670,
        59036: 35675,
        59037: 35674,
        59038: 35691,
        59039: 35679,
        59040: 35692,
        59041: 35695,
        59042: 35700,
        59043: 35709,
        59044: 35712,
        59045: 35724,
        59046: 35726,
        59047: 35730,
        59048: 35731,
        59049: 35734,
        59050: 35737,
        59051: 35738,
        59052: 35898,
        59053: 35905,
        59054: 35903,
        59055: 35912,
        59056: 35916,
        59057: 35918,
        59058: 35920,
        59059: 35925,
        59060: 35938,
        59061: 35948,
        59062: 35960,
        59063: 35962,
        59064: 35970,
        59065: 35977,
        59066: 35973,
        59067: 35978,
        59068: 35981,
        59069: 35982,
        59070: 35988,
        59071: 35964,
        59072: 35992,
        59073: 25117,
        59074: 36013,
        59075: 36010,
        59076: 36029,
        59077: 36018,
        59078: 36019,
        59079: 36014,
        59080: 36022,
        59081: 36040,
        59082: 36033,
        59083: 36068,
        59084: 36067,
        59085: 36058,
        59086: 36093,
        59087: 36090,
        59088: 36091,
        59089: 36100,
        59090: 36101,
        59091: 36106,
        59092: 36103,
        59093: 36111,
        59094: 36109,
        59095: 36112,
        59096: 40782,
        59097: 36115,
        59098: 36045,
        59099: 36116,
        59100: 36118,
        59101: 36199,
        59102: 36205,
        59103: 36209,
        59104: 36211,
        59105: 36225,
        59106: 36249,
        59107: 36290,
        59108: 36286,
        59109: 36282,
        59110: 36303,
        59111: 36314,
        59112: 36310,
        59113: 36300,
        59114: 36315,
        59115: 36299,
        59116: 36330,
        59117: 36331,
        59118: 36319,
        59119: 36323,
        59120: 36348,
        59121: 36360,
        59122: 36361,
        59123: 36351,
        59124: 36381,
        59125: 36382,
        59126: 36368,
        59127: 36383,
        59128: 36418,
        59129: 36405,
        59130: 36400,
        59131: 36404,
        59132: 36426,
        59200: 36423,
        59201: 36425,
        59202: 36428,
        59203: 36432,
        59204: 36424,
        59205: 36441,
        59206: 36452,
        59207: 36448,
        59208: 36394,
        59209: 36451,
        59210: 36437,
        59211: 36470,
        59212: 36466,
        59213: 36476,
        59214: 36481,
        59215: 36487,
        59216: 36485,
        59217: 36484,
        59218: 36491,
        59219: 36490,
        59220: 36499,
        59221: 36497,
        59222: 36500,
        59223: 36505,
        59224: 36522,
        59225: 36513,
        59226: 36524,
        59227: 36528,
        59228: 36550,
        59229: 36529,
        59230: 36542,
        59231: 36549,
        59232: 36552,
        59233: 36555,
        59234: 36571,
        59235: 36579,
        59236: 36604,
        59237: 36603,
        59238: 36587,
        59239: 36606,
        59240: 36618,
        59241: 36613,
        59242: 36629,
        59243: 36626,
        59244: 36633,
        59245: 36627,
        59246: 36636,
        59247: 36639,
        59248: 36635,
        59249: 36620,
        59250: 36646,
        59251: 36659,
        59252: 36667,
        59253: 36665,
        59254: 36677,
        59255: 36674,
        59256: 36670,
        59257: 36684,
        59258: 36681,
        59259: 36678,
        59260: 36686,
        59261: 36695,
        59262: 36700,
        59264: 36706,
        59265: 36707,
        59266: 36708,
        59267: 36764,
        59268: 36767,
        59269: 36771,
        59270: 36781,
        59271: 36783,
        59272: 36791,
        59273: 36826,
        59274: 36837,
        59275: 36834,
        59276: 36842,
        59277: 36847,
        59278: 36999,
        59279: 36852,
        59280: 36869,
        59281: 36857,
        59282: 36858,
        59283: 36881,
        59284: 36885,
        59285: 36897,
        59286: 36877,
        59287: 36894,
        59288: 36886,
        59289: 36875,
        59290: 36903,
        59291: 36918,
        59292: 36917,
        59293: 36921,
        59294: 36856,
        59295: 36943,
        59296: 36944,
        59297: 36945,
        59298: 36946,
        59299: 36878,
        59300: 36937,
        59301: 36926,
        59302: 36950,
        59303: 36952,
        59304: 36958,
        59305: 36968,
        59306: 36975,
        59307: 36982,
        59308: 38568,
        59309: 36978,
        59310: 36994,
        59311: 36989,
        59312: 36993,
        59313: 36992,
        59314: 37002,
        59315: 37001,
        59316: 37007,
        59317: 37032,
        59318: 37039,
        59319: 37041,
        59320: 37045,
        59321: 37090,
        59322: 37092,
        59323: 25160,
        59324: 37083,
        59325: 37122,
        59326: 37138,
        59327: 37145,
        59328: 37170,
        59329: 37168,
        59330: 37194,
        59331: 37206,
        59332: 37208,
        59333: 37219,
        59334: 37221,
        59335: 37225,
        59336: 37235,
        59337: 37234,
        59338: 37259,
        59339: 37257,
        59340: 37250,
        59341: 37282,
        59342: 37291,
        59343: 37295,
        59344: 37290,
        59345: 37301,
        59346: 37300,
        59347: 37306,
        59348: 37312,
        59349: 37313,
        59350: 37321,
        59351: 37323,
        59352: 37328,
        59353: 37334,
        59354: 37343,
        59355: 37345,
        59356: 37339,
        59357: 37372,
        59358: 37365,
        59359: 37366,
        59360: 37406,
        59361: 37375,
        59362: 37396,
        59363: 37420,
        59364: 37397,
        59365: 37393,
        59366: 37470,
        59367: 37463,
        59368: 37445,
        59369: 37449,
        59370: 37476,
        59371: 37448,
        59372: 37525,
        59373: 37439,
        59374: 37451,
        59375: 37456,
        59376: 37532,
        59377: 37526,
        59378: 37523,
        59379: 37531,
        59380: 37466,
        59381: 37583,
        59382: 37561,
        59383: 37559,
        59384: 37609,
        59385: 37647,
        59386: 37626,
        59387: 37700,
        59388: 37678,
        59456: 37657,
        59457: 37666,
        59458: 37658,
        59459: 37667,
        59460: 37690,
        59461: 37685,
        59462: 37691,
        59463: 37724,
        59464: 37728,
        59465: 37756,
        59466: 37742,
        59467: 37718,
        59468: 37808,
        59469: 37804,
        59470: 37805,
        59471: 37780,
        59472: 37817,
        59473: 37846,
        59474: 37847,
        59475: 37864,
        59476: 37861,
        59477: 37848,
        59478: 37827,
        59479: 37853,
        59480: 37840,
        59481: 37832,
        59482: 37860,
        59483: 37914,
        59484: 37908,
        59485: 37907,
        59486: 37891,
        59487: 37895,
        59488: 37904,
        59489: 37942,
        59490: 37931,
        59491: 37941,
        59492: 37921,
        59493: 37946,
        59494: 37953,
        59495: 37970,
        59496: 37956,
        59497: 37979,
        59498: 37984,
        59499: 37986,
        59500: 37982,
        59501: 37994,
        59502: 37417,
        59503: 38e3,
        59504: 38005,
        59505: 38007,
        59506: 38013,
        59507: 37978,
        59508: 38012,
        59509: 38014,
        59510: 38017,
        59511: 38015,
        59512: 38274,
        59513: 38279,
        59514: 38282,
        59515: 38292,
        59516: 38294,
        59517: 38296,
        59518: 38297,
        59520: 38304,
        59521: 38312,
        59522: 38311,
        59523: 38317,
        59524: 38332,
        59525: 38331,
        59526: 38329,
        59527: 38334,
        59528: 38346,
        59529: 28662,
        59530: 38339,
        59531: 38349,
        59532: 38348,
        59533: 38357,
        59534: 38356,
        59535: 38358,
        59536: 38364,
        59537: 38369,
        59538: 38373,
        59539: 38370,
        59540: 38433,
        59541: 38440,
        59542: 38446,
        59543: 38447,
        59544: 38466,
        59545: 38476,
        59546: 38479,
        59547: 38475,
        59548: 38519,
        59549: 38492,
        59550: 38494,
        59551: 38493,
        59552: 38495,
        59553: 38502,
        59554: 38514,
        59555: 38508,
        59556: 38541,
        59557: 38552,
        59558: 38549,
        59559: 38551,
        59560: 38570,
        59561: 38567,
        59562: 38577,
        59563: 38578,
        59564: 38576,
        59565: 38580,
        59566: 38582,
        59567: 38584,
        59568: 38585,
        59569: 38606,
        59570: 38603,
        59571: 38601,
        59572: 38605,
        59573: 35149,
        59574: 38620,
        59575: 38669,
        59576: 38613,
        59577: 38649,
        59578: 38660,
        59579: 38662,
        59580: 38664,
        59581: 38675,
        59582: 38670,
        59583: 38673,
        59584: 38671,
        59585: 38678,
        59586: 38681,
        59587: 38692,
        59588: 38698,
        59589: 38704,
        59590: 38713,
        59591: 38717,
        59592: 38718,
        59593: 38724,
        59594: 38726,
        59595: 38728,
        59596: 38722,
        59597: 38729,
        59598: 38748,
        59599: 38752,
        59600: 38756,
        59601: 38758,
        59602: 38760,
        59603: 21202,
        59604: 38763,
        59605: 38769,
        59606: 38777,
        59607: 38789,
        59608: 38780,
        59609: 38785,
        59610: 38778,
        59611: 38790,
        59612: 38795,
        59613: 38799,
        59614: 38800,
        59615: 38812,
        59616: 38824,
        59617: 38822,
        59618: 38819,
        59619: 38835,
        59620: 38836,
        59621: 38851,
        59622: 38854,
        59623: 38856,
        59624: 38859,
        59625: 38876,
        59626: 38893,
        59627: 40783,
        59628: 38898,
        59629: 31455,
        59630: 38902,
        59631: 38901,
        59632: 38927,
        59633: 38924,
        59634: 38968,
        59635: 38948,
        59636: 38945,
        59637: 38967,
        59638: 38973,
        59639: 38982,
        59640: 38991,
        59641: 38987,
        59642: 39019,
        59643: 39023,
        59644: 39024,
        59712: 39025,
        59713: 39028,
        59714: 39027,
        59715: 39082,
        59716: 39087,
        59717: 39089,
        59718: 39094,
        59719: 39108,
        59720: 39107,
        59721: 39110,
        59722: 39145,
        59723: 39147,
        59724: 39171,
        59725: 39177,
        59726: 39186,
        59727: 39188,
        59728: 39192,
        59729: 39201,
        59730: 39197,
        59731: 39198,
        59732: 39204,
        59733: 39200,
        59734: 39212,
        59735: 39214,
        59736: 39229,
        59737: 39230,
        59738: 39234,
        59739: 39241,
        59740: 39237,
        59741: 39248,
        59742: 39243,
        59743: 39249,
        59744: 39250,
        59745: 39244,
        59746: 39253,
        59747: 39319,
        59748: 39320,
        59749: 39333,
        59750: 39341,
        59751: 39342,
        59752: 39356,
        59753: 39391,
        59754: 39387,
        59755: 39389,
        59756: 39384,
        59757: 39377,
        59758: 39405,
        59759: 39406,
        59760: 39409,
        59761: 39410,
        59762: 39419,
        59763: 39416,
        59764: 39425,
        59765: 39439,
        59766: 39429,
        59767: 39394,
        59768: 39449,
        59769: 39467,
        59770: 39479,
        59771: 39493,
        59772: 39490,
        59773: 39488,
        59774: 39491,
        59776: 39486,
        59777: 39509,
        59778: 39501,
        59779: 39515,
        59780: 39511,
        59781: 39519,
        59782: 39522,
        59783: 39525,
        59784: 39524,
        59785: 39529,
        59786: 39531,
        59787: 39530,
        59788: 39597,
        59789: 39600,
        59790: 39612,
        59791: 39616,
        59792: 39631,
        59793: 39633,
        59794: 39635,
        59795: 39636,
        59796: 39646,
        59797: 39647,
        59798: 39650,
        59799: 39651,
        59800: 39654,
        59801: 39663,
        59802: 39659,
        59803: 39662,
        59804: 39668,
        59805: 39665,
        59806: 39671,
        59807: 39675,
        59808: 39686,
        59809: 39704,
        59810: 39706,
        59811: 39711,
        59812: 39714,
        59813: 39715,
        59814: 39717,
        59815: 39719,
        59816: 39720,
        59817: 39721,
        59818: 39722,
        59819: 39726,
        59820: 39727,
        59821: 39730,
        59822: 39748,
        59823: 39747,
        59824: 39759,
        59825: 39757,
        59826: 39758,
        59827: 39761,
        59828: 39768,
        59829: 39796,
        59830: 39827,
        59831: 39811,
        59832: 39825,
        59833: 39830,
        59834: 39831,
        59835: 39839,
        59836: 39840,
        59837: 39848,
        59838: 39860,
        59839: 39872,
        59840: 39882,
        59841: 39865,
        59842: 39878,
        59843: 39887,
        59844: 39889,
        59845: 39890,
        59846: 39907,
        59847: 39906,
        59848: 39908,
        59849: 39892,
        59850: 39905,
        59851: 39994,
        59852: 39922,
        59853: 39921,
        59854: 39920,
        59855: 39957,
        59856: 39956,
        59857: 39945,
        59858: 39955,
        59859: 39948,
        59860: 39942,
        59861: 39944,
        59862: 39954,
        59863: 39946,
        59864: 39940,
        59865: 39982,
        59866: 39963,
        59867: 39973,
        59868: 39972,
        59869: 39969,
        59870: 39984,
        59871: 40007,
        59872: 39986,
        59873: 40006,
        59874: 39998,
        59875: 40026,
        59876: 40032,
        59877: 40039,
        59878: 40054,
        59879: 40056,
        59880: 40167,
        59881: 40172,
        59882: 40176,
        59883: 40201,
        59884: 40200,
        59885: 40171,
        59886: 40195,
        59887: 40198,
        59888: 40234,
        59889: 40230,
        59890: 40367,
        59891: 40227,
        59892: 40223,
        59893: 40260,
        59894: 40213,
        59895: 40210,
        59896: 40257,
        59897: 40255,
        59898: 40254,
        59899: 40262,
        59900: 40264,
        59968: 40285,
        59969: 40286,
        59970: 40292,
        59971: 40273,
        59972: 40272,
        59973: 40281,
        59974: 40306,
        59975: 40329,
        59976: 40327,
        59977: 40363,
        59978: 40303,
        59979: 40314,
        59980: 40346,
        59981: 40356,
        59982: 40361,
        59983: 40370,
        59984: 40388,
        59985: 40385,
        59986: 40379,
        59987: 40376,
        59988: 40378,
        59989: 40390,
        59990: 40399,
        59991: 40386,
        59992: 40409,
        59993: 40403,
        59994: 40440,
        59995: 40422,
        59996: 40429,
        59997: 40431,
        59998: 40445,
        59999: 40474,
        6e4: 40475,
        60001: 40478,
        60002: 40565,
        60003: 40569,
        60004: 40573,
        60005: 40577,
        60006: 40584,
        60007: 40587,
        60008: 40588,
        60009: 40594,
        60010: 40597,
        60011: 40593,
        60012: 40605,
        60013: 40613,
        60014: 40617,
        60015: 40632,
        60016: 40618,
        60017: 40621,
        60018: 38753,
        60019: 40652,
        60020: 40654,
        60021: 40655,
        60022: 40656,
        60023: 40660,
        60024: 40668,
        60025: 40670,
        60026: 40669,
        60027: 40672,
        60028: 40677,
        60029: 40680,
        60030: 40687,
        60032: 40692,
        60033: 40694,
        60034: 40695,
        60035: 40697,
        60036: 40699,
        60037: 40700,
        60038: 40701,
        60039: 40711,
        60040: 40712,
        60041: 30391,
        60042: 40725,
        60043: 40737,
        60044: 40748,
        60045: 40766,
        60046: 40778,
        60047: 40786,
        60048: 40788,
        60049: 40803,
        60050: 40799,
        60051: 40800,
        60052: 40801,
        60053: 40806,
        60054: 40807,
        60055: 40812,
        60056: 40810,
        60057: 40823,
        60058: 40818,
        60059: 40822,
        60060: 40853,
        60061: 40860,
        60062: 40864,
        60063: 22575,
        60064: 27079,
        60065: 36953,
        60066: 29796,
        60067: 20956,
        60068: 29081
      }
    },
    function (e, r, t) {
      "use strict";
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var n = t(1),
        a = t(2);
      r.decode = function decode(e, r) {
        var t = new Uint8ClampedArray(e.length);
        t.set(e);
        for (var i = new n.default(285, 256, 0), o = new a.default(i, t), l = new Uint8ClampedArray(r), s = !1, c = 0; c < r; c++) {
          var u = o.evaluateAt(i.exp(c + i.generatorBase));
          l[l.length - 1 - c] = u, 0 !== u && (s = !0)
        }
        if (!s) return t;
        var p = new a.default(i, l),
          d = function runEuclideanAlgorithm(e, r, t, n) {
            var a;
            r.degree() < t.degree() && (r = (a = [t, r])[0], t = a[1]);
            for (var i = r, o = t, l = e.zero, s = e.one; o.degree() >= n / 2;) {
              var c = i,
                u = l;
              if (l = s, (i = o).isZero()) return null;
              o = c;
              for (var p = e.zero, d = i.getCoefficient(i.degree()), f = e.inverse(d); o.degree() >= i.degree() && !o.isZero();) {
                var m = o.degree() - i.degree(),
                  v = e.multiply(o.getCoefficient(o.degree()), f);
                p = p.addOrSubtract(e.buildMonomial(m, v)), o = o.addOrSubtract(i.multiplyByMonomial(m, v))
              }
              if (s = p.multiplyPoly(l).addOrSubtract(u), o.degree() >= i.degree()) return null
            }
            var w = s.getCoefficient(0);
            if (0 === w) return null;
            var y = e.inverse(w);
            return [s.multiply(y), o.multiply(y)]
          }(i, i.buildMonomial(r, 1), p, r);
        if (null === d) return null;
        var f = function findErrorLocations(e, r) {
          var t = r.degree();
          if (1 === t) return [r.getCoefficient(1)];
          for (var n = new Array(t), a = 0, i = 1; i < e.size && a < t; i++) 0 === r.evaluateAt(i) && (n[a] = e.inverse(i), a++);
          return a !== t ? null : n
        }(i, d[0]);
        if (null == f) return null;
        for (var m = function findErrorMagnitudes(e, r, t) {
          for (var a = t.length, i = new Array(a), o = 0; o < a; o++) {
            for (var l = e.inverse(t[o]), s = 1, c = 0; c < a; c++) o !== c && (s = e.multiply(s, n.addOrSubtractGF(1, e.multiply(t[c], l))));
            i[o] = e.multiply(r.evaluateAt(l), e.inverse(s)), 0 !== e.generatorBase && (i[o] = e.multiply(i[o], l))
          }
          return i
        }(i, d[1], f), v = 0; v < f.length; v++) {
          var w = t.length - 1 - i.log(f[v]);
          if (w < 0) return null;
          t[w] = n.addOrSubtractGF(t[w], m[v])
        }
        return t
      }
    },
    function (e, r, t) {
      "use strict";
      Object.defineProperty(r, "__esModule", {
        value: !0
      }), r.VERSIONS = [{
        infoBits: null,
        versionNumber: 1,
        alignmentPatternCenters: [],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 7,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 19
          }]
        }, {
          ecCodewordsPerBlock: 10,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 16
          }]
        }, {
          ecCodewordsPerBlock: 13,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 13
          }]
        }, {
          ecCodewordsPerBlock: 17,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 9
          }]
        }]
      }, {
        infoBits: null,
        versionNumber: 2,
        alignmentPatternCenters: [6, 18],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 10,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 34
          }]
        }, {
          ecCodewordsPerBlock: 16,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 28
          }]
        }, {
          ecCodewordsPerBlock: 22,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 22
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: null,
        versionNumber: 3,
        alignmentPatternCenters: [6, 22],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 15,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 55
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 44
          }]
        }, {
          ecCodewordsPerBlock: 18,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 17
          }]
        }, {
          ecCodewordsPerBlock: 22,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 13
          }]
        }]
      }, {
        infoBits: null,
        versionNumber: 4,
        alignmentPatternCenters: [6, 26],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 20,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 80
          }]
        }, {
          ecCodewordsPerBlock: 18,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 32
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 24
          }]
        }, {
          ecCodewordsPerBlock: 16,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 9
          }]
        }]
      }, {
        infoBits: null,
        versionNumber: 5,
        alignmentPatternCenters: [6, 30],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 108
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 43
          }]
        }, {
          ecCodewordsPerBlock: 18,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 16
          }]
        }, {
          ecCodewordsPerBlock: 22,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 11
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 12
          }]
        }]
      }, {
        infoBits: null,
        versionNumber: 6,
        alignmentPatternCenters: [6, 34],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 18,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 68
          }]
        }, {
          ecCodewordsPerBlock: 16,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 27
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 19
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 15
          }]
        }]
      }, {
        infoBits: 31892,
        versionNumber: 7,
        alignmentPatternCenters: [6, 22, 38],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 20,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 78
          }]
        }, {
          ecCodewordsPerBlock: 18,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 31
          }]
        }, {
          ecCodewordsPerBlock: 18,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 14
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 15
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 13
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 14
          }]
        }]
      }, {
        infoBits: 34236,
        versionNumber: 8,
        alignmentPatternCenters: [6, 24, 42],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 97
          }]
        }, {
          ecCodewordsPerBlock: 22,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 38
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 39
          }]
        }, {
          ecCodewordsPerBlock: 22,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 18
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 19
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 14
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 15
          }]
        }]
      }, {
        infoBits: 39577,
        versionNumber: 9,
        alignmentPatternCenters: [6, 26, 46],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 116
          }]
        }, {
          ecCodewordsPerBlock: 22,
          ecBlocks: [{
            numBlocks: 3,
            dataCodewordsPerBlock: 36
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 37
          }]
        }, {
          ecCodewordsPerBlock: 20,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 16
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 17
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 12
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 13
          }]
        }]
      }, {
        infoBits: 42195,
        versionNumber: 10,
        alignmentPatternCenters: [6, 28, 50],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 18,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 68
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 69
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 43
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 44
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 6,
            dataCodewordsPerBlock: 19
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 20
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 6,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 48118,
        versionNumber: 11,
        alignmentPatternCenters: [6, 30, 54],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 20,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 81
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 50
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 51
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 22
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 23
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 3,
            dataCodewordsPerBlock: 12
          }, {
            numBlocks: 8,
            dataCodewordsPerBlock: 13
          }]
        }]
      }, {
        infoBits: 51042,
        versionNumber: 12,
        alignmentPatternCenters: [6, 32, 58],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 92
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 93
          }]
        }, {
          ecCodewordsPerBlock: 22,
          ecBlocks: [{
            numBlocks: 6,
            dataCodewordsPerBlock: 36
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 37
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 20
          }, {
            numBlocks: 6,
            dataCodewordsPerBlock: 21
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 7,
            dataCodewordsPerBlock: 14
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 15
          }]
        }]
      }, {
        infoBits: 55367,
        versionNumber: 13,
        alignmentPatternCenters: [6, 34, 62],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 107
          }]
        }, {
          ecCodewordsPerBlock: 22,
          ecBlocks: [{
            numBlocks: 8,
            dataCodewordsPerBlock: 37
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 38
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 8,
            dataCodewordsPerBlock: 20
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 21
          }]
        }, {
          ecCodewordsPerBlock: 22,
          ecBlocks: [{
            numBlocks: 12,
            dataCodewordsPerBlock: 11
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 12
          }]
        }]
      }, {
        infoBits: 58893,
        versionNumber: 14,
        alignmentPatternCenters: [6, 26, 46, 66],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 3,
            dataCodewordsPerBlock: 115
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 116
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 40
          }, {
            numBlocks: 5,
            dataCodewordsPerBlock: 41
          }]
        }, {
          ecCodewordsPerBlock: 20,
          ecBlocks: [{
            numBlocks: 11,
            dataCodewordsPerBlock: 16
          }, {
            numBlocks: 5,
            dataCodewordsPerBlock: 17
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 11,
            dataCodewordsPerBlock: 12
          }, {
            numBlocks: 5,
            dataCodewordsPerBlock: 13
          }]
        }]
      }, {
        infoBits: 63784,
        versionNumber: 15,
        alignmentPatternCenters: [6, 26, 48, 70],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 22,
          ecBlocks: [{
            numBlocks: 5,
            dataCodewordsPerBlock: 87
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 88
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 5,
            dataCodewordsPerBlock: 41
          }, {
            numBlocks: 5,
            dataCodewordsPerBlock: 42
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 5,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 7,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 11,
            dataCodewordsPerBlock: 12
          }, {
            numBlocks: 7,
            dataCodewordsPerBlock: 13
          }]
        }]
      }, {
        infoBits: 68472,
        versionNumber: 16,
        alignmentPatternCenters: [6, 26, 50, 74],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 5,
            dataCodewordsPerBlock: 98
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 99
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 7,
            dataCodewordsPerBlock: 45
          }, {
            numBlocks: 3,
            dataCodewordsPerBlock: 46
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 15,
            dataCodewordsPerBlock: 19
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 20
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 3,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 13,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 70749,
        versionNumber: 17,
        alignmentPatternCenters: [6, 30, 54, 78],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 107
          }, {
            numBlocks: 5,
            dataCodewordsPerBlock: 108
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 10,
            dataCodewordsPerBlock: 46
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 47
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 22
          }, {
            numBlocks: 15,
            dataCodewordsPerBlock: 23
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 14
          }, {
            numBlocks: 17,
            dataCodewordsPerBlock: 15
          }]
        }]
      }, {
        infoBits: 76311,
        versionNumber: 18,
        alignmentPatternCenters: [6, 30, 56, 82],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 5,
            dataCodewordsPerBlock: 120
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 121
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 9,
            dataCodewordsPerBlock: 43
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 44
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 17,
            dataCodewordsPerBlock: 22
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 23
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 14
          }, {
            numBlocks: 19,
            dataCodewordsPerBlock: 15
          }]
        }]
      }, {
        infoBits: 79154,
        versionNumber: 19,
        alignmentPatternCenters: [6, 30, 58, 86],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 3,
            dataCodewordsPerBlock: 113
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 114
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 3,
            dataCodewordsPerBlock: 44
          }, {
            numBlocks: 11,
            dataCodewordsPerBlock: 45
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 17,
            dataCodewordsPerBlock: 21
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 22
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 9,
            dataCodewordsPerBlock: 13
          }, {
            numBlocks: 16,
            dataCodewordsPerBlock: 14
          }]
        }]
      }, {
        infoBits: 84390,
        versionNumber: 20,
        alignmentPatternCenters: [6, 34, 62, 90],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 3,
            dataCodewordsPerBlock: 107
          }, {
            numBlocks: 5,
            dataCodewordsPerBlock: 108
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 3,
            dataCodewordsPerBlock: 41
          }, {
            numBlocks: 13,
            dataCodewordsPerBlock: 42
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 15,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 5,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 15,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 10,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 87683,
        versionNumber: 21,
        alignmentPatternCenters: [6, 28, 50, 72, 94],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 116
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 117
          }]
        }, {
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 17,
            dataCodewordsPerBlock: 42
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 17,
            dataCodewordsPerBlock: 22
          }, {
            numBlocks: 6,
            dataCodewordsPerBlock: 23
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 19,
            dataCodewordsPerBlock: 16
          }, {
            numBlocks: 6,
            dataCodewordsPerBlock: 17
          }]
        }]
      }, {
        infoBits: 92361,
        versionNumber: 22,
        alignmentPatternCenters: [6, 26, 50, 74, 98],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 111
          }, {
            numBlocks: 7,
            dataCodewordsPerBlock: 112
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 17,
            dataCodewordsPerBlock: 46
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 7,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 16,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 24,
          ecBlocks: [{
            numBlocks: 34,
            dataCodewordsPerBlock: 13
          }]
        }]
      }, {
        infoBits: 96236,
        versionNumber: 23,
        alignmentPatternCenters: [6, 30, 54, 74, 102],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 121
          }, {
            numBlocks: 5,
            dataCodewordsPerBlock: 122
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 47
          }, {
            numBlocks: 14,
            dataCodewordsPerBlock: 48
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 11,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 14,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 16,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 14,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 102084,
        versionNumber: 24,
        alignmentPatternCenters: [6, 28, 54, 80, 106],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 6,
            dataCodewordsPerBlock: 117
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 118
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 6,
            dataCodewordsPerBlock: 45
          }, {
            numBlocks: 14,
            dataCodewordsPerBlock: 46
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 11,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 16,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 30,
            dataCodewordsPerBlock: 16
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 17
          }]
        }]
      }, {
        infoBits: 102881,
        versionNumber: 25,
        alignmentPatternCenters: [6, 32, 58, 84, 110],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 26,
          ecBlocks: [{
            numBlocks: 8,
            dataCodewordsPerBlock: 106
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 107
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 8,
            dataCodewordsPerBlock: 47
          }, {
            numBlocks: 13,
            dataCodewordsPerBlock: 48
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 7,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 22,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 22,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 13,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 110507,
        versionNumber: 26,
        alignmentPatternCenters: [6, 30, 58, 86, 114],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 10,
            dataCodewordsPerBlock: 114
          }, {
            numBlocks: 2,
            dataCodewordsPerBlock: 115
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 19,
            dataCodewordsPerBlock: 46
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 47
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 28,
            dataCodewordsPerBlock: 22
          }, {
            numBlocks: 6,
            dataCodewordsPerBlock: 23
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 33,
            dataCodewordsPerBlock: 16
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 17
          }]
        }]
      }, {
        infoBits: 110734,
        versionNumber: 27,
        alignmentPatternCenters: [6, 34, 62, 90, 118],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 8,
            dataCodewordsPerBlock: 122
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 123
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 22,
            dataCodewordsPerBlock: 45
          }, {
            numBlocks: 3,
            dataCodewordsPerBlock: 46
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 8,
            dataCodewordsPerBlock: 23
          }, {
            numBlocks: 26,
            dataCodewordsPerBlock: 24
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 12,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 28,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 117786,
        versionNumber: 28,
        alignmentPatternCenters: [6, 26, 50, 74, 98, 122],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 3,
            dataCodewordsPerBlock: 117
          }, {
            numBlocks: 10,
            dataCodewordsPerBlock: 118
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 3,
            dataCodewordsPerBlock: 45
          }, {
            numBlocks: 23,
            dataCodewordsPerBlock: 46
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 31,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 11,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 31,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 119615,
        versionNumber: 29,
        alignmentPatternCenters: [6, 30, 54, 78, 102, 126],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 7,
            dataCodewordsPerBlock: 116
          }, {
            numBlocks: 7,
            dataCodewordsPerBlock: 117
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 21,
            dataCodewordsPerBlock: 45
          }, {
            numBlocks: 7,
            dataCodewordsPerBlock: 46
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 1,
            dataCodewordsPerBlock: 23
          }, {
            numBlocks: 37,
            dataCodewordsPerBlock: 24
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 19,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 26,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 126325,
        versionNumber: 30,
        alignmentPatternCenters: [6, 26, 52, 78, 104, 130],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 5,
            dataCodewordsPerBlock: 115
          }, {
            numBlocks: 10,
            dataCodewordsPerBlock: 116
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 19,
            dataCodewordsPerBlock: 47
          }, {
            numBlocks: 10,
            dataCodewordsPerBlock: 48
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 15,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 25,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 23,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 25,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 127568,
        versionNumber: 31,
        alignmentPatternCenters: [6, 30, 56, 82, 108, 134],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 13,
            dataCodewordsPerBlock: 115
          }, {
            numBlocks: 3,
            dataCodewordsPerBlock: 116
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 46
          }, {
            numBlocks: 29,
            dataCodewordsPerBlock: 47
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 42,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 23,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 28,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 133589,
        versionNumber: 32,
        alignmentPatternCenters: [6, 34, 60, 86, 112, 138],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 17,
            dataCodewordsPerBlock: 115
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 10,
            dataCodewordsPerBlock: 46
          }, {
            numBlocks: 23,
            dataCodewordsPerBlock: 47
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 10,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 35,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 19,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 35,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 136944,
        versionNumber: 33,
        alignmentPatternCenters: [6, 30, 58, 86, 114, 142],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 17,
            dataCodewordsPerBlock: 115
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 116
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 14,
            dataCodewordsPerBlock: 46
          }, {
            numBlocks: 21,
            dataCodewordsPerBlock: 47
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 29,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 19,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 11,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 46,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 141498,
        versionNumber: 34,
        alignmentPatternCenters: [6, 34, 62, 90, 118, 146],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 13,
            dataCodewordsPerBlock: 115
          }, {
            numBlocks: 6,
            dataCodewordsPerBlock: 116
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 14,
            dataCodewordsPerBlock: 46
          }, {
            numBlocks: 23,
            dataCodewordsPerBlock: 47
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 44,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 7,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 59,
            dataCodewordsPerBlock: 16
          }, {
            numBlocks: 1,
            dataCodewordsPerBlock: 17
          }]
        }]
      }, {
        infoBits: 145311,
        versionNumber: 35,
        alignmentPatternCenters: [6, 30, 54, 78, 102, 126, 150],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 12,
            dataCodewordsPerBlock: 121
          }, {
            numBlocks: 7,
            dataCodewordsPerBlock: 122
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 12,
            dataCodewordsPerBlock: 47
          }, {
            numBlocks: 26,
            dataCodewordsPerBlock: 48
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 39,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 14,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 22,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 41,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 150283,
        versionNumber: 36,
        alignmentPatternCenters: [6, 24, 50, 76, 102, 128, 154],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 6,
            dataCodewordsPerBlock: 121
          }, {
            numBlocks: 14,
            dataCodewordsPerBlock: 122
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 6,
            dataCodewordsPerBlock: 47
          }, {
            numBlocks: 34,
            dataCodewordsPerBlock: 48
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 46,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 10,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 2,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 64,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 152622,
        versionNumber: 37,
        alignmentPatternCenters: [6, 28, 54, 80, 106, 132, 158],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 17,
            dataCodewordsPerBlock: 122
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 123
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 29,
            dataCodewordsPerBlock: 46
          }, {
            numBlocks: 14,
            dataCodewordsPerBlock: 47
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 49,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 10,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 24,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 46,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 158308,
        versionNumber: 38,
        alignmentPatternCenters: [6, 32, 58, 84, 110, 136, 162],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 4,
            dataCodewordsPerBlock: 122
          }, {
            numBlocks: 18,
            dataCodewordsPerBlock: 123
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 13,
            dataCodewordsPerBlock: 46
          }, {
            numBlocks: 32,
            dataCodewordsPerBlock: 47
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 48,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 14,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 42,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 32,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 161089,
        versionNumber: 39,
        alignmentPatternCenters: [6, 26, 54, 82, 110, 138, 166],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 20,
            dataCodewordsPerBlock: 117
          }, {
            numBlocks: 4,
            dataCodewordsPerBlock: 118
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 40,
            dataCodewordsPerBlock: 47
          }, {
            numBlocks: 7,
            dataCodewordsPerBlock: 48
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 43,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 22,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 10,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 67,
            dataCodewordsPerBlock: 16
          }]
        }]
      }, {
        infoBits: 167017,
        versionNumber: 40,
        alignmentPatternCenters: [6, 30, 58, 86, 114, 142, 170],
        errorCorrectionLevels: [{
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 19,
            dataCodewordsPerBlock: 118
          }, {
            numBlocks: 6,
            dataCodewordsPerBlock: 119
          }]
        }, {
          ecCodewordsPerBlock: 28,
          ecBlocks: [{
            numBlocks: 18,
            dataCodewordsPerBlock: 47
          }, {
            numBlocks: 31,
            dataCodewordsPerBlock: 48
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 34,
            dataCodewordsPerBlock: 24
          }, {
            numBlocks: 34,
            dataCodewordsPerBlock: 25
          }]
        }, {
          ecCodewordsPerBlock: 30,
          ecBlocks: [{
            numBlocks: 20,
            dataCodewordsPerBlock: 15
          }, {
            numBlocks: 61,
            dataCodewordsPerBlock: 16
          }]
        }]
      }]
    },
    function (e, r, t) {
      "use strict";
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var n = t(0);

      function squareToQuadrilateral(e, r, t, n) {
        var a = e.x - r.x + t.x - n.x,
          i = e.y - r.y + t.y - n.y;
        if (0 === a && 0 === i) return {
          a11: r.x - e.x,
          a12: r.y - e.y,
          a13: 0,
          a21: t.x - r.x,
          a22: t.y - r.y,
          a23: 0,
          a31: e.x,
          a32: e.y,
          a33: 1
        };
        var o = r.x - t.x,
          l = n.x - t.x,
          s = r.y - t.y,
          c = n.y - t.y,
          u = o * c - l * s,
          p = (a * c - l * i) / u,
          d = (o * i - a * s) / u;
        return {
          a11: r.x - e.x + p * r.x,
          a12: r.y - e.y + p * r.y,
          a13: p,
          a21: n.x - e.x + d * n.x,
          a22: n.y - e.y + d * n.y,
          a23: d,
          a31: e.x,
          a32: e.y,
          a33: 1
        }
      }
      r.extract = function extract(e, r) {
        for (var t = function quadrilateralToSquare(e, r, t, n) {
          var a = squareToQuadrilateral(e, r, t, n);
          return {
            a11: a.a22 * a.a33 - a.a23 * a.a32,
            a12: a.a13 * a.a32 - a.a12 * a.a33,
            a13: a.a12 * a.a23 - a.a13 * a.a22,
            a21: a.a23 * a.a31 - a.a21 * a.a33,
            a22: a.a11 * a.a33 - a.a13 * a.a31,
            a23: a.a13 * a.a21 - a.a11 * a.a23,
            a31: a.a21 * a.a32 - a.a22 * a.a31,
            a32: a.a12 * a.a31 - a.a11 * a.a32,
            a33: a.a11 * a.a22 - a.a12 * a.a21
          }
        }({
          x: 3.5,
          y: 3.5
        }, {
          x: r.dimension - 3.5,
          y: 3.5
        }, {
          x: r.dimension - 6.5,
          y: r.dimension - 6.5
        }, {
          x: 3.5,
          y: r.dimension - 3.5
        }), a = function times(e, r) {
          return {
            a11: e.a11 * r.a11 + e.a21 * r.a12 + e.a31 * r.a13,
            a12: e.a12 * r.a11 + e.a22 * r.a12 + e.a32 * r.a13,
            a13: e.a13 * r.a11 + e.a23 * r.a12 + e.a33 * r.a13,
            a21: e.a11 * r.a21 + e.a21 * r.a22 + e.a31 * r.a23,
            a22: e.a12 * r.a21 + e.a22 * r.a22 + e.a32 * r.a23,
            a23: e.a13 * r.a21 + e.a23 * r.a22 + e.a33 * r.a23,
            a31: e.a11 * r.a31 + e.a21 * r.a32 + e.a31 * r.a33,
            a32: e.a12 * r.a31 + e.a22 * r.a32 + e.a32 * r.a33,
            a33: e.a13 * r.a31 + e.a23 * r.a32 + e.a33 * r.a33
          }
        }(squareToQuadrilateral(r.topLeft, r.topRight, r.alignmentPattern, r.bottomLeft), t), i = n.BitMatrix.createEmpty(r.dimension, r.dimension), mappingFunction = function (e, r) {
          var t = a.a13 * e + a.a23 * r + a.a33;
          return {
            x: (a.a11 * e + a.a21 * r + a.a31) / t,
            y: (a.a12 * e + a.a22 * r + a.a32) / t
          }
        }, o = 0; o < r.dimension; o++)
          for (var l = 0; l < r.dimension; l++) {
            var s = mappingFunction(l + .5, o + .5);
            i.set(l, o, e.get(Math.floor(s.x), Math.floor(s.y)))
          }
        return {
          matrix: i,
          mappingFunction: mappingFunction
        }
      }
    },
    function (e, r, t) {
      "use strict";
      Object.defineProperty(r, "__esModule", {
        value: !0
      });
      var distance = function (e, r) {
        return Math.sqrt(Math.pow(r.x - e.x, 2) + Math.pow(r.y - e.y, 2))
      };

      function sum(e) {
        return e.reduce((function (e, r) {
          return e + r
        }))
      }

      function countBlackWhiteRunTowardsPoint(e, r, t, n) {
        var a, i, o, l, s = [{
          x: Math.floor(e.x),
          y: Math.floor(e.y)
        }],
          c = Math.abs(r.y - e.y) > Math.abs(r.x - e.x);
        c ? (a = Math.floor(e.y), i = Math.floor(e.x), o = Math.floor(r.y), l = Math.floor(r.x)) : (a = Math.floor(e.x), i = Math.floor(e.y), o = Math.floor(r.x), l = Math.floor(r.y));
        for (var u = Math.abs(o - a), p = Math.abs(l - i), d = Math.floor(-u / 2), f = a < o ? 1 : -1, m = i < l ? 1 : -1, v = !0, w = a, y = i; w !== o + f; w += f) {
          var h = c ? y : w,
            M = c ? w : y;
          if (t.get(h, M) !== v && (v = !v, s.push({
            x: h,
            y: M
          }), s.length === n + 1)) break;
          if ((d += p) > 0) {
            if (y === l) break;
            y += m, d -= u
          }
        }
        for (var E = [], S = 0; S < n; S++) s[S] && s[S + 1] ? E.push(distance(s[S], s[S + 1])) : E.push(0);
        return E
      }

      function countBlackWhiteRun(e, r, t, n) {
        var a, i = r.y - e.y,
          o = r.x - e.x,
          l = countBlackWhiteRunTowardsPoint(e, r, t, Math.ceil(n / 2)),
          s = countBlackWhiteRunTowardsPoint(e, {
            x: e.x - o,
            y: e.y - i
          }, t, Math.ceil(n / 2)),
          c = l.shift() + s.shift() - 1;
        return (a = s.concat(c)).concat.apply(a, l)
      }

      function scoreBlackWhiteRun(e, r) {
        var t = sum(e) / sum(r),
          n = 0;
        return r.forEach((function (r, a) {
          n += Math.pow(e[a] - r * t, 2)
        })), {
          averageSize: t,
          error: n
        }
      }

      function scorePattern(e, r, t) {
        try {
          var n = countBlackWhiteRun(e, {
            x: -1,
            y: e.y
          }, t, r.length),
            a = countBlackWhiteRun(e, {
              x: e.x,
              y: -1
            }, t, r.length),
            i = countBlackWhiteRun(e, {
              x: Math.max(0, e.x - e.y) - 1,
              y: Math.max(0, e.y - e.x) - 1
            }, t, r.length),
            o = countBlackWhiteRun(e, {
              x: Math.min(t.width, e.x + e.y) + 1,
              y: Math.min(t.height, e.y + e.x) + 1
            }, t, r.length),
            l = scoreBlackWhiteRun(n, r),
            s = scoreBlackWhiteRun(a, r),
            c = scoreBlackWhiteRun(i, r),
            u = scoreBlackWhiteRun(o, r),
            p = Math.sqrt(l.error * l.error + s.error * s.error + c.error * c.error + u.error * u.error),
            d = (l.averageSize + s.averageSize + c.averageSize + u.averageSize) / 4;
          return p + (Math.pow(l.averageSize - d, 2) + Math.pow(s.averageSize - d, 2) + Math.pow(c.averageSize - d, 2) + Math.pow(u.averageSize - d, 2)) / d
        } catch (e) {
          return 1 / 0
        }
      }

      function recenterLocation(e, r) {
        for (var t = Math.round(r.x); e.get(t, Math.round(r.y));) t--;
        for (var n = Math.round(r.x); e.get(n, Math.round(r.y));) n++;
        for (var a = (t + n) / 2, i = Math.round(r.y); e.get(Math.round(a), i);) i--;
        for (var o = Math.round(r.y); e.get(Math.round(a), o);) o++;
        return {
          x: a,
          y: (i + o) / 2
        }
      }

      function findAlignmentPattern(e, r, t, n, a) {
        var i, o, l;
        try {
          i = function computeDimension(e, r, t, n) {
            var a = (sum(countBlackWhiteRun(e, t, n, 5)) / 7 + sum(countBlackWhiteRun(e, r, n, 5)) / 7 + sum(countBlackWhiteRun(t, e, n, 5)) / 7 + sum(countBlackWhiteRun(r, e, n, 5)) / 7) / 4;
            if (a < 1) throw new Error("Invalid module size");
            var i = Math.round(distance(e, r) / a),
              o = Math.round(distance(e, t) / a),
              l = Math.floor((i + o) / 2) + 7;
            switch (l % 4) {
              case 0:
                l++;
                break;
              case 2:
                l--
            }
            return {
              dimension: l,
              moduleSize: a
            }
          }(n, t, a, e), o = i.dimension, l = i.moduleSize
        } catch (e) {
          return null
        }
        var s = t.x - n.x + a.x,
          c = t.y - n.y + a.y,
          u = (distance(n, a) + distance(n, t)) / 2 / l,
          p = 1 - 3 / u,
          d = {
            x: n.x + p * (s - n.x),
            y: n.y + p * (c - n.y)
          },
          f = r.map((function (r) {
            var t = (r.top.startX + r.top.endX + r.bottom.startX + r.bottom.endX) / 4,
              n = (r.top.y + r.bottom.y + 1) / 2;
            if (e.get(Math.floor(t), Math.floor(n))) return {
              x: t,
              y: n,
              score: scorePattern({
                x: Math.floor(t),
                y: Math.floor(n)
              }, [1, 1, 1], e) + distance({
                x: t,
                y: n
              }, d)
            }
          })).filter((function (e) {
            return !!e
          })).sort((function (e, r) {
            return e.score - r.score
          }));
        return {
          alignmentPattern: u >= 15 && f.length ? f[0] : d,
          dimension: o
        }
      }
      r.locate = function locate(e) {
        for (var r = [], t = [], n = [], a = [], _loop_1 = function (i) {
          for (var o = 0, l = !1, s = [0, 0, 0, 0, 0], _loop_2 = function (r) {
            var n = e.get(r, i);
            if (n === l) o++;
            else {
              s = [s[1], s[2], s[3], s[4], o], o = 1, l = n;
              var c = sum(s) / 7,
                u = Math.abs(s[0] - c) < c && Math.abs(s[1] - c) < c && Math.abs(s[2] - 3 * c) < 3 * c && Math.abs(s[3] - c) < c && Math.abs(s[4] - c) < c && !n,
                p = sum(s.slice(-3)) / 3,
                d = Math.abs(s[2] - p) < p && Math.abs(s[3] - p) < p && Math.abs(s[4] - p) < p && n;
              if (u) {
                var f = r - s[3] - s[4],
                  m = f - s[2],
                  v = {
                    startX: m,
                    endX: f,
                    y: i
                  };
                (w = t.filter((function (e) {
                  return m >= e.bottom.startX && m <= e.bottom.endX || f >= e.bottom.startX && m <= e.bottom.endX || m <= e.bottom.startX && f >= e.bottom.endX && s[2] / (e.bottom.endX - e.bottom.startX) < 1.5 && s[2] / (e.bottom.endX - e.bottom.startX) > .5
                }))).length > 0 ? w[0].bottom = v : t.push({
                  top: v,
                  bottom: v
                })
              }
              if (d) {
                var w, y = r - s[4],
                  h = y - s[3];
                v = {
                  startX: h,
                  y: i,
                  endX: y
                };
                (w = a.filter((function (e) {
                  return h >= e.bottom.startX && h <= e.bottom.endX || y >= e.bottom.startX && h <= e.bottom.endX || h <= e.bottom.startX && y >= e.bottom.endX && s[2] / (e.bottom.endX - e.bottom.startX) < 1.5 && s[2] / (e.bottom.endX - e.bottom.startX) > .5
                }))).length > 0 ? w[0].bottom = v : a.push({
                  top: v,
                  bottom: v
                })
              }
            }
          }, c = -1; c <= e.width; c++) _loop_2(c);
          r.push.apply(r, t.filter((function (e) {
            return e.bottom.y !== i && e.bottom.y - e.top.y >= 2
          }))), t = t.filter((function (e) {
            return e.bottom.y === i
          })), n.push.apply(n, a.filter((function (e) {
            return e.bottom.y !== i
          }))), a = a.filter((function (e) {
            return e.bottom.y === i
          }))
        }, i = 0; i <= e.height; i++) _loop_1(i);
        r.push.apply(r, t.filter((function (e) {
          return e.bottom.y - e.top.y >= 2
        }))), n.push.apply(n, a);
        var o = r.filter((function (e) {
          return e.bottom.y - e.top.y >= 2
        })).map((function (r) {
          var t = (r.top.startX + r.top.endX + r.bottom.startX + r.bottom.endX) / 4,
            n = (r.top.y + r.bottom.y + 1) / 2;
          if (e.get(Math.round(t), Math.round(n))) {
            var a = [r.top.endX - r.top.startX, r.bottom.endX - r.bottom.startX, r.bottom.y - r.top.y + 1],
              i = sum(a) / a.length;
            return {
              score: scorePattern({
                x: Math.round(t),
                y: Math.round(n)
              }, [1, 1, 3, 1, 1], e),
              x: t,
              y: n,
              size: i
            }
          }
        })).filter((function (e) {
          return !!e
        })).sort((function (e, r) {
          return e.score - r.score
        })).map((function (e, r, t) {
          if (r > 4) return null;
          var n = t.filter((function (e, t) {
            return r !== t
          })).map((function (r) {
            return {
              x: r.x,
              y: r.y,
              score: r.score + Math.pow(r.size - e.size, 2) / e.size,
              size: r.size
            }
          })).sort((function (e, r) {
            return e.score - r.score
          }));
          if (n.length < 2) return null;
          var a = e.score + n[0].score + n[1].score;
          return {
            points: [e].concat(n.slice(0, 2)),
            score: a
          }
        })).filter((function (e) {
          return !!e
        })).sort((function (e, r) {
          return e.score - r.score
        }));
        if (0 === o.length) return null;
        var l = function reorderFinderPatterns(e, r, t) {
          var n, a, i, o, l, s, c, u = distance(e, r),
            p = distance(r, t),
            d = distance(e, t);
          return p >= u && p >= d ? (l = (n = [r, e, t])[0], s = n[1], c = n[2]) : d >= p && d >= u ? (l = (a = [e, r, t])[0], s = a[1], c = a[2]) : (l = (i = [e, t, r])[0], s = i[1], c = i[2]), (c.x - s.x) * (l.y - s.y) - (c.y - s.y) * (l.x - s.x) < 0 && (l = (o = [c, l])[0], c = o[1]), {
            bottomLeft: l,
            topLeft: s,
            topRight: c
          }
        }(o[0].points[0], o[0].points[1], o[0].points[2]),
          s = l.topRight,
          c = l.topLeft,
          u = l.bottomLeft,
          p = findAlignmentPattern(e, n, s, c, u),
          d = [];
        p && d.push({
          alignmentPattern: {
            x: p.alignmentPattern.x,
            y: p.alignmentPattern.y
          },
          bottomLeft: {
            x: u.x,
            y: u.y
          },
          dimension: p.dimension,
          topLeft: {
            x: c.x,
            y: c.y
          },
          topRight: {
            x: s.x,
            y: s.y
          }
        });
        var f = recenterLocation(e, s),
          m = recenterLocation(e, c),
          v = recenterLocation(e, u),
          w = findAlignmentPattern(e, n, f, m, v);
        return w && d.push({
          alignmentPattern: {
            x: w.alignmentPattern.x,
            y: w.alignmentPattern.y
          },
          bottomLeft: {
            x: v.x,
            y: v.y
          },
          topLeft: {
            x: m.x,
            y: m.y
          },
          topRight: {
            x: f.x,
            y: f.y
          },
          dimension: w.dimension
        }), 0 === d.length ? null : d
      }
    }
  ]).default
}));
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
      return "ChangePassword";
    case WBSAutoFillFormTypeFoundTOTPURI:
      return "FoundTOTPUri"
  }
  return "Unrecognized"
}

function domainsForDisplayFromUsernamesAndDomains(e, r) {
  const t = e.length;
  let n = r.map((function (e) {
    return e.replace(/^(www|m)\./, "")
  })),
    a = [];
  for (var i = 0; i < t; i++) a.push([e[i], n[i]]);
  for (i = 0; i < t; i++) {
    let e = [];
    for (var o = i + 1; o < t; o++) a[i].join("\n") === a[o].join("\n") && (e.length || e.push(i), e.push(o));
    for (identicalIndex of e) n[identicalIndex] = r[identicalIndex]
  }
  return n
}

function urlIsBrowserURL(e) {
  const r = e.protocol;
  return "chrome:" === r || "edge:" === r || "about:" == r
}

function capabilitiesDeclaresMacOS(e) {
  try {
    return "macos" === e.operatingSystem.name
  } catch {
    return !1
  }
}
class Localizer {
  static configureDocumentElementForLanguage(e, r) {
    switch (r) {
      case "he":
      case "ar":
      case "fa":
        e.setAttribute("dir", "rtl"), e.setAttribute("lang", r)
    }
  }
  constructor(e) { }
  getMessage(e, r, t) {
    const n = this.messageNamesToTry(e);
    for (let e of n) {
      let n;
      try {
        n = chrome.i18n.getMessage(e, r, t)
      } catch {
        n = chrome.i18n.getMessage(e, r)
      }
      if (n) return n
    }
    return ""
  }
  messageNamesToTry(e) {
    let r = [];
    return r.push(e), r
  }
}
class ExtensionSettings {
  #e = !1;
  #r = !0;
  #t = !0;
  eventTarget = new EventTarget;
  constructor(e = !1) {
    this.#e = e, this.#n(), this.#a()
  }
  get enableInPageAutoFill() {
    return this.#r
  }
  set enableInPageAutoFill(e) {
    this.#r = e, this.#i()
  }
  get allowExtensionToControlAutoFillSettings() {
    return this.#t
  }
  set allowExtensionToControlAutoFillSettings(e) {
    this.#t = e, this.#o().then(this.#i.bind(this))
  }
  #o() {
    return this.#t ? this.attemptToControlBrowserAutoFillSettings() : this.clearControlOfBrowserAutoFillSettings()
  }
  attemptToControlBrowserAutoFillSettings() {
    return this.#e ? Promise.reject(new Error("This Settings instance does not allow writing browser settings")) : Promise.allSettled([this.#l(chrome.privacy.services.passwordSavingEnabled, !1), this.#l(chrome.privacy.services.autofillCreditCardEnabled, !1), this.#l(chrome.privacy.services.autofillAddressEnabled, !1)]).then((e => (this.#s(), e)))
  }
  clearControlOfBrowserAutoFillSettings() {
    return this.#e ? Promise.reject(new Error("This Settings instance does not allow writing browser settings")) : Promise.allSettled([this.#c(chrome.privacy.services.passwordSavingEnabled), this.#c(chrome.privacy.services.autofillCreditCardEnabled), this.#c(chrome.privacy.services.autofillAddressEnabled)]).then((e => (this.#s(), e)))
  }
  #n() {
    let e = new Promise((e => {
      chrome.storage.sync.get({
        enableInPageAutoFill: !0,
        allowExtensionToControlAutoFillSettings: !0
      }, (r => {
        this.#r = r.enableInPageAutoFill, this.#t = r.allowExtensionToControlAutoFillSettings, e()
      }))
    }));
    return this.#e || (e = e.then(this.#o.bind(this))), e.then(this.#s.bind(this))
  }
  #i() {
    return new Promise((e => {
      chrome.storage.sync.set({
        enableInPageAutoFill: this.#r,
        allowExtensionToControlAutoFillSettings: this.#t
      }, (() => {
        e()
      }))
    })).then(this.#s.bind(this))
  }
  #a() {
    this.#e || (chrome.privacy.services.passwordSavingEnabled && chrome.privacy.services.passwordSavingEnabled.onChange.addListener((e => {
      this.#s()
    })), chrome.privacy.services.autofillCreditCardEnabled && chrome.privacy.services.autofillCreditCardEnabled.onChange.addListener((e => {
      this.#s()
    })), chrome.privacy.services.autofillAddressEnabled && chrome.privacy.services.autofillAddressEnabled.onChange.addListener((e => {
      this.#s()
    })))
  }
  #s() {
    const e = new CustomEvent("settingsChanged", {
      detail: {
        enableInPageAutoFill: this.#r
      }
    });
    this.eventTarget.dispatchEvent(e)
  }
  #l(e, r) {
    return this.#u(e).then((t => t ? t.value === r ? {
      details: t,
      newValue: r
    } : new Promise(((n, a) => {
      e.set({
        value: r
      }, (() => {
        chrome.runtime.lastError && (chrome.runtime.lastError, chrome.runtime.lastError, a(chrome.runtime.lastError)), n({
          details: t,
          newValue: r
        })
      }))
    })) : {
      details: {},
      newValue: void 0
    }))
  }
  #u(e) {
    return new Promise((r => {
      e || r({}), e.get({}, (e => {
        "not_controllable" === e.levelOfControl && reject(new Error("Cannot control this setting")), r(e)
      }))
    }))
  }
  #c(e) {
    return new Promise((r => {
      e || r(), e.clear({}, (() => {
        r()
      }))
    }))
  }
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
  g_passwordElementUniqueIDs = {};
let g_TOTPSecretToURI = {};
const WBSAutoFillFormTypeFoundTOTPURI = 6;
var g_formTypeOfFormBestForPageWideAutoFill = 0,
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
  ExtraClearanceForCompletionListToAccountForShadow = 24;
var g_supportsSubURLs = !1,
  g_scanForOTPURI = !1;
const DoNotDismissCompletionListUponLosingFocus = !1;

function fillControlsByID(e, r) {
  let t = r ? FormMetadataJS.formControlWithUniqueID(r) : null;
  g_dateOfLastAutoFill = (g_lastFilledField = t) ? Date.now() : null, FormMetadataJS.autoFillControlsByID(e, !1, !1, t, !1, [])
}

function confirmPasswordFieldChangeHandler(e) {
  e.target;
  g_passwordControls[ForPageWideFill] && g_passwordControls[ForPageWideFill].value === g_confirmPasswordControls[ForPageWideFill].value && (newPassword = g_confirmPasswordControls[ForPageWideFill].value)
}

function userNameFieldChangeHandler(e) {
  let r = e.target;
  g_currentUserName = r.value, g_passwordControls[ForPageWideFill] || chrome.runtime.sendMessage({
    from: "content",
    subject: "SaveStage1LoginName",
    theLogin: g_currentUserName
  })
}

function passwordFieldChangeHandler(e) {
  let r = e.target;
  g_currentPassword = r.value
}

function fillLoginIntoForm(e, r, t, n, a, i) {
  if (e !== RememberIC.RememberLoginAndPassword) return;
  const o = "completionList" === i,
    l = o ? g_usernameElementUniqueIDs[ForCompletionList] : g_usernameElementUniqueIDs[ForPageWideFill];
  if (l) try {
    fillControlsByID({
      [l]: n
    }, l)
  } catch (e) {
    e.message
  }
  g_lastSenderOfInformationToFill = "completionList" === i ? ForCompletionList : ForPageWideFill;
  const s = o ? g_passwordControls[ForCompletionList] : g_passwordControls[ForPageWideFill],
    c = o ? g_oldPasswordControls[ForCompletionList] : g_oldPasswordControls[ForPageWideFill];
  (s || c) && chrome.runtime.sendMessage({
    from: "content",
    subject: "CmdGetPassword4LoginName",
    tabId: r,
    frameId: t,
    theLogin: n,
    theURL: a
  })
}

function detectPresetUserName(e, r, t) {
  e.FormControls.forEach((function (r, t, n) {
    r.ControlUniqueID !== e.UsernameElementUniqueID || isStringEmpty(r.ControlValue) || (g_currentUserName = r.ControlValue, g_isPresetUserNamePresent = !0, r.ControlUniqueID)
  }))
}

function mydump(e, r) {
  var t = "";
  r || (r = 0);
  for (var n = "", a = 0; a < r + 1; a++) n += "    ";
  if ("object" == typeof e)
    for (var i in e) {
      var o = e[i];
      "object" == typeof o ? (t += n + "'" + i + "' ,", t += mydump(o, r + 1)) : t += n + "'" + i + "'\"" + o + '",'
    } else t = e + "(" + typeof e + ")";
  return t
}

function assignFieldsForMetadataAndPurpose(e, r, t, n) {
  const a = e.AutoFillFormType;
  switch (r === ForPageWideFill && humanReadableFormType(g_formTypeOfFormBestForPageWideAutoFill = a), a) {
    case 0:
    case 1:
    case 2:
      for (const t of e.FormControls)
        if (t.ControlIsActiveElement) {
          if (t.ControlIsLabeledUsernameField) {
            g_usernameControls[r] = FormMetadataJS.formControlWithUniqueID(t.ControlUniqueID), g_usernameElementUniqueIDs[r] = t.ControlUniqueID;
            break
          }
          if (t.ControlIsSecureTextField) {
            g_passwordControls[r] = FormMetadataJS.formControlWithUniqueID(t.ControlUniqueID), g_passwordElementUniqueIDs[r] = t.ControlUniqueID, r === ForPageWideFill && (g_formTypeOfFormBestForPageWideAutoFill = 3);
            break
          }
        }
      break;
    case 3:
    case 4:
    case 5:
      e.UsernameElementUniqueID ? (g_usernameControls[r] = FormMetadataJS.formControlWithUniqueID(e.UsernameElementUniqueID), g_usernameElementUniqueIDs[r] = e.UsernameElementUniqueID, e.UsernameElementUniqueID, detectPresetUserName(e, t, n)) : (g_usernameControls[r] = null, g_usernameElementUniqueIDs[r] = 0), e.PasswordElementUniqueID ? (g_passwordControls[r] = FormMetadataJS.formControlWithUniqueID(e.PasswordElementUniqueID), g_passwordElementUniqueIDs[r] = e.PasswordElementUniqueID, e.PasswordElementUniqueID) : (g_passwordControls[r] = null, g_passwordElementUniqueIDs[r] = 0), e.ConfirmPasswordElementUniqueID ? (g_confirmPasswordControls[r] = FormMetadataJS.formControlWithUniqueID(e.ConfirmPasswordElementUniqueID), e.ConfirmPasswordElementUniqueID) : g_confirmPasswordControls[r] = null, e.OldPasswordElementUniqueID ? (g_oldPasswordControls[r] = FormMetadataJS.formControlWithUniqueID(e.OldPasswordElementUniqueID), e.OldPasswordElementUniqueID) : g_oldPasswordControls[r] = null
  }
}

function urlIsOTPAuthSetupURL(e) {
  return e.pathname.startsWith("//totp") && ("otpauth:" === e.protocol || "apple-otpauth:" === e.protocol) && e.searchParams.has("secret")
}

function processImageElementForOTPAuthQRCode(e) {
  let r = document.createElement("canvas");
  r.width = e.width, r.height = e.height;
  try {
    let t = r.getContext("2d");
    t.drawImage(e, 0, 0);
    let n = e.width,
      a = e.height,
      i = t.getImageData(0, 0, n, a),
      o = jsQR(i.data, n, a, {
        inversionAttempts: "dontInvert"
      });
    if (!o) return;
    o.data;
    const l = new URL(o.data);
    urlIsOTPAuthSetupURL(l) && (l.searchParams.get("secret"), o.data, chrome.runtime.sendMessage({
      from: "content",
      subject: "CmdAddSetUpTOTPContextMenu",
      pageURL: g_theURL,
      totpSetupURL: o.data
    }), g_TOTPSecretToURI.hasOwnProperty(l.searchParams.get("secret")) ? (issuer, account) : g_TOTPSecretToURI[l.searchParams.get("secret")] = o.data)
  } catch (e) { }
  r.remove()
}

function removeOTPAuthSetupContextMenus() {
  chrome.runtime.sendMessage({
    from: "content",
    subject: "CmdRemoveSetUpTOTPContextMenus",
    url: g_theURL
  })
}
const maxQRCodeContainerDimension = 800;

function scanImageElementForOTPAuthQRCode(e) {
  let r = new Image;
  r.crossOrigin = "Anonymous", r.addEventListener("load", (e => {
    r.width && r.height && (r.width > 800 || r.height > 800 || processImageElementForOTPAuthQRCode(r))
  })), r.src = e.src
}

function scanSVGElementForOTPAuthQRCode(e) {
  let {
    width: r,
    height: t
  } = e.getBBox();
  if (!r || !t) return;
  if (r > 800 || t > 800) return;
  let n = e.cloneNode(!0),
    a = new Blob([n.outerHTML], {
      type: "image/svg+xml;charset=utf-8"
    }),
    i = URL.createObjectURL(a),
    o = new Image;
  o.addEventListener("load", (e => {
    processImageElementForOTPAuthQRCode(o)
  })), o.src = i
}

function scanCanvasElementForOTPAuthQRCode(e) {
  let r = new Image;
  r.addEventListener("load", (e => {
    processImageElementForOTPAuthQRCode(r)
  })), r.src = e.toDataURL("image/png")
}

function scanAnchorElementForOTPAuthQRCode(e) {
  let r = new URL(e);
  urlIsOTPAuthSetupURL(r) && chrome.runtime.sendMessage({
    from: "content",
    subject: "CmdAddSetUpTOTPContextMenu",
    pageURL: g_theURL,
    totpSetupURL: r.href
  })
}

function scanElementForOTPAuthQRCode(e) {
  e.matches("img") ? scanImageElementForOTPAuthQRCode(e) : e.matches("svg") ? scanSVGElementForOTPAuthQRCode(e) : e.matches("canvas") ? scanCanvasElementForOTPAuthQRCode(e) : e.matches("a") && scanAnchorElementForOTPAuthQRCode(e)
}

function runFormMetadataHeuristics(e, r) {
  var t = g_formTypeOfFormBestForPageWideAutoFill;
  g_formTypeOfFormBestForPageWideAutoFill = 0;
  let n = FormMetadataJS.formsAndMetadata(1);
  if (n) {
    n[0];
    n[1].forEach(((t, n, a) => {
      t && t.FormIsBestForPageLevelAutoFill && assignFieldsForMetadataAndPurpose(t, ForPageWideFill, e, r)
    }))
  } else humanReadableFormType(g_formTypeOfFormBestForPageWideAutoFill = 0);
  return t !== g_formTypeOfFormBestForPageWideAutoFill ? (humanReadableFormType(t), humanReadableFormType(g_formTypeOfFormBestForPageWideAutoFill), humanReadableFormType(t), pageNavigationHandler(t)) : (humanReadableFormType(t), humanReadableFormType(g_formTypeOfFormBestForPageWideAutoFill)), chrome.runtime.sendMessage({
    from: "content",
    subject: "CmdSetIconNTitle",
    hostPageType: g_formTypeOfFormBestForPageWideAutoFill
  }), n
}

function pageNavigationHandler(e) {
  switch (humanReadableFormType(e), e) {
    case 0:
    case 1:
    case 2:
    default:
      break;
    case 3:
      if (!g_passwordControls[ForPageWideFill]) break;
      if (g_currentUserName !== g_selectedUserName || g_currentPassword !== g_selectedPassword || g_supportsSubURLs && g_theURL !== g_selectedURL) try {
        chrome.runtime.sendMessage({
          from: "content",
          subject: "CmdSetPassword4LoginName_URL",
          theLogin: "",
          thePassword: "",
          theURL: "",
          theNLogin: g_currentUserName,
          theNPassword: g_currentPassword,
          theNURL: g_theURL
        }, (e => {
          g_selectedUserName = g_currentUserName, g_selectedPassword = g_currentPassword, g_selectedURL = g_theURL
        }))
      } catch (e) {
        e.message
      }
      break;
    case 4:
    case 5:
      if (g_passwordControls[ForPageWideFill] && (!g_confirmPasswordControls[ForPageWideFill] || g_passwordControls[ForPageWideFill].value === g_confirmPasswordControls[ForPageWideFill].value) && (g_currentUserName !== g_selectedUserName || g_currentPassword !== g_selectedPassword)) try {
        chrome.runtime.sendMessage({
          from: "content",
          subject: "CmdNewAccount4URL",
          theLogin: "",
          thePassword: "",
          theURL: "",
          theNLogin: g_currentUserName,
          theNPassword: g_currentPassword,
          theNURL: g_theURL
        }, (e => {
          g_selectedUserName = g_currentUserName, g_selectedPassword = g_currentPassword
        }))
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

function fillElementWithOneTimeCode(e, r) {
  hideCompletionListIfNecessary(), e.focus(), FormMetadataJS.autoFillOneTimeCodeFieldsWithValue(r.code, !1)
}

function hideCompletionListIfNecessary() {
  g_completionListContainer && (g_completionListContainer.style.setProperty("visibility", "hidden", "important"), g_completionListContainer.style.setProperty("opacity", "0", "important"), g_completionListContainer.style.setProperty("left", "-999999px", "important")), g_completionListAnchoringField = null, stopMonitoringForFocusedFieldMovement()
}

function destroyCompletionListIfNecessary() {
  if (hideCompletionListIfNecessary(), g_completionListContainer) {
    let e = g_completionListContainer,
      r = g_completionListIFrame;
    setTimeout((function () {
      e.remove(), e = null, r.remove(), r = null
    }), 100), g_completionListContainer = null
  }
  g_completionListIFrame && (g_completionListIFrame = null), g_completionListAnchoringField = null, g_completionListAnchoringFieldPriorToBlur = null, stopMonitoringForFocusedFieldMovement()
}

function stopMonitoringForFocusedFieldMovement() {
  clearInterval(g_completionListAnchoringFieldMovementSetIntervalID), g_completionListAnchoringFieldMovementSetIntervalID = null
}

function showCompletionList(e, r) {
  destroyCompletionListIfNecessary(), g_passwordControls[ForCompletionList] = null, g_passwordElementUniqueIDs[ForCompletionList] = 0, g_usernameControls[ForCompletionList] = null, g_usernameElementUniqueIDs[ForCompletionList] = 0;
  let t = e.getBoundingClientRect(),
    n = parseInt(getComputedStyle(e).borderBottomWidth);
  g_completionListIFrame = document.createElement("iframe");
  e.value, e.type;
  let a = "";
  assignFieldsForMetadataAndPurpose(r, ForCompletionList, null, null);
  const i = g_usernameControls[ForCompletionList];
  i && (a = i.value), g_completionListIFrame.setAttribute("src", chrome.runtime.getURL(`completion_list.html?username=${a}`)), g_completionListIFrame.style.setProperty("width", "9001px", "important"), g_completionListIFrame.style.setProperty("height", "100%", "important"), g_completionListIFrame.style.setProperty("display", "block", "important"), g_completionListIFrame.frameBorder = 0, (g_completionListContainer = document.createElement("div")).id = "apple-password-autofill-list", g_completionListContainer.style.setProperty("z-index", "2147483647", "important"), g_completionListContainer.style.setProperty("padding", "0px", "important"), g_completionListContainer.style.setProperty("margin", "0px", "important"), g_completionListContainer.style.setProperty("border-radius", "8px", "important"), g_completionListContainer.style.setProperty("position", "fixed", "important"), g_completionListContainer.style.setProperty("color-scheme", "normal", "important"), g_completionListContainer.style.setProperty("box-shadow", "0 2px 4px 0 rgba(0, 0, 0, 0.15), 0 8px 15px 6px rgba(0, 0, 0, 0.18)", "important"), g_completionListContainer.style.setProperty("border", `1px solid ${completionListContainerBorderColor()}`, "important"), g_completionListContainer.style.setProperty("overflow", "hidden", "important"), CSS.supports("backdrop-filter", "none") ? (g_completionListContainer.style.setProperty("backdrop-filter", "blur(20px)", "important"), g_completionListContainer.style.setProperty("background-color", completionListBackgroundColor(), "important")) : g_completionListContainer.style.setProperty("background-color", completionListBackgroundColorWithoutBackdropBlur(), "important");
  let o = Math.round(t.y + t.height) + n + "px",
    l = Math.round(t.x) + "px";
  g_completionListContainer.style.setProperty("top", o, "important"), g_completionListContainer.style.setProperty("left", l, "important"), g_completionListContainer.attachShadow({
    mode: "open"
  }).appendChild(g_completionListIFrame), g_completionListContainer.style.setProperty("opacity", "0", "important"), g_completionListContainer.style.setProperty("visibility", "hidden", "important"), document.body.appendChild(g_completionListContainer), g_completionListAnchoringField = e, g_dateOfCompletionListAnchoringFieldFocusOrMovementOfThatField = new Date, g_completionListAnchoringFieldMovementSetIntervalID = setInterval((function () {
    Date.now() - g_dateOfCompletionListAnchoringFieldFocusOrMovementOfThatField >= 5e3 && stopMonitoringForFocusedFieldMovement();
    let r = e.getBoundingClientRect(),
      t = Math.round(r.y + r.height) + n + "px",
      a = Math.round(r.x) + "px";
    t === o && a === l || (g_dateOfCompletionListAnchoringFieldFocusOrMovementOfThatField = new Date, g_completionListContainer.style.setProperty("top", t, "important"), g_completionListContainer.style.setProperty("left", a, "important"), o = t, l = a)
  }), 100)
}

function shouldOfferCompletionListForField(e, r, t) {
  return !(g_lastFilledField === e && Date.now() - g_dateOfLastAutoFill < 100) && (("password" !== e.type || !e.value.length) && (!!r.ControlLooksLikePasswordCredentialField || (!!r.ControlClaimsToBeUsernameViaAutocompleteAttribute || (r.ControlLooksLikeOneTimeCodeField ? !e.value.length : !(!t.UsernameElementUniqueID || t.UsernameElementUniqueID !== r.ControlUniqueID) || (!(!t.PasswordElementUniqueID || t.PasswordElementUniqueID !== r.ControlUniqueID) || (!!r.ControlIsLabeledUsernameField || (e === g_usernameControls[ForCompletionList] || e === g_passwordControls[ForCompletionList])))))))
}

function focusInHandler(e) {
  JSON.stringify(e), chrome.runtime.sendMessage({
    from: "content",
    subject: "CmdDidFocusIntoPage"
  }), elementWasFocused(e.target)
}

function elementWasFocused(e) {
  if (!e || !FormMetadataJS._isAutoFillableTextField(e)) return void (g_focusedControl = null);
  g_focusedControl = e, destroyCompletionListIfNecessary();
  let [r, t] = FormMetadataJS.textFieldOrSelectElementMetadata(e, 0);
  shouldOfferCompletionListForField(e, r, t) && showCompletionList(e, t)
}

function clearOneTimeCodeState() {
  g_completionListAnchoringFieldBeforeOneTimeCodeRefresh = null, g_oneTimeCodeToFillAfterUpdate = null
}

function documentLoadHandler() {
  window,
    window.top,
    window.location.href;
  try {
    chrome.runtime.sendMessage({
      from: "content",
      subject: "CmdClearCache"
    })
  } catch (e) {
    e.message
  }
  const e = document.activeElement,
    r = runFormMetadataHeuristics();
  if (e && FormMetadataJS._isAutoFillableTextField(e)) {
    if (e === g_completionListAnchoringField) return;
    elementWasFocused(e)
  } else if (r)
    for (const e of r[1]) e && e.FormIsBestForStreamlinedLogin && FormMetadataJS.focusFormForStreamlinedLogin(e.FormID)
}
chrome.runtime.onMessage.addListener(((e, r, t) => {
  switch (e.from, e.tabId, e.frameId, e.subject) {
    case "password":
      switch (humanReadableFormType(g_formTypeOfFormBestForPageWideAutoFill), g_formTypeOfFormBestForPageWideAutoFill) {
        case 0:
        case 1:
        case 2:
        case 4:
          if (!g_passwordControls[ForPageWideFill]) break;
        case 3:
          g_selectedUserName = e.theLoginName, g_selectedPassword = e.thePassword, g_selectedURL = e.theURL, e.tabId, e.frameId;
          try {
            const r = g_passwordElementUniqueIDs[g_lastSenderOfInformationToFill];
            e.tabId, e.frameId, fillControlsByID({
              [r]: e.thePassword
            }, r)
          } catch (r) {
            e.tabId, e.frameId, r.message
          }
          break;
        case 5:
          g_selectedUserName = e.theLoginName, g_selectedPassword = e.thePassword, g_selectedURL = e.theURL, e.tabId, e.frameId;
          try {
            const r = g_oldPasswordControls[g_lastSenderOfInformationToFill];
            e.tabId, e.frameId, FormMetadataJS._autoFillControlWithValueAndOptions(r, e.thePassword, ShouldFocusAndBlur.Yes, !1)
          } catch (r) {
            e.tabId, e.frameId, r.message
          }
      }
      break;
    case "runFormMetadataHeuristics":
      e.tabId, e.frameId, e.tabId, e.frameId, e.capabilities.scanForOTPURI && (g_scanForOTPURI = e.capabilities.scanForOTPURI), e.tabId, e.frameId, runFormMetadataHeuristics(e.tabId, e.frameId);
      break;
    case "historyStateDidUpdateInTab":
      e.tabId, e.frameId, e.tabId, e.frameId, e.tabId, e.frameId, runFormMetadataHeuristics(e.tabId, e.frameId), e.tabId, e.frameId, e.tabId, e.frameId, humanReadableFormType(g_formTypeOfFormBestForPageWideAutoFill), pageNavigationHandler(g_formTypeOfFormBestForPageWideAutoFill);
      break;
    case "RememberICSelection":
      switch (e.theRememberICSelection, e.theRememberICSelection) {
        case RememberIC.NoValueSet:
        case RememberIC.DoNotRemember:
          break;
        case RememberIC.UnknownPage:
        case RememberIC.RememberLoginAndPassword:
          g_usernameControls[ForPageWideFill] && (g_usernameControls[ForPageWideFill].addEventListener("change", userNameFieldChangeHandler), e.tabId, e.frameId), g_passwordControls[ForPageWideFill] && (g_passwordControls[ForPageWideFill].addEventListener("change", passwordFieldChangeHandler), e.tabId, e.frameId), g_confirmPasswordControls[ForPageWideFill] && (g_confirmPasswordControls[ForPageWideFill].addEventListener("change", confirmPasswordFieldChangeHandler), e.tabId, e.frameId)
      }
      e.capabilities.supportsSubURLs && (g_supportsSubURLs = e.capabilities.supportsSubURLs), e.tabId, e.frameId;
      break;
    case "fillLoginIntoForm":
      g_selectedUserName = e.theLogin, g_selectedURL = e.theURL, e.tabId, e.frameId, e.tabId, e.frameId, fillLoginIntoForm(e.theRememberICSelection, e.tabId, e.frameId, e.theLogin, e.theURL, e.from), hideCompletionListIfNecessary();
      break;
    case "resizeCompletionList": {
      if (e.width, e.height, 0 === e.width || 0 === e.height) return void hideCompletionListIfNecessary();
      const r = g_completionListAnchoringField.getBoundingClientRect().bottom,
        t = Math.floor(window.innerHeight - r - 24),
        n = Math.min(e.height, t) + "px",
        a = e.width + "px",
        i = CSS.supports("backdrop-filter", "none") ? e.width + 1 + "px" : a;
      e.width, e.height, g_completionListContainer.style.setProperty("height", n, "important"), g_completionListIFrame.style.setProperty("height", n, "important"), g_completionListContainer.style.setProperty("width", i, "important"), g_completionListIFrame.style.setProperty("width", a, "important"), g_completionListContainer.style.setProperty("opacity", "1", "important"), g_completionListContainer.style.setProperty("visibility", "visible", "important");
      break
    }
    case "dismissCompletionList":
      hideCompletionListIfNecessary();
      break;
    case "getContextAndMetadataForActiveTextField": {
      if (!g_focusedControl) return void e.subject;
      let [r, n] = FormMetadataJS.textFieldOrSelectElementMetadata(g_focusedControl, 0);
      t({
        textFieldMetadata: r,
        formMetadata: n,
        presetUserName: g_currentUserName,
        hostname: document.location.hostname,
        url: document.location.href
      });
      break
    }
    case "fillOneTimeCodeIntoForm":
      let r = e.oneTimeCode;
      if ("totp" === r.source) g_completionListAnchoringFieldBeforeOneTimeCodeRefresh = g_completionListAnchoringField || g_completionListAnchoringFieldPriorToBlur, g_oneTimeCodeToFillAfterUpdate = r;
      chrome.runtime.sendMessage({
        from: "content",
        subject: "fillOneTimeCodeIntoForm",
        tab: e.tab,
        frame: e.frame,
        oneTimeCode: r
      });
      break;
    case "fillCurrentTOTPCodeIntoForm":
      const n = e.oneTimeCodes;
      if (!n || !g_oneTimeCodeToFillAfterUpdate) {
        clearOneTimeCodeState();
        break
      }
      const a = n.find((e => "totp" === e.source && e.username === g_oneTimeCodeToFillAfterUpdate.username && e.domain === g_oneTimeCodeToFillAfterUpdate.domain));
      if (!a) {
        clearOneTimeCodeState();
        break
      }
      const i = g_completionListAnchoringField || g_completionListAnchoringFieldBeforeOneTimeCodeRefresh;
      if (!i) {
        clearOneTimeCodeState();
        break
      }
      fillElementWithOneTimeCode(i, a), clearOneTimeCodeState();
      break;
    case "getTextFieldAndFormMetadataOfActiveTextField":
      let [o, l] = FormMetadataJS.textFieldOrSelectElementMetadata(g_focusedControl, 0);
      t({
        textFieldMetadata: o,
        formMetadata: l
      });
      break;
    case "getPageType":
      e.tabId, e.frameId, e.tabId, e.frameId, e.tabId, e.frameId, runFormMetadataHeuristics(e.tabId, e.frameId), 0 !== Object.keys(g_TOTPSecretToURI).length && (g_formTypeOfFormBestForPageWideAutoFill = WBSAutoFillFormTypeFoundTOTPURI, e.tabId, e.frameId), t(g_formTypeOfFormBestForPageWideAutoFill);
      break;
    case "getPresetUserNameAndURL":
    case "getPresetUserName":
      t({
        isPresetUserNamePresent: g_isPresetUserNamePresent,
        presetUserName: g_currentUserName,
        url: window.location.href
      });
      break;
    case "getTOTPSetupInfo":
      t(g_TOTPSecretToURI)
  }
  return !0
})), window.addEventListener("pushstate", (function (e) {
  humanReadableFormType(g_formTypeOfFormBestForPageWideAutoFill), pageNavigationHandler(g_formTypeOfFormBestForPageWideAutoFill)
})), window.addEventListener("popstate", (function (e) {
  humanReadableFormType(g_formTypeOfFormBestForPageWideAutoFill), pageNavigationHandler(g_formTypeOfFormBestForPageWideAutoFill)
})), document.addEventListener("focusin", focusInHandler), document.addEventListener("focusout", (function (e) {
  JSON.stringify(e);
  let r = e.target;
  g_focusedControl = null, setTimeout((function () {
    r === g_completionListAnchoringField && hideCompletionListIfNecessary()
  }), 100)
})), window.addEventListener("blur", (function (e) {
  g_completionListAnchoringField && (g_completionListAnchoringFieldPriorToBlur = g_completionListAnchoringField), setTimeout((() => {
    hideCompletionListIfNecessary()
  }), 100)
})), document.addEventListener("keydown", (function (e) {
  let r = e.target;
  if (!isCompletionListVisible()) {
    let [t, n] = FormMetadataJS.textFieldOrSelectElementMetadata(r, 0);
    return void ("ArrowDown" === e.key && shouldOfferCompletionListForField(r, t, n) && showCompletionList(e.target, n))
  }
  let t = {};
  switch (e.key) {
    case "Escape":
      return hideCompletionListIfNecessary(), e.preventDefault(), !1;
    case "ArrowDown":
    case "ArrowUp":
    case "Enter":
      t.key = e.key, e.preventDefault()
  }
  t.key && chrome.runtime.sendMessage({
    from: "content",
    subject: "keydown",
    event: t
  })
})), document.addEventListener("input", (function (e) {
  let r = e.target;
  if (!FormMetadataJS._isAutoFillableTextField(r)) return;
  let [t, n] = FormMetadataJS.textFieldOrSelectElementMetadata(r, 3), a = r.value;
  t.ControlLooksLikePasswordCredentialField || t.ControlLooksLikeOneTimeCodeField ? a.length && hideCompletionListIfNecessary() : isCompletionListVisible() || !shouldOfferCompletionListForField(r, t, n) ? r === g_completionListAnchoringField && isCompletionListVisible() && chrome.runtime.sendMessage({
    from: "content",
    subject: "typedUserNameChanged",
    username: a
  }) : showCompletionList(r, n)
})), window.addEventListener("scroll", (function (e) {
  e.target.contains(g_completionListAnchoringField) && hideCompletionListIfNecessary()
}), {
  passive: !0,
  capture: !0
}), window.addEventListener("resize", (function (e) {
  hideCompletionListIfNecessary()
})), window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (function (e) {
  e.matches, chrome.runtime.sendMessage({
    from: "content",
    subject: "ThemeChanged"
  }), g_completionListContainer && (g_completionListContainer.style.setProperty("border", `1px solid ${completionListContainerBorderColor()}`, "important"), g_completionListContainer.style.setProperty("background-color", CSS.supports("backdrop-filter", "none") ? completionListBackgroundColor() : completionListBackgroundColorWithoutBackdropBlur(), "important"))
})), window.addEventListener("load", documentLoadHandler), "complete" === document.readyState && documentLoadHandler(), window.addEventListener("unload", (function () {
  humanReadableFormType(g_formTypeOfFormBestForPageWideAutoFill), pageNavigationHandler(g_formTypeOfFormBestForPageWideAutoFill), destroyCompletionListIfNecessary()
})), window.addEventListener("mouseover", (function (e) {
  if (!g_scanForOTPURI) return;
  removeOTPAuthSetupContextMenus();
  let r = e.target.closest("img, svg, canvas, a");
  r && scanElementForOTPAuthQRCode(r)
}));
const url = new URL(document.URL);
g_theURL = url.hostname;