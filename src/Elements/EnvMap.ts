import * as THREE from 'three'

export default class EnvMap {
  build(texture:any) {
    texture.mapping = THREE.EquirectangularReflectionMapping
    return texture
  }
  MeshChildren() {}
}
