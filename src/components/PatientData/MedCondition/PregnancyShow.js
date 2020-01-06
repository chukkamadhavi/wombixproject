import React, { PureComponent } from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import './PregnancyShow.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class PregnancyShow extends PureComponent {
    constructor(props) {
        super(props)
        this.ref = firebase.firestore().collection('registerpatient');
        this.unsubscribe = null
        this.state = {
          startDate: new Date(),
          board : {},
          key:'',
          loading: true,
          popupheading:'medical condition',
          open:false,
        }
        this.closeModel=this.closeModel.bind(this);
        this.handleChange= this.handleChange.bind(this);
    }
      componentDidMount() {
        const ref = firebase.firestore().collection('registerpatient').doc(this.props.match.params.id);
        ref.get().then((doc) => {
          if (doc.exists) {
            this.setState({
              board: doc.data(),
              key: doc.id,
              loading: false
            });
          } else {
            console.log("No such document!");
          }
        });
      }

    closeModel(){
        this.setState({open: false})
    }
    handleChange(date){
      this.setState({
          startDate: date, 
      });
    };
    
    render() {
        console.log(this.props)
        return (
            <section  className="MedicalCondition">
              <div className="PregnencyCon" >
                <form className="MedConMainPage" ref="MCform" >
                <Link to={`/patientdetail/${this.state.key}`} onClick={this.closeModel}>
                    <i className="fas fa-times-circle WrongIcon"></i></Link>
                <h1 className="MedHeading">{this.state.popupheading}</h1>
                <Link to={`/pregnancyEdit/${this.state.key}`}><i className="fas fa-pen CorrectIcon"></i></Link>
                <div className="MedConContentPage">
                <div className="LoadingName" >
                {this.state.loading || !this.state.board ? <div className="Loading">Bro wait for a sec...</div> : null }
                <div>
                <h2 className="ContentHeading">{this.state.board.MedConName}</h2>
                <div className="BorderLine"></div>
                <div className="BlockOne">
                    <div className="LmpDate" >
                    <p className="LmpName">Lmp</p>
                    <DatePicker className="DateValue" dateFormat='dd-MMM-yyyy' 
                    ref="InputDate1" selected={this.state.startDate}
                    onChange={this.handleChange}/>
                    </div>
                    <div className="Gestation" >
                    <p  className="GestationName">gestation</p>
                    <h3 className="GestationValue">{this.state.board.gestation}</h3>
                    </div>
                    </div>
                    <div className="BorderLine"></div>
                    <div className="BlockTwo">
                    <div className="BTwoLmpDateValue" >
                    <p className="LmpNameValue">EDD</p>
                    <DatePicker className="LMPDateValue" dateFormat='dd-MMM-yyyy' 
                    ref="InputDate1" selected={this.state.startDate}
                    onChange={this.handleChange} />
                    <h3 className="LmpScanBtn">({this.state.board.lmpscanbtn})</h3>
                    </div>
                    </div>
                    <div className="BlockTwo">
                    <div className="BTwoLmpDateValue" >
                    <p className="FetusNameValue">Fetus</p>
                    <h3 className="FetusValue">{this.state.board.fetus}</h3>
                    </div>
                    </div>
                    <div className="BlockTwo">
                    <div className="BTwoLmpDateValue">
                    <p className="PONameValue">Past Obstetrics</p>
                    <h3 className="POValue">G<p className="POValues">{this.state.board.G}</p></h3>
                    <h3 className="POValue">P<p className="POValues">{this.state.board.P}</p></h3>
                    <h3 className="POValue">L<p className="POValues">{this.state.board.L}</p></h3>
                    <h3 className="POValue">A<p className="POValues">{this.state.board.A}</p></h3>
                    </div>
                    </div>
                    <div className="BlockTwo">
                    <div className="BTwoLmpDateValue">
                    <p className="RiskValue">Risks</p>
                    <h3 className="FetusValue">{this.state.board.RisksOne}</h3>
                    <h3 className="FetusValue">{this.state.board.RisksTwo}</h3>
                    <h3 className="FetusValue">{this.state.board.RisksThree}</h3>
                    </div>
                    </div>
                    <div className="BlockOthers">
                    <p className="RiskOthersValue">Others</p>
                    <span><h3 className="RiskOthersValues">{this.state.board.RisksOthers}</h3></span>
                    </div>
                    <div className="BorderLine"></div>
                    <div className="BlockTwo">
                    <div className="BTwoLmpDateValue">
                    <p className="RiskValue">Lungs</p>
                    <div className="LungsButtons">
                    <input className="LungsBtnOne" type="radio" id="lungsoption-one"  
                    name="lungsselector" 
                    value={this.state.board.Lungs} />
                    <label className="LungsActiveOne" htmlFor="lungsoption-one" ></label>
                    <h2>{this.state.board.Heart}</h2>
                    <h2>{this.state.board.Breasts}</h2>
                    </div>
                    </div>
                    </div>
                    <div className="BorderLine"></div>
                    <div className="BlockSix">
                    <p className="LungsHead">Notes</p>
                    <div ref="notes" className="TextBlock"><h3>{this.state.board.notes}</h3></div>
                    </div>
                {/* <h2>{this.state.board.EDD}</h2> */}
                
                
                
                
                <h2></h2>
                </div>
                </div>
                </div>
                </form>
                </div>
            </section>
        )
    }
}

export default PregnancyShow;