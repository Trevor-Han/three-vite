varying vec2 vUv;
varying vec4 v_WorldPosition;

void main() {
  vec3 p = position;

  csm_Position = p;

  vUv = uv;
  v_WorldPosition = modelMatrix * vec4(p, 1);
}
