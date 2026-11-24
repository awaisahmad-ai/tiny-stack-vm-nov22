import { mkdirSync as K, readdirSync as R, readFileSync as F, writeFileSync as W } from 'node:fs';

const T = '(9Y,.237        1111111-111-111 111             HLLH(           -0              ,,),';

function run(p,q,O){
const n=p.length,D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256);
let sp=0,cs=0,ip=0,pc=0,st=0,o,c,m,a,b,u,v,t;
for(;;){
if(st==1e6)return 10;
if(pc<0||pc>=n)return 9;
c=T.charCodeAt(o=p[pc])-40;
if(!(c>=0))return 5;
m=1<<(c>>4)>>1;
if(pc+m>=n)return 9;
st++;
a=c>>2&3;
if(sp<a)return 2;
if(sp-a+(c&3)>256)return 3;
pc+=1+m;
if(!o)return 0;
if(o<2)D[sp++]=p[pc-1]<<24>>24;
else if(o<3)D[sp++]=p[pc-4]|p[pc-3]<<8|p[pc-2]<<16|p[pc-1]<<24;
else if(o<4)sp--;
else if(o<5)D[sp]=D[sp-1],sp++;
else if(o<6)t=D[sp-1],D[sp-1]=D[sp-2],D[sp-2]=t;
else if(o<7)D[sp]=D[sp-2],sp++;
else if(o<8)t=D[sp-3],D[sp-3]=D[sp-2],D[sp-2]=D[sp-1],D[sp-1]=t;
else if(o==23)D[sp-1]=-D[sp-1];
else if(o==27)D[sp-1]=~D[sp-1];
else if(o<35){
b=D[--sp];a=D[sp-1];
if(o>18&&o<23&&!b)return 4;
u=a>>>0;v=b>>>0;
D[sp-1]=o<20?o<18?o<17?a+b:a-b:o<19?Math.imul(a,b):a/b:o<24?o<22?o<21?a%b:u/v:u%v:o<28?o<26?o<25?a&b:a|b:a^b:o<31?o<29?a<<b:o<30?a>>b:a>>>b:o<33?a==b:o<34?a<b:u<v;
}else if(o<51){
t=(p[pc-2]|p[pc-1]<<8)<<16>>16;
if(o<49||(o<50?!D[--sp]:D[--sp]))pc+=t;
}else if(o<52){if(cs>63)return 7;C[cs++]=pc;pc=p[pc-2]|p[pc-1]<<8;}
else if(o<53){if(!cs)return 8;pc=C[--cs];}
else if(o<65){a=D[sp-1];if(a&~255)return 6;D[sp-1]=M[a];}
else if(o<66){a=D[--sp];b=D[--sp];if(a&~255)return 6;M[a]=b;}
else if(o<81){t=''+D[--sp];if(O.length+t.length>65536)return 11;O.push(...Buffer.from(t));}
else if(o<82){if(O.length>65535)return 11;O.push(D[--sp]&255);}
else if(o<83)D[sp++]=ip<q.length?q[ip++]:-1;
else return D[--sp]&255;
}}
const E=process.env,I=E.MAKEFUN_INPUT_DIR??'/input',Y=E.MAKEFUN_OUTPUT_DIR??'/output';
for(const d of R(I).sort()){
const O=[],e=run(F(`${I}/${d}/program.bin`),F(`${I}/${d}/input.bin`),O);
K(`${Y}/${d}`,{recursive:true});W(`${Y}/${d}/stdout.bin`,Buffer.from(O));W(`${Y}/${d}/exit.txt`,''+e);
}
