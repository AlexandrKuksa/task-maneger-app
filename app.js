"use strict";
const KEY="task-manager.tasks.v1";
const form=document.getElementById("task-form");
const input=document.getElementById("task-input");
const list=document.getElementById("task-list");
const empty=document.getElementById("empty");
const counter=document.getElementById("counter");
const progress=document.getElementById("progress");
const error=document.getElementById("error");
function load(){try{const data=JSON.parse(localStorage.getItem(KEY)||"[]");return Array.isArray(data)?data.filter(t=>t&&typeof t.id==="string"&&typeof t.text==="string"&&typeof t.done==="boolean"):[]}catch{return []}}
let tasks=load();
function save(){try{localStorage.setItem(KEY,JSON.stringify(tasks));error.hidden=true}catch{error.textContent="Не удалось сохранить задачи в браузере.";error.hidden=false}}
function render(){list.replaceChildren();for(const task of tasks){const li=document.createElement("li");if(task.done)li.classList.add("done");const checkbox=document.createElement("input");checkbox.type="checkbox";checkbox.checked=task.done;checkbox.setAttribute("aria-label","Выполнено: "+task.text);checkbox.addEventListener("change",()=>{task.done=checkbox.checked;save();render()});const label=document.createElement("span");label.textContent=task.text;const del=document.createElement("button");del.type="button";del.className="delete";del.textContent="×";del.setAttribute("aria-label","Удалить: "+task.text);del.addEventListener("click",()=>{tasks=tasks.filter(t=>t.id!==task.id);save();render()});li.append(checkbox,label,del);list.append(li)}empty.hidden=tasks.length>0;counter.textContent=tasks.length+" задач";progress.textContent="Выполнено: "+tasks.filter(t=>t.done).length}
form.addEventListener("submit",event=>{event.preventDefault();const text=input.value.trim();if(!text)return;tasks.unshift({id:crypto.randomUUID(),text,done:false});input.value="";save();render();input.focus()});
render();