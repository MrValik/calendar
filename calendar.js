
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let date = new Date();
let realYear = date.getFullYear();
let realMonth = date.getMonth();
let realDay = date.getDate();
let year = date.getFullYear();
let month = date.getMonth();
let table = document.querySelector('table');
let matrix = [], arr = [];
let showYear = table.tHead.children[0].children[0].querySelectorAll('h3')[0];
let showMonth = table.tHead.children[0].children[0].querySelectorAll('h3')[1];
let slc = document.querySelector('select');
let opt = slc.options;
let btnGroup = document.querySelector('.btn-group');

let weekDayName = {
    'en':[
        'Mon',
        'Tue',
        'Wed',
        'Thr',
        'Fri',
        'Sat',
        'Sun'
    ],
    'ru':[
        'ПН',
        "ВТ",
        "СР",
        "ЧТ",
        "ПТ",
        "СБ",
        "ВС"
    ]
}

let buttonName = {
    'en':[
        'prev',
        'next'
    ],
    'ru':[
        "пред",
        "след"
    ]
}

let arrayMonth = {
    'en':[
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'Octomber',
        'November',
        'December'
    ],
    'ru':[
        'Январь',
        "Ферваль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь"
    ]
}
    

slc.addEventListener('change',function(){
    let weekDays = table.tHead.children[1].children;
    for(let i = 0; i < weekDays.length; i++){
        weekDays[i].innerHTML = weekDayName[slc.value][i];
    }
    showMonth.innerHTML = arrayMonth[slc.value][month];
    [...btnGroup.children].forEach((button,index)=>{
        button.innerHTML = buttonName[slc.value][index]
    })
});


function showCalendar(y,m){
    for(let i = 1; i <= 31; i++){
        if(new Date(y,m,i).getMonth() == m){
            let weekDay =  new Date(y,m,i).getDay();
            if(weekDay == 0){
                weekDay += 6;
                arr[weekDay] = i;
                matrix.push(arr);
                arr = [];
            }else{
                weekDay--;
                arr[weekDay] = i;
            }
        }
    }
    if(arr.length){
        matrix.push(arr);
        arr = [];
    }
    
    let tbody = document.createElement('tbody');
    let numTr = matrix.length;
    let td,tr;

    for(let j = 0; j < numTr; j++){
        tr = document.createElement("tr");
        tbody.append(tr);
    }
    
    let trArray = tbody.querySelectorAll('tr');

    for(let w = 0; w < 7; w++){
        trArray.forEach(item=>{
            td = document.createElement("td");
            item.append(td);
        })
    };

    
    for(let week = 0; week < matrix.length; week++){
        for(let day = 0; day < 7; day++){
            if(matrix[week][day]){
                trArray[week].children[day].innerHTML = matrix[week][day];
            }else{
                trArray[week].children[day].innerHTML = '';
            }
        }
    }


    if(realYear == year && realMonth == month){
        let td = tbody.querySelectorAll('td');
        [...td].find(ch => ch.innerHTML == realDay).className = 'bg-dark text-light';
        
    }

    showYear.innerHTML = year;
    showMonth.innerHTML = arrayMonth[slc.value][month];
    matrix = [];
    table.append(tbody);
}

showCalendar(year,month);




prev.onclick = function(){
    let tbody = document.querySelector('tbody');
    tbody.remove();
    if(month == 0){
        year--;
        month = 11;
        showCalendar(year,month);
    }else{
        month--;
        showCalendar(year,month);
    }
}



next.onclick = function(){
    let tbody = document.querySelector('tbody');
    tbody.remove();
    if(month == 11){
        year++;
        month = 0;
        showCalendar(year,month);
    }else{
        month++;
        showCalendar(year,month);
    }
}




