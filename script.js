// tarayıcıda var olan veya boş todo dizisinin döndürülmesi
var todos = JSON.parse(localStorage.getItem('todolist')) ? JSON.parse(localStorage.getItem('todolist')) : [];
// var items = JSON.parse(localStorage.getItem('items')) ? JSON.parse(localStorage.getItem('items')) : [];

// itemlerin içine yerleşeceği ul listesi
var list = document.querySelector('#myList');

// sayfa tekrar yüklenirken verilerin getirilmesi
document.addEventListener("DOMContentLoaded", getTodos)

function getTodos() {
    // dizinin içindeki tüm elemanlara ulaşabilmek için foreach kullandım 
    todos.forEach(todo => {
        var li = document.createElement('li');
        var item = document.createTextNode(todo);
        li.className = 'list-group-item';
        li.id = todo;
        li.appendChild(item);
        list.appendChild(li);

        var span = document.createElement('span');
        var x = document.createTextNode('\u00D7');
        span.className = 'close';
        span.appendChild(x);
        li.appendChild(span);

        span.onclick = function () {
            var li = this.parentElement;
            li.remove();
            var index = todos.indexOf(todo);
            todos.splice(index, 1);
            localStorage.setItem('todolist', JSON.stringify(todos));
            li.classList.remove('checked');
        }
    })
}

document.querySelector('#btnCreate').onclick = function () {
    // yeni item oluşturulan kısmın çekilmesi
    var item = document.querySelector('#txtItem').value;
    todos.push(item);

    localStorage.setItem('todolist', JSON.stringify(todos));

    // alan boşsa uyarı veriyor ekleme yapılmıyor
    if (item === '') {
        alert('Empty value');
        return;
    }

    CreateItem(item);
};

function CreateItem(item) {
    // her item için yeni bir li nesnesi oluşturulması
    var li = document.createElement('li');
    var todo = document.createTextNode(item);
    li.className = 'list-group-item';
    li.appendChild(todo);

    // html içindeki ul içine li nesnelerinin yerleştirilmesi
    list.appendChild(li);

    // her item silmek için x eklendi
    var span = document.createElement('span');
    var x = document.createTextNode('\u00D7');
    span.className = 'close';
    span.appendChild(x);
    li.appendChild(span);

    // x tıklandığında elementin display özelliği none oluyor ve kayboluyor
    span.onclick = function () {
        var li = this.parentElement;
        li.remove();
        var index = todos.indexOf(item);
        todos.splice(index, 1);
        localStorage.setItem('todolist', JSON.stringify(todos));
        li.classList.remove('checked');
    }
}

list.addEventListener('click', function (item) {
    if (item.target.tagName == 'LI') {
        item.target.classList.toggle('checked');
        ToggleDeleteButton();
    }
});

document.querySelector('#deleteAll').onclick = function () {
    var elements = document.querySelectorAll('.list-group-item.checked');

    elements.forEach(function (item) {
        item.style.display = 'none';
        var index = todos.indexOf(item);
        todos.splice(index, 1);
        localStorage.setItem('todolist', JSON.stringify(todos));
    })
};

function ToggleDeleteButton() {
    // checked işaretli itemlerin htmlden çekilmesi
    var checkList = document.querySelectorAll('.list-group-item.checked');

    // eğer birden fazla item seçildiyse delete all butonu aktif oluyor
    if (checkList.length > 1) {
        document.querySelector('#deleteAll').classList.remove('d-none');
    }
    else {
        document.querySelector('#deleteAll').classList.add('d-none');
    }
}