import React, { useRef } from "react";
export const ComponentToPrint = React.forwardRef(({ list }, ref) => (
  <div className='certificate-container' ref={ref}>
    <div className='certificate'>
      <div className='water-mark-overlay'></div>
      <div className='certificate-header'>
        <img
          src='https://rnmastersreview.com/img/logo.png'
          className='logo'
          alt=''
        />
      </div>
      <div className='certificate-body'>
        <p className='certificate-title'>
          <h1>Certificate of Completion</h1>
        </p>

        <p className='student-name'>Matthew Taylor</p>
        <div className='certificate-content'>
          <div className='about-certificate'>
            <p>
              {list && list.name}has here online on Date{" "}
              {new Date().toLocaleString() + " "}
            </p>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className='certificate-footer text-muted'>
          <div className='row'>
            <div className='col-md-6'>
              <p>Principal: Vidhalaya</p>
            </div>
            <div className='col-md-6'>
              <div className='row'>
                <div className='col-md-6'>
                  <p>Accredited by : Vidhalaya</p>
                </div>
                <div className='col-md-6'>
                  <p>Endorsed by: Vidhalaya</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
));
