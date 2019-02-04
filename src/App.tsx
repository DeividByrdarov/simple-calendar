import React, { Component } from "react"
import moment from "moment"
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

  onMonthChange = (e: any) => {
    const monthIndex = moment.months().indexOf(e.target.value)
    this.setState({
      editingMonth: false
    })

    this.setDate(monthIndex, this.state.currentYear)
  }

  onYearSave = (e: any, clear = false) => {
    if (e.keyCode == 13 || clear) {
      this.setState({
        editingYear: false
      })
      this.setDate(this.state.monthIndex, this.state.currentYear)
    }
  }

  onChange = (e: any) => {
    this.setState({
      [`current${e.target.name}`]: e.target.value
    })
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
              <select value={currentMonth} onChange={this.onMonthChange} name="Month" id="Month">
                {moment.months().map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            ) : (
              <span onClick={() => this.openEdit("Month")}>{ currentMonth }</span>
            )}
            {" "}
            {editingYear ? (
              <input
                name="Year"
                onKeyDown={this.onYearSave}
                onChange={this.onChange}
                type="number"
                value={currentYear}
                onFocus={e => e.target.select()}
                onBlur={e => this.onYearSave(e, true)}
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
          {Array(startOfMonth.isoWeekday() >= 7 ? 0 : startOfMonth.isoWeekday()).fill("").map((_, i) => (
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

// <input
// className="update-field"
// name="Month"
// onKeyDown={this.onKeyDown}
// onChange={this.onChange}
// type="text"
// value={currentMonth}
// onFocus={e => e.target.select()}
// onBlur={e => this.onKeyDown(e, true)}
// autoFocus
// />
