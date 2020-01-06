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
                <Link to={`/infertilityEdit/${this.state.key}`}><i className="fas fa-pen CorrectIcon"></i></Link>
                <div className="MedConContentPage">
                <div className="LoadingName" >
                {this.state.loading || !this.state.board ? <div className="Loading">Bro wait for a sec...</div> : null }
                <div>
                <h2 className="ContentHeading">{this.state.board.MedConName}</h2>
                </div>
                <h2>{this.state.board.treatment}</h2>
                <h3>{this.state.board.infertilitytype}</h3>
                <h3>{this.state.board.dob}</h3>
                <h3>{this.state.board.marriagedate}</h3>
                <h3>{this.state.board.periodsregular}</h3>
                <h3>{this.state.board.bleeding}</h3>
                <h3>{this.state.board.cyclelength}</h3>
                <h3>{this.state.board.G}</h3>
                <h3>{this.state.board.P}</h3>
                <h3>{this.state.board.L}</h3>
                <h3>{this.state.board.A}</h3>
                <h3>{this.state.board.RisksPP}</h3>
                <h3>{this.state.board.RisksPPTwo}</h3>
                <h3>{this.state.board.RisksMed}</h3>
                <h3>{this.state.board.RisksMedTwo}</h3>
                <h3>{this.state.board.RisksOthers}</h3>
                <h3>{this.state.board.ti}</h3>
                <h3>{this.state.board.iui}</h3>
                <h3>{this.state.board.ivf}</h3>
                <h3>{this.state.board.planofcare}</h3>
                </div>
                </div>
                </form>
                </div>
            </section>
        )
    }
}

export default PregnancyShow;