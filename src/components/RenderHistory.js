import React from 'react'
import Context from '../context/ContextStore'
import { Link } from 'react-router-dom'

class RenderHistory extends React.Component {
    
   
    static contextType = Context

    render() {
        
       

        const listOfHistory = this.context.listOfHistory
        const renderHistory = listOfHistory.map((item, index) => {
          
            return (<div key={index}>
                Date : {`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`}||
                timeSubmitted : {item.timeSubmit}||
                itemStatus: {item.itemStatus}||
                 name : {item.itemName}


            </div>)
        })
     
        return (
            <div>
                <center>
                    <h1>
                        History List
                    </h1>
                    <div>
                        {renderHistory}
                        <br />
                        <button onClick={() => this.context.onClickClearHistoryList()}>
                            <i className='trash blue 
                            icon' />
                            Clear History List
                         </button> <br /> <br />
                        <Link to='/' >
                            <button onClick={()=> this.context.onS}>
                                <i className='left arrow red icon' />
                                Back To MainPage
                            </button>
                        </Link>
                    </div>
                </center>
            </div>
        )
    }
}
export default RenderHistory;