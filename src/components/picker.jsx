/**
 * Picker
 * The a modal that appears to select a gallery image
 */

let Button     = require('./ui/button')
let Collection = require('../mixins/collection')
let Error      = require('./error')
let FocusTrap  = require('react-focus-trap')
let Gallery    = require('./gallery')
let React      = require('react')
let Search     = require('./search')

let Picker = React.createClass({

  mixins: [ Collection ],

  propTypes: {
    onChange : React.PropTypes.func.isRequired,
    onExit   : React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      items  : [],
      picked : false
    }
  },

  getInitialState() {
    return {
      picked: this.props.picked
    }
  },

  confirm() {
    this.props.onChange(this.state.picked)
    this.props.onExit()
  },

  render() {
    let { error, items, search } = this.state

    return (
      <FocusTrap className="ars-dialog" onExit={ this.props.onExit } active>

        <header className="ars-dialog-header">
          <Search key="search" ref="search" datalist={ items } onChange={ this._onSearchChange } />
        </header>

        <Error error={ error } />

        <Gallery ref="gallery" search={ search } items={ items } picked={ this.state.picked } onPicked={ this._onPicked } onKeyDown={ this._onKeyDown } />

        <footer className="ars-dialog-footer">
          <Button ref="cancel" onClick={ this.props.onExit }>Cancel</Button>
          <Button ref="confirm" onClick={ this._onConfirm } raised>Okay</Button>
        </footer>

      </FocusTrap>
    )
  },

  _onSearchChange(search) {
    this.setState({ search }, this.fetch)
  },

  _onPicked(picked) {
    this.setState({
      picked: this.props.multiselect ? this._onMultiSelectPicked(picked) : [picked]
    })
  },

  _onMultiSelectPicked(picked) {
    // Allow for multiple selections and toggling of selections
    let total = this.state.picked ? this.state.picked.slice() : []
    let index = total.indexOf(picked)
    if (index === -1) {
      total = total.concat(picked)
    } else {
      total.splice(index, 1)
    }
    return total
  },

  _onConfirm(e) {
    e.preventDefault()
    this.confirm()
  },

  _onKeyDown({ key, metaKey, ctrlKey }) {
    if (key === 'Enter' && metaKey || ctrlKey) {
      this.confirm()
    }
  }

})

module.exports = Picker
