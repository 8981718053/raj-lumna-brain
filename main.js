async function init(){
  window.pyodide = await loadPyodide({indexURL:"https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"});
  await pyodide.loadPackage(['sympy']);
  const src = await (await fetch('brain.py')).text();
  pyodide.runPython(src);
}
await init();

function addMsg(text, who){
  const chat = document.getElementById('chat');
  const div = document.createElement('div');
  div.className = `msg ${who}`;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

document.getElementById('go').onclick = async ()=>{
  const q = document.getElementById('q').value || '';
  if(!q) return;
  addMsg(q, 'user');
  document.getElementById('q').value = '';
  const code = `handle_query(${JSON.stringify(q)})`;
  const res = await pyodide.runPythonAsync(code);
  addMsg(String(res), 'ai');
};
