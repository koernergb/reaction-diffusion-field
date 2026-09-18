precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform sampler2D heightSrc;   // scalar height we advect
uniform float dt;
uniform float flowStrength;    // 0..0.06
uniform float flowScale;       // 1.0..3.0
uniform float speed;           // 0.05..0.15
uniform float time;

// Include common functions - we'll inline them for now since GLSL doesn't support #include
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

void main() {
  vec2 uv = vUv;
  vec2 v = curl(uv * flowScale + time * speed) * flowStrength;
  vec2 back = uv - v * dt;                 // backtrace
  vec4 h = texture(heightSrc, back);
  outColor = h;
}

