export class AirLanguage {
    days: Array<string>;
    daysMin: Array<string>;
    months: Array<string>;

    constructor (days: Array<string>, daysMin: Array<string>, months: Array<string>) {
        this.days = days;
        this.daysMin = daysMin;
        this.months = months;
    }
}

export const LANGUAGES: Map<string, AirLanguage> = new Map([
    ['cs', new AirLanguage(
        [ 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle' ],
        [ 'Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne' ],
        [ 'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec' ]
    )] as [string, AirLanguage],

    ['da', new AirLanguage(
        [ 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag' ],
        [ 'Ma', 'Ti', 'On', 'To', 'Fr', 'Lø', 'Sø' ],
        [ 'Januar','Februar','Marts','April','Maj','Juni', 'Juli','August','September','Oktober','November','December' ]
    )] as [string, AirLanguage],

    ['de', new AirLanguage(
        [ 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag' ],
        [ 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So' ],
        [ 'Januar','Februar','März','April','Mai','Juni', 'Juli','August','September','Oktober','November','Dezember' ]
    )] as [string, AirLanguage],

    ['en', new AirLanguage(
        [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ],
        [ 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su' ],
        [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
    )] as [string, AirLanguage],

    ['es', new AirLanguage(
        [ 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo' ],
        [ 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
        [ 'Enero','Febrero','Marzo','Abril','Mayo','Junio', 'Julio','Augosto','Septiembre','Octubre','Noviembre','Diciembre' ]
    )] as [string, AirLanguage],

    ['fi', new AirLanguage(
        [ 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai', 'Sunnuntai' ],
        [ 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su' ],
        [ 'Tammikuu','Helmikuu','Maaliskuu','Huhtikuu','Toukokuu','Kesäkuu', 'Heinäkuu','Elokuu','Syyskuu','Lokakuu','Marraskuu','Joulukuu' ]
    )] as [string, AirLanguage],

    ['fr', new AirLanguage(
        [ 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche' ],
        [ 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di' ],
        [ 'Janvier','Février','Mars','Avril','Mai','Juin', 'Juillet','Août','Septembre','Octobre','Novembre','Decembre' ]
    )] as [string, AirLanguage],

    ['hu', new AirLanguage(
        [ 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap' ],
        [ 'H', 'K', 'Sz', 'Cs', 'P', 'Sz', 'V' ],
        [ 'Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December' ]
    )] as [string, AirLanguage],

    ['jp', new AirLanguage(
        [ '月曜日',	'火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日' ],
        [ '月', '火', '水', '木', '金', '土', '日' ],
        [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ]
    )] as [string, AirLanguage],

    ['nl', new AirLanguage(
        [ 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag' ],
        [ 'ma', 'di', 'wo', 'do', 'vr', 'za', 'zo' ],
        [ 'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December' ]
    )] as [string, AirLanguage],

    ['pl', new AirLanguage(
        [ 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela' ],
        [ 'Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'So', 'Nd' ],
        [ 'Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec', 'Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień' ]
    )] as [string, AirLanguage],

    ['pt', new AirLanguage(
        [ 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo' ],
        [ 'Se', 'Te', 'Qa', 'Qi', 'Sx', 'Sa', 'Do' ],
        [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ]
    )] as [string, AirLanguage],

    ['ro', new AirLanguage(
        [ 'Luni', 'Marţi', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică' ],
        [ 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sa', 'Du' ],
        [ 'Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie' ]
    )] as [string, AirLanguage],

    ['sk', new AirLanguage(
        [ 'Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota', 'Nedeľa'],
        [ 'Po', 'Ut', 'St', 'Št', 'Pi', 'So', 'Ne' ],
        [ 'Január','Február','Marec','Apríl','Máj','Jún', 'Júl','August','September','Október','November','December' ]
    )] as [string, AirLanguage],

    ['zh', new AirLanguage(
        [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ],
        [ '一', '二', '三', '四', '五', '六', '日' ],
        [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ]
    )] as [string, AirLanguage],

]);
