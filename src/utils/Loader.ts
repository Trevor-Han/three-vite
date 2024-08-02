import { TextureLoader } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'

export enum LoaderType {
    'Texture' = 'Texture',
    'GLTF' = 'GLTF',
    'GLB' = 'glb',
    'RGBE' = 'RGBE'
}

interface Resource {
    name: string,
    type: LoaderType,
    path: string
}

export default class Loader {
  resources: {[key: string]: any}
  total: number
  totalSuccess: number
  totalFail: number

  private fileLoaded: (name: string, res: any) => void
  private loadEnd: (resources: {[key: string]: any}) => void

  private gltfLoader: GLTFLoader
  private glbLoader: GLTFLoader
  private rgbeLoader: RGBELoader
  private textureLoader: TextureLoader

  constructor() {
    this.resources = {}
    this.total = 0
    this.totalSuccess = 0
    this.totalFail = 0

    // Functions to be registered
    this.fileLoaded = null!
    this.loadEnd = null!

    // GLTF loader
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('libs/draco/')
    const glbLoader = new GLTFLoader()
    glbLoader.setDRACOLoader(dracoLoader)

    this.glbLoader = glbLoader
    this.rgbeLoader = new RGBELoader()
    this.textureLoader = new TextureLoader()

    const gltfLoader = new GLTFLoader()
    gltfLoader.setMeshoptDecoder(MeshoptDecoder)
    this.gltfLoader = gltfLoader
  }

  // Load files
  load(resources: Array<Resource>) {
    this.total += resources.length

    for (const resource of resources) {
      this.loadResource(resource)
    }
  }

  onFileLoaded(callback: (name: string, res: any) => any) {
    this.fileLoaded = callback
  }

  // Regist a loadEnd function
  onLoadEnd(callback: (resources: any) => void) {
    this.loadEnd = callback
  }

  private loadResource(resource: Resource) {
    const type = resource.type
    if (!type) {
      console.warn('type is required')
      return
    }

    let loader: GLTFLoader | TextureLoader | RGBELoader = this.textureLoader

    switch (type) {
      case LoaderType.GLTF:
        loader = this.gltfLoader
        break
      case LoaderType.GLB:
        loader = this.glbLoader
        break
      case LoaderType.Texture:
        loader = this.textureLoader
        break
      case LoaderType.RGBE:
        loader = this.rgbeLoader
        break
      default:
        loader = this.textureLoader
    }

    loader.load(
      resource.path,
      res => { this.loadSuccess(resource, res) },
      undefined,
      res => { this.loadFail(resource, res) }
    )
  }

  private loadSuccess(resource: Resource, res: any) {
    this.totalSuccess++

    const name = resource.name
    this.resources[name] = res

    this.fileLoaded && this.fileLoaded(name, res)

    if (this.total === this.totalSuccess + this.totalFail) {
      this.loadEnd && this.loadEnd(this.resources)
    }
  }

  private loadFail(resource:Resource, res: any) {
    console.warn(`resource ${resource.name} load fail`, res)
    this.totalFail++

    if (this.total === this.totalSuccess + this.totalFail) {
      this.loadEnd(this.resources)
    }
  }
}
