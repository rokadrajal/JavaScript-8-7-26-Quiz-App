var Questions = [
    {
        question: "1.What is JavaScript?",
        options: [
            "Programming Language",
            "Database",
            "Browser",
            "Operating System"
        ],
        answer: "Programming Language"
    },
    {
        question: "2.Which keyword is used to declare a variable in JavaScript?",
        options: [
            "var",
            "int",
            "string",
            "define"
        ],
        answer: "var"
    },
    {
        question: "3.Which company developed JavaScript?",
        options: [
            "Microsoft",
            "Netscape",
            "Google",
            "Apple"
        ],
        answer: "Netscape"
    },
    {
        question: "4.Which symbol is used for single-line comments?",
        options: [
            "//",
            "/* */",
            "#",
            "<!-- -->"
        ],
        answer: "//"
    },
    {
        question: "5.Which function is used to display a message box?",
        options: [
            "alert()",
            "print()",
            "console()",
            "display()"
        ],
        answer: "alert()"
    },
    {
        question: "6.Which method is used to print data in the browser console?",
        options: [
            "console.log()",
            "document.write()",
            "alert()",
            "print()"
        ],
        answer: "console.log()"
    },
    {
        question: "7.Which keyword is used to define a constant?",
        options: [
            "const",
            "var",
            "let",
            "constant"
        ],
        answer: "const"
    },
    {
        question: "8.Which operator is used for strict equality?",
        options: [
            "===",
            "==",
            "=",
            "!="
        ],
        answer: "==="
    },
    {
        question: "9.Which method is used to get an element by its ID?",
        options: [
            "getElementById()",
            "querySelectorAll()",
            "getElementsByClassName()",
            "getTagName()"
        ],
        answer: "getElementById()"
    },
    {
        question: "10.Which loop executes at least once?",
        options: [
            "do...while",
            "while",
            "for",
            "for...in"
        ],
        answer: "do...while"
    }
];


let index = 0;
var id;
var second;
var score = 0;
var skipQuations = [];
var tempindex = 0;
var flag = false;
var correct = 0;
var attempt = 0;
var wrong = 0;

document.querySelector('.temp').onclick = function () {
    document.querySelector('.temp').style.display = "none";
    document.querySelector('.wrapper').classList.remove('none');
    Quiz(index);
}

function Timer(t1, t2) {
    setTimeout(() => {
        document.querySelectorAll('.timer span')[0].innerHTML = "00";
        second = document.querySelectorAll('.timer span')[1].innerText = "59";
        
    }, t1);
    
    id = setInterval(() => {
        if (second == 0) {
            clearInterval(id);
            if (Questions.length - 1 == index) {
                if (skipQuations.length != 0 && tempindex != skipQuations.length) {
                    index = skipQuations[tempindex];
                    Quiz(index);
                    tempindex++;
                } else {
                    result();
                }
            } else if (Questions.length - 1 > index && tempindex==0) {
                index++;
            }else if(tempindex != skipQuations.length){
                index = skipQuations[tempindex];
                Quiz(index);
                tempindex++;
            }else{
                result();
            }
            Quiz(index);
        }
        document.querySelectorAll('.timer span')[1].innerText = `${second--}`;
        
    }, t2);
}


function Quiz(index) {
    document.querySelectorAll('.timer span')[0].innerHTML = "01";
    document.querySelectorAll('.timer span')[1].innerText = "00";

    if (index >= Questions.length) {
        document.querySelector('.submit').classList.add('none');
        return;
    }
    else {
        document.querySelector('.submit').classList.remove('none');
    }

    if (index == 0) {
        document.querySelector('.pre').classList.add("previous");
        document.querySelector('.pre').disabled = true;
        Timer(1000, 1000);
    }
    else if (index == Questions.length - 1) {
        document.querySelector('.next').classList.add("previous");
        document.querySelector('.next').disabled = true;
        Timer(1000, 1000);
    }
    else {
        document.querySelector('.pre').classList.remove("previous");
        document.querySelector('.pre').disabled = false;
        document.querySelector('.next').classList.remove("previous");
        document.querySelector('.next').disabled = false;
        Timer(0, 1000);
    }


    document.querySelectorAll('main')[1].innerHTML = `
    <section>
        <h2>${Questions[index].question}</h2>
        <article>
            <aside><input type="radio" form="myform" value="${Questions[index].options[0]}" id="id1" name="opt"><label for="id1">${Questions[index].options[0]}</label></aside>
            <aside><input type="radio" form="myform" value="${Questions[index].options[1]}" id="id2" name="opt"><label for="id2">${Questions[index].options[1]}</label></aside>
            <aside><input type="radio" form="myform" value="${Questions[index].options[2]}" id="id3" name="opt"><label for="id3">${Questions[index].options[2]}</label></aside>
            <aside><input type="radio" form="myform" value="${Questions[index].options[3]}" id="id4" name="opt"><label for="id4">${Questions[index].options[3]}</label></aside>
        </article>
    </section>
    `
}


document.querySelector('.next').onclick = function () {
    clearInterval(id);
    skipQuations.push(index);
    console.log(skipQuations);
    Quiz(++index);
}

document.querySelector('.pre').onclick = function () {
    clearInterval(id);
    Quiz(--index);
}

function result() {
    document.querySelector('.wrapper').classList.add('none');
    document.querySelector('footer').classList.remove('hide');
    document.querySelector('.TotalQuations').innerHTML = `Total  Questions : ${Questions.length}`;
    document.querySelector('.Attempt').innerHTML = `Attempted : ${attempt}`;
    document.querySelector('.Right').innerHTML = `Correct : ${correct}`;
    document.querySelector('.wrong').innerHTML = `Wrong : ${wrong}`;
    document.querySelector('.score').innerHTML = `Score : ${score} / ${Questions.length}`;
    document.querySelector('.percentage').innerHTML = `Percentage : ${(score / Questions.length) * 100} %`;

    if ((score / Questions.length) * 100 >= 40) {
        document.querySelector('.card .Result').innerHTML = `Result : PASS`;
    }
    else {
        document.querySelector('.card .Result').innerHTML = 'Result : FAIL';
    }
}

document.querySelector('form').onsubmit = function (event) {
    event.preventDefault();
    clearInterval(id);
    attempt++;
    for (let i = 0; i < Questions[index].options.length; i++) {
        if (event.target[i].checked) {

            if (event.target[i].value == Questions[index].answer) {
                score++;
                correct++;
            }
            else {
                wrong++;
            }
        }
    }


    if (index == Questions.length - 1) {
        document.querySelector('.pre').style.visibility = "hidden";
        document.querySelector('.next').style.visibility = "hidden";
        flag = true;

        if (skipQuations.length - 1 > tempindex) {
            index = skipQuations[tempindex];
        }
        else {
            result();
            return;
        }
        Quiz(index);
        return;
    }

    if (flag) {
        if (skipQuations.length - 1 > tempindex) {
            tempindex++;
        }
        else {
            result();
            return;
        }
        index = skipQuations[tempindex];
        Quiz(index);
        return;
    }

    Quiz(++index);
}






