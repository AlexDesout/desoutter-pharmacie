export default class Medicament {
  constructor({ id, denomination, formepharmaceutique, photo, qte }) {
    this._id = id;
    this._denomination = denomination;
    this._formepharmaceutique = formepharmaceutique;
    this._photo = photo;
    this._qte = Number(qte);
  }

  get id() {
    return this._id;
  }

  get denomination() {
    return this._denomination;
  }

  get formepharmaceutique() {
    return this._formepharmaceutique;
  }

  get photo() {
    return this._photo;
  }

  get qte() {
    return this._qte;
  }

  livrer() {
    this._qte ++;
  }

  dispenser() {
    this._qte --;
  }
}
