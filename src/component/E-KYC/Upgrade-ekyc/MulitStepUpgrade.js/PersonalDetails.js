import React, { Component } from 'react';
import { NotificationManager } from "react-notifications";
import { largeTime } from './../../../Utils/notificationTime';
const Joi = require('@hapi/joi');

export class PersonalandFile extends Component {

  schema = Joi.object({

    MonthlyIncome: Joi.string().required(),
    SourceOfFund: Joi.string().required(),
    Nationality: Joi.string().required(),

  })

  continue = async (e) => {
    const { values } = this.props;
    e.preventDefault();

    let data = {

      MonthlyIncome: values.monthlyIncome,
      SourceOfFund: values.sourceOfFund,
      Nationality: values.nationality,

    }

    try {

      const validationValue = await this.schema.validateAsync(data);
      this.props.nextStep();

    } catch (error) {
      NotificationManager.error(error.toString(), "Click to Remove", largeTime);
    }




  }


  back = e => {
    e.preventDefault();
    this.props.prevStep();
  }





  render() {
    const { values, handleChange } = this.props;
    return (
      <div className="container">
        <div className="row  d-flex justify-content-center">
          <div className='col-sm-7 card'>
            <div className="card-header imTwoWhite">
              <h1>Personal Information</h1>
            </div>
            <form className="mt-5">
              {/* Monthly Income */}
              <div className="form-group ">
                <label htmlFor="">Monthly Income</label>
                <input style={{ borderRadius: "50px" }} type="text" name="monthlyIncome" value={values.monthlyIncome} onChange={handleChange('monthlyIncome')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="provide Monthly Income" />

              </div>

              {/* Source Of Fund */}
              <div className="form-group ">
                <label htmlFor="">Source Of Fund</label>
                <input style={{ borderRadius: "50px" }} type="text" name="sourceOfFund" value={values.sourceOfFund} onChange={handleChange('sourceOfFund')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Provide Source Of Fund" />

              </div>

              {/* Nationality */}
              <div className="form-group ">
                <label htmlFor="">Nationality</label>
                <input style={{ borderRadius: "50px" }} type="text" name="nationality" value={values.nationality} onChange={handleChange('nationality')} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="provide Nationality" />

              </div>
            </form>
          </div>



        </div>
        <hr />
        <div className="row d-flex justify-content-center">

          <div className="b" onClick={this.continue} >Next</div>
        </div>
      </div>
    )
  }
}

export default PersonalandFile;
