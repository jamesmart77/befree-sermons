import React from "react";
import { Row } from "../Grid";

// materialize navbar
const HeaderSection = () => (
    <div className="col s12 m12 l12 xl12">
        <Row>
            <div>
                <h4 className='dash-title center-align'>Sermons</h4>
            </div>
            <div>
                <p className="mission-statement">
                <b>BeFree</b> is a partnership of interdependent local churches dedicated to advancing the Good News of Jesus Christ through a shared vision of making disciples, mentoring next-generation leaders, and developing new churches.
                </p>
                <p className="mission-statement">
                We're <b>one</b> church with five locations in southeastern New Hampshire.
                </p>
                <p className="mission-statement">
                Please feel free to share the following resources.
                </p>
            </div>

        </Row>
    </div>
    )


export default HeaderSection;