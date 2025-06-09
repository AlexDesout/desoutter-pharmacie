import Medicament from "../models/medicament";

const baseRoute = "https://apipharmacie.pecatte.fr/api/2/medicaments";

export async function getMedicaments() {
  const response = await fetch(baseRoute);
  if (!response.ok) throw new Error("Erreur lors du chargement");

  const data = await response.json();
  return data.map((m) => new Medicament(m));
}

export async function getMedicamentById(id) {
  const response = await fetch(`${baseRoute}/${id}`);
  if (!response.ok) throw new Error("Erreur lors du chargement");

  const data = await response.json();
  return new Medicament(data);
}

export async function deleteMedicament(id) {
  const response = await fetch(`${baseRoute}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(
      `Erreur lors de la suppression du médicament avec ID ${id}`
    );
  }

  return `Médicament avec ID ${id} supprimé avec succès`;
}

export async function editMedicament(medicament) {
  const dataToSend = {
    id: medicament.id,
    denomination: medicament.denomination,
    formepharmaceutique: medicament.formepharmaceutique,
    photo: medicament.photo,
    qte: medicament.qte,
  };
  const response = await fetch(baseRoute, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  });

  if (!response.ok) {
    throw new Error(
      `Erreur lors de la modification du médicament avec ID ${medicament.id}`
    );
  }

  return `Médicament avec ID ${medicament.id} modifié avec succès`;
}

export async function addMedicament(medicament) {
  const response = await fetch(baseRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(medicament),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'ajout du médicament");
  }

  return "Médicament ajouté avec succès";
}

