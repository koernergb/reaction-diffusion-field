precision highp float;

float hash(vec2 p){ return fract(sin(dot(p, vec2(41.3,289.1)))*43758.5453123); }

float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  float a=hash(i+vec2(0,0)), b=hash(i+vec2(1,0));
  float c=hash(i+vec2(0,1)), d=hash(i+vec2(1,1));
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}

float fbm(vec2 p){
  float s=0.0, a=0.5;
  for(int i=0;i<5;i++){ s+=a*noise(p); p*=2.0; a*=0.5; }
  return s;
}

// ∇⊥ of noise = divergence-free flow
vec2 curl(vec2 p){
  float e=0.001;
  float n1 = fbm(p + vec2(0.0, e));
  float n2 = fbm(p - vec2(0.0, e));
  float n3 = fbm(p + vec2(e, 0.0));
  float n4 = fbm(p - vec2(e, 0.0));
  float dx = n1 - n2;
  float dy = n3 - n4;
  return vec2(dy, -dx);
}

