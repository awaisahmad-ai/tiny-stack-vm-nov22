import { mkdirSync as K, readdirSync as R, readFileSync as F, writeFileSync as W } from 'node:fs';

const T = '(9Y,.237        1111111-111-111 111             HLLH(           -0              ,,),';

function run(p,q,O){
const n=p.length,D=new Int32Array(576);
let s=0,k=0,j=0,i=0,z=0,o,c,m,a,b,u,v,t;
for(;;){
if(z==1e6)return 10;
if(i<0||i>=n)return 9;
c=T.charCodeAt(o=p[i])-40;
if(!(c>=0))return 5;
m=1<<(c>>4)>>1;
if(i+m>=n)return 9;
z++;a=c>>2&3;
if(s<a)return 2;
if(s-a+(c&3)>256)return 3;
i+=1+m;
if(!o)return 0;
if(o<2)D[s++]=p[i-1]<<24>>24;
else if(o<3)D[s++]=p.readInt32LE(i-4);
else if(o<4)s--;
else if(o<5)D[s]=D[s-1],s++;
else if(o<6)t=D[s-1],D[s-1]=D[s-2],D[s-2]=t;
else if(o<7)D[s]=D[s-2],s++;
else if(o<8)t=D[s-3],D[s-3]=D[s-2],D[s-2]=D[s-1],D[s-1]=t;
else if(o==23)D[s-1]=-D[s-1];
else if(o==27)D[s-1]=~D[s-1];
else if(o<35){
b=D[--s],a=D[s-1],u=a>>>0,v=b>>>0;
if(o>18&&o<23&&!b)return 4;
D[s-1]=o<20?o<18?o<17?a+b:a-b:o<19?Math.imul(a,b):a/b:o<24?o<22?o<21?a%b:u/v:u%v:o<28?o<26?o<25?a&b:a|b:a^b:o<31?o<29?a<<b:o<30?a>>b:a>>>b:o<33?a==b:o<34?a<b:u<v;
}else if(o<51){if(o<49||!D[--s]==(o<50))i+=p.readInt16LE(i-2);}
else if(o<52){if(k>63)return 7;D[512+k++]=i,i=p[i-2]|p[i-1]<<8;}
else if(o<53){if(!k)return 8;i=D[512+--k];}
else if(o<66){a=D[s-1];if(a&~255)return 6;o<65?D[s-1]=D[a+256]:(D[a+256]=D[s-2],s-=2);}
else if(o<81){t=''+D[--s];if(O.length+t.length>65536)return 11;O.push(...Buffer.from(t));}
else if(o<82){if(O.length>65535)return 11;O.push(D[--s]&255);}
else if(o<83)D[s++]=j<q.length?q[j++]:-1;
else return D[--s]&255;
}}
const E=process.env,I=E.MAKEFUN_INPUT_DIR??'/input',Y=E.MAKEFUN_OUTPUT_DIR??'/output';
for(const d of R(I)){
let O=[],e=run(F(`${I}/${d}/program.bin`),F(`${I}/${d}/input.bin`),O),g=`${Y}/${d}`;
K(g,{recursive:true});W(g+'/stdout.bin',Buffer.from(O));W(g+'/exit.txt',''+e);
}
