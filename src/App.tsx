import React, { Component } from "react"
import moment, { Moment } from "moment"
import "./App.scss"

class App extends Component<any, any> {
  state: any = {
    editingMonth: false,
    editingYear: false,
  }

  componentWillMount() {
    const monthIndex = moment().get("month")

    this.setDate(monthIndex, moment().format("YYYY"))
  }

  setDate = (monthIndex: number, year: string) => {
    const currentMonth = moment.months(monthIndex)
    const input = [year, monthIndex]
    const startOfMonth = moment(input).startOf("month")
    const endOfMonth = moment(input).endOf("month")

    this.setState({
      monthIndex,
      currentMonth,
      currentYear: year,
      startOfMonth,
      endOfMonth,
    })
  }

  openEdit = (field: string) => {
    this.setState({
      [`editing${field}`]: true
    })
  }

  onChange = (e: any) => {
    this.setState({
      [`current${e.target.name}`]: e.target.value
    })
  }

  onKeyDown = (e: any, dont = false) => {
    if (e.keyCode === 13 || dont) {
      const newState: any = {
        [`editing${e.target.name}`]: false,
      }

      if (e.target.name === "Month") {
        const index = moment.months().indexOf(e.target.value)
        if (index > -1) {
          newState["monthIndex"] = index
        }
      }

      this.setState(newState)

      this.setDate(typeof newState.monthIndex !== 'undefined' ? newState.monthIndex : this.state.monthIndex, this.state.currentYear)
    }
  }

  render() {
    const { monthIndex, currentMonth, startOfMonth, endOfMonth, currentYear, editingYear, editingMonth } = this.state
    return (
      <div className="container">
        <div className="header">
          <a onClick={() => this.setDate(monthIndex - 1 < 0 ? 11 : monthIndex - 1, monthIndex - 1 < 0 ? (Number(currentYear) - 1).toString() : currentYear)}>
            <i className="fas fa-angle-left"/>
          </a>
          <div className="title">
            {editingMonth ? (
              <input
                className="update-field"
                name="Month"
                onKeyDown={this.onKeyDown}
                onChange={this.onChange}
                type="text"
                value={currentMonth}
                onFocus={e => e.target.select()}
                onBlur={e => this.onKeyDown(e, true)}
                autoFocus
              />
            ) : (
              <span onDoubleClick={() => this.openEdit("Month")}>{ currentMonth }</span>
            )}
            {" "}
            {editingYear ? (
              <input
                className="update-field"
                name="Year"
                onKeyDown={this.onKeyDown}
                onChange={this.onChange}
                type="number"
                value={currentYear}
                onFocus={e => e.target.select()}
                onBlur={e => this.onKeyDown(e, true)}
                autoFocus
              />
            ): (
              <span onClick={() => this.openEdit("Year")}>{currentYear}</span>
            )}
          </div>
          <a onClick={() => this.setDate(monthIndex + 1 >= 12 ? 0 : monthIndex + 1, monthIndex + 1 >= 12 ? (Number(currentYear) + 1).toString() : currentYear)} >
            <i className="fas fa-angle-right"/>
          </a>
        </div>
        <hr/>
        <div className="weekdays">
          {moment.weekdays().map((day: string) => (
            <p key={day}>{day}</p>
          ))}
        </div>
        <div className="days">
          {Array(startOfMonth.isoWeekday()).fill("").map((_, i) => (
            <p key={i}>{""}</p>
          ))}
          {Array(endOfMonth.daysInMonth()).fill("").map((_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>
      </div>
    )
  }
}

export default App
