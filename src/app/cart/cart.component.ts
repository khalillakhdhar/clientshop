import { Component, OnInit } from "@angular/core";
import { Produitservice } from "../services/produit.service";
import { Commandeservice } from "../services/commande.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  produits: any;
  min = 6;
  constructor(
    public produitService: Produitservice,
    public commandeService: Commandeservice
  ) {}

  ngOnInit(): void {
    this.getproduits();
  }
  getproduits() {
    this.commandeService.read_mesCommandes().subscribe((data) => {
      this.produits = data.map((e) => {
        return {
          id: e.payload.doc.id,

          // tslint:disable-next-line: no-string-literal
          titre: e.payload.doc.data()["titre"],
          // tslint:disable-next-line: no-string-literal
          prix: e.payload.doc.data()["prix"],
          // tslint:disable-next-line: no-string-literal
          quantite: e.payload.doc.data()["quantite"],

          // tslint:disable-next-line: no-string-literal
          description: e.payload.doc.data()["description"],
          etat: e.payload.doc.data()["etat"],

          // tslint:disable-next-line: no-string-literal
          photo: e.payload.doc.data()["photo"],
          iduser: e.payload.doc.data()["iduser"],
          // tslint:disable-next-line: no-string-literal
        };
      });
      console.log(this.produits);
    });
  }
  delete(id): void {
    if (confirm("êtes vous sûre de vouloir supprimer?")) {
      this.commandeService.delete_Commande(id);
      //window.location.replace('gestion');
    }
  }
}
