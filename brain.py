# brain.py  -- simple brain: pattern tracker + symbolic math
import json
from js import localStorage
import sympy as sp

def _get_patterns():
    raw = localStorage.getItem('rl_patterns')
    return json.loads(raw) if raw else {}

def _save_patterns(p):
    localStorage.setItem('rl_patterns', json.dumps(p))

def record_query(q):
    p = _get_patterns()
    p[q] = p.get(q,0) + 1
    _save_patterns(p)
    return p[q]

def handle_query(q):
    cnt = record_query(q)
    try:
        expr = sp.sympify(q)
        val = expr.evalf()
        return f"Math → {val}  (seen {cnt})"
    except Exception:
        if cnt > 4:
            return f"I've learned this ({cnt}×). I change strategy."
        return f"Echo: {q} (seen {cnt})"
