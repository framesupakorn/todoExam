import React from 'react'
import { Link } from 'react-router-dom'
import Context from '../context/ContextStore'
import uuid from 'uuid'


class CreateItemPage extends React.Component {
    state = {
        indexKey: 0,
        isTyping: true
    }
    static contextType = Context;

    onClickAdd = (e) => {
        e.preventDefault();

        const newitem = this.refs.createdText.value

        const listOfItem = this.context.listOfItem
        const indexKey = this.context.indexKey
        let finalIndexKey = indexKey + 1

        if (listOfItem.find(item => { return item.itemName === newitem.trim() }) === undefined && newitem.trim() !== '') {
            let itemObj = {
                itemName: newitem,
                itemStatus: 'Add',
                itemId: uuid(),
                timeSubmit: new Date().toLocaleTimeString(),
                finalIndexKey: finalIndexKey,
                isEditing: false,
                isChecking: false
            }
            let itemObjHistory = {
                itemName: newitem,
                itemStatus: 'Add',
                itemId: uuid(),
                timeSubmit: new Date().toLocaleTimeString(),
                finalIndexKey: finalIndexKey,
                isEditing: false,
                isChecking: false
            }

            this.context.onClickAddItem(itemObj, itemObjHistory)
            this.refs.createdText.value = ''

            this.setState({
                indexKey: finalIndexKey,
                isTyping: true
            })
        } else if (newitem.trim() === '') {
            alert('you cant insert null value')
            this.refs.createdText.value = ''
        } else if (listOfItem.find(item => item.itemName === newitem.trim())) {
            alert('this item name is already use')
            this.refs.createdText.value = ''
        }

    }
    render() {

        return (
            <div>
                <div className='ui container'>
                    <h1 style={{ textAlign: 'center' }}>
                        CreateItemPage
                    </h1>

                    <center>
                        <div>
                            <input ref='createdText' />
                            <button onClick={(e) => this.onClickAdd(e)}>
                                Add
                            </button>
                        </div>
                        <br />
                    </center>


                    <center>
                        <Link to='/'>
                            <button>
                                <i className='left arrow yellow icon' />
                                Back To MainPage
                                </button>
                        </Link>
                    </center>

                </div>
            </div>

        )
    }
}
export default CreateItemPage;