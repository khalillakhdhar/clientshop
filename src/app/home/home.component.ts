import { Component, OnInit } from "@angular/core";
import { Produitservice } from "../services/produit.service";
import { Produit } from "../classes/produit";
import { Commandeservice } from "../services/commande.service";
import { UserService } from "../services/user.service";
import { Categorie } from "../classes/categorie";
import { CategorieService } from "../services/categorie.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  produits: any;
  public search: any = "";
  query: any;
  user: any;
  users: any;
  cuse: any;
  categories:Categorie[];

  constructor(
    public produitService: Produitservice,
    public commandeService: Commandeservice,
    private usser: UserService,private cateogrieService:CategorieService,
  ) {}

  ngOnInit(): void {
    this.readcats()

    this.user = JSON.parse(localStorage.getItem("user"));
    console.log("the user",this.user);
    //alert(this.user.uid);
    this.getUser();
    this.getproduits();
  }
  filtrer(titre)
  {
    this.query=titre;
  }
  getUser() {
    this.usser.read_User().subscribe((data) => {
      this.users = data.map((e) => {
        return {
          id: e.payload.doc.id,

          // tslint:disable-next-line: no-string-literal
          displayName: e.payload.doc.data()["displayName"],
          // tslint:disable-next-line: no-string-literal
          adresse: e.payload.doc.data()["adresse"],
          // tslint:disable-next-line: no-string-literal
          phoneNumber: e.payload.doc.data()["phoneNumber"],

          // tslint:disable-next-line: no-string-literal
        };
      });
      console.log(this.users);
      for (let u of this.users) {
        if (u.id === this.user.uid) {
          this.cuse = u;
          console.log("currently ", this.cuse);
        }
      }
    });
  }
  getproduits() {
    this.produitService.read_Produits().subscribe((data) => {
      this.produits = data.map((e) => {
        return {
          id: e.payload.doc.id,

          titre: e.payload.doc.data()["titre"],
          prix: e.payload.doc.data()["prix"],
          photo: e.payload.doc.data()["photo"],
          categorie: e.payload.doc.data()["categorie"],
          quantite_totale: e.payload.doc.data()["quantite_totale"],
          description: e.payload.doc.data()["description"],
         
        };
      });
      console.log(this.produits);
    });
  }
  readcats()
{
  this.cateogrieService.read_Categories().subscribe(data => {

    this.categories = data.map(e => {
      return {
       id: e.payload.doc.id,

      
       titre: e.payload.doc.data()["titre"],
       description: e.payload.doc.data()["description"],



      };
    });
    console.log(this.categories);

  });

}

  add(pr) {
    if (this.user != null) {
      pr.adresse = this.cuse.adresse;
      pr.tel = this.cuse.phoneNumber;
      pr.iduser = this.cuse.id;
      pr.etat = "en cours";
      pr.username = this.user.email;
      pr.quantite = 1;
      let p = Object.assign(pr);

      p.acheteur = this.cuse.displayName;
      this.commandeService.create_NewCommande(p);
      // window.location.replace("cart");
    } else {
      alert("veuillez vous connecté!");
      window.location.replace("login");
    }
  }
}
