// main.js
async function init(){
  window.pyodide = await loadPyodide({indexURL:"https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"});
  await pyodide.loadPackage(['sympy']);
  const src = await (await fetch('brain.py')).text();
  pyodide.runPython(src);
}
await init();

document.getElementById('go').onclick = async ()=>{
  const q = document.getElementById('q').value || '';
  const code = `handle_query(${JSON.stringify(q)})`;
  const res = await pyodide.runPythonAsync(code);
  document.getElementById('out').innerText = String(res);
};
