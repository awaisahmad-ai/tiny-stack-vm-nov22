import { mkdirSync as K, readdirSync as R, readFileSync as F, writeFileSync as W } from 'node:fs';

const T = '(9Y,.237        1111111-111-111 111             HLLH(           -0              ,,),';

function run(p, q) {
  const n = p.length, D = new Int32Array(256), C = new Int32Array(64), M = new Int32Array(256), O = [];
  let sp = 0, cs = 0, ip = 0, pc = 0, st = 0, o, c, m, a, b, u, v, t;
  const end = (e) => ({ O, e });
  for (;;) {
    if (st === 1e6) return end(10);
    if (pc < 0 || pc >= n) return end(9);
    o = p[pc];
    c = T.charCodeAt(o) - 40;
    if (!(c >= 0)) return end(5);
    m = 1 << (c >> 4) >> 1;
    if (pc + m >= n) return end(9);
    st++;
    if (sp < (c >> 2 & 3)) return end(2);
    if (sp - (c >> 2 & 3) + (c & 3) > 256) return end(3);
    pc += 1 + m;
    if (o === 0) return end(0);
    if (o === 1) D[sp++] = p[pc - 1] << 24 >> 24;
    else if (o === 2) D[sp++] = p[pc - 4] | p[pc - 3] << 8 | p[pc - 2] << 16 | p[pc - 1] << 24;
    else if (o === 3) sp--;
    else if (o === 4) { D[sp] = D[sp - 1]; sp++; }
    else if (o === 5) { t = D[sp - 1]; D[sp - 1] = D[sp - 2]; D[sp - 2] = t; }
    else if (o === 6) { D[sp] = D[sp - 2]; sp++; }
    else if (o === 7) { t = D[sp - 3]; D[sp - 3] = D[sp - 2]; D[sp - 2] = D[sp - 1]; D[sp - 1] = t; }
    else if (o === 23) D[sp - 1] = -D[sp - 1] | 0;
    else if (o === 27) D[sp - 1] = ~D[sp - 1];
    else if (o < 35) {
      b = D[--sp]; a = D[sp - 1];
      if (o > 18 && o < 23 && !b) return end(4);
      u = a >>> 0; v = b >>> 0;
      D[sp - 1] = (o < 20 ? o < 18 ? o < 17 ? a + b : a - b : o < 19 ? Math.imul(a, b) : a / b
        : o < 24 ? o < 22 ? o < 21 ? a % b : u / v : u % v
        : o < 28 ? o < 26 ? o < 25 ? a & b : a | b : a ^ b
        : o < 31 ? o < 29 ? a << b : o < 30 ? a >> b : a >>> b
        : o < 33 ? a == b : o < 34 ? a < b : u < v) | 0;
    } else if (o < 51) {
      t = (p[pc - 2] | p[pc - 1] << 8) << 16 >> 16;
      if (o === 48 || (o === 49 ? !D[--sp] : D[--sp])) pc += t;
    } else if (o === 51) {
      if (cs === 64) return end(7);
      C[cs++] = pc; pc = p[pc - 2] | p[pc - 1] << 8;
    } else if (o === 52) {
      if (!cs) return end(8);
      pc = C[--cs];
    } else if (o === 64) {
      a = D[sp - 1]; if (a & ~255) return end(6); D[sp - 1] = M[a];
    } else if (o === 65) {
      a = D[--sp]; b = D[--sp]; if (a & ~255) return end(6); M[a] = b;
    } else if (o === 80) {
      t = '' + D[--sp]; if (O.length + t.length > 65536) return end(11);
      for (a = 0; a < t.length; a++) O.push(t.charCodeAt(a));
    } else if (o === 81) {
      if (O.length === 65536) return end(11);
      O.push(D[--sp] & 255);
    } else if (o === 82) {
      D[sp++] = ip < q.length ? q[ip++] : -1;
    } else return end(D[--sp] & 255);
  }
}

const I = process.env.MAKEFUN_INPUT_DIR ?? '/input', Y = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
for (const d of R(I).sort()) {
  const { O, e } = run(F(`${I}/${d}/program.bin`), F(`${I}/${d}/input.bin`));
  K(`${Y}/${d}`, { recursive: true });
  W(`${Y}/${d}/stdout.bin`, Buffer.from(O));
  W(`${Y}/${d}/exit.txt`, `${e}\n`);
}
