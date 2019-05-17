import React from 'react';
import FinalMainPage from './FinalMainPage'
import { BrowserRouter, Route } from 'react-router-dom'
import SearchResults from './SearchResults'
import { ContextStore } from '../context/ContextStore'
import RenderHistory from './RenderHistory'


class App extends React.Component {

    render() {
        return (
            <ContextStore>
                <BrowserRouter>
                    <Route path="/" exact component={FinalMainPage} />
                    <Route path="/SearchResults1" component={SearchResults} />
                    <Route path="/History" component={RenderHistory} />

                </BrowserRouter>
            </ContextStore>

        )
    }
}
export default App;