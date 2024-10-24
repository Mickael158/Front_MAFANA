import axios from 'axios';
import  { useEffect, useState } from 'react';

const Contact = () => {
  const [Asoociation,setAsoociation] = useState('');

  const ListeAssociation = async () => {
      const response = await axios.get('https://localhost:8000/api/Associations/1');
      setAsoociation(response.data);
  }
  useEffect(()=>{
    ListeAssociation();
},[]);
  return (
    <>
      <div className="row pt-lg-6 w-80 m-auto" id="contact">
      <div className="col-lg-3">
        <div className="position-sticky pb-lg-5 pb-3 mt-lg-0 mt-5 ps-1" style={{'top': '100px'}}>
          <h3 className="text-info"><i className="fas fa-mail-bulk align-items-center justity-content-center"> </i>  Nos contacte</h3>
          <h6 className="text-secondary font-weight-normal pe-3">Vous pouvez nous contactez dirèctement par ses informations </h6>
        </div>
      </div>
      <div className="col-lg-9">
        <div className="row mt-3">
          <div className="row mt-3">
  <div className="col-12">
    <div className="position-relative border-radius-xl overflow-hidden shadow-lg mb-7">
      <div className="container border-bottom ">
        <div className="row d-flex justify-content-center justify-space-between py-1 align-items-center ">
          <div className="col-lg-8">
            <div className="nav-wrapper position-relative end-0">
              <ul className="nav nav-pills nav-fill flex-row p-1" role="tablist">
                <li className="nav-item">
                  <a className="nav-link mb-0 px-0 py-1 active" data-bs-toggle="tab" href="#preview-features-1" role="tab" aria-controls="preview" aria-selected="true">
                  <i className="fas fa-info-circle text-sm me-2"></i> Contactez-nous dirèctement
                  </a>
                </li>
                {/* <li className="nav-item">
                  <a className="nav-link mb-0 px-0 py-1" data-bs-toggle="tab" href="#code-features-1" role="tab" aria-controls="code" aria-selected="false">
                    <i className="fas fa-desktop text-sm me-2"></i> Contacter via le site
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="tab-content tab-space">
        <div className="tab-pane active" id="preview-features-1">
          <div className="container">
            <div className="row ">
              <div className="col-lg-12 m-auto text-center">
                <h3 className="pt-4 mt-lg-0">Boite de récéption de l'association</h3>
                <p className="pe-5">La reponse de vos message peu prendre du temps</p>
                <p  className="text-primary icon-move-right ">voici nos contactes
                  <i className="fas fa-arrow-right text-sm ms-1"></i>
                </p>
              </div>
              <div className="col-lg-8 mt-lg-0 mt-5 ps-lg-0 ps-0 m-auto d-flex flex-column justify-content-end align-items-start" >
                <div className="p-3 info-horizontal d-flex align-items-center text-center justify-content-center">
                  <div className="icon icon-shape bg-gradient-info shadow-info text-center">
                    <i className="fab fa-facebook fs-5"></i>
                  </div>
                  <div className="description ps-3">
                    <p className="mb-0 font-weight-bolder">{Asoociation.Siege}</p>
                  </div>
                </div>
                {/* <div className="p-3 info-horizontal d-flex align-items-center text-center justify-content-center">
                  <div className="icon icon-shape bg-gradient-success shadow-primary text-center">
                    <i className="fas fa-tty"></i>
                  </div>
                  <div className="description ps-3">
                    <p className="mb-0 font-weight-bolder"> {Asoociation.Telephone} </p>
                  </div>
                </div> */}
          
                <div className="p-3 info-horizontal d-flex align-items-center text-center justify-content-center">
                  <div className="icon icon-shape  bg-gradient-warning shadow-warning text-center">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="description ps-3">
                    <p className="mb-0 font-weight-bolder">{Asoociation.Telephone}</p>
                  </div>
                </div>
                <div className="p-3 info-horizontal d-flex align-items-center text-center justify-content-center">
                  <div className="icon icon-shape  bg-gradient-primary shadow-primary text-center">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="description ps-3">
                    <p className="mb-0 font-weight-bolder">{Asoociation.Email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="tab-pane" id="code-features-1">
          <div className="container py-4">
            <div className="row">
              <div className="col-lg-7 mx-auto d-flex justify-content-center flex-column">
                <h3 className="text-center">Contact us</h3>
                <form role="form" id="contact-form" method="post" >
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="input-group input-group-dynamic mb-4">
                          <label className="form-label">First Name</label>
                          <input className="form-control" aria-label="First Name..." type="text" />
                        </div>
                      </div>
                      <div className="col-md-6 ps-2">
                        <div className="input-group input-group-dynamic">
                          <label className="form-label">Last Name</label>
                          <input type="text" className="form-control" placeholder="" aria-label="Last Name..." />
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="input-group input-group-dynamic">
                        <label className="form-label">Email Address</label>
                        <input type="email" className="form-control"/>
                      </div>
                    </div>
                    <div className="input-group mb-4 input-group-static">
                      <label>Your message</label>
                      <textarea name="message" className="form-control" id="message" rows="4"></textarea>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-check form-switch mb-4 d-flex align-items-center">
                          <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked=""/>
                          <label className="form-check-label ms-3 mb-0" >I agree to the <a href="javascript:;" className="text-dark"><u>Terms and Conditions</u></a>.</label>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <button type="submit" className="btn bg-gradient-dark w-100">Send Message</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  </div>
  
          </div>
  

  </div>
</div>

        </div>
    </>
  )
}

export default Contact
