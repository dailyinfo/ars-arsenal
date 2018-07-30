/**
 * Search
 * @flow
 */

import React from 'react'
import debounce from 'debounce'
import DataList from './datalist'
import { type Record } from '../record'

type Props = {
  datalist: Record[],
  onChange: string => *
}

type State = {
  search: string
}

let uid = 0

// The minimum number of characters before searching
const THRESHOLD = 2

// The minimum time between change events
const INTERVAL = 150

export default class Search extends React.Component<Props, State> {
  id: number
  debouncedChange: string => *

  state = {
    search: ''
  }

  constructor(props: Props) {
    super(...arguments)

    this.id = uid++
    this.debouncedChange = debounce(props.onChange, INTERVAL)
  }

  render() {
    let id = `ars_search_${this.id}`
    let list = `ars_search_list_${this.id}`

    return (
      <form className="ars-search" onSubmit={this._onSubmit.bind(this)}>
        <label className="ars-search-label" htmlFor={id}>
          Search
        </label>
        <input
          id={id}
          list={list}
          type="search"
          className="ars-search-input"
          placeholder="Search"
          value={this.state.search}
          onChange={this._onChange.bind(this)}
          onKeyUp={this._onKeyUp.bind(this)}
        />
        <DataList id={list} items={this.props.datalist} />
        <button className="ars-hidden">Submit</button>
      </form>
    )
  }

  _updateSearch() {
    let { search } = this.state
    this.debouncedChange(search.length >= THRESHOLD ? search : '')
  }

  _onChange(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ search: event.target.value }, this._updateSearch.bind(this))
  }

  _onSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    this._updateSearch()
  }

  _onKeyUp(event: SyntheticKeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      event.stopPropagation()
      this.setState({ search: '' }, this._updateSearch.bind(this))
    }
  }
}
