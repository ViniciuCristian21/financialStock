import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }


  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public get(key: string) {
    const r = this._storage?.get(key);

    return r
  }

  public remove(key: string) {
    this._storage?.remove(key);
  }

  public async getKeys() {
    const result = await this._storage?.keys()

    return result;
  }
  public async clearAll() {
    await this._storage.clear();
  }
  public async getAll() {
    const lista = [];
    await this._storage.forEach((value, key, index) => {
      lista.push(value);
    })

    return lista
  }
}
