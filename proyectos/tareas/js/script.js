(() => {
  const STORAGE = 'misTareas_v1';
  const form = document.getElementById('form');
  const input = document.getElementById('tarea');
  const lista = document.getElementById('lista');

  let tareas = JSON.parse(localStorage.getItem(STORAGE) || '[]');

  function save(){ localStorage.setItem(STORAGE, JSON.stringify(tareas)); }
  function render(){
    lista.innerHTML = '';
    const frag = document.createDocumentFragment();
    for(const t of tareas){
      const li = document.createElement('li');
      li.dataset.id = t.id;
      if(t.done) li.classList.add('completed');

      const txt = document.createElement('div'); txt.textContent = t.text; txt.className='text';
      const btns = document.createElement('div');
      const toggle = document.createElement('button'); toggle.textContent = t.done ? '✓' : '○'; toggle.className='btn toggle'; toggle.dataset.act='toggle';
      const del = document.createElement('button'); del.textContent='🗑'; del.className='btn del'; del.dataset.act='del';
      btns.append(toggle,del);
      li.append(txt,btns);
      frag.appendChild(li);
    }
    lista.appendChild(frag);
  }

  function add(text){
    tareas.unshift({id:Date.now().toString(36),text,done:false});
    save(); render();
  }
  function toggle(id){ tareas = tareas.map(t => t.id===id?({...t,done:!t.done}):t); save(); render(); }
  function del(id){ tareas = tareas.filter(t=>t.id!==id); save(); render(); }

  lista.addEventListener('click', e=>{
    const btn = e.target.closest('button'); if(!btn) return;
    const act = btn.dataset.act; const li = btn.closest('li'); const id = li && li.dataset.id;
    if(act==='toggle') toggle(id); else if(act==='del') del(id);
  });

  form.addEventListener('submit', e=>{
    e.preventDefault();
    const v = input.value.trim(); if(!v) return; add(v); input.value=''; input.focus();
  });

  render();
})();
