/**
 * @file src/features/assets/AssetManager.ts
 * @description Centralized loader config and preloading manager.
 *
 * Implements DRACO and KTX2 loader configurations.
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { useAssetStore } from './asset.store';
import type { AssetEntry } from './asset.types';

class AssetManagerClass {
  private readonly cache = new Map<string, unknown>();
  private readonly loadingPromises = new Map<string, Promise<unknown>>();
  private gl: THREE.WebGLRenderer | null = null;
  private dracoLoader: DRACOLoader | null = null;
  private ktx2Loader: KTX2Loader | null = null;

  setRenderer(gl: THREE.WebGLRenderer): void {
    this.gl = gl;
  }

  private getDracoLoader(): DRACOLoader {
    if (!this.dracoLoader) {
      this.dracoLoader = new DRACOLoader();
      this.dracoLoader.setDecoderPath('/draco/');
    }
    return this.dracoLoader;
  }

  private getKtx2Loader(): KTX2Loader {
    if (!this.ktx2Loader) {
      this.ktx2Loader = new KTX2Loader();
      this.ktx2Loader.setTranscoderPath('/basis/');
      if (this.gl) {
        this.ktx2Loader.detectSupport(this.gl);
      }
    }
    return this.ktx2Loader;
  }

  /**
   * Main preloading method. Will load a list of assets and cache them.
   */
  async preload(entries: AssetEntry[]): Promise<void> {
    useAssetStore.getState().registerAssets(entries);

    const promises = entries.map(async (entry) => {
      if (this.cache.has(entry.id)) {
        useAssetStore.getState().setAssetLoaded(entry.id);
        return this.cache.get(entry.id);
      }

      if (this.loadingPromises.has(entry.id)) {
        return this.loadingPromises.get(entry.id);
      }

      const promise = this.loadAsset(entry);
      this.loadingPromises.set(entry.id, promise);

      try {
        const result = await promise;
        this.cache.set(entry.id, result);
        useAssetStore.getState().setAssetLoaded(entry.id);
        return result;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        useAssetStore.getState().setAssetError(entry.id, errorMsg);
        throw err;
      } finally {
        this.loadingPromises.delete(entry.id);
      }
    });

    await Promise.all(promises);
  }

  private loadAsset(entry: AssetEntry): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const updateProgress = (event: ProgressEvent) => {
        if (event.total > 0) {
          const percent = (event.loaded / event.total) * 100;
          useAssetStore.getState().updateAssetProgress(entry.id, Math.round(percent));
        }
      };

      if (entry.type === 'gltf') {
        const loader = new GLTFLoader();
        loader.setDRACOLoader(this.getDracoLoader());
        loader.setKTX2Loader(this.getKtx2Loader());

        loader.load(
          entry.src,
          (gltf) => resolve(gltf),
          updateProgress,
          (err) => reject(err),
        );
      } else if (entry.type === 'hdri') {
        const loader = new RGBELoader();
        loader.load(
          entry.src,
          (texture) => resolve(texture),
          updateProgress,
          (err) => reject(err),
        );
      } else if (entry.type === 'texture') {
        const loader = new THREE.TextureLoader();
        loader.load(
          entry.src,
          (texture) => resolve(texture),
          updateProgress,
          (err) => reject(err),
        );
      } else if (entry.type === 'audio') {
        // Fallback for simple audio loading/checking
        const audio = new Audio();
        audio.src = entry.src;
        audio.addEventListener('canplaythrough', () => resolve(audio), { once: true });
        audio.addEventListener('error', (err) => reject(err), { once: true });
        audio.load();
      } else {
        // Standard fonts loading (document.fonts)
        if ('fonts' in document) {
          const fontFace = new FontFace(entry.id, `url(${entry.src})`);
          fontFace
            .load()
            .then((loadedFace) => {
              document.fonts.add(loadedFace);
              resolve(loadedFace);
            })
            .catch((err) => reject(err));
        } else {
          resolve(null);
        }
      }
    });
  }

  get<T>(id: string): T {
    const asset = this.cache.get(id);
    if (!asset) {
      throw new Error(`[AssetManager] Asset with ID "${id}" was not preloaded.`);
    }
    return asset as T;
  }
}

export const AssetManager = new AssetManagerClass();
