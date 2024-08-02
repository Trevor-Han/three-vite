#include "../includes/simplexNosie.glsl"
#include "/node_modules/lygia/generative/random.glsl"
#include "/node_modules/lygia/math/saturate.glsl"
#include "/node_modules/lygia/math/map.glsl"
#include "/node_modules/lygia/color/palette.glsl"

uniform float uTime;
uniform vec3 iResolution;
uniform vec4 iMouse;

varying vec2 vUv;

uniform float uSpeed;
uniform float uOpacity;

vec3 pos2col(vec2 i){
    i+=vec2(9.,0.);

    float r=random(i+vec2(12.,2.));
    float g=random(i+vec2(7.,5.));
    float b=random(i);

    vec3 col=vec3(r,g,b);
    return col;
}

vec3 colorNoise(vec2 uv){
    vec2 size=vec2(1.);
    vec2 pc=uv*size;
    vec2 base=floor(pc);

    vec3 v1=pos2col((base+vec2(0.,0.))/size);
    vec3 v2=pos2col((base+vec2(1.,0.))/size);
    vec3 v3=pos2col((base+vec2(0.,1.))/size);
    vec3 v4=pos2col((base+vec2(1.,1.))/size);

    vec2 f=fract(pc);

    f=smoothstep(0.,1.,f);

    vec3 px1=mix(v1,v2,f.x);
    vec3 px2=mix(v3,v4,f.x);
    vec3 v=mix(px1,px2,f.y);
    return v;
}

void main(){
    vec2 uv=vUv;
    vec2 noiseUv=uv;
    vec3 col=vec3(1.0);
    float mask = 1.0;

    noiseUv.x += -uTime *.1; // 位置偏移
    // float noiseValue=noise(noiseUv*vec2(100.)); // 应用噪声
    float noiseValue = noise( noiseUv * vec2(3.0,100.0)); // 线条拉长
    mask = noiseValue;
    // value(mask), inMin(-1.), inMax(1.), outMin(0.), outMax(1.)
    // mask ,-1., 1., 0. ,1. outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
    mask = 1.0 * (mask +1.0 ) / 2.0; // 把值域映射到[0,1]
    // mask=pow(mask,5.);
    mask = pow(clamp(mask-0.03, 0.0, 1.0),13.0); // 调整线条多少和线条大小
    mask = smoothstep(0.0,0.06, mask); // 平滑线条，让线条清晰

    col=colorNoise(noiseUv*vec2(10.,100.)); // 产生随机颜色
    col*=vec3(1.5,1.,400.);
    // mask=1.;

    mask *= smoothstep(.02,0.5,uv.x) * smoothstep(.02,0.5,1.-uv.x); // 虚化线条两边的颜色
    mask*=smoothstep(.01,.1,uv.y)*smoothstep(.01,.1,1.-uv.y);
//    mask*=smoothstep(1.,10.,uSpeed);

    gl_FragColor=vec4(col,mask*uOpacity);
}
