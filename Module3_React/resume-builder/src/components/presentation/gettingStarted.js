import React from 'react';
import {skinCodes} from '../../constants/typeCodes';
import { connect } from 'react-redux';
import uuid from "react-uuid"
import { useHistory } from "react-router-dom";

function GettingStarted(props) {
     let history = useHistory();

     const setSkinCode = async (skinCode) => {
        if(props.document.id == null){
            let newDocument = {
                id : uuid(),
                skinCode : skinCode
            }
            props.setSkin(newDocument);      
        }
        else{
            props.updateSkin(skinCode);
        }
        history.push('/contact');
      }

      
        return (  
            <div className="container med gettingStarted">
                <div className="section">
                    <h1 className=" center">
                    Select a resume template to get started</h1>
                    <p className=" center">
                    You’ll be able to edit and change this template later!
                    </p>
                    <div className="styleTemplate ">
                    {
                        skinCodes.map((skinCode,index) => {
                            return( <div key={index} className="template-card rounded-border">
                                  <i className={ skinCode == props.document.skinCode ? 'selected fa fa-check' :'hide' } ></i>
                                <img  className='' src={'/images/' + skinCode + '.svg'}/>
                                <button type="button" onClick={()=>setSkinCode(skinCode)}  className='btn-select-theme'>USE TEMPLATE</button>
                            </div>);
                        })
                    }
                    </div>
                
                </div>
            </div>
        );
    
}
  
function mapStateToProps(store){
    return {
        document: store.document
    }
}

function mapDispatchToProps(dispatch){
    return{
        setSkin : (document) => { dispatch( {type:"SET_SKIN", payload:document} ) },
        updateSkin : (skinCode)=>{ dispatch( {type:"UPDATE_SKIN", payload:skinCode} ) }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(GettingStarted);
