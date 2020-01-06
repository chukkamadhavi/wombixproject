import React, { PureComponent } from 'react';
import './MedCondition.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {Link} from 'react-router-dom';
import BlockTwoMc from './BlockTwoMc/BlockTwomc';
import BlockThreeMcBtns from './BlockThreeMcBtns/BlockThreeMcBtns';
import BlockFour from './BlockFourMc/BlockFourMc';
import BlockFiveMc from './BlockFiveMc/BlockFiveMc';
import BlockSixMc from './BlockSix/BlockSixMc';
import BreastBlock from './BlockSix/BreastBlock';
import HeartBlock from './BlockSix/HeartBlock';
import Infertility from './Infertility';
import AddNewMC from './AddNewMC/AddNewMC';
// import firebase from '../../firebase';
import firebase from 'firebase';

class MedCondition extends PureComponent {
    constructor(props) {
        
        super(props)
        this.ref = firebase.firestore().collection('registerpatient');
        this.state = {
            startDate: new Date(),
            showMenu: false,
            open: false,
            firstname: '',
            lastname: '',
            email: '',
            number: '',
            genderchange: '',
            medicalcondition: '',
            lmpscanbtn:'',
            fetus:'',
            gestation:'',
            G:'',
            P:'',
            L:'',
            A:'',
            RisksOne:'',
            RisksTwo:'',
            RisksThree:'',
            RisksOthers:'',
            Lungs:'',
            Heart:'',
            Breasts:'',
            notes:'',
            GPLA:'',
            datacontent:{
                // heading: 'select medical condition',
                // pregnancyheading: 'pregnency',
                // infertilityheading: 'infertility',
                popupheading:'medical condition',
                // addnewconnection:'add new connection'
            },
        }
        this.togglePopup= this.togglePopup.bind(this);
        this.closeModel=this.closeModel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePopupInfertility = this.togglePopupInfertility.bind(this);
        this.togglePopupaddnew = this.togglePopupaddnew.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleFetusChange = this.handleFetusChange.bind(this);
        this.handleLungsChange = this.handleLungsChange.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);
        this.handleBreastChange = this.handleBreastChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }
    componentDidMount() {
        const ref = firebase.firestore().collection('registerpatient').doc(this.props.match.params.id);
        ref.get().then((doc) => {
          if (doc.exists) {
            const board = doc.data();
            this.setState({
                key: doc.id,
                medicalcondition:board.medicalcondition,
                firstname:board.firstname,
                lastname:board.lastname,
                number:board.number,
                email:board.email,
                genderchange:board.genderchange,
                lmpscanbtn: board.lmpscanbtn,
                fetus: board.fetus,
                gestation: board.gestation,
                G: board.G,
                P: board.P,
                L: board.L,
                A: board.A,
                RisksOne:board.RisksOne,
                RisksTwo: board.RisksTwo,
                RisksThree:board.RisksThree,
                RisksOthers:board.RisksOthers,
                Lungs: board.Lungs,
                Breasts:board.Breasts,
                Heart:board.Heart,
                notes:board.notes,
            });
          } else {
            console.log("No such document!");
          }
        });
      }
      handleChange = (event, date) =>  {
        const Input = event.target.type === "checkbox";
        this.setState({ 
            [event.target.name]: Input
            ? event.target.checked
            : event.target.value
        });
    };

    handleChangeDate(date){
            this.setState({
                startDate: date,
            })
    }

    handleChangeBlocks = (e) => {
            const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({board:state});
    }
    
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({board:state});
      }
    
    handleRadioChange(event){
        this.setState({
            lmpscanbtn : event.target.value, 
        })
    }
    handleFetusChange(event){
        this.setState({
            fetus: event.target.value,
        })
    }
    handleLungsChange(event){
        this.setState({
            Lungs: event.target.value,
        })
    }
    handleBreastChange(event){
        this.setState({
            Breasts: event.target.value,
        })
    }
    handleHeartChange(event){
        this.setState({
            Heart: event.target.value,
        })
    }
    closeModel(){
        this.setState({open: false})
    }
    togglePopup = () =>{
        return(
            this.setState({open: !this.state.open})
        )
    }
    togglePopupInfertility = () =>{
        return(
            this.setState({InfraOpen: !this.state.InfraOpen})
        )
    }
    togglePopupaddnew = () =>{
        return(
            this.setState({newconnection: !this.state.newconnection})
        )
    }
    handleSubmit(event){
        event.preventDefault();
        const { medicalcondition, firstname, lastname,email, number,genderchange, lmpscanbtn, fetus, gestation, G,P,L,A, RisksOne,RisksTwo,
            RisksThree, RisksOthers, Lungs, Heart, Breasts, notes } = this.state;

        const updateRef = firebase.firestore().collection('registerpatient').doc(this.state.key);
        updateRef.set({
            medicalcondition,firstname,lastname,email,number,genderchange,lmpscanbtn,fetus,gestation,G,P,L,A,
          RisksOne,RisksTwo,RisksThree,RisksOthers,Lungs,Heart,Breasts, notes
        }).then((docRef) => {
          this.setState({
            key: '',
            firstname: '',
            lastname: '',
            email: '',
            number: '',
            genderchange: '',
            medicalcondition: '',
            lmpscanbtn: '',
            fetus: '',
            gestation: '',
            G:'',
            P:'',
            L:'',
            A:'',
            RisksOne:'',
            RisksTwo:'',
            RisksThree:'',
            RisksOthers:'',
            Lungs:'',
            Heart:'',
            Breasts:'',
            notes:'',
          });
          this.props.history.push("/pregnancyShow/"+this.props.match.params.id)
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
    
    render() {
        // console.log(this.props)
        const menuView = () =>{
            this.setState(prevState => ({
                showMenu:!prevState.showMenu
            }))
        }
        return (
            <section className="MedicalCondition">

                <div className="DropDownButton">  
                <button onClick={menuView}><i className="fas fa-chevron-circle-down menuBotton"></i></button>
                <div className={`MCDropDown ${this.state.showMenu ? 'ConditionView':'ConditionHide'}`}>
                <h4 className="MedConToggleHead">{this.state.datacontent.heading}</h4>

                <span className="MCNames" > 
                <a href="#" onClick={this.togglePopup}>{this.state.medicalcondition}</a>
                <i className="fas fa-trash deleteBotton"></i>
                </span>
                <div className="BorderLine"></div>
                <span className="MCNames" >
                <a href="#" onClick={this.togglePopupInfertility}>{this.state.datacontent.infertilityheading}</a>
                <i className="fas fa-trash deleteBotton"></i>
                </span>
                <div className="BorderLine"></div>
                <span>
                <a href="#" onClick={this.togglePopupaddnew}>{this.state.datacontent.addnewconnection}</a>
                </span>
                </div>
                </div>
                <span>
                </span>
                
                {/* {this.state.open ?  */}
                <div className="PregnencyCon" >
                <form className="MedConMainPage" ref="MCform" >
                <Link to={`/patientdetail/${this.state.key}`} onClick={this.closeModel}>
                    <i className="fas fa-times-circle WrongIcon"></i></Link>
                <h1 className="MedHeading">{this.state.datacontent.popupheading}</h1>
                <Link to="/patientdetail/:id" onClick={this.handleSubmit} type="submit">
                    <i className="fas fa-check-circle CorrectIcon"></i></Link>
                <div className="MedConContentPage">
                    <h2 className="ContentHeading">{this.state.medicalcondition}</h2>
                    <div className="BorderLine"></div>
                    <div className="BlockOne">
                    <div className="LmpDate" >
                    <p className="LmpName">Lmp</p>
                    <DatePicker className="DatePicker" dateFormat='dd-MMM-yyyy' 
                    ref="InputDate1" selected={this.state.startDate}
                    onChange={this.handleChangeDate}/>
                    </div>
                    <div className="Gestation" >
                    <p  className="GestationName">gestation</p>
                    <input type="text" ref="InputValue" name="gestation" value={this.state.gestation} className="GestationInput" 
                    onChange={this.handleChange} placeholder="18+3"/>
                    </div>
                    </div>
                    <div className="BorderLine"></div>
                    <BlockTwoMc 
                    lmpscanbtn = {this.state.lmpscanbtn}
                    handleRadioChange = {this.handleRadioChange}
                    />
                    <div className="BorderLine"></div>
                    <div className="BlockThree" >
                    <BlockThreeMcBtns
                        fetus = {this.state.fetus}
                        handleFetusChange = {this.handleFetusChange} 
                    />
                    </div>
                    <div className="BorderLine"></div>
                    <BlockFour 
                    G={this.state.G}
                    P={this.state.P}
                    L={this.state.L}
                    A={this.state.A}
                    handleChangeBlocks={this.handleChangeBlocks}
                     />
                    <div className="BorderLine"></div>
                    <BlockFiveMc  
                    RisksOne={this.state.RisksOne}
                    RisksTwo={this.state.RisksTwo}
                    RisksThree={this.state.RisksThree}
                    RisksOthers={this.state.RisksOthers}
                    handleChangeBlocks={this.handleChangeBlocks}
                    />
                    <div className="BorderLine"></div>
                    <BlockSixMc
                    Lungs = {this.state.Lungs}
                    handleLungsChange = {this.handleLungsChange}
                    />
                    <div className="BlockSix">
                    <BreastBlock 
                    Breasts = {this.state.Breasts}
                    handleBreastChange = {this.handleBreastChange}
                     />
                    <HeartBlock  
                    Heart = {this.state.Heart}
                    handleHeartChange = {this.handleHeartChange}
                    />
                    </div>
                    <div className="BorderLine"></div>
                    <div className="BlockSix">
                    <p className="LungsHead">Notes</p>
                    <textarea ref="notes" name="notes"  onChange={this.handleChange} value={this.state.notes} 
                    className="TextBlock" />
                </div>
                </div>
                </form> 
                </div>
                {/* : null}
                */}

                {this.state.InfraOpen ? 
                <div className="MedConMainPage">
               <Infertility  closeModel={this.closeModel} />
               <AddNewMC AMChead={this.state.datacontent.addnewconnection} />
               </div>: null} 

               {this.state.newconnection ? 
                <div className="MedConMainPage">
               <AddNewMC AMChead={this.state.datacontent.addnewconnection} 
               pregnancyHead={this.state.datacontent.pregnancyheading}
               infertilityHead = {this.state.datacontent.infertilityheading} ></AddNewMC>
               </div>
               : null}
               
            </section>
        )
    }
}

export default MedCondition;