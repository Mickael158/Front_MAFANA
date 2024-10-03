import Vallee from "./Valle/Vallee";
import Village from "./Village/Village"
import TypeEvenement from "./TypeEvenement/TypeEvenement"
import { useState } from "react"
import TypeRevenu from "./TypeRevenu/TypeRevenu";
import Role from "./Role/Role";
import Categorie from "./CategorieMateriel/Categorie";
import Profession from "./Profession/Profession";
import TypeDepense from "./TypeDepense/TypeDepense";
import InsertionPrixCotisation from "./PrixCotisation/InsertionPrixCotisation";
import InsertionPrixCharge from "./PrixCharge/InsertionPrixCharge";
import Materiel from "./Materiel/Materiel";

const CRUD = () => {
    const [page, setPage] = useState(0);
  return (
    <>
    <div className="panel-header panel-header-sm">
    </div>
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5 className="title">VOUS CHOISISSEZ</h5>
                <p className="category">Les operations Chez<a href="#"> MA.FA.NA</a></p>
              </div>
              <div className="card-body all-icons">
                <div className="row">
                  <div className="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6"
                  onClick={() => {
                    setPage(0);
                  }}
                  >
                    <div className="font-icon-detail">
                      <i className="now-ui-icons location_pin fs-2"></i>
                      <p className="fs-6">Village</p>
                    </div>
                  </div>
                  <div className="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6"
                  onClick={() => {
                    setPage(1);
                  }}
                  >
                    <div className="font-icon-detail">
                      <i className="now-ui-icons media-1_album fs-2"></i>
                      <p className="fs-6">Valler</p>
                    </div>
                  </div>
                  <div className="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6"
                  onClick={() => {
                    setPage(2);
                  }}
                  >
                    <div className="font-icon-detail">
                      <i className="now-ui-icons location_world fs-2"></i>
                      <p className="fs-6">Type Evenement</p>
                    </div>
                  </div>
                  <div className="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6"
                  onClick={() => {
                    setPage(4);
                  }}
                  >
                    <div className="font-icon-detail">
                      <i className="now-ui-icons objects_diamond fs-2"></i>
                      <p className="fs-6">Type revenu</p>
                    </div>
                  </div>
                  <div className="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6"
                  onClick={() => {
                    setPage(6);
                  }}
                  >
                    <div className="font-icon-detail">
                      <i className="now-ui-icons sport_user-run fs-2"></i>
                      <p className="fs-6">Role</p>
                    </div>
                  </div>
                  <div className="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6"
                  onClick={() => {
                    setPage(3);
                  }}
                  >
                    <div className="font-icon-detail">
                      <i className="now-ui-icons business_briefcase-24 fs-2"></i>
                      <p className="fs-6">Profession</p>
                    </div>
                  </div>

                  <div className="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6"
                  onClick={() => {
                    setPage(5);
                  }}
                  >
                    <div className="font-icon-detail">
                      <i className="now-ui-icons files_box fs-2"></i>
                      <p className="fs-6">Categorie Materiel</p>
                    </div>
                  </div>

                  <div className="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6"
                  onClick={() => {
                    setPage(7);
                  }}
                  >
                    <div className="font-icon-detail">
                      <i className="now-ui-icons education_agenda-bookmark fs-2"></i>
                      <p className="fs-6">Type de depense</p>
                    </div>
                  </div>
                  <div className="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6"
                  onClick={() => {
                    setPage(8);
                  }}
                  >
                    <div className="font-icon-detail">
                      <i className="now-ui-icons business_money-coins fs-2"></i>
                      <p className="fs-6">Prix Cotisation</p>
                    </div>
                  </div>
                  <div className="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6"
                  onClick={() => {
                    setPage(9);
                  }}
                  >
                    <div className="font-icon-detail">
                      <i className="now-ui-icons education_paper fs-2"></i>
                      <p className="fs-6">Prix Charge</p>
                    </div>
                  </div>
                  <div className="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6"
                  onClick={() => {
                    setPage(10);
                  }}
                  >
                    <div className="font-icon-detail">
                      <i className="now-ui-icons shopping_cart-simple fs-2"></i>
                      <p className="fs-6">Materiel</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {page === 0 && <Village />}
            {page === 1 && <Vallee />}
            {page === 2 && <TypeEvenement />}
            {page === 4 && <TypeRevenu />}
            {page === 6 && <Role />}
            {page === 3 && <Profession />}
            {page === 5 && <Categorie />}
            {page === 7 && <TypeDepense />}
            {page === 8 && <InsertionPrixCotisation />}
            {page === 9 && <InsertionPrixCharge />}
            {page === 10 && <Materiel />}
            
          </div>
        </div>
      </div>
    </>
  )
}

export default CRUD
