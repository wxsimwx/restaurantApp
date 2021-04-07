import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import reducers from "./reducers";
import thunk from 'redux-thunk'
import App from './App'

const store = createStore(
  reducers, 
  compose(applyMiddleware(thunk))
)

const persistor = persistStore(store)

export default class todoApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      store: null,
      persistor: null
    }
  }

  async componentWillMount() {
    await this.setState({ store })
    await this.setState({ persistor: persistor })
  }

  render() {
    if (this.state.store === null) {
      return (
      <View>
        <Text>Loading...</Text>
      </View>
      )
    }
    return (
      <Provider store={this.state.store} persistor={this.state.persistor}>
          <App />
      </Provider>
    )
  }
}
