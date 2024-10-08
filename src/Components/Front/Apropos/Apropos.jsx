const Apropos = () => {
    return (
        <>
<section className="my-5 py-5">
    <div className="container" id="apropos">
        <div className="row align-items-center">
            <div className="col-lg-4 ms-auto me-auto p-lg-0 mt-lg-0">
                <div className="rotating-card-container">
                    <div className="card card-rotate card-background card-background-mask-primary shadow-primary mt-md-0 mt-5">
                        <div className="front front-background w-100" style={{ ' backgroundSize': 'cover'}}>
                            <div className="card-body py-7 text-center">
                                <span className="text-white text-4xl my-3">Toucher ici</span>
                                <h3 className="text-white">pour nous rejoindre </h3>
                                <p className="text-white opacity-8">Il nous faut vos informations.</p>
                            </div>
                        </div>
                        <div className="back back-background" style={{ 'backgroundImage': "url(assets/img/Logo/logo.png)", 'backgroundSize': 'cover'}}>
                            <div className="card-body  text-center">
                                <h4 className="text-white">Voulez-vous nous rejoindre</h4>
                                <h6 className="text-white opacity-8">Clicker ici </h6>
                                <a href="#" target="_blank" className="btn btn-warning btn-sm w-50 mx-auto mt-3">Inscription</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 ms-auto">
                <div className="row justify-content-start">
                    <div className="col-md-12 ">
                        <div className="info">
                            <i className="material-icons text-gradient text-primary text-7xl">MA.FA.NA</i>
                            <h5 className="font-weight-bolder mt-4">Bienvenu dans notre Site, vous pouvez voir ici :</h5>
                            <ul className="fs-6" style={{ 'list-style-type': 'none'}}>
                                <li className="bold fs-5"><i className="fas fa-info-circle text-sm me-5 text-warning"></i>A PROPOS</li>
                                <li className="bold fs-5"><i className="fas fa-user text-sm me-5 text-warning"></i>QUI SOMME NOUS</li>
                                <li className="bold fs-5"><i className="fas fa-mail-bulk text-sm me-5 text-warning"></i>CONTACT</li>
                            </ul>
                            <h5 className="font-weight-bolder mt-4">Si vous etes connecter , vous pouvez :</h5>
                            <ul className="fs-6" style={{ 'list-style-type': 'none'}}>
                                <li className="bold fs-5"><i className="fas fa-desktop text-sm me-5 text-warning"></i>Acceder au gestion de l association</li>
                                <li className="bold fs-5"><i className="fas fa-user text-sm me-5 text-warning"></i>Faire des actions financier ou materiel sur l association</li>
                                <li className="bold fs-5"><i className="fas fa-exclamation-triangle text-sm me-5 text-danger"></i>Cela est reserver aux responsables</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


<section className="my-5 py-5">
    <div className="container-fluid mt-sm-5 mt-3 w-75">
        <div className="row">
            <div className="col-lg-3">
                <div className="position-sticky pb-lg-5 pb-3 mt-lg-0 mt-5 ps-2" style={{ 'top': '100px'}}>
                    <h3 className="text-info"><i className="fas fa-info-circle  align-items-center justity-content-center"> </i> A propos</h3>
                    <h6 className="text-secondary font-weight-normal pe-3">Description de l association</h6>
                </div>
            </div>

            <div className="col-lg-9">
                <div className="row mt-3">
                    <div className="col-12">
                        <div className="position-relative border-radius-xl overflow-hidden shadow-lg mb-7">
                            <div className="container border-bottom">
                                <div className="row justify-space-between py-2">
                                    <div className="col-lg-3 me-auto">
                                        <p className="lead text-dark pt-1 mb-0">Partie 1</p>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="nav-wrapper position-relative end-0">
                                            <ul className="nav nav-pills nav-fill flex-row p-1" role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link mb-0 px-0 py-1 active" data-bs-toggle="tab" href="#preview-btn-color" role="tab" aria-controls="preview" aria-selected="true">
                                                    Page 1
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link mb-0 px-0 py-1" data-bs-toggle="tab" href="#code-btn-color" role="tab" aria-controls="code" aria-selected="false">
                                                    Page 2
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-content tab-space">
                                <div className="tab-pane active" id="preview-btn-color">
                                    Description 1
                                </div>
                                <div className="tab-pane" id="code-btn-color">
                                    Description 2
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="row mt-3">
                        <div className="col-12">
                            <div className="position-relative border-radius-xl overflow-hidden shadow-lg mb-7">
                                <div className="container border-bottom">
                                    <div className="row justify-space-between py-2">
                                        <div className="col-lg-3 me-auto">
                                            <p className="lead text-dark pt-1 mb-0">Partie 2</p>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="nav-wrapper position-relative end-0">
                                                <ul className="nav nav-pills nav-fill flex-row p-1" role="tablist">
                                                    <li className="nav-item">
                                                        <a className="nav-link mb-0 px-0 py-1 active" data-bs-toggle="tab" href="#preview-typo" role="tab" aria-controls="preview" aria-selected="true">
                                                        Page 2
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link mb-0 px-0 py-1" data-bs-toggle="tab" href="#code-typo" role="tab" aria-controls="code" aria-selected="false">
                                                        Page 1
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-content tab-space">
                                    <div className="tab-pane active" id="preview-typo">
                                    Description 2
                                    </div>
                                    <div className="tab-pane" id="code-typo">
                                        Description 1
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
        </>
    );
};
export default Apropos;