document.addEventListener('DOMContentLoaded',()=> {
  // reloj
  const horaEl = document.getElementById('hora'), fechaEl = document.getElementById('fecha');
  function upd(){ const d=new Date(); horaEl.textContent = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`; const dias=['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']; const meses=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']; fechaEl.textContent = `${dias[d.getDay()]} ${d.getDate()} ${meses[d.getMonth()]} ${d.getFullYear()}`; }
  upd(); setInterval(upd,1000);

  // tareas (misma lógica compacta)
  const KEY='relojTareas_v1', form=document.getElementById('form'), input=document.getElementById('input'), lista=document.getElementById('lista');
  let arr = JSON.parse(localStorage.getItem(KEY) || '[]');
  function save(){ localStorage.setItem(KEY, JSON.stringify(arr)); }
  function render(){ lista.innerHTML=''; const frag=document.createDocumentFragment(); for(const t of arr){ const li=document.createElement('li'); li.dataset.id=t.id; if(t.done) li.classList.add('completed'); const txt=document.createElement('div'); txt.textContent=t.text; const btns=document.createElement('div'); const tbtn=document.createElement('button'); tbtn.className='btn'; tbtn.textContent=t.done?'✓':'○'; tbtn.dataset.a='t'; const dbtn=document.createElement('button'); dbtn.className='btn'; dbtn.textContent='🗑'; dbtn.dataset.a='d'; btns.append(tbtn,dbtn); li.append(txt,btns); frag.appendChild(li); } lista.appendChild(frag); }
  function add(text){ arr.unshift({id:Date.now().toString(36),text,done:false}); save(); render(); }
  function toggle(id){ arr = arr.map(x=> x.id===id?({...x,done:!x.done}):x); save(); render(); }
  function del(id){ arr = arr.filter(x=>x.id!==id); save(); render(); }
  lista.addEventListener('click', e=>{ const btn=e.target.closest('button'); if(!btn) return; const li=btn.closest('li'); const id=li.dataset.id; if(btn.dataset.a==='t') toggle(id); else if(btn.dataset.a==='d') del(id); });
  form.addEventListener('submit', e=>{ e.preventDefault(); const v=input.value.trim(); if(!v) return; add(v); input.value=''; input.focus(); });
  render();
});
