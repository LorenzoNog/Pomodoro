let tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const botonAgregar = document.querySelector("#bAdd");
const itTask = document.querySelector('#itTask');
const form = document.querySelector('#form');

renderTime();
renderTask();

form.addEventListener('submit',(e)=>{
    e.preventDefault()

    if(itTask.value != ""){

        crearTarea(itTask.value);
        itTask.value = '';
        renderTask()
    }
})

function crearTarea(value){
    const newTask = {
        id : (Math.random() * 100).toString(36).slice(3),
        title : value,
        completed : false
    };
    tasks.unshift(newTask)
}

function renderTask(){
    const html = tasks.map((task) =>{

        return `
        <div class="task">
            <div class="completed">
            ${
                task.completed
                ? "<span class='done'>Done</span>"
                : `<button class="start-button" data-id="${task.id}">Start</button></div>`
            }
            <div class="title">${task.title}</div>
        </div>`;
  });
    const taskContainer = document.querySelector('#tasks');
    taskContainer.innerHTML = html.join('')

    const botonStart = document.querySelectorAll('.task .start-button');

    botonStart.forEach((boton)=>{
        boton.addEventListener('click',(e)=>{

            if(!timer){
                const id = boton.getAttribute('data-id');
                startButton(id)
            }

        })

    })
}

function startButton(id){
    time = 25 * 60;
    current = id;
    const taskIndex = tasks.findIndex( task => task.id === id) ;
    const taskName = document.querySelector('#time #taskName');
    taskName.textContent = tasks[taskIndex].title

    timer = setInterval(()=>{

        timeHandler(id)

    },1000)
}

function timeHandler(id){

    time--
    renderTime()
    if(time === 0){

        clearInterval(timer);
        markCompleted(id);
        timer = null;
        renderTask();
        startBreak();

    }
}

function renderTime(){

    const timeDiv = document.querySelector('#time #value')
    const minutos = parseInt(time/60);
    const seconds = parseInt(time%60);

    timeDiv.textContent = `${minutos < 10 ? '0' : ''}${minutos} : ${seconds}`

}

function markCompleted(id){

    const taskIndex = tasks.findIndex( task => task.id === id) ;
    tasks[taskIndex].completed = true;

}

function startBreak(){

    time = 10 * 60;
    taskName.textContent = 'Break'

    timerBreak = setInterval(()=>{

        timerBreakHandler()

    },1000)

}

function timerBreakHandler(){

    time--
    renderTime()
    if(time === 0){

        clearInterval(timerBreak);
        current = null;
        timeHandler = null;
        taskName.textContent = '';
        renderTask();

    }
}