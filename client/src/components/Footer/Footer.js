import React from "react";

// materialize footer
const Footer = () =>

    <footer className="page-footer">
        <div className="container">
            <div className="row">
                <div className="col s6">
                    <a href="http://befree.church/">
                        <h5 className="white-text">BeFree Community Church</h5>
                    </a>

                    <p className="grey-text text-lighten-4">One Church, Four Locations</p>

                    <a href="http://befree.church/our-distinctives">
                        <p className="grey-text text-lighten-4">What We Believe</p>
                    </a>
                </div>
                <div className="col s6 l4 offset-l2">
                    <h5 className="white-text">Campuses</h5>
                    <ul>
                        <li><a className="grey-text text-lighten-3" href="http://befree.church/alton-home" target="on_blank">Alton</a></li>
                        <li><a className="grey-text text-lighten-3" href="http://befree.church/barrington-home" target="on_blank">Barrington</a></li>
                        <li><a className="grey-text text-lighten-3" href="http://befree.church/dover-home" target="on_blank">Dover</a></li>
                        <li><a className="grey-text text-lighten-3" href="http://befree.church/somersworth-home" target="on_blank">Somersworth</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="footer-copyright">
            <div className="container">
                © 2018 Copyright
                <a className="grey-text text-lighten-4 right" href="http://befree.church/">BeFree Church</a>
            </div>
        </div>
    </footer>

export default Footer;
